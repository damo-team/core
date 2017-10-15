if (process.env.RXJS) {
  module.exports = require('damo-redux'); 
}else{
  module.exports = require('redux');
}
