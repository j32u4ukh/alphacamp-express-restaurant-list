module.exports = (error, req, res, next) => {
  console.error(error);
  console.log("Referer:", req.get("Referer"));
  req.flash("error", error.errorMessage || "處理失敗:(");
  if (error.redirect) {
    res.redirect(error.redirect);
  } else {
    res.redirect("back");
  }
  next(error);
};
