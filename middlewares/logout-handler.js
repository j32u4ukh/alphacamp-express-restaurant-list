module.exports = (req, res, next) => {
  res.locals.logined = req.isAuthenticated();
  return next();
};
