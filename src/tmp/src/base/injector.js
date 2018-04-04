/**
 * ### by Angular 1.x
 * 拷贝angular初始化service的逻辑，完成service初始化是依赖注入（DI）的操作。
 */
import isPlainObject from 'lodash/isPlainObject';
import warning from 'fbjs/lib/warning';
import logMessages from '../logMessages';

var ARROW_ARG = /^([^\(]+?)=>/;
var FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function extractArgs(fn) {
  const fnText = fn.toString().replace(STRIP_COMMENTS, '');
  const args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
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
  let $inject;
  let argDecl;
  let last;
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

function invoke(Fn, serviceName, getService, self) {
  let $inject = annotate(Fn, serviceName) || [];
  let args = [];
  let ctxs = {};
  let ctx;
  let length;
  let i;
  let key;

  for (i = 0, length = $inject.length; i < length; i++) {
    key = $inject[i];
    if (typeof key !== 'string') {
      throw new Error('Incorrect injection token! Expected service name as string');
    }
    ctx = getService(key);
    ctxs[key] = ctx;
    args.push(ctx);
  }
  if (Array.isArray(Fn)) {
    Fn = Fn[length];
  }

  if (isClass(Fn)) {
    const inst = new Fn(...args);
    inst.context = ctxs;
    return inst;
  } else {
    // > see: http://jsperf.com/angularjs-invoke-apply-vs-switch
    self.context = ctxs;
    return Fn.apply(self, args);
  }
}

export default class Injector {
  constructor(Services) {
    this._services = {};
    if (Services) {
      this.setServices(Services);
    }
  }

  instantiate(provider, serviceName, getService) {
    // + Check if Type is annotated and use just the given function at n-1 as
    // parameter  e.g. someModule.factory('greeter', ['$window',
    // function(renamed$window) {}]);  > Object creation:
    // http://jsperf.com/create-constructor/2
    const instance = Object.create(provider.prototype || null);
    const returnedValue = invoke(provider, serviceName, (name) => {
      const service = getService && getService(name);
      if (service) {
        return service;
      } else {
        return this.getService(name);
      }
    }, instance);
    return Object(returnedValue) === returnedValue || typeof returnedValue === 'function' ? returnedValue : instance;
  }

  setServices(Services) {
    Services.forEach(Service => {
      this.setService(Service);
    });
  }

  setService(Service) {
    if (Array.isArray(Service)) {
      this.setServices(Service);
    } else {
      if (isPlainObject(Service)) {
        this.setServices(Object.keys(key => Service[key]));
      } else {
        const name = Service.displayName;
        if (name) {
          if (!this._services[name]) {
            warning(false, logMessages.cover);
          }
          this._services[name] = this.instantiate(Service, name);
        } else {
          warning(false, logMessages.displayName);
        }
      }
    }
  }

  getService(name) {
    return this._services[name];
  }

  getDependencies(Service) {
    if (Service.contextTypes) {
      return Object.keys(Service.contextTypes);
    } else {
      return Service.$inject;
    }
  }
}
