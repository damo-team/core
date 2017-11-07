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
import router from './utils/router';

import {BaseSelector} from './utils/baseSelector';
import {BaseModel} from './utils/baseModel';
import {rcInject} from './utils/inject';
import {Api} from './utils/fetch';
import {Poller} from './utils/poller';

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
export const configureStore = require('./store/configureStore');
export const RxSelector = require('./utils/rxSelector');
export const RxComponent = require('./utils/rxComponent');

// #! require.context('./models', false, /\.js$/);
export function autoLoadStore(initialState = {}, middlewares = [], context, getInitReducers = function () {}) {
  if (!context) {
    throw new Error('需要提供require.context的遍历列表！');
  }
  return configureStore(initialState, middlewares, hot => {
    const Models = getInitReducers() || {};
    context
      .keys()
      .forEach(key => {
        Models[
          key
            .split('/')
            .pop()
            .split('.')[0]
        ] = context(key);
      });
    const hotAcceptId = context.id;
    let hotModelsFeedback;
    if (hot) {
      hotModelsFeedback = () => {
        // const reloadedContext = require.context('./models', false, /\.js$/);
        const reloadedModels = getInitReducers() || {};
        context
          .keys()
          .forEach(key => {
            reloadedModels[
              key
                .split('/')
                .pop()
                .split('.')[0]
            ] = context(key);
          });
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
  const Services = {};
  context
    .keys()
    .forEach(key => {
      Services[
        key
          .split('/')
          .pop()
          .split('.')[0]
      ] = context(key);
    });
  rcInject.setService(Services)
}

// #! require.context('./scenes', true, /index\.jsx$/)
export function autoLoadScenesRoutes(context, option = {}) {
  if (!context) {
    throw new Error('需要提供require.context的遍历列表！');
  }
  if (typeof option === 'function') {
    option = {
      callback: option
    };
  }
  const routeCallback = option.callback || function () {};
  const level = option.level || 1;
  const routes = [];
  context
    .keys()
    .sort((a, b) => a.split('/').length > b.split('/').length)
    .forEach(relativePath => {
      const keys = relativePath
        .slice(2, -10)
        .split(path.sep);
      const Comp = context(relativePath);
      if (keys[0] === '') {
        keys.shift();
      }
      let key,
        childRoute,
        temp,
        name,
        children;
      if (keys.length < level) {
        name = keys.pop() || 'root';
        childRoute = router(Comp.routePath || name, Comp, {name: name});
        if (childRoute && routeCallback(childRoute, relativePath) !== false) {
          routes.push(childRoute);
        };
      } else {
        name = keys.pop();
        children = routes;
        let route;
        if (keys.length) {
          while ((key = keys.shift()) && (temp = children.find(route => route.name === key))) {
            route = temp;
            children = route.childRoutes || [];
          }
        } else {
          route = children.find(route => route.name === 'root')
        }
        if (route) {
          route.childRoutes = route.childRoutes || [];
          childRoute = router(Comp.routePath || name, Comp, {
            name: name
          }, option.strict);
          if (childRoute && routeCallback(childRoute, relativePath) !== false) {
            route
              .childRoutes
              .push(childRoute);
          }
        } else {
          childRoute = router(Comp.routePath || name, Comp, {
            name: name,
            navKey: key
          }, option.strict);
          if (childRoute && routeCallback(childRoute, relativePath) !== false) {
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
  init(initialState = {}, defaultModels = {}, middlewares = []) {
    if (damo.$$store__) {
      console.warn('Application initialized！')
    }
    damo.$$defaultModels__ = defaultModels;
    damo.$$store__ = configureStore(initialState, middlewares, hot => {
      return {defaultModels};
    });
  },
  model(Models) {
    if (!damo.$$store__) {
      throw new Error('Application uninitialized，initliaze Application by damo.init');
    }
    damo
      .$$store__
      .addModel(Models);
  },
  service(Services) {
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
  route(path, RouteComponent, option = {}) {
    const routeConfig = router(path, RouteComponent, option, option.strict);
    damo
      .$$routes__
      .push(routeConfig);

    return {
      route: (path, RouteComponent, option) => {
        routeConfig.childRoutes = routeConfig.childRoutes || [];
        const _routeConfig = router(path, RouteComponent, option, option.strict);
        if (_routeConfig) {
          routeConfig
            .childRoutes
            .push(_routeConfig);
        }
      }
    }
  },
  autoLoadModels(context, noHot) {
    if (!damo.$$store__) {
      throw new Error('Application uninitialized，initliaze Application by damo.init');
    }
    if (!context) {
      throw new Error('需要提供require.context的遍历列表！');
    }

    const defaultModels = Object.assign({}, damo.$$defaultModels__);

    context
      .keys()
      .forEach(key => {
        defaultModels[
          key
            .split('/')
            .pop()
            .split('.')[0]
        ] = context(key);
      });

    configureStore.replace(damo.$$store__, defaultModels);

    if (module.hot && !noHot) {
      module
        .hot
        .accept(context.id, () => {
          damo.autoLoadModels(context, true);
        });
    }
  },
  autoLoadServices(context) {
    autoLoadServices(context);
  },
  autoLoadRoutes(context, option) {
    damo.$$routes__ = autoLoadScenesRoutes(context, option);
  },
  view(Selector, SceneComponent, providers) {
    if (Array.isArray(Selector)) {
      const moelds = Selector;
      class SelectorClass extends BaseSelector {
        static dataBindings = moelds;
        static eventBindings = moelds;
      }
      Selector = SelectorClass;
    } else if (Selector.prototype.isReactComponent) {
      providers = SceneComponent;
      SceneComponent = Selector;
      Selector = null;
    }
    return View({selector: Selector, providers: providers})(SceneComponent);
  },
  bootstrap(RootComponent, DOM, dirname) {
    if (!damo.$$store__) {
      throw new Error('Application uninitialized，initliaze Application by damo.init');
    }
    if (RootComponent.tagName || typeof RootComponent === 'string') {
      dirname = DOM;
      DOM = RootComponent;
      RootComponent = null;
    } else if (!React.isValidElement(RootComponent)) {
      RootComponent = React.createElement(RootComponent, null);
    }
    if (DOM) {
      if (typeof DOM === 'string') {
        DOM = document.getElementById(DOM);
      }
    } else {
      DOM = document.body;
    }
    let routes = damo.$$routes__;
    if (Array.isArray(RootComponent)) {
      routes = RootComponent;
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
  run: damo.bootstrap,
  BaseSelector: BaseSelector,
  BaseModel: BaseModel,
  injector: rcInject,
  Api: Api,
  Poller: Poller
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
