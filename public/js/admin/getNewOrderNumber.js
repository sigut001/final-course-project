const orderNumber = document.getElementById("orderNumber");
const orderNumberInRefreshButton = document.getElementById("numberNewOrders");
const url = orderNumber.getAttribute("data-orderNumberURL");

document.addEventListener("DOMContentLoaded", function () {
  getOrderNumber();
});

function getOrderNumber() {
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht ok");
      }
      return response.json();
    })
    .then((data) => {
      if (orderNumberInRefreshButton) {
        orderNumberInRefreshButton.innerText =
          "Offene Bestellungen: " + data.index;
      }
      orderNumber.innerText = data.index;
      setTimeout(getOrderNumber, 10000);
    });
}
