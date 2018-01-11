const payload = {
  group1: {
    input: {
      source: 's3',
      filename: 'compare-comparer/email-200.txt',
      config: {
        bucket: 'optizmo-integration-sandbox',
        accessKeyId: 'AKIAIPKYVRIVZ3AOJXGA',
        secretAccessKey: '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',
      },
      overwrite: true,
    },
    output: {
      source: 's3',
      filename: 'compare-comparer/split.zip',
      config: {
        bucket: 'optizmo-integration-sandbox',
        accessKeyId: 'AKIAIPKYVRIVZ3AOJXGA',
        secretAccessKey: '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',
      },
      overwrite: true,
    },
  },
  group2: {
    input: {
      source: 's3',
      filename: 'compare-comparer/email-100.txt',
      config: {
        bucket: 'optizmo-integration-sandbox',
        accessKeyId: 'AKIAIPKYVRIVZ3AOJXGA',
        secretAccessKey: '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',
      },
      overwrite: true,
    },
  },
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
