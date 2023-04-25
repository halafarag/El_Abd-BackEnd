async function pagination(req, res, next) {
  const page = req.query.page || 1;
  req.page = page;
  const limit = 4;
  const skip = 0;
  if (page > 1) {
    req.skip = (page - 1) * req.limit;
  }
  next();
}
module.exports = { pagination };
