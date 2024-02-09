const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const multerMiddleware = require("../middleware/image-upload.js");
const { check } = require("express-validator");

const { routPath } = require("../util/projektPath");
const validator = require("../middleware/validator");
const checkAdmin = require("../middleware/adminPermisson");

/* -------------------------------------------------------------------------- */
/*                                 get-routes                                 */
/* -------------------------------------------------------------------------- */

router.get(
  routPath.admin.get.productManagement,
  checkAdmin,
  adminController.getProducts
);
router.get(
  routPath.admin.get.createProduct,
  checkAdmin,
  adminController.getCreateProducts
);
router.get(
  routPath.admin.get.editProduct,
  checkAdmin,
  adminController.getEditProduct
);
router.get(
  routPath.admin.get.orderManagement,
  checkAdmin,
  adminController.getOrders
);

router.get(
  routPath.admin.get.orderNumber,
  checkAdmin,
  adminController.getNewOrderNumber
);
router.get(routPath.admin.get.apiCsrf, checkAdmin, adminController.getCsrf);

/* -------------------------------------------------------------------------- */
/*                                 post-routes                                */
/* -------------------------------------------------------------------------- */

router.post(
  routPath.admin.post.createProduct,
  checkAdmin,
  multerMiddleware,
  [
    check("title").trim().isLength({ min: 3 }),
    check("summary").trim().isLength({ min: 3 }),
    check("discription").trim().isLength({ min: 3 }),
    check("price").custom(validator.checkPriceMin),
    check("discount").custom(validator.checkDiscount),
    check("sale").custom(validator.checkSale),
  ],
  adminController.postCreateProducts
);
router.post(
  routPath.admin.post.editProduct,
  checkAdmin,
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
  checkAdmin,
  adminController.postDeleteProducts
);
router.post(
  routPath.admin.post.editOrder,
  checkAdmin,
  adminController.postEditOrder
);

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

module.exports = {
  router: router,
};
