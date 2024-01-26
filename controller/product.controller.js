const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  const productArray = await Product.findAll();
  console.log(productArray);
  res.render("../views/product/allProducts.ejs", {
    page: { title: "All Products", nav: "products" },
    productArray: productArray,
  });
}

async function getProductDetails(req, res, next) {
  const _id = req.params._id;
  console.log("Hierrrr,", _id);
  let exsitingProduct;
  try {
    exsitingProduct = await Product.findProductById(_id);
  } catch (err) {
    next(err);
  }

  res.render("../views/product/product-details.ejs", {
    page: { title: "All Products", nav: "getProducts" },
    product: exsitingProduct,
  });
}

module.exports = {
  getProducts: getProducts,
  getProductDetails: getProductDetails,
};
