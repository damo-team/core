import React, {Component} from 'react';
import PropTypes from 'prop-types';

if (process.env.RXJS) {
  const Rx = require('rxjs');

  function mergeToRender(ob){
    ob.render = function(callback) {
      ob = ob.map(callback);
      return (<RxComponent observable={ob} />);
    }
    const lift = ob.lift;
    ob.lift = function(operator){
      const newOb = lift.call(this, operator);
      mergeToRender(newOb);
      return newOb;
    }
    return ob;
  }

  class RxComponent extends Component{
    static selectable = function(ob){
      return mergeToRender(Rx.Observable.from(ob));
    }

    static propsType = {
      observable: PropTypes.object.isRequired
    }

    state = {
      children: null
    }

    componentWillMount(){
      this.$subscription = this.props.observable.subscribe(children => {
        this.setState({children: children});
      });
    }
    
    componentWillUnMount(){
      this.$subscription.unsubscribe();
    }

    render(){
      return (<div>{this.state.children}</div>);
    }
  }

  module.exports = RxComponent;
}
