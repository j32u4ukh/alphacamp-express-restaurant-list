const express = require("express");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const router = require("./routes");

const app = express();
const port = 3000;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

// 需要使用 express.urlencoded 來從請求網址中獲取表單資料，否則就會回傳 undefined
app.use(express.urlencoded({ extended: true }));

// 「覆寫 (override)」HTTP 方法，允許表單傳送 GET 和 POST 以外的方法
app.use(methodOverride("_method"));

// 路由處理
app.use(router);

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
