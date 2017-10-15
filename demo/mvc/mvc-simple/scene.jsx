import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BaseModel, changeOperators, initialState} from '../../../src/index'; // #! damo-core

/**
 * ----------------------------------------------------------------------------
 *                            Model == Table
 *    { generatorKey - 唯一键, properties - 字段集, crud - 增删查改方法 }
 * 1. this.getQuery(ajaxOption, changeOption) - 通过getQuery返回更新DB数据的方法（当方法调用时就会执行更新数据）
 * 2. ajaxOption - http模块调用配置项
 * 3. changeOption - 更新DB数据的策略（更新的属性以及更新的方式）
 * ----------------------------------------------------------------------------
 */
class SimpleModel extends BaseModel {
  get generatorKey() {
    return 'id';
  }

  @initialState
  list = [];

  fetch(params) {
    return this.getQuery({
      uri: 'demo/mocks/list.json',
      method: 'get',
      body: params,

      name: 'list',
      change: changeOperators['RECONFIGURE']
    });
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
// #! 不推荐使用connect
const store = BaseModel.appStore;
store.addModel(SimpleModel);

@connect((state, ownProps) => {
  return {
    list: state.simpleModel.list
  }
}, (dispatch, ownProps) => {
  return {
    fetch: () => store.models.simpleModel.fetch()(dispatch)
  }
})
export default class SimpleScene extends Component {
  static routePath = '/mvc/mvc-simple'

  static propTypes = {
    list: PropTypes.array.isRequired,
    fetch: PropTypes.func.isRequired
  }

  componentWillMount(){
    this.props.fetch();
  }

  render() {
    return (
      <div>
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
