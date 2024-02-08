const tableBody = document.querySelector("#cartTable tbody");

const priceObjekteArray = document.querySelectorAll(".price");
const totalPriceObjekteArray = document.querySelectorAll(".totalPrice");
const savingsObjekteArray = document.querySelectorAll(".savings");
const cartNumber = document.getElementById("cartNumber");

const totalCost = document.getElementById("totalCost");
const totalSavings = document.getElementById("totalSavings");

const submitOrderButton = document.getElementById("submitOrderButton");
const csrf = submitOrderButton.dataset.csrf;

function deleteCart() {
  // Erstelle die URL für den Server-Endpunkt zum Löschen des Cart-Elements
  const url = `/deleteCart`;

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrf, // Hier wird der CSRF-Token als Header übergeben
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Fehler beim Löschen des Cart-Elements: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      // Hier kannst du die entsprechenden Aktualisierungen in deiner Benutzeroberfläche vornehmen, z.B. das Entfernen des Elements aus der Anzeige
      console.log(`Cart-Element erfolgreich gelöscht: ${data}`);

      // Löschen des Inhalts von tbody, entfernt alle Zeilen
      tableBody.innerHTML = "";
      cartNumber.innerText = 0;
    })
    .catch((error) => {
      console.error(`Fehler beim Löschen des Cart-Elements: ${error}`);
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
  // Finde alle cartItem-Elemente
  const cartItemElements = document.querySelectorAll(".cartItem");

  // Iteriere durch jedes cartItem-Element
  cartItemElements.forEach(function (cartItem) {
    const titleElement = cartItem.querySelector(".title");
    const priceElement = cartItem.querySelector(".price");
    const inputElement = cartItem.querySelector(".number");
    const discountElement = cartItem.querySelector(".discount");
    const totalPriceElement = cartItem.querySelector(".totalPrice");
    const savingsElement = cartItem.querySelector(".savings");
    const cartItem_id =
      cartItem.querySelector(".meta-data").dataset.cartitem_id;
    const sale = savingsElement.parentElement.dataset.sale;
    const removeCartItem = cartItem.querySelector(".removeCartItem");

    // Function zum Berechnen der jewiligen Kosten pro Artikel sowie Erparnis
    function calcCostAndSavingsArticle() {
      // Annahme der Daten aus der Datenatributsspalte (unsichtbar)
      const price = +priceElement.innerText;
      const discount = +discountElement.innerText;
      const initialNumber = +inputElement.value;

      // Berechnung
      if (sale && !isNaN(discount)) {
        const total = (
          price *
          ((100 - discount) / 100) *
          initialNumber
        ).toFixed(2);
        const savings = (
          price *
          (1 - (100 - discount) / 100) *
          initialNumber
        ).toFixed(2);
        savingsElement.innerText = savings;
        totalPriceElement.innerText = total;
      } else {
        const total = (price * initialNumber).toFixed(2);
        savingsElement.innerText = `-`;
        totalPriceElement.innerText = total;
      }
    }
    // Funktion zum Brechnen der Gesamtkosten
    function calcTotalSum() {
      let costCommulator = 0;
      cartItemElements.forEach(function (element) {
        costCommulator += +element.querySelector(".totalPrice").innerText;
      });

      totalCost.innerText = costCommulator.toFixed(2);
    }
    // Funktion zum Brechnen der Gesamtersparnisse
    function calcTotalSaving() {
      let savingCommulator = 0;
      cartItemElements.forEach(function (element) {
        const discountText = element.querySelector(".discount").innerText;
        // Überprüfen, ob der Discount-Wert nicht '-' ist und eine Zahl darstellt
        if (discountText !== "-" && !isNaN(discountText)) {
          const savingsText = element.querySelector(".savings").innerText;
          // Überprüfen, ob savingsText eine gültige Zahl ist
          if (savingsText !== "-" && !isNaN(savingsText)) {
            savingCommulator += +savingsText;
          }
        }
      });

      totalSavings.innerText = savingCommulator.toFixed(2);
    }
    // Funktion um ein cartItem vom Einkaufswagen zu löschen

    function deleteCartItem(_id, event) {
      // Erstelle die URL für den Server-Endpunkt zum Löschen des Cart-Elements
      const url = `/deleteCartItem/${_id}`;

      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf, // Hier wird der CSRF-Token als Header übergeben
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Fehler beim Löschen des Cart-Elements: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          // Hier kannst du die entsprechenden Aktualisierungen in deiner Benutzeroberfläche vornehmen, z.B. das Entfernen des Elements aus der Anzeige
          console.log(`Cart-Element erfolgreich gelöscht: ${data}`);
          event.target.parentElement.parentElement.remove();
          let newCartNumber = document.querySelectorAll(".cartItem").length;
          cartNumber.innerText = newCartNumber;
          if (newCartNumber < 1) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(`Fehler beim Löschen des Cart-Elements: ${error}`);
        });
    }

    // Preis als Dezimalzahl
    const number = +priceElement.innerText;
    const dezi = number.toFixed(2);
    priceElement.innerText = `${dezi}`; // Fügt das Euro-Zeichen hinzu

    inputElement.addEventListener("change", function (event) {
      calcCostAndSavingsArticle();
      calcTotalSum();
      calcTotalSaving();
    });

    removeCartItem.addEventListener("click", function (event) {
      deleteCartItem(cartItem_id, event);
    });

    calcCostAndSavingsArticle();
    calcTotalSaving();
    calcTotalSum();
  });
});

// Event Listener für den "Bestellung abschicken"-Button hinzufügen
submitOrderButton.addEventListener("click", (event) => {
  event.preventDefault();

  const cartItems = []; // Initialisiere cartItems als leeres Array
  document.querySelectorAll(".cartItem").forEach((item) => {
    const metaData = item.querySelector(".meta-data");
    const itemId = metaData.getAttribute("data-cartitem_id"); // Hole die _id, die als Schlüssel verwendet wird
    const title = metaData.getAttribute("data-title");
    const product_id = metaData.getAttribute("data-product_id");
    const number = item.querySelector(".number").value.toString();
    const price = metaData.getAttribute("data-price");
    const sale = metaData.getAttribute("data-sale");
    const discount = metaData.getAttribute("data-discount");

    // Füge das cartItem-Objekt als ein Element zur cartItems-Liste hinzu
    cartItems.push({
      title: title,
      product_id: product_id,
      number: number,
      price: price,
      sale: sale,
      discount: discount,
      _id: itemId, // Optional, da _id bereits in der cartItem-Liste vorhanden ist
    });
  });

  if (cartItems.length < 1) {
    return;
  }

  fetch("/postOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrf, // Stelle sicher, dass csrf korrekt definiert ist
    },
    body: JSON.stringify({ cartItems }), // Direkte Übermittlung des cartItems-Arrays
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Der Warenkorb wird vom Layout entfernt
      document.getElementById("cartTable").remove();
      document.getElementById("priceOverview").remove();

      // Neues Text-Element hinzufügen
      var paragraph = document.createElement("p");
      paragraph.textContent =
        "Deine Bestellung wurde aufgenommen, du kannst den Status deiner Bestellung   ";
      // Erstellung des <a>-Elements
      var link = document.createElement("a");
      link.setAttribute("class", "btn btn_color");
      link.setAttribute("href", "http://localhost:3000/costumer-orders");
      link.textContent = "Hier";
      // Hinzufügen des <a>-Elements zum <p>-Element
      paragraph.appendChild(link);
      // Ergänzen des restlichen Texts nach dem <a>-Element
      paragraph.appendChild(document.createTextNode("   einsehen"));
      document.querySelector(".cart").appendChild(paragraph);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
