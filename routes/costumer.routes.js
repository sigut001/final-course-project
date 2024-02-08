const express = require("express");
const router = express.Router();

const { routPath } = require("../util/projektPath");
const costumerController = require("../controller/costumer.controller");
const checkAuth = require("../middleware/clientPermisson");

/* -------------------------------------------------------------------------- */
/*                                 get-routes                                 */
/* -------------------------------------------------------------------------- */

router.get(
  routPath.costumer.get.allOrders,
  checkAuth,
  costumerController.getCostumerOrders
);
router.get(routPath.costumer.get.cart, costumerController.getCart);

/* -------------------------------------------------------------------------- */
/*                                 post-routes                                */
/* -------------------------------------------------------------------------- */

router.post(routPath.costumer.post.addToCart, costumerController.postAddToCart);
router.post(
  routPath.costumer.post.postOrder,

  costumerController.postOrder
);

/* -------------------------------------------------------------------------- */
/*                                delete-routes                               */
/* -------------------------------------------------------------------------- */
router.delete(
  routPath.costumer.post.deleteCartItem,
  costumerController.deleteCartItem
);
router.delete(routPath.costumer.post.deleteCart, costumerController.deleteCart);

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

module.exports = {
  router: router,
};
