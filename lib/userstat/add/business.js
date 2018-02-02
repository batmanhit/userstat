module.exports = ({ api }) => {

  // promise handlers
  const add = body => api.create({
    created: new Date(),
    user_id: body.userID,
    jobs: body.jobs,
    records: body.records,
  })
  .then(result => result.rows);

  // api
  return payload =>
    add(payload);
};
