
const moment = require('moment');

module.exports = ({ api }) => {

  // promise handlers
  const read = userId => api.read({
    where: {
      userId,
      created: {
        $gte: moment().startOf('day').format(),
        $lte: moment().endOf('day').format(),
      },
    },
  })
    .then(result => result.rows[0]);

  // api
  return (userId) =>
    read(userId);
};
