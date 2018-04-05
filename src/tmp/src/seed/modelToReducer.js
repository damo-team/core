import immutable from 'seamless-immutable';

export default function modelToReducer(model, initialState) {
  const stateShape = {};
  const typesMap = {
    number: 'number',
    boolean: 'bool',
    function: 'func',
    object: 'object',
    array: 'array',
    undefined: 'any'
  }
  for(let key in initialState){
    stateShape[key] = propTypes[typesMap[typeof(initialState[key])]].isRequired;
  }

  return function reducer(state = initialState, payload) {
    /**
     * ### reducer执行逻辑
     * 
     * 1. 必须是在model实例中有过定义的type才会执行
     * 2. payload中存在getState，则返回值作为新的state，采用之前先判断结构是否符合
     * 3. payload中存在state，则直接采用，采用之前先判断结构是否符合
     * 4. payload中存在changes，则遍历change，判断每个change的name是否符合结构
     *  * change存在callback，则直接调用接收返回值
     *  * change存在status，则直接调用change[state]的返回值，没有则是无效status
     *  * 返回值不存在时，则采用自身可变值，否则采用返回值。
     * 5. 给model更新state值
     */
    let nextState = state;
    if (model._defineActionTypes[payload.type]) {
      if(typeof payload.getState === 'function'){
        nextState = payload.getState(state);
        propTypes.checkPropTypes(stateShape, nextState, 'payload.type', 'Damo');
      }else if (payload.state) {
        nextState = payload.state;
        propTypes.checkPropTypes(stateShape, nextState, 'payload.type', 'Damo');
      } else if(payload.changes){
        payload.changes.forEach(change => {
          if(!stateShape[change.name]){
            warning(false, logMessages.valideName);
          }else{
            const prevState = state[change.name] && change.deserialize ? state[change.name].asMutable({deep: change.deep}) : state[change.name];
            if (change.callback) {
              nextState = change.callback(prevState, payload);
            } else if (status) {
              if(change[status]){
                nextState = change[status](prevState, payload);
              }else{
                warning(false, logMessages.valideStatus);
              }
            }
            if(nextState === undefined){
              nextState = state.set(change.name, prevState);
            }else{
              nextState = state.set(change.name, nextState);
            }
          }
        });
      }
      return model.state = immutable(nextState);
    } else {
      return state;
    }
  }
}
