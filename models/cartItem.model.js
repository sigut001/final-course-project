const { v4: uuidv4 } = require("uuid");

class CartItem {
  constructor(cartItemData) {
    this.title = cartItemData.productTitle;
    this.product_id = cartItemData.productId;
    this.number = cartItemData.productNumber.toString();
    this.price = cartItemData.productPrice;
    this.sale = cartItemData.productSale;
    this.discount = cartItemData.productDiscount;
    this._id = uuidv4();
  }
}

module.exports = CartItem;
