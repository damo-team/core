import {BaseResource} from './resource';
import {HotStaticResource} from './hotStaticResource';
import {ucfirst, toSnakeCase} from '../utils/core';
import {rcInject} from '../utils/inject';
import {BaseSelector} from '../utils/baseSelector';
import SI from 'seamless-immutable';

BaseSelector.prototype.getModel = function(modelName){
  const model = this.getAppStore().models[modelName];
  if(!this.$subscribersMap_){
    this.$subscribersMap_ = {};
  }
  if(!this.$subscribersMap_[modelName] && model.subscribeResources){
    this.$subscribersMap_[modelName] = model.subscribeResources(this);
  }

  return model;
}
Object.defineProperty(BaseSelector.prototype, 'dispatch', {
  get: function() {
    if(this.$dispatch_){
      return this.$dispatch_;
    }else{
      this.$dispatch_ = (action) => {
        return this.getAppStore().dispatch(action);
      }
      this.$dispatch_.selector = this;

      return this.$dispatch_;
    }
  },
  enumerable: true,
  configurable: true
});

const destroy = BaseSelector.prototype.destroy;
BaseSelector.prototype.destroy = function(){
  destroy.call(this);
  if(this.$subscribersMap_){
    for(let modelName in this.$subscribersMap_){
      this.$subscribersMap_[modelName].forEach(subscription => subscription.unsubscribe())
    }
    this.$subscribersMap_ = {};
  }
}

export function resource(options = {}, actionState) {

  return function (Model) {
    class NewModel extends Model {
      get properties() {
        return this.$properties_;
      }

      subscribeResources(selector){
        const subcriptions = [];
        for(let resourceName in this.$resources_){
          let resource = this.$resources_[resourceName];
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
          let subscription = resource.subscribe(payload => {
            if(selector && payload.dispatch && selector !== payload.dispatch.selector) return;
            
            const funcName = ucfirst(resourceName) + ucfirst(payload.name);
            switch (payload.status) {
              case 'start':
                this.emit(`before${funcName}`, payload.ajaxOption);
                break;
              case 'success':
                this.emit(`after${funcName}`, null, payload.data);
                break;
              case 'error':
                this.emit(`after${funcName}`, payload.error);
                break;
              default:
                break;
            }
            if (payload.dispatch && payload.state) {
              const type = toSnakeCase(this.name + funcName + ucfirst(payload.status));
              this.defineActionTypes[type] = this.defineActionTypes[type] || {
                type: type,
                status: payload.status
              }
              payload.dispatch(Object.assign({
                type: type,
                error: payload.error,
                state: (prevState) => {
                  if(this.$transfer_){
                    return prevState.merge(payload.state);
                  }else{
                    return prevState.set(resourceName, payload.state);
                  }
                }
              }, payload.stateAction));
            }
          });
          subcriptions.push(subscription);
        }
        return subcriptions;
      }

      constructor(name) {
        super(name);
        this.$resources_ = {};
        this.$properties_ = super.properties || {};

        if(options.prototype instanceof BaseResource){
          this.$transfer_ = true;
          let resource = this.setResource(options.displayName, options);
          for(let actionName in resource.$options_.actions){
            if(!this[actionName]){
              // #! 升级方法
              this[actionName] = (params) => {
                return this.getQuery({
                  params: params,
                  request: resource[actionName]
                });
              }
            }
          }
          Object.assign(this.$properties_, resource.getState());
        }else{
          if(actionState){
            this.$transfer_ = true;
            for(let key in options.actions){
              Object.assign(options.actions[key], actionState[key]);
            }
            options.initialState = this.$properties_;
            let resource = this.setResource(name, options);
            for(let actionName in resource.$options_.actions){
              if(!this[actionName]){
                // #! 升级方法
                this[actionName] = (params) => {
                  return this.getQuery({
                    params: params,
                    request: resource[actionName]
                  });
                }
              }
            }
            Object.assign(this.$properties_, resource.getState());
          }else{
            Object
            .keys(options)
            .forEach(resourceName => {
              /**
             * resource = {
             *  getState,
             *  subscribe,
             *  destroy
             * }
             */
              let resource = this.setResource(resourceName, options[resourceName]);
              this.$properties_[resourceName] = resource.getState();
            })
          }
        }
      }

      destroy() {
        super.destroy();
        
        // #! resource是共用的，所以不考虑销毁，一直保留
        for(let resourceName in this.$resources_){
          if(this.$resources_[resourceName].isolate){
            this.$resources_[resourceName].destroy();
          }
        }
      }

      getResource(resourceName) {
        return this.$resources_[resourceName];
      }

      setResource(resourceName, option) {
        let resource;
        option.cid = option.cid || this.generatorKey;
        if (rcInject.resources[resourceName]) {
          resource = this.$resources_[resourceName] = rcInject.resources[resourceName];
        } else {
          if (option.prototype instanceof BaseResource) {
            resource = new option(resourceName, {}, option.initialState);
          } else {
            resource = new BaseResource(resourceName, option);
            resource.isolate = true;
          }

          this.$resources_[resourceName] = rcInject.resources[resourceName] = resource;
        }
        return resource;
      }
    }

    return NewModel
  };
}
