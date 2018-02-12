module.exports = ({ browse, log, auth, validate, reply, replyError, replyNotFound }) =>
  (event, context, cb) => {
    log('request', event);

    return auth({ event }) // default is simple Bearer Token
      .then(validate('/~1/get/parameters'))
      .then(() => browse(event.queryStringParameters)
        .then(result => {
          if (result && result.length > 0) {
            return cb(null, reply({
              body: { msg: 'OK', data: result },
            }));
          }
          return cb(null, replyNotFound({
            msg: 'Userstats Not Found Today',
          }));
        })
        .catch(err => cb(null, replyError({ event, err })))
      )
      .catch(result => cb(null, result));
  };
