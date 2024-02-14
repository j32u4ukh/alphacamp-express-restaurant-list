// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// 引入路由模組
const restaurants = require("./restaurant");
const users = require("./users");
const authHandler = require("../middlewares/auth-handler");

router.use("/restaurants", authHandler, restaurants);
router.use("/users", users);

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/restaurants");
  } else {
    return res.redirect("/login");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/restaurants",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/oauth2/redirect/facebook",
  passport.authenticate("facebook", {
    successRedirect: "/restaurants",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.post("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error);
    }

    return res.redirect("/login");
  });
});

// 匯出路由器
module.exports = router;
