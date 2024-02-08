let resetBtn = document.getElementById("resetBtn");
let form = document.getElementById("form");

let formTitle = document.getElementById("title");
let formImage = document.getElementById("image");
let formPrice = document.getElementById("price");
let formStatus = document.getElementById("status");
let formSale = document.getElementById("sale");
let formHiddenDiscount = document.getElementById("discount");
let formShownDiscount = document.getElementById("discountShow");
let formSalePrice = document.getElementById("salePrice");

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

function createAndShowSaleData() {
  // Es soll nur ausgeführt werden, wenn sale aktiviert, ein Preis und ein Rabtt exsistiert
  if (formSale.value === "true" && formShownDiscount.value != "keinRabatt") {
    // Falls bereits ein dummyDiscountNew besteht, soll dieser entfernt und neu hinzugefügt werden
    // Wenn Sale aktiviert wurde und ein Discount eingestellt wurde, wird der Salepreis berechnet und ins ShowElement eingefügt.

    // Verknüpfen der Unsichtbaren mit den Sichtbaren Feldern
    formHiddenDiscount.value = formShownDiscount.value;
    let dezi = (1 - formShownDiscount.value / 100) * formPrice.value;
    formSalePrice.value = +parseFloat(dezi.toFixed(2));

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
    dummySalePriceNew.innerText = "nur " + formSalePrice.value + "€";
    dummyPriceContainer.appendChild(dummySalePriceNew);

    dummyPrice.style.textDecoration = "line-through";
  }
}

function removeSaleData() {
  // Wenn Sale aktiviert wurde und ein Discount eingestellt wurde, wird der Salepreis berechnet und ins ShowElement eingefügt.
  if (formSale.value === "false") {
    formSalePrice.value = "";
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
  let dezi = +formPrice.value;
  let dezimalPrice = dezi.toFixed(2);
  dummyTitle.innerText = formTitle.value;
  dummyPrice.innerText = dezimalPrice;

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
  formShownDiscount.style.backgroundColor = "";

  event.preventDefault();
  form.reset();

  let dezi = +formPrice.value;
  let dezimalPrice = dezi.toFixed(2);
  dummyTitle.innerText = formTitle.value;
  dummyPrice.innerText = dezimalPrice;
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
  dummyTitle.innerText = formTitle.value;
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
  let dezi = +formPrice.value;
  let dezimalPrice = dezi.toFixed(2);
  dummyPrice.innerText = dezimalPrice;
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
    formShownDiscount.style.backgroundColor = "";
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

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    (formSale.value === "false" && formShownDiscount.value === "keinRabatt") ||
    (formSale.value === "true" &&
      ["5", "10", "15", "20", "25", "50"].includes(formShownDiscount.value))
  ) {
    form.submit();
  } else {
    console.log("Ein Fehler beim Sale/Discount");
  }
  if (formSale.value === "true" && formShownDiscount.value === "keinRabatt") {
    formShownDiscount.style.backgroundColor = "red";
  }
});
