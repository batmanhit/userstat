// exports
module.exports = ({ api }) => {

  // promise handlers
  const persistFoo = body => {
    const payload = Object.assign({}, body, { type: 'email' });
    const created = Math.floor(Date.now() / 1000);
    return api.add({
      values: { user_id: 999999, request: { payload }, created },
      returning: ['*'],
    })
    .then(result => result.rows[0]);
  };

  // api
  return (payload, userId) => {
    return persistFoo(payload, userId);
  };
};
