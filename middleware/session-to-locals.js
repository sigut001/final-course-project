function sessionDataToLocalsAndDelete(req, res, next) {
  // LogInDaten in Locals speichern mit eventualität für den Fall das ein redirect vom signup zum login erfolgt
  if (req.session.logInData) {
    res.locals.logInData = req.session.logInData;
  } else {
    res.locals.logInData = req.session.signUpData;
  }

  res.locals.signUpData = req.session.signUpData;
  res.locals.message = req.session.message;

  // Adminstatus hinzufügen, falls vorhanden (Dieser bleibt in Session erhalten)
  res.locals.isAdmin = req.session.isAdmin;

  req.session.signUpData = null;
  req.session.logInData = null;
  req.session.message = null;

  next();
}

module.exports = sessionDataToLocalsAndDelete;
