// Middleware für POST-Anfragen
function sanitize(req, res, next) {
  // Säubere den Anfragekörper
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      req.body[key] = req.sanitize(req.body[key]);
    }
  }
  next();
}

module.exports = sanitize;
