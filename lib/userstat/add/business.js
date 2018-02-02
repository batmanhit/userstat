
module.exports = ({ api }) => {

  // promise handlers
  const add = body => api.add({
    values: {
      created: new Date(),
      userId: body.userID,
      jobs: body.jobs,
      records: body.records,
    },
    returning: ['*'],
  })
  .catch(err => console.log(err))
  .then(result => result.rows[0]);

  // api
  return payload =>
    add(payload);
};
