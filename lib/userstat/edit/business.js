
module.exports = ({ api }) => {

  // promise handlers
  const edit = body => {
    // NOTE: using a different schema where created is an INT field
    console.log('body: ', body.id);

    // body.userId = body.id;
    // body.id = undefined;

    return api.edit(body)
    .then(result => result.rows);
  };

  // api
  return (payload, userId) =>
    edit(payload, userId);
};
