import { BaseModel } from '../utils/baseModel';
import { BaseSelector } from '../utils/baseSelector';
import { lcfirst } from '../utils/core';
import { createReducerAndModels } from './createReducerFactory';
import { combineReducers } from '../utils/rx';
import SI from 'seamless-immutable';

export default function enhanceStore(appStore, models, reducers){
  appStore.models = models;
  appStore.reducers = reducers;
  /**
   * + 动态添加Reducer，此处是动态添加Model，每个Model会产生一个Reducer
   * > see: http://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
   */
  appStore.addModel = (Models) => {
    if(Models.prototype instanceof BaseModel){
      Models = [Models]; 
    }
    if(Array.isArray(Models)){
      const newModels = {};
      Models.forEach(Model => {
        if(!Model.displayName){
          Model.displayName = lcfirst(Model.name);
        }
        newModels[Model.displayName] = Model;
      });
      Models = newModels;
    }
    const { reducers, models } = createReducerAndModels(appStore.reducers, Models);
    Object.assign(appStore.models, models);
    appStore.reducers = reducers;

    const rootReducer = combineReducers(reducers);
    appStore.replaceReducer(rootReducer);
    
    for(let name in models){
      let type = '@rx/store/hot-' + name;
      models[name].defineActionTypes[type] = {
        type: type,
        status: 'action'
      }
      
      appStore.dispatch({type: type, state: reducers[name].$initialState});
    }
  }
  appStore.getModel = (name) => {
    return appStore.models[name];
  }
  /**
   * + 整个方案关键之处
   * 1. 把所有models实例挂在store实例下
   * 2. 把store实例赋予BaseModel，所有集成于BaseModel的Model类，都可以获取到store以及model实例
   * 3. 把store实例赋予BaseSelector，所有集成于BaseSelector的Selector类，都可以获取到store以及model实例
   */
  BaseModel.appStore = appStore;
  BaseSelector.appStore = appStore;
  BaseSelector.emitter.emit('ready'); 
}
