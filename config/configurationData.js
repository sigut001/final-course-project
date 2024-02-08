// Verfügbarmachung der Konfigurationsvar. Die config-Methode speichert alle Key-Value Paare der .env Datei in den Umgebungsvar.
// Innerhalb des process-objekts.
require("dotenv").config();

// Zugriff auf die nun im process hinterlegtn Daten aus der .env datei
const connectionString = process.env.CONNECTION_STRING;
const dbName = process.env.DB_NAME;
const port = process.env.PORT;
const sessionSecret = process.env.SESSION_SECRET;
const collection_costumers = process.env.COLLECTION_USERS;

function getConnectionString() {
  return connectionString;
}
function getDbName() {
  return dbName;
}
function getPort() {
  return port;
}
function getSessionSecret() {
  return sessionSecret;
}
function getCollection() {
  return collection_costumers;
}

module.exports = {
  getConnectionString,
  getDbName,
  getPort,
  getSessionSecret,
  getCollection,
};
