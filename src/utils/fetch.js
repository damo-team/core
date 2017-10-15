/**
 * # 接口调用模块
 * 1. 封装ES7的fetch模块
 * 2. 对外提供get, post, delete, put静态方法，分别调用不同类型的接口
 * 3. 对外开发errorhandler和mock数据的接口
 */
import fetch from 'isomorphic-fetch';
import { substitute } from './core';

const HttpCodes = {
  OK: 200,
  ERROR: 301
}

const constants = {
  APP_JSON_HEADER: 'application/json',
  SAME_ORIGIN: 'same-origin',
  INCLUDE: 'include',
}

/**
 * + 接口数据解析，所有的接口数据都会已json格式进行解析
 */
function parseJSON(response, errorNotification, uri) {
  return response.json().then((res) => Api.errorHandler(res, errorNotification, uri));
}

Api.errorHandler = function(res, errorNotification){return res};
Api.validateHandler = function(data, ajaxOption){return Object.assign({}, data)};
/**
 * + 错误处理处理
 * > see: see: http://php.net/manual/en/function.http-response-code.php
 * > see: https://stackoverflow.com/questions/34304335/redux-using-async-middlewares-vs-dispatching-actions-on-success-functions
 */
function checkStatus(response, errorNotification) {
  if(errorNotification && errorNotification.quiet) return response;

  if (response.status < HttpCodes.OK || response.status >= HttpCodes.ERROR) {
    let error = new Error(response.statusText);
    try{
      error.response = response.json();
    }catch(e){
      error.response = response.text();
    }
    error.errorNotification = errorNotification;
    throw error;
  }
  return response;
}

/**
 * + mock数据
 * 1. 在生产环境，直接抛弃mock逻辑
 * 2. 在日常环境，当地址栏参数debug=true或者window.DEBUG=true，同时接口url包含proxy=true参数时，触发mock数据逻辑
 * 3. 当存在window.Mocky对象时，会针对数据进行mock语法编译，生成假数据。window.Mocky由`damo-mocker`模块提供
 */
let doFetch;
if (process.env.NODE_ENV === 'production') {
  doFetch = fetch;
}else{
  if(location.search.indexOf('debug=true') > -1 || window.DEBUG){
    doFetch = (uri, options) => {
      if (Api.getMockUrl && uri.indexOf('proxy=true') > -1) {
        let tmp = uri.split('?');
        let url = tmp[0].replace(location.protocol + '//' + location.hostname, '').replace(/^[:\d]*/, '').replace(/\/\{[^\}]*\}/, '');
        let params = {};
        tmp[1].split('&').forEach(str => {
          let s = str.split('=');
          params[s[0]] = s[1];
        });
        uri = Api.getMockUrl(url, params, options);
      }
      return fetch(uri, options);
    }
  }else{
    doFetch = fetch;
  }
}

function isValidParamValue(val) {
    var t = typeof val;
    // #! If the type of val is null, undefined, number, string, boolean, return TRUE.
    return val == null || (t !== 'object' && t !== 'function');
}
/**
 * + 参数序列化，参考与kissy的param
 * > see: https://g.alicdn.com/??kissy/k/6.2.4/seed.js#stringify
 * > see: http://unixpapa.com/js/querystring.html
 */
var SEP = '&';
var EMPTY = '';
var undef;
var urlEncode = encodeURIComponent;
var toString = ({}).toString;
var EQ = '=';
function param(o, sep, eq, serializeArray) {
  sep = sep || SEP;
  eq = eq || EQ;
  if (serializeArray === undef) {
    serializeArray = true;
  }
  var buf = [];
  var key;
  var i;
  var v;
  var len;
  var val;
  for (key in o) {
    val = o[key];
    var originalKey = key;
    key = urlEncode(key);

    //#! val is valid non-array value
    if (isValidParamValue(val)) {
      buf.push(key);
      if (val !== undef) {
        buf.push(eq, urlEncode(val + EMPTY));
      }
      buf.push(sep);
    } else if (Array.isArray(val)) {
      //#! val is not empty array
      for (i = 0, len = val.length; i < len; ++i) {
        v = val[i];
        if (isValidParamValue(v)) {
          buf.push(key, (serializeArray && (originalKey.slice(0 - 2) !== '[]') ? urlEncode('[]') : EMPTY));
          if (v !== undef) {
            buf.push(eq, urlEncode(v + EMPTY));
          }
          buf.push(sep);
        }
      }
    }
    //#! ignore other cases, including empty array, Function, RegExp, Date etc.
  }
  buf.pop();
  return buf.join(EMPTY);
}
/**
 * ### API Context
 * Api本身可以通过new来初始化，通过配置的method属性指定调用方法
 * 
 * |     方法名   |          描述          |       参数        |    默认参数      |
 * |:    ------  |         ------        |       ------      |        ------   |
 * | get | 调用get请求    | {uri: String, body: Object, params: Object, headers: Object } |         NA      |
 * | post | 调用post请求    | 同get |         NA      |
 * | put | 调用put请求    | 同get |         NA      |
 * | delete | 调用delete请求    | 同get |         NA      |
 * | errorHandler | 接口错误处理的开放接口    | (res: 接口数据, errorNotification: 错误处理器} |         NA      |
 * | getMockUrl | 接口mock路径的开放接口    | {url: String, params: 接口参数, options: ajax配置} |         NA      |
 */
export function Api(ajaxOption){
  const method = ajaxOption.method.toLocaleUpperCase();
  const body = Api.validateHandler(ajaxOption.data || ajaxOption.params, ajaxOption);
  let headers;
  if(ajaxOption.headers){
    if(ajaxOption.headers.target){
      headers = Object.assign({}, ajaxOption.headers);
      headers.target = substitute(headers.target, body, true);
    }else{
      headers = ajaxOption.headers;
    }
  }
  const credential = ajaxOption.withCredentials ? 'INCLUDE' : 'SAME_ORIGIN';
  const uri = substitute(ajaxOption.url, body, true);
  
  switch(method){
    case 'POST':
    case 'PUT':
      return Api.postput(uri, method, body, ajaxOption.errorNotification, headers, credential);
    case 'DELETE':
      return Api.delete(`${uri.indexOf('?') > -1 ? uri : uri + '?'}&${param(body)}`, ajaxOption.errorNotification, headers, credential)
    case 'GET':
    default:
      return Api.get(`${uri.indexOf('?') > -1 ? uri : uri + '?'}&${param(body)}`, ajaxOption.errorNotification, headers, credential)
  }
}

Api.headers = Object.assign(window.ajaxHeader || {}, {
  'Accept': constants.APP_JSON_HEADER,
  'Content-Type': constants.APP_JSON_HEADER
});
Api.doFetch = doFetch;

Object.assign(Api, {
  success(res){
    return Promise.resolve(res);
  },
  error(err){
    return Promise.reject(err);
  },
  get(uri, errorNotification, headers, credential){
    return doFetch(uri,
    {
      method: 'GET',
      credentials: constants[credential],
      headers: headers || Api.headers
    })
    .then(response => checkStatus(response, errorNotification))
    .then(response => parseJSON(response, errorNotification, uri));
  },
  delete(uri, errorNotification, headers, credential){
    return doFetch(uri,
    {
      method: 'DELETE',
      credentials: constants[credential],
      headers: headers || Api.headers
    })
    .then(response => checkStatus(response, errorNotification))
    .then(response => parseJSON(response, errorNotification, uri));
  },
  postput(uri, method, data, errorNotification, headers, credential){
    return doFetch(uri,
    {
      method: method,
      credentials: constants[credential],
      headers: headers || Api.headers,
      body: JSON.stringify(data)
    })
    .then(response => checkStatus(response, errorNotification))
    .then(response => parseJSON(response, errorNotification, uri));
  },
  post(uri, data, errorNotification, headers, credential){
    return Api.postput(uri, 'POST', data, errorNotification, headers, credential);
  },
  put(uri, data, errorNotification, headers, credential){
    return Api.postput(uri, 'PUT', data, errorNotification, headers, credential);
  }
});

/**
 * + 需要在业务中实现这个方法来集成
 */
// Api.getMockUrl = function(url, params, options){
//   if(url.indexOf('.json') === -1){
//     url = url + '.json';
//   }
//   return '/mocks' + url;
// } 
