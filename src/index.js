/**
 * # starter入口
 *  - baseSelector.js - Selector基类
 *  - componentDecorator.js - 组件装饰器(recompose的封装，涵盖redux.connect)
 *  - core.js - 核心工具方法
 *  - createCrud.js - 创建actionType和actionCreator等工厂方法 
 *  - fetch.js - 接口调用模块
 *  - baseModel.js - Model基类 
 *  - configureStore.development.js - 日常构建store
 *  - configureStore.production.js - 生产构建store
 *  - createReducerFactory.js - 基于Model生成reducer的工厂方法
 *  - loadingBarMiddleware.js - hack loadingbar中间件，为了更加方便控制loadingbar
 * > demo: http://groups.alidemo.cn/aliyun_FED/naza-react-starter/demo/build/index.html
 */
import path from 'path';
import {rcInject} from './utils/inject';

export * from './utils/inject';
export * from './utils/core';
export * from './utils/componentDecorator';
export * from './utils/createCrud';
export * from './utils/baseModel';
export * from './utils/poller';
export * from './utils/baseSelector';
export * from './utils/fetch';
export * from './resource';

export const configureStore = require('./store/configureStore'); 
export const RxSelector = require('./utils/rxSelector');
export const RxComponent = require('./utils/rxComponent');

// #! require.context('./models', false, /\.js$/);
export function autoLoadStore(initialState = {}, middlewares = [], context, getInitReducers = function(){}){
  if(!context){
    throw new Error('需要提供model的require.context的遍历列表！');
  }
  return configureStore(initialState, middlewares, hot => {
    const Models = getInitReducers() || {};
    context.keys().forEach(key => {
      Models[key.split('/').pop().split('.')[0]] = context(key);
    });
    const hotAcceptId = context.id;
    let hotModelsFeedback;
    if(hot){
      hotModelsFeedback = () => {
        // const reloadedContext = require.context('./models', false, /\.js$/);
        const reloadedModels = getInitReducers() || {};
        context.keys().forEach(key => {
          reloadedModels[key.split('/').pop().split('.')[0]] = context(key);
        });
        return {
          Models: reloadedModels
        };
      }
    }
    return {
      Models,
      hotAcceptId,
      hotModelsFeedback
    };
  });
}

export function autoLoadServices(context){
  if(!context){
    throw new Error('需要提供service的require.context的遍历列表！');
  }
  const Services = {};
  context.keys().forEach(key => {
    Services[key.split('/').pop().split('.')[0]] = context(key);
  });
  rcInject.setService(Services)
}

// #! require.context('./scenes', true, /index\.jsx$/)
export function autoLoadScenesRoutes(context, routeCallback = function(){}) {
  if(!context){
    throw new Error('需要提供scene的require.context的遍历列表！');
  }
  
  const routes = [];
  context.keys().sort((a, b) => a.split('/').length > b.split('/').length).forEach(relativePath => {
    const keys = relativePath.slice(2, -10).split(path.sep);
    const Comp = context(relativePath);
    let key, childRoute, temp, name, children;
    if(keys.length === 1){
      childRoute = {
        name: keys[0],
        path: Comp.routePath,
        component: Comp,
        onLeave: Comp.onLeave,
        onEnter: Comp.onEnter
      };
      if(routeCallback(childRoute, relativePath) !== false){
        routes.push(childRoute);
      };
    }else{
      name = keys.pop();
      children = routes;
      let route;
      while((key = keys.shift()) && (temp = children.find(route => route.name === key))){
        route = temp;
        children = route.childRoutes || [];
      }
      if(route){
        route.childRoutes = route.childRoutes || [];
        childRoute = {
          name: name,
          path: Comp.routePath,
          component: Comp,
          onLeave: Comp.onLeave,
          onEnter: Comp.onEnter
        };
        if(routeCallback(childRoute, relativePath) !== false){
          route.childRoutes.push(childRoute);
        }
      }else{
        childRoute = {
          name: name,
          navKey: key,
          path: Comp.routePath,
          component: Comp,
          onLeave: Comp.onLeave,
          onEnter: Comp.onEnter
        };
        if (routeCallback(childRoute, relativePath) !== false) {
          routes.push(childRoute);
        };
      }
    }
  });
  return routes;
}
