/**
 * # poller轮询
 * 1. 解决接口轮询功能，通过subscribe订阅轮询结果。
 * 2. 提供start, stop, remove控制轮询
 * > see: https://github.com/emmaguo/angular-poller/blob/master/angular-poller.js
 */
export class Poller{
  constructor(opt){
    this.$option_ = Object.assign({
      delay: 5000,
      smart: false,
      action: null,
      catchError: null
    }, opt);
    if(!this.$option_.delay){
      this.$option_.delay = 5000;
    }
    this.$current_ = null;
    this.$interval_ = null;
    this.$stopTimestamp_ = null;
    this.$watchers_ = [];
  }

  then(success, error){
    const watcher = (err, res) => {
      if(err){
        error && error(err);
      }else{
        success && success(res);
      }
    }
    this.$watchers_.push(watcher);
  }

  subscribe(watcher){
    this.$watchers_.push(watcher);
    this.start();
  }

  unsubscribe(){
    this.$watchers_ = [];
  }

  tick(){
    const timestamp = new Date();
    this.$current_ = this.$option_.action();
    this.$current_.then(res => {
      this.$current_.$resolved = true;
      if(!this.$stopTimestamp_ || timestamp >= this.$stopTimestamp_){
        this.$watchers_.forEach(watcher => {
          watcher(null, res);
        });
      }
    }, (err) => {
      if(!this.$stopTimestamp_ || timestamp >= this.$stopTimestamp_){
        this.$watchers_.forEach(watcher => {
          watcher(err);
        });
        if(this.$option_.catchError){
          this.$option_.catchError(err);
        }
      }
    });
  }

  start(){
    if(!this.$watchers_.length) return;
    this.stop();
    this.$stopTimestamp_ = null;
    this.tick();
    this.$interval_ = setInterval(() => {
      if(!this.$option_.smart || !this.$current_ || this.$current_.$resolved){
        this.tick();
      }
    }, this.$option_.delay);
  }
  
  stop(){
    clearInterval(this.$interval_);
    this.$stopTimestamp_ = new Date();
  }

  remove(){
    this.stop();
    this.unsubscribe();
  }
}
