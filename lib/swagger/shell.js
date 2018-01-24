const { apig, swagger } = require('utils')();

module.exports = require('./core')({
  reply: apig.reply,
  swagger,
});
