module.exports = ({ reply, swagger }) => {

  const handler = (event, context, cb) => {
    cb(null, reply({ body: swagger(require('./../../swagger.json')) }));
  };

  return {
    handler,
  };
};
