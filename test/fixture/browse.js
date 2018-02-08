
const params = {
  created: new Date(),
  from: '20171009',
  to: '20180208',
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
