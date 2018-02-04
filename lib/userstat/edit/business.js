
module.exports = ({ api }) => {

  // promise handlers
  const edit = (payload, userId) => api.edit({
    where: { userId },
    updates: payload,
    returning: ['*'],
  })
  .then(result => result.rows);

  // api
  return (payload, userId) =>
    edit(payload, userId);
};
