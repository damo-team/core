import React from 'react';
import PropTypes from 'prop-types';
import Rx from 'rxjs';

function mergeToRender(ob) {
  Object.assign(ob, {
    render(callback) {
      ob = ob.map(callback);
      return (<AsyncComponent observable={ob} />);
    }
  });
  const lift = ob.lift;
  ob.lift = function (operator) {
    const newOb = lift.call(this, operator);
    mergeToRender(newOb);
    return newOb;
  };
  return ob;
}

export default class AsyncComponent extends React.PureComponent {
  static propTypes = {
    observable: PropTypes.object.isRequired
  }
  static observable = function (ob) {
    return mergeToRender(Rx.Observable.from(ob));
  }

  static propsType = {
    observable: PropTypes.object.isRequired
  }

  state = {
    children: null
  }

  componentWillMount() {
    this.$subscription = this.props.observable.subscribe(children => {
      this.setState({children: children});
    });
  }

  componentWillUnMount() {
    this
      .$subscription
      .unsubscribe();
  }

  render() {
    return (
      <div>{this.state.children}</div>
    );
  }
}
