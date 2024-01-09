const express = require("express");
const { engine } = require("express-handlebars");
const db = require("./models");
const { Op } = require("sequelize");

const app = express();
const port = 3000;
const Restaurant = db.restaurant;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  return Restaurant.findAll({
    raw: true,
  })
    .then((restaurants) => {
      res.render("index", { restaurants: restaurants, keyword: "" });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  return Restaurant.findAll({
    raw: true,
    where: {
      [Op.or]: {
        name: {
          [Op.like]: [`%${keyword}%`],
        },
        name_en: {
          [Op.like]: [`%${keyword}%`],
        },
        category: {
          [Op.like]: [`%${keyword}%`],
        },
        location: {
          [Op.like]: [`%${keyword}%`],
        },
        description: {
          [Op.like]: [`%${keyword}%`],
        },
      },
    },
  })
    .then((restaurants) => {
      res.render("index", { restaurants: restaurants, keyword: keyword });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/restaurants/:id", (req, res) => {
  return Restaurant.findByPk(Number(req.params.id), {
    raw: true,
  })
    .then((restaurant) => {
      res.render("show", { restaurant });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
