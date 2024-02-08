const Product = require("../models/product.model");
const { viewPath } = require("../util/projektPath");

async function getProducts(req, res, next) {
  const productArray = await Product.findAll();
  res.render("../" + viewPath.product.allProducts, {
    page: { title: "All Products", nav: "products" },
    productArray: productArray,
  });
}

async function getProductDetails(req, res, next) {
  const _id = req.params._id;
  let exsitingProduct;
  try {
    exsitingProduct = await Product.findProductById(_id);
  } catch (err) {
    next(err);
  }

  res.render("../" + viewPath.product.productDetails, {
    page: { title: "Product Details", nav: "getProductDetails" },
    product: exsitingProduct,
  });
}

module.exports = {
  getProducts,
  getProductDetails,
};
