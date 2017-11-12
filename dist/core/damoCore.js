(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("seamless-immutable"), require("events"), require("react-router"), require("rxjs"), require("cuid"), require("react-dom"), require("react-redux"), require("react-redux-loading-bar"), require("recompose"), require("damo-redux"), require("hoist-non-react-statics"), require("isomorphic-fetch"), require("react-router-redux"), require("redux-logger"), require("redux-promise-middleware"), require("redux-thunk"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "seamless-immutable", "events", "react-router", "rxjs", "cuid", "react-dom", "react-redux", "react-redux-loading-bar", "recompose", "damo-redux", "hoist-non-react-statics", "isomorphic-fetch", "react-router-redux", "redux-logger", "redux-promise-middleware", "redux-thunk"], factory);
	else if(typeof exports === 'object')
		exports["damo"] = factory(require("react"), require("seamless-immutable"), require("events"), require("react-router"), require("rxjs"), require("cuid"), require("react-dom"), require("react-redux"), require("react-redux-loading-bar"), require("recompose"), require("damo-redux"), require("hoist-non-react-statics"), require("isomorphic-fetch"), require("react-router-redux"), require("redux-logger"), require("redux-promise-middleware"), require("redux-thunk"));
	else
		root["damo"] = factory(root["react"], root["seamless-immutable"], root["events"], root["react-router"], root["rxjs"], root["cuid"], root["react-dom"], root["react-redux"], root["react-redux-loading-bar"], root["recompose"], root["damo-redux"], root["hoist-non-react-statics"], root["isomorphic-fetch"], root["react-router-redux"], root["redux-logger"], root["redux-promise-middleware"], root["redux-thunk"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_48__, __WEBPACK_EXTERNAL_MODULE_49__, __WEBPACK_EXTERNAL_MODULE_50__, __WEBPACK_EXTERNAL_MODULE_51__, __WEBPACK_EXTERNAL_MODULE_52__, __WEBPACK_EXTERNAL_MODULE_53__, __WEBPACK_EXTERNAL_MODULE_54__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.autoLoadServices = exports.RxComponent = exports.RxSelector = exports.configureStore = exports.Link = undefined;

	var _core = __webpack_require__(1);

	Object.keys(_core).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _core[key];
	    }
	  });
	});

	var _componentDecorator = __webpack_require__(41);

	Object.keys(_componentDecorator).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _componentDecorator[key];
	    }
	  });
	});

	var _createCrud = __webpack_require__(8);

	Object.keys(_createCrud).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _createCrud[key];
	    }
	  });
	});

	var _resource = __webpack_require__(35);

	Object.keys(_resource).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _resource[key];
	    }
	  });
	});

	var _baseSelector = __webpack_require__(4);

	Object.keys(_baseSelector).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _baseSelector[key];
	    }
	  });
	});

	var _baseModel = __webpack_require__(7);

	Object.keys(_baseModel).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _baseModel[key];
	    }
	  });
	});

	var _inject = __webpack_require__(10);

	Object.keys(_inject).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _inject[key];
	    }
	  });
	});

	var _fetch = __webpack_require__(5);

	Object.keys(_fetch).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _fetch[key];
	    }
	  });
	});

	var _poller = __webpack_require__(19);

	Object.keys(_poller).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _poller[key];
	    }
	  });
	});
	exports.autoLoadStore = autoLoadStore;
	exports.autoLoadScenesRoutes = autoLoadScenesRoutes;

	var _seamlessImmutable = __webpack_require__(3);

	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(23);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _path = __webpack_require__(45);

	var _path2 = _interopRequireDefault(_path);

	var _router = __webpack_require__(42);

	var _router2 = _interopRequireDefault(_router);

	var _reactRedux = __webpack_require__(24);

	var _reactRouter = __webpack_require__(12);

	var _useBasename = __webpack_require__(31);

	var _useBasename2 = _interopRequireDefault(_useBasename);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
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


	var Link = exports.Link = __webpack_require__(12).Link;
	var configureStore = exports.configureStore = __webpack_require__(38);
	var RxSelector = exports.RxSelector = __webpack_require__(43);
	var RxComponent = exports.RxComponent = __webpack_require__(21);

	// #! require.context('./models', false, /\.js$/);
	function autoLoadStore() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var context = arguments[2];
	  var getInitReducers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

	  if (!context) {
	    throw new Error('需要提供require.context的遍历列表！');
	  }
	  return configureStore(initialState, middlewares, function (hot) {
	    var Models = getInitReducers() || {};
	    context.keys().forEach(function (key) {
	      Models[key.split('/').pop().split('.')[0]] = context(key);
	    });
	    var hotAcceptId = context.id;
	    var hotModelsFeedback = void 0;
	    if (hot) {
	      hotModelsFeedback = function hotModelsFeedback() {
	        // const reloadedContext = require.context('./models', false, /\.js$/);
	        var reloadedModels = getInitReducers() || {};
	        context.keys().forEach(function (key) {
	          reloadedModels[key.split('/').pop().split('.')[0]] = context(key);
	        });
	        return { Models: reloadedModels };
	      };
	    }
	    return { Models: Models, hotAcceptId: hotAcceptId, hotModelsFeedback: hotModelsFeedback };
	  });
	}

	function _autoLoadServices(context) {
	  if (!context) {
	    throw new Error('需要提供require.context的遍历列表！');
	  }
	  var Services = {};
	  context.keys().forEach(function (key) {
	    Services[key.split('/').pop().split('.')[0]] = context(key);
	  });
	  _inject.rcInject.setService(Services);
	}

	// #! require.context('./scenes', true, /index\.jsx$/)
	exports.autoLoadServices = _autoLoadServices;
	function autoLoadScenesRoutes(context) {
	  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (!context) {
	    throw new Error('需要提供require.context的遍历列表！');
	  }
	  if (typeof option === 'function') {
	    option = {
	      callback: option
	    };
	  }
	  var routeCallback = option.callback || function () {};
	  var level = option.level || 1;
	  var routes = [];
	  context.keys().sort(function (a, b) {
	    return a.split('/').length > b.split('/').length;
	  }).forEach(function (relativePath) {
	    var keys = relativePath.slice(2, -10).split(_path2.default.sep);
	    var Comp = context(relativePath);
	    if (keys[0] === '') {
	      keys.shift();
	    }
	    var key = void 0,
	        childRoute = void 0,
	        temp = void 0,
	        name = void 0,
	        children = void 0;
	    if (keys.length < level) {
	      name = keys.pop() || '/';
	      childRoute = (0, _router2.default)(Comp.routePath, Comp, { name: name });
	      if (childRoute && routeCallback(childRoute, relativePath) !== false) {
	        routes.push(childRoute);
	      };
	    } else {
	      name = keys.pop();
	      children = routes;
	      var route = void 0;
	      var navKey = keys[keys.length - 1];
	      if (keys.length) {
	        while ((key = keys.shift()) && (temp = children.find(function (route) {
	          return route.name === key;
	        }))) {
	          route = temp;
	          children = route.childRoutes || [];
	        }
	      }
	      if (!route) {
	        route = children.find(function (route) {
	          return route.name === '/';
	        });
	      }
	      if (route) {
	        route.childRoutes = route.childRoutes || [];
	        childRoute = (0, _router2.default)(Comp.routePath, Comp, {
	          name: name,
	          navKey: navKey
	        }, option.strict);
	        if (childRoute && routeCallback(childRoute, relativePath) !== false) {
	          route.childRoutes.push(childRoute);
	        }
	      } else {
	        childRoute = (0, _router2.default)(Comp.routePath, Comp, {
	          name: name,
	          navKey: navKey
	        }, option.strict);
	        if (childRoute && routeCallback(childRoute, relativePath) !== false) {
	          routes.push(childRoute);
	        };
	      }
	    }
	  });
	  return routes;
	}

	var damo = {
	  Link: Link,
	  $$routes__: [],
	  $$defaultModels__: {},
	  $$store__: null,
	  $$callback__: [],
	  getRoutes: function getRoutes() {
	    return damo.$$routes__;
	  },
	  fireReady: function fireReady() {
	    var callback = void 0;
	    while (callback = damo.$$callback__.pop()) {
	      callback();
	    }
	  },
	  init: function init() {
	    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var defaultModels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var middlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	    if (damo.$$store__) {
	      console.warn('Application initialized！');
	      return;
	    }
	    damo.$$defaultModels__ = defaultModels;
	    damo.$$store__ = configureStore(initialState, middlewares, function (hot) {
	      return { defaultModels: defaultModels };
	    });
	    damo.fireReady();
	  },
	  model: function model(name, Models, entity) {
	    if (!damo.$$store__) {
	      damo.$$callback__.push(function () {
	        damo.model(name, Models, entity);
	      });
	      return;
	    }
	    if (Models) {
	      Models = _defineProperty({}, name, Models);
	      if (entity) {
	        Models[name] = (0, _resource.resource)(entity)(Models[name]);
	      }
	    } else {
	      entity = Models;
	      Models = name;
	      if (entity) {
	        Models = (0, _resource.resource)(entity)(Models);
	      }
	    }
	    damo.$$store__.addModel(Models);
	  },
	  service: function service(name, Services) {
	    if (!damo.$$store__) {
	      damo.$$callback__.push(function () {
	        damo.service(name, Services);
	      });
	      return;
	    }
	    if (Services) {
	      Services = _defineProperty({}, name, Services);
	    } else {
	      Services = name;
	    }
	    _inject.rcInject.setService(Services);
	  },
	  getModel: function getModel(modelName) {
	    if (!damo.$$store__) {
	      throw new Error('Application uninitialized，initliaze Application by damo.init');
	    }
	    if (Object(modelName) === modelName) {
	      modelName = modelName.displayName;
	    }
	    return damo.$$store__.models[modelName];
	  },
	  toselect: function toselect(Model, prop) {
	    return function (state, ownProps) {
	      if (typeof Model === 'function' && !Model.displayName) {
	        return Model(state, ownProps);
	      } else {
	        return damo.select(Model, prop);
	      }
	    };
	  },
	  invoke: function invoke(Model, prop) {
	    return function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      if (typeof Model === 'function' && !Model.displayName) {
	        return Model(state, ownProps);
	      } else {
	        if (!damo.$$store__) {
	          throw new Error('Application uninitialized，initliaze Application by damo.init');
	        }
	        var modelName = Object(Model) === Model ? Model.displayName : Model;
	        var model = damo.$$store__.getModel(modelName);
	        if (model && model[prop]) {
	          model[prop].apply(model, args);
	        } else {
	          throw new Error('Model or Method is undefined');
	        }
	      }
	    };
	  },
	  select: function select(modelName, prop) {
	    if (!damo.$$store__) {
	      throw new Error('Application uninitialized，initliaze Application by damo.init');
	    }
	    if (Object(modelName) === modelName) {
	      modelName = modelName.displayName;
	    }
	    return damo.$$store__.getModel(modelName).select(prop, true);
	  },
	  route: function route(path, RouteComponent) {
	    var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    var routeConfig = (0, _router2.default)(path, RouteComponent, option, option.strict);
	    damo.$$routes__.push(routeConfig);

	    return {
	      route: function route(path, RouteComponent) {
	        var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	        routeConfig.childRoutes = routeConfig.childRoutes || [];
	        var _routeConfig = (0, _router2.default)(path, RouteComponent, option, option.strict);
	        if (_routeConfig) {
	          routeConfig.childRoutes.push(_routeConfig);
	        }
	      }
	    };
	  },
	  autoLoadModels: function autoLoadModels(modelContext, resourceContext, noHot) {
	    if (!damo.$$store__) {
	      damo.$$callback__.push(function () {
	        damo.autoLoadModels(modelContext, resourceContext, noHot);
	      });
	      return;
	    }
	    if (!modelContext) {
	      throw new Error('需要提供require.context的遍历列表！');
	    }

	    var defaultModels = Object.assign({}, damo.$$defaultModels__);

	    modelContext.keys().forEach(function (key) {
	      var model = modelContext(key);
	      defaultModels[model.displayName || _path2.default.basename(key).replace(_path2.default.extname(key), '')] = model;
	    });
	    if (resourceContext) {
	      resourceContext.keys().forEach(function (key) {
	        var entity = modelContext(key);
	        var name = entity.displayName || _path2.default.basename(key).replace(_path2.default.extname(key), '');
	        if (defaultModels[name]) {
	          defaultModels[name] = (0, _resource.resource)(entity)(defaultModels[name]);
	        };
	      });
	    }

	    configureStore.replace(damo.$$store__, defaultModels);

	    if (false) {
	      module.hot.accept(modelContext.id, function () {
	        damo.autoLoadModels(modelContext, true);
	      });
	    }
	  },
	  autoLoadServices: function autoLoadServices(context) {
	    _autoLoadServices(context);
	  },
	  autoLoadRoutes: function autoLoadRoutes(context, option) {
	    damo.$$routes__ = autoLoadScenesRoutes(context, option);
	  },
	  view: function view(Selector, SceneComponent, providers) {
	    var getView = function getView(nextState, callback) {
	      if (Array.isArray(Selector)) {
	        var _class, _temp;

	        var moelds = Selector;
	        var SelectorClass = (_temp = _class = function (_BaseSelector) {
	          _inherits(SelectorClass, _BaseSelector);

	          function SelectorClass() {
	            _classCallCheck(this, SelectorClass);

	            return _possibleConstructorReturn(this, (SelectorClass.__proto__ || Object.getPrototypeOf(SelectorClass)).apply(this, arguments));
	          }

	          return SelectorClass;
	        }(_baseSelector.BaseSelector), _class.dataBindings = moelds, _class.eventBindings = moelds, _temp);

	        Selector = SelectorClass;
	      } else if (Selector.prototype.isReactComponent) {
	        providers = SceneComponent;
	        SceneComponent = Selector;
	        Selector = null;
	      }
	      if (callback) {
	        callback(null, (0, _componentDecorator.View)({ selector: Selector, providers: providers })(SceneComponent));
	      } else {
	        return (0, _componentDecorator.View)({ selector: Selector, providers: providers })(SceneComponent);
	      }
	    };
	    if (!damo.$$store__) {
	      return getView;
	    } else {
	      return getView();
	    }
	  },
	  bootstrap: function bootstrap(RootComponent, DOM, dirname) {
	    if (!damo.$$store__) {
	      damo.fireReady();
	    }
	    var routes = damo.$$routes__;

	    if (RootComponent) {
	      if (RootComponent.tagName || typeof RootComponent === 'string') {
	        dirname = DOM;
	        DOM = RootComponent;
	        RootComponent = null;
	      } else if (Array.isArray(RootComponent)) {
	        routes = RootComponent;
	        RootComponent = null;
	      } else if (!_react2.default.isValidElement(RootComponent)) {
	        RootComponent = _react2.default.createElement(RootComponent, null);
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
	      RootComponent = _react2.default.createElement(_reactRedux.Provider, {
	        store: damo.$$store__
	      }, _react2.default.createElement(_reactRouter.Router, {
	        history: dirname ? withBasename(_reactRouter.browserHistory, dirname) : _reactRouter.browserHistory,
	        routes: routes
	      }));
	    } else if (damo.$$store__ && RootComponent) {
	      RootComponent = _react2.default.createElement(_reactRedux.Provider, {
	        store: damo.$$store__
	      }, RootComponent);
	    }

	    _reactDom2.default.render(RootComponent, DOM);
	  }
	};

	var exportObj = {
	  BaseSelector: _baseSelector.BaseSelector,
	  BaseModel: _baseModel.BaseModel,
	  injector: _inject.rcInject,
	  Api: _fetch.Api,
	  Poller: _poller.Poller,
	  run: damo.bootstrap,

	  serialize: function serialize(obj) {
	    return (0, _seamlessImmutable2.default)(obj);
	  },
	  deserialize: function deserialize(obj, depth) {
	    if (_seamlessImmutable2.default.isImmutable(obj)) {
	      return obj.asMutable({ isDeep: depth });
	    } else {
	      return obj;
	    }
	  }
	};

	Object.assign(damo, exportObj);

	exports.default = damo;


	function withBasename(history, dirname) {
	  if (dirname) {
	    return (0, _useBasename2.default)(function () {
	      return history;
	    })({ basename: '/' + dirname });
	  } else {
	    return history;
	  }
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.substitute = substitute;
	exports.toSnakeCase = toSnakeCase;
	exports.toCamlCase = toCamlCase;
	exports.ucfirst = ucfirst;
	exports.lcfirst = lcfirst;
	exports.Deferred = Deferred;

	var _events = __webpack_require__(11);

	/**
	 * # 核心的工具方法
	 * 
	 * + Substitutes keywords in a string using an object/array.
	 *  Removes undef keywords and ignores escaped keywords.
	 *  > see: https://g.alicdn.com/??kissy/k/6.2.4/seed.js
	 */
	var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g,
	    EMPTY = '';

	function substitute(str, o, del) {
	  if (typeof str !== 'string' || !o) {
	    return str;
	  }
	  var arr = [];
	  var newStr = str.replace(SUBSTITUTE_REG, function (match, name) {
	    if (match.charAt(0) === '\\') {
	      return match.slice(1);
	    }
	    if (o[name] === undefined) {
	      return EMPTY;
	    } else {
	      arr.push(name);
	      return o[name];
	    }
	  });
	  if (del) {
	    arr.forEach(function (a) {
	      return delete o[a];
	    });
	  }
	  return newStr;
	}

	/**
	 * + camel Case to Snake Case
	 * > see: http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
	 */
	function toSnakeCase(str) {
	  return str.replace(/([A-Z])/g, function ($1) {
	    return "_" + $1.toLowerCase();
	  }).toLocaleUpperCase();
	}

	function toCamlCase(str) {
	  return str.replace(/_([^_]*)/g, function ($0, $1) {
	    return $1 && ucfirst($1) || '';
	  });
	}

	function ucfirst(str) {
	  return str.charAt(0).toUpperCase() + str.substring(1);
	}

	function lcfirst(str) {
	  return str.charAt(0).toLowerCase() + str.substring(1);
	}

	// + 把promise封装成Deferred，参考jQuery.Deffered
	// > see: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
	function Deferred() {
	  // #! update 062115 for typeof
	  if (typeof Promise != 'undefined' && Promise.defer) {
	    //#! need import of Promise.jsm for example: Cu.import('resource:/gree/modules/Promise.jsm');
	    return Promise.defer();
	  } else if (typeof PromiseUtils != 'undefined' && PromiseUtils.defer) {
	    //#! need import of PromiseUtils.jsm for example: Cu.import('resource:/gree/modules/PromiseUtils.jsm');
	    return PromiseUtils.defer();
	  } else {
	    /* A method to resolve the associated Promise with the value passed.
	     * If the promise is already settled it does nothing.
	     *
	     * @param {anything} value : This value is used to resolve the promise
	     * If the value is a Promise then the associated promise assumes the state
	     * of Promise passed as value.
	     */
	    this.resolve = null;

	    /* A method to reject the assocaited Promise with the value passed.
	     * If the promise is already settled it does nothing.
	     *
	     * @param {anything} reason: The reason for the rejection of the Promise.
	     * Generally its an Error object. If however a Promise is passed, then the Promise
	     * itself will be the reason for rejection no matter the state of the Promise.
	     */
	    this.reject = null;

	    /* A newly created Pomise object.
	     * Initially in pending state.
	     */
	    this.promise = new Promise(function (resolve, reject) {
	      this.resolve = resolve;
	      this.reject = reject;
	    }.bind(this));
	    Object.freeze(this);
	  }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseSelector = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp; /**
	                    * # Selector基类
	                    * 1. Selector把store数据和改变store的执行方法赋予组件，这一点和`redux.connect`的作用是等同的。
	                    * 2. 通过selector可以获取组件的props和context, 甚至可以拿到父级组件的selector实例
	                    * 3. 内部集成了rxjs，rxjs好处不多说，用过自然知道。
	                    * 
	                    * > see: https://chentsulin.github.io/redux/docs/recipes/ComputingDerivedData.html
	                    * > see: https://github.com/reactjs/redux/issues/1171
	                    */


	var _events = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BaseSelector = exports.BaseSelector = (_temp = _class = function (_EventEmitter) {
	  _inherits(BaseSelector, _EventEmitter);

	  function BaseSelector() {
	    _classCallCheck(this, BaseSelector);

	    var _this = _possibleConstructorReturn(this, (BaseSelector.__proto__ || Object.getPrototypeOf(BaseSelector)).call(this));

	    _this.setMaxListeners(Number.MAX_VALUE);
	    return _this;
	  }

	  _createClass(BaseSelector, [{
	    key: 'ready',
	    value: function ready(fn) {
	      if (this.getAppStore()) {
	        fn && fn();
	      } else {
	        BaseSelector.emitter.once('ready', fn);
	      }
	    }

	    // 当组件初始化时，initialize会触发，用于取代componentWillMount获取初始化数据的行为。

	  }, {
	    key: 'initialize',
	    value: function initialize(props, selector) {}
	    /**
	     * ### Selector特性属性
	     * 
	     * |        属性名         |          描述          |
	     * |:       ------        |         ------        |
	     * | inputs: Function | 相当于connect第一个参数，不同点为this指向selector实例    |
	     * | outputs: Function | 相当于connect第二个参数，不同点为this指向selector实例  |
	     * | dispatch: Function | 获取store实例的dispatch方法 |
	     * | parentSelector | 获取父级组件的selector实例，如果存在的话 |
	     */

	  }, {
	    key: 'getService',


	    /**
	     * ### Selector方法
	     * 
	     * |     方法名   |          描述          |       参数        |    默认参数      |
	     * |     ------  |         ------        |       ------      |        ------   |
	     * | getAppStore | 获取redux的store实例    |       NA          |         NA      |
	     * | getModel | 获取挂在store的指定model实例 | {name: String}  |          NA      |
	     * | getService | 获取组件的context     | NA  |          NA      |
	     */
	    // #! abstract
	    value: function getService(name) {}
	  }, {
	    key: 'getAppStore',
	    value: function getAppStore() {
	      return BaseSelector.appStore;
	    }
	  }, {
	    key: 'getModel',
	    value: function getModel(modelName) {
	      if (Object(modelName) === modelName) {
	        modelName = modelName.displayName;
	      }
	      return this.getAppStore().models[modelName];
	    }
	  }, {
	    key: 'select',
	    value: function select(name) {
	      var currentState = this.getAppStore().getState();
	      if (name) {
	        var keys = name.split('.');
	        var state = currentState;
	        for (var i = 0, len = keys.length; i < len; i++) {
	          if (!(state = state[keys[i]])) {
	            return state;
	          }
	        }
	        return state;
	      } else {
	        return currentState;
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.removeAllListeners();
	    }
	  }, {
	    key: 'inputs',
	    get: function get() {
	      return function (state, ownProps) {
	        return {};
	      };
	    }
	  }, {
	    key: 'outputs',
	    get: function get() {
	      return function (dispatch, ownProps) {
	        return {};
	      };
	    }
	  }, {
	    key: 'dispatch',
	    get: function get() {
	      return this.getAppStore().dispatch;
	    }
	  }, {
	    key: 'parentSelector',
	    set: function set(parentSelector) {
	      this.$parentSelector_ = parentSelector;
	    },
	    get: function get() {
	      return this.$parentSelector_;
	    }
	  }]);

	  return BaseSelector;
	}(_events.EventEmitter), _class.appStore = null, _class.emitter = new _events.EventEmitter(), _temp);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * # 接口调用模块
	                                                                                                                                                                                                                                                                               * 1. 封装ES7的fetch模块
	                                                                                                                                                                                                                                                                               * 2. 对外提供get, post, delete, put静态方法，分别调用不同类型的接口
	                                                                                                                                                                                                                                                                               * 3. 对外开发errorhandler和mock数据的接口
	                                                                                                                                                                                                                                                                               */


	exports.Api = Api;

	var _isomorphicFetch = __webpack_require__(50);

	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

	var _core = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HttpCodes = {
	  OK: 200,
	  ERROR: 301
	};

	var constants = {
	  APP_JSON_HEADER: 'application/json',
	  SAME_ORIGIN: 'same-origin',
	  INCLUDE: 'include'

	  /**
	   * + 接口数据解析，所有的接口数据都会已json格式进行解析
	   */
	};function parseJSON(response, errorNotification, uri) {
	  return response.json().then(function (res) {
	    return Api.errorHandler(res, errorNotification, uri);
	  });
	}

	Api.errorHandler = function (res, errorNotification) {
	  return res;
	};
	Api.validateHandler = function (data, ajaxOption) {
	  return Object.assign({}, data);
	};
	/**
	 * + 错误处理处理
	 * > see: see: http://php.net/manual/en/function.http-response-code.php
	 * > see: https://stackoverflow.com/questions/34304335/redux-using-async-middlewares-vs-dispatching-actions-on-success-functions
	 */
	function checkStatus(response, errorNotification) {
	  if (errorNotification && errorNotification.quiet) return response;

	  if (response.status < HttpCodes.OK || response.status >= HttpCodes.ERROR) {
	    var error = new Error(response.statusText);
	    try {
	      error.response = response.json();
	    } catch (e) {
	      error.response = response.text();
	    }
	    error.errorNotification = errorNotification;
	    throw error;
	  }
	  return response;
	}

	/**
	 * + mock数据
	 * 1. 在生产环境，直接抛弃mock逻辑
	 * 2. 在日常环境，当地址栏参数debug=true或者window.DEBUG=true，同时接口url包含proxy=true参数时，触发mock数据逻辑
	 * 3. 当存在window.Mocky对象时，会针对数据进行mock语法编译，生成假数据。window.Mocky由`damo-mocker`模块提供
	 */
	var doFetch = void 0;
	if (false) {
	  doFetch = _isomorphicFetch2.default;
	} else {
	  if (location.search.indexOf('debug=true') > -1 || window.DEBUG) {
	    doFetch = function doFetch(uri, options) {
	      if (Api.getMockUrl && uri.indexOf('proxy=true') > -1) {
	        var tmp = uri.split('?');
	        var url = tmp[0].replace(location.protocol + '//' + location.hostname, '').replace(/^[:\d]*/, '').replace(/\/\{[^\}]*\}/, '');
	        var params = {};
	        tmp[1].split('&').forEach(function (str) {
	          var s = str.split('=');
	          params[s[0]] = s[1];
	        });
	        uri = Api.getMockUrl(url, params, options);
	      }
	      return (0, _isomorphicFetch2.default)(uri, options);
	    };
	  } else {
	    doFetch = _isomorphicFetch2.default;
	  }
	}

	function isValidParamValue(val) {
	  var t = typeof val === 'undefined' ? 'undefined' : _typeof(val);
	  // #! If the type of val is null, undefined, number, string, boolean, return TRUE.
	  return val == null || t !== 'object' && t !== 'function';
	}
	/**
	 * + 参数序列化，参考与kissy的param
	 * > see: https://g.alicdn.com/??kissy/k/6.2.4/seed.js#stringify
	 * > see: http://unixpapa.com/js/querystring.html
	 */
	var SEP = '&';
	var EMPTY = '';
	var undef;
	var urlEncode = encodeURIComponent;
	var toString = {}.toString;
	var EQ = '=';
	function param(o, sep, eq, serializeArray) {
	  sep = sep || SEP;
	  eq = eq || EQ;
	  if (serializeArray === undef) {
	    serializeArray = true;
	  }
	  var buf = [];
	  var key;
	  var i;
	  var v;
	  var len;
	  var val;
	  for (key in o) {
	    val = o[key];
	    var originalKey = key;
	    key = urlEncode(key);

	    //#! val is valid non-array value
	    if (isValidParamValue(val)) {
	      buf.push(key);
	      if (val !== undef) {
	        buf.push(eq, urlEncode(val + EMPTY));
	      }
	      buf.push(sep);
	    } else if (Array.isArray(val)) {
	      //#! val is not empty array
	      for (i = 0, len = val.length; i < len; ++i) {
	        v = val[i];
	        if (isValidParamValue(v)) {
	          buf.push(key, serializeArray && originalKey.slice(0 - 2) !== '[]' ? urlEncode('[]') : EMPTY);
	          if (v !== undef) {
	            buf.push(eq, urlEncode(v + EMPTY));
	          }
	          buf.push(sep);
	        }
	      }
	    }
	    //#! ignore other cases, including empty array, Function, RegExp, Date etc.
	  }
	  buf.pop();
	  return buf.join(EMPTY);
	}
	/**
	 * ### API Context
	 * Api本身可以通过new来初始化，通过配置的method属性指定调用方法
	 * 
	 * |     方法名   |          描述          |       参数        |    默认参数      |
	 * |:    ------  |         ------        |       ------      |        ------   |
	 * | get | 调用get请求    | {uri: String, body: Object, params: Object, headers: Object } |         NA      |
	 * | post | 调用post请求    | 同get |         NA      |
	 * | put | 调用put请求    | 同get |         NA      |
	 * | delete | 调用delete请求    | 同get |         NA      |
	 * | errorHandler | 接口错误处理的开放接口    | (res: 接口数据, errorNotification: 错误处理器} |         NA      |
	 * | getMockUrl | 接口mock路径的开放接口    | {url: String, params: 接口参数, options: ajax配置} |         NA      |
	 */
	function Api(ajaxOption) {
	  var method = ajaxOption.method.toLocaleUpperCase();
	  var body = Api.validateHandler(ajaxOption.data || ajaxOption.params, ajaxOption);
	  var headers = void 0;
	  if (ajaxOption.headers) {
	    if (ajaxOption.headers.target) {
	      headers = Object.assign({}, ajaxOption.headers);
	      headers.target = (0, _core.substitute)(headers.target, body, true);
	    } else {
	      headers = ajaxOption.headers;
	    }
	  }
	  var credential = ajaxOption.withCredentials ? 'INCLUDE' : 'SAME_ORIGIN';
	  var uri = (0, _core.substitute)(ajaxOption.url, body, true);

	  switch (method) {
	    case 'POST':
	    case 'PUT':
	      return Api.postput(uri, method, body, headers, credential, ajaxOption.errorNotification);
	    case 'DELETE':
	      return Api.delete((uri.indexOf('?') > -1 ? uri : uri + '?') + '&' + param(body), headers, credential, ajaxOption.errorNotification);
	    case 'GET':
	    default:
	      return Api.get((uri.indexOf('?') > -1 ? uri : uri + '?') + '&' + param(body), headers, credential, ajaxOption.errorNotification);
	  }
	}

	Api.headers = Object.assign(window.ajaxHeader || {}, {
	  'Accept': constants.APP_JSON_HEADER,
	  'Content-Type': constants.APP_JSON_HEADER
	});
	Api.doFetch = doFetch;

	Object.assign(Api, {
	  success: function success(res) {
	    return Promise.resolve(res);
	  },
	  error: function error(err) {
	    return Promise.reject(err);
	  },
	  get: function get(uri, headers, credential, errorNotification) {
	    return doFetch(uri, {
	      method: 'GET',
	      credentials: constants[credential],
	      headers: headers || Api.headers
	    }).then(function (response) {
	      return checkStatus(response, errorNotification);
	    }).then(function (response) {
	      return parseJSON(response, errorNotification, uri);
	    });
	  },
	  delete: function _delete(uri, headers, credential, errorNotification) {
	    return doFetch(uri, {
	      method: 'DELETE',
	      credentials: constants[credential],
	      headers: headers || Api.headers
	    }).then(function (response) {
	      return checkStatus(response, errorNotification);
	    }).then(function (response) {
	      return parseJSON(response, errorNotification, uri);
	    });
	  },
	  postput: function postput(uri, method, data, headers, credential, errorNotification) {
	    return doFetch(uri, {
	      method: method,
	      credentials: constants[credential],
	      headers: headers || Api.headers,
	      body: JSON.stringify(data)
	    }).then(function (response) {
	      return checkStatus(response, errorNotification);
	    }).then(function (response) {
	      return parseJSON(response, errorNotification, uri);
	    });
	  },
	  post: function post(uri, data, headers, credential, errorNotification) {
	    return Api.postput(uri, 'POST', data, headers, credential, errorNotification);
	  },
	  put: function put(uri, data, headers, credential, errorNotification) {
	    return Api.postput(uri, 'PUT', data, headers, credential, errorNotification);
	  }
	});

	/**
	 * + 需要在业务中实现这个方法来集成
	 */
	// Api.getMockUrl = function(url, params, options){
	//   if(url.indexOf('.json') === -1){
	//     url = url + '.json';
	//   }
	//   return '/mocks' + url;
	// }

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (true) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseModel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp; /**
	                    * # Model基类
	                    * 1. 每个Model在Store中都存在modelName所对应的数据域，即通过state.modelName返回Model所对应的所有数据。
	                    * 2. Model的实现基于事件机制，方便绑定自定义事件
	                    */

	var _fetch = __webpack_require__(5);

	var _createCrud = __webpack_require__(8);

	var _poller = __webpack_require__(19);

	var _cuid = __webpack_require__(22);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _core = __webpack_require__(1);

	var _events = __webpack_require__(11);

	var _seamlessImmutable = __webpack_require__(3);

	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function isPromise(obj) {
	  return !!(obj && obj.then && obj.catch);
	}

	var BaseModel = exports.BaseModel = (_temp = _class = function (_EventEmitter) {
	  _inherits(BaseModel, _EventEmitter);

	  _createClass(BaseModel, [{
	    key: 'createActionCreator',

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
	     * + 所有的actionCreators存于defineActionCreators属性中。
	     */
	    value: function createActionCreator(crudActions, actions) {
	      var defineAction = (0, _createCrud.createActions)(crudActions, actions);
	      // #! 自定义的actionType
	      Object.assign(this.defineActionTypes, defineAction.getActionTypes());
	      // #! 自定义的actionCreator
	      Object.assign(this.defineActionCreators, defineAction.getActionCreators());
	    }

	    // #! 获取actionCreator的key

	  }, {
	    key: 'createActionName',
	    value: function createActionName(operate) {
	      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	      return this.name + operate + (0, _core.ucfirst)(status);
	    }
	    /**
	     * + 通过制定的actionCreator和配置项生成action, 一般来说我们不需要关心action，有model自动生成，格式为：
	     * ```
	     *  {
	     *    type,                           // actionType
	     *    payload: {
	     *      cid,                            // 键名
	     *      data,                           // 未处理的数据
	     *      record,                         // 已处理的数据
	     *      records,                        // 同record
	     *      change,                         // 同步到store的change配置
	     *      changes,                        // 同change，不同点在于changes支持多个change
	     *    },
	     *    error,                          // 错误信息， 一般在异步action的error时才有
	     *    suppressGlobalErrorNotification,// 在error存在有效，用于指定是否忽略error
	     *    suppressGlobalProgress          // 指定是否不走processbar提示
	     *  }
	     * ```
	     */

	  }, {
	    key: 'createAction',
	    value: function createAction(actionName, data, payloadOption, actionOption) {
	      if (!payloadOption.changes) {
	        if (typeof payloadOption.change === 'function') {
	          payloadOption.changes = [{
	            name: payloadOption.name,
	            type: _createCrud.changeOperators['SETPROPERTY'],
	            getData: payloadOption.change
	          }];
	        } else if (Object.assign(payloadOption.change) === payloadOption.change) {
	          payloadOption.changes = [payloadOption.change];
	        } else {
	          payloadOption.changes = [{
	            name: payloadOption.name,
	            type: payloadOption.change || _createCrud.changeOperators['RECONFIGURE']
	          }];
	        }
	      }
	      var action = this.defineActionCreators['$' + actionName](data);
	      Object.assign(action.payload, payloadOption, { cid: this.generatorKey });
	      Object.assign(action, actionOption);
	      return action;
	    }
	  }, {
	    key: 'generatorKey',
	    get: function get() {
	      return 'id';
	    }
	    /**
	     * ### Model特性属性
	     * 
	     * |        属性名         |          描述          |
	     * |:       ------        |         ------        |
	     * | generatorKey: String | Model的唯一键名         |
	     * | properties: Object   | Model的数据域的数据结构  |
	     * | dispatch: Function | 获取store实例的dispatch方法 | 
	     */

	  }]);

	  function BaseModel(name, initialState) {
	    _classCallCheck(this, BaseModel);

	    var _this = _possibleConstructorReturn(this, (BaseModel.__proto__ || Object.getPrototypeOf(BaseModel)).call(this));

	    _this.setName(name);

	    _this.mapToStore = {};

	    _this.defineActionTypes = {};
	    _this.defineActionCreators = {};
	    _this.$pollers_ = [];

	    if (!_this.properties) {
	      _this.properties = initialState;
	    }

	    _this.setMaxListeners(Number.MAX_VALUE);

	    _this.state = (0, _seamlessImmutable2.default)(initialState);
	    return _this;
	  }

	  /**
	   * ### Model方法
	   * 
	   * |     方法名   |          描述          |       参数        |    默认参数      |
	   * |     ------  |         ------        |       ------      |        ------   |
	   * | getAppStore | 获取redux的store实例    |       NA          |         NA      |
	   * | getModel | 获取挂在store的指定model实例 | {name: String}  |          NA      |
	   * | getQuery | 获取更新store的执行函数     | {ajax: Object, changes: Object / Array, dispatch: Function}  |          NA      |
	   * | execQuery | 通过getQuery并且传递dispatch参数，达到直接执行更新store的作用 | {ajax: Object, changes: Object / Array}  |          NA      |
	   * | pollingQuery | 轮询调用getQuery或者execQuery循环调用接口，并且更新数据 | {ajax: Object, changes: Object / Array} | NA |
	   */


	  _createClass(BaseModel, [{
	    key: 'getAppStore',
	    value: function getAppStore() {
	      return BaseModel.appStore;
	    }
	  }, {
	    key: 'setName',
	    value: function setName(modelName) {
	      this.name = modelName;
	    }
	  }, {
	    key: 'getModel',
	    value: function getModel(modelName) {
	      return this.getAppStore().models[modelName];
	    }
	  }, {
	    key: 'select',
	    value: function select(name) {
	      var currentState = this.getAppStore().getState();
	      var state = currentState[this.name];
	      var keys = name.split('.');

	      for (var i = 0, len = keys.length; i < len; i++) {
	        if (!(state = state[keys[i]])) {
	          return state;
	        }
	      }
	      return state;
	    }
	  }, {
	    key: 'execQuery',
	    value: function execQuery(ajaxOption, changeOption) {
	      return this.getQuery(ajaxOption, changeOption, this.dispatch);
	    }
	  }, {
	    key: 'setState',
	    value: function setState(options) {
	      var promises = [];
	      for (var key in options) {
	        switch (true) {
	          case _seamlessImmutable2.default.isImmutable(options[key]):
	            options[key] = {
	              response: Promise.resolve(options[key]),
	              change: {
	                name: key,
	                callback: function callback(data) {
	                  return data;
	                }
	              }
	            };
	            break;
	          case isPromise(options[key]):
	            options[key] = {
	              response: options[key],
	              change: {
	                name: key,
	                callback: function callback(data) {
	                  return data;
	                }
	              }
	            };
	            break;
	          default:
	            if (options[key].change) {
	              if (options[key].change === 'function') {
	                options[key].change = {
	                  name: key,
	                  callback: options[key].change
	                };
	              }
	            } else {
	              options[key].change = {
	                name: key,
	                callback: function callback(data) {
	                  return data;
	                }
	              };
	            }
	            break;
	        }
	        promises.push(this.execQuery(options[key]));
	      }

	      if (promises.length === 1) {
	        return promises[0];
	      } else {
	        var _promise = Promise.all[promises];
	        _promise.fromSubscribe = function (callback) {
	          if (callback) {
	            _promise.then(function (res) {
	              callback(null, res);
	            }, callback);
	          }
	          return _promise;
	        };
	        return _promise;
	      }
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

	  }, {
	    key: 'getQuery',
	    value: function getQuery(ajaxOption, changeOption, appDispatch) {
	      var _this2 = this;

	      if (typeof changeOption === 'function') {
	        appDispatch = changeOption;
	        changeOption = {};
	      }
	      if (Array.isArray(changeOption)) {
	        changeOption = {
	          changes: changeOption
	        };
	      }

	      var actionReducer = void 0;
	      var opt = Object.assign({}, ajaxOption, changeOption);
	      if (!opt.operate) {
	        opt.operate = opt.name || (0, _cuid2.default)();
	      }
	      if (opt.uri) {
	        actionReducer = this.createCrudFor(opt);
	      } else if (typeof opt.request === 'function') {
	        actionReducer = function actionReducer(dispatch) {
	          var extraOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	          var processData = extraOption.processData || opt.processData;
	          var suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
	          var suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;
	          var actionOption = { suppressGlobalErrorNotification: suppressGlobalErrorNotification, suppressGlobalProgress: suppressGlobalProgress };

	          var promise = opt.request(opt.params || opt.body, { dispatch: dispatch, processData: processData, action: actionOption, changes: opt.changes, callback: extraOption.callback, errorNotification: extraOption.errorNotification });

	          promise.fromSubscribe = function (callback) {
	            if (callback) {
	              promise.then(function (res) {
	                callback(null, res);
	              }, callback);
	            }
	            return promise;
	          };

	          return promise;
	        };
	      } else if (opt.response) {
	        var operate = opt.operate;
	        var ucOperate = (0, _core.ucfirst)(operate);
	        var needToOperate = operate && (opt.change || opt.changes);
	        actionReducer = function actionReducer(dispatch) {
	          var extraOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	          var processData = extraOption.processData || opt.processData || BaseModel.processData;
	          var suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
	          var suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;

	          needToOperate && _this2.createActionCreator([], [_this2.createActionName(ucOperate)]);

	          var payloadOption = { name: opt.name || operate, params: opt.params || opt.body, change: opt.change, changes: opt.changes };
	          var actionOption = { suppressGlobalErrorNotification: suppressGlobalErrorNotification, suppressGlobalProgress: suppressGlobalProgress };
	          var _isPromise = isPromise(opt.response);
	          var promise = _isPromise ? opt.response : Promise.resolve(opt.response);

	          if (needToOperate) {
	            if (!_isPromise) {
	              var data = processData(opt.response);
	              dispatch && dispatch(_this2.createAction(_this2.createActionName(ucOperate, 'action'), data, Object.assign(payloadOption, { data: opt.response }), actionOption));
	            }
	            _this2.emit('before' + ucOperate, opt);
	          }

	          promise.fromSubscribe = function (callback) {
	            if (callback) {
	              promise.then(function (res) {
	                callback(null, res);
	              }, callback);
	            }
	            return promise;
	          };
	          promise.fromSubscribe(extraOption.callback);

	          promise.then(function (res) {
	            var data = processData(res);

	            if (needToOperate) {
	              if (_isPromise) {
	                dispatch && dispatch(_this2.createAction(_this2.createActionName(ucOperate, 'action'), data, Object.assign(payloadOption, { data: opt.response }), actionOption));
	              }
	              _this2.emit('after' + ucOperate, null, data);
	            }

	            return data;
	          });

	          return promise;
	        };
	      }

	      if (appDispatch) {
	        return actionReducer(appDispatch);
	      } else {
	        return actionReducer;
	      }
	    }
	  }, {
	    key: 'createCrudFor',
	    value: function createCrudFor(opt) {
	      var _this3 = this;

	      var operate = opt.operate;
	      var ucOperate = (0, _core.ucfirst)(operate);
	      var needToOperate = operate && (opt.change || opt.changes);

	      needToOperate && this.createActionCreator([this.createActionName(ucOperate)], []);

	      var actionReducer = function actionReducer(dispatch) {
	        var extraOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        var processData = extraOption.processData || opt.processData || BaseModel.processData;
	        var suppressGlobalProgress = extraOption.suppressGlobalProgress || opt.suppressGlobalProgress;
	        var suppressGlobalErrorNotification = extraOption.suppressGlobalErrorNotification || opt.suppressGlobalErrorNotification;

	        var payloadOption = { name: opt.name || operate, params: opt.params || opt.body, change: opt.change, changes: opt.changes };
	        var actionOption = { suppressGlobalErrorNotification: suppressGlobalErrorNotification, suppressGlobalProgress: suppressGlobalProgress };

	        if (needToOperate) {
	          dispatch && dispatch(_this3.createAction(_this3.createActionName(ucOperate, 'start'), opt.initialValue, Object.assign(payloadOption, { data: promise }), actionOption));
	          _this3.emit('before' + ucOperate, opt);
	        }

	        var promise = (0, _fetch.Api)({
	          url: opt.uri,
	          method: opt.method,
	          data: opt.body,
	          headers: opt.headers,
	          errorNotification: opt.errorNotification
	        });

	        promise.fromSubscribe = function (callback) {
	          if (callback) {
	            promise.then(function (res) {
	              callback(null, res);
	            }, callback);
	          }
	          return promise;
	        };
	        promise.fromSubscribe(extraOption.callback);

	        promise.then(function (response) {
	          var data = processData(response, dispatch);
	          if (needToOperate) {
	            dispatch && dispatch(_this3.createAction(_this3.createActionName(ucOperate, 'success'), data, Object.assign(payloadOption, { data: response }), actionOption));
	            _this3.emit('after' + ucOperate, null, data);
	          }
	          return data;
	        }, function (err) {
	          if (needToOperate) {
	            dispatch && dispatch(_this3.createAction(_this3.createActionName(ucOperate, 'error'), null, Object.assign(payloadOption, { data: err }), Object.assign(actionOption, { error: err })));
	            _this3.emit('after' + ucOperate, err);
	          }
	          return err;
	        });

	        return promise;
	      };
	      return actionReducer;
	    }

	    // #! 结合Poller模块实现轮询功能

	  }, {
	    key: 'pollingQuery',
	    value: function pollingQuery(ajaxOption, changeOption, appDispatch) {
	      var _this4 = this;

	      var actionReducer = function actionReducer(dispatch) {
	        var extraOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        var poller = new _poller.Poller({
	          catchError: ajaxOption.catchError,
	          smart: ajaxOption.smart,
	          delay: ajaxOption.delay,
	          action: function action() {
	            return _this4.getQuery(ajaxOption, changeOption)(dispatch, extraOption);
	          }
	        });

	        _this4.$pollers_.push(poller);

	        return poller;
	      };
	      if (appDispatch) {
	        return actionReducer(appDispatch);
	      } else {
	        return actionReducer;
	      }
	    }
	  }, {
	    key: 'clearPolling',
	    value: function clearPolling() {
	      this.$pollers_.forEach(function (poller) {
	        poller.remove();
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.removeAllListeners();
	      this.clearPolling();
	    }
	  }, {
	    key: 'dispatch',
	    get: function get() {
	      return this.getAppStore().dispatch;
	    }
	  }]);

	  return BaseModel;
	}(_events.EventEmitter), _class.processData = function (res) {
	  return res;
	}, _class.appStore = null, _class.ASSIGN_TYPES = _createCrud.changeOperators, _temp);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.changeOperators = undefined;
	exports.createActionTypes = createActionTypes;
	exports.createActionCreators = createActionCreators;
	exports.applyCrudReducer = applyCrudReducer;
	exports.createActions = createActions;

	var _core = __webpack_require__(1);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * # 系统提供的change策略和actionType
	                                                                                                                                                                                                                   * 1. model.getQuery的changeOption中，type属性指定change策略
	                                                                                                                                                                                                                   * 2. 通过actionName创建同步或者异步的actionType
	                                                                                                                                                                                                                   */


	var changeOperators = exports.changeOperators = {
	  ADD: 'add',
	  UPDATE: 'update',
	  DELETE: 'delete',
	  RECONFIGURE: 'reconfigure',
	  SETPROPERTY: 'setProperty'
	};

	var statuses = ['start', 'success', 'error'];
	var propNames = {
	  start: 'record',
	  success: 'record',
	  error: ''
	};

	/**
	 * + 根据async来指定异步action
	 *  1. 同步的action: resourceName -> `${resourceName}Action`
	 *  2. 异步的action: resourceName -> `${resourceName}Start`,  `${resourceName}Success` 和  `${resourceName}Error`
	 */
	function createActionTypes(resourceName, async) {
	  var actionTypes = {};
	  if (async) {
	    statuses.forEach(function (st) {
	      var type = resourceName + (0, _core.ucfirst)(st);
	      actionTypes[(0, _core.toSnakeCase)(type)] = {
	        type: type,
	        status: st
	      };
	    });
	  } else {
	    var type = resourceName + (0, _core.ucfirst)('action');
	    actionTypes[(0, _core.toSnakeCase)(type)] = {
	      type: type,
	      status: 'action'
	    };
	  }

	  return actionTypes;
	}

	/**
	 * + 创建actionCreator，用于给到model实例调用
	 */
	function createActionCreators(resourceName, actionTypes) {
	  actionTypes = actionTypes || createActionTypes(resourceName);
	  var actionCreators = {};

	  var _loop = function _loop(type) {
	    var obj = actionTypes[type];
	    if (propNames[obj.status]) {
	      actionCreators['$' + obj.type] = function () {
	        var _payload;

	        return { type: type, payload: (_payload = {}, _defineProperty(_payload, propNames[obj.status], arguments.length <= 0 ? undefined : arguments[0]), _defineProperty(_payload, 'status', obj.status), _payload) };
	      };
	    } else {
	      actionCreators['$' + obj.type] = function () {
	        return { type: type, payload: { record: arguments.length <= 0 ? undefined : arguments[0], status: obj.status } };
	      };
	    }
	  };

	  for (var type in actionTypes) {
	    _loop(type);
	  }
	  return actionCreators;
	}

	function merge(o, t, attrs) {
	  o = o.asMutable ? o.asMutable() : o;
	  if (attrs) {
	    attrs.forEach(function (attr) {
	      return o[attr] = t[attr];
	    });
	    return o;
	  } else {
	    return Object.assign(o, t);
	  }
	}

	function extra(o, attrs) {
	  if (attrs) {
	    var newO = {};
	    attrs.forEach(function (attr) {
	      return o[attr] = t[attr];
	    });
	    return newO;
	  } else {
	    return o;
	  }
	}

	/**
	 * ### change策略
	 * 参考redux减少样本代码
	 * 1. change类型：["add", "update", "delete", "reconfigure", "setProperty"]
	 * > see: http://cn.redux.js.org//docs/recipes/ReducingBoilerplate.html
	 */
	function applyCrudReducer(immutableState, payload, initialState) {
	  if (payload.changes) {
	    var _records = payload.record === undefined ? payload.records : payload.record;
	    var generatorKey = payload.cid;

	    payload.changes.forEach(function (change) {
	      switch (change.type) {
	        case changeOperators.ADD:
	          // 必须是对象
	          if (Object(_records) === _records) {
	            if (Array.isArray(immutableState[change.name])) {
	              // push
	              immutableState = immutableState.update(change.name, function (records) {
	                var recordMap = {};
	                var _recordArr = [].concat(_records);
	                _recordArr.forEach(function (r) {
	                  return recordMap[r[generatorKey]] = r;
	                });
	                records = records.asMutable().map(function (r) {
	                  if (recordMap[r[generatorKey]]) {
	                    //发现存在，则merge
	                    _recordArr.splice(_recordArr.indexOf(recordMap[r[generatorKey]]), 1);
	                    return merge(r, recordMap[r[generatorKey]], change.attrs);
	                  } else {
	                    return r;
	                  }
	                });

	                for (var i = _recordArr.length; i--;) {
	                  records.unshift(_recordArr[i]);
	                }
	                return records;
	              });
	            } else {
	              // #! 此时应该是reconfigure
	              immutableState = immutableState.set(change.name, _records);
	            }
	          }
	          break;
	        case changeOperators.UPDATE:
	          // 必须是对象
	          if (Object(_records) === _records) {
	            if (Array.isArray(immutableState[change.name])) {
	              immutableState = immutableState.update(change.name, function (records) {
	                var recordMap = {};
	                var _recordArr = [].concat(_records);
	                _recordArr.forEach(function (r) {
	                  return recordMap[r[generatorKey]] = r;
	                });

	                records = records.asMutable().map(function (r) {
	                  if (recordMap[r[generatorKey]]) {
	                    return merge(r, recordMap[r[generatorKey]], change.attrs);
	                  } else {
	                    return r;
	                  }
	                });

	                return records;
	              });
	            } else if (immutableState[change.name][generatorKey] == _records[generatorKey]) {
	              // set
	              immutableState = immutableState.set(change.name, extra(_records, change.attrs));
	            }
	          }
	          break;
	        case changeOperators.DELETE:
	          // 必须是对象
	          if (Object(_records) === _records) {
	            if (Array.isArray(immutableState[change.name])) {
	              immutableState = immutableState.update(change.name, function (records) {
	                var recordMap = {};
	                var _recordArr = [].concat(_records);
	                _recordArr.forEach(function (r) {
	                  return recordMap[r[generatorKey]] = r;
	                });
	                return records.filter(function (r) {
	                  return !recordMap[r[generatorKey]];
	                });
	              });
	            } else if (immutableState[change.name][generatorKey] == _records[generatorKey]) {
	              immutableState = immutableState.set(change.name, null);
	            }
	          }
	          break;
	        case changeOperators.RECONFIGURE:
	          immutableState = immutableState.set(change.name, _records || immutableState[change.name]);
	          break;
	        case changeOperators.SETPROPERTY:
	          immutableState = immutableState.set(change.name, change.getData(_records, immutableState[change.name]) || immutableState[change.name]);
	          break;
	        default:
	          // #! 支持函数
	          var newState = void 0;
	          if (change.callback) {
	            newState = change.callback(_records, immutableState[change.name], payload.params, immutableState, initialState);
	          } else if (change[payload.status]) {
	            // #! 符合status的对应callback
	            newState = change[payload.status](_records, immutableState[change.name], payload.params, immutableState, initialState);
	          }
	          if (change.name) {
	            immutableState = immutableState.set(change.name, newState || immutableState[change.name]);
	          } else if (newState) {
	            immutableState = newState;
	          }
	          break;
	      }
	    });
	    return immutableState;
	  } else {
	    /**
	     * + 在状态不变时，需要返回defaultState; 在状态改变时，每次返回新的state
	     * > see: http://cn.redux.js.org/docs/basics/Reducers.html
	     */
	    return immutableState;
	  }
	}

	// + 创建actionTypes和actionCreators
	function createActions(crudResourceNames, resourceNames) {
	  var map = {};
	  crudResourceNames.forEach(function (resourceName) {
	    map[resourceName] = createActionTypes(resourceName, true);
	  });
	  resourceNames.forEach(function (resourceName) {
	    map[resourceName] = createActionTypes(resourceName);
	  });

	  return {
	    getActionTypes: function getActionTypes() {
	      var actionsMap = {};
	      for (var key in map) {
	        Object.assign(actionsMap, map[key]);
	      }
	      return actionsMap;
	    },
	    getActionCreators: function getActionCreators() {
	      var creatorsMap = {};
	      for (var key in map) {
	        Object.assign(creatorsMap, createActionCreators(key, map[key]));
	      }
	      return creatorsMap;
	    }
	  };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ResourceModel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _fetch = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResourceModel = exports.ResourceModel = (_temp = _class = function () {
	  function ResourceModel(options, props) {
	    _classCallCheck(this, ResourceModel);

	    this.$options_ = options;
	    this.$props_ = props;
	  }

	  _createClass(ResourceModel, [{
	    key: 'setProps',
	    value: function setProps(props) {
	      this.$props_ = props;
	    }
	    /**
	     * options = {
	     *  url,
	     *  addTimestamp,
	     *  removeTrailingSlash,
	     *  actions: {
	     *    query,
	     *    get,
	     *    ...
	     *  }
	     * }
	     * action = {
	     *  method,
	     *  path,
	     *  headers,
	     *  errorNotification,
	     *  withCredentials
	     * }
	     */

	  }, {
	    key: 'request',
	    value: function request(actionName, params, callback) {
	      var options = this.$options_;
	      var action = this.$options_.actions[actionName];
	      if (!action) {
	        return http.error(new Error('Request is null'));
	      }

	      var requestInterceptor = action.requestInterceptor || options.requestInterceptor || ResourceModel.requestInterceptor;
	      var responseInterceptor = action.responseInterceptor || options.responseInterceptor || ResourceModel.responseInterceptor;

	      var resourcePath = ResourceModel.resourcePath || options.resourcePath || '';
	      action.uri = action.uri || action.url;
	      if (!action.uri) {
	        var url = resourcePath + action.path;
	        // Removing double slashed from final url
	        url = url.replace(/\/\/+/g, '/');
	        if (url.startsWith('http')) {
	          url = url.replace(':/', '://');
	        }
	        var removeTrailingSlash = options.removeTrailingSlash || ResourceModel.removeTrailingSlash;
	        // Remove trailing slash
	        if (removeTrailingSlash) {
	          while (url[url.length - 1] === '/') {
	            url = url.substr(0, url.length - 1);
	          }
	        }

	        action.uri = url;
	      }

	      if (options.addTimestamp) {
	        var tsName = options.addTimestamp === true ? 'ts' : options.addTimestamp;
	        params[tsName] = '' + new Date().getTime();
	      }

	      var method = action.method || 'get';

	      var defaultOpt = {
	        name: actionName,
	        url: action.uri,
	        method: method,
	        params: params,
	        rules: action.rules,
	        headers: action.headers,
	        errorNotification: action.errorNotification,
	        withCredentials: action.withCredentials
	      };
	      var opt = requestInterceptor(defaultOpt, this.$props_);

	      var promise = void 0;
	      if (opt instanceof Promise) {
	        promise = opt;
	      } else {
	        promise = (0, _fetch.Api)(opt);
	      }
	      promise = responseInterceptor ? responseInterceptor(promise, defaultOpt, this.$props_) : promise;

	      callback && promise.then(function (res) {
	        return callback(null, res);
	      }, function (err) {
	        return callback(err);
	      });

	      return promise;
	    }
	  }, {
	    key: 'query',
	    value: function query(params, callback) {
	      return this.request('query', params, callback);
	    }
	  }, {
	    key: 'get',
	    value: function get(params, callback) {
	      return this.request('get', params, callback);
	    }
	  }, {
	    key: 'update',
	    value: function update(body, callback) {
	      return this.request('update', body, callback);
	    }
	  }, {
	    key: 'create',
	    value: function create(body, callback) {
	      return this.request('create', body, callback);
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(body, callback) {
	      return this.request('delete', body, callback);
	    }
	  }]);

	  return ResourceModel;
	}(), _class.requestInterceptor = function (req) {
	  return req;
	}, _class.responseInterceptor = function (observable, req) {
	  return observable;
	}, _class.removeTrailingSlash = false, _class.resourcePath = '', _temp);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rcInject = undefined;

	var _core = __webpack_require__(1);

	var ARROW_ARG = /^([^\(]+?)=>/; /**
	                                 * ### by Angular 1.x
	                                 * 拷贝angular初始化service的逻辑，完成service初始化是依赖注入（DI）的操作。
	                                 */

	var FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;
	var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

	function extractArgs(fn) {
	  var fnText = fn.toString().replace(STRIP_COMMENTS, ''),
	      args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
	  return args;
	}

	function anonFn(fn) {
	  // #! For anonymous functions, showing at the very least the function signature
	  // can help in
	  var args = extractArgs(fn);
	  if (args) {
	    return 'function(' + (args[1] || '').replace(/[\s\r\n]+/, ' ') + ')';
	  }
	  return 'fn';
	}

	function assertArgFn(arg, name, acceptArrayAnnotation) {
	  if (acceptArrayAnnotation && Array.isArray(arg)) {
	    arg = arg[arg.length - 1];
	  }

	  return arg;
	}

	/**
	 * > see: http://stackoverflow.com/questions/29093396/how-do-you-check-the-difference-between-an-ecmascript-6-class-and-function
	 */
	function isClass(func) {
	  if (typeof func === 'function') {
	    var funcStr = Function.prototype.toString.call(func);
	    // un minify or babel or uglify
	    return (/^class\s/.test(funcStr) || /_classCallCheck/.test(funcStr) || /^function (\w+)[\s\S]*?\w\(this,\1\);/.test(funcStr)
	    );
	  }
	}

	function annotate(fn, name) {
	  var $inject, argDecl, last;
	  if (fn.contextTypes) {
	    $inject = Object.keys(fn.contextTypes);
	  } else {
	    $inject = fn.$inject;
	  }

	  if (!$inject) {
	    $inject = [];
	    if (typeof name !== 'string' || !name) {
	      name = fn.name || anonFn(fn);
	    }
	    argDecl = extractArgs(fn);
	    argDecl[1].split(FN_ARG_SPLIT).forEach(function (arg) {
	      arg.replace(FN_ARG, function (all, underscore, name) {
	        $inject.push(name);
	      });
	    });
	  } else if (Array.isArray(fn)) {
	    last = fn.length - 1;
	    assertArgFn(fn[last], 'fn');
	    $inject = fn.slice(0, last);
	  } else {
	    assertArgFn(fn, 'fn', true);
	  }
	  return $inject;
	}

	function invoke(fn, serviceName, getService, self) {
	  var $inject = annotate(fn, serviceName) || [];
	  var args = [],
	      ctxs = {},
	      ctx,
	      length,
	      i,
	      key;

	  for (i = 0, length = $inject.length; i < length; i++) {
	    key = $inject[i];
	    if (typeof key !== 'string') {
	      throw new Error('Incorrect injection token! Expected service name as string');
	    }
	    ctx = getService(key);
	    ctxs[key] = ctx;
	    args.push(ctx);
	  }
	  if (Array.isArray(fn)) {
	    fn = fn[length];
	  }

	  if (isClass(fn)) {
	    var inst = new (Function.prototype.bind.apply(fn, [null].concat(args)))();
	    inst.context = ctxs;
	    return inst;
	  } else {
	    // > see: http://jsperf.com/angularjs-invoke-apply-vs-switch
	    self.context = ctxs;
	    return fn.apply(self, args);
	  }
	}

	var rcInject = exports.rcInject = {
	  instantiate: function instantiate(provider, serviceName, getService) {
	    // + Check if Type is annotated and use just the given function at n-1 as
	    // parameter  e.g. someModule.factory('greeter', ['$window',
	    // function(renamed$window) {}]);  > Object creation:
	    // http://jsperf.com/create-constructor/2
	    var instance = Object.create(provider.prototype || null);
	    var returnedValue = invoke(provider, serviceName, getService, instance);
	    return Object(returnedValue) === returnedValue || typeof returnedValue === 'function' ? returnedValue : instance;
	  },

	  resources: {},
	  services: {},
	  setService: function setService(Services) {
	    var getService = rcInject.getService.bind(rcInject);
	    // #! array
	    if (Array.isArray(Services)) {
	      Services.forEach(function (Service) {
	        var name = Service.displayName;
	        if (name) {
	          if (!rcInject.services[name]) {
	            rcInject.services[name] = rcInject.instantiate(Service, name, getService);
	          }
	        } else {
	          throw new Error('服务${Service.name}：displayName静态属性不能为空！');
	        }
	      });
	    } else {
	      // #! json
	      if (Services.constructor === Object) {
	        for (var key in Services) {
	          var Service = Services[key];
	          var name = key || Service.displayName;
	          if (!rcInject.services[name]) {
	            rcInject.services[name] = rcInject.instantiate(Service, name, getService);
	          }
	        }
	      } else {
	        var _name = Services.displayName || Services.name;
	        if (_name && !rcInject.services[_name]) {
	          rcInject.services[_name] = rcInject.instantiate(Services, _name, getService);
	        }
	      }
	    }
	  },
	  getService: function getService(name) {
	    if (typeof name === 'string') {
	      return rcInject.services[name];
	    } else {
	      var Service = name;
	      name = Service.displayName;
	      if (name) {
	        // #! class or function
	        if (!rcInject.services[name]) {
	          rcInject.services[name] = rcInject.instantiate(Service, name, function (name) {
	            return rcInject.services[name];
	          });
	        }
	      } else {
	        throw new Error('服务${Service.name}：displayName静态属性不能为空！');
	      }
	      return rcInject.services[name];
	    }
	  },
	  getServiceInjectName: function getServiceInjectName(fn) {
	    if (fn.contextTypes) {
	      return Object.keys(fn.contextTypes);
	    } else {
	      return fn.$inject;
	    }
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HotStaticResource = HotStaticResource;
	function HotStaticResource(newComponent, staticOption) {
	  newComponent.displayName = staticOption.displayName;
	  newComponent.actions = staticOption.actions;
	  newComponent.initialize = staticOption.initialize;

	  for (var name in newComponent.actions) {
	    newComponent[name] = staticOption.actions[name];
	    newComponent[name].name = staticOption.displayName + '.' + name;
	  }
	  return newComponent;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseResource = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp; /**
	                    *
	                    * > see: https://github.com/troyanskiy/ng2-resource-rest
	                    */


	var _rxjs = __webpack_require__(13);

	var _rxjs2 = _interopRequireDefault(_rxjs);

	var _resourceModel = __webpack_require__(9);

	var _createCrud = __webpack_require__(8);

	var _fetch = __webpack_require__(5);

	var _seamlessImmutable = __webpack_require__(3);

	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

	var _resourceCRUD = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var noop = function noop(d) {
	  return d;
	};
	var defaultProcessData = function defaultProcessData(res) {
	  return res;
	};

	var BaseResource = exports.BaseResource = (_temp = _class = function () {
	  function BaseResource(resourceName) {
	    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var initialState = arguments[2];

	    _classCallCheck(this, BaseResource);

	    this._sync(resourceName, option, initialState || option.initialState || {});

	    this.$model_ = this.defer();

	    // #! 对于get和query接口需要判断cache和终止之前请求
	    this.$cacheHttps_ = new Map();

	    // #! 所有接口都走subject_发射
	    this.$subject_ = new _rxjs2.default.Subject();
	    this.$subscripers_ = [];
	  }

	  _createClass(BaseResource, [{
	    key: 'getState',
	    value: function getState() {
	      return this.$state_;
	    }

	    /**
	     * option = {
	     *  url,
	     *
	     *  cid,
	     *  cache,
	     *
	     *  addTimestamp,
	     *  removeTrailingSlash,
	     *  actions,
	     * }
	     */

	  }, {
	    key: '_sync',
	    value: function _sync(resourceName, option, initialState) {
	      var _this = this;

	      var defaultActions = {
	        query: {
	          path: '/list',
	          method: 'get',
	          state: {
	            list: _resourceCRUD.resourceCRUD.QUERY
	          }
	        },
	        get: {
	          method: 'get',
	          state: {
	            item: _resourceCRUD.resourceCRUD.GET
	          }
	        },
	        create: {
	          method: 'post',
	          state: {
	            list: _resourceCRUD.resourceCRUD.ADD
	          }
	        },
	        update: {
	          method: 'put',
	          state: {
	            list: _resourceCRUD.resourceCRUD.UPDATE
	          }
	        },
	        delete: {
	          method: 'delete',
	          state: {
	            list: _resourceCRUD.resourceCRUD.DELETE
	          }
	        }
	      };

	      option.actions = option.actions || defaultActions;
	      var actions = {};

	      var _loop = function _loop(key) {
	        var action = void 0;
	        // #! 获取最新的cid
	        var cid = option.actions[key].cid || option.cid;
	        // #! 默认的CRUD
	        if (defaultActions[key]) {
	          if (typeof option.actions[key] === 'string') {
	            action = Object.assign({
	              uri: option.actions[key]
	            }, defaultActions[key]);
	          } else if (option.actions[key] === true) {
	            action = Object.assign({
	              path: '/{${cid}}'
	            }, defaultActions[key]);
	          } else {
	            action = Object.assign({
	              path: '/{${cid}}'
	            }, defaultActions[key], { state: null }, option.actions[key]);
	          }
	        } else if (_this[key]) {
	          throw new Error('actionName不能覆盖Resource已有的方法');
	        } else {
	          // #! 自定义的方法和action
	          action = Object.assign({}, option.actions[key]);
	        }

	        // #! 合并初始化数据
	        if (action.initialState) {
	          Object.assign(initialState, action.initialState);
	        }

	        action.cid = cid;
	        action.changes = action.changes || [];
	        actions[key] = action;

	        // #! 获取到最新的changes策略
	        var state = action.state;
	        if (state) {
	          for (var name in state) {
	            var func = state[name];
	            if (typeof func === 'string') {
	              func = _resourceCRUD.resourceCRUD[func];
	            }
	            var changes = func(name, action, initialState);
	            if (changes) {
	              action.changes = action.changes.concat(changes);
	            }
	          }
	        }

	        var processData = action.processData;
	        if ((typeof processData === 'undefined' ? 'undefined' : _typeof(processData)) === 'object') {
	          action.processData = function (res, params) {
	            var data = {};
	            var n = void 0;
	            for (var _key in processData) {
	              var d = res;
	              var tmp = processData[_key].split('.');
	              while (n = tmp.shift()) {
	                d = d[n];
	              }
	              data[_key] = d;
	            }
	            return data;
	          };
	        }

	        if (!_this[key]) {
	          _this[key] = function (params, callback) {
	            return _this.request(key, params, callback);
	          };
	        }
	      };

	      for (var key in option.actions) {
	        _loop(key);
	      }

	      // #! 初始化数据
	      this.$state_ = (0, _seamlessImmutable2.default)(initialState);
	      this.$cid_ = option.cid;

	      this.$options_ = {
	        resourcePath: option.resourcePath || '',
	        addTimestamp: option.addTimestamp,
	        removeTrailingSlash: option.removeTrailingSlash,
	        actions: actions,

	        /**
	         * payload = {
	         *  name,
	         *  status,
	         *  ajaxOption,
	         *  data,
	         *  error,
	         *  state
	         * }
	         */
	        requestInterceptor: function requestInterceptor(ajaxOption) {
	          var actionName = ajaxOption.name;
	          var action = _this.$options_.actions[actionName];
	          // #! 获取缓存的http实例
	          var http = _this.$cacheHttps_.get(actionName);

	          var promise = void 0;
	          var isSame = false;
	          // #! 存在缓存，则从cache中拿
	          if ((action.cache || action.distinct) && ajaxOption.method.toLocaleLowerCase() === 'get') {
	            if (http) {
	              if (http.params == ajaxOption.params) {
	                isSame = true;
	              } else {
	                var _params = ajaxOption.params || {};
	                var params = http.params || {};
	                var keys = Object.keys(_params);
	                if (keys.length == Object.keys(_params) && keys.length == keys.filter(function (key) {
	                  return params[key] === _params[key];
	                }).length) {
	                  isSame = true;
	                }
	              }
	              if (isSame && action.cache) {
	                if (http.resolved) {
	                  http.resolved = false;
	                  promise = http.$observable.toPromise();
	                } else {
	                  http.abort();
	                  http.release();
	                }
	              }
	            }
	          }

	          if (!promise) {
	            // #! 创建新的缓存http
	            var newHttp = _this.createHttp(ajaxOption.params, function () {
	              // #! 请求前发送
	              _this.$subject_.next({
	                name: actionName,
	                status: 'start',
	                ajaxOption: ajaxOption,
	                dispatch: newHttp.extraOption.dispatch,
	                state: _this.applyState({
	                  status: 'start',
	                  record: {},
	                  params: ajaxOption.params,
	                  changes: action.changes.concat(newHttp.extraOption.changes || [])
	                }),
	                stateAction: newHttp.extraOption.action
	              });
	            });

	            // #! 保存新的
	            _this.$cacheHttps_.set(actionName, newHttp);

	            promise = Promise.resolve(ajaxOption).then(function (opt) {
	              var promise = void 0;
	              // #! 之前的请求未完成时，则终止和关闭掉
	              if (http) {
	                if (action.distinct && isSame && !http.resolved) {
	                  http.abort();
	                  promise = _fetch.Api.error(new Error('Request is stoped'));
	                }
	                if (!action.cache) {
	                  http.release();
	                }
	              }
	              if (!promise) {
	                var err = void 0;
	                // #! 校验参数是否合法
	                if (err = BaseResource.validate(opt.params, action)) {
	                  promise = _fetch.Api.error(err);
	                } else {
	                  opt.errorNotification = opt.errorNotification || newHttp.extraOption.errorNotification;
	                  promise = (0, _fetch.Api)(opt);
	                }
	              }

	              return promise;
	            });
	          }
	          return promise;
	        },
	        responseInterceptor: function responseInterceptor(promise, ajaxOption) {
	          var newHttp = _this.$cacheHttps_.get(ajaxOption.name);
	          var action = actions[ajaxOption.name];
	          // #! 在返回结果发现resolved为true，说明中途被终止掉了
	          if (!newHttp.resolved) {
	            if (newHttp.extraOption.callback) {
	              promise.then(function (res) {
	                return newHttp.extraOption.callback(null, res);
	              }, function (err) {
	                return newHttp.extraOption.callback(err);
	              });
	            }

	            promise.then(function (res) {
	              var processData = newHttp.extraOption.processData || action.processData || defaultProcessData;
	              var data = processData(res, ajaxOption.params);

	              var state = _this.applyState({
	                record: data,
	                status: 'success',
	                params: ajaxOption.params,
	                changes: action.changes.concat(newHttp.extraOption.changes || [])
	              });

	              _this.$subject_.next({
	                name: ajaxOption.name,
	                status: 'success',
	                data: data,
	                dispatch: newHttp.extraOption.dispatch,
	                stateAction: newHttp.extraOption.action,
	                state: state
	              });
	              return data;
	            }, function (err) {
	              _this.$subject_.next({ name: ajaxOption.name, status: 'error', dispatch: newHttp.extraOption.dispatch, stateAction: newHttp.extraOption.action, state: _this.$state_, error: err });
	              throw err;
	            });
	          }
	          // #! 关闭并执行callback
	          if (!action.cache) {
	            newHttp.release();
	          }
	          return promise;
	        }
	      };
	    }

	    /**
	     * payload = {
	     *  cid,
	     *  status,
	     *  params,
	     *  changes,
	     *  record
	     * }
	     */

	  }, {
	    key: 'applyState',
	    value: function applyState(payload) {
	      if (payload.changes.length) {
	        return this.$state_ = (0, _createCrud.applyCrudReducer)(this.$state_, payload);
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'defer',
	    value: function defer() {
	      return new _resourceModel.ResourceModel(this.$options_);
	    }
	  }, {
	    key: 'createHttp',
	    value: function createHttp(params, preCallback) {
	      var http = {
	        extraOption: {},
	        params: params,
	        // #! 默认是未完成的
	        resolved: false,
	        // #! 终止掉，清理掉订阅实例
	        abort: function abort() {
	          if (http.resolved) return;
	          http.$subscription.unsubscribe();
	          http.resolved = true;
	        },
	        subscriber: null,
	        observable: _rxjs2.default.Observable.create(function (subscriber) {
	          http.subscriber = subscriber;
	        }).flatMap(function () {
	          return http.$observable;
	        }),

	        $observable: null,
	        $subscription: null,
	        // #! 开始运行
	        start: function start(promise, callback) {
	          if (http.resolved) return;

	          // 在此处加入extraOption
	          var extraOption = void 0;
	          if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object') {
	            extraOption = callback;
	            callback = extraOption.callback;
	            delete extraOption.callback;
	            http.extraOption = extraOption;
	          }

	          callback = callback || noop;
	          // 预先执行
	          preCallback();

	          // #! promise 转换为 observable
	          http.$observable = _rxjs2.default.Observable.fromPromise(promise);
	          // #! callback执行时在observable的订阅中
	          http.$subscription = http.$observable.subscribe(function (res) {
	            if (res instanceof Error) {
	              callback(res);
	            } else {
	              callback(null, res);
	            }
	          }, function (err) {
	            return callback(err);
	          }, function () {
	            return http.resolved = true;
	          });

	          // observable换换为connectObserver
	          http.observable = http.observable.publish();
	          http.observable.connect();
	        },
	        // #! 关闭，清理掉本次观察者，此时callback的实行才会开始
	        release: function release() {
	          if (http.subscriber) {
	            http.subscriber.next();
	            http.subscriber.complete();
	            http.subscriber = null;
	          }
	        }
	      };

	      return http;
	    }
	  }, {
	    key: 'request',
	    value: function request(actionName, params, callback) {
	      var action = this.$options_.actions[actionName];
	      if (!action) {
	        return _fetch.Api.error(new Error('Request is null'));
	      }

	      var promise = this.$model_.request(actionName, params);

	      var http = this.$cacheHttps_.get(actionName);

	      // #! 通过promise的cancel方法可终止掉
	      promise.cancel = http.abort.bind(http);
	      // #! 开始运行
	      http.start(promise, callback);

	      return promise;
	    }
	  }, {
	    key: 'subscribe',
	    value: function subscribe(callback) {
	      var subscription = this.$subject_.subscribe(callback);
	      this.$subscripers_.push(subscription);
	      return subscription;
	    }
	  }, {
	    key: 'unsubscribe',
	    value: function unsubscribe() {
	      this.$subscripers_.forEach(function (subscription) {
	        subscription.unsubscribe();
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.unsubscribe();
	      this.$subject_.complete();
	    }
	  }]);

	  return BaseResource;
	}(), _class.validate = function () {}, _class.ASSIGN_METHODS = _resourceCRUD.resourceCRUD, _temp);

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var resourceCRUD = exports.resourceCRUD = {
	  QUERY: function QUERY(name, action, initialState) {
	    return [{
	      name: name,
	      start: function start() {
	        return initialState[name];
	      },
	      success: function success(data) {
	        return data.data;
	      }
	    }];
	  },

	  QUERY_METRIC: function QUERY_METRIC(name, action, initialState) {
	    return [{
	      name: name,
	      start: function start() {
	        return initialState[name];
	      },
	      success: function success(data, origin) {
	        return { loading: false, total: data.total };
	      }
	    }];
	  },

	  PURE: function PURE(name, action, initialState) {
	    var propType = _typeof(initialState[name]);
	    if (propType === 'object' && Array.isArray(initialState[name])) {
	      propType = 'array';
	    } else {
	      propType = propType || 'object';
	    }
	    return [{
	      name: name,
	      start: function start() {
	        return initialState[name];
	      },
	      success: function success(data) {
	        return data;
	      }
	    }];
	  },

	  PASS: function PASS(name, action, initialState) {
	    return [{
	      name: name,
	      success: function success(data) {
	        return data;
	      }
	    }];
	  },

	  GET: function GET(name, action, initialState) {
	    return [{
	      name: name,
	      start: function start() {
	        return initialState[name];
	      },
	      success: function success(data) {
	        return data;
	      }
	    }];
	  },

	  // #! {cid, params}
	  ADD: function ADD(name, action, initialState) {
	    if (Array.isArray(initialState[name])) {
	      return [{
	        name: name,
	        success: function success(data, origin, params) {
	          if (Object(data) !== data && data !== false) {
	            data = params;
	          }
	          origin = origin.asMutable();

	          origin.unshift(data);
	          if (action.limit && action.limit < origin.length) {
	            origin.pop();
	          }
	          return origin;
	        }
	      }];
	    } else {
	      return [{
	        name: name,
	        success: function success(data, origin, params) {
	          if (Object(data) !== data && data !== false) {
	            data = params;
	          }
	          return data;
	        }
	      }];
	    }
	  },

	  ADD_METRIC: function ADD_METRIC(name, action, initialState) {
	    return [{
	      name: name,
	      success: function success(data, origin, params) {
	        if (Object(data) !== data && data !== false) {
	          data = params;
	        }
	        return origin.set('total', origin.total + 1);
	      }
	    }];
	  },

	  // #! {cid, params}
	  UPDATE: function UPDATE(name, action, initialState) {
	    if (Array.isArray(initialState[name])) {
	      return [{
	        name: name,
	        success: function success(data, origin, params) {
	          if (Object(data) !== data && data !== false) {
	            data = params;
	          }
	          if (!Array.isArray(data)) {
	            data = [data];
	          }
	          data.forEach(function (d) {
	            var idx = origin.findIndex(function (item) {
	              return item[action.cid] === d[action.cid];
	            });
	            if (idx > -1) {
	              if (action.attributes) {
	                var newD = {};
	                action.attributes.forEach(function (attr) {
	                  return newD[attr] = d[attr];
	                });
	                d = newD;
	              }
	              var item = origin[idx].merge(d);
	              origin = origin.set(idx, item);
	            }
	          });

	          return origin;
	        }
	      }];
	    } else {
	      return [{
	        name: name,
	        success: function success(data, origin, params, state) {
	          if (Object(data) !== data && data !== false) {
	            data = params;
	          }
	          if (origin[action.cid] === data[action.cid]) {
	            origin = origin.merge(data);
	          }

	          return origin;
	        }
	      }];
	    }
	  },

	  // #! {cid, params}
	  DELETE: function DELETE(name, action, initialState) {
	    if (Array.isArray(initialState[name])) {
	      return [{
	        name: name,
	        success: function success(data, origin, params, state) {
	          if (Object(data) !== data && data !== false) {
	            data = params;
	          }
	          var idx = origin.findIndex(function (item) {
	            return item[action.cid] === data[action.cid];
	          });
	          if (idx > -1) {
	            origin = origin.asMutable();
	            origin.splice(idx, 1);
	          }

	          return origin;
	        }
	      }];
	    } else {
	      return [{
	        name: name,
	        success: function success(data, origin, params, state) {
	          if (Object(data) !== data && data !== false) {
	            data = params;
	          }
	          if (origin[action.cid] === data[action.cid]) {
	            origin = initialState[name];
	          }

	          return origin;
	        }
	      }];
	    }
	  },

	  DELETE_METRIC: function DELETE_METRIC(name, action, initialState) {
	    return [{
	      name: name,
	      success: function success(data, origin, params, state) {
	        if (Object(data) !== data && data !== false) {
	          data = params;
	        }
	        if (origin.total > 0) {
	          origin = origin.set('total', origin.total - 1);
	        }

	        return origin;
	      }
	    }];
	  },

	  // #! {cid, joinName}
	  JOIN: function JOIN(name, action, initialState) {
	    var joinName = action.joinName;
	    if (Array.isArray(initialState[joinName])) {
	      return [{
	        success: function success(data, origin, params, state) {
	          var idx = state[joinName].find(function (item) {
	            return item[action.cid] === params[action.cid];
	          });
	          if (idx > -1) {
	            var item = state[joinName][idx].set(name, data);
	            var list = state[joinName].set(idx, item);
	            state = state.set(joinName, list);
	          }
	          return state;
	        }
	      }];
	    } else {
	      return [{
	        success: function success(data, origin, params, state) {
	          if (state[joinName][action.cid] === params[action.cid]) {
	            var item = state[joinName].set(name, data);
	            state = state.set(joinName, item);
	          }
	          return state;
	        }
	      }];
	    }
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	exports.resource = resource;

	var _resource = __webpack_require__(15);

	var _hotStaticResource = __webpack_require__(14);

	var _core = __webpack_require__(1);

	var _inject = __webpack_require__(10);

	var _baseSelector = __webpack_require__(4);

	var _fetch = __webpack_require__(5);

	var _seamlessImmutable = __webpack_require__(3);

	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	_baseSelector.BaseSelector.prototype.getModel = function (modelName) {
	  if (Object(modelName) === modelName) {
	    modelName = modelName.displayName;
	  }

	  var model = this.getAppStore().models[modelName];
	  if (!this.$subscribersMap_) {
	    this.$subscribersMap_ = {};
	  }
	  if (!this.$subscribersMap_[modelName] && model.subscribeResources) {
	    this.$subscribersMap_[modelName] = model.subscribeResources(this);
	  }

	  return model;
	};
	Object.defineProperty(_baseSelector.BaseSelector.prototype, 'dispatch', {
	  get: function get() {
	    var _this = this;

	    if (this.$dispatch_) {
	      return this.$dispatch_;
	    } else {
	      this.$dispatch_ = function (action) {
	        return _this.getAppStore().dispatch(action);
	      };
	      this.$dispatch_.selector = this;

	      return this.$dispatch_;
	    }
	  },
	  enumerable: true,
	  configurable: true
	});

	var destroy = _baseSelector.BaseSelector.prototype.destroy;
	_baseSelector.BaseSelector.prototype.destroy = function () {
	  destroy.call(this);
	  if (this.$subscribersMap_) {
	    for (var modelName in this.$subscribersMap_) {
	      this.$subscribersMap_[modelName].forEach(function (subscription) {
	        return subscription.unsubscribe();
	      });
	    }
	    this.$subscribersMap_ = {};
	  }
	};

	function resource() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var actionState = arguments[1];


	  return function (Model) {
	    actionState = actionState || Model.actions;

	    var NewModel = function (_Model) {
	      _inherits(NewModel, _Model);

	      _createClass(NewModel, [{
	        key: 'subscribeResources',
	        value: function subscribeResources(selector) {
	          var _this3 = this;

	          var subcriptions = [];

	          var _loop = function _loop(resourceName) {
	            var resource = _this3.$resources_[resourceName];
	            /**
	            * payload = {
	            *  name,
	            *  status,
	            *  ajaxOption,
	            *  data,
	            *  error,
	            *  state,
	            *  dispatch,
	            *  stateAction
	            * }
	            */
	            var subscription = resource.subscribe(function (payload) {
	              if (selector && payload.dispatch && selector !== payload.dispatch.selector) return;

	              var funcName = (0, _core.ucfirst)(resourceName) + (0, _core.ucfirst)(payload.name);
	              switch (payload.status) {
	                case 'start':
	                  _this3.emit('before' + funcName, payload.ajaxOption);
	                  break;
	                case 'success':
	                  _this3.emit('after' + funcName, null, payload.data);
	                  break;
	                case 'error':
	                  _this3.emit('after' + funcName, payload.error);
	                  break;
	                default:
	                  break;
	              }
	              if (payload.dispatch && payload.state) {
	                var type = (0, _core.toSnakeCase)(_this3.name + funcName + (0, _core.ucfirst)(payload.status));
	                _this3.defineActionTypes[type] = _this3.defineActionTypes[type] || {
	                  type: type,
	                  status: payload.status
	                };
	                payload.dispatch(Object.assign({
	                  type: type,
	                  error: payload.error,
	                  state: function state(prevState) {
	                    if (_this3.$transfer_) {
	                      return prevState.merge(payload.state);
	                    } else {
	                      return prevState.set(resourceName, payload.state);
	                    }
	                  }
	                }, payload.stateAction));
	              }
	            });
	            subcriptions.push(subscription);
	          };

	          for (var resourceName in this.$resources_) {
	            _loop(resourceName);
	          }
	          return subcriptions;
	        }
	      }, {
	        key: 'properties',
	        get: function get() {
	          return this.$properties_;
	        }
	      }]);

	      function NewModel(name, initialState) {
	        _classCallCheck(this, NewModel);

	        var _this2 = _possibleConstructorReturn(this, (NewModel.__proto__ || Object.getPrototypeOf(NewModel)).call(this, name));

	        _this2.$resources_ = {};
	        _this2.$properties_ = initialState || _get(NewModel.prototype.__proto__ || Object.getPrototypeOf(NewModel.prototype), 'properties', _this2) || {};

	        if (options.prototype instanceof _resource.BaseResource) {
	          (function () {
	            _this2.$transfer_ = true;
	            var resource = _this2.setResource(options.displayName, options);

	            var _loop2 = function _loop2(actionName) {
	              if (!_this2[actionName]) {
	                // #! 升级方法
	                _this2[actionName] = function (params) {
	                  return _this2.execQuery({
	                    params: params,
	                    request: resource[actionName]
	                  });
	                };
	              }
	            };

	            for (var actionName in resource.$options_.actions) {
	              _loop2(actionName);
	            }
	            Object.assign(_this2.$properties_, resource.getState());
	          })();
	        } else {
	          if (actionState) {
	            _this2.$transfer_ = true;
	            // swagger function
	            if (typeof options.actions === 'function') {
	              (function () {
	                var inst = new options.actions();
	                var keys = Object.getOwnPropertyNames(inst.__proto__);

	                var _loop3 = function _loop3(i, len) {
	                  _this2[keys[i]] = function () {
	                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                      args[_key] = arguments[_key];
	                    }

	                    if (actionState[keys[i]] && actionState[keys[i]].state) {
	                      var changes = [];
	                      for (var stateName in actionState[keys[i]].state) {
	                        changes.push({
	                          name: stateName,
	                          callback: actionState[keys[i]].state[stateName]
	                        });
	                      }
	                      return _this2.execQuery({
	                        response: inst[keys[i]].apply(inst, args),
	                        changes: changes
	                      });
	                    } else {
	                      return inst[keys[i]].apply(inst, args);
	                    }
	                  };
	                };

	                for (var i = 0, len = keys.length; i < len; i++) {
	                  _loop3(i, len);
	                }
	              })();
	            } else {
	              (function () {
	                for (var key in options.actions) {
	                  Object.assign(options.actions[key], actionState[key]);
	                }
	                options.initialState = _this2.$properties_;
	                var resource = _this2.setResource(name, options);

	                var _loop4 = function _loop4(actionName) {
	                  if (!_this2[actionName]) {
	                    // #! 升级方法
	                    _this2[actionName] = function (params) {
	                      return _this2.execQuery({
	                        params: params,
	                        request: resource[actionName]
	                      });
	                    };
	                  }
	                };

	                for (var actionName in resource.$options_.actions) {
	                  _loop4(actionName);
	                }
	                Object.assign(_this2.$properties_, resource.getState());
	              })();
	            }
	          } else {
	            Object.keys(options).forEach(function (resourceName) {
	              /**
	              * resource = {
	              *  getState,
	              *  subscribe,
	              *  destroy
	              * }
	              */
	              var resource = _this2.setResource(resourceName, options[resourceName]);
	              _this2.$properties_[resourceName] = resource.getState();
	            });
	          }
	        }
	        return _this2;
	      }

	      _createClass(NewModel, [{
	        key: 'destroy',
	        value: function destroy() {
	          _get(NewModel.prototype.__proto__ || Object.getPrototypeOf(NewModel.prototype), 'destroy', this).call(this);

	          // #! resource是共用的，所以不考虑销毁，一直保留
	          for (var resourceName in this.$resources_) {
	            if (this.$resources_[resourceName].isolate) {
	              this.$resources_[resourceName].destroy();
	            }
	          }
	        }
	      }, {
	        key: 'getResource',
	        value: function getResource(resourceName) {
	          return this.$resources_[resourceName];
	        }
	      }, {
	        key: 'setResource',
	        value: function setResource(resourceName, option) {
	          var resource = void 0;
	          option.cid = option.cid || this.generatorKey;
	          if (_inject.rcInject.resources[resourceName]) {
	            resource = this.$resources_[resourceName] = _inject.rcInject.resources[resourceName];
	          } else {
	            if (option.prototype instanceof _resource.BaseResource) {
	              resource = new option(resourceName, {}, option.initialState);
	            } else {
	              resource = new _resource.BaseResource(resourceName, option);
	              resource.isolate = true;
	            }

	            this.$resources_[resourceName] = _inject.rcInject.resources[resourceName] = resource;
	          }
	          return resource;
	        }
	      }]);

	      return NewModel;
	    }(Model);

	    return NewModel;
	  };
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createReducerFactory = createReducerFactory;
	exports.createReducerAndModels = createReducerAndModels;

	var _seamlessImmutable = __webpack_require__(3);

	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

	var _createCrud = __webpack_require__(8);

	var _baseModel = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	function createReducerFactory(modelInstance) {
	  var initialState = (0, _seamlessImmutable2.default)(modelInstance.properties);

	  function reducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];

	    if (modelInstance.defineActionTypes[action.type]) {
	      if (action.state) {
	        if (typeof action.state === 'function') {
	          return action.state(state);
	        } else {
	          return action.state;
	        }
	      } else {
	        return (0, _createCrud.applyCrudReducer)(state, action.payload, initialState);
	      }
	    } else {
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
	function createReducerAndModels(reducers, Models) {
	  var models = {};
	  if (Array.isArray(Models)) {
	    Models.forEach(function (Model) {
	      var name = Model.displayName;
	      if (Model.prototype instanceof _baseModel.BaseModel) {
	        name = Model.displayName;
	        if (name) {
	          models[name] = new Model(name, Model.initialState);
	          // models[name].setName(name);
	          reducers[name] = createReducerFactory(models[name]);
	        } else {
	          throw new Error('数据模型${Model.name}：displayName静态属性不能为空！');
	        }
	      } else {
	        models[name] = Model;
	        if (models[name].mapToStore) {
	          reducers[name] = createReducerFactory(models[name]);
	        } else {
	          reducers[name] = models[name];
	        }
	      }
	    });
	  } else {
	    for (var name in Models) {
	      var Model = Models[name];
	      if (Model.prototype instanceof _baseModel.BaseModel) {
	        name = Model.displayName || name;
	        models[name] = new Model(name, Model.initialState);
	        // models[name].setName(name);
	        reducers[name] = createReducerFactory(models[name]);
	      } else {
	        models[name] = Model;
	        if (models[name].mapToStore) {
	          reducers[name] = createReducerFactory(models[name]);
	        } else {
	          reducers[name] = models[name];
	        }
	      }
	    }
	  }
	  return {
	    reducers: reducers,
	    models: models
	  };
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

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * # poller轮询
	 * 1. 解决接口轮询功能，通过subscribe订阅轮询结果。
	 * 2. 提供start, stop, remove控制轮询
	 * > see: https://github.com/emmaguo/angular-poller/blob/master/angular-poller.js
	 */
	var Poller = exports.Poller = function () {
	  function Poller(opt) {
	    _classCallCheck(this, Poller);

	    this.$option_ = Object.assign({
	      delay: 5000,
	      smart: false,
	      action: null,
	      catchError: null
	    }, opt);
	    if (!this.$option_.delay) {
	      this.$option_.delay = 5000;
	    }
	    this.$current_ = null;
	    this.$interval_ = null;
	    this.$stopTimestamp_ = null;
	    this.$watchers_ = [];
	  }

	  _createClass(Poller, [{
	    key: "then",
	    value: function then(success, error) {
	      var watcher = function watcher(err, res) {
	        if (err) {
	          error && error(err);
	        } else {
	          success && success(res);
	        }
	      };
	      this.$watchers_.push(watcher);
	    }
	  }, {
	    key: "subscribe",
	    value: function subscribe(watcher) {
	      this.$watchers_.push(watcher);
	      this.start();
	    }
	  }, {
	    key: "unsubscribe",
	    value: function unsubscribe() {
	      this.$watchers_ = [];
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      var _this = this;

	      var timestamp = new Date();
	      this.$current_ = this.$option_.action();
	      this.$current_.then(function (res) {
	        _this.$current_.$resolved = true;
	        if (!_this.$stopTimestamp_ || timestamp >= _this.$stopTimestamp_) {
	          _this.$watchers_.forEach(function (watcher) {
	            watcher(null, res);
	          });
	        }
	      }, function (err) {
	        if (!_this.$stopTimestamp_ || timestamp >= _this.$stopTimestamp_) {
	          _this.$watchers_.forEach(function (watcher) {
	            watcher(err);
	          });
	          if (_this.$option_.catchError) {
	            _this.$option_.catchError(err);
	          }
	        }
	      });
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var _this2 = this;

	      if (!this.$watchers_.length) return;
	      this.stop();
	      this.$stopTimestamp_ = null;
	      this.tick();
	      this.$interval_ = setInterval(function () {
	        if (!_this2.$option_.smart || !_this2.$current_ || _this2.$current_.$resolved) {
	          _this2.tick();
	        }
	      }, this.$option_.delay);
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      clearInterval(this.$interval_);
	      this.$stopTimestamp_ = new Date();
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      this.stop();
	      this.unsubscribe();
	    }
	  }]);

	  return Poller;
	}();

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	if (true) {
	  module.exports = __webpack_require__(48);
	} else {
	  module.exports = require('redux');
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (true) {
	  var _class, _temp2;

	  var mergeToRender = function mergeToRender(ob) {
	    ob.render = function (callback) {
	      ob = ob.map(callback);
	      return _react2.default.createElement(RxComponent, { observable: ob });
	    };
	    var lift = ob.lift;
	    ob.lift = function (operator) {
	      var newOb = lift.call(this, operator);
	      mergeToRender(newOb);
	      return newOb;
	    };
	    return ob;
	  };

	  var Rx = __webpack_require__(13);

	  var RxComponent = (_temp2 = _class = function (_Component) {
	    _inherits(RxComponent, _Component);

	    function RxComponent() {
	      var _ref;

	      var _temp, _this, _ret;

	      _classCallCheck(this, RxComponent);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RxComponent.__proto__ || Object.getPrototypeOf(RxComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	        children: null
	      }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(RxComponent, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        var _this2 = this;

	        this.$subscription = this.props.observable.subscribe(function (children) {
	          _this2.setState({ children: children });
	        });
	      }
	    }, {
	      key: 'componentWillUnMount',
	      value: function componentWillUnMount() {
	        this.$subscription.unsubscribe();
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(
	          'div',
	          null,
	          this.state.children
	        );
	      }
	    }]);

	    return RxComponent;
	  }(_react.Component), _class.selectable = function (ob) {
	    return mergeToRender(Rx.Observable.from(ob));
	  }, _class.propsType = {
	    observable: _react.PropTypes.object.isRequired
	  }, _temp2);


	  module.exports = RxComponent;
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_25__;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.extractPath = extractPath;
	exports.parsePath = parsePath;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(6);

	var _warning2 = _interopRequireDefault(_warning);

	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);

	  if (match == null) return string;

	  return string.substring(match[0].length);
	}

	function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';

	   true ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(6);

	var _warning2 = _interopRequireDefault(_warning);

	function deprecate(fn, message) {
	  return function () {
	     true ? _warning2['default'](false, '[history] ' + message) : undefined;
	    return fn.apply(this, arguments);
	  };
	}

	exports['default'] = deprecate;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(6);

	var _warning2 = _interopRequireDefault(_warning);

	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	     true ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}

	exports['default'] = runTransitionHook;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(6);

	var _warning2 = _interopRequireDefault(_warning);

	var _ExecutionEnvironment = __webpack_require__(27);

	var _PathUtils = __webpack_require__(28);

	var _runTransitionHook = __webpack_require__(30);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _deprecate = __webpack_require__(29);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);

	    var basename = options.basename;

	    var checkedBaseHref = false;

	    function checkBaseHref() {
	      if (checkedBaseHref) {
	        return;
	      }

	      // Automatically use the value of <base href> in HTML
	      // documents as basename if it's not explicitly given.
	      if (basename == null && _ExecutionEnvironment.canUseDOM) {
	        var base = document.getElementsByTagName('base')[0];
	        var baseHref = base && base.getAttribute('href');

	        if (baseHref != null) {
	          basename = baseHref;

	           true ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
	        }
	      }

	      checkedBaseHref = true;
	    }

	    function addBasename(location) {
	      checkBaseHref();

	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    }

	    function prependBasename(location) {
	      checkBaseHref();

	      if (!basename) return location;

	      if (typeof location === 'string') location = _PathUtils.parsePath(location);

	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;

	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }

	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }

	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }

	    function replace(location) {
	      history.replace(prependBasename(location));
	    }

	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }

	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }

	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    }

	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      push(_extends({ state: state }, path));
	    }

	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);

	      replace(_extends({ state: state }, path));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	var createHelper = function createHelper(func, helperName) {
	  var setDisplayName = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	  var noArgs = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	  if (("development") !== 'production' && setDisplayName) {
	    var _ret = function () {
	      /* eslint-disable global-require */
	      var wrapDisplayName = __webpack_require__(34).default;
	      /* eslint-enable global-require */

	      if (noArgs) {
	        return {
	          v: function v(BaseComponent) {
	            var Component = func(BaseComponent);
	            Component.displayName = wrapDisplayName(BaseComponent, helperName);
	            return Component;
	          }
	        };
	      }

	      return {
	        v: function v() {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }

	          if (args.length > func.length) {
	            /* eslint-disable */
	            console.error(
	            /* eslint-enable */
	            'Too many arguments passed to ' + helperName + '(). It should called ' + ('like so: ' + helperName + '(...args)(BaseComponent).'));
	          }

	          return function (BaseComponent) {
	            var Component = func.apply(undefined, args)(BaseComponent);
	            Component.displayName = wrapDisplayName(BaseComponent, helperName);
	            return Component;
	          };
	        }
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }

	  return func;
	};

	exports.default = createHelper;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var getDisplayName = function getDisplayName(Component) {
	  if (typeof Component === 'string') {
	    return Component;
	  }

	  if (!Component) {
	    return undefined;
	  }

	  return Component.displayName || Component.name || 'Component';
	};

	exports.default = getDisplayName;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _getDisplayName = __webpack_require__(33);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
	  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
	};

	exports.default = wrapDisplayName;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _resource = __webpack_require__(15);

	Object.keys(_resource).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _resource[key];
	    }
	  });
	});

	var _resourceCRUD = __webpack_require__(16);

	Object.keys(_resourceCRUD).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _resourceCRUD[key];
	    }
	  });
	});

	var _resourceAction = __webpack_require__(36);

	Object.keys(_resourceAction).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _resourceAction[key];
	    }
	  });
	});

	var _resourceDecorator = __webpack_require__(17);

	Object.keys(_resourceDecorator).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _resourceDecorator[key];
	    }
	  });
	});

	var _resourceModel = __webpack_require__(9);

	Object.keys(_resourceModel).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _resourceModel[key];
	    }
	  });
	});
	exports.shallowCopy = shallowCopy;
	exports.extractCopy = extractCopy;
	exports.validateParameters = validateParameters;

	var _react = __webpack_require__(2);

	function shallowCopy(obj, extra) {
	  var newObj = {};
	  for (var key in obj) {
	    newObj[key] = obj[key];
	  }
	  for (var _key in extra) {
	    newObj[_key] = extra[_key];
	  }
	  return newObj;
	}

	function extractCopy(obj, extract, extra) {
	  var newObj = {};
	  if (Array.isArray(extract)) {
	    extract.forEach(function (key) {
	      newObj[key] = obj[key];
	    });
	  } else {
	    for (var key in extract) {
	      if (extract[key]) {
	        newObj[key] = obj[key] && obj[key].isRequired;
	      } else {
	        newObj[key] = obj[key];
	      }
	    }
	  }
	  for (var _key2 in extra) {
	    newObj[_key2] = extra[_key2];
	  }
	  return newObj;
	}

	function validateParameters(propTypes, value) {
	  var newPropTypes = {};
	  for (var key in propTypes) {
	    if (typeof propTypes[key] === 'function') {
	      newPropTypes[key] = propTypes[key];
	    } else {
	      newPropTypes[key] = propTypes[key].type;
	    }
	  }
	  return _react.PropTypes.shape(newPropTypes).isRequired({ parameters: value }, 'parameters', 'action');
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.resourceAction = resourceAction;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(23);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _resourceDecorator = __webpack_require__(17);

	var _resourceModel = __webpack_require__(9);

	var _hotStaticResource = __webpack_require__(14);

	var _baseModel = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function resourceAction(option) {

	  return function (ModelorResource) {
	    if (ModelorResource.prototype instanceof _baseModel.BaseModel) {
	      if (ModelorResource.displayName) {
	        var NewResource = (0, _resourceDecorator.resource)(_defineProperty({}, ModelorResource.displayName, option))(ModelorResource);
	        NewResource.prototype.generatorKey = ModelorResource.prototype.generatorKey || option.cid;

	        return NewResource;
	      } else {
	        throw new Error('Model的静态displayName属性不能为空');
	      }
	    } else if (ModelorResource.prototype.isReactComponent) {
	      var _class, _temp;

	      var newComponent = (_temp = _class = function (_Component) {
	        _inherits(newComponent, _Component);

	        function newComponent(props) {
	          _classCallCheck(this, newComponent);

	          var _this = _possibleConstructorReturn(this, (newComponent.__proto__ || Object.getPrototypeOf(newComponent)).call(this, props));

	          _this.state = {};
	          return _this;
	        }

	        _createClass(newComponent, [{
	          key: 'getChildContext',
	          value: function getChildContext() {
	            var _this2 = this;

	            if (this.$dataModel_) {
	              this.$dataModel_.setProps(this.props);
	            } else {
	              this.$dataModel_ = new _resourceModel.ResourceModel(option, this.props);

	              var _loop = function _loop(name) {
	                _this2.$dataModel_[name] = function (params, callback) {
	                  return _this2.$dataModel_.request(name, params, callback);
	                };
	                if (option.actions[name].updater) {
	                  _this2.$dataModel_.request(name, {}, function (err, res) {
	                    var nextState = option.actions[name].updater(err, res, _this2.props);
	                    if (Object(nextState) === nextState) {
	                      _this2.setState(nextState);
	                    }
	                  });
	                }
	              };

	              for (var name in option.actions) {
	                _loop(name);
	              }
	            }
	            return { dataModel: this.$dataModel_ };
	          }
	        }, {
	          key: 'getRealInstance',
	          value: function getRealInstance() {
	            return this.$instance_;
	          }
	        }, {
	          key: 'request',
	          value: function request(name, params) {
	            var _this3 = this;

	            return this.context.dataModel[name](params, function (err, res) {
	              var nextState = option.actions[name].updater(err, res, _this3.props);
	              if (Object(nextState) === nextState) {
	                _this3.setState(nextState);
	              }
	            });
	          }
	        }, {
	          key: 'render',
	          value: function render() {
	            var _this4 = this;

	            return _react2.default.createElement(
	              ModelorResource,
	              _extends({
	                ref: function ref(instance) {
	                  return _this4.$instance_ = instance;
	                }
	              }, this.props, this.state),
	              this.props.children
	            );
	          }
	        }]);

	        return newComponent;
	      }(_react.Component), _class.childContextTypes = {
	        dataModel: _react.PropTypes.object.isRequired
	      }, _temp);

	      return newComponent;
	    } else {
	      var _NewResource = function (_ModelorResource) {
	        _inherits(_NewResource, _ModelorResource);

	        function _NewResource(resourceName, opt) {
	          _classCallCheck(this, _NewResource);

	          return _possibleConstructorReturn(this, (_NewResource.__proto__ || Object.getPrototypeOf(_NewResource)).call(this, resourceName, Object.assign(option, opt), ModelorResource.initialState));
	        }

	        return _NewResource;
	      }(ModelorResource);

	      return (0, _hotStaticResource.HotStaticResource)(_NewResource, {
	        displayName: ModelorResource.displayName,
	        actions: option.actions,
	        initialState: option.initialState || ModelorResource.initialState
	      });
	    }
	  };
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = configureStore;

	var _rx = __webpack_require__(20);

	var _reduxThunk = __webpack_require__(54);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(52);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reactRouter = __webpack_require__(12);

	var _reactRouterRedux = __webpack_require__(51);

	var _reduxPromiseMiddleware = __webpack_require__(53);

	var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

	var _reactReduxLoadingBar = __webpack_require__(25);

	var _loadingBarMiddleware = __webpack_require__(40);

	var _createReducerFactory = __webpack_require__(18);

	var _enhanceStore = __webpack_require__(39);

	var _enhanceStore2 = _interopRequireDefault(_enhanceStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
	                                                                                                                                                                                                     * # 【日常】创建全局唯一的store
	                                                                                                                                                                                                     *  1. applyMiddleware -> compose -> enhancer
	                                                                                                                                                                                                     *  2. combineReducers -> rootReducer
	                                                                                                                                                                                                     *  3. createStore(rootReducer, initialState, enhancer);
	                                                                                                                                                                                                     *  > see: https://github.com/barrystaes/react-trebuchet/tree/test-bottledapi-apireduxmiddleware/src/store
	                                                                                                                                                                                                     */

	/**
	 * + redux的middleware，让dispatch支持actionCreator  
	 * > see: https://www.npmjs.com/package/redux-thunk 
	 */

	/**
	 * + redux的middleware, 支持action日志打印到console控制台
	 * > see: https://www.npmjs.com/package/redux-logger
	 */


	/**
	 * + history + store (redux) → react-router-redux → enhanced history → react-router
	 * > see: https://github.com/reactjs/react-router-redux/blob/master/README.md#how-it-works
	 */

	/**
	 * + react-redux-loading-bar
	 * > see: https://www.npmjs.com/package/react-redux-loading-bar
	 */

	/**
	 * + 把Models转成Reducers注入到redux
	 * 同时redux生成的store赋予BaseModel和BaseSelector
	 */


	var appStore = void 0;
	function configureStore(initialState, storeMiddlewares, createReducer) {
	  if (appStore) return appStore;

	  var logger = (0, _reduxLogger2.default)({
	    level: 'info',
	    collapsed: true
	  });

	  var router = (0, _reactRouterRedux.routerMiddleware)(_reactRouter.hashHistory);

	  var enhancer = (0, _rx.compose)(_rx.applyMiddleware.apply(undefined, [_reduxThunk2.default, router, logger].concat(_toConsumableArray(storeMiddlewares), [(0, _reduxPromiseMiddleware2.default)(), (0, _loadingBarMiddleware.loadingBarMiddleware)({ promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'] })])), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (noop) {
	    return noop;
	  });

	  var _createReducer = createReducer(module.hot),
	      Models = _createReducer.Models,
	      hotAcceptId = _createReducer.hotAcceptId,
	      hotModelsFeedback = _createReducer.hotModelsFeedback;

	  var _createReducerAndMode = (0, _createReducerFactory.createReducerAndModels)({ routing: _reactRouterRedux.routerReducer, loadingBar: _reactReduxLoadingBar.loadingBarReducer }, Models),
	      reducers = _createReducerAndMode.reducers,
	      models = _createReducerAndMode.models;

	  var rootReducer = (0, _rx.combineReducers)(reducers);

	  appStore = (0, _rx.createStore)(rootReducer, initialState, enhancer);

	  (0, _enhanceStore2.default)(appStore, models, reducers);

	  // #! 集成到chrome插件redux
	  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	    window.__REDUX_DEVTOOLS_EXTENSION__.updateStore(appStore);
	  }

	  /**
	   * + 支持代码热模块替换，原理是重新替换所有的Reducer
	   * > see: https://webpack.github.io/docs/hot-module-replacement.html#example-3-hot-module-replace-with-require-context
	   */
	  if (false) {
	    module.hot.accept(hotAcceptId, function () {

	      var Models = hotModelsFeedback();

	      configureStore.replace(appStore, Models);
	    });
	  }

	  return appStore;
	}

	configureStore.replace = function (appStore, Models) {
	  var _createReducerAndMode2 = (0, _createReducerFactory.createReducerAndModels)({ routing: _reactRouterRedux.routerReducer, loadingBar: _reactReduxLoadingBar.loadingBarReducer }, Models),
	      reducers = _createReducerAndMode2.reducers,
	      models = _createReducerAndMode2.models;

	  var rootReducer = (0, _rx.combineReducers)(reducers);

	  appStore.replaceReducer(rootReducer);

	  // #! 重新赋值models
	  Object.assign(appStore.models, models);
	};
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(47)(module)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * # 创建store
	 * 详情请查看对应的文件
	 */
	if (false) {
	  module.exports = require('./configureStore.production');
	} else {
	  module.exports = __webpack_require__(37);
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = enhanceStore;

	var _baseModel = __webpack_require__(7);

	var _baseSelector = __webpack_require__(4);

	var _core = __webpack_require__(1);

	var _createReducerFactory = __webpack_require__(18);

	var _rx = __webpack_require__(20);

	var _seamlessImmutable = __webpack_require__(3);

	var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function enhanceStore(appStore, models, reducers) {
	  appStore.models = models;
	  appStore.reducers = reducers;
	  /**
	   * + 动态添加Reducer，此处是动态添加Model，每个Model会产生一个Reducer
	   * > see: http://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
	   */
	  appStore.addModel = function (Models) {
	    if (Models.prototype instanceof _baseModel.BaseModel) {
	      Models = [Models];
	    }
	    if (Array.isArray(Models)) {
	      var newModels = {};
	      Models.forEach(function (Model) {
	        if (!Model.displayName) {
	          Model.displayName = (0, _core.lcfirst)(Model.name);
	        }
	        newModels[Model.displayName] = Model;
	      });
	      Models = newModels;
	    }

	    var _createReducerAndMode = (0, _createReducerFactory.createReducerAndModels)(appStore.reducers, Models),
	        reducers = _createReducerAndMode.reducers,
	        models = _createReducerAndMode.models;

	    Object.assign(appStore.models, models);
	    appStore.reducers = reducers;

	    var rootReducer = (0, _rx.combineReducers)(reducers);
	    appStore.replaceReducer(rootReducer);

	    for (var name in models) {
	      var type = '@rx/store/hot-' + name;
	      models[name].defineActionTypes[type] = {
	        type: type,
	        status: 'action'
	      };

	      appStore.dispatch({ type: type, state: reducers[name].$initialState });
	    }
	  };
	  appStore.getModel = function (name) {
	    return appStore.models[name];
	  };
	  /**
	   * + 整个方案关键之处
	   * 1. 把所有models实例挂在store实例下
	   * 2. 把store实例赋予BaseModel，所有集成于BaseModel的Model类，都可以获取到store以及model实例
	   * 3. 把store实例赋予BaseSelector，所有集成于BaseSelector的Selector类，都可以获取到store以及model实例
	   */
	  _baseModel.BaseModel.appStore = appStore;
	  _baseSelector.BaseSelector.appStore = appStore;
	  _baseSelector.BaseSelector.emitter.emit('ready');
	}
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * ### hack原有的loadingbar中间件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 目的是支持action.suppressGlobalProgress来决定是否忽略不走loadingbar
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


	exports.loadingBarMiddleware = loadingBarMiddleware;

	var _reactReduxLoadingBar = __webpack_require__(25);

	var defaultTypeSuffixes = ['PENDING', 'FULFILLED', 'REJECTED'];

	function loadingBarMiddleware() {
	  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes;

	  return function (_ref) {
	    var dispatch = _ref.dispatch;
	    return function (next) {
	      return function (action) {
	        // #! 添加suppressGlobalProgress忽略进度条
	        if (action.type && !action.suppressGlobalProgress) {
	          var _promiseTypeSuffixes = _slicedToArray(promiseTypeSuffixes, 3),
	              PENDING = _promiseTypeSuffixes[0],
	              FULFILLED = _promiseTypeSuffixes[1],
	              REJECTED = _promiseTypeSuffixes[2];

	          var isPending = new RegExp(PENDING + '$', 'g');
	          var isFulfilled = new RegExp(FULFILLED + '$', 'g');
	          var isRejected = new RegExp(REJECTED + '$', 'g');

	          if (action.type.match(isPending)) {
	            dispatch((0, _reactReduxLoadingBar.showLoading)());
	          } else if (action.type.match(isFulfilled) || action.type.match(isRejected)) {
	            dispatch((0, _reactReduxLoadingBar.hideLoading)());
	          }
	        }

	        return next(action);
	      };
	    };
	  };
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.View = exports.PropTypes = exports.dispatch = exports.initialState = exports.Output = exports.Input = exports.component = undefined;

	var _react = __webpack_require__(2);

	var _reactRedux = __webpack_require__(24);

	var _recompose = __webpack_require__(26);

	var _cuid = __webpack_require__(22);

	var _cuid2 = _interopRequireDefault(_cuid);

	var _withState2 = __webpack_require__(44);

	var _withState3 = _interopRequireDefault(_withState2);

	var _inject = __webpack_require__(10);

	var _baseSelector = __webpack_require__(4);

	var _hoistNonReactStatics = __webpack_require__(49);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * # 组件装饰器
	 * 1. 同connect，实际上connect也是React组件装饰器，不同的是component需要完成更多的封装。
	 * 2. component希望把外部的state和context也能装饰到React组件中
	 * 3. 内部通过recompose库来实现(hoc by recompose)
	 */
	var _withState = function _withState() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return function (BaseComponent) {
	    var Component = _withState3.default.apply(undefined, args)(BaseComponent);
	    return (0, _hoistNonReactStatics2.default)(Component, BaseComponent);
	  };
	};
	/**
	 * + hoc by recompose
	 * > see:
	 *  1. https://leozdgao.me/chushi-hoc/
	 *  2. https://github.com/leozdgao/react-async-script-loader
	 *  3. https://github.com/acdlite/recompose
	 *  5. http://www.hartzis.me/react-recompose-redux/
	 *
	 * > code ground: https://jsbin.com/buqeqac/edit?html,js,console,output
	 */

	/**
	 * + Copies non-react specific statics from a child component to a parent component
	 * > see: https://www.npmjs.com/package/hoist-non-react-statics
	 */
	var component = exports.component = function component(_ref) {
	  var elementFactory = _ref.elementFactory,
	      inputs = _ref.inputs,
	      outputs = _ref.outputs,
	      selector = _ref.selector,
	      providers = _ref.providers,
	      props = _ref.props;

	  var composeArgs = [];

	  // #! 把selector的inputs和outputs通过connect来装饰到React组件中。
	  var selectorInstance = void 0,
	      selectorServices = void 0;
	  if (selector) {
	    selectorServices = _inject.rcInject.getServiceInjectName(selector);
	    selector.displayName = selector.displayName || (0, _cuid2.default)();
	    selectorInstance = _inject.rcInject.getService(selector);
	    selectorInstance.name = selector.displayName;
	    inputs = selectorInstance.inputs;
	    outputs = selectorInstance.outputs;

	    if (inputs.toString() === _baseSelector.BaseSelector.prototype.inputs.toString() && selector.dataBindings) {
	      inputs = function inputs() {
	        return function (state, ownProps) {
	          var iState = {};
	          switch (true) {
	            case typeof selector.dataBindings === 'function':
	              iState = selector.dataBindings.call(selectorInstance, state, ownProps);
	              break;
	            case Array.isArray(selector.dataBindings):
	              selector.dataBindings.forEach(function (name) {
	                var model = _baseSelector.BaseSelector.appStore.models[name];
	                Object.assign(iState, model.state);
	              });
	              break;
	            default:
	              for (var key in selector.dataBindings) {
	                if (typeof selector.dataBindings[key] === 'function') {
	                  iState[key] = selector.dataBindings[key].call(selectorInstance, state, ownProps);
	                } else {
	                  iState[key] = selector.dataBindings[key];
	                }
	              }
	              break;
	          }
	          return iState;
	        };
	      };
	    }

	    if (outputs.toString() === _baseSelector.BaseSelector.prototype.outputs.toString() && selector.eventBindings) {
	      outputs = function outputs() {
	        return function (dispatch, ownProps) {
	          var iActions = {};
	          switch (true) {
	            case typeof selector.eventBindings === 'function':
	              iActions = selector.eventBindings.call(selectorInstance, dispatch, ownProps);
	              break;
	            case Array.isArray(selector.eventBindings):
	              selector.dataBindings.forEach(function (name) {
	                var model = _baseSelector.BaseSelector.appStore.models[name];
	                Object.getOwnPropertyNames(model.__proto__).forEach(function (method) {
	                  if (typeof model[method] === 'function' && method !== 'constructor') {
	                    iActions[method] = model[method].bind(model);
	                  }
	                });
	              });
	              break;
	            default:
	              for (var key in selector.eventBindings) {
	                iActions[key] = selector.eventBindings[key].bind(selectorInstance);
	              }
	              break;
	          }
	          return iActions;
	        };
	      };
	    }
	  }

	  composeArgs.push(function (BaseComponent) {
	    var contextTypes = {};
	    var services = {};
	    var parentContextTypes = [];

	    for (var key in BaseComponent.contextTypes) {
	      contextTypes[key] = BaseComponent.contextTypes[key];
	      parentContextTypes.push(key);
	      services[key] = _inject.rcInject.getService(key);
	    }
	    delete services.selector;

	    if (selectorInstance) {
	      contextTypes.selector = _react.PropTypes.object.isRequired;
	    }
	    eachProvider(providers, function (Provider, key) {
	      var name = key || Provider.displayName;
	      if (name) {
	        contextTypes[name] = _react.PropTypes.any.isRequired;
	      } else {
	        throw new Error('服务${Provider.name}：displayName静态属性不能为空！');
	      }
	    });
	    if (contextTypes) {
	      BaseComponent.contextTypes = Object.assign(BaseComponent.contextTypes || {}, contextTypes);
	    }

	    var Component = (0, _reactRedux.connect)(inputs, outputs)(BaseComponent);
	    Component.__view__ = true;

	    var handleChange = Component.prototype.handleChange;

	    Component.prototype.handleChange = function () {
	      var storeState = this.store.getState();
	      for (var name in this.store.models) {
	        this.store.models[name].state = storeState[name];
	      }
	      handleChange.call(this);
	    };

	    Component.childContextTypes = contextTypes;

	    Component.prototype.getChildContext = function () {
	      var _this = this;

	      if (this.$services_) {
	        return this.$services_;
	      }

	      this.$services_ = services;

	      parentContextTypes.forEach(function (name) {
	        // #! 如果全局没有这个服务，那么从父级继承下来
	        if (!services[name]) {
	          services[name] = getParantService.call(_this, name);
	        }
	      });
	      // #! 初始化所有的context
	      eachProvider(providers, function (Provider, key) {
	        var name = key || Provider.displayName;
	        services[name] = getService.call(_this, name) || _inject.rcInject.instantiate(Provider, name, getService.bind(_this));
	      });

	      if (services.selector) {
	        services.selector.emit('afterInitialize');
	      }
	      return services;
	    };

	    var _clearCache = Component.prototype.clearCache;
	    var _unmount = Component.prototype.componentWillUnmount;
	    Component.prototype.clearCache = function () {
	      if (!services.selector && selectorInstance) {
	        services.selector = selectorInstance;

	        services.selector.emit('beforeInitialize');
	      }
	      return _clearCache.call(this);
	    };
	    Component.prototype.componentWillMount = function () {
	      var _this2 = this;

	      if (services.selector) {
	        if (services.selector.parentSelector === undefined) {
	          services.selector.parentSelector = getParantService.call(this, 'selector') || this.props.parentSelector || null;
	        }

	        services.selector.getService = function (name) {
	          return getService.call(_this2, name) || _inject.rcInject.getService(name);
	        };

	        if (selectorServices) {
	          selectorServices.forEach(function (name) {
	            services.selector.context[name] = getService.call(_this2, name) || _inject.rcInject.getService(name) || (services[name] = _inject.rcInject.instantiate(findProvider(providers, name), name, function (name) {
	              return services[name] || getService.call(_this2, name);
	            }));
	          });
	        }
	        try {
	          services.selector.initialize(this.props);
	        } catch (e) {
	          console.error(e);
	        }
	      }
	    };
	    Component.prototype.componentWillUnmount = function () {
	      var services = this.$services_;
	      eachProvider(providers, function (Provider, key) {
	        if (services[key]) {
	          if (services[key].destroy) {
	            services[key].destroy();
	          }
	          if (services[key].dispose) {
	            services[key].dispose();
	          }
	          delete services[key];
	        }
	      });
	      _unmount.call(this);
	    };

	    return Component;
	  });

	  // #! 初始化所有的props
	  if (props) {
	    composeArgs.push(_withState(props));
	  }

	  if (elementFactory) {
	    return _recompose.compose.apply(undefined, composeArgs)(elementFactory);
	  } else {
	    return _recompose.compose.apply(undefined, composeArgs);
	  }
	};

	function eachProvider(providers, callback) {
	  if (Array.isArray(providers)) {
	    providers.forEach(function (Provider) {
	      return callback(Provider);
	    });
	  } else {
	    for (var key in providers) {
	      callback(providers[key], key);
	    }
	  }
	}
	function findProvider(providers, name) {
	  if (Array.isArray(providers)) {
	    return providers.find(function (Provider) {
	      return Provider.displayName === name;
	    });
	  } else {
	    return providers[name];
	  }
	}

	// + 获取HOC包装的组件的实例 > see:
	// https://github.com/RubaXa/Sortable/issues/713#issuecomment-169668921
	function getParantService(name) {
	  return this._reactInternalInstance._context[name];
	}
	function getService(name) {
	  var service = void 0;
	  switch (name) {
	    case 'props':
	      service = this.props;
	      break;
	    case 'inputs':
	      service = this.stateProps;
	      break;
	    case 'outputs':
	      service = this.dispatchProps;
	      break;
	    default:
	      service = this.$services_ && this.$services_[name] || this.context[name];
	      break;
	  }
	  return service || getParantService.call(this, name);
	};

	var Input = exports.Input = function Input(model) {
	  return function (prototype, method, obj) {
	    prototype.$inputMethods_ = prototype.$inputMethods_ || [];
	    prototype.$inputMethods_.push({
	      name: method,
	      value: obj.initializer ? obj.initializer() : obj.value,
	      model: model
	    });
	    if (prototype.propertyIsEnumerable('inputs')) return;
	    Object.defineProperty(prototype, 'inputs', {
	      enumerable: true,
	      get: function get() {
	        var _this3 = this;

	        return function (state, ownProps) {
	          var iState = {};
	          prototype.$inputMethods_.forEach(function (method) {
	            try {
	              if (method.model) {
	                if (method.model.indexOf('.') > -1) {
	                  iState[method.name] = _this3.getModel(method.model).select(method.name, true);
	                } else {
	                  iState[method.name] = state[method.model][method.name];
	                }
	              } else if (method.model === false) {
	                iState[method.name] = method.value;
	              } else {
	                iState[method.name] = method.value.call(_this3, state, ownProps);
	              }
	            } catch (e) {
	              console.error('[Selector Error]' + e.stack);
	            }
	          });
	          return iState;
	        };
	      }
	    });
	  };
	};

	var Output = exports.Output = function Output(model) {
	  return function (prototype, method, obj) {
	    prototype.$outputMethods_ = prototype.$outputMethods_ || [];
	    prototype.$outputMethods_.push({
	      name: method,
	      value: obj.value,
	      model: model
	    });
	    if (prototype.propertyIsEnumerable('outputs')) return;
	    Object.defineProperty(prototype, 'outputs', {
	      enumerable: true,
	      get: function get() {
	        var _this4 = this;

	        return function (dispatch, ownProps) {
	          var iAction = {};
	          prototype.$outputMethods_.forEach(function (method) {
	            if (method.model) {
	              iAction[method.name] = function () {
	                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                  args[_key2] = arguments[_key2];
	                }

	                return _this4.getModel(method.model)[method.name](args);
	              };
	            } else if (method.model === false) {
	              iAction[method.name] = method.value;
	            } else {
	              iAction[method.name] = method.value.call(_this4, dispatch, ownProps);
	            }
	          });
	          return iAction;
	        };
	      }
	    });
	  };
	};

	var initialState = exports.initialState = function initialState(prototype, property, obj) {
	  prototype.$propMethods_ = prototype.$propMethods_ || [];
	  prototype.$propMethods_.push({
	    name: property,
	    value: obj.initializer()
	  });
	  Object.defineProperty(prototype, 'properties', {
	    enumerable: true,
	    get: function get() {
	      var properties = {};
	      prototype.$propMethods_.forEach(function (prop) {
	        properties[prop.name] = prop.value;
	      });
	      return properties;
	    }
	  });
	};

	var dispatch = exports.dispatch = function dispatch(prototype, method, obj) {
	  var func = obj.value;
	  obj.initializer = function () {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args[_key3] = arguments[_key3];
	    }

	    return function () {
	      return func.apply(this, args)(this.dispatch);
	    };
	  };
	};

	exports.PropTypes = _react.PropTypes;
	var View = exports.View = component;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = router;

	var _react = __webpack_require__(2);

	function router(path, RouteComponent, option, strict) {
	  var routeConfig = void 0;
	  if (Object(path) === path) {
	    if (path.path && path.component) {
	      routeConfig = path;
	    } else {
	      option = RouteComponent;
	      RouteComponent = path;
	      path = RouteComponent.routePath;
	    }
	  }
	  if (RouteComponent.prototype === undefined || strict && option.name !== '/' && !RouteComponent.__view__) {
	    return null;
	  }
	  if (!routeConfig) {
	    routeConfig = Object.assign({
	      resolvePath: path,
	      path: path || option.name,
	      onLeave: RouteComponent.onLeave,
	      onEnter: RouteComponent.onEnter,
	      childRoutes: RouteComponent.childRoutes,
	      getIndexRoute: RouteComponent.getIndexRoute,
	      getChildRoutes: RouteComponent.getChildRoutes,
	      extension: RouteComponent.extension
	    }, option);
	    if (RouteComponent.indexRoute) {
	      if (Object(RouteComponent.indexRoute) === RouteComponent.indexRoute) {
	        routeConfig.indexRoute = RouteComponent.indexRoute;
	      } else {
	        routeConfig.indexRoute = {
	          component: RouteComponent.indexRoute
	        };
	      }
	    }
	    if (RouteComponent.prototype.isReactComponent) {
	      routeConfig.component = RouteComponent;
	    } else {
	      routeConfig.getComponent = RouteComponent;
	    }
	    if (option && option.onDestroy) {
	      delete routeConfig.onDestroy;
	      var componentWillMount = RouteComponent.prototype.componentWillMount;
	      RouteComponent.prototype.componentWillMount = function () {
	        componentWillMount && componentWillMount.call(this);
	        this.props.router.setRouteLeaveHook(this.props.route, option.onDestroy);
	      };
	    }
	  }
	  return routeConfig;
	}
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _baseSelector = __webpack_require__(4);

	var _core = __webpack_require__(1);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (true) {
	  var Rx = __webpack_require__(13);
	  var RxComponent = __webpack_require__(21);
	  var SUBSCRIBE_NS = 'subscribe.';

	  var RxSelector = function (_BaseSelector) {
	    _inherits(RxSelector, _BaseSelector);

	    function RxSelector() {
	      _classCallCheck(this, RxSelector);

	      var _this = _possibleConstructorReturn(this, (RxSelector.__proto__ || Object.getPrototypeOf(RxSelector)).call(this));

	      _this.$collectionMap_ = {};
	      return _this;
	    }

	    _createClass(RxSelector, [{
	      key: 'createEvent',
	      value: function createEvent(event, isPolling) {
	        var _this2 = this;

	        var eventObj = this.$collectionMap_[event];
	        var emitevent = '' + SUBSCRIBE_NS + event;

	        if (!eventObj) {
	          this.$collectionMap_[event] = eventObj = { eventName: event };

	          eventObj.action = function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }

	            // #! once callback
	            var onceCallback = args[args.length - 1];
	            if (typeof onceCallback === 'function') {
	              if (isPolling) {
	                var pollingCallback = function pollingCallback() {
	                  if (onceCallback.apply(undefined, arguments) === false) {
	                    _this2.removeListener(event, pollingCallback);
	                  }
	                };
	                _this2.on(event, pollingCallback);
	              } else {
	                _this2.once(event, onceCallback);
	              }
	            }
	            _this2.emit.apply(_this2, [emitevent].concat(args));
	          };
	          eventObj.stream = Rx.Observable.fromEvent(this, emitevent);
	        } else {
	          eventObj.subscription && eventObj.subscription.unsubscribe();
	        }
	        return eventObj;
	      }
	      /**
	       * ### 集成rxjs，同时开放新的Selector方法
	       * 
	       * |     方法名   |          描述          |       参数        |    默认参数      |
	       * |     ------  |         ------        |       ------      |        ------   |
	       * | addPureSubscribe | 把函数包装成一个eventEmitter方法，一旦方法触发，函数也会被调用  | {event: String, callback: Function, immediate: Boolean} |  NA |
	       * | addSubscribe | 和addPureSubscribe不同的是，callback函数中拿到的是rx的eventEmitter的source | {event: String, callback: Function, immediate: Boolean}  |          NA      |
	       * | pollingSubscribe | 调用addSubscribe同时在callback中传入polling函数 | {event: String, callback: Function, immediate: Boolean} | NA |
	       * | getAction | 获取指定的eventEmitter方法  | NA  |          NA      |
	       * | getActions | 获取所有封装的eventEmitter方法     | NA  |          NA      |
	       */

	    }, {
	      key: 'addPureSubscribe',
	      value: function addPureSubscribe(event, callback, immediate) {
	        var eventObj = this.createEvent(event);
	        var _callback = callback;
	        callback = function callback() {
	          return eventObj.stream.flatMap(_callback);
	        };

	        return this.addSubscribe(event, callback, immediate);
	      }
	    }, {
	      key: 'addSubscribe',
	      value: function addSubscribe(event, callback, immediate) {
	        var eventObj = this.createEvent(event);

	        // + 全局都加，避免combine过程中，stream调用多次
	        // > see: see: https://www.learnrxjs.io/operators/multicasting/cache.html
	        var source = callback(eventObj.stream, eventObj.action, eventObj.polling);

	        if (source) {
	          eventObj.source = source.cache(1);
	          this.addSubscription(eventObj);
	        }
	        if (immediate) {
	          var timer = setTimeout(function () {
	            clearTimeout(timer);
	            eventObj.action();
	          });
	        }
	        return eventObj;
	      }
	    }, {
	      key: 'pollingSubscribe',
	      value: function pollingSubscribe(event, callback, immediate) {
	        var eventObj = this.createEvent(event, 1);
	        var stopFlag = {};
	        var startFlag = {};
	        eventObj.polling = function (opt) {
	          var option = Object.assign({
	            delay: 5000,
	            data: startFlag,
	            checkSuccess: function checkSuccess(res) {
	              return true;
	            },
	            action: null
	          }, opt);
	          if (!option.delay) {
	            option.delay = 5000;
	          }
	          if (!option.action) {
	            return Rx.Observable.of(stopFlag);
	          } else {
	            return Rx.Observable.of(option.data).expand(function (res) {
	              if (res === startFlag || option.checkSuccess(res)) {
	                var stream = option.action(res, stopFlag);
	                if (stream instanceof Rx.Observable) {
	                  return stream;
	                } else {
	                  // #! 数据必须是对象或者promise
	                  return Rx.Observable.from(stream).delay(option.delay);
	                }
	              } else {
	                return Rx.Observable.of(stopFlag);
	              }
	            }).takeWhile(function (res) {
	              return res != stopFlag;
	            });
	          }
	        };
	        eventObj.polling.stopFlag = stopFlag;
	        eventObj.polling.startFlag = startFlag;
	        return this.addSubscribe(event, callback, immediate);
	      }
	    }, {
	      key: 'addSubscription',
	      value: function addSubscription(eventObj) {
	        var _this3 = this;

	        var stream = eventObj.source.catch(function (err) {
	          _this3.emit(eventObj.eventName, err);
	          // > see: https://www.bennadel.com/blog/3046-experimenting-with-the-catch-operator-and-stream-continuation-in-rxjs-and-angular-2.htm
	          return stream;
	        });

	        eventObj.subscription = stream.subscribe(function () {
	          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	          }

	          _this3.emit.apply(_this3, [eventObj.eventName, null].concat(args));
	        }, function (err) {
	          _this3.emit(eventObj.eventName, err);
	        });
	      }
	    }, {
	      key: 'getAction',
	      value: function getAction(event) {
	        return this.$collectionMap_[event] && this.$collectionMap_[event].action;
	      }
	    }, {
	      key: 'getActions',
	      value: function getActions() {
	        var actions = {};
	        for (var key in this.$collectionMap_) {
	          actions['do' + (0, _core.ucfirst)(key)] = this.$collectionMap_[key].action;
	        }
	        return actions;
	      }
	    }, {
	      key: 'removeSubscription',
	      value: function removeSubscription(eventObj) {
	        eventObj.subscription.unsubscribe();
	      }
	    }, {
	      key: 'getEvent',
	      value: function getEvent(event) {
	        return this.$collectionMap_[event];
	      }
	    }, {
	      key: 'select',
	      value: function select() {
	        var args = Array.prototype.slice.call(arguments, 0);
	        if (args[args.length - 1] === true) {
	          return _get(RxSelector.prototype.__proto__ || Object.getPrototypeOf(RxSelector.prototype), 'select', this).call(this, args[0]);
	        } else {
	          var store = this.getAppStore();
	          if (store.liftedStore && store.liftedStore.select) {
	            var _store$liftedStore;

	            return (_store$liftedStore = store.liftedStore).select.apply(_store$liftedStore, _toConsumableArray(args));
	          } else if (store.select) {
	            return store.select.apply(store, _toConsumableArray(args));
	          } else {
	            throw new Error('store类型不为Observable，需要更新redux为rxjs-redux');
	          }
	        }
	      }
	    }, {
	      key: 'selectable',
	      value: function selectable() {
	        return RxComponent.selectable(this.select.apply(this, arguments));
	      }
	    }, {
	      key: 'destroy',
	      value: function destroy() {
	        _get(RxSelector.prototype.__proto__ || Object.getPrototypeOf(RxSelector.prototype), 'destroy', this).call(this);
	        for (var key in this.$collectionMap_) {
	          this.$collectionMap_[key].subscription && this.$collectionMap_[key].subscription.unsubscribe();
	        }
	      }
	    }]);

	    return RxSelector;
	  }(_baseSelector.BaseSelector);

	  module.exports = RxSelector;
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _createHelper = __webpack_require__(32);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _recompose = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withState = function withState(stateProps) {
	  return function (BaseComponent) {
	    var factory = (0, _recompose.createEagerFactory)(BaseComponent);
	    return function (_Component) {
	      _inherits(_class, _Component);

	      function _class(props, context) {
	        _classCallCheck(this, _class);

	        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

	        _this.state = {};
	        _this.stateUpdater = {};

	        var _loop = function _loop(key) {
	          var stateName = key;
	          _this.state[key] = typeof stateProps[key].value === 'function' ? stateProps[key].value.call(_this, _this.props) : stateProps[key].value;
	          _this.stateUpdater[stateProps[key].setter] = function (updateFn, callback) {
	            return _this.setState(function (_ref) {
	              var stateName = _ref.stateName;
	              return _defineProperty({}, key, typeof updateFn === 'function' ? updateFn.call(_this, stateName) : updateFn);
	            }, callback);
	          };
	        };

	        for (var key in stateProps) {
	          _loop(key);
	        }
	        return _this;
	      }

	      _createClass(_class, [{
	        key: 'render',
	        value: function render() {
	          return factory(_extends({}, this.props, this.state, this.stateUpdater));
	        }
	      }]);

	      return _class;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(withState, 'withState');
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46)))

/***/ },
/* 46 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_48__;

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_49__;

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_50__;

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_51__;

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_52__;

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_53__;

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_54__;

/***/ }
/******/ ])
});
;