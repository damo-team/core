import { Component } from 'react'
import createHelper from 'recompose/createHelper';
import { createEagerFactory } from 'recompose';

const withState = (stateProps) =>
  BaseComponent => {
    const factory = createEagerFactory(BaseComponent)
    return class extends Component {
      constructor(props, context){
        super(props, context);
        this.state = {};
        this.stateUpdater = {};
        for(let key in stateProps){
          let stateName = key;
          this.state[key] = typeof stateProps[key].value === 'function'
            ? stateProps[key].value.call(this, this.props)
            : stateProps[key].value;
          this.stateUpdater[stateProps[key].setter] = (updateFn, callback) => (
            this.setState(({ stateName }) => ({
              [key]: typeof updateFn === 'function'
                ? updateFn.call(this, stateName)
                : updateFn
            }), callback)
          )
        }
      }

      render() {
        return factory({
          ...this.props,
          ...this.state,
          ...this.stateUpdater
        })
      }
    }
  }

export default createHelper(withState, 'withState')
