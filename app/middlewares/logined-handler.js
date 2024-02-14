module.exports = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  res.locals.logined = isAuthenticated;
  if (isAuthenticated) {
    res.locals.user_email = req.user.email;
  }
  return next();
};
