
const moment = require('moment');

module.exports = ({ api }) => {

  // promise handlers
  const browse = body => {

    const query = { userId: body.id };
    // See if the from & to parameters exist or not
    let from;
    let to;
    if (body.from && body.to) {
      from = moment([body.from.substring(0, 4), body.from.substring(4, 6), body.from.substring(6, 8)]);
      to = moment([body.to.substring(0, 4), body.to.substring(4, 6), body.to.substring(6, 8)]);
    } else if (body.month && body.year) {  // See if month & year parameters exist or not
      from = moment([body.year, body.month, 1]);
      to = from.month(1);
    } else {
      throw new Error('From and To dates are inValid');
    }

    if (from.isValid() && to.isValid()) {
      query.created = { $gte: from.format(), $lt: to.format() };
    } else {
      throw new Error('From and To dates are inValid');
    }

    return api.read({ where: query })
    .then(result => result.rows);
  };

  // api
  return (payload, userId) =>
    browse(payload, userId);
};
