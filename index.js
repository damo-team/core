if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/core/damoCore');
} else {
  module.exports = require('./src/index');
}
