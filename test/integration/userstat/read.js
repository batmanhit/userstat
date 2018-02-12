// dependencies
const { test } = require('tap');
const path = require('path');
const merge = require('deepmerge');
// const { apig, deepSort } = require('utils')();

// constants
const { BEARER_TOKEN } = process.env;
const __ = module => path.resolve(__dirname, './../../../', module);
const createEvent = (params) => ({
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
  pathParameters: params,
});

// fixtures
const { params } = require(__('test/fixture/read.js'));
// 200 Valid request
const eventOk = createEvent(params);
// 400 Invalid request body
const eventInvalid = createEvent({ id: 'Invalid ID' });
// 401 Invalid bearer token value
const eventUnauthorised = merge(createEvent(params), {
  headers: { Authorization: 'Bearer: InvalidTokenValue' },
});

// module
const { handler } = require(__('lib/userstat/read'));

// tests
test('valid request', t => {
  handler(eventOk, {}, (err, { statusCode, body }) => {
    const { msg } = JSON.parse(body);
    if (statusCode === 404) {
      t.strictSame(statusCode, 404);
      t.strictSame(msg, 'Userstat Not Found Today');
      t.end();
    } else {
      t.strictSame(statusCode, 200);
      t.strictSame(msg, 'OK');
      t.end();
    }
  });
});

test('invalid request', t => {
  handler(eventInvalid, {}, (err, { statusCode, body }) => {
    const { msg } = JSON.parse(body);
    t.strictSame(statusCode, 400);
    t.strictSame(msg, 'Invalid Request');
    t.end();
  });
});

test('Unauthenticated request', t => {
  handler(eventUnauthorised, {}, (err, { statusCode, body }) => {
    const { msg } = JSON.parse(body);
    t.strictSame(statusCode, 401);
    t.strictSame(msg, 'Unauthorised');
    t.end();
  });
});
