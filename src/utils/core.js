import { EventEmitter } from 'events';
/**
 * # 核心的工具方法
 * 
 * + Substitutes keywords in a string using an object/array.
 *  Removes undef keywords and ignores escaped keywords.
 *  > see: https://g.alicdn.com/??kissy/k/6.2.4/seed.js
 */
const SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g,
  EMPTY = '';

export function substitute(str, o, del) {
  if (typeof str !== 'string' || !o) {
    return str;
  }
  const arr = [];
  const newStr = str.replace(SUBSTITUTE_REG, function (match, name) {
    if (match.charAt(0) === '\\') {
      return match.slice(1);
    }
    if( (o[name] === undefined)){
      return EMPTY;
    }else{
      arr.push(name);
      return o[name];
    }
  });
  if(del){
    arr.forEach(a => delete o[a]);
  }
  return newStr;
}


/**
 * + camel Case to Snake Case
 * > see: http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
 */
export function toSnakeCase(str){
  return str.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();}).toLocaleUpperCase();
}

export function toCamlCase(str){
  return str.replace(/_([^_]*)/g, function($0, $1){return $1 && ucfirst($1) || ''});
}


export function ucfirst (str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export function lcfirst (str) {
  return str.charAt(0).toLowerCase() + str.substring(1);
}


// + 把promise封装成Deferred，参考jQuery.Deffered
// > see: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
export function Deferred() {
	// #! update 062115 for typeof
	if (typeof(Promise) != 'undefined' && Promise.defer) {
		//#! need import of Promise.jsm for example: Cu.import('resource:/gree/modules/Promise.jsm');
		return Promise.defer();
	} else if (typeof(PromiseUtils) != 'undefined'  && PromiseUtils.defer) {
		//#! need import of PromiseUtils.jsm for example: Cu.import('resource:/gree/modules/PromiseUtils.jsm');
		return PromiseUtils.defer();
	} else {
		/* A method to resolve the associated Promise with the value passed.
		 * If the promise is already settled it does nothing.
		 *
		 * @param {anything} value : This value is used to resolve the promise
		 * If the value is a Promise then the associated promise assumes the state
		 * of Promise passed as value.
		 */
		this.resolve = null;

		/* A method to reject the assocaited Promise with the value passed.
		 * If the promise is already settled it does nothing.
		 *
		 * @param {anything} reason: The reason for the rejection of the Promise.
		 * Generally its an Error object. If however a Promise is passed, then the Promise
		 * itself will be the reason for rejection no matter the state of the Promise.
		 */
		this.reject = null;

		/* A newly created Pomise object.
		 * Initially in pending state.
		 */
		this.promise = new Promise(function(resolve, reject) {
			this.resolve = resolve;
			this.reject = reject;
		}.bind(this));
		Object.freeze(this);
	}
}
