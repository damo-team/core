if (process.env.RXJS) {
  module.exports = require('@ali/naza-rxrc-redux'); 
}else{
  module.exports = require('redux');
}
