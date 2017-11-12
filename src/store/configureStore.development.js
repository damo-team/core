/**
 * # 【日常】创建全局唯一的store
 *  1. applyMiddleware -> compose -> enhancer
 *  2. combineReducers -> rootReducer
 *  3. createStore(rootReducer, initialState, enhancer);
 *  > see: https://github.com/barrystaes/react-trebuchet/tree/test-bottledapi-apireduxmiddleware/src/store
 */
import { 
  createStore, 
  compose, 
  applyMiddleware, 
  combineReducers 
} from '../utils/rx';
/**
 * + redux的middleware，让dispatch支持actionCreator  
 * > see: https://www.npmjs.com/package/redux-thunk 
 */
import thunk from 'redux-thunk';
/**
 * + redux的middleware, 支持action日志打印到console控制台
 * > see: https://www.npmjs.com/package/redux-logger
 */
import createLogger from 'redux-logger';

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

  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  const router = routerMiddleware(hashHistory);

  const enhancer = compose(
    applyMiddleware(thunk, router, logger, ...storeMiddlewares, promiseMiddleware(), loadingBarMiddleware({promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']})),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop
  );

  const { Models, hotAcceptId, hotModelsFeedback } = createReducer(module.hot);

  const { reducers, models } = createReducerAndModels({routing: routerReducer, loadingBar: loadingBarReducer}, Models);
  
  const rootReducer = combineReducers(reducers);

  appStore = createStore(rootReducer, initialState, enhancer);
  
  enhanceStore(appStore, models, reducers);

  // #! 集成到chrome插件redux
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    window.__REDUX_DEVTOOLS_EXTENSION__.updateStore(appStore);
  }

  /**
   * + 支持代码热模块替换，原理是重新替换所有的Reducer
   * > see: https://webpack.github.io/docs/hot-module-replacement.html#example-3-hot-module-replace-with-require-context
   */
  if (module.hot && hotModelsFeedback) {
    module.hot.accept(hotAcceptId, () => {
      
      const Models = hotModelsFeedback();

      configureStore.replace(appStore, Models);
    });
  }

  return appStore;
}


configureStore.replace = function(appStore, Models){
  const { reducers, models } = createReducerAndModels({routing: routerReducer, loadingBar: loadingBarReducer}, Models);
  
  const rootReducer = combineReducers(reducers);
  
  appStore.replaceReducer(rootReducer);
  
  // #! 重新赋值models
  Object.assign(appStore.models, models);
}
