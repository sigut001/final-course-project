const deleteBtns = document.querySelectorAll(".delete_btn");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    let csrfToken;
    try {
      csrfToken = await fetchCsrfToken();
      if (csrfToken) {
        console.log("CSRF-Token erhalten:", csrfToken);
        // Hier können Sie weiteren Code schreiben, der den CSRF-Token verwendet
      }
    } catch (err) {
      console.log(err);
    }

    // Erzeugen des Modal-Containers

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const abfrageFenster = document.createElement("form");
    abfrageFenster.action = "/admin-delete-product/" + event.target.dataset._id;
    abfrageFenster.method = "POST";
    abfrageFenster.id = "confirmModal";
    abfrageFenster.classList.add("abfrageFenster");

    const csrfInput = document.createElement("input");
    csrfInput.name = "_csrf";
    csrfInput.type = "hidden";
    csrfInput.value = csrfToken;
    abfrageFenster.appendChild(csrfInput);

    overlay.appendChild(abfrageFenster);

    // Hinzufügen der Nachricht
    const message = document.createElement("p");
    message.textContent = "Produkt wirklich löschen?";
    abfrageFenster.appendChild(message);

    const btn_wrapper = document.createElement("div");
    btn_wrapper.classList.add("btn_wrapper");
    abfrageFenster.appendChild(btn_wrapper);

    // Erzeugen des Ja-Buttons
    const yesBtn = document.createElement("button");
    yesBtn.classList.add("btn");
    yesBtn.classList.add("btn_color");

    yesBtn.id = "confirmYes";
    yesBtn.textContent = "Ja";
    yesBtn.type = "submit";
    btn_wrapper.appendChild(yesBtn);

    const noBtn = document.createElement("button");
    noBtn.classList.add("btn");
    noBtn.classList.add("btn_color_alt");

    noBtn.id = "confirmNo";
    noBtn.textContent = "Nein";
    noBtn.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
    btn_wrapper.appendChild(noBtn);

    document.body.appendChild(overlay);
  });
});

abfrageFenster.addEventListener("submit", (e) => {
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 300);
});

async function fetchCsrfToken() {
  try {
    const response = await fetch("/api/get-csrf-token", {
      method: "GET",
      credentials: "include", // Wichtig, wenn Cookies für die Authentifizierung verwendet werden
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Netzwerkantwort war nicht ok");
    }

    const data = await response.json();
    return data.csrfToken; // Annahme: Die Antwort enthält ein Objekt mit dem CSRF-Token
  } catch (error) {
    console.error("Fehler beim Abrufen des CSRF-Tokens:", error);
  }
}
