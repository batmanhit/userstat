module.exports = ({ edit, log, auth, validate, reply, replyError, replyNotFound }) =>
  (event, context, cb) => {
    log('request', event);

    return auth({ event }) // default is simple Bearer Token
      .then(validate('/~1{id}/put/parameters'))
      .then(() => edit(JSON.parse(event.body), event.pathParameters.id)
        .then(result => {
          if (result && result.length > 0) {
            return cb(null, reply({
              body: { msg: 'OK', data: result },
            }));
          }

          return cb(null, replyNotFound({
            msg: 'None of the records updated!',
          }));
        })
        .catch(err => cb(null, replyError({ event, err })))
      )
      .catch(result => cb(null, result)); // auth & validate return apig.reply*
  };
