import SI         from 'seamless-immutable';
import { applyCrudReducer, changeOperators } from '../utils/createCrud';
import { BaseModel } from '../utils/baseModel';

/**
 * ### 通过Model实例生成Reducer
 * + 通过 model.mapToStore -> state[model.name]初始化值
 * + 当Reducer触发时，通过model.defineActionTypes判断是否匹配到actionType, 否则直接跳过
 * + 对于Model要求的属性包括：
 * ```
 *  modelInstance = {
 *    mapToStore,
 *    name,
 *    defineActionTypes
 *  }
 */
export function createReducerFactory(modelInstance){
  const initialState = SI(modelInstance.properties);

  function reducer(state = initialState, action){
    if(modelInstance.defineActionTypes[action.type]){
      if(action.state){
        if(typeof action.state === 'function'){
          return action.state(state);
        }else{
          return action.state;
        }
      }else{
        return applyCrudReducer(state, action.payload, initialState);
      }
    }else{
      return state;
    }
  }
  reducer.$initialState = initialState;
  return reducer;
}

/**
 * ### 把多个Models分别转换为对应的reducer
 * 针对每个Model通过`createReducerFactory`调用转成对应的Reducer
 */
export function createReducerAndModels(reducers, Models){
  const models = {};
  if(Array.isArray(Models)){
    Models.forEach(Model => {
      let name = Model.displayName;
      if(Model.prototype instanceof BaseModel){
        name = Model.displayName;
        if(name){
          models[name] = new Model(name, Model.initialState);
          // models[name].setName(name);
          reducers[name] = createReducerFactory(models[name]);
        }else{
          throw new Error('数据模型${Model.name}：displayName静态属性不能为空！');
        }
      }else{
        models[name] = Model;
        if(models[name].mapToStore){
          reducers[name] = createReducerFactory(models[name]);
        }else{
          reducers[name] = models[name];
        }
      }
    })
  }else{
    for(let name in Models){
      let Model = Models[name];
      if(Model.prototype instanceof BaseModel){
        name = Model.displayName || name;
        models[name] = new Model(name, Model.initialState);
        // models[name].setName(name);
        reducers[name] = createReducerFactory(models[name]);
      }else{
        models[name] = Model;
        if(models[name].mapToStore){
          reducers[name] = createReducerFactory(models[name]);
        }else{
          reducers[name] = models[name];
        }
      }
    }
  }
  return {
    reducers: reducers,
    models: models
  }
}

/**
 * ### seamless-immutable 知识点
 * 不可变的数据结构，目的是保证整个store的所有state只能通过reducer来改变
 *  - flatMap 平铺扩展
 *  - asObject 数组转成对象
 *  - asMutable 复制出一个可变对象
 *  - merge 扩展对象属性
 *  - set, setIn 变更对象属性
 *  - update, updateIn 更新对象属性
 *  - without 开放指定对象属性，使其可变
 * > see: https://github.com/rtfeldman/seamless-immutable
 */
