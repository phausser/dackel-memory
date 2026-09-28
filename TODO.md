# Dackel-Memory – Umsetzungsplan

Die Aufgaben folgen der [Spezifikation](SPEC.md). Planung und Erzeugung der 18 Bildmotive sind abgeschlossen; das Spiel ist implementiert und auf GitHub Pages veröffentlicht.

## 1. Planung

- [x] Spielumfang, Gestaltung und Regeln in `SPEC.md` festhalten.
- [x] Umsetzungsreihenfolge und Abnahme in `TODO.md` festhalten.

## 2. Motive vorbereiten

- [x] Beschaffungsweg wählen: passend lizenzierte Fotos, selbst erzeugte fotorealistische Motive oder eine Kombination.
- [x] 18 unterscheidbare Dackelgesichter beschaffen und visuell auf Qualität prüfen.
- [ ] Nutzungsrechte und gegebenenfalls erforderliche Namensnennung vor Aufnahme in das öffentliche Repository prüfen.
- [x] Quadratische Bildausschnitte optimieren und als `dackel-01.webp` bis `dackel-18.webp` unter `assets/images/` speichern.
- [x] Auf etwa 400 × 400 px und möglichst maximal 80 KB pro Bild optimieren.
- [x] Herkunft, Beschreibungen und gegebenenfalls Lizenznachweise in `assets/images/SOURCES.md` dokumentieren.

## 3. Oberfläche erstellen

- [x] `index.html`, `styles.css` und `script.js` anlegen und mit relativen Pfaden verbinden.
- [x] Deutsche Überschrift, Spielanleitung, Zug- und Paaranzeige sowie „Neues Spiel“ einbauen.
- [x] Hellgrauen Hintergrund und zentriertes responsives Spielfeld mit vier Spalten auf Smartphones und sechs auf größeren Bildschirmen umsetzen.
- [x] Weiße quadratische Karten mit blau-weißem CSS-Schachbrettmuster erstellen.
- [x] Bildvorderseiten und erkennbare Zustände für verdeckte, offene und gefundene Karten gestalten.
- [x] Sichtbaren Tastaturfokus, native Buttons und reduzierte Animationen berücksichtigen.
- [x] Ladeanzeige, Bildfehler mit Wiederholungsmöglichkeit und Gewinnmeldung ergänzen.
- [x] Erforderliche Bildnachweise auf der Website zugänglich machen.

## 4. Spiellogik implementieren

- [x] Motivliste mit 18 IDs, lokalen Bildpfaden und deutschen Beschreibungen erstellen.
- [x] Bilder vorladen und den Spielstart erst nach erfolgreichem Laden freigeben.
- [x] 24 Karteninstanzen aus 12 zufällig ausgewählten der 18 Motive erzeugen und mit Fisher-Yates mischen.
- [x] Zentralen Spielzustand und Darstellung miteinander verbinden.
- [x] Erste und zweite Auswahl verarbeiten; dieselbe sowie bereits gefundene Karten ignorieren.
- [x] Nach der zweiten gültigen Auswahl den Zugzähler erhöhen und Motive vergleichen.
- [x] Treffer offen halten und Paarzähler aktualisieren.
- [x] Fehlpaare nach etwa einer Sekunde verdecken und bis dahin weitere Auswahlen sperren.
- [x] Nach 12 Paaren Gewinnmeldung mit Zugzahl anzeigen.
- [x] Neustart inklusive Timer-Abbruch, neuer Mischung und vollständigem Zurücksetzen umsetzen.
- [x] Zugängliche Kartennamen und Live-Statusmeldungen mit dem Zustand aktualisieren.

## 5. Lokal prüfen

- [x] Seite über einen lokalen statischen HTTP-Server öffnen; Vorgehen in `README.md` dokumentieren.
- [x] Deck prüfen: 24 Karten, 12 Motiv-IDs, jede Motiv-ID genau zweimal.
- [x] Treffer, Fehlpaar, Doppelklick auf dieselbe Karte und schnelle Mehrfachklicks prüfen.
- [x] Neustart bei keiner, einer und zwei offenen Karten sowie während eines Rückdeck-Timers prüfen.
- [x] Eine vollständige Runde inklusive Gewinnmeldung und anschließendem Neustart durchspielen.
- [x] Ausfall einer Bilddatei prüfen: Fehlermeldung, kein unvollständiger Spielstart, erneutes Laden möglich.
- [x] Layout bei 320, 375, 768 und 1280 px Breite auf vier beziehungsweise sechs Spalten und fehlenden horizontalen Überlauf prüfen.
- [ ] Touchbedienung, Tastaturbedienung, Fokus, Screenreader-Beschriftungen und reduzierte Bewegung prüfen.
- [ ] Kontraste und Erkennbarkeit gefundener Paare ohne alleinige Farbcodierung prüfen.
- [x] In verfügbaren Zielbrowsern testen und nicht geprüfte Browser in der Übergabe benennen.
- [ ] Browserkonsole und Netzwerkanfragen auf Fehler, fehlende Assets und unnötige externe Abhängigkeiten prüfen.

## 6. GitHub Pages veröffentlichen

- [x] Repository-Zugriff, Veröffentlichungsbranch und bestehende Pages-Konfiguration prüfen.
- [x] `README.md` um Spielbeschreibung, lokalen Start, Bildnachweise und Deployment-Ablauf ergänzen.
- [x] Fertige Website und lokale Bilddateien in den Veröffentlichungsbranch übertragen.
- [x] GitHub Pages für die Veröffentlichung aus dem Branch-Stammverzeichnis einrichten.
- [x] Erfolgreiche Veröffentlichung abwarten und tatsächliche öffentliche URL feststellen.
- [x] Auf der Live-Seite Asset-Pfade unter `/dackel-memory/`, Bildladeverhalten und mobile Darstellung prüfen.
- [x] Auf der Live-Seite eine komplette Runde und einen Neustart testen.
- [x] Bestätigte Live-URL in `README.md` eintragen und erledigte Aufgaben abhaken.

## Prüfstand vom 28.09.2026

Automatisierte Chromium-Prüfung erfolgreich, siehe `tests/browser.mjs` und `README.md`. Tastatur (Enter), simulierte Touchbedienung, neutrale Kartennamen und reduzierte Bewegung geprüft. Prüfung mit echtem Screenreader und weiteren Browsern sowie vollständige Kontrast- und Netzwerkprüfung bleiben offen.

GitHub Pages ist auf `main` und `/` eingerichtet. Die öffentliche Adresse `https://phausser.github.io/dackel-memory/` lieferte HTTP 200; 22 Live-Dateien stimmten bytegenau mit den lokalen Dateien überein. Der Browsertest bestand auch auf der Live-Seite.
