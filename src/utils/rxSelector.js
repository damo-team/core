import {BaseSelector} from './baseSelector';
import {ucfirst} from './core';

if (process.env.RXJS) {
  const Rx = require('rxjs');
  const RxComponent = require('./rxComponent');
  const SUBSCRIBE_NS = 'subscribe.';
  class RxSelector extends BaseSelector{
    constructor(){
      super();
      this.$collectionMap_ = {};
    }
    
    createEvent(event, isPolling){
      let eventObj = this.$collectionMap_[event];
      const emitevent = `${SUBSCRIBE_NS}${event}`;

      if(!eventObj){
        this.$collectionMap_[event] = eventObj = {eventName: event};

        eventObj.action = (...args) => {
          // #! once callback
          let onceCallback = args[args.length - 1];
          if(typeof onceCallback === 'function'){
            if(isPolling){
              const pollingCallback = (...args) => {
                if(onceCallback(...args) === false){
                  this.removeListener(event, pollingCallback);
                }
              }
              this.on(event, pollingCallback);
            }else{
              this.once(event, onceCallback);
            }
          }
          this.emit(emitevent, ...args);
        };
        eventObj.stream = Rx.Observable.fromEvent(this, emitevent);
      }else{
        eventObj.subscription && eventObj.subscription.unsubscribe();
      }
      return eventObj;
    }
    /**
     * ### 集成rxjs，同时开放新的Selector方法
     * 
     * |     方法名   |          描述          |       参数        |    默认参数      |
     * |     ------  |         ------        |       ------      |        ------   |
     * | addPureSubscribe | 把函数包装成一个eventEmitter方法，一旦方法触发，函数也会被调用  | {event: String, callback: Function, immediate: Boolean} |  NA |
     * | addSubscribe | 和addPureSubscribe不同的是，callback函数中拿到的是rx的eventEmitter的source | {event: String, callback: Function, immediate: Boolean}  |          NA      |
     * | pollingSubscribe | 调用addSubscribe同时在callback中传入polling函数 | {event: String, callback: Function, immediate: Boolean} | NA |
     * | getAction | 获取指定的eventEmitter方法  | NA  |          NA      |
     * | getActions | 获取所有封装的eventEmitter方法     | NA  |          NA      |
     */
    addPureSubscribe(event, callback, immediate){
      const eventObj = this.createEvent(event);
      const _callback = callback;
      callback = () => {
        return eventObj.stream.flatMap(_callback);
      }

      return this.addSubscribe(event, callback, immediate);
    }

    addSubscribe(event, callback, immediate){
      const eventObj = this.createEvent(event);

      // + 全局都加，避免combine过程中，stream调用多次
      // > see: see: https://www.learnrxjs.io/operators/multicasting/cache.html
      const source = callback(eventObj.stream, eventObj.action, eventObj.polling);
      
      if(source){
        eventObj.source = source.cache(1);
        this.addSubscription(eventObj);
      }
      if(immediate){
        let timer = setTimeout(() => {
          clearTimeout(timer);
          eventObj.action();
        });
      }
      return eventObj;
    }

    pollingSubscribe(event, callback, immediate){
      const eventObj = this.createEvent(event, 1);
      const stopFlag = {};
      const startFlag = {};
      eventObj.polling = (opt) => {
        const option = Object.assign({
          delay: 5000,
          data: startFlag,
          checkSuccess: (res) => true,
          action: null
        }, opt);
        if(!option.delay){
          option.delay = 5000;
        }
        if(!option.action){
          return Rx.Observable.of(stopFlag);
        }else{
          return Rx.Observable.of(option.data)
            .expand(res => {
              if(res === startFlag || option.checkSuccess(res)){
                const stream = option.action(res, stopFlag);
                if(stream instanceof Rx.Observable){
                  return stream;
                }else{
                  // #! 数据必须是对象或者promise
                  return Rx.Observable.from(stream).delay(option.delay);
                }
              }else{
                return Rx.Observable.of(stopFlag);
              }
            })
            .takeWhile(res => res != stopFlag)
        }
      }
      eventObj.polling.stopFlag = stopFlag;
      eventObj.polling.startFlag = startFlag;
      return this.addSubscribe(event, callback, immediate);
    }

    addSubscription(eventObj){
      let stream = eventObj.source
        .catch(err => {
          this.emit(eventObj.eventName, err);
          // > see: https://www.bennadel.com/blog/3046-experimenting-with-the-catch-operator-and-stream-continuation-in-rxjs-and-angular-2.htm
          return stream;
        });

      eventObj.subscription = stream.subscribe((...args) => {
        this.emit(eventObj.eventName, null, ...args);
      }, err => {
        this.emit(eventObj.eventName, err);
      });
    }

    getAction(event){
      return this.$collectionMap_[event] && this.$collectionMap_[event].action;
    }

    getActions(){
      let actions = {};
      for(let key in this.$collectionMap_){
        actions[`do${ucfirst(key)}`] = this.$collectionMap_[key].action;
      }
      return actions;
    }

    removeSubscription(eventObj){
      eventObj.subscription.unsubscribe();
    }

    getEvent(event){
      return this.$collectionMap_[event];
    }

    select(){
      const args = Array.prototype.slice.call(arguments, 0);
      if(args[args.length - 1] === true){
        return super.select(args[0]);
      }else{
        const store = this.getAppStore();
        if(store.liftedStore && store.liftedStore.select){
          return store.liftedStore.select(...args);
        }else if(store.select){
          return store.select(...args);
        }else{
          throw new Error('store类型不为Observable，需要更新redux为rxjs-redux');
        }
      }
    }
    
    selectable() {
      return RxComponent.selectable(this.select.apply(this, arguments));
    }
    
    destroy(){
      super.destroy();
      for(let key in this.$collectionMap_){
        this.$collectionMap_[key].subscription && this.$collectionMap_[key].subscription.unsubscribe();
      }
    }
  }

  module.exports = RxSelector;
}
