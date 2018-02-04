
module.exports = ({ api }) => {

  // promise handlers
  const browse = body => api.read({ where: { userId: body.id } })
    .catch(err => console.log(err))
    .then(result => result.rows);

  // api
  return (payload, userId) =>
    browse(payload, userId);
};
