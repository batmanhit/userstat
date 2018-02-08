
const params = {
  id: 1,
};

const rows = [{
  id: 1,
  request: { params },
  response: {},
  status: 'queued',
  stats: {},
  created: new Date(),
}];

module.exports = { rows, params };
