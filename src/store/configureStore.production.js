/**
 * # 【生产】创建全局唯一的store
 *  1. applyMiddleware -> compose -> enhancer
 *  2. combineReducers -> rootReducer
 *  3. createStore(rootReducer, initialState, enhancer);
 * > see: https://github.com/barrystaes/react-trebuchet/tree/test-bottledapi-apireduxmiddleware/src/store
 */
import { 
  createStore,
  applyMiddleware, 
  combineReducers 
} from '../utils/rx';
/**
 * + redux的middleware，让dispatch支持actionCreator  
 * > see: https://www.npmjs.com/package/redux-thunk 
 */
import thunk from 'redux-thunk';
/**
 * + history + store (redux) → react-router-redux → enhanced history → react-router
 * > see: https://github.com/reactjs/react-router-redux/blob/master/README.md#how-it-works
 */
import { hashHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
/**
 * + react-redux-loading-bar
 * > see: https://www.npmjs.com/package/react-redux-loading-bar
 */
import promiseMiddleware from 'redux-promise-middleware'; 
import { loadingBarReducer } from 'react-redux-loading-bar';
import { loadingBarMiddleware } from './loadingBarMiddleware';
/**
 * + 把Models转成Reducers注入到redux
 * 同时redux生成的store赋予BaseModel和BaseSelector
 */
import { createReducerAndModels } from './createReducerFactory';
import enhanceStore from './enhanceStore';

let appStore;
export default function configureStore(initialState, storeMiddlewares, createReducer) {
  if(appStore) return appStore;

  const router = routerMiddleware(hashHistory);

  const enhancer = applyMiddleware(thunk, router, ...storeMiddlewares, promiseMiddleware(), loadingBarMiddleware({promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']}));

  /**
   * + 组合所有reducer到一起，每次触发action，所有reducer都会调用
   * > see: http://stackoverflow.com/questions/33590579/all-reducers-will-be-invoked-when-an-action-is-dispatched
   */
  const { Models } = createReducer();

  let { reducers, models } = createReducerAndModels({routing: routerReducer, loadingBar: loadingBarReducer}, Models);

  const rootReducer = combineReducers(reducers);
  
  appStore = createStore(rootReducer, initialState, enhancer);

  enhanceStore(appStore, models, reducers);
  return appStore;
}

configureStore.replace = function(appStore, Models){
  let { reducers, models } = createReducerAndModels({routing: routerReducer, loadingBar: loadingBarReducer}, Models);
  
  const rootReducer = combineReducers(reducers);
  
  appStore.replaceReducer(rootReducer);
  
  // #! 重新赋值models
  Object.assign(appStore.models, models);
}
