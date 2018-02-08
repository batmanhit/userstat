
const params = {
  id: 1,
};

const payload = {
  jobs: 10,
  records: 20,
};

const rows = [{
  id: 1,
  request: { ...params, ...payload },
  response: {},
  status: 'queued',
  stats: {},
  created: new Date(),
}];

module.exports = { rows, params, payload };
