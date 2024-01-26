const express = require("express");
const router = express.Router();

const { routPath } = require("../util/projektPath");
const productController = require("../controller/product.controller");

/* -------------------------------------------------------------------------- */
/*                                 get-routes                                 */
/* -------------------------------------------------------------------------- */

router.get(routPath.product.get.allProducts, productController.getProducts);
router.get(
  routPath.product.get.singleProduct,
  productController.getProductDetails
);

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

module.exports = {
  router: router,
};
