let resetBtn = document.getElementById("resetBtn");
let form = document.getElementById("form");

let formTitle = document.getElementById("title");
let formImage = document.getElementById("image");
let formPrice = document.getElementById("price");
let formStatus = document.getElementById("status");
let formSale = document.getElementById("sale");
let formHiddenDiscount = document.getElementById("discount");
let formShownDiscount = document.getElementById("discountShow");
let formHiddenSalePrice = document.getElementById("salePrice");
let formShownSalePrice = document.getElementById("salePriceShow");

let dummyTitle = document.getElementById("dummyTitle");
let dummyIconContainer = document.querySelector(".dummyIconContainer");
let dummyStatus = document.getElementById("dummyStatus");
let dummyPriceContainer = document.querySelector(".dummyPriceContainer");
let dummyPrice = document.getElementById("dummyPrice");
let dummyDiscount = document.getElementById("dummyDiscount");
let dummySalePrice = document.getElementById("dummySalePrice");

/* -------------------------------------------------------------------------- */
/*                                 Funktionen für das Formular                */
/* -------------------------------------------------------------------------- */
function transmitInput(formElement, dummyElement) {
  dummyElement.innerText = formElement.value;
}

function createAndShowSaleData() {
  // Es soll nur ausgeführt werden, wenn sale aktiviert, ein Preis und ein Rabtt exsistiert
  if (formSale.value === "true" && formShownDiscount.value != "keinRabatt") {
    // Falls bereits ein dummyDiscountNew besteht, soll dieser entfernt und neu hinzugefügt werden
    // Wenn Sale aktiviert wurde und ein Discount eingestellt wurde, wird der Salepreis berechnet und ins ShowElement eingefügt.

    // Verknüpfen der Unsichtbaren mit den Sichtbaren Feldern
    formHiddenDiscount.value = formShownDiscount.value;
    formShownSalePrice.value =
      (1 - formShownDiscount.value / 100) * formPrice.value;
    formHiddenSalePrice.value = formShownSalePrice.value;

    if (document.getElementById("dummyDiscount")) {
      document.getElementById("dummyDiscount").remove();
    }
    let dummyDiscountNew = document.createElement("p");
    dummyDiscountNew.id = "dummyDiscount";
    dummyDiscountNew.classList.add("discount");
    dummyDiscountNew.innerText = "-" + formHiddenDiscount.value + "%";
    dummyIconContainer.appendChild(dummyDiscountNew);

    // Falls bereits ein dummySalePrice besteht, soll dieser entfernt und neu hinzugefügt werden
    if (document.getElementById("dummySalePrice")) {
      document.getElementById("dummySalePrice").remove();
    }
    let dummySalePriceNew = document.createElement("span");
    dummySalePriceNew.id = "dummySalePrice";
    dummySalePriceNew.classList.add("productCardPrice");
    dummySalePriceNew.innerText = "nur " + formHiddenSalePrice.value + "€";
    dummyPriceContainer.appendChild(dummySalePriceNew);

    dummyPrice.style.textDecoration = "line-through";
  }
}

function removeSaleData() {
  // Wenn Sale aktiviert wurde und ein Discount eingestellt wurde, wird der Salepreis berechnet und ins ShowElement eingefügt.
  if (formSale.value === "false") {
    formHiddenSalePrice.value = "";
    formShownSalePrice.value = "";
    formHiddenDiscount.value = "keinRabatt";
    formShownDiscount.value = "keinRabatt";
    formShownDiscount.disabled = true;
  }
  // Falls bereits ein dummyDiscountNew besteht, soll dieser entfernt werden
  if (document.getElementById("dummyDiscount")) {
    document.getElementById("dummyDiscount").remove();
  }

  // Falls bereits ein dummySalePrice besteht, soll dieser entfernt werden
  if (document.getElementById("dummySalePrice")) {
    document.getElementById("dummySalePrice").remove();
  }

  dummyPrice.style.textDecoration = "";
}

/* -------------------------------------------------------------------------- */
/*                             Eventlistner                                   */
/* -------------------------------------------------------------------------- */

// Wenn die Seite neugeladen wird, sollen die Werte aus dem Formular (title, price, status) übertragen werden.
// Zusätzlich soll im Falle (sale&&discount&&salePrice) auch die salesObjekte für den Dummy erzeugt werden
document.addEventListener("DOMContentLoaded", function () {
  transmitInput(formTitle, dummyTitle);
  transmitInput(formPrice, dummyPrice);
  dummyStatus.innerText = formStatus.text;

  switch (formStatus.value) {
    case "verfügbar":
      dummyStatus.innerText = "verfügbar";
      dummyStatus.classList.add("verfügbar");
      break;
    case "fastAusverkauft":
      dummyStatus.innerText = "fast ausverkauft";
      dummyStatus.classList.add("fastAusverkauft");
      break;
    case "ausverkauft":
      dummyStatus.innerText = "ausverkauft";
      dummyStatus.classList.add("ausverkauft");
      break;
    default:
      dummyStatus.innerText = "verfügbar";
      dummyStatus.classList.add("verfügbar");
  }

  createAndShowSaleData();
});

resetBtn.addEventListener("click", function (event) {
  removeSaleData();
  formShownDiscount.disabled = "true";
  event.preventDefault();
  form.reset();

  transmitInput(formTitle, dummyTitle);
  transmitInput(formPrice, dummyPrice);
  dummyStatus.innerText = formStatus.text;

  switch (formStatus.value) {
    case "verfügbar":
      dummyStatus.innerText = "verfügbar";
      dummyStatus.classList.add("verfügbar");
      break;
    case "fastAusverkauft":
      dummyStatus.innerText = "fast ausverkauft";
      dummyStatus.classList.add("fastAusverkauft");
      break;
    case "ausverkauft":
      dummyStatus.innerText = "ausverkauft";
      dummyStatus.classList.add("ausverkauft");
      break;
    default:
      dummyStatus.innerText = "verfügbar";
      dummyStatus.classList.add("verfügbar");
  }

  createAndShowSaleData();
});

formTitle.addEventListener("input", (event) => {
  transmitInput(formTitle, dummyTitle);
});

formImage.addEventListener("change", function (event) {
  var vorschau = document.getElementById("dummyImage");
  var dateien = event.target.files;

  if (dateien && dateien[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      vorschau.src = e.target.result;
      vorschau.style.display = "block";
    };

    reader.readAsDataURL(dateien[0]);
  }
});

formPrice.addEventListener("input", (event) => {
  transmitInput(formPrice, dummyPrice);
  createAndShowSaleData();
});

formStatus.addEventListener("change", (event) => {
  console.dir(event.target);
  if (event.target.value === "verfügbar") {
    dummyStatus.innerText = "verfügbar";
    dummyStatus.classList = "";
    dummyStatus.classList.add("verfügbar");
  }
  if (event.target.value === "fastAusverkauft") {
    dummyStatus.innerText = "fast ausverkauft";
    dummyStatus.classList = "";
    dummyStatus.classList.add("fastAusverkauft");
  }
  if (event.target.value === "ausverkauft") {
    dummyStatus.innerText = "ausverkauft";
    dummyStatus.classList = "";
    dummyStatus.classList.add("ausverkauft");
  }
});

// Wenn formSale aktiviert wird, soll der SalePrice berechnet werden,
formSale.addEventListener("change", function (event) {
  if (formSale.value === "true") {
    formShownDiscount.disabled = false;
    createAndShowSaleData();
  } else if (formSale.value === "false") {
    removeSaleData();
    formShownDiscount.disabled = "true";
  }
});
formShownDiscount.addEventListener("change", function (event) {
  if (formSale.value) {
    createAndShowSaleData();
  } else {
    removeSaleData();
  }
});
