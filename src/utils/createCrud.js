/**
 * # 系统提供的change策略和actionType
 * 1. model.getQuery的changeOption中，type属性指定change策略
 * 2. 通过actionName创建同步或者异步的actionType
 */
import { toSnakeCase, ucfirst } from './core';

export const changeOperators = {
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete',
  RECONFIGURE: 'reconfigure',
  SETPROPERTY: 'setProperty'
}

const statuses = ['start', 'success', 'error'];
const propNames = {
  start: 'record',
  success: 'record',
  error: ''
};

/**
 * + 根据async来指定异步action
 *  1. 同步的action: resourceName -> `${resourceName}Action`
 *  2. 异步的action: resourceName -> `${resourceName}Start`,  `${resourceName}Success` 和  `${resourceName}Error`
 */
export function createActionTypes(resourceName, async){
  let actionTypes = {};
  if(async){
    statuses.forEach(st => {
      let type = resourceName + ucfirst(st);
      actionTypes[toSnakeCase(type)] = {
        type,
        status: st
      }
    })
  }else{
    let type = resourceName + ucfirst('action');
    actionTypes[toSnakeCase(type)] = {
      type,
      status: 'action'
    }
  }
  
  return actionTypes;
}

/**
 * + 创建actionCreator，用于给到model实例调用
 */
export function createActionCreators(resourceName, actionTypes){
  actionTypes = actionTypes || createActionTypes(resourceName);
  const actionCreators = {};
  for(let type in actionTypes){
    let obj = actionTypes[type];
    if(propNames[obj.status]){
      actionCreators['$' + obj.type] = (...args) => {
        return { type: type, payload: {[propNames[obj.status]]: args[0], status: obj.status} };
      }
    }else{
      actionCreators['$' + obj.type] = (...args) => {
        return { type: type, payload: {record: args[0], status: obj.status} };
      }
    }
  }
  return actionCreators;
}

function merge(o, t, attrs){
  o = o.asMutable ? o.asMutable() : o;
  if(attrs){
    attrs.forEach(attr => o[attr] = t[attr]);
    return o;
  }else{
    return Object.assign(o, t);
  }
}

function extra(o, attrs){
  if(attrs){
    const newO = {};
    attrs.forEach(attr => o[attr] = t[attr]);
    return newO;
  }else{
    return o;
  }
}

/**
 * ### change策略
 * 参考redux减少样本代码
 * 1. change类型：["add", "update", "delete", "reconfigure", "setProperty"]
 * > see: http://cn.redux.js.org//docs/recipes/ReducingBoilerplate.html
 */
export function applyCrudReducer(immutableState, payload, initialState){
  if(payload.changes){
    let _records = payload.record === undefined ? payload.records : payload.record;
    let generatorKey = payload.cid;
    let newState;

    payload.changes.forEach(change => {
      switch(change.type){
        case changeOperators.ADD:
          // 必须是对象
          if(Object(_records) === _records){
            if(Array.isArray(immutableState[change.name])){
              // push
              immutableState = immutableState.update(change.name, (records) => {
                let recordMap = {};
                let _recordArr = [].concat(_records);
                _recordArr.forEach(r => recordMap[r[generatorKey]] = r);
                records = records.asMutable().map(r => {
                  if(recordMap[r[generatorKey]] === undefined){ //发现存在，则merge
                    return r;
                  }else{
                    _recordArr.splice(_recordArr.indexOf(recordMap[r[generatorKey]]), 1);
                    return merge(r, recordMap[r[generatorKey]], change.attrs);
                  }
                });
                
                for(var i = _recordArr.length; i--;){
                  records.unshift(_recordArr[i]); 
                }
                return records;
              });
            }else{
              // #! 此时应该是reconfigure
              immutableState = immutableState.set(change.name, _records);
            }
          }
          break;
        case changeOperators.UPDATE:
          // 必须是对象
          if(Object(_records) === _records){
            if(Array.isArray(immutableState[change.name])){
              immutableState = immutableState.update(change.name, (records) => {
                let recordMap = {};
                let _recordArr = [].concat(_records);
                _recordArr.forEach(r => recordMap[r[generatorKey]] = r);

                records = records.asMutable().map(r => {
                  if(recordMap[r[generatorKey]] === undefined){
                    return r;
                  }else{
                    return merge(r, recordMap[r[generatorKey]], change.attrs);
                  }
                });
                
                return records;
              });
            }else if(immutableState[change.name][generatorKey] == _records[generatorKey]){
              // set
              immutableState = immutableState.set(change.name, extra(_records, change.attrs));
            }
          }
          break;
        case changeOperators.DELETE:
          // 必须是对象
          if(Object(_records) === _records){
            if(Array.isArray(immutableState[change.name])){
              immutableState = immutableState.update(change.name, (records) => {
                let recordMap = {};
                let _recordArr = [].concat(_records);
                _recordArr.forEach(r => recordMap[r[generatorKey]] = r);
                return records.filter(r => recordMap[r[generatorKey]] === undefined);
              });
            }else if(immutableState[change.name][generatorKey] == _records[generatorKey]){
              immutableState = immutableState.set(change.name, null);
            }
          }
          break;
        case changeOperators.RECONFIGURE:
          immutableState = immutableState.set(change.name, _records === undefined? initialState[change.name] : _records);
          break;
        case changeOperators.SETPROPERTY:
          newState = change.getData(_records, immutableState[change.name]);
          immutableState = immutableState.set(change.name,  newState === undefined ? initialState[change.name] : newState);
          break;
        default:
          // #! 支持函数
          if(change.callback){
            newState = change.callback(_records, immutableState[change.name], payload.params, immutableState, initialState);
          }else if(change[payload.status]){ // #! 符合status的对应callback
            newState = change[payload.status](_records, immutableState[change.name], payload.params, immutableState, initialState);
          }
          if(change.name){
            immutableState = immutableState.set(change.name, newState === undefined ? initialState[change.name] : newState);
          }else if(newState === undefined){
            immutableState = initialState;
          }else{
            immutableState = newState;
          }
          break;
      }
    });
    return immutableState;
  }else{
    /**
     * + 在状态不变时，需要返回defaultState; 在状态改变时，每次返回新的state
     * > see: http://cn.redux.js.org/docs/basics/Reducers.html
     */
    return immutableState;
  }
}

// + 创建actionTypes和actionCreators
export function createActions(crudResourceNames, resourceNames){
  let map = {};
  crudResourceNames.forEach(resourceName => {
    map[resourceName] = createActionTypes(resourceName, true);
  });
  resourceNames.forEach(resourceName => {
    map[resourceName] = createActionTypes(resourceName);
  });

  return {
    getActionTypes(){
      let actionsMap = {};
      for(let key in map){
        Object.assign(actionsMap, map[key]);
      }
      return actionsMap;
    },
    getActionCreators(){
      let creatorsMap = {};
      for(let key in map){
        Object.assign(creatorsMap, createActionCreators(key, map[key]));
      }
      return creatorsMap;
    }
  }  
}
