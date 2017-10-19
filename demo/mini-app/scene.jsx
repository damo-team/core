import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import {
  damo,
  View,
  BaseModel,
  BaseSelector,
  Api,
  dispatch
} from '../../src/index'; // #! damo-core

// User数据模型，负责把数据写入到状态容器
class User extends BaseModel {
  static initialState = {
    profile: {}
  }

  getUser() {
    return this.getQuery({
      response: Api.get('https://api.github.com/users/baqian'),
      processData: res => res,
      change: {
        name: 'profile',
        callback: data => data
      }
    })(this.dispatch);
  }
}

// selector负责从状态容器中取数据，注入到组件
class Selector extends BaseSelector {
  static dataBindings = {
    title: damo.toselect(User, 'profile.login')
  }

  initialize() {
    this
      .getModel(User)
      .getUser();
  }
}

// 组件的代码定义
class Root extends Component {
  static routePath = '/mini-app';

  static defaultProps = {
    title: 'My First React App!!'
  }
  render() {
    return (
      <div>
        <h1>Welcome to {this.props.title}</h1>
        <img src="/brand.png"/>
      </div>
    );
  }
};

// app执行，关键的5个步骤

damo.init(); // 初始化
damo.model(User); // 添加数据模型
const ViewComponent = damo.view(Selector, Root); // 给组件加入数据绑定
damo.route('/demo', ViewComponent); // 建立路由
// damo.start(ViewComponent); // 执行入口，根组件

export default ViewComponent;