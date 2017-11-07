import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import damo, {
  View,
  BaseModel,
  Input,
  BaseSelector,
  Api,
  dispatch,
  Link
} from '../../src/index'; // #! damo-core

// User数据模型，负责把数据写入到状态容器
class User extends BaseModel {
  static initialState = {
    profile: {}
  }

  getUser() {
    return this.setState({
      profile: {
        response: Api.get('https://api.github.com/users/baqian'),
        processData: data => data
      }
    });
  }
}

// selector负责从状态容器中取数据，注入到组件
class Selector extends BaseSelector {
  
  static dataBindings = ['user'];

  static eventBindings = ['user'];

}

// 组件的代码定义
class Root extends Component {
  static routePath = '/mini-app';
  
  static contextTypes = {
    router: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    user1: PropTypes.object.isRequired
  }

  static defaultProps = {
    profile: {
      login: 'My First React App!!'
    }
  }

  componentWillMount(){
    this.props.location.query = {
      a: 1
    };
    this.context.router.replace(this.props.location)
    this.props.getUser();
  }

  render() {
    console.log(this.context.router);
    console.log(this.context.user);
    console.log(this.context.user1);
    return (
      <div>
        <h1>Welcome to {this.props.profile.login}</h1>
        <img src="/brand.png"/>
      </div>
    );
  }
};

// app执行，关键的5个步骤
damo.init(); // 初始化
damo.model('user', User); // 添加数据模型
damo.service('user', User);
const ViewComponent = damo.view(['user'], Root, {user1: User}); // 给组件加入数据绑定
damo.route('/demo', ViewComponent); // 建立路由
// damo.start(ViewComponent); // 执行入口，根组件

export default ViewComponent;
