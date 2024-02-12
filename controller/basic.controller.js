const Product = require("../models/product.model");
const { routPath, viewPath } = require("../util/projektPath");

function getHomepage(req, res, next) {
  res.render("../" + viewPath.base.home, {
    page: { title: "Home", nav: "home" },
  });
}

function get500(req, res, next) {
  res.status(500).render("../" + viewPath.base.e500, {
    page: { title: "Server Error", nav: "get500" },
  });
}

function get404(req, res) {
  res.status(404).render("../" + viewPath.base.e404, {
    page: { title: "Seite nicht gefunden", nav: "get404" },
  });
}

function get403(req, res) {
  res.status(403).render("../" + viewPath.base.e403, {
    page: { title: "Keine Zugriffsrechte, Admin", nav: "get403" },
  });
}

function get401(req, res) {
  res.status(401).render("../" + viewPath.base.e401, {
    page: { title: "Keine Zugriffsrechte, User", nav: "get401" },
  });
}

module.exports = {
  getHomepage,
  get500,
  get404,
  get403,
  get401,
};
