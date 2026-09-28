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

Für denselben Test auf der veröffentlichten Seite:

```sh
DACKEL_BASE_URL=https://phausser.github.io/dackel-memory/ node tests/browser.mjs
```

## Veröffentlichung

Die veröffentlichte Seite ist erreichbar unter **https://phausser.github.io/dackel-memory/**. GitHub Pages baut aus dem Branch `main` und dem Stammverzeichnis `/`, ohne Build-Pipeline. Am 28.09.2026 wurden alle 22 veröffentlichten Dateien mit den lokalen Dateien bytegenau verglichen. Die Live-Seite bestand außerdem den Browsertest einschließlich einer vollständigen Runde, Neustart, Bildladefehler und mobiler Darstellung.

Umfang und Fortschritt: [SPEC.md](SPEC.md) und [TODO.md](TODO.md).
