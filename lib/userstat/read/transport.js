module.exports = ({ read, log, auth, validate, reply, replyError, replyNotFound }) =>
  (event, context, cb) => {
    log('request', event);

    return auth({ event }) // default is simple Bearer Token
      .then(validate('/~1{id}/get/parameters'))
      .then(() => read(event.pathParameters.id)
        .then(result => {
          console.log('result', result);
          if (result) {
            return cb(null, reply({
              body: { msg: 'OK', data: result },
            }));
          }

          return cb(null, replyNotFound({
            msg: 'Userstat Not Found Today',
          }));
        })
        .catch(err => cb(null, replyError({ event, err })))
      )
      .catch(result => cb(null, result)); // auth & validate return apig.reply*
  };
