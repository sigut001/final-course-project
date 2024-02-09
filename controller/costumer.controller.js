const { viewPath, routPath } = require("../util/projektPath");

const CartItem = require("../models/cartItem.model");
const Order = require("../models/order.model");

async function getCostumerOrders(req, res, next) {
  console.log(req.session.uid);
  const orders = await Order.findAllOrdersFromUser(req.session.email);
  console.log("Costumer Orders:", orders);
  res.render("../" + viewPath.costumer.viewCostumerOrders, {
    page: { title: "View Orders", nav: "getOrders", orders: orders },
  });
}

function getCart(req, res, next) {
  res.render("../" + viewPath.costumer.cart, {
    page: { title: "Cart", nav: "cart" },
  });
}

function postAddToCart(req, res, next) {
  const itemData = { ...req.body };
  const cartItem = new CartItem(itemData);

  // Prüfen, ob bereits ein Warenkorb in der Session existiert
  if (!req.session.cart) {
    // Initialisieren des Warenkorbs in der Session, wenn dieser noch nicht existiert
    req.session.cart = [];
  }

  // Hinzufügen des neuen CartItem-Objekts zum Warenkorb in der Session
  req.session.cart.push(cartItem);

  // Speichern der Session-Daten, nachdem Änderungen vorgenommen wurden
  req.session.save((err) => {
    if (err) {
      // Fehlerbehandlung, falls das Speichern der Session fehlschlägt
      console.error("Fehler beim Speichern der Session: ", err);
      return next(err); // Weiterleitung des Fehlers an die Fehlerbehandlungsmiddleware
    }

    // Weiterleitung des Benutzers zurück zur Produktseite
    res.redirect(routPath.product.get.allProducts);
  });
}

// API's

function deleteCartItem(req, res, next) {
  // Die _id des zu löschenden cartItems aus dem Request-Parameter extrahieren
  const { _id } = req.params;

  // Prüfen, ob ein Warenkorb in der Session existiert
  if (!req.session.cart) {
    return res.status(400).json({ error: "Der Warenkorb ist leer." });
  }

  // Suchen und Entfernen des cartItems aus dem Warenkorb anhand der _id
  const cartItemIndex = req.session.cart.findIndex((item) => item._id === _id);

  if (cartItemIndex === -1) {
    return res
      .status(404)
      .json({ error: "Das angegebene cartItem wurde nicht gefunden." });
  }

  // Das cartItem aus dem Warenkorb entfernen
  req.session.cart.splice(cartItemIndex, 1);

  // Speichern der aktualisierten Session-Daten
  req.session.save((err) => {
    if (err) {
      console.error("Fehler beim Speichern der Session: ", err);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }

    res.status(200).json({ message: "Cart-Element erfolgreich gelöscht." });
  });
}

function deleteCart(req, res, next) {
  // Prüfen, ob ein Warenkorb in der Session existiert
  if (!req.session.cart) {
    return res.status(400).json({ error: "Der Warenkorb ist leer." });
  }

  // Warenkorb leeren
  req.session.cart = [];

  // Speichern der aktualisierten Session-Daten
  req.session.save((err) => {
    if (err) {
      console.error("Fehler beim Speichern der Session: ", err);
      return res.status(500).json({ error: "Interner Serverfehler" });
    }
    res.status(200).json({ message: "Cart-Element erfolgreich gelöscht." });
  });
}

function postOrder(req, res, next) {
  console.log(req.body.cartItems);
  // Logge den gesamten Request-Body
  if (req.body.cartItems) {
    const order = new Order({
      cartItemList: req.body.cartItems,
      user_id: req.session.uid,
      status: "pending",
      timestamp: new Date().getTime(),
    });
    order.save();

    // Warenkorb Leerung
    req.session.cart = [];

    res.status(200).send({ message: "Bestellung ist eingegangen" });
  } else {
    res
      .status(400)
      .send({ message: "Es wurden keine Artikel gesendet - Fehler!" });
  }
}

module.exports = {
  getCostumerOrders,
  postAddToCart,
  getCart,
  deleteCart,
  deleteCartItem,
  postOrder,
};
