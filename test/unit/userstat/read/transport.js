// dependencies
const { test } = require('tap');
const path = require('path');

// constants
const { BEARER_TOKEN } = process.env;
const __ = module => path.resolve(__dirname, './../../../../', module);
const createEvent = params => ({
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
  pathParameters: params,
});

// fixtures
const { params, rows } = require(__('test/fixture/read.js'));
// 200 Valid request
const eventOk = createEvent(params);

// stubs
const read = () => Promise.resolve(rows[0]);
const noop = () => {};
const log = noop;
const reply = body => Object.assign({ statusCode: 200 }, body);
const replyError = noop;
const auth = obj => Promise.resolve(obj); // { event }
const validate = () => obj => obj.data; // { event, data }

// module
const transport = () =>
  require(__('lib/userstat/read/transport.js'))({
    read,
    auth,
    log,
    reply,
    replyError,
    validate,
  });

// tests
test('valid request', t => {
  transport()(eventOk, {}, (err, { statusCode, body }) => {
    const keys = ['created', 'id', 'request', 'response', 'stats', 'status'];
    t.strictSame(statusCode, 200);
    t.strictSame(body.msg, 'OK');
    t.strictSame(Object.keys(body.data).sort(), keys);
    t.end();
  });
});
