/**
 * # Selector基类
 * 1. Selector把store数据和改变store的执行方法赋予组件，这一点和`redux.connect`的作用是等同的。
 * 2. 通过selector可以获取组件的props和context, 甚至可以拿到父级组件的selector实例
 * 3. 内部集成了rxjs，rxjs好处不多说，用过自然知道。
 * 
 * > see: https://chentsulin.github.io/redux/docs/recipes/ComputingDerivedData.html
 * > see: https://github.com/reactjs/redux/issues/1171
 */
import { EventEmitter } from 'events';

export class BaseSelector extends EventEmitter{
  static appStore = null;
  static emitter = new EventEmitter();

  constructor(){
    super();

    this.setMaxListeners(Number.MAX_VALUE);
  }

  ready(fn){
    if(this.getAppStore()){
      fn && fn();
    }else{
      BaseSelector.emitter.once('ready', fn);
    }
  }

  // 当组件初始化时，initialize会触发，用于取代componentWillMount获取初始化数据的行为。
  initialize(props, selector){
  }
  /**
   * ### Selector特性属性
   * 
   * |        属性名         |          描述          |
   * |:       ------        |         ------        |
   * | inputs: Function | 相当于connect第一个参数，不同点为this指向selector实例    |
   * | outputs: Function | 相当于connect第二个参数，不同点为this指向selector实例  |
   * | dispatch: Function | 获取store实例的dispatch方法 |
   * | parentSelector | 获取父级组件的selector实例，如果存在的话 |
   */
  get inputs(){
    return (state, ownProps) => ({})
  }

  get outputs(){
    return (dispatch, ownProps) => ({})
  }

  get dispatch(){
    return this.getAppStore().dispatch;
  }

  set parentSelector(parentSelector){
    this.$parentSelector_  = parentSelector;
  }

  get parentSelector(){
    return this.$parentSelector_;
  }

  /**
   * ### Selector方法
   * 
   * |     方法名   |          描述          |       参数        |    默认参数      |
   * |     ------  |         ------        |       ------      |        ------   |
   * | getAppStore | 获取redux的store实例    |       NA          |         NA      |
   * | getModel | 获取挂在store的指定model实例 | {name: String}  |          NA      |
   * | getService | 获取组件的context     | NA  |          NA      |
   */
  // #! abstract
  getService(name){
  }

  getAppStore(){
    return BaseSelector.appStore; 
  }

  getModel(modelName){
    if(Object(modelName) === modelName){
      modelName = modelName.displayName;
    }
    return this.getAppStore().models[modelName]; 
  }

  select(name){
    const currentState = this.getAppStore().getState();
    if(name){
      const keys = name.split('.');
      let state = currentState;
      for(let i = 0, len = keys.length; i < len; i++){
        if(!(state = state[keys[i]])){
          return state;
        }
      }
      return state;
    }else{
      return currentState;
    }
  }
  
  destroy(){
    this.removeAllListeners();
  }
}
