# Dackel-Memory

Deutschsprachiges Memory mit 24 Karten. Jede Runde wählt zufällig 12 der 18 generierten Dackelporträts aus. Auf Smartphones erscheinen vier Spalten, ab 600 px sechs. Treffer bleiben offen, Fehlpaare werden nach einer Sekunde verdeckt. „Neues Spiel“ wählt neue Motive und setzt die Runde zurück.

## Lokal spielen

Im Projektverzeichnis starten:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Dann http://127.0.0.1:8000 öffnen. Kein Build, keine Paketinstallation und keine externen Laufzeitabhängigkeiten. Karten sind mit Touch, Maus, Tab, Enter und Leertaste bedienbar.

## Bilder

Alle 18 Porträts wurden mit dem integrierten OpenAI-Bildgenerator erzeugt. Dateien, Beschreibungen und Prompts: [Bildnachweise](assets/images/SOURCES.md). Die Bilder liegen lokal als WebP mit 400 × 400 Pixeln vor.

## Prüfung

Am 28.09.2026 in lokalem Headless-Chromium geprüft: 24 Karten mit genau 12 Paaren, wechselnde Motivauswahl, vollständiger Gewinn, ignorierte Doppel- und Mehrfachklicks, Rückdeckverzögerung, Neustarts bei null/einer/zwei offenen Karten, Bildladefehler und Wiederholung, Enter-Aktivierung, simulierte Touchbedienung und reduzierte Bewegung. Layout bei 320, 375, 768 und 1280 px ohne horizontalen Überlauf; mobile Ansicht zusätzlich visuell geprüft. Verdeckte Karten tragen neutrale zugängliche Namen. Keine JavaScript-Ausnahmen im Test.

Firefox, Safari, Edge, echte Mobilgeräte und ein Screenreader wurden noch nicht geprüft. Vertikales Scrollen kann abhängig von Bildschirmhöhe und Schriftgröße nötig sein.

Der Browsertest benötigt Node.js (mit globalem WebSocket), den lokalen Server sowie einen separaten Chromium-Prozess:

```sh
chromium --headless --disable-gpu --remote-debugging-port=9222 --user-data-dir=/tmp/dackel-memory-test about:blank
node tests/browser.mjs
```

## Veröffentlichung

Noch nicht auf GitHub Pages veröffentlicht. Vorgesehen: Repository `phausser/dackel-memory`, Branch `main`, Stammverzeichnis `/`, ohne Build-Pipeline. In GitHub unter Settings → Pages „Deploy from a branch“ wählen, `main` und `/ (root)` einstellen. Anschließend die bereitgestellte URL und alle Assets im Projekt-Unterpfad prüfen.

Die erwartete, noch nicht bestätigte Adresse ist https://phausser.github.io/dackel-memory/.

Umfang und Fortschritt: [SPEC.md](SPEC.md) und [TODO.md](TODO.md).
