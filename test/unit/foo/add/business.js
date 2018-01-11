// dependencies
const { test } = require('tap');
const path = require('path');

// constants
const __ = module => path.resolve(__dirname, './../../../../', module);

// fixtures
const { rows, payload } = require(__('test/fixture/add.js'));

// module
const add = require(__('lib/foo/add/business'))({
  api: { add: () => Promise.resolve({ rows }) },
});

// tests
test('returns promise', t => {
  const isPromise = add(payload);
  t.strictSame(typeof isPromise.then, 'function');
  t.end();
});

test('resolves a foo object', t =>
  add(payload).then(foo => {
    t.strictSame(foo, rows[0]);
    t.end();
  }));
