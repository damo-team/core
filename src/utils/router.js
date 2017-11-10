import {Component} from 'react';

export default function router(path, RouteComponent, option, strict) {
  let routeConfig;
  if (Object(path) === path) {
    if (path.path && path.component) {
      routeConfig = path;
    } else {
      option = RouteComponent;
      RouteComponent = path;
      path = RouteComponent.routePath;
    }
  }
  if(RouteComponent.prototype === undefined || (strict && option.name !== '/' && !RouteComponent.__view__)){
    return null;
  }
  if (!routeConfig) {
    routeConfig = Object.assign({
      resolvePath: path,
      path: path || option.name,
      onLeave: RouteComponent.onLeave,
      onEnter: RouteComponent.onEnter,
      childRoutes: RouteComponent.childRoutes,
      getIndexRoute: RouteComponent.getIndexRoute,
      getChildRoutes: RouteComponent.getChildRoutes,
      extension: RouteComponent.extension
    }, option);
    if (RouteComponent.indexRoute) {
      if (Object(RouteComponent.indexRoute) === RouteComponent.indexRoute) {
        routeConfig.indexRoute = RouteComponent.indexRoute
      } else {
        routeConfig.indexRoute = {
          component: RouteComponent.indexRoute
        }
      }
    }
    if (RouteComponent.prototype.isReactComponent) {
      routeConfig.component = RouteComponent;
    } else {
      routeConfig.getComponent = RouteComponent;
    }
    if (option && option.onDestroy) {
      delete routeConfig.onDestroy;
      const componentWillMount = RouteComponent.prototype.componentWillMount;
      RouteComponent.prototype.componentWillMount = function () {
        componentWillMount && componentWillMount.call(this);
        this
          .props
          .router
          .setRouteLeaveHook(this.props.route, option.onDestroy)
      }
    }
  }
  return routeConfig;
}
