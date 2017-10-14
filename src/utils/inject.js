/**
 * ### by Angular 1.x
 * 拷贝angular初始化service的逻辑，完成service初始化是依赖注入（DI）的操作。
 */
import {lcfirst} from './core';

var ARROW_ARG = /^([^\(]+?)=>/;
var FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function extractArgs(fn) {
  var fnText = fn
      .toString()
      .replace(STRIP_COMMENTS, ''),
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
    let funcStr = Function
      .prototype
      .toString
      .call(func);
    // un minify or babel or uglify
    return /^class\s/.test(funcStr) || /_classCallCheck/.test(funcStr) || /^function (\w+)[\s\S]*?\w\(this,\1\);/.test(funcStr);
  }
}

function annotate(fn, name) {
  var $inject,
    argDecl,
    last;
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
    argDecl[1]
      .split(FN_ARG_SPLIT)
      .forEach(function (arg) {
        arg
          .replace(FN_ARG, function (all, underscore, name) {
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
    const inst = new fn(...args);
    inst.context = ctxs;
    return inst;
  } else {
    // > see: http://jsperf.com/angularjs-invoke-apply-vs-switch
    self.context = ctxs;
    return fn.apply(self, args);
  }
}

export const rcInject = {
  instantiate(provider, serviceName, getService) {
    // + Check if Type is annotated and use just the given function at n-1 as
    // parameter  e.g. someModule.factory('greeter', ['$window',
    // function(renamed$window) {}]);  > Object creation:
    // http://jsperf.com/create-constructor/2
    let instance = Object.create(provider.prototype || null);
    let returnedValue = invoke(provider, serviceName, getService, instance);
    return Object(returnedValue) === returnedValue || typeof returnedValue === 'function'
      ? returnedValue
      : instance;
  },
  resources: {},
  services: {},
  setService(Services) {
    const getService = rcInject
      .getService
      .bind(rcInject);
    // #! array
    if (Array.isArray(Services)) {
      Services.forEach(Service => {
        const name = Service.displayName;
        if (name) {
          if (!rcInject.services[name]) {
            rcInject.services[name] = rcInject.instantiate(Service, name, getService);
          }
        } else {
          throw new Error('服务${Service.name}：displayName静态属性不能为空！');
        }
      })
    } else {
      // #! json
      for (let key in Services) {
        let Service = Services[name];
        let name = Service.displayName || key;
        if (!rcInject.Service) {
          rcInject.Service = rcInject.instantiate(Service, name, getService);
        }
      }
    }
  },
  getService(name) {
    if (typeof name === 'string') {
      return rcInject.services[name];
    } else {
      const Service = name;
      name = Service.displayName;
      if (name) {
        // #! class or function
        if (!rcInject.services[name]) {
          rcInject.services[name] = rcInject.instantiate(Service, name, (name) => rcInject.services[name]);
        }
      } else {
        throw new Error('服务${Service.name}：displayName静态属性不能为空！');
      }
      return rcInject.services[name];
    }
  },
  getServiceInjectName(fn) {
    if (fn.contextTypes) {
      return Object.keys(fn.contextTypes);
    } else {
      return fn.$inject;
    }
  }
}
