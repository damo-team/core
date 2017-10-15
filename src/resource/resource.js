/**
 *
 * > see: https://github.com/troyanskiy/ng2-resource-rest
 */
import Rx from 'rxjs';
import {ResourceModel} from './resourceModel';
import {applyCrudReducer} from '../utils/createCrud';
import {Api} from '../utils/fetch';
import SI from 'seamless-immutable';
import {resourceCRUD} from './resourceCRUD';

const noop = d => d;
const defaultProcessData = function (res) {
  return res.data
};

export class BaseResource {
  static validate = function(){};
  static ASSIGN_METHODS = resourceCRUD;

  constructor(resourceName, option = {}, initialState) {

    this._sync(resourceName, option, initialState || option.initialState || {});

    this.$model_ = this.defer();

    // #! 对于get和query接口需要判断cache和终止之前请求
    this.$cacheHttps_ = new Map();

    // #! 所有接口都走subject_发射
    this.$subject_ = new Rx.Subject();
    this.$subscripers_ = [];
  }

  getState() {
    return this.$state_;
  }

  /**
   * option = {
   *  url,
   *
   *  cid,
   *  cache,
   *
   *  addTimestamp,
   *  removeTrailingSlash,
   *  actions,
   * }
   */
  _sync(resourceName, option, initialState) {
    const defaultActions = {
      query: {
        path: '/list',
        method: 'get',
        state: {
          list: resourceCRUD.QUERY
        }
      },
      get: {
        method: 'get',
        state: {
          item: resourceCRUD.GET
        }
      },
      create: {
        method: 'post',
        state: {
          list: resourceCRUD.ADD
        }
      },
      update: {
        method: 'put',
        state: {
          list: resourceCRUD.UPDATE
        }
      },
      delete: {
        method: 'delete',
        state: {
          list: resourceCRUD.DELETE
        }
      }
    }

    option.actions = option.actions || defaultActions;
    const actions = {};

    for (let key in option.actions) {
      let action;
      // #! 获取最新的cid
      let cid = option.actions[key].cid || option.cid;
      // #! 默认的CRUD
      if (defaultActions[key]) {
        if (typeof option.actions[key] === 'string') {
          action = Object.assign({
            uri: option.actions[key]
          }, defaultActions[key]);
        } else if (option.actions[key] === true) {
          action = Object.assign({
            path: '/{${cid}}'
          }, defaultActions[key]);
        } else {
          action = Object.assign({
            path: '/{${cid}}'
          }, defaultActions[key], {state: null}, option.actions[key]);
        }
      } else if (this[key]) {
        throw new Error('actionName不能覆盖Resource已有的方法');
      } else {
        // #! 自定义的方法和action
        action = Object.assign({}, option.actions[key]);
      }

      // #! 合并初始化数据
      if (action.initialState) {
        Object.assign(initialState, action.initialState);
      }

      action.cid = cid;
      action.changes = action.changes || [];
      actions[key] = action;

      // #! 获取到最新的changes策略
      let state = action.state;
      if (state) {
        for (let name in state) {
          let func = state[name];
          if(typeof func === 'string'){
            func = resourceCRUD[func]
          }
          let changes = func(name, action, initialState);
          if (changes) {
            action.changes = action
              .changes
              .concat(changes);
          }
        }
      }

      const processData = action.processData
      if(typeof processData === 'object'){
        action.processData = (res, params) => {
          const data = {};
          let n;
          for(let key in processData){
            let d = res;
            let tmp = processData[key].split('.');
            while(n = tmp.shift()){
              d = d[n];
            }
            data[key] = d;
          }
          return data;
        }
      }

      if (!this[key]) {
        this[key] = (params, callback) => {
          return this.request(key, params, callback)
        }
      }
    }

    // #! 初始化数据
    this.$state_ = SI(initialState);
    this.$cid_ = option.cid;

    this.$options_ = {
      resourcePath: option.resourcePath || '',
      addTimestamp: option.addTimestamp,
      removeTrailingSlash: option.removeTrailingSlash,
      actions: actions,

      /**
       * payload = {
       *  name,
       *  status,
       *  ajaxOption,
       *  data,
       *  error,
       *  state
       * }
       */
      requestInterceptor: (ajaxOption) => {
        const actionName = ajaxOption.name;
        const action = this.$options_.actions[actionName];
        // #! 获取缓存的http实例
        const http = this
          .$cacheHttps_
          .get(actionName);
        

        let promise;
        let isSame = false;
        // #! 存在缓存，则从cache中拿
        if ((action.cache || action.distinct) && ajaxOption.method.toLocaleLowerCase() === 'get') {
          if(http){
            if(http.params == ajaxOption.params){
              isSame = true;
            }else{
              const _params = ajaxOption.params || {};
              const params = http.params || {};
              const keys = Object.keys(_params);
              if (keys.length == Object.keys(_params) && keys.length == keys.filter(key => params[key] === _params[key]).length) {
                isSame = true;
              }
            }
            if(isSame && action.cache){
              if(http.resolved){
                http.resolved = false;
                promise = http.$observable.toPromise();
              }else{
                http.abort();
                http.release();
              }
            }
          }
        }

        if (!promise) {
          // #! 创建新的缓存http
          const newHttp = this.createHttp(ajaxOption.params, () => {
            // #! 请求前发送
            this
              .$subject_
              .next({
                name: actionName,
                status: 'start',
                ajaxOption: ajaxOption,
                dispatch: newHttp.extraOption.dispatch,
                state: this.applyState({
                  status: 'start',
                  record: {},
                  params: ajaxOption.params,
                  changes: action.changes.concat(newHttp.extraOption.changes || [])
                }),
                stateAction: newHttp.extraOption.action
              });
          });

          // #! 保存新的
          this
            .$cacheHttps_
            .set(actionName, newHttp);

          promise = Promise
            .resolve(ajaxOption)
            .then(opt => {
              let promise;
              // #! 之前的请求未完成时，则终止和关闭掉
              if (http) {
                if (action.distinct && isSame && !http.resolved) {
                  http.abort();
                  promise = Api.error(new Error('Request is stoped'));
                }
                if(!action.cache){
                  http.release();
                }
              }
              if(!promise){
                let err;
                // #! 校验参数是否合法
                if(err = BaseResource.validate(opt.params, action)){
                  promise = Api.error(err);
                }else{
                  opt.errorNotification = opt.errorNotification || newHttp.extraOption.errorNotification;
                  promise = Api(opt);
                }
              }

              return promise;
            });
        }
        return promise;
      },
      responseInterceptor: (promise, ajaxOption) => {
        const newHttp = this
          .$cacheHttps_
          .get(ajaxOption.name);
        const action = actions[ajaxOption.name];
        // #! 在返回结果发现resolved为true，说明中途被终止掉了
        if (!newHttp.resolved) {
          if(newHttp.extraOption.callback){
            promise.then(res => newHttp.extraOption.callback(null, res), err => newHttp.extraOption.callback(err));
          }
          
          promise.then(res => {
            const processData = newHttp.extraOption.processData || action.processData || defaultProcessData;
            const data = processData(res, ajaxOption.params);

            const state = this.applyState({
              record: data, 
              status: 'success', 
              params: ajaxOption.params, 
              changes: action.changes.concat(newHttp.extraOption.changes || [])
            });

            this
              .$subject_
              .next({
                name: ajaxOption.name,
                status: 'success',
                data: data,
                dispatch: newHttp.extraOption.dispatch,
                stateAction: newHttp.extraOption.action,
                state: state
              });
            return data;
          }, err => {
            this
              .$subject_
              .next({name: ajaxOption.name, status: 'error', dispatch: newHttp.extraOption.dispatch, stateAction: newHttp.extraOption.action, state: this.$state_, error: err});
            throw err;
          });

        }
        // #! 关闭并执行callback
        if(!action.cache){
          newHttp.release();
        }
        return promise;
      }
    }
  }

  /**
   * payload = {
   *  cid,
   *  status,
   *  params,
   *  changes,
   *  record
   * }
   */
  applyState(payload) {
    if(payload.changes.length){
      return this.$state_ = applyCrudReducer(this.$state_, payload);
    }else{
      return null;
    }
  }

  defer() {
    return new ResourceModel(this.$options_);
  }

  createHttp(params, preCallback) {
    const http = {
      extraOption: {},
      params: params,
      // #! 默认是未完成的
      resolved: false,
      // #! 终止掉，清理掉订阅实例
      abort: () => {
        if (http.resolved) 
          return;
        http
          .$subscription
          .unsubscribe();
        http.resolved = true;
      },
      subscriber: null,
      observable: Rx
        .Observable
        .create(subscriber => {
          http.subscriber = subscriber;
        })
        .flatMap(() => http.$observable),

      $observable: null,
      $subscription: null,
      // #! 开始运行
      start: (promise, callback) => {
        if (http.resolved) 
          return;
        
        // 在此处加入extraOption
        let extraOption;
        if (typeof callback === 'object') {
          extraOption = callback;
          callback = extraOption.callback;
          delete extraOption.callback;
          http.extraOption = extraOption;
        }

        callback = callback || noop;
        // 预先执行
        preCallback();

        // #! promise 转换为 observable
        http.$observable = Rx
          .Observable
          .fromPromise(promise);
        // #! callback执行时在observable的订阅中
        http.$subscription = http
          .$observable
          .subscribe(res => {
            if (res instanceof Error) {
              callback(res)
            } else {
              callback(null, res);
            }
          }, err => callback(err), () => http.resolved = true);

        // observable换换为connectObserver
        http.observable = http
          .observable
          .publish();
        http
          .observable
          .connect();
      },
      // #! 关闭，清理掉本次观察者，此时callback的实行才会开始
      release: () => {
        if (http.subscriber) {
          http
            .subscriber
            .next();
          http
            .subscriber
            .complete();
          http.subscriber = null;
        }
      }
    }

    return http;
  }

  request(actionName, params, callback) {
    const action = this.$options_.actions[actionName];
    if (!action) {
      return Api.error(new Error('Request is null'));
    }

    const promise = this
      .$model_
      .request(actionName, params);

    const http = this
      .$cacheHttps_
      .get(actionName);

    // #! 通过promise的cancel方法可终止掉
    promise.cancel = http
      .abort
      .bind(http);
    // #! 开始运行
    http.start(promise, callback);

    return promise;
  }

  subscribe(callback) {
    var subscription = this.$subject_.subscribe(callback);
    this
      .$subscripers_
      .push(subscription);
    return subscription;
  }

  unsubscribe() {
    this
      .$subscripers_
      .forEach(subscription => {
        subscription.unsubscribe();
      })
  }

  destroy() {
    this.unsubscribe();
    this
      .$subject_
      .complete();
  }
}
