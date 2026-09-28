# Dackel-Memory – Umsetzungsplan

Die Aufgaben folgen der [Spezifikation](SPEC.md). Planung und Erzeugung der 18 Bildmotive sind abgeschlossen; Implementierung und Veröffentlichung stehen aus.

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

- [ ] `index.html`, `styles.css` und `script.js` anlegen und mit relativen Pfaden verbinden.
- [ ] Deutsche Überschrift, Spielanleitung, Zug- und Paaranzeige sowie „Neues Spiel“ einbauen.
- [ ] Hellgrauen Hintergrund und zentriertes responsives Spielfeld mit dauerhaft sechs Spalten umsetzen.
- [ ] Weiße quadratische Karten mit blau-weißem CSS-Schachbrettmuster erstellen.
- [ ] Bildvorderseiten und erkennbare Zustände für verdeckte, offene und gefundene Karten gestalten.
- [ ] Sichtbaren Tastaturfokus, native Buttons und reduzierte Animationen berücksichtigen.
- [ ] Ladeanzeige, Bildfehler mit Wiederholungsmöglichkeit und Gewinnmeldung ergänzen.
- [ ] Erforderliche Bildnachweise auf der Website zugänglich machen.

## 4. Spiellogik implementieren

- [ ] Motivliste mit 18 IDs, lokalen Bildpfaden und deutschen Beschreibungen erstellen.
- [ ] Bilder vorladen und den Spielstart erst nach erfolgreichem Laden freigeben.
- [ ] 36 Karteninstanzen aus 18 Paaren erzeugen und mit Fisher-Yates mischen.
- [ ] Zentralen Spielzustand und Darstellung miteinander verbinden.
- [ ] Erste und zweite Auswahl verarbeiten; dieselbe sowie bereits gefundene Karten ignorieren.
- [ ] Nach der zweiten gültigen Auswahl den Zugzähler erhöhen und Motive vergleichen.
- [ ] Treffer offen halten und Paarzähler aktualisieren.
- [ ] Fehlpaare nach etwa einer Sekunde verdecken und bis dahin weitere Auswahlen sperren.
- [ ] Nach 18 Paaren Gewinnmeldung mit Zugzahl anzeigen.
- [ ] Neustart inklusive Timer-Abbruch, neuer Mischung und vollständigem Zurücksetzen umsetzen.
- [ ] Zugängliche Kartennamen und Live-Statusmeldungen mit dem Zustand aktualisieren.

## 5. Lokal prüfen

- [ ] Seite über einen lokalen statischen HTTP-Server öffnen; Vorgehen in `README.md` dokumentieren.
- [ ] Deck prüfen: 36 Karten, 18 Motiv-IDs, jede Motiv-ID genau zweimal.
- [ ] Treffer, Fehlpaar, Doppelklick auf dieselbe Karte und schnelle Mehrfachklicks prüfen.
- [ ] Neustart bei keiner, einer und zwei offenen Karten sowie während eines Rückdeck-Timers prüfen.
- [ ] Eine vollständige Runde inklusive Gewinnmeldung und anschließendem Neustart durchspielen.
- [ ] Ausfall einer Bilddatei prüfen: Fehlermeldung, kein unvollständiger Spielstart, erneutes Laden möglich.
- [ ] Layout bei 320, 375, 768 und 1280 px Breite auf sechs Spalten und fehlenden horizontalen Überlauf prüfen.
- [ ] Touchbedienung, Tastaturbedienung, Fokus, Screenreader-Beschriftungen und reduzierte Bewegung prüfen.
- [ ] Kontraste und Erkennbarkeit gefundener Paare ohne alleinige Farbcodierung prüfen.
- [ ] In verfügbaren Zielbrowsern testen und nicht geprüfte Browser in der Übergabe benennen.
- [ ] Browserkonsole und Netzwerkanfragen auf Fehler, fehlende Assets und unnötige externe Abhängigkeiten prüfen.

## 6. GitHub Pages veröffentlichen

- [ ] Repository-Zugriff, Veröffentlichungsbranch und bestehende Pages-Konfiguration prüfen.
- [ ] `README.md` um Spielbeschreibung, lokalen Start, Bildnachweise und Deployment-Ablauf ergänzen.
- [ ] Fertige Website und lokale Bilddateien in den Veröffentlichungsbranch übertragen.
- [ ] GitHub Pages für die Veröffentlichung aus dem Branch-Stammverzeichnis einrichten.
- [ ] Erfolgreiche Veröffentlichung abwarten und tatsächliche öffentliche URL feststellen.
- [ ] Auf der Live-Seite Asset-Pfade unter `/dackel-memory/`, Bildladeverhalten und mobile Darstellung prüfen.
- [ ] Auf der Live-Seite eine komplette Runde und einen Neustart testen.
- [ ] Bestätigte Live-URL in `README.md` eintragen und erledigte Aufgaben abhaken.
