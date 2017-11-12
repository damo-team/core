import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {resource} from './resourceDecorator';
import {ResourceModel} from './resourceModel';
import {HotStaticResource} from './hotStaticResource';
import {BaseModel} from '../utils/baseModel';

export function resourceAction(option) {

  return function (ModelorResource) {
    if (ModelorResource.prototype instanceof BaseModel) {
      if (ModelorResource.displayName) {
        const NewResource = resource({
          [ModelorResource.displayName]: option
        })(ModelorResource);
        NewResource.prototype.generatorKey = ModelorResource.prototype.generatorKey || option.cid;

        return NewResource;
      } else {
        throw new Error('Model的静态displayName属性不能为空')
      }
    } else if (ModelorResource.prototype.isReactComponent) {

      class newComponent extends Component {
        static childContextTypes = {
          dataModel: PropTypes.object.isRequired
        };

        constructor(props) {
          super(props);

          this.state = {}
        }

        getChildContext() {
          if (this.$dataModel_) {
            this
              .$dataModel_
              .setProps(this.props);
          } else {
            this.$dataModel_ = new ResourceModel(option, this.props);
            for (let name in option.actions) {
              this.$dataModel_[name] = (params, callback) => {
                return this
                  .$dataModel_
                  .request(name, params, callback);
              }
              if (option.actions[name].updater) {
                this
                  .$dataModel_
                  .request(name, {}, (err, res) => {
                    const nextState = option
                      .actions[name]
                      .updater(err, res, this.props);
                    if (Object(nextState) === nextState) {
                      this.setState(nextState);
                    }
                  });
              }
            }
          }
          return {dataModel: this.$dataModel_};
        }

        getRealInstance() {
          return this.$instance_;
        }

        request(name, params) {
          return this.context.dataModel[name](params, (err, res) => {
            const nextState = option
              .actions[name]
              .updater(err, res, this.props);
            if (Object(nextState) === nextState) {
              this.setState(nextState);
            }
          });
        }

        render() {
          return (
            <ModelorResource
              ref={instance => this.$instance_ = instance}
              {...this.props}
              {...this.state}>{this.props.children}</ModelorResource>
          );
        }
      }
      return newComponent;
    } else {
      class NewResource extends ModelorResource {
        constructor(resourceName, opt) {
          super(resourceName, Object.assign(option, opt), ModelorResource.initialState);
        }
      }
      return HotStaticResource(NewResource, {
        displayName: ModelorResource.displayName,
        actions: option.actions,
        initialState: option.initialState || ModelorResource.initialState
      });
    }
  };
}
