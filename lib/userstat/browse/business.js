
const extractDate = dateString => {
  try {
    return new Date(dateString.substring(0, 4), dateString.substring(4, 6), dateString.substring(6, 8));
  } catch (err) {
    return false;
  }
};

module.exports = ({ api }) => {

  // promise handlers
  const browse = body => {
    const query = { userId: body.id };
    // See if the from & to parameters exist or not
    if (body.from && body.to) {
      const fromDate = extractDate(body.from);
      const toDate = extractDate(body.to);
      if (fromDate && toDate) {
        query.created = { $gte: fromDate, $lte: toDate };
      }
    } else if (body.month && body.year) {  // See if month & year parameters exist or not
      const fromDate = new Date(`${body.year}/${body.month}/1`);
      const toDate = new Date(`${body.year}/${parseInt(body.month, 10) + 1}/1`);
      if (fromDate && toDate) {
        query.created = { $gte: fromDate, $lt: toDate };
      }
    }
    return api.read({ where: query })
    .catch(err => console.log(err))
    .then(result => result.rows);
  };

  // api
  return (payload, userId) =>
    browse(payload, userId);
};
