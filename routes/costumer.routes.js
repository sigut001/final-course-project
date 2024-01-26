const express = require("express");
const router = express.Router();

const { routPath } = require("../util/projektPath");
const costumerController = require("../controller/costumer.controller");

/* -------------------------------------------------------------------------- */
/*                                 get-routes                                 */
/* -------------------------------------------------------------------------- */

router.get(
  routPath.costumer.get.allOrders,
  costumerController.getCostumerOrders
);

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

module.exports = {
  router: router,
};
