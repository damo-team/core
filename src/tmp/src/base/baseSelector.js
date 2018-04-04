import {EventEmitter} from 'events';
import Rx from 'rxjs';
import {Poller} from 'Beatle';

export default class BaseSelector extends EventEmitter {
  constructor() {
    super();
    this._eventsMap = {};
    this.setMaxListeners(Number.MAX_VALUE);
  }

  _getEmiiter(eventName) {
    let emiiter = this._eventsMap[eventName];
    const emitevent = `subscribe.${eventName}`;

    if (!emiiter) {
      this._eventsMap[eventName] = emiiter = {
        eventName: eventName
      };
      /**
       * ### action调用逻辑
       *
       * ```
       *  const selector = new Selector();
       *  const emitter = selector.fromEvent('increment', (stream) => {
       *    return stream.flatMap(num => {
       *      return new Promise(resolve => {
       *        setTimeout(() => {
       *          resolve(num + 1);
       *        });
       *      });
       *    });
       *  });
       * // 方式1
       * emitter.trigger(1, (res) => console.log(res)) // => 2
       * // 方式2
       * emitter.once(res => console.log(res)); // => 2
       * emitter.trigger(1);
       * ```
       */
      emiiter.trigger = () => {
        const onceCallback = arguments[arguments.length - 1];
        if (typeof onceCallback === 'function') {
          arguments.pop();
          if (emiiter.source.polling) {
            const pollingCallback = (...args) => {
              if (onceCallback(...args) === false) {
                this.removeListener(eventName, pollingCallback);
              }
            };
            this.on(eventName, pollingCallback);
          } else {
            this.once(eventName, onceCallback);
          }
        }
        this.emit(emitevent, ...arguments);
      };
      emiiter.stream = Rx
        .Observable
        .fromEvent(this, emitevent);
    } else {
      emiiter.subscription && emiiter
        .subscription
        .unsubscribe();
    }
    return emiiter;
  }

  _getPoller(option) {
    // poller.start => promise
    let promise = option.action(option.status.start);

    const source = Rx
      .Observable
      .from(promise)
      .expand((res) => {
        promise = option.action(res);
        if (promise) {
          if (promise instanceof Rx.Observable) {
            return promise;
          } else {
            // #! 数据必须是对象或者promise
            return Rx
              .Observable
              .from(promise)
              .delay(option.delay);
          }
        } else {
          return Rx
            .Observable
            .of(option.status.end);
        }
      })
      .takeWhile(res => option.next(res));
    source.polling = true;
    return source;
  }

  _subscribe(eventObj) {
    let stream = eventObj.source.catch(err => {
      this.emit(eventObj.eventName, err);
      // > see:
      // https://www.bennadel.com/blog/3046-experimenting-with-the-catch-operator-and-
      // s tream-continuation-in-rxjs-and-angular-2.htm
      return stream;
    });

    eventObj.subscription = stream.subscribe((...args) => {
      this.emit(eventObj.eventName, null, ...args);
    }, err => {
      this.emit(eventObj.eventName, err);
    });
  }

  /**
   * ### BaseSelector的Api
   *
   * | 方法 | 参数类型 | 描述 |
   * |: ------ |: ------ |: ------ |
   * | fromPoller(option) `Observable` | | |
   * | fromEvent(eventName, getSource) `Object` | | |
   * | getAction(eventName) `Function` | | |
   * | getEvent(eventName) `Object` | | |
   * | unsubscribe(eventName) | | |
   */

  fromPoller(option) {
    if (option instanceof Poller) {
      const poller = option;
      poller.stop();
      option = {
        status: {
          start: {},
          processing: {},
          end: {}
        },
        delay: poller._option.delay,
        action: (res) => {
          if (res === option.status.start) {
            return poller._current || poller.tick(Promise.resolve(option.status.processing));
          } else {
            if (poller.hasTick(res)) {
              return poller.tick();
            }
          }
        },
        next: (res) => {
          return res !== option.status.end || poller.hasTick(res);
        }
      };
      return this._getPoller(option);
    } else {
      const newOption = {
        status: {
          start: {},
          processing: {},
          end: {}
        },
        delay: option._delay,
        action: (res) => {
          if (res === option.status.start || res === option.status.processing) {
            return option.action(res) || Promise.resolve(option.status.processing);
          }
        },
        next: (res) => {
          return res !== option.status.end;
        }
      };
      return this._getPoller(newOption);
    }
  }

  fromEvent(eventName, getSource) {
    const emitter = this._getEmiiter(eventName);

    // + 全局都加，避免combine过程中，stream调用多次 > see: see:
    // https://www.learnrxjs.io/operators/multicasting/cache.html
    let source = getSource(emitter.stream);
    if (source) {
      emitter.source = source.cache(1);
      this._subscribe(emitter);
    }

    return emitter;
  }

  getAction(eventName) {
    return this._eventsMap[eventName] && this._eventsMap[eventName].action;
  }

  getEvent(eventName) {
    return this._eventsMap[eventName];
  }

  unsubscribe(eventName) {
    this.getEvent(eventName)
      .subscription
      .unsubscribe();
  }

  destroy() {
    this.removeAllListeners();
    for (let key in this._eventsMap) {
      this._eventsMap[key].subscription && this
        ._eventsMap[key]
        .subscription
        .unsubscribe();
    }
  }
}
