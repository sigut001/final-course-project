function extractCsrf(req, res, next) {
  // Prüfen, ob der Token in der URL Query vorhanden ist
  const tokenInQuery = req.query._csrf;

  // Wenn der Token in der URL ist, fügen Sie ihn dem Body hinzu, damit csurf ihn validieren kann
  if (tokenInQuery) {
    req.body._csrf = tokenInQuery;
  }
  next();
}

module.exports = extractCsrf;
