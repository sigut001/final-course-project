const express = require("express");
const router = express.Router();

const { routPath } = require("../util/projektPath");
const basicController = require("../controller/basic.controller");

/* -------------------------------------------------------------------------- */
/*                                 get-routes                                 */
/* -------------------------------------------------------------------------- */

router.get(routPath.basic.get.default, basicController.getHomepage);
router.get(routPath.basic.get.statusCode500, basicController.get500);
router.get(routPath.basic.get.statusCode401, basicController.get401);
router.get(routPath.basic.get.statusCode403, basicController.get403);
router.get(routPath.basic.get.statusCode404, basicController.get404);

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

module.exports = {
  router: router,
};
