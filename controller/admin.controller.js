const Product = require("../models/product.model");
const { validationResult } = require("express-validator");
const authentification = require("../util/authentication");
const { routPath, viewPath } = require("../util/projektPath");
const Order = require("../models/order.model");

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */

async function getProducts(req, res, next) {
  try {
    const productArray = await Product.findAll();

    res.render("../" + viewPath.admin.productManagement, {
      page: { title: "Product-Management", nav: "productManagement" },
      productArray,
    });
  } catch (err) {
    next(err);
  }
}

function getCreateProducts(req, res, next) {
  res.render("../" + viewPath.admin.createProduct, {
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

  res.render("../" + viewPath.admin.editProduct, {
    page: { title: "Edit Product", nav: "getEditProduct" },
    product,
  });
}

async function getOrders(req, res, next) {
  const orders = await Order.findAll();
  console.log("Hier kommen die Orders:", orders);
  res.render("../" + viewPath.admin.managementOrders, {
    page: { title: "View Orders", nav: "getOrders", orders: orders },
  });
}

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */

async function postCreateProducts(req, res, next) {
  // Validierung von Titel, Summary, Discription und Price
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    authentification.messageToSession(req, errors.array());
    return res.redirect(routPath.admin.post.createProduct);
  }

  // Validierung das ein Bild hochgeladen wurde
  if (!req.file) {
    authentification.messageToSession(req, null, "Produktbild fehlt!");
    return res.redirect(routPath.admin.post.createProduct);
  }

  // Validierung ob valide sale angeben
  if (!["true", "false"].includes(req.body.sale)) {
    authentification.messageToSession(req, null, "invalide Salesdaten");
    return res.redirect(routPath.admin.post.createProduct);
  }

  // Validierung Ob zur aktivierug von sale auch ein discount ausgewählt wurde
  if (
    req.body.sale === "true" &&
    !["keinRabatt", "5", "10", "15", "20", "25", "50"].includes(
      req.body.discount
    )
  ) {
    authentification.messageToSession(req, null, "Invaldie Discountdaten");
    return res.redirect(routPath.admin.post.createProduct);
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

  res.redirect(routPath.admin.get.productManagement);
}

async function postEditProduct(req, res, next) {
  const _id = req.params._id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    authentification.messageToSession(req, errors.array());
    return res.redirect(routPath.admin.post.editProduct.replace(":_id", _id));
  }

  // Validierung ob valide sale angeben
  if (!["true", "false"].includes(req.body.sale)) {
    authentification.messageToSession(req, null, "invalide Salesdaten");
    return res.redirect(routPath.admin.post.createProduct);
  }

  // Validierung Ob zur aktivierug von sale auch ein discount ausgewählt wurde
  if (
    req.body.sale === "true" &&
    !["keinRabatt", "5", "10", "15", "20", "25", "50"].includes(
      req.body.discount
    )
  ) {
    authentification.messageToSession(req, null, "Invaldie Discountdaten");
    return res.redirect(routPath.admin.post.createProduct);
  }

  // Unterscheidung ob ein neues Bild hochgeladen wurde
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

  console.log("vorm Updaten, Daten: ", productData);

  await Product.update(_id, productData);
  res.redirect(routPath.admin.get.productManagement);
}

async function postDeleteProducts(req, res, next) {
  if (req.session.isAdmin === true) {
    try {
      const _id = req.params._id;
      const product = new Product({ _id: _id });
      await product.delete();
      res.redirect(routPath.admin.get.productManagement);
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.redirect(routPath.admin.get.productManagement);
  }
}

/* -------------------------------------------------------------------------- */
/*                                  fetch-api                                 */
/* -------------------------------------------------------------------------- */

async function postEditOrder(req, res, next) {
  const _id = req.params._id;
  const sendStatus = req.body.sendStatus;

  try {
    const order = await Order.findOne(_id);
    await order.update(sendStatus);
  } catch (err) {
    console.log("Etwas ist schief gelaufen");
    console.log(err);
    next(err);
  }

  res.status(200).send({ message: "Order wurde als Versendet gespeichert" });
}

function getCsrf(req, res) {
  if (req.session.isAdmin) {
    res.json({ csrfToken: req.csrfToken() });
  } else {
    res.status(401).send("Nicht authentifiziert");
  }
}

async function getNewOrderNumber(req, res, next) {
  try {
    const orders = await Order.findAll();
    let index = 0;
    orders.forEach((order) => {
      if (order.status != "send") {
        index += 1;
      }
    });
    res.status(200).send({ index: index });
  } catch (err) {
    console.log("Etwas ist schief gelaufen");
    console.log(err);
    next(err);
  }
}

/* -------------------------------------------------------------------------- */
/*                                 Module Export                              */
/* -------------------------------------------------------------------------- */

module.exports = {
  getProducts,
  getCreateProducts,
  getEditProduct,
  getOrders,
  postCreateProducts,
  postEditProduct,
  postDeleteProducts,
  postEditOrder,
  getCsrf,
  getNewOrderNumber,
};
