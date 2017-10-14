/**
 * # 创建store
 * 详情请查看对应的文件
 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.production');
} else {
  module.exports = require('./configureStore.development');
}
