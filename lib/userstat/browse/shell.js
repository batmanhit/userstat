// dependencies
const aws = require('aws-sdk');
const debug = require('debug');

aws.config.update({ region: 'us-west-2' });

const {
    api,
    apig: { reply, replyError, replyNotFound, auth, validate },
    log,
} = require('utils')(debug);

// business layer
const browse = require('./business')({
  api: api({
    table: 'userstats',
    peegee: require('peegee'),
    db: process.env.POSTRES_URL,
  }),
});

// transport layer
const handler = () => require('./transport')({
  browse,
  auth,
  log,
  reply,
  replyError,
  replyNotFound,
  validate: validate({
    ajv: require('ajv'),
    swaggerParser: require('swagger-parser'),
    swagger: require('./../../../swagger.json'),
  }),
});

// exports
module.exports = {
  handler,
};
