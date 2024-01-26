const User = require("../models/user.model");
const authentification = require("../util/authentication");
const { validationResult } = require("express-validator");

/* -------------------------------------------------------------------------- */
/*                                getController                               */
/* -------------------------------------------------------------------------- */

function getLogIn(req, res, next) {
  res.render("../views/auth/logIn.ejs", {
    page: { title: "Log in", nav: "getLogIn" },
  });
}

function getSignUp(req, res, next) {
  res.render("../views/auth/signUp.ejs", {
    page: { title: "Sign up", nav: "getSignUp" },
  });
}

/* -------------------------------------------------------------------------- */
/*                                 postSignUp                                 */
/* -------------------------------------------------------------------------- */

async function postSignUp(req, res, next) {
  // Prüfung 1: Valide Nutzereingaben
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    authentification.messageToSession(req, errors.array());
    authentification.signUpDataToSession(req, function () {
      return res.redirect("/getSignUp");
    });
  }

  // Erzeugung User-Objekt
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

  // Prüfung 2: Exsistenz User
  try {
    if (await user.getUser()) {
      authentification.messageToSession(
        req,
        null,
        "User exsistiert bereits, loggen sie sich ein."
      );
      authentification.signUpDataToSession(req);
      return res.redirect("/getLogIn");
    }
  } catch (err) {
    next(err);
  }

  // Prüfung abgeschlossen. Anlegen des Users in Datenbank.
  try {
    await user.signup();
    authentification.signUpDataToSession(req);
  } catch (err) {
    return next(err);
  }

  res.redirect("/getLogIn");
}

/* -------------------------------------------------------------------------- */
/*                                  postLogIn                                 */
/* -------------------------------------------------------------------------- */

async function postLogIn(req, res, next) {
  // Prüfung 1: Valide Eingaben
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    authentification.messageToSession(req, errors.array());
    authentification.logInDataToSession(req, function () {
      return res.redirect("/getLogIn");
    });
  }

  // Erzeugen eines User-Objektes
  const user = new User(req.body.email, req.body.password);
  let exsitingUser;

  // Prüfung 2: Exsitenz-User
  try {
    exsitingUser = await user.getUser();
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
      return res.redirect("/getLogIn");
    });
  }

  // Prüfung 3: Passwort Übereinstimmung
  try {
    if (!(await user.proofHashedPassword(exsitingUser.password))) {
      authentification.messageToSession(
        req,
        null,
        "Fehlerhafte Anmeldeinformationen"
      );
      authentification.logInDataToSession(req);
      return res.redirect("/getLogIn");
    }
  } catch (err) {
    next(err);
  }

  // Prüfungen abgeschlossen. Erzeugung von Session-Authenfikationsdaten und redirect zum Loggin
  authentification.createUserSession(req, exsitingUser, function () {
    res.redirect("/getProducts");
  });
}

/* -------------------------------------------------------------------------- */
/*                                 postLogOut                                 */
/* -------------------------------------------------------------------------- */

function postLogOut(req, res) {
  authentification.deleteAuthInSession(req, function () {
    res.redirect("/getLogIn");
  });
}

module.exports = {
  getLogIn: getLogIn,
  getSignUp: getSignUp,
  postSignUp: postSignUp,
  postLogIn: postLogIn,
  postLogOut: postLogOut,
};
