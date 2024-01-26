// Importieren des 'mongodb'-Moduls, das zur Verbindung zur MongoDB verwendet wird.
const mongodb = require("mongodb");

// Importieren des 'MongoClient' aus dem 'mongodb'-Modul.
const MongoClient = mongodb.MongoClient;

// Variable zur Speicherung der Datenbankverbindung initialisieren.
let database;

// Eine asynchrone Funktion, um eine Verbindung zur MongoDB-Datenbank herzustellen.
async function connectToDatabase() {
  // Verbindung zum MongoDB-Server unter Verwendung der in der Konfigurationsdatei angegebenen Verbindungszeichenfolge herstellen.
  const client = await MongoClient.connect(
    "mongodb://127.0.0.1:27017"
  );

  // Die Datenbankreferenz aus dem erstellten MongoDB-Client extrahieren und in der 'database'-Variablen speichern.
  database = client.db("online-shop");
}

// Eine Funktion, um auf die Datenbankreferenz zuzugreifen.
function getDb() {
  // Überprüfen, ob eine Datenbankverbindung vorhanden ist.
  if (!database) {
    // Wenn keine Verbindung vorhanden ist, eine Ausnahme werfen.
    throw { message: "You must connect first!" };
  }
  // Die Datenbankreferenz zurückgeben.
  return database;
}

// Exportieren der Funktionen, damit sie in anderen Modulen verwendet werden können.
module.exports = {
  connectToDatabase: connectToDatabase, // Funktion zum Herstellen der Datenbankverbindung
  getDb: getDb, // Funktion zum Abrufen der Datenbankreferenz
};
