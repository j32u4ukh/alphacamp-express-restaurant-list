const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/data/restaurant.json").results;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  res.render("index", { restaurants: restaurants, keyword: "" });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  let results;
  if (keyword === "") {
    results = restaurants;
  } else {
    const key = keyword.toLowerCase();
    results = results.filter((result) =>
      Object.values(result).some((r) => {
        if (typeof r === "string") {
          return r.toLowerCase().includes(key);
        }
        return false;
      })
    );
  }
  res.render("index", { restaurants: results, keyword: keyword });
});

app.get("/restaurant/:id", (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurants.find((m) => m.id === id);
  res.render("show", { restaurant });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
