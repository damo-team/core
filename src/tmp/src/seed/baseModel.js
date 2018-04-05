/**
 * # Model基类
 * 1. 每个Model在Store中都存在modelName所对应的数据域，即通过state.modelName返回Model所对应的所有数据。
 * 2. Model的实现基于事件机制，方便绑定自定义事件
 */
import {Poller, Ajax} from 'beatle';
import {EventEmitter} from 'events';
import capitalize from 'lodash/capitalize';
import immutable from 'seamless-immutable';

import getActionCreators from './getActionCreator';
import logMessages from '../logMessages'

function isPromise(obj) {
  return !!(obj && obj.then && obj.catch);
}
let increment = 1;

export class BaseModel extends EventEmitter {
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
   * + 所有的actionCreators存于_defineActionCreators属性中。
   */
  _createActionCreator(actionName, status) {
    // #! 自定义的actionCreator
    Object.assign(this._defineActionCreators, getActionCreators(actionName, status));
  }

  createAction(actionName, data, payload, actionOption) {
    if (!payload.changes) {
      if (typeof payload.change === 'function') {
        payload.changes = [
          {
            name: payload._name,
            type: changeOperators['SETPROPERTY'],
            getData: payload.change
          }
        ];
      } else if (Object(payload.change) === payload.change) {
        payload.changes = [payload.change];
      } else {
        payload.changes = [
          {
            name: payload._name,
            type: payload.change || changeOperators['RECONFIGURE']
          }
        ]
      }
    }
    const action = this._defineActionCreators[`${this._name}/${actionName}/${status}`](data);
    Object.assign(action.payload, payload, {cid: this.generatorKey});
    Object.assign(action, actionOption);
    return action;
  }

  get generatorKey() {
    return 'id';
  }
  
  constructor(option = {}) {
    super();

    this._name = option.name || `model${increment++}`;
    this._ajax = option.ajax || new Ajax();

    this._defineActionTypes = {};
    this._defineActionCreators = {};
    this._pollers = [];

    this.setMaxListeners(Number.MAX_VALUE);

    if(!option.initialState && !this.state){
      warning(false, logMessages.noState);
    }
    this.state = SI(option.initialState || {});
  }

  setState(nextState, callback) {
    const promises = [];
    for (let key in nextState) {
      switch (true) {
        case immutable.isImmutable(nextState[key]):
          nextState[key] = {
            response: Promise.resolve(nextState[key]),
            name: key,
            change: {
              name: key,
              deserialize: false,
              callback(nextStore, payload){
                return payload.data;
              }
            }
          };
          break;
        case isPromise(nextState[key]):
          nextState[key] ={
            response: nextState[key],
            name: key,
            change: {
              name: key,
              deserialize: false,
              callback(nextStore, payload){
                return payload.data;
              }
            }
          };
          break;
        default:
          if(nextState[key].response === undefined){
            nextState[key].response = Promise.resolve();
          }
          if (nextState[key].change) {
            if (typeof nextState[key].change === 'function') {
              Object.assign(nextState[key], {
                name: key,
                change: {
                  name: key,
                  deep: true,
                  callback: nextState[key].change
                }
              });
            }
          } else {
            Object.assign(nextState[key], {
              name: key,
              change: {
                name: key,
                deep: true,
                callback(nextStore, payload){
                  return payload.data;
                }
              }
            });

          }
          break;
      }
      promises.push(this.execQuery(nextState[key]));
    }

    const promise = Promise.all(promises);
    promise.then(datas => {
      const data = {};
      let i = 0;
      for(let key in nextState){
        data[key] = datas[i++ ];
      }
      if(callback){
        callback(null, data);
      }
      return data;
    }, err => {
      callback && callback(err);
      return err;
    });
    
    return this.fromPromise(promise);
  }

  fromPromise(){
    promise.subscribe = (callback) => {
      if (callback) {
        promise.then(res => {
          callback(null, res);
        }, callback);
      }
      return promise;
    }
    return promise;
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
  execQuery(opt) {
    if(opt.name){
      
    }else{
      warning(false, logMessages.noName);
    }
    if (opt.uri) {
      actionReducer = this.createCrudFor(opt);
    } else if (typeof opt.request === 'function') {
      actionReducer = (dispatch, extraOption = {}) => {
        const processData = extraOption.processData || opt.processData;
        const suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
        const suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;
        const actionOption = {
          suppressGlobalErrorNotification: suppressGlobalErrorNotification,
          suppressGlobalProgress: suppressGlobalProgress
        };

        const promise = opt.request(opt.params || opt.body, {
          dispatch: dispatch,
          processData: processData,
          action: actionOption,
          changes: opt.changes,
          callback: extraOption.callback,
          errorNotification: extraOption.errorNotification
        });

        promise.fromSubscribe = (callback) => {
          if (callback) {
            promise.then(res => {
              callback(null, res);
            }, callback);
          }
          return promise;
        }

        return promise;
      }
    } else if (opt.response !== undefined) {
      const operate = opt.operate;
      const ucOperate = ucfirst(operate);
      const needToOperate = operate && (opt.change || opt.changes);
      actionReducer = (dispatch, extraOption = {}) => {
        const processData = extraOption.processData || opt.processData;
        const suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
        const suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;

        needToOperate && this._createActionCreator([], [this.createActionName(ucOperate)]);

        const payloadOption = {
          name: opt._name || operate,
          params: opt.params || opt.body,
          change: opt.change,
          changes: opt.changes
        };
        const actionOption = {
          suppressGlobalErrorNotification: suppressGlobalErrorNotification,
          suppressGlobalProgress: suppressGlobalProgress
        };
        const _isPromise = isPromise(opt.response);
        const promise = _isPromise
          ? opt.response
          : Promise.resolve(opt.response);

        if (needToOperate) {
          if (!_isPromise) {
            const data = processData(opt.response);
            dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'action'), data, Object.assign(payloadOption, {data: opt.response}), actionOption));
          }
          this.emit('before' + ucOperate, opt)
        }

        promise.fromSubscribe = (callback) => {
          if (callback) {
            promise.then(res => {
              callback(null, res);
            }, callback);
          }
          return promise;
        }
        promise.fromSubscribe(extraOption.callback);

        promise.then(res => {
          const data = processData(res);

          if (needToOperate) {
            if (_isPromise) {
              dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'action'), data, Object.assign(payloadOption, {data: opt.response}), actionOption));
            }
            this.emit('after' + ucOperate, null, data);
          }

          return data;
        });

        return promise;
      }
    }

    if (appDispatch) {
      return actionReducer(appDispatch);
    } else {
      return actionReducer;
    }
  }

  createCrudFor(opt) {
    const operate = opt.operate;
    const ucOperate = ucfirst(operate);
    const needToOperate = operate && (opt.change || opt.changes);

    needToOperate && this._createActionCreator([this.createActionName(ucOperate)], []);

    const actionReducer = (dispatch, extraOption = {}) => {
      const processData = extraOption.processData || opt.processData;
      const suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
      const suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;

      const payloadOption = {
        name: opt._name || operate,
        params: opt.params || opt.body,
        change: opt.change,
        changes: opt.changes
      };
      const actionOption = {
        suppressGlobalErrorNotification: suppressGlobalErrorNotification,
        suppressGlobalProgress: suppressGlobalProgress
      };

      if (needToOperate) {
        dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'start'), opt.initialValue, Object.assign(payloadOption, {data: promise}), actionOption));
        this.emit('before' + ucOperate, opt);
      }

      const promise = Api({url: opt.uri, method: opt.method, data: opt.body, headers: opt.headers, errorNotification: opt.errorNotification});

      promise.fromSubscribe = (callback) => {
        if (callback) {
          promise.then(res => {
            callback(null, res);
          }, callback);
        }
        return promise;
      }
      promise.fromSubscribe(extraOption.callback);

      promise.then((response) => {
        let data = processData(response, dispatch);
        if (needToOperate) {
          dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'success'), data, Object.assign(payloadOption, {data: response}), actionOption));
          this.emit('after' + ucOperate, null, data);
        }
        return data;
      }, (err) => {
        if (needToOperate) {
          dispatch && dispatch(this.createAction(this.createActionName(ucOperate, 'error'), null, Object.assign(payloadOption, {data: err}), Object.assign(actionOption, {error: err})));
          this.emit('after' + ucOperate, err);
        }
        return err;
      });

      return promise;
    }
    return actionReducer;
  }

  // #! 结合Poller模块实现轮询功能
  pollingQuery(ajaxOption, changeOption, appDispatch) {
    const actionReducer = (dispatch, extraOption = {}) => {
      const poller = new Poller({
        catchError: ajaxOption.catchError,
        smart: ajaxOption.smart,
        delay: ajaxOption.delay,
        action: () => {
          return this.getQuery(ajaxOption, changeOption)(dispatch, extraOption);
        }
      });

      this
        ._pollers
        .push(poller);

      return poller;
    }
    if (appDispatch) {
      return actionReducer(appDispatch);
    } else {
      return actionReducer;
    }
  }

  clearPolling() {
    this
      ._pollers
      .forEach(poller => {
        poller.remove();
      });
  }

  destroy() {
    this.removeAllListeners();
    this.clearPolling();
  }
}
