import {Component} from 'react';

export default function router(path, RouteComponent, option) {
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

  if (!RouteComponent.prototype || (option && option.strict && option.name !== '/' && !RouteComponent.__view__)) {
    return null;
  }

  routeConfig = Object.assign({
    resolvePath: path,
    path: path || (option.navKey
    ? option.navKey + '/' + option.name
    : option.name),
    onLeave: RouteComponent.onLeave,
    onEnter: RouteComponent.onEnter,
    childRoutes: RouteComponent.childRoutes,
    extension: RouteComponent.extension,
    getIndexRoute: RouteComponent.getIndexRoute,
    getChildRoutes: RouteComponent.getChildRoutes
  }, option);

  if (RouteComponent.indexRoute) {
    if (Object(RouteComponent.indexRoute) === RouteComponent.indexRoute) {
      routeConfig.indexRoute = RouteComponent.indexRoute;
    } else {
      routeConfig.indexRoute = {
        component: RouteComponent.indexRoute
      };
    }
  }
  if (RouteComponent.prototype && RouteComponent.prototype.isReactComponent || RouteComponent.__app__) {
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

  return routeConfig;
}
