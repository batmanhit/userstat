
module.exports = ({ api }) => {

  // promise handlers
  const read = userId => api.read({ where: { userId } })
    .then(result => result.rows[0]);

  // api
  return (userId) =>
    read(userId);
};
