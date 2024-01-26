const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const multerMiddleware = require("../middleware/image-upload.js");
const { check } = require("express-validator");

const { routPath } = require("../util/projektPath");
const validator = require("../middleware/validator");

/* -------------------------------------------------------------------------- */
/*                                 get-routes                                 */
/* -------------------------------------------------------------------------- */

router.get(routPath.admin.get.productManagement, adminController.getProducts);
router.get(routPath.admin.get.createProduct, adminController.getCreateProducts);
router.get(routPath.admin.get.editProduct, adminController.getEditProduct);
router.get(
  routPath.admin.get.viewAllOrders,
  adminController.getViewAdminOrders
);
router.get(routPath.admin.get.apiCsrf, adminController.getCsrf);

/* -------------------------------------------------------------------------- */
/*                                 post-routes                                */
/* -------------------------------------------------------------------------- */

router.post(
  routPath.admin.post.createProduct,
  multerMiddleware,
  [
    check("title").trim().isLength({ min: 3 }),
    check("summary").trim().isLength({ min: 3 }),
    check("discription").trim().isLength({ min: 3 }),
    check("price").custom(validator.checkPriceMin),
  ],
  adminController.postCreateProducts
);
router.post(
  routPath.admin.post.editProduct,
  multerMiddleware,
  [
    check("title").trim().isLength({ min: 3 }),
    check("summary").trim().isLength({ min: 3 }),
    check("discription").trim().isLength({ min: 3 }),
    check("price").custom(validator.checkPriceMin),
  ],
  adminController.postEditProduct
);
router.post(
  routPath.admin.post.deleteProduct,
  adminController.postDeleteProducts
);

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

module.exports = {
  router: router,
};
