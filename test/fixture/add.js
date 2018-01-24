const payload = {
  bah: 'integration test payload',
};

const rows = [{
  id: 1,
  request: { payload },
  response: {},
  status: 'queued',
  stats: {},
  created: 1505715387,
}];

module.exports = { rows, payload };
