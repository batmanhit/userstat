module.exports = ({ api }) => {

  // promise handlers
  const browse = body => {
    // NOTE: using a different schema where created is an INT field
    console.log('body: ', body.id);
    return api.read({ userId: body.id })
    .then(result => result.rows);
  };

  // api
  return (payload, userId) =>
    browse(payload, userId);
};
