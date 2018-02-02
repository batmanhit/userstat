const { handler } = require('./shell');

module.exports = {
  handler: (event, context, cb) => handler()(event, context, cb),
};
