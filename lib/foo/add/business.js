module.exports = ({ api }) => {

  // promise handlers
  const persistFoo = body => {
    // NOTE: using a different schema where created is an INT field
    const created = Math.floor(Date.now() / 1000);
    return api.add({
      values: { user_id: 999999, response: { body }, created },
      returning: ['*'],
    })
    .then(result => result.rows[0]);
  };

  // api
  return (payload, userId) =>
    persistFoo(payload, userId);
};
