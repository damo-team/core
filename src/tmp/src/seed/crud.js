import propTypes from 'prop-types';
import logMessages from '../logMessages';

function merge(o, t, attrs) {
  if (Object(o) === o && Object(t) === t) {
    o = o.asMutable
      ? o.asMutable()
      : o;
    if (attrs) {
      attrs.forEach(attr => o[attr] = t[attr]);
      return o;
    } else {
      return Object.assign(o, t);
    }
  } else {
    return t;
  }
}

const queryShape = {
  data: propTypes.array.isRequired,
  total: propTypes.number.isRequired,
  pageSize: propTypes.number
}

export default class Crud {
  start(name) {
    return (nextState, payload) => {
      return payload.initialState[name];
    }
  }

  /**
  * ### 变更方式为新增时，data必须为对象
  *
  * ```
  *  // 当前model值为
  *  mutableState = {
  *    list: [{id: 1, value: 10}, {id: 2, value: 12}]
  *  }
  *  // 场景一：未指定cid
  *  payload = {
  *    changes: [
  *      {type: 'create', name: 'list', data: {id: 2, value: 13}}
  *    ]
  *  }
  *  // 变更结果为, 添加在数组头部
  *  nextState = {
  *    list: [{id: 2, value: 13}, {id: 1, value: 10}, {id: 2, value: 12}]
  *  }
  *  // 场景2： 指定了cid
  *  payload = {
  *    cid: 'id',
  *    changes: [
  *      {type: 'create', name: 'list', data: {id: 2, value: 13}}
  *    ]
  *  }
  *  // 变更结果为, 此时如果找到相同cid的值的数据项时抛警告，并做更新
  *  nextState = {
  *    list: [{id: 1, value: 10}, {id: 2, value: 13}]
  *  }
  *  // 场景3，原先数据不为数组时，则为替换
  * ```
  * > 变更和新增行为一致
  */
  append(name, forceUpdate) {
    return {
      name: name,
      start: applyStart(name),
      success: (nextState, payload) => {
        const {data, cid, arguments} = payload;
        const prevState = nextState;
        const byQuery = Array.isArray(nextState.data) && nextState.total !== undefined;
        let increment = 0;
        if (byQuery) {
          nextState = nextState.data;
        }
        if (Array.isArray(nextState)) {
          if (!Array.isArray(data)) {
            data = [data];
          }
          if (cid) {
            if (data[0][cid] === undefined) {
              warning(false, logMessages.validCid);
              nextState = data.concat(nextState);
              increment = data.length;
            } else {
              const recordMap = {};
              const recordArr = [];
              data.forEach((item, index) => {
                recordMap[item[cid]] = {
                  pos: index,
                  record: item,
                  absent: true
                };
                recordArr.push(recordMap[item[cid]]);
              });

              nextState = nextState.map(item => {
                if (recordMap[item[cid]] === undefined) {
                  warning(!forceUpdate !== undefined, logMessages.forceAdd);
                  return item;
                } else {
                  warning(forceUpdate !== undefined, logMessages.forceUpdate);
                  recordMap[item[cid]].absent = false;
                  return merge(item, recordMap[item[cid]].record, change.attrs);
                }
              });
            }

            const residueArr = recordArr.filter(item => item.absent);
            if (residueArr.length) {
              warning(forceUpdate !== undefined, logMessages.forceUpdate);
              residueArr.forEach(item => {
                nextState.unshift(item.record);
              });
              increment = residueArr.length;
            }
          } else {
            warning(forceUpdate !== undefined, logMessages.noCid);
            nextState = data.concat(nextState);
            increment = data.length;
          }
          // 符合Query的存储格式
          if (byQuery) {
            prevState.total = prevState.total + increment;
            if (prevState.pageSize) {
              prevState.data = nextState
                .data
                .slice(0, prevState.pageSize);
            }
            nextState = prevState;
          }
        } else {
          if (Array.isArray(data)) {
            warning(false, logMessages.changeType);
            nextState = data;
          } else {
            if (cid) {
              if (nextState[cid] == data[cid]) {
                warning(!forceUpdate !== undefined, logMessages.forceAdd);
                nextState = merge(nextState, data, change.attrs);
              } else {
                warning(forceUpdate !== undefined, logMessages.forceUpdate);
                nextState = data;
              }
            } else {
              warning(forceUpdate !== undefined, logMessages.noCid);
              if (forceUpdate) {
                nextState = merge(nextState, data, change.attrs);
              } else {
                nextState = data;
              }
            }
          }
        }
        return nextState;
      }
    }
  }

  create(name) {
    return this.append(name, false);
  }

  update(name) {
    return this.append(name, true);
  }

  delete(name) {
    return {
      name: name,
      success: (nextState, payload) => {
        if (payload.cid) {
          let cid = payload.cid;
          let value;
          let noMatch = true;
          if (payload.data) {
            if (payload.data[cid]) {
              value = payload.data[cid];
            } else if (payload.arguments[0] && payload.arguments[0][cid]) {
              value = payload.arguments[0][cid];
            }
          }
          if (value) {
            if (Array.isArray(nextState)) {
              const idx = nextState.findIndex(item => item[cid] === value);
              if (idx > -1) {
                nextState.splice(idx, 1);
                noMatch = false;
              }
            } else if (nextState[cid] == value) {
              nextState = payload.initialState[name];
              noMatch = false;
            }
            if (noMatch) {
              warning(false, logMessages.noMatch);
            }
          } else {
            warning(false, logMessages.validCid);
          }
        } else {
          warning(false, logMessagess.noCid);
        }
      }
    }
  }

  query(name) {
    return {
      name: name,
      start: this.start(name),
      success: (nextState, payload) => {
        if (this.option_.processData) {
          nextState = this
            .option_
            .processData(payload.data);
        } else {
          nextState = payload.data;
        }
        propTypes.checkPropTypes(queryShape, nextState);
        return nextState;
      }
    }
  }
}
