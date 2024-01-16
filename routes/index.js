// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 準備引入路由模組
const restaurants = require("./restaurant");

router.use("/restaurants", restaurants);

router.get("/", (req, res) => {
  res.redirect("/restaurants");
});

// 匯出路由器
module.exports = router;
