/**
 * # 组件装饰器
 * 1. 同connect，实际上connect也是React组件装饰器，不同的是component需要完成更多的封装。
 * 2. component希望把外部的state和context也能装饰到React组件中
 * 3. 内部通过recompose库来实现(hoc by recompose)
 */
import {PropTypes} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import cuid from 'cuid';
import withState from './withState';
import {rcInject} from './inject';
import {BaseSelector} from './baseSelector';

/**
 * + Copies non-react specific statics from a child component to a parent component
 * > see: https://www.npmjs.com/package/hoist-non-react-statics
 */
import hoistNonReactStatics from 'hoist-non-react-statics';

const _withState = (...args) => BaseComponent => {
  let Component = withState(...args)(BaseComponent);
  return hoistNonReactStatics(Component, BaseComponent);
}
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

export const component = ({
  elementFactory,
  inputs,
  outputs,
  selector,
  providers,
  props
}) => {
  let composeArgs = [];

  // #! 把selector的inputs和outputs通过connect来装饰到React组件中。
  let selectorInstance,
    selectorServices;
  if (selector) {
    selectorServices = rcInject.getServiceInjectName(selector);
    selector.displayName = selector.displayName || cuid();
    selectorInstance = rcInject.getService(selector);
    selectorInstance.name = selector.displayName;
    inputs = selectorInstance.inputs;
    outputs = selectorInstance.outputs;

    if(inputs.toString() === BaseSelector.prototype.inputs.toString() && selector.dataBindings){
      inputs = () => {
        return (state, ownProps) => {
          let iState = {};
          switch(true){
            case typeof selector.dataBindings === 'function':
              iState = selector.dataBindings.call(selectorInstance, state, ownProps);
              break;
            case Array.isArray(selector.dataBindings):
              selector.dataBindings.forEach(name => {
                const model = BaseSelector.appStore.models[name];
                Object.assign(iState, model.state);
              });
              break;
            default:
              for(let key in selector.dataBindings){
                if(typeof selector.dataBindings[key] === 'function'){
                  iState[key] = selector.dataBindings[key].call(selectorInstance, state, ownProps);
                }else{
                  iState[key] = selector.dataBindings[key];
                }
              }
              break;
          }
          return iState;
        }
      }
    }

    if(outputs.toString() === BaseSelector.prototype.outputs.toString() && selector.eventBindings){
      outputs = () => {
        return (dispatch, ownProps) => {
          let iActions = {};
          switch(true){
            case typeof(selector.eventBindings) === 'function':
              iActions = selector.eventBindings.call(selectorInstance, dispatch, ownProps);
              break;
            case Array.isArray(selector.eventBindings):
              selector.dataBindings.forEach(name => {
                const model = BaseSelector.appStore.models[name];
                Object.getOwnPropertyNames(model.__proto__).forEach(method => {
                  if(typeof model[method] === 'function' && method !== 'constructor'){
                    iActions[method] = model[method].bind(model);
                  }
                })
              });
              break;
            default:
              for(let key in selector.eventBindings){
                iActions[key] = selector.eventBindings[key].bind(selectorInstance);
              }
              break;
          }
          return iActions;
        }
      }
    }
  }

  composeArgs.push(BaseComponent => {
    const contextTypes = {};
    const services = {};

    for(let key in BaseComponent.contextTypes){
      contextTypes[key] = BaseComponent.contextTypes[key];
      services[key] = rcInject.getService(key)
    }
    delete services.selector;
    
    if (selectorInstance) {
      contextTypes.selector = PropTypes.object.isRequired;
    }
    eachProvider(providers, (Provider, key) => {
      let name = key || Provider.displayName;
      if (name) {
        contextTypes[name] = PropTypes.any.isRequired;
      } else {
        throw new Error('服务${Provider.name}：displayName静态属性不能为空！');
      }
    });
    if (contextTypes) {
      BaseComponent.contextTypes = Object.assign(BaseComponent.contextTypes || {}, contextTypes);
    }

    const Component = connect(inputs, outputs)(BaseComponent);

    const handleChange = Component.prototype.handleChange;

    Component.prototype.handleChange = function(){
      var storeState = this.store.getState();
      for(let name in this.store.models){
        this.store.models[name].state = storeState[name];
      }
      handleChange.call(this);
    }

    Component.childContextTypes = contextTypes;

    Component.prototype.getChildContext = function () {
      if (this.$services_) {
        return this.$services_;
      }

      this.$services_ = services;

      // #! 初始化所有的context
      eachProvider(providers, (Provider, key) => {
        let name = key || Provider.displayName;
        services[name] = getService.call(this, name) || rcInject.instantiate(Provider, name, getService.bind(this));
      });

      if (services.selector) {
        services
          .selector
          .emit('afterInitialize');
      }
      return services;
    }

    const _clearCache = Component.prototype.clearCache;
    const _unmount = Component.prototype.componentWillUnmount;
    Component.prototype.clearCache = function () {
      if (!services.selector && selectorInstance) {
        services.selector = selectorInstance;

        services
          .selector
          .emit('beforeInitialize');
      }
      return _clearCache.call(this);
    }
    Component.prototype.componentWillMount = function () {
      if (services.selector) {
        if (services.selector.parentSelector === undefined) {
          services.selector.parentSelector = getParantService.call(this, 'selector') || this.props.parentSelector || null;
        }

        services.selector.getService = (name) => {
          return getService.call(this, name) || rcInject.getService(name);
        };

        if (selectorServices) {
          selectorServices.forEach(name => {
            services.selector.context[name] = getService.call(this, name) || rcInject.getService(name) || (services[name] = rcInject.instantiate(findProvider(providers, name), name, (name) => {
              return services[name] || getService.call(this, name);
            }));
          });
        }
        try {
          services
            .selector
            .initialize(this.props);
        } catch (e) {
          console.error(e);
        }
      }
    }
    Component.prototype.componentWillUnmount = function () {
      const services = this.$services_;
      eachProvider(providers, (Provider, key) => {
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
    }

    return Component;
  });

  // #! 初始化所有的props
  if (props) {
    composeArgs.push(_withState(props));
  }

  if (elementFactory) {
    return compose(...composeArgs)(elementFactory);
  } else {
    return compose(...composeArgs)
  }
}

function eachProvider(providers, callback) {
  if (Array.isArray(providers)) {
    providers.forEach(Provider => callback(Provider));
  } else {
    for (let key in providers) {
      callback(providers[key], key);
    }
  }
}
function findProvider(providers, name) {
  if (Array.isArray(providers)) {
    return providers.find(Provider => Provider.displayName === name);
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
  let service;
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
  return service || getParantService.call(this, name)
};


export const Input = (model) => (prototype, method, obj) => {
  prototype.$inputMethods_ = prototype.$inputMethods_ || [];
  prototype.$inputMethods_.push({
    name: method,
    value: obj.initializer? obj.initializer() : obj.value,
    model: model
  });
  if(prototype.propertyIsEnumerable('inputs')) return;
  Object.defineProperty(prototype, 'inputs', {
    enumerable: true,
    get: function() {
      return (state, ownProps) => {
        const iState = {};
        prototype.$inputMethods_.forEach(method => {
          try{
            if(method.model){
              if(method.model.indexOf('.') > -1){
                iState[method.name] = this.getModel(method.model).select(method.name, true);
              }else{
                iState[method.name] = state[method.model][method.name];
              }
              
            }else if(method.model === false){
              iState[method.name] = method.value;
            }else{
              iState[method.name] = method.value.call(this, state, ownProps);
            }
          }catch(e){
            console.error('[Selector Error]' + e.stack);
          }
        })
        return iState;
      }
    }
  })
} 

export const Output = (model) => (prototype, method, obj) => {
  prototype.$outputMethods_ = prototype.$outputMethods_ || [];
  prototype.$outputMethods_.push({
    name: method,
    value: obj.value,
    model: model
  });
  if(prototype.propertyIsEnumerable('outputs')) return;
  Object.defineProperty(prototype, 'outputs', {
    enumerable: true,
    get(){
      return (dispatch, ownProps) => {
        const iAction = {};
        prototype.$outputMethods_.forEach(method => {
          if(method.model){
            iAction[method.name] = (...args) => {
              return this.getModel(method.model)[method.name](args);
            };
          }else if(method.model === false){
            iAction[method.name] = method.value;
          }else{
            iAction[method.name] = method.value.call(this, dispatch, ownProps);
          }
        })
        return iAction;
      }
    }
  })
} 

export const initialState = (prototype, property, obj) => {
  prototype.$propMethods_ = prototype.$propMethods_ || [];
  prototype.$propMethods_.push({
    name: property,
    value: obj.initializer()
  });
  Object.defineProperty(prototype, 'properties', {
    enumerable: true,
    get() {
      const properties = {};
      prototype.$propMethods_.forEach(prop => {
        properties[prop.name] = prop.value;
      });
      return properties;
    }
  })
} 

export const dispatch = (prototype, method, obj) => {
  const func = obj.value;
  obj.initializer = (...args) => {
    return function(){
      return func.apply(this, args)(this.dispatch);
    }
  };
} 

export {PropTypes};
export const View = component;
