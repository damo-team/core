import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, hashHistory, Link } from 'react-router';
import { connect, Provider } from 'react-redux';
import { configureStore, autoLoadScenesRoutes, BaseSelector, component } from '../src/index';
import { IntlProvider } from 'react-intl';

/**
 * ----------------------------------------------------------------------------
 *                            Store == DB
 * { initialState - 初始化数据, middlewares - redux中间件, modelsMap - 数据集 }
 * ----------------------------------------------------------------------------
 */
const initialState = undefined;
const middlewares = [];
const modelsMap = () => {
  return {
    Models: {

    }
  }
}
const store = configureStore(initialState, middlewares, modelsMap);

const codeSourcesMap = {
 '/mvc': require('!!raw!./mvc/scene.jsx'),
 '/mvc/mvc-simple': require('!!raw!./mvc/mvc-simple/scene.jsx'),
 '/mvc/mvc-callback': require('!!raw!./mvc/mvc-callback/scene.jsx'),
 '/mvc/mvc-status': require('!!raw!./mvc/mvc-status/scene.jsx'),
 '/mvc/mvc-state': require('!!raw!./mvc/mvc-state/scene.jsx'),
 '/mvc-mock': require('!!raw!./mvc-mock/scene.jsx'),
 '/mvc-polling': require('!!raw!./mvc-polling/scene.jsx'),
 '/mvc-rx': require('!!raw!./mvc-rx/scene.jsx'),
 '/mvc-rx/mvc-rx-polling': require('!!raw!./mvc-rx/mvc-rx-polling/scene.jsx'),
 '/mvc-sync': require('!!raw!./mvc-sync/scene.jsx'),
 '/mvc-context': require('!!raw!./mvc-context/scene.jsx'),
};

class AppSelector extends BaseSelector{
  get title(){
    return 'Hello World';
  }
}

@component({
  selector: AppSelector
})
class Application extends Component {
  
  render() {
    return (
        <div>
          <h3>Demo</h3>
          <div style={{float: 'left', width: 300}}>
            <nav>
              {this.renderRoute(rootRoute.childRoutes[0])}
            </nav>
            <h3>View</h3>
            {this.props.children}
          </div>
          <div style={{marginLeft: 300}}>
            <pre style={{backgroundColor: '#333', color: '#fff', padding: 20, fontSize: 14}}>
              {codeSourcesMap[this.props.location.pathname]}
            </pre>
          </div>
        </div>
      )
  }
  renderRoute(route){
    return (
      <ul>
      {
        route.childRoutes.map((item, index) => {
          return (<li key={index}><Link to={item.path} style={{color: (this.props.location.pathname === item.path) && '#f50'}}>{item.name}</Link>{item.childRoutes && this.renderRoute(item)}</li>)
        })
      }
      </ul>
    );
  }
}

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: Application,
    childRoutes: autoLoadScenesRoutes(require.context('.', true, /scene\.jsx$/))
  }]
}

/**
 * ----------------------------------------------------------------------------
 *                            应用启动
 * ReactDOM.render <- RootComponent <- RouterComponent <- routes
 * ----------------------------------------------------------------------------
 */
class Root extends Component {
  render() {
    return (
      <IntlProvider locale="en">
        <Provider store={store}>
          <div>
            <Router history={hashHistory} routes={rootRoute} />
            
          </div>
        </Provider>
      </IntlProvider>
    );
  }
}
// hashHistory vs browserHistory, 这里主要是为了使用hash

const rootElement = document.getElementById('J_page');
ReactDOM.render(<Root />, rootElement);
