const Product = require("../models/product.model");
const { validationResult } = require("express-validator");
const authentification = require("../util/authentication");

const { viewPath } = require("../util/projektPath");

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */

async function getProducts(req, res, next) {
  try {
    const productArray = await Product.findAll();

    res.render("../views/admin/productManagement.ejs", {
      page: { title: "Product-Management", nav: "productManagement" },
      productArray,
    });
  } catch (err) {
    next(err);
  }
}

function getCreateProducts(req, res, next) {
  res.render("../views/admin/createProducts.ejs", {
    page: { title: "Create Products", nav: "getCreateProducts" },
  });
}

async function getEditProduct(req, res, next) {
  const _id = req.params._id;
  let product;
  try {
    const exsitingProduct = await Product.findProductById(_id);
    product = new Product(exsitingProduct);
  } catch (err) {
    next(err);
  }
  console.log(product);

  res.render("../views/admin/edit-product.ejs", {
    page: { title: "Edit Product", nav: "getEditProduct" },
    product,
  });
}

function getViewAdminOrders(req, res, next) {
  res.render("../views/admin/view-admin-orders.ejs", {
    page: { title: "View Orders", nav: "getViewAdminOrders" },
  });
}

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */
async function postCreateProducts(req, res, next) {
  // Prüfung 1: Valide Nutzereingaben
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    authentification.messageToSession(req, errors.array());
    return res.redirect("/admin-create-products");
  }

  if (!req.file) {
    authentification.messageToSession(req, null, "Produktbild fehlt!");
    return res.redirect("/admin-create-products");
  }

  const productParams = {
    title: req.body.title,
    summary: req.body.summary,
    discription: req.body.discription,
    price: req.body.price,
    sale: req.body.sale,
    salePrice: req.body.salePrice,
    discount: req.body.discount,
    filename: req.file.filename,
    status: req.body.status,
  };

  const newProduct = new Product(productParams);
  await newProduct.save();

  res.redirect("/getProducts");
}

async function postEditProduct(req, res, next) {
  const _id = req.params._id;
  // Prüfung 1: Valide Nutzereingaben
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    authentification.messageToSession(req, errors.array());
    return res.redirect("/admin-edit-product/_id");
  }

  let productData;
  if (req.file) {
    productData = {
      ...req.body,
      filename: req.file.filename,
    };
  } else {
    productData = {
      ...req.body,
    };
  }

  console.log(productData);
  await Product.update(_id, productData);
  res.redirect("/admin-get-products");
}

async function postDeleteProducts(req, res, next) {
  if (req.session.isAdmin === true) {
    try {
      const _id = req.params._id;
      const product = new Product({ _id: _id });
      await product.delete();
      res.redirect("/admin-get-products");
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.redirect("/admin-get-products");
  }
}

function getCsrf(req, res) {
  if (req.session.isAdmin) {
    // Überprüfen, ob der Benutzer authentifiziert ist
    res.json({ csrfToken: req.csrfToken() }); // Senden des CSRF-Tokens
  } else {
    res.status(401).send("Nicht authentifiziert");
  }
}

module.exports = {
  getProducts: getProducts,
  getCreateProducts: getCreateProducts,
  getEditProduct: getEditProduct,
  getViewAdminOrders: getViewAdminOrders,
  postCreateProducts: postCreateProducts,
  postEditProduct: postEditProduct,
  postDeleteProducts: postDeleteProducts,
  getCsrf: getCsrf,
};
