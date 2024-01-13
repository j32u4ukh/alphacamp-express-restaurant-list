const express = require("express");
const { engine } = require("express-handlebars");
const db = require("./models");
const { Op } = require("sequelize");
const methodOverride = require("method-override");

const app = express();
const port = 3000;
const Restaurant = db.restaurant;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

// 需要使用 express.urlencoded 來從請求網址中獲取表單資料，否則就會回傳 undefined
app.use(express.urlencoded({ extended: true }));

// 「覆寫 (override)」HTTP 方法，允許表單傳送 GET 和 POST 以外的方法
app.use(methodOverride("_method"));

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

app.get("/restaurants/add", (req, res) => {
  res.render("add");
});

app.post("/restaurants/add", (req, res) => {
  const BODY = req.body;

  if (typeof BODY.name === "undefined" || BODY.name === "") {
    return res.status(400).send("Invalid or missing 'name' field.");
  }

  return Restaurant.create({
    name: BODY.name,
    name_en: BODY.name_en,
    category: BODY.category,
    image: BODY.image,
    location: BODY.location,
    phone: BODY.phone,
    google_map: BODY.google_map,
    rating: Number(BODY.rating),
    description: BODY.description,
  })
    .then(() => {
      res.redirect("/restaurants");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/restaurants/:id/edit", (req, res) => {
  return Restaurant.findByPk(Number(req.params.id), {
    raw: true,
  })
    .then((restaurant) => {
      res.render("edit", { restaurant });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.put("/restaurants/:id/edit", (req, res) => {
  const BODY = req.body;
  const id = req.params.id;

  if (typeof BODY.name === "undefined" || BODY.name === "") {
    return res.status(400).send("Invalid or missing 'name' field");
  }

  return Restaurant.update(
    {
      name: BODY.name,
      name_en: BODY.name_en,
      category: BODY.category,
      image: BODY.image,
      location: BODY.location,
      phone: BODY.phone,
      google_map: BODY.google_map,
      rating: Number(BODY.rating),
      description: BODY.description,
    },
    { where: { id } }
  )
    .then(() => {
      res.redirect("/restaurants");
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

app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.destroy({ where: { id } }).then(() => {
    res.redirect("/restaurants");
  });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
