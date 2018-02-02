module.exports = ({ reply, swagger }) => {

  const handler = (event, context, cb) => {
    console.log("Aaa");
    cb(null, reply({ body: swagger(require('./../../swagger.json')) }));
  };

  return {
    handler,
  };
};
