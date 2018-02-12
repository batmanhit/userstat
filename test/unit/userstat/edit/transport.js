// dependencies
const { test } = require('tap');
const path = require('path');

// constants
const { BEARER_TOKEN } = process.env;
const __ = module => path.resolve(__dirname, './../../../../', module);
const createEvent = (params, payload) => ({
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
  pathParameters: params,
  body: JSON.stringify(payload),
});

// fixtures
const { params, payload, rows } = require(__('test/fixture/edit.js'));
// 200 Valid request
const eventOk = createEvent(params, payload);

// stubs
const edit = () => Promise.resolve(rows);
const noop = () => {};
const log = noop;
const reply = body => Object.assign({ statusCode: 200 }, body);
const replyError = noop;
const replyNotFound = noop;
const auth = obj => Promise.resolve(obj); // { event }
const validate = () => obj => obj.data; // { event, data }

// module
const transport = () =>
  require(__('lib/userstat/edit/transport.js'))({
    edit,
    auth,
    log,
    reply,
    replyError,
    replyNotFound,
    validate,
  });

// tests
test('valid request', t => {
  transport()(eventOk, {}, (err, { statusCode, body }) => {
    const keys = ['created', 'id', 'request', 'response', 'stats', 'status'];
    t.strictSame(statusCode, 200);
    t.strictSame(body.msg, 'OK');
    t.strictSame(Object.keys(body.data[0]).sort(), keys);
    t.end();
  });
});
