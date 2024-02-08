const { routPath, viewPath } = require("../util/projektPath");

function checkAuth(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect(routPath.basic.get.statusCode401);
  }
}

module.exports = checkAuth;
