import {Api} from '../utils/fetch';

export class ResourceModel {
  static requestInterceptor = req => req;

  static responseInterceptor = (observable, req) => observable;

  static removeTrailingSlash = false;

  static resourcePath = '';

  constructor(options, props) {
    this.$options_ = options;
    this.$props_ = props;
  }

  setProps(props){
    this.$props_ = props;
  }
  /**
   * options = {
   *  url,
   *  addTimestamp,
   *  removeTrailingSlash,
   *  actions: {
   *    query,
   *    get,
   *    ...
   *  }
   * }
   * action = {
   *  method,
   *  path,
   *  headers,
   *  errorNotification,
   *  withCredentials
   * }
   */
  request(actionName, params, callback) {
    const options = this.$options_;
    const action = this.$options_.actions[actionName];
    if (!action) {
      return http.error(new Error('Request is null'));
    }

    const requestInterceptor = action.requestInterceptor || options.requestInterceptor || ResourceModel.requestInterceptor;
    const responseInterceptor = action.responseInterceptor || options.responseInterceptor || ResourceModel.responseInterceptor;

    const resourcePath = ResourceModel.resourcePath || options.resourcePath || '';
    if (!action.uri) {
      let url = resourcePath + action.path;
      // Removing double slashed from final url
      url = url.replace(/\/\/+/g, '/');
      if (url.startsWith('http')) {
        url = url.replace(':/', '://');
      }
      const removeTrailingSlash = options.removeTrailingSlash || ResourceModel.removeTrailingSlash;
      // Remove trailing slash
      if (removeTrailingSlash) {
        while (url[url.length - 1] === '/') {
          url = url.substr(0, url.length - 1);
        }
      }

      action.uri = url;
    }

    if (options.addTimestamp) {
      const tsName = options.addTimestamp === true
        ? 'ts'
        : options.addTimestamp;
      params[tsName] = '' + new Date().getTime();
    }

    const method = action.method || 'get';

    const defaultOpt = {
      name: actionName,
      url: action.uri,
      method: method,
      params: params,
      rules: action.rules,
      headers: action.headers,
      errorNotification: action.errorNotification,
      withCredentials: action.withCredentials
    }
    const opt = requestInterceptor(defaultOpt, this.$props_);

    let promise;
    if (opt instanceof Promise) {
      promise = opt;
    } else {
      promise = Api(opt);
    }
    promise = responseInterceptor
      ? responseInterceptor(promise, defaultOpt, this.$props_)
      : promise;

    callback && promise.then(res => callback(null, res), err => callback(err));

    return promise;
  }

  query(params, callback) {
    return this.request('query', params, callback);
  }

  get(params, callback) {
    return this.request('get', params, callback);
  }

  update(body, callback) {
    return this.request('update', body, callback);
  }

  create(body, callback) {
    return this.request('create', body, callback);
  }

  delete(body, callback) {
    return this.request('delete', body, callback);
  }
}
