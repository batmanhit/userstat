module.exports = ({ read, log, auth, validate, reply, replyError, replyNotFound }) =>
  (event, context, cb) => {
    log('request', event);

    return auth({ event }) // default is simple Bearer Token
      .then(validate('/~1{id}/get/parameters'))
      .then(() => read(event.pathParameters.id)
        .then(result => {
          if (result) {
            return cb(null, reply({
              msg: 'Userstat Not Found Today',
            }));
          }
          return cb(null, replyNotFound({
            body: { msg: 'OK', data: result },
          }));
        })
        .catch(err => cb(null, replyError({ event, err })))
      )
      .catch(result => cb(null, result)); // auth & validate return apig.reply*
  };
