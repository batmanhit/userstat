// dependencies
const { test } = require('tap');
const path = require('path');

// constants
const __ = module => path.resolve(__dirname, './../../../../', module);

// fixtures
const { rows, payload } = require(__('test/fixture/add.js'));

// module
const add = require(__('lib/userstat/add/business'))({
  api: { add: () => Promise.resolve({ rows }) },
});

// tests
test('returns promise', t => {
  const isPromise = add(payload);
  t.strictSame(typeof isPromise.then, 'function');
  t.end();
});

test('resolves a userstat object', t =>
  add(payload).then(userstat => {
    t.strictSame(userstat, rows[0]);
    t.end();
  }));
