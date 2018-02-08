// dependencies
const { test } = require('tap');
const path = require('path');

// constants
const __ = module => path.resolve(__dirname, './../../../../', module);

// fixtures
const { rows, params } = require(__('test/fixture/browse.js'));

// module
const browse = require(__('lib/userstat/browse/business'))({
  api: { read: () => Promise.resolve({ rows }) },
});

// tests
test('returns promise', t => {
  const isPromise = browse(params);
  t.strictSame(typeof isPromise.then, 'function');
  t.end();
});

test('resolves a userstat object', t =>
  browse(params).then(userstats => {
    t.strictSame(userstats, rows);
    t.end();
  }));
