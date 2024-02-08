const User = require("../models/user.model");
const authentification = require("../util/authentication");
const { validationResult } = require("express-validator");
const { routPath, viewPath } = require("../util/projektPath");

/* -------------------------------------------------------------------------- */
/*                                getController                               */
/* -------------------------------------------------------------------------- */

function getLogIn(req, res, next) {
  res.render("../" + viewPath.auth.logIn, {
    page: { title: "Log in", nav: "getLogIn" },
  });
}

function getSignUp(req, res, next) {
  res.render("../" + viewPath.auth.signUp, {
    page: { title: "Sign up", nav: "getSignUp" },
  });
}

/* -------------------------------------------------------------------------- */
/*                                 postSignUp                                 */
/* -------------------------------------------------------------------------- */

async function postSignUp(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    authentification.messageToSession(req, errors.array());
    authentification.signUpDataToSession(req, function () {
      return res.redirect(routPath.auth.get.signUp);
    });
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    req.body.street,
    req.body.houseNumber,
    req.body.city,
    req.body.plz
  );

  try {
    if (await user.getUser()) {
      authentification.messageToSession(
        req,
        null,
        "User exsistiert bereits, loggen sie sich ein."
      );
      authentification.signUpDataToSession(req);
      return res.redirect(routPath.auth.get.logIn);
    }
  } catch (err) {
    next(err);
  }

  try {
    await user.signup();
    authentification.signUpDataToSession(req);
  } catch (err) {
    return next(err);
  }

  res.redirect(routPath.auth.get.logIn);
}

/* -------------------------------------------------------------------------- */
/*                                  postLogIn                                 */
/* -------------------------------------------------------------------------- */

async function postLogIn(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    authentification.messageToSession(req, errors.array());
    authentification.logInDataToSession(req, function () {
      return res.redirect(routPath.auth.get.logIn);
    });
  }

  const user = new User(req.body.email, req.body.password);
  console.log("Beim Login ", req.body);
  let exsitingUser;

  try {
    exsitingUser = await user.getUser();
    console.log(exsitingUser);
  } catch (err) {
    return next(err);
  }

  if (!exsitingUser) {
    authentification.messageToSession(
      req,
      null,
      "Keinen User mit dieser Email gefunden!"
    );
    authentification.logInDataToSession(req, function () {
      return res.redirect(routPath.auth.get.logIn);
    });
  }

  try {
    if (!(await user.proofHashedPassword(exsitingUser.password))) {
      authentification.messageToSession(
        req,
        null,
        "Fehlerhafte Anmeldeinformationen"
      );
      authentification.logInDataToSession(req);
      return res.redirect(routPath.auth.get.logIn);
    }
  } catch (err) {
    next(err);
  }

  authentification.createUserSession(req, exsitingUser, function () {
    res.redirect(routPath.basic.get.default);
  });
}

/* -------------------------------------------------------------------------- */
/*                                 postLogOut                                 */
/* -------------------------------------------------------------------------- */

function postLogOut(req, res) {
  authentification.deleteAuthInSession(req, function () {
    res.redirect(routPath.auth.get.logIn);
  });
}

module.exports = {
  getLogIn,
  getSignUp,
  postSignUp,
  postLogIn,
  postLogOut,
};
