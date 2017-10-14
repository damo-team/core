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
class PollingModel extends BaseModel {
  get generatorKey() {
    return 'id';
  }

  get properties() {
    return {
      list: []
    };
  }

  polling(params) {
    return this.pollingQuery({
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
 *                            Selector == Controller
 * { inputs - DB输入流向组件, outputs - 提供方法用于更新DB数据, initialize - 初始化 }
 * 1. this.getModel(name) - 获取model实例，只有通过model的方法才能更新到DB数据
 * ----------------------------------------------------------------------------
 */
class PollingSelector extends BaseSelector {
  constructor(){
    super();
    // 动态添加Model到DB
    this.getAppStore().addModel(PollingModel)
  }

  get inputs() {
    return (state, ownProps) => {
      return {
        list: state.pollingModel.list
      }
    }
  }

  get outputs() {
    return (dispatch, ownProps) => ({
      start: () => {
        console.log('start');
        this.$poller_.start()
      },
      stop: () => {
        console.log('stop');
        this.$poller_.stop()
      },
      remove: () => {
        console.log('remove');
        this.$poller_.remove()
      }
    });
  }

  initialize(ownProps) {
    this.$poller_ = this.getModel('pollingModel').polling()(this.dispatch);
    this.$poller_.subscribe((err, res) => {
      console.log(res);
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
@component({
  selector: PollingSelector
})
export default class PollingScene extends Component {
  static routePath = '/mvc-polling';

  static contextTypes = {
    selector: PropTypes.any.isRequired,
  }

  static PropTypes = {
    list: PropTypes.array.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
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
        <div>
          <a style={{margin: 10}} href="javascript:;" onClick={() => this.props.stop()}>暂停</a>
          <a style={{margin: 10}} href="javascript:;" onClick={() => this.props.start()}>继续</a>
          <a style={{margin: 10}} href="javascript:;" onClick={() => this.props.remove()}>销毁</a>
        </div>
      </div>
    );
  }
}
