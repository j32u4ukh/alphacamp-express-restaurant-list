const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const Restaurant = db.restaurant;

function sortByName(a, b) {
  const nameA = a.name;
  const nameB = b.name;
  return nameA.localeCompare(nameB);
}

router.get("/", (req, res) => {
  return Restaurant.findAll({
    raw: true,
  })
    .then((restaurants) => {
      restaurants = Array.from(restaurants).sort(sortByName);
      res.render("index", { restaurants: restaurants, keyword: "" });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res, next) => {
  const BODY = req.body;

  if (typeof BODY.name === "undefined" || BODY.name === "") {
    next({
      redirect: "http://localhost:3000/restaurants",
      errorMessage: "Invalid or missing 'name' field.",
    });
    return;
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
      error.redirect = "http://localhost:3000/restaurants";
      error.errorMessage = "新增餐廳數據時發生錯誤";
      next(error);
      return;
    });
});

router.get("/:id/edit", (req, res) => {
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

router.put("/:id/edit", (req, res, next) => {
  const BODY = req.body;
  const id = req.params.id;

  if (typeof BODY.name === "undefined" || BODY.name === "") {
    next({
      redirect: "http://localhost:3000/restaurants",
      errorMessage: "Invalid or missing 'name' field.",
    });
    return;
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
      req.flash("success", "更新成功!");
      res.redirect("/restaurants");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/search", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.destroy({ where: { id } }).then(() => {
    res.redirect("/restaurants");
  });
});

module.exports = router;
