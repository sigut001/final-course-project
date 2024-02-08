# final-course-project

README für mein Abschlussprojekt im Webentwicklungskurs

<!-- ----------------------------------------------------------------------- -->
<!--                            Projektübersicht                             -->
<!-- ----------------------------------------------------------------------- -->

Dieses Abschlussprojekt markiert den Höhepunkt meines Kurses hin zum Webentwickler, in der ich meine erlernten Fähigkeiten und Best Practices in einem umfassenden, realitätsnahen Projekt angewendet habe. Mein Ziel war es, eine robuste, dynamische und benutzerfreundliche Webanwendung zu erstellen, die moderne Webentwicklungstechniken und -tools nutzt. In diesem Dokument gehe ich auf die Struktur, die verwendeten Technologien und die implementierten Praktiken meines Projekts ein.

<!-- ----------------------------------------------------------------------- -->
<!--                Projektstruktur und angewandte Praktiken                 -->
<!-- ----------------------------------------------------------------------- -->

Verzeichnisstruktur und Dateien
Die Struktur meines Projekts ist klar und logisch organisiert, um die Wartbarkeit und Skalierbarkeit zu fördern:

Root-Verzeichnis: Enthält Konfigurationsdateien und den Einstiegspunkt der Anwendung (app.js).

.gitignore und .prettierignore: Um Dateien von Git und Prettier auszuschließen.
package.json und package-lock.json: Definieren Projekt-Abhängigkeiten und -Scripts.
tailwind.config.js: Konfiguration für Tailwind CSS, ein Utility-first CSS-Framework.
config: Beinhaltet Konfigurationsdateien wie configurationData.js für allgemeine Einstellungen und session.js für Session-Management.

controller: Umfasst Controller-Dateien wie auth.controller.js und product.controller.js, die die Anwendungslogik für verschiedene Routen handhaben.

database: Beinhaltet database.js, das für die Datenbankverbindung und -konfiguration zuständig ist.

middleware: Enthält Middleware-Funktionen wie Authentifizierungschecks (check-auth.js), Fehlerbehandlung (error-handler.js) und Bild-Uploads (image-upload.js).

models: Definiert Datenmodelle (user.model.js, product.model.js etc.), die die Struktur der Datenbanktabellen und die Beziehungen zwischen ihnen repräsentieren.

public: Beinhaltet statische Dateien wie CSS, Bilder und clientseitige JavaScript-Dateien, organisiert in Unterordnern (css, img, js).

<!-- ----------------------------------------------------------------------- -->
<!--                          Angewandte Praktiken                           -->
<!-- ----------------------------------------------------------------------- -->

Modulare Struktur: Die Aufteilung in Verzeichnisse wie controllers, models und middleware folgt dem MVC (Model-View-Controller)-Prinzip und fördert eine klare Trennung von Anliegen.

Session-Management: Durch die spezifische session.js Konfigurationsdatei wird deutlich, dass das Projekt eine Form des Session-Managements implementiert, was für Benutzerinteraktionen essentiell ist.

Fehlerbehandlung: Spezifische Middleware wie error-handler.js zeigt, dass das Projekt unter anderem eine zentrale Fehlerbehandlungslogik implementiert, um eine konsistente Behandlung von Ausnahmen zu gewährleisten.

Bild- und Datei-Management: Mithilfe der Middleware image-upload.js und das Verzeichnis public/product-images wurde die Handhabung der Speicherung von Produktbildern umgesetzt

Clientseitiges JavaScript: Die Struktur innerhalb des public/js-Verzeichnisses mit spezifischen Skripten für verschiedene Teile der Anwendung (z.B. Warenkorb-Management in cart.js) zeigt eine fortschrittliche Clientseitige Interaktivität.

Abschluss
Dieses Projekt ist das Ergebnis einer intensiven Lernkurve in der Webentwicklung und repräsentiert ein umfassendes Verständnis der modernen Webtechnologien und Best Practices. Die dokumentierte Struktur und die angewandten Praktiken spiegeln mein Engagement für qualitativ hochwertige Softwareentwicklung wider und legen den Grundstein für zukünftige Projekte und Weiterentwicklungen.
