const orderNumber = document.getElementById("orderNumber");
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
      orderNumber.innerText = data.index;
      setTimeout(getOrderNumber, 10000);
    });
}
