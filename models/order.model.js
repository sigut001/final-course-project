const User = require("../models/user.model");
const database = require("../database/database");
const { ObjectId } = require("mongodb");

class Order {
  constructor(orderDataFront, orderDataBack) {
    if (orderDataFront) {
      (this.cartItemList = orderDataFront.cartItemList),
        (this.user_id = orderDataFront.user_id);
      this.status = orderDataFront.status;
      this.timestamp = orderDataFront.timestamp;
      this.finishedTimestamp;
    }
    if (orderDataBack) {
      this.cartItemList = orderDataBack.cartItemList;
      this.user = orderDataBack.user;
      this.status = orderDataBack.status;
      this.timestamp = orderDataBack.timestamp;
      this._id = orderDataBack._id.toString();
      this.finishedTimestamp = orderDataBack.finishedTimestamp;
    }
  }

  async save() {
    try {
      const db = await database.getDb();
      if (this.user_id) {
        this.user = await User.findUserByID(this.user_id);
      }
      await db.collection("orders").insertOne({
        cartItemList: this.cartItemList,
        user: this.user,
        status: this.status,
        timestamp: this.timestamp,
      });

      console.log("Anlegen der Order war erfolgreich");
    } catch (err) {
      console.log(err);
      ("Beim anlegen des Produktes ist ein Fehler aufgetreten.");
    }
  }

  static async findAll() {
    try {
      const db = await database.getDb();
      const orders = await db.collection("orders").find({}).toArray();
      return orders.map((order) => new Order(null, order));
    } catch (err) {
      console.log("Fehler beim Abrufen der Bestellungen");
      throw err;
    }
  }

  static async findOne(_id) {
    try {
      const db = await database.getDb();
      const order = await db
        .collection("orders")
        .findOne({ _id: new ObjectId(_id) });
      return new Order(null, order);
    } catch (err) {
      console.log("Fehler beim Abrufen der Bestellungen");
      throw err;
    }
  }

  async update(sendStatus) {
    if (this._id) {
      console.log("in update()", sendStatus, this._id);
      try {
        const db = await database.getDb();
        let updateOrder;

        const finishedTimestamp = new Date().getTime();

        if (sendStatus === "send") {
          updateOrder = {
            $set: {
              status: sendStatus,
              finishedTimestamp: finishedTimestamp,
            },
          };
        } else {
          updateOrder = {
            $set: {
              status: sendStatus,
            },
          };
        }

        const result = await db
          .collection("orders")
          .updateOne({ _id: new ObjectId(this._id) }, updateOrder);

        this.finishedTimestamp = finishedTimestamp;
        console.log("Sendestatus aktualisieren - erfolgreich!");
        return result;
      } catch (err) {
        console.log(err);
        console.log("Sendestatus aktualisieren - fehlgeschlagen!");
      }
    } else {
      console.log("Fehler! Keine ID zum Aktualisieren");
      return new Error({ message: "Fehlerhafte Nutzung des OrderObjektes" });
    }
  }
}

module.exports = Order;
