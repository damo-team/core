import immutable from 'seamless-immutable';
import {ReduxSeed} from 'beatle';

import modelToReducer from './modelToReducer';
import BaseModel from '../baseModel';

export default class DamoSeed extends ReduxSeed {
  _setModel(redux, name, Model, Resource) {
    if (Model instanceof BaseModel) {
      const model = new Model({
        name: name,
        ajax: this._ajax, 
        initialState: Model.initialState
      });
      redux.models[name] = model;

      const actions = {};
      const methods = Object.getOwnPropertyNames(model.__proto__);
      for (let i = 1, len = methods.length; i < len; i++) {
        actions[method] = model[methods].bind(model);
      }
      redux.actions[name] = actions;

      const initialState = immutable(model.state);
      redux.rootReducer[name] = modelToReducer(model, initialState);

      return initialState;
    } else {
      return super._setModel(redux, name, Model, Resource)
    }
  }
}
