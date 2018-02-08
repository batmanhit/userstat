// dependencies
const { test } = require('tap');
const path = require('path');

// constants
const __ = module => path.resolve(__dirname, './../../../../', module);

// fixtures
const { rows, params } = require(__('test/fixture/read.js'));

// module
const read = require(__('lib/userstat/read/business'))({
  api: { read: () => Promise.resolve({ rows }) },
});

// tests
test('returns promise', t => {
  const isPromise = read(params);
  t.strictSame(typeof isPromise.then, 'function');
  t.end();
});

test('resolves a userstat object', t =>
  read(params)
    .then(userstats => {
      t.strictSame(userstats, rows[0]);
      t.end();
    })
);
