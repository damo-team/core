import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { component, BaseSelector, BaseModel, changeOperators } from '../../src/index'; // #! @ali/naza-react-starter

/**
 * ----------------------------------------------------------------------------
 *                            Model == Table
 *    { generatorKey - 唯一键, properties - 字段集, crud - 增删查改方法 }
 * 1. this.getQuery(ajaxOption, changeOption) - 通过getQuery返回更新DB数据的方法（当方法调用时就会执行更新数据）
 * 2. ajaxOption - http模块调用配置项
 * 3. changeOption - 更新DB数据的策略（更新的属性以及更新的方式）
 * ----------------------------------------------------------------------------
 */
class ContextModel extends BaseModel {
  get generatorKey() {
    return 'id';
  }

  get properties() {
    return {
      list: []
    };
  }

  fetch(params) {
    return this.getQuery({
      uri: 'demo/mocks/list.json',
      method: 'get',
      body: params,
    }, {
      operate: 'fetch',
      change: {
        name: 'list',
        type: changeOperators['RECONFIGURE']
      }
    });
  }
}

/**
 * ----------------------------------------------------------------------------
 *                            Selector == Controller
 * { inputs - DB输入流向组件, outputs - 提供方法用于更新DB数据, initialize - 初始化 }
 * 1. this.getModel(name) - 获取model实例，只有通过model的方法才能更新到DB数据
 * ----------------------------------------------------------------------------
 */
class ContextSelector extends BaseSelector {
  constructor(){
    super();
    // 动态添加Model到DB
    this.getAppStore().addModel(ContextModel)
  }

  get inputs() {
    return (state, ownProps) => {
      return {
        list: state.contextModel.list
      }
    }
  }

  get outputs() {
    return (dispatch, ownProps) => ({
      fetch: () => this.getModel('contextModel').fetch()(this.dispatch)
    });
  }

  initialize(ownProps) {
    this.getModel('contextModel').fetch()(this.dispatch);

    this.on('afterInitialize', () => {
      console.log(this.getService('main'))
    })
  }
}

/**
 * ----------------------------------------------------------------------------
 *                            Context
 * 通过$inject声明的context模块，在constructor可以获取到
 * see: https://github.com/facebook/react/issues/2517
 * ----------------------------------------------------------------------------
 */
class Sub1{
  static test = 1;

  constructor(){
    this.name = 'sub1';
    console.log(this.name);
  }
}
class Sub2 extends Sub1{
  static test = 2;

  constructor(sub1){
    super();
    this.name = 'sub2';
    console.log(this.name);
  }
}

class Main{
  static $inject = ['sub1', 'sub2', 'history'];
  constructor(sub1, sub2, router){
    console.log((router && 'router') + ':' + sub1.name + ':' + sub2.name);
  }
}

class H3 extends Component{
  static contextTypes = {
    sub1: PropTypes.any.isRequired
  }

  constructor(props, context){
    super(props);
  }

  render(){
    return (<h3>Hello World!</h3>);
  }
}

/**
 * ----------------------------------------------------------------------------
 *                            AppRouter == View
 * { PropTypes - 默认数据, defaultProps - 流向组件的数据需要声明数据类型, contextTypes - context类型声明, lifeCycle - 组件生命周期 }
 * component的作用相当于connect，而selector的inputs和outputs相当于connenct的①和②参数
 * 所有DB数据都会冻结变更，除非调用asMutable才可变更。
 * ----------------------------------------------------------------------------
 */
@component({
  selector: ContextSelector,
  providers: {
    sub1: Sub1,
    sub2: Sub2,
    main: Main
  }
})
export default  class ContextScene extends Component {
  static routePath = '/mvc-context';

  static contextTypes = {
    selector: PropTypes.any.isRequired,
  }

  static defaultProps = {
    list: []
  }

  render() {
    return (
      <div>
        <H3/>
        <ul>
          {
            this.props.list
              .asMutable({ deep: true })
              .map((item, index) => <li key={index}>{item.text || item}</li>)
          }
        </ul>
      </div>
    );
  }
}
