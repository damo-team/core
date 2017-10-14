export const resourceCRUD = {
  QUERY: (name, action, initialState) => {
    return [
      {
        name: name,
        start: () => {
          return initialState[name]
        },
        success: (data) => {
          return data.data;
        }
      }
    ]
  },

  QUERY_METRIC: (name, action, initialState) => {
    return [
      {
        name: name,
        start: () => {
          return initialState[name];
        },
        success: (data, origin) => {
          return {loading: false, total: data.total};
        }
      }
    ]
  },

  PURE: (name, action, initialState) => {
    let propType = typeof initialState[name];
    if (propType === 'object' && Array.isArray(initialState[name])) {
      propType = 'array';
    } else {
      propType = propType || 'object';
    }
    return [
      {
        name: name,
        start: () => {
          return initialState[name]
        },
        success: (data) => {
          return data;
        }
      }
    ]
  },

  PASS: (name, action, initialState) => {
    return [
      {
        name: name,
        success: (data) => {
          return data;
        }
      }
    ]
  },

  GET: (name, action, initialState) => {
    return [
      {
        name: name,
        start: () => {
          return initialState[name];
        },
        success: (data) => {
          return data;
        }
      }
    ]
  },

  // #! {cid, params}
  ADD: (name, action, initialState) => {
    if (Array.isArray(initialState[name])) {
      return [
        {
          name: name,
          success: (data, origin, params) => {
            if (Object(data) !== data && data !== false) {
              data = params;
            }
            origin = origin.asMutable();

            origin.unshift(data);
            if (action.limit && action.limit < origin.length) {
              origin.pop();
            }
            return origin;
          }
        }
      ]
    } else {
      return [
        {
          name: name,
          success: (data, origin, params) => {
            if (Object(data) !== data && data !== false) {
              data = params;
            }
            return data;
          }
        }
      ]
    }
  },

  ADD_METRIC: (name, action, initialState) => {
    return [
      {
        name: name,
        success: (data, origin, params) => {
          if (Object(data) !== data && data !== false) {
            data = params;
          }
          return origin.set('total', origin.total + 1);
        }
      }
    ]
  },

  // #! {cid, params}
  UPDATE: (name, action, initialState) => {
    if (Array.isArray(initialState[name])) {
      return [
        {
          name: name,
          success: (data, origin, params) => {
            if (Object(data) !== data && data !== false) {
              data = params;
            }
            if (!Array.isArray(data)) {
              data = [data];
            }
            data.forEach(d => {
              const idx = origin.findIndex(item => item[action.cid] === d[action.cid]);
              if (idx > -1) {
                if (action.attributes) {
                  let newD = {};
                  action
                    .attributes
                    .forEach(attr => newD[attr] = d[attr]);
                  d = newD;
                }
                const item = origin[idx].merge(d)
                origin = origin.set(idx, item);
              }
            });

            return origin;
          }
        }
      ]
    } else {
      return [
        {
          name: name,
          success: (data, origin, params, state) => {
            if (Object(data) !== data && data !== false) {
              data = params;
            }
            if (origin[action.cid] === data[action.cid]) {
              origin = origin.merge(data);
            }

            return origin;
          }
        }
      ]
    }
  },

  // #! {cid, params}
  DELETE: (name, action, initialState) => {
    if (Array.isArray(initialState[name])) {
      return [
        {
          name: name,
          success: (data, origin, params, state) => {
            if (Object(data) !== data && data !== false) {
              data = params;
            }
            const idx = origin.findIndex(item => item[action.cid] === data[action.cid]);
            if (idx > -1) {
              origin = origin.asMutable();
              origin.splice(idx, 1);
            }

            return origin;
          }
        }
      ]
    } else {
      return [
        {
          name: name,
          success: (data, origin, params, state) => {
            if (Object(data) !== data && data !== false) {
              data = params;
            }
            if (origin[action.cid] === data[action.cid]) {
              origin = initialState[name];
            }

            return origin;
          }
        }
      ]
    }
  },

  DELETE_METRIC: (name, action, initialState) => {
    return [
      {
        name: name,
        success: (data, origin, params, state) => {
          if (Object(data) !== data && data !== false) {
            data = params;
          }
          if (origin.total > 0) {
            origin = origin.set('total', origin.total - 1);
          }

          return origin;
        }
      }
    ]
  },

  // #! {cid, joinName}
  JOIN: (name, action, initialState) => {
    const joinName = action.joinName;
    if (Array.isArray(initialState[joinName])) {
      return [
        {
          success: (data, origin, params, state) => {
            const idx = state[joinName].find(item => item[action.cid] === params[action.cid]);
            if (idx > -1) {
              let item = state[joinName][idx].set(name, data);
              let list = state[joinName].set(idx, item);
              state = state.set(joinName, list);
            }
            return state;
          }
        }
      ]
    } else {
      return [
        {
          success: (data, origin, params, state) => {
            if (state[joinName][action.cid] === params[action.cid]) {
              let item = state[joinName].set(name, data);
              state = state.set(joinName, item);
            }
            return state;
          }
        }
      ]
    }
  }
}
