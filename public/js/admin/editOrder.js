const orders = document.querySelectorAll(".order");
const archiv = document.getElementById("archiv");

document.addEventListener("DOMContentLoaded", function () {
  orders.forEach((order) => {
    const sendStatusSelect = order.querySelector(".edit-sendStatus");
    const sendStatusForm = order.querySelector(".form-sendStatus");

    //Anfangsbedingungen
    // Bereits bearbeitete und versendete Orders werden bei beginn ausgeblendet
    if (order.getAttribute("data-finishedOrder") === "true") {
      order.style.display = "none";
    }

    if (sendStatusSelect.value === "commissioned") {
      sendStatusSelect.style.border = "3px solid rgb(245,255,137)";
      order.querySelectorAll(".commissionState").forEach((checkbox) => {
        checkbox.checked = true;
        checkbox.disabled = true;
      });
    } else if (sendStatusSelect.value === "send") {
      sendStatusSelect.disabled = true;
      sendStatusSelect.style.color = "rgb(180, 180, 180)";
      sendStatusSelect.style.border = "3px solid rgb(113,186,89)";
      order.querySelectorAll(".commissionState").forEach((checkbox) => {
        checkbox.checked = true;
        checkbox.disabled = true;
      });
    }

    // Bei Bearbeitung / Update
    sendStatusSelect.addEventListener("change", function (event) {
      const status = event.target.value;
      const order_id = order.dataset._id;
      const url = order.dataset.updateSendStatusURL;

      console.log(url);

      if (status === "commissioned" || status === "send") {
        // Vorbereiten der Daten für die Fetch-Anfrage
        const data = { status: status };

        fetch(url, {
          method: "POST", // oder 'PUT', abhängig von deiner API
          headers: {
            "Content-Type": "application/json",
            _csrf: order.dataset.csrf,
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Netzwerkantwort war nicht ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Erfolg:", data);

            // Layout anpassen für "commissioned"
            if (status === "commissioned") {
              event.target.style.border = "3px solid rgb(245,255,137)";
              order.querySelectorAll(".commissionState").forEach((checkbox) => {
                checkbox.checked = true;
                checkbox.disabled = true;
              });
            }

            // Layout anpassen für "send"
            if (status === "send") {
              sendStatusSelect.disabled = true;
              sendStatusSelect.style.color = "rgb(180, 180, 180)";
              event.target.style.border = "3px solid rgb(113,186,89)";
              order.querySelectorAll(".commissionState").forEach((checkbox) => {
                checkbox.checked = true;
                checkbox.disabled = true;
              });
            }
          })
          .catch((error) => {
            console.error("Fehler:", error);
          });
      }
    });
  });
});

archiv.addEventListener("click", function (event) {
  // Im Falle das die Orders eingeblendet werden sollen und noch ausgeblendet sind
  if (event.target.dataset.hidden === "true") {
    // Ändern des Button inhalts und dem Hidden-wert
    event.target.dataset.hidden = "false";
    event.target.innerText = "Archivierte Bestellungen ausblenden";

    orders.forEach(function (order) {
      // Prüfung, ob das data-archiv Attribut den Wert "true" hat
      if (order.getAttribute("data-finishedOrder") === "true") {
        // Setzen von display: none, um das Element auszublenden
        order.style.display = "flex";
      }
    });
  } else {
    // Im Falle das die Orders ausgeblendet werden sollen und noch eingeblendet sind
    if (event.target.dataset.hidden === "false") {
      // Ändern des Button inhalts und dem Hidden-wert
      event.target.dataset.hidden = "true";
      event.target.innerText = "Archivierte Bestellungen einblenden";

      orders.forEach(function (order) {
        // Prüfung, ob das data-archiv Attribut den Wert "true" hat
        if (order.getAttribute("data-finishedOrder") === "true") {
          // Setzen von display: none, um das Element auszublenden
          order.style.display = "none";
        }
      });
    }
  }
});
