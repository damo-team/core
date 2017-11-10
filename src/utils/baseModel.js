/**
 * # Model基类
 * 1. 每个Model在Store中都存在modelName所对应的数据域，即通过state.modelName返回Model所对应的所有数据。
 * 2. Model的实现基于事件机制，方便绑定自定义事件
 */

import { Api } from './fetch';
import { createActions, createActionCreators, changeOperators } from './createCrud';
import { Poller } from './poller';
import cuid from 'cuid';
import {ucfirst} from './core';
import { EventEmitter } from 'events';
import SI from 'seamless-immutable';

function isPromise(obj){
  return !!(obj && obj.then && obj.catch);
}

export class BaseModel extends EventEmitter{
  static processData = function (res) { return res };

  static appStore = null;
  
  static ASSIGN_TYPES = changeOperators;
  /**
   * ### actionType, actionCreator和创建action的逻辑
   * 
   * + 同步的action，以'actionName'来创建，得到
   *  * actionType: `ACTION_NAME_ACTION`
   *  * actionCreator的key：`$actionNameAction`
   * + 异步的action，以'actionName'来创建，得到
   *  * actionType: `ACTION_NAME_START`, `ACTION_NAME_SUCCESS`和`ACTION_NAME_ERROR`,
   *  * actionCreator的key：`$actionNameStart`, `$actionNameSuccess`和`$actionNameError`
   * + 所有的actionTypes存于defineActionTypes属性中。
   * + 所有的actionCreators存于defineActionCreators属性中。
   */
  createActionCreator(crudActions, actions){
    const defineAction = createActions(crudActions, actions);
    // #! 自定义的actionType
    Object.assign(this.defineActionTypes, defineAction.getActionTypes());
    // #! 自定义的actionCreator
    Object.assign(this.defineActionCreators, defineAction.getActionCreators());
  }

  // #! 获取actionCreator的key
  createActionName(operate, status = ''){
    return this.name + operate + ucfirst(status);
  }
  /**
   * + 通过制定的actionCreator和配置项生成action, 一般来说我们不需要关心action，有model自动生成，格式为：
   * ```
   *  {
   *    type,                           // actionType
   *    payload: {
   *      cid,                            // 键名
   *      data,                           // 未处理的数据
   *      record,                         // 已处理的数据
   *      records,                        // 同record
   *      change,                         // 同步到store的change配置
   *      changes,                        // 同change，不同点在于changes支持多个change
   *    },
   *    error,                          // 错误信息， 一般在异步action的error时才有
   *    suppressGlobalErrorNotification,// 在error存在有效，用于指定是否忽略error
   *    suppressGlobalProgress          // 指定是否不走processbar提示
   *  }
   * ```
   */
  createAction(actionName, data, payloadOption, actionOption) {
    if (!payloadOption.changes) {
      if(typeof payloadOption.change === 'function'){
        payloadOption.changes = [{
          name: payloadOption.name,
          type: changeOperators['SETPROPERTY'],
          getData: payloadOption.change
        }];
      }else if (Object.assign(payloadOption.change) === payloadOption.change) {
        payloadOption.changes = [payloadOption.change];
      } else {
        payloadOption.changes = [{
          name: payloadOption.name,
          type: payloadOption.change || changeOperators['RECONFIGURE']
        }]
      }
    }
    const action = this.defineActionCreators['$' + actionName](data);
    Object.assign(action.payload, payloadOption, { cid: this.generatorKey });
    Object.assign(action, actionOption);
    return action;
  }

  get generatorKey(){
    return 'id';
  }
  /**
   * ### Model特性属性
   * 
   * |        属性名         |          描述          |
   * |:       ------        |         ------        |
   * | generatorKey: String | Model的唯一键名         |
   * | properties: Object   | Model的数据域的数据结构  |
   * | dispatch: Function | 获取store实例的dispatch方法 | 
   */
  constructor(name, initialState) {
    super();

    this.setName(name);
    
    this.mapToStore = {};
    
    this.defineActionTypes = {};
    this.defineActionCreators = {};
    this.$pollers_ = [];

    if(!this.properties){
      this.properties = initialState;
    }

    this.setMaxListeners(Number.MAX_VALUE);

    this.state = SI(initialState);
  }

  /**
   * ### Model方法
   * 
   * |     方法名   |          描述          |       参数        |    默认参数      |
   * |     ------  |         ------        |       ------      |        ------   |
   * | getAppStore | 获取redux的store实例    |       NA          |         NA      |
   * | getModel | 获取挂在store的指定model实例 | {name: String}  |          NA      |
   * | getQuery | 获取更新store的执行函数     | {ajax: Object, changes: Object / Array, dispatch: Function}  |          NA      |
   * | execQuery | 通过getQuery并且传递dispatch参数，达到直接执行更新store的作用 | {ajax: Object, changes: Object / Array}  |          NA      |
   * | pollingQuery | 轮询调用getQuery或者execQuery循环调用接口，并且更新数据 | {ajax: Object, changes: Object / Array} | NA |
   */
  getAppStore(){
    return BaseModel.appStore; 
  }

  setName(modelName){
    this.name = modelName;
  }

  getModel(modelName){
    return this.getAppStore().models[modelName]; 
  }

  select(name){
    const currentState = this.getAppStore().getState();
    let state = currentState[this.name];
    const keys = name.split('.');
    
    for(let i = 0, len = keys.length; i < len; i++){
      if(!(state = state[keys[i]])){
        return state;
      }
    }
    return state;
  }

  get dispatch(){
    return this.getAppStore().dispatch;
  }

  execQuery(ajaxOption, changeOption){
    return this.getQuery(ajaxOption, changeOption, this.dispatch);
  }
  
  setState(options){
    const promises = [];
    for(let key in options){
      switch(true){
        case SI.isImmutable(options[key]):
          options[key] = {
            response: Promise.resolve(options[key]),
            change: {
              name: key,
              callback: data => data
            }
          }
          break;
        case isPromise(options[key]):
          options[key] = {
            response: options[key],
            change: {
              name: key,
              callback: data => data
            }
          }
          break;
        default:
          if(options[key].change){
            if(options[key].change === 'function'){
              options[key].change = {
                name: key,
                callback: options[key].change
              };
            }  
          }else{
            options[key].change = {
              name: key,
              callback: data => data
            }
          }
          break;
      }
      promises.push(this.execQuery(options[key]));
    }
    
    if(promises.length === 1){
      return promises[0];
    }else{
      const promise = Promise.all[promises];
      promise.fromSubscribe = (callback) => {
        if(callback){
          promise.then(res => {
            callback(null, res);
          }, callback);
        }
        return promise;
      }
      return promise;
    }
  }
  /**
   * ### 更新store的执行方法
   *  + ajaxOption配置，用于发ajax请求获取到接口数据
   *  ```
   *    {
   *      uri,            // 接口地址
   *      method,         // 请求方式['get', 'post', 'put', 'delete']
   *      body,           // 请求参数
   *      params,         // 同body
   *      processData     // 获取到接口数据进行预处理，得到的数据进行change
   *    }
   *  ```
   *    * 系统存在默认的`processData=res=>res.data`，即拿到接口数据的data作为处理数据
   *    * 当不想走接口，而是通过静态数据做change时，可以配置`ajaxOption={response: 数据}`
   * 
   * + changeOption配置, 用于把获取到的数据更新到store。
   *  ```
   *    {
   *      change: {
   *        name,         // 更新Model数据域的属性名，参考properties
   *        callback,     // 获取的数据经过callback处理后，返回的数据才会存到store
   *        type,         // 系统提供的多个callback的行为，和callback二选一
   *      }
   *      [changes: Array]// 每次change做一次更新操作，而changes是可以进行多项更新操作。
   *    }
   *  ```
   *    * 实际上type值为其一：["add", "update", "delete", "reconfigure": 'setProperty']
   *    > https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
   * 
   * + 更简单的方式，ajaxOption和changeOption可以合成一个参数, 举个例子
   *  ```
   *    {
   *      response: {
   *        data: [{id: 1}, {id: 2}]
   *      },
   *      name: 'list',
   *      type: 'reconfigure'
   *    }
   *  ```
   *    * 当change只有一项时，可以平铺出来，当然也可以通过change属性来配，多个change仍可以用changes
   *    * 通过type来配置时，实际上依赖于Model的generatorKey，用来识别数据是否已存在。 
   */
  getQuery(ajaxOption, changeOption, appDispatch){
    if(typeof changeOption === 'function'){
      appDispatch = changeOption;
      changeOption = {};
    }
    if(Array.isArray(changeOption)){
      changeOption = {
        changes: changeOption
      }
    }

    let actionReducer;
    const opt = Object.assign({}, ajaxOption, changeOption);
    if(!opt.operate){
      opt.operate = opt.name || cuid()
    }
    if(opt.uri){
      actionReducer = this.createCrudFor(opt);
    }else if(typeof opt.request === 'function'){
      actionReducer = (dispatch, extraOption = {}) => {
        const processData = extraOption.processData || opt.processData;
        const suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
        const suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;
        const actionOption = {suppressGlobalErrorNotification: suppressGlobalErrorNotification, suppressGlobalProgress: suppressGlobalProgress};

        const promise = opt.request(opt.params || opt.body, {dispatch: dispatch, processData: processData, action: actionOption, changes: opt.changes, callback: extraOption.callback, errorNotification: extraOption.errorNotification});

        promise.fromSubscribe = (callback) => {
          if(callback){
            promise.then(res => {
              callback(null, res);
            }, callback);
          }
          return promise;
        }

        return promise;
      }
    }else if(opt.response){
      const operate = opt.operate;
      const ucOperate = ucfirst(operate);
      const needToOperate = operate && (opt.change || opt.changes);
      actionReducer = (dispatch, extraOption = {}) => {
        const processData = extraOption.processData || opt.processData || BaseModel.processData;
        const suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
        const suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;

        needToOperate && this.createActionCreator([], [this.createActionName(ucOperate)]);

        const payloadOption = { name: opt.name || operate, params: opt.params || opt.body, change: opt.change, changes: opt.changes };
        const actionOption = {suppressGlobalErrorNotification: suppressGlobalErrorNotification, suppressGlobalProgress: suppressGlobalProgress};
        const _isPromise = isPromise(opt.response);
        const promise = _isPromise ? opt.response : Promise.resolve(opt.response);

        if(needToOperate){
          if(!_isPromise){
            const data = processData(opt.response);
            dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'action'), data, Object.assign(payloadOption, { data: opt.response }), actionOption));
          }
          this.emit('before' + ucOperate, opt)
        }

        promise.fromSubscribe = (callback) => {
          if(callback){
            promise.then(res => {
              callback(null, res);
            }, callback);
          }
          return promise;
        }
        promise.fromSubscribe(extraOption.callback);

        promise.then(res => {
          const data = processData(res);
        
          if(needToOperate){
            if(_isPromise){
              dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'action'), data, Object.assign(payloadOption, { data: opt.response }), actionOption));
            }
            this.emit('after' + ucOperate, null, data);
          }

          return data;
        });

        return promise;
      }
    }
    
    if(appDispatch){
      return actionReducer(appDispatch);
    }else{
      return actionReducer;
    }
  }
  
  createCrudFor(opt) {
    const operate = opt.operate;
    const ucOperate = ucfirst(operate);
    const needToOperate = operate && (opt.change || opt.changes);

    needToOperate && this.createActionCreator([this.createActionName(ucOperate)], []);

    const actionReducer = (dispatch, extraOption = {}) => {
      const processData = extraOption.processData || opt.processData || BaseModel.processData;
      const suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
      const suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;

      const payloadOption = { name: opt.name || operate, params: opt.params || opt.body, change: opt.change, changes: opt.changes };
      const actionOption = {suppressGlobalErrorNotification: suppressGlobalErrorNotification, suppressGlobalProgress: suppressGlobalProgress};

      if(needToOperate){
        dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'start'), opt.initialValue, Object.assign(payloadOption, { data: promise }), actionOption));
        this.emit('before' + ucOperate, opt);
      }

      const promise = Api({
        url: opt.uri,
        method: opt.method,
        data: opt.body,
        headers: opt.headers,
        errorNotification: opt.errorNotification
      });

      promise.fromSubscribe = (callback) => {
        if(callback){
          promise.then(res => {
            callback(null, res);
          }, callback);
        }
        return promise;
      }
      promise.fromSubscribe(extraOption.callback);

      promise.then((response) => {
        let data = processData(response, dispatch);
        if(needToOperate){
          dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'success'), data, Object.assign(payloadOption, { data: response }), actionOption));
          this.emit('after' + ucOperate, null, data);
        }
        return data;
      }, (err) => {
        if(needToOperate){
          dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'error'), null, Object.assign(payloadOption, { data: err }), Object.assign(actionOption, {error: err})));
          this.emit('after' + ucOperate, err);
        }
        return err;
      });
      
      return promise;
    }
    return actionReducer;
  }
  
  // #! 结合Poller模块实现轮询功能
  pollingQuery(ajaxOption, changeOption, appDispatch){
    const actionReducer = (dispatch, extraOption = {}) => {
      const poller = new Poller({
        catchError: ajaxOption.catchError,
        smart: ajaxOption.smart,
        delay: ajaxOption.delay,
        action: () => {
          return this.getQuery(ajaxOption, changeOption)(dispatch, extraOption);
        }
      });

      this.$pollers_.push(poller);

      return poller;
    }
    if(appDispatch){
      return actionReducer(appDispatch);
    }else{
      return actionReducer;
    }
  }

  clearPolling(){
    this.$pollers_.forEach(poller => {
      poller.remove();
    });
  }

  destroy(){
    this.removeAllListeners();
    this.clearPolling();
  }
}
