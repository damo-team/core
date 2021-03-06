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
import SI from 'seamless-immutable';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
import router from './utils/router';
import {BaseSelector} from './utils/baseSelector';
import {BaseModel} from './utils/baseModel';
import {rcInject} from './utils/inject';
import {Api} from './utils/fetch';
import {Poller} from './utils/poller';
import {resource} from './resource';

export * from './utils/core';
export * from './utils/componentDecorator';
export * from './utils/createCrud';
export * from './resource';

export * from './utils/baseSelector';
export * from './utils/baseModel';
export * from './utils/inject';
export * from './utils/fetch';
export * from './utils/poller';

import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import useBasename from 'history/lib/useBasename';

import {View} from './utils/componentDecorator';
export const Link = require('react-router').Link;
export const configureStore = require('./store/configureStore');
export const RxSelector = require('./utils/rxSelector');
export const RxComponent = require('./utils/rxComponent');
import hoistNonReactStatics from 'hoist-non-react-statics';

function extractModules(context){
  const modules = {};

  context
      .keys()
      .forEach(key => {
        let module = context(key);
        if(module.default){
          module = module.default;
        }
        const paths = key.split(path.sep);
        let name = module.displayName;
        if(!name){
          const fileName = paths.pop().split('.').slice(0, -1).join('.');
          if(fileName === 'index'){
            name = paths.pop();
          }else{
            name = fileName;
          }
        }
        modules[name] = module;
      });
    return modules;
}
// #! require.context('./models', false, /\.js$/);
export function autoLoadStore(initialState = {}, middlewares = [], context, getInitReducers = function () {}) {
  if (!context) {
    throw new Error('需要提供require.context的遍历列表！');
  }
  return configureStore(initialState, middlewares, hot => {
    const Models = extractModules(context);
    Object.assign(Models, getInitReducers());
    const hotAcceptId = context.id;
    let hotModelsFeedback;
    if (hot) {
      hotModelsFeedback = () => {
        // const reloadedContext = require.context('./models', false, /\.js$/);
        const reloadedModels = extractModules(context);
        Object.assign(reloadedModels, getInitReducers());
        return {Models: reloadedModels};
      }
    }
    return {Models, hotAcceptId, hotModelsFeedback};
  });
}

export function autoLoadServices(context) {
  if (!context) {
    throw new Error('需要提供require.context的遍历列表！');
  }
  const Services = extractModules(context);
  rcInject.setService(Services)
}

// #! require.context('./scenes', true, /index\.jsx$/)
export function autoLoadRoutes(context, option) {
  if (!context) {
    throw new Error('需要提供require.context的遍历列表！');
  }
  if (typeof option === 'function') {
    option = {
      callback: option
    };
  }
  const routeCallback = option.callback || function () {}
  const leave = option.leave || 1;
  const routes = [];
  context
    .keys()
    .sort((a, b) => a.split('/').length - b.split('/').length)
    .forEach(relativePath => {
      const keys = relativePath
        .slice(2, -10)
        .split(path.sep);
      if (keys[0] === '') {
        keys.shift();
      }
      const Comp = context(relativePath);
      let key,
        childRoute,
        temp,
        name,
        children;
      if (keys.length < leave) {
        childRoute = router(Comp.routePath, Comp, {
          name: keys[0] || '/',
          strict: option.strict
        });
        if (childRoute && routeCallback(childRoute, relativePath) !== false) {
          routes.push(childRoute);
        };
      } else {
        name = keys.pop();
        children = routes;
        let route;
        let navKey = keys[keys.length - 1];
        if (keys.length) {
          while ((key = keys.shift()) && (temp = children.find(route => route.name === key))) {
            route = temp;
            children = route.childRoutes || [];
          }
        }
        if(!route){
					route = children.find(function (route) {
	          return route.name === '/';
	        });
	        children = route.childRoutes || [];
        }
        
        if (route) {
          route.childRoutes = route.childRoutes || [];
          childRoute = router(Comp.routePath, Comp, {
            name: name,
            navKey: navKey,
            strict: option.strict
          });
          childRoute.parent = route;
          if (childRoute && routeCallback(childRoute, relativePath) !== false) {
            route
              .childRoutes
              .push(childRoute);
          }
        } else {
          childRoute = router(Comp.routePath, Comp, {
            name: name,
            navKey: navKey,
            strict: option.strict
          });
          if (childRoute && routeCallback(childRoute, relativePath) !== false) {
            routes.push(childRoute);
          };
        }
      }
    });
  return routes;
}

const damo = {
  Link: Link,
  $$routes__: [],
  $$defaultModels__: {},
  $$store__: null,
  $$callback__: [],
  $$routesMap__: {},
  setRoute(route){
    damo.$$routesMap__[damo.getResolvePath(route)] = route;
  },

  getRoute(name){
    return damo.$$routesMap__[name];
  },

  getResolvePath(route) {
    let resolvePath;
    if (route.resolvePath) {
      resolvePath = route.resolvePath;
    } else{
      const paths = [route.path || route.name];
      let item = route;
      while (item = item.parent) {
        paths.unshift(item.name);
      }
      resolvePath = paths
        .join('/')
        .replace(/\/+/g, '/');
      route.resolvePath = resolvePath;
    }
    return resolvePath;
  },

  getRoutes() {
    return damo.$$routes__;
  },
  fireReady() {
    let callback;
    while (callback = damo.$$callback__.pop()) {
      callback();
    }
  },
  init(initialState = {}, defaultModels = {}, middlewares = []) {
    if (damo.$$store__) {
      console.warn('Application initialized！');
      return;
    }
    damo.$$defaultModels__ = defaultModels;
    damo.$$store__ = configureStore(initialState, middlewares, hot => {
      return {defaultModels};
    });
    damo.fireReady();
  },
  model(name, Models, entity) {
    if (!damo.$$store__) {
      damo
        .$$callback__
        .push(() => {
          damo.model(name, Models, entity);
        });
      return;
    }
    if (Models) {
      Models = {
        [name]: Models
      }
      if (entity) {
        Models[name] = resource(entity)(Models[name]);
      }
    } else {
      entity = Models;
      Models = name;
      if (entity) {
        Models = resource(entity)(Models);
      }
    }
    damo
      .$$store__
      .addModel(Models);
  },
  service(name, Services) {
    if (!damo.$$store__) {
      damo
        .$$callback__
        .push(() => {
          damo.service(name, Services);
        });
      return;
    }
    if (Services) {
      Services = {
        [name]: Services
      }
    } else {
      Services = name;
    }
    rcInject.setService(Services);
  },
  getModel(modelName) {
    if (!damo.$$store__) {
      throw new Error('Application uninitialized，initliaze Application by damo.init');
    }
    if (Object(modelName) === modelName) {
      modelName = modelName.displayName;
    }
    return damo.$$store__.models[modelName];
  },
  toselect(Model, prop) {
    return (state, ownProps) => {
      if (typeof Model === 'function' && !Model.displayName) {
        return Model(state, ownProps);
      } else {
        return damo.select(Model, prop);
      }
    }
  },
  invoke(Model, prop) {
    return (...args) => {
      if (typeof Model === 'function' && !Model.displayName) {
        return Model(state, ownProps);
      } else {
        if (!damo.$$store__) {
          throw new Error('Application uninitialized，initliaze Application by damo.init');
        }
        const modelName = Object(Model) === Model
          ? Model.displayName
          : Model;
        const model = damo
          .$$store__
          .getModel(modelName);
        if (model && model[prop]) {
          model[prop].apply(model, args);
        } else {
          throw new Error('Model or Method is undefined');
        }
      }
    }
  },
  select(modelName, prop) {
    if (!damo.$$store__) {
      throw new Error('Application uninitialized，initliaze Application by damo.init');
    }
    if (Object(modelName) === modelName) {
      modelName = modelName.displayName;
    }
    return damo
      .$$store__
      .getModel(modelName)
      .select(prop, true);
  },
  route(path, RouteComponent, option) {
    if(arguments.length === 1 && typeof path === 'string'){
      return damo.getRoute(path);
    }
    const routeConfig = router(path, RouteComponent, option);
    damo.setRoute(routeConfig);
    damo
      .$$routes__
      .push(routeConfig);

    return {
      route: (path, RouteComponent, option) => {
        if(arguments.length === 1 && typeof path === 'string'){
          return damo.getRoute(path);
        }
        
        routeConfig.childRoutes = routeConfig.childRoutes || [];
        const childRouteConfig = router(path, RouteComponent, option);
        damo.setRoute(childRouteConfig);
        routeConfig
          .childRoutes
          .push(childRouteConfig);
      }
    }
  },
  
  autoLoadModels(modelContext, resourceContext, noHot) {
    if (!damo.$$store__) {
      damo
        .$$callback__
        .push(() => {
          damo.autoLoadModels(modelContext, resourceContext, noHot);
        });
      return;
    }
    if (!modelContext) {
      throw new Error('需要提供require.context的遍历列表！');
    }

    const defaultModels = Object.assign({}, damo.$$defaultModels__, extractModules(modelContext));

    if (resourceContext) {
      const resources = extractModules(resourceContext);
      for(let key in resources){
        defaultModels[name] = resource(resources[key])(defaultModels[name]);
      }
    }

    configureStore.replace(damo.$$store__, defaultModels);

    if (module.hot && !noHot) {
      module
        .hot
        .accept(modelContext.id, () => {
          damo.autoLoadModels(modelContext, true);
        });
    }
  },
  autoLoadServices(context) {
    autoLoadServices(context);
  },
  autoLoadRoutes(context, option = {}) {
    const callback = option.callback;
    option.callback = (childRoute, relativePath) => {
      damo.setRoute(childRoute);
      return callback && callback(childRoute, relativePath)
    }
    damo.$$routes__ = autoLoadRoutes(context, option);
  },
  view(Selector, SceneComponent, providers, noFlattern) {
    if(typeof providers === 'boolean'){
      noFlattern = providers;
      providers = null;
    }
    if (Array.isArray(Selector)) {
      const moelds = Selector;
      class SelectorClass extends BaseSelector {
        static noFlattern = noFlattern;
        static dataBindings = moelds;
        static eventBindings = moelds;
      }
      Selector = SelectorClass;
    } else if (Selector.prototype.isReactComponent) {
      providers = SceneComponent;
      SceneComponent = Selector;
      Selector = null;
    }else{
      Selection.noFlattern = noFlattern;
    }
    
    if (!damo.$$store__) {
      const getView = (location, callback) => {
        callback(null, View({selector: Selector, providers: providers})(SceneComponent));
      }
      return hoistNonReactStatics(getView, SceneComponent);
    }else{
      return View({selector: Selector, providers: providers})(SceneComponent);
    }
  },
  bootstrap(RootComponent, DOM, dirname) {
    if (!damo.$$store__) {
      damo.fireReady();
    }
    let routes = damo.$$routes__;

    if(RootComponent){
      if (RootComponent.tagName || typeof RootComponent === 'string') {
        dirname = DOM;
        DOM = RootComponent;
        RootComponent = null;
      } else if (Array.isArray(RootComponent)) {
        routes = RootComponent;
        damo.$$routes__ = routes;
        damo.$$routesMap__ = {};
        routes.forEach(route => damo.setRoute(route));
        RootComponent = null;
      }else if (!React.isValidElement(RootComponent)) {
        RootComponent = React.createElement(RootComponent, null);
      }
    }
    if (DOM) {
      if (typeof DOM === 'string') {
        DOM = document.getElementById(DOM);
      }
    } else {
      DOM = document.body;
    }
    
    if (routes.length && dirname !== false) {
      RootComponent = React.createElement(Provider, {
        store: damo.$$store__
      }, React.createElement(Router, {
        history: dirname
          ? withBasename(browserHistory, dirname)
          : browserHistory,
        routes: routes
      }));
    } else if (damo.$$store__ && RootComponent) {
      RootComponent = React.createElement(Provider, {
        store: damo.$$store__
      }, RootComponent);
    }

    ReactDOM.render(RootComponent, DOM);
  }
}

const exportObj = {
  BaseSelector: BaseSelector,
  BaseModel: BaseModel,
  injector: rcInject,
  Api: Api,
  Poller: Poller,
  run: damo.bootstrap,

  serialize: (obj) => {
    return SI(obj);
  },
  deserialize: (obj, depth) => {
    if(SI.isImmutable(obj)){
      return obj.asMutable({isDeep: depth});
    }else{
      return obj;
    }
  }
};

Object.assign(damo, exportObj);

export default damo;

function withBasename(history, dirname) {
  if (dirname) {
    return useBasename(() => history)({basename: `/${dirname}`})
  } else {
    return history;
  }
}
