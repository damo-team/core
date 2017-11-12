import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { component, BaseSelector, BaseModel, changeOperators, initialState, dispatch, Input, Output, View} from '../../../src/index'; // #! damo-core

/**
 * ----------------------------------------------------------------------------
 *                            Model == Table
 *    { generatorKey - 唯一键, properties - 字段集, crud - 增删查改方法 }
 * 1. this.getQuery(ajaxOption, changeOption) - 通过getQuery返回更新DB数据的方法（当方法调用时就会执行更新数据）
 * 2. ajaxOption - http模块调用配置项
 * 3. changeOption - 更新DB数据的策略（更新的属性以及更新的方式）
 * ----------------------------------------------------------------------------
 */
class StateModel extends BaseModel {
  get generatorKey() {
    return 'id';
  }

  @initialState
  list = [];

  @dispatch
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
class StateSelector extends BaseSelector {
  constructor(){
    super();
    // 动态添加Model到DB
    this.getAppStore().addModel(StateModel)
  }

  @Input()
  ptitle(state, ownProps){
    return this.parentSelector.parentSelector.title
  }


  @Output()
  doFetch(){
    return this.getModel('stateModel').fetch();
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
@View({
  selector: StateSelector,
  props: {
    title: {
      value: 'loading...',
      setter: 'updateTitle',
    },
    list: {
      value: [],
      setter: 'updateList'
    }
  }
})
export default class StateScene extends Component {
  static routePath = '/mvc/mvc-state';

  static propTypes = {
    ptitle: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    doFetch: PropTypes.func.isRequired,
  }

  componentWillMount(){
    this.props.updateTitle(this.props.ptitle);
    this.props.doFetch().then(res => {
      this.props.updateList(res.data);
    });
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <ul>
          {
            this.props.list
              .map((item, index) => <li key={index}>{item.text || item}</li>)
          }
        </ul>
      </div>
    );
  }
}
