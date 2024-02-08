class CartItem {
  constructor(cartItemData) {
    this.title = cartItemData.productTitle;
    this.product_id = cartItemData.productId;
    this.number = cartItemData.productNumber;
    this.price = cartItemData.productPrice;
    this.salePrice = cartItemData.productSalePrice;
    this.totalSalePrice = (
      parseFloat(this.number) * parseFloat(this.salePrice)
    ).toFixed(2);
    this.totalPrice = (
      parseFloat(this.number) * parseFloat(this.price)
    ).toFixed(2);
    this.sale = cartItemData.productSale;
    this.discount = cartItemData.productDiscount;
    this._id = cartItemData._id;
  }
}

// Funktion zum Abrufen der CartItems aus dem HTML-Template
function getCartItemsFromHTML() {
  const cartItems = [];

  document.querySelectorAll(".cartItem").forEach((itemElement) => {
    const title = itemElement.querySelector(".title").textContent;
    const product_id = itemElement.querySelector(".product_id").textContent;
    const number = parseInt(itemElement.querySelector(".number").value);
    const price = parseFloat(itemElement.querySelector(".price").textContent);
    const salePrice = parseFloat(
      itemElement.querySelector(".salePrice").textContent
    );
    const sale = parseInt(itemElement.querySelector(".sale"));
    const discount = itemElement.querySelector(".discount").textContent;

    const cartItemData = {
      productTitle: title,
      product_Id: product_id,
      productNumber: number,
      productPrice: price,
      productSalePrice: salePrice,
      productSale: sale,
      productDiscount: discount,
    };

    const cartItem = new CartItem(cartItemData);
    cartItems.push(cartItem);
  });

  return cartItems;
}

// Funktion zum Senden der CartItems an den Server
function sendCartItemsToServer(cartItems) {
  fetch("/postOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Hier kannst du die Antwort des Servers verarbeiten
      console.log(data);
    })
    .catch((error) => {
      console.error("Fehler beim Senden der Daten an den Server:", error);
    });
}

// Verwende die oben definierten Funktionen, um die CartItems abzurufen und an den Server zu senden
const cartItems = getCartItemsFromHTML();
sendCartItemsToServer(cartItems);
