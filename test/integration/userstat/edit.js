// dependencies
const { test } = require('tap');
const path = require('path');
const merge = require('deepmerge');
// const { apig, deepSort } = require('utils')();

// constants
const { BEARER_TOKEN } = process.env;
const __ = module => path.resolve(__dirname, './../../../', module);
const createEvent = (params, body) => ({
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
  pathParameters: params,
  body: JSON.stringify(body),
});

// fixtures
const { params, payload } = require(__('test/fixture/edit.js'));
// 200 Valid request
const eventOk = createEvent(params, payload);
// 400 Invalid request body
const eventInvalid = createEvent(params, merge(payload,
  { group1: { source: { userstat: true } } }));
// 401 Invalid bearer token value
const eventUnauthorised = merge(createEvent(params, payload), {
  headers: { Authorization: 'Bearer: InvalidTokenValue' },
});

// module
const { handler } = require(__('lib/userstat/edit'));

// tests
test('valid request', t => {
  handler(eventOk, {}, (err, { statusCode, body }) => {
    const { msg } = JSON.parse(body);
    if (statusCode === 404) {
      t.strictSame(statusCode, 404);
      t.strictSame(msg, 'None of the records updated!');
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
