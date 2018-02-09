const { apig } = require('utils')();

const handler = (event, context, cb) =>
  cb(null, apig.preflight({ origin:
    event.headers.Origin || event.headers.origin,
    credentials: 'true',
    headers: 'Content-Type,private-token,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  }));

module.exports = {
  handler,
};
