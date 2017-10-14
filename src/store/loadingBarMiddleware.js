/**
 * ### hack原有的loadingbar中间件
 * 目的是支持action.suppressGlobalProgress来决定是否忽略不走loadingbar
 */
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const defaultTypeSuffixes = ['PENDING', 'FULFILLED', 'REJECTED']

export function loadingBarMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes

  return ({ dispatch }) => next => action => {
    // #! 添加suppressGlobalProgress忽略进度条
    if (action.type && !action.suppressGlobalProgress) {
      const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes

      const isPending = new RegExp(`${PENDING}$`, 'g')
      const isFulfilled = new RegExp(`${FULFILLED}$`, 'g')
      const isRejected = new RegExp(`${REJECTED}$`, 'g')

      if (action.type.match(isPending)) {
        dispatch(showLoading())
      } else if (action.type.match(isFulfilled) ||
                 action.type.match(isRejected)) {
        dispatch(hideLoading())
      }
    }

    return next(action)
  }
}
