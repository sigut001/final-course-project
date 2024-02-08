const database = require("../database/database");
const { ObjectId } = require("mongodb");

class Product {
  constructor(productParams) {
    this.title = productParams.title;
    this.summary = productParams.summary;
    this.discription = productParams.discription;
    this.price = +productParams.price;
    this.sale = productParams.sale;
    this.salePrice = +productParams.salePrice;
    this.discount = productParams.discount;
    this.filename = productParams.filename;
    this.path = "/public/product-images/" + this.filename;
    this.url = "/product-images/" + this.filename;
    this.status = productParams.status;
    // Für den Fall das wir ein Produkt neu anlegen
    if (productParams._id) {
      this._id = productParams._id.toString();
    } else {
      this._id = undefined;
    }
  }

  static async findAll() {
    try {
      const db = await database.getDb();
      const products = await db.collection("products").find({}).toArray();
      return products.map((product) => new Product(product));
    } catch (err) {
      console.log("Fehler beim Abrufen der Produkte");
      throw err;
    }
  }

  static async findProductById(_id) {
    try {
      const db = await database.getDb();
      return await db
        .collection("products")
        .findOne({ _id: new ObjectId(_id) });
    } catch (err) {
      console.log(err);
      ("Beim finden des Produktes ist ein Fehler aufgetreten.");
    }
  }

  static async update(_id, productData) {
    if (_id) {
      try {
        const db = await database.getDb();
        let updateDocument;
        if (productData.file) {
          updateDocument = {
            $set: {
              title: productData.title,
              summary: productData.summary,
              discription: productData.discription,
              price: productData.price,
              sale: productData.sale,
              salePrice: productData.salePrice,
              discount: productData.discount,
              filename: productData.filename,
              path: productData.path,
              url: productData.url,
              status: productData.status,
            },
          };
        } else {
          updateDocument = {
            $set: {
              title: productData.title,
              summary: productData.summary,
              discription: productData.discription,
              price: productData.price,
              sale: productData.sale,
              salePrice: productData.salePrice,
              discount: productData.discount,
              status: productData.status,
            },
          };
        }

        const result = await db
          .collection("products")
          .updateOne({ _id: new ObjectId(_id) }, updateDocument);
      } catch (err) {
        console.log(err);
        console.log(
          "Beim Aktualisieren des Produktes ist ein Fehler aufgetreten."
        );
      }
    } else {
      console.log("Keine ID zum Aktualisieren");
    }
  }

  async delete() {
    if (this._id) {
      try {
        const db = await database.getDb();
        await db
          .collection("products")
          .deleteOne({ _id: new ObjectId(this._id) });
      } catch (err) {
        console.log(err);
        ("Beim löschen des Produktes ist ein Fehler aufgetreten.");
      }
    } else {
      console.log("Keine ID zum löschen");
    }
  }

  async save() {
    try {
      const db = await database.getDb();
      await db.collection("products").insertOne({
        title: this.title,
        summary: this.summary,
        discription: this.discription,
        price: this.price,
        sale: this.sale,
        salePrice: this.salePrice,
        discount: this.discount,
        filename: this.filename,
        path: this.path,
        url: this.url,
        status: this.status,
      });
    } catch (err) {
      console.log(err);
      ("Beim anlegen des Produktes ist ein Fehler aufgetreten.");
    }
  }
}

module.exports = Product;
