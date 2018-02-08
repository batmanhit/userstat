
const payload = {
  userID: 10,
  jobs: 15,
  records: 25,
};

const rows = [{
  id: 1,
  request: { payload },
  response: {},
  status: 'queued',
  stats: {},
  created: new Date(),
}];

module.exports = { rows, payload };
