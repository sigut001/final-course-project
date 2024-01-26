const express = require("express");
const path = require("path");
const csurf = require("csurf");
const session = require("express-session");
const expressSanitizer = require("express-sanitizer");

const database = require("./database/database");
const createSessionConfig = require("./config/session");

const authRoutes = require("./routes/auth.routes");
const basicRoutes = require("./routes/basic.routes");
const productRoutes = require("./routes/product.routes");
const costumerRoutes = require("./routes/costumer.routes");
const adminRoutes = require("./routes/admin.routes");

const addCsrfTokenMiddleware = require("./middleware/csrf-token");
const extractCsrf = require("./middleware/extractCSRFformURL");
const errorHandlerMiddleware = require("./middleware/error-handler");
const checkAuthMiddleware = require("./middleware/check-auth");
const sanitaizeMiddleware = require("./middleware/sanitazation");
const sessionDataToLocalsAndDelete = require("./middleware/session-to-locals");

// Applikation erstellen
const app = express();

// Festlegen welcher Templatemotor genutzt wird
app.set("view engine", "ejs");
// Mitteilen an welcher Stelle die Templates zu finden sind
app.set("views", path.join(__dirname, "views"));

// Festlegen wo statische Datein zu finden sind.
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session(createSessionConfig()));
// Hinzufügen von csrf protection, diese prüft auf einen gültigen Token vor jeder post-req
app.use(csurf());
app.use(expressSanitizer());

// Costum Middleware
// Erzeugen eines Tokens, welcher für alle weiteren Templates und Files in der locals-Variable verfügbar ist
app.use(extractCsrf);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthMiddleware);
app.use(sessionDataToLocalsAndDelete);

app.post("*", sanitaizeMiddleware);

// Einbinden der Routenhandler
app.use(authRoutes.router);
app.use(basicRoutes.router);
app.use(productRoutes.router);
app.use(costumerRoutes.router);
app.use(adminRoutes.router);

// Einbinden von Errorhandlung
app.use(errorHandlerMiddleware);

database
  .connectToDatabase()
  .then(function () {
    // Applikation starten auf Port 3000
    app.listen(3000);
  })
  .catch(function (err) {
    console.log("Fehler beim verbinden mit der Datenbank");
    console.log(err);
  });
