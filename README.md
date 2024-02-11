# final-course-project

Projektübersicht

Dieses Abschlussprojekt markiert den Höhepunkt meines Webentwicklungskurses (https://www.udemy.com/course/100-days-of-code-web-development-bootcamp/), in dem ich meine erlernten Fähigkeiten und Best Practices in einem umfassenden, realitätsnahen Projekt angewendet habe. Ziel war die Entwicklung einer benutzerfreundlichen Desktop-Webanwendung – konkret eines Onlineshops, in dem Produkte durch einen Administrator zum Verkauf eingestellt werden können. Kunden haben die Möglichkeit, Produkte mit variablen Rabatten und Verfügbarkeiten zu erwerben, wobei sich die Preise dynamisch berechnen. Der Administrator kann Produkte jederzeit bearbeiten oder löschen, während Kunden Produkte in auswählbaren Mengen zum Warenkorb hinzufügen und die Bestellung aufgeben können. Bestellungen werden direkt an den Administrator weitergeleitet, der im Admin-Dashboard mittels einer Benachrichtigungsfunktion über neue Aufträge informiert wird. Dort kann er Bestellungen detailliert einsehen und bearbeiten, wobei ihm spezielle Tools zur effizienten Kommissionierung und Verwaltung der Produkte zur Verfügung stehen. Kunden werden autmoatisch über den Bearbeitungs- / Sendestatus der Bestellungen informiert.

Verwendete Technologien und Best Practices

-  Styling: Einsatz von Vanilla CSS und Tailwind CSS für das Design.
-  Datenbank: MongoDB für die Speicherung von Benutzerdaten, Produkten, Bestellungen und Sessions.
-  Datenaustausch mit dem Server: Kombination aus herkömmlichen Formularen, multipart-Formularen für Bilduploads und Fetch-API-Requests für das Laden von dynamischen Inhalten.
-  Authentifizierung: Implementierung von Anmelde- und Registrierungsfunktionen mit Bcrypt für sichere Passwortverschlüsselung.
-  Einkaufswagen: Speicherung der Einkaufswagen-Daten in den Sessiondaten der Kunden.
-  Backend: Nutzung von NodeJS und Express.
-  Frontend: Einsatz von Vanilla JavaScript.
-  Templates: Verwendung der EJS-Template-Engine.
-  Architektur: Konsequente Anwendung des MVC-Patterns, unterteilt in Module, Views und Controller.
-  Middleware: Entwicklung spezifischer Middleware für Authentifizierung, Validierung und Datenbereinigung.
-  Sicherheit: Verwendung von CSRF-Tokens sowie Middleware für die Bereinigung von Nutzereingaben
-  Routen: Auslagerung der Routen aus der Hauptdatei und zentrale Speicherung der Pfadangaben, um eine einfache Anpassung zu ermöglichen.
-  Versionierung: Das Projekt wurde auf GitHub veröffentlicht, um es der Community zugänglich zu machen.

Verzeichnisstruktur und Dateien

-  Root-Verzeichnis: Enthält Konfigurationsdateien und den Einstiegspunkt (app.js).
-  .gitignore/.prettierignore: Ausschluss bestimmter Dateien von Git und Prettier.
-  package.json/package-lock.json: Definition von Abhängigkeiten und Skripten.
-  tailwind.config.js: Konfiguration für Tailwind CSS.
-  config: Konfigurationsdateien für allgemeine Einstellungen und Session-Management.
-  controller: Controller-Dateien für die Anwendungslogik verschiedener Routen.
-  database: Verbindung und Konfiguration der MongoDB-Datenbank.
-  middleware: Funktionen für Authentifizierungschecks, Fehlerbehandlung und Bild-Uploads.
-  models: Datenmodelle, die die Struktur der Datenbanktabellen definieren.
-  public: Statische Dateien wie CSS, Bilder und JavaScript, organisiert in Unterordnern.

Abschluss:

Dieses Projekt repräsentiert das Ergebnis einer intensiven Lernkurve in der Webentwicklung und veranschaulicht mein Verständnis moderner Webtechnologien und Best Practices. Die dokumentierte Struktur und die implementierten Praktiken demonstrieren mein Engagement für qualitativ hochwertige Softwareentwicklung und bilden die Basis für zukünftige Projekte und Entwicklungen.
