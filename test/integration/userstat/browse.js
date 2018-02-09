// dependencies
const { test } = require('tap');
const path = require('path');
const merge = require('deepmerge');
// const { apig, deepSort } = require('utils')();

// constants
const { BEARER_TOKEN } = process.env;
const __ = module => path.resolve(__dirname, './../../../', module);
const createEvent = params => ({
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
  queryStringParameters: params,
});

// fixtures
const { params } = require(__('test/fixture/browse.js'));
// 200 Valid request
const eventOk = createEvent(params);
// 400 Invalid request body
const eventInvalid = createEvent({ id: 'Invalid ID', from: '209' });
// 401 Invalid bearer token value
const eventUnauthorised = merge(createEvent(params), {
  headers: { Authorization: 'Bearer: InvalidTokenValue' },
});

// module
const { handler } = require(__('lib/userstat/browse'));

// tests
test('valid request', t => {
  handler(eventOk, {}, (err, { statusCode, body }) => {
    const { msg } = JSON.parse(body);
    t.strictSame(statusCode, 200);
    t.strictSame(msg, 'OK');
    t.end();
  });
});

test('invalid request', t => {
  handler(eventInvalid, {}, (err, { statusCode }) => {
    t.strictSame(statusCode, 400);
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
