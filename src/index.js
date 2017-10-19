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
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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

import {View} from './utils/componentDecorator';
export const configureStore = require('./store/configureStore'); 
export const RxSelector = require('./utils/rxSelector');
export const RxComponent = require('./utils/rxComponent');

// #! require.context('./models', false, /\.js$/);
export function autoLoadStore(initialState = {}, middlewares = [], context, getInitReducers = function(){}){
  if(!context){
    throw new Error('需要提供require.context的遍历列表！');
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
    throw new Error('需要提供require.context的遍历列表！');
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
    throw new Error('需要提供require.context的遍历列表！');
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


const damo = {
  $$routes__: [],
  $$defaultModels__: {},
  $$store__: null,
  init(initialState={}, defaultModels = {}, middlewares = []){
    damo.$$defaultModels__ = defaultModels;
    damo.$$store__ = configureStore(initialState, middlewares, hot => {
      return {
        defaultModels
      };
    });
  },
  model(Models){
    if(!damo.$$store__){
      throw new Error('需要调用damo.init初始化！');
    }
    damo.$$store__.addModel(Models);
  },
  service(Services){
    rcInject.setService(Services);
  },
  toselect(Model, prop){
    return (state, ownProps) => {
      if(typeof Model === 'function' && !Model.displayName){
        return Model(state, ownProps);
      }else{
        return damo.select(Model, prop); 
      }
    }
  },
  select(modelName, prop){
    if(!damo.$$store__){
      throw new Error('需要调用damo.init初始化！');
    }
    if(Object(modelName) === modelName){
      modelName = modelName.displayName;
    }
    return damo.$$store__.getModel(modelName).select(prop, true);
  },
  route(path, RouteComponent, option){
    if(Object(path) === path){
      option = RouteComponent;
      RouteComponent = path;
      path = RouteComponent.routePath;
    }
    const routeConfig = Object.assign({
      path: path,
      component: RouteComponent,
      onLeave: RouteComponent.onLeave,
      onEnter: RouteComponent.onEnter,
      indexRoute: RouteComponent.indexRoute
    }, option);
    
    damo.$$routes__.push(routeConfig);
    
    return {
      route: (path, RouteComponent, option) => {
        routeConfig.childRoutes = routeConfig.childRoutes || [];
        if(Object(path) === path){
          option = RouteComponent;
          RouteComponent = path;
          path = RouteComponent.routePath;
        }
        const _routeConfig = Object.assign({
          path: path,
          component: RouteComponent,
          onLeave: RouteComponent.onLeave,
          onEnter: RouteComponent.onEnter,
          indexRoute: RouteComponent.indexRoute
        }, option);
        
        _routeConfig.childRoutes.push(routeConfig);
      }
    }
  },
  autoLoadModels(context, noHot){
    if(!damo.$$store__){
      throw new Error('需要调用damo.init初始化！');
    }
    if(!context){
      throw new Error('需要提供require.context的遍历列表！');
    }

    const defaultModels = Object.assign({}, damo.$$defaultModels__);

    context.keys().forEach(key => {
      defaultModels[key.split('/').pop().split('.')[0]] = context(key);
    });
    
    configureStore.replace(defaultModels);
    
    if (module.hot && !noHot) {
      module.hot.accept(context.id, () => {
        damo.autoLoadModels(context, true);
      });
    }
  },
  autoLoadServices(context){
    autoLoadServices(context);
  },
  autoLoadRoutes(context, routeCallback){
    autoLoadScenesRoutes(context, routeCallback);
  },
  view(Selector, SceneComponent, providers){
    if(Selector.prototype instanceof Component){
      providers = SceneComponent;
      SceneComponent = Selector;
    }
    return View({selector: Selector, providers: providers})(SceneComponent);
  },
  start(RootComponent, DOM){
    if(!damo.$$store__){
      throw new Error('需要调用damo.init初始化！');
    }
    if(!React.isValidElement(RootComponent)){
      RootComponent = (<RootComponent/>);
    }
    if(DOM){
      if(typeof DOM === 'string'){
        DOM = document.getElementById(DOM);
      }
    }else{
      DOM = document.body;
    }
    ReactDOM.render(RootComponent, DOM);
  }
}

export {damo};