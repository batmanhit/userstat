
const extract = dateString => {
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
      const from = extract(body.from);
      const to = extract(body.to);
      if (from && to) {
        query.created = { $gte: from, $lte: to };
      }
    } else if (body.month && body.year) {  // See if month & year parameters exist or not
      const from = new Date(`${body.year}/${body.month}/1`);
      const to = new Date(`${body.year}/${parseInt(body.month, 10) + 1}/1`);
      if (from && to) {
        query.created = { $gte: from, $lt: to };
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
