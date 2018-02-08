// dependencies
const { test } = require('tap');
const path = require('path');

// constants
const __ = module => path.resolve(__dirname, './../../../../', module);

// fixtures
const { rows, params, payload } = require(__('test/fixture/edit.js'));

// module
const edit = require(__('lib/userstat/edit/business'))({
  api: { edit: () => Promise.resolve({ rows }) },
});

// tests
test('returns promise', t => {
  const isPromise = edit({ params, payload });
  t.strictSame(typeof isPromise.then, 'function');
  t.end();
});

test('resolves a userstat object', t =>
  edit(params, payload).then(userstats => {
    t.strictSame(userstats, rows);
    t.end();
  }));
