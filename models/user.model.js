const bcryptjs = require("bcryptjs");

const database = require("../database/database");
class User {
  constructor(
    email,
    password,
    firstName,
    lastName,
    street,
    houseNumber,
    city,
    plz
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.adress = {
      street: street,
      houseNumber: houseNumber,
      city: city,
      plz: plz,
    };
  }

  async getUser() {
    try {
      const db = await database.getDb();
      return await db.collection("users").findOne({ email: this.email });
    } catch (err) {
      console.log(err);
      console.log("Beim Abrufen des Users ist ein Fehler aufgetreten.");
    }
  }

  async proofHashedPassword(password) {
    try {
      return await bcryptjs.compare(this.password, password);
    } catch (err) {
      console.log(err);
      ("Beim Prüfen des Passworts ist ein Fehler aufgetreten.");
    }
  }

  async signup() {
    try {
      const db = await database.getDb();
      await db.collection("users").insertOne({
        email: this.email,
        password: await bcryptjs.hash(this.password, 12),
        firstName: this.firstName,
        lastNameName: this.lastName,
        adress: this.adress,
      });
    } catch (err) {
      console.log(err);
      ("Beim anlegen des Users ist ein Fehler aufgetreten.");
    }
  }
}

module.exports = User;
