const express = require("express");
const router = express.Router();
const auth = require("../controller/auth.controller");
const { check } = require("express-validator");

const { routPath } = require("../util/projektPath");
const validator = require("../middleware/validator");

/* -------------------------------------------------------------------------- */
/*                                 get-routes                                 */
/* -------------------------------------------------------------------------- */

router.get(routPath.auth.get.logIn, auth.getLogIn);
router.get(routPath.auth.get.signUp, auth.getSignUp);

/* -------------------------------------------------------------------------- */
/*                                 post-routes                                */
/* -------------------------------------------------------------------------- */

router.post(
  routPath.auth.post.logIn,
  [
    check("email").isEmail().normalizeEmail(),
    check("password").trim().isLength({ min: 5 }),
  ],
  auth.postLogIn
);
router.post(
  routPath.auth.post.signUp,
  [
    check("email").isEmail().normalizeEmail(),
    check("password").trim().isLength({ min: 5 }),
    check("firstName").trim().isLength({ min: 2 }),
    check("lastName").trim().isLength({ min: 2 }),
    check("street").trim().isLength({ min: 3 }),
    check("houseNumber").trim().isLength({ min: 1 }),
    check("city").trim().isLength({ min: 2 }),
    check("plz").trim().isLength({ min: 1 }),

    check("password").custom(validator.checkEqualityPassword),
    check("email").custom(validator.checkEqualityEmail),
  ],
  auth.postSignUp
);
router.post(routPath.auth.post.logOut, auth.postLogOut);

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

module.exports = {
  router: router,
};
