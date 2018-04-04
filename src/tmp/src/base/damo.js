import immutable from 'seamless-immutable';
import Beatle from 'beatle';
import isPlainObject from 'lodash/isPlainObject';
import warning from 'fbjs/lib/warning';
import logMessages from '../logMessages';
import Injector from './injector';
import AsyncComponent from './asyncComponent';
import service from './service';
import BaseSelector from './baseSelector';

let increment = 0;
function guid(name) {
  return name + (++increment);
}
export default class Damo extends Beatle {
  constructor(opt) {
    super(opt);

    // #! 初始化服务注入器，并注册全局服务
    this.injector = new Injector(opt && opt.providers);
  }

  /**
   * ### Beatle新增Api
   *
   * | 方法 | 参数类型 | 描述 |
   * |: ------ |: ------ |: ------ |
   * | serialize(obj) `Object` | obj `Object` | 序列化数据结构，此时数据为不可变 |
   * | deserialize(obj) `Object` | obj `Object` | 反序列化数据结构，以方便对数据进行更改 |
   * | observable(obj) `Observable` | obj `Object` | 把数据转变为可观察队列，通过Rxjs来做序列进行转换 |
   * | select(nestKey) `Object` | nestKey `String` | 直接从store中获取指定model下的数据 |
   * | service(Service) `Service` | N/A | 注册服务 |
   */
  serialize(obj) {
    return immutable(obj);
  }

  deserialize(obj, deep) {
    if (immutable.isImmutable(obj)) {
      return obj.asMutable({deep: deep});
    } else {
      return obj;
    }
  }

  observable(originData) {
    return AsyncComponent.observable(originData);
  }

  select(keyStr) {
    const currentState = this
      .seed
      .get('store')
      .getState();
    const keys = keyStr.split('.');
    let state;
    try {
      state = currentState;
      for (let i = 0, len = keys.length; i < len; i++) {
        state = state[keys[i]];
      }
    } catch (e) {
      warning(false, logMessages.selectError);
      window
        .console
        .error(e);
    }
    return state;
  }

  model(Model) {
    if (typeof Model === 'string') {
      return this
        .seed
        .get('models')[Model];
    } else {
      super.model(Model);
    }
  }

  service(providers, BaseComponent, selector) {
    if (typeof providers === 'string') {
      return this
        .injector
        .getService(providers);
    } else {
      if (!isPlainObject(providers)) {
        providers = [].concat(providers);
      }
      if (BaseComponent) {
        service(providers, BaseComponent, {
          injector: this,
          selector: selector
        });
      } else {
        if (Array.isArray(providers)) {
          this
            .injector
            .setServices(providers);
        } else {
          this
            .injector
            .setServices(Object.keys(providers).map(key => {
              providers[key].displayName = providers[key].displayName || key;
              return providers[key];
            }));
        }
      }
    }
  }

  view(Selector, SceneComponent, providers) {
    let selector;
    if (Selector instanceof BaseSelector) {
      if (!Selector.displayName) {
        warning(false, logMessages.displayName);
      }
      selector = this
        .injector
        .instantiate(Selector, Selector.displayName || guid('selector'));
    } else {
      const models = [].concat[selector];

      selector = new BaseSelector();
      selector.dataBindings = models;
      selector.eventBindings = models;
      if (providers === true) {
        selector.flattern = true;
        providers = null;
      }
    }
    SceneComponent = this.connect(selector, SceneComponent, selector.flattern);

    this.service(providers, SceneComponent, selector);

    return SceneComponent;
  }
}
