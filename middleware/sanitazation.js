// Middleware für POST-Anfragen
function sanitize(req, res, next) {
  // Säubere den Anfragekörper
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      const value = req.body[key];
      if (Array.isArray(value)) {
        // Wenn der Wert ein Array ist
        value.forEach((obj) => {
          for (const innerKey in obj) {
            if (Object.hasOwnProperty.call(obj, innerKey)) {
              obj[innerKey] = req.sanitize(obj[innerKey]);
            }
          }
        });
      } else if (typeof value === "object") {
        // Wenn der Wert ein einzelnes Objekt ist
        for (const innerKey in value) {
          if (Object.hasOwnProperty.call(value, innerKey)) {
            value[innerKey] = req.sanitize(value[innerKey]);
          }
        }
      }
    }
  }
  next();
}
module.exports = sanitize;
