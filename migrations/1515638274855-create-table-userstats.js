/* eslint no-return-assign:0 import/no-extraneous-dependencies:0 */
const table = 'userstats';
const pg = require('peegee')(process.env.POSTRES_URL);

const definition = {
  id: { type: 'serial', primaryKey: true },
  created: { type: 'date', notNull: true },
  userId: { type: 'smallint', notNull: true },
  jobs: { type: 'smallint', notNull: true },
  records: { type: 'bigint', notNull: true },
};

exports.up = next => {
  pg().then(client => client.createTable({ table, definition }))
    .then(() => next())
    .catch(console.log);
};

exports.down = next => {
  pg().then(client => client.dropTable({ table }))
    .then(() => next())
    .catch(console.log);
};
