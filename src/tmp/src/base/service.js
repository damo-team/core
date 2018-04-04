import warning from 'fbjs/lib/warning';
import logMessages from '../logMessages';

export default function service(providers, Component, {injector, selector}) {
  // + 获取HOC包装的组件的实例 > see:
  // https://github.com/RubaXa/Sortable/issues/713#issuecomment-169668921
  function getParantService(name) {
    return this._reactInternalInstance._context[name];
  }
  // 优先级为：providers -> context -> parentContext -> globalService
  function getService(name) {
    const service = this._services && this._services[name] || this.context[name];
    return service || getParantService.call(this, name) || injector.getService(name);
  }

  const _constructor = Component.prototype.constructor;
  Component.prototype.constructor = function constructor(props, context) {
    _constructor.call(this, props, context);

    const services = this._services = {
      selector: selector
    };

    if (Array.isArray(providers)) {
      providers.forEach(Provider => {
        if (!Provider.displayName) {
          warning(false, logMessages.displayName);
        }
        const name = Provider.displayName || Provider.name;

        services[name] = injector.instantiate(Provider, name, getService.bind(this));
      });
    } else {
      for (let name in providers) {
        services[name] = injector.instantiate(providers[name], name, getService.bind(this));
      }
    }

    // 提升当前组件的context的优先级
    for (let name in context) {
      if (services[name] !== undefined) {
        context[name] = services[name];
      }
    }

    delete services.selector;
    if (selector) {
      services.parentSelector = selector;
      // context也从当前组件同一个级别
      for (let name in selector.context) {
        selector.context[name] = getService.call(this, name);
      }
      // 每次获取props都是最新的
      Object.defineProperty(selector.context, 'props', {
        get: () => {
          return this.props;
        },
        enumerable: true,
        configurable: true
      });

      // 完成后触发钩子函数
      try {
        services.selector.initialize && services.selector.initialize(this.props);
      } catch (e) {
        window
          .console
          .error(e);
      }
    }
  };

  // 子组件可以获取到providers注入的服务
  const _getChildContext = Component.prototype.getChildContext;
  Component.prototype.getChildContext = function getChildContext() {
    if (_getChildContext) {
      const childContext = _getChildContext.call(this);
      return Object.assign(childContext, this._services);
    } else {
      return this._services;
    }
  };

  const _unmount = Component.prototype.componentWillUnmount;
  Component.prototype.componentWillUnmount = function componentWillUnmount() {
    const services = this._services;
    for (let name in services) {
      if (services[name].destroy) {
        services[name].destroy();
      }
      if (services[name].dispose) {
        services[name].dispose();
      }
    }
    _unmount.call(this);
  };
}
