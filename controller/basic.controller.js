const Product = require("../models/product.model");

function getHomepage(req, res, next) {
  res.redirect("/products");
}

function get500(req, res, next) {
  res.render("../views/base/500.ejs", {
    page: { title: "Server Error", nav: "get500" },
  });
}

module.exports = {
  getHomepage: getHomepage,
  get500: get500,
};
