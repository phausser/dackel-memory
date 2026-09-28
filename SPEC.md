# Dackel-Memory – Spezifikation

## Ziel und Umfang

Ein deutschsprachiges Memory-Spiel als statische Website mit HTML, CSS und JavaScript. Das Spielfeld besteht aus **6 × 6 Karten**, also **18 Paaren mit 18 unterschiedlichen fotorealistischen Dackelgesichtern**. Die fertige Website wird auf GitHub Pages veröffentlicht.

Diese Spezifikation beschreibt die geplante Umsetzung. Die 18 generierten Bildmotive liegen unter `assets/images/` vor. Spiel und Deployment sind noch zu erstellen.

## Spielablauf

1. Beim Laden wird jedes der 18 Motive zweimal in das Deck aufgenommen. Die 36 Karten werden zufällig gemischt und verdeckt ausgelegt.
2. Ein Klick oder eine Tastaturaktivierung deckt eine Karte auf. Eine zweite, andere Karte vervollständigt den Zug.
3. Stimmen die Motiv-IDs überein, bleiben beide Karten sichtbar und können nicht erneut ausgewählt werden.
4. Stimmen die Motive nicht überein, bleiben sie etwa eine Sekunde sichtbar und werden anschließend wieder verdeckt. Währenddessen ist keine weitere Kartenauswahl möglich.
5. Nach 18 gefundenen Paaren erscheint eine Gewinnmeldung mit der Anzahl der benötigten Züge und einer Möglichkeit, erneut zu spielen.

Ein Zug zählt genau dann, wenn eine zweite gültige Karte aufgedeckt wird. Die Auswahl derselben Karte oder bereits gefundener Karten verändert den Spielstand nicht. Eine Anzeige informiert jederzeit über „Züge“ und „Paare: 0 / 18“.

„Neues Spiel“ mischt alle Karten und setzt den Spielstand zurück. Laufende Verzögerungen werden abgebrochen, damit sie keinen neuen Spielstand verändern.

## Gestaltung

- Hellgrauer Seitenhintergrund, beispielsweise `#F2F3F5`.
- Weiße, quadratische Karten mit leicht gerundeten Ecken, dezentem Schatten und klaren Abständen.
- Rückseite: blau-weißes Schachbrettmuster innerhalb eines weißen Kartenrandes. Das Muster wird mit CSS erzeugt und sieht auf allen Karten identisch aus.
- Vorderseite: ein gut erkennbares, quadratisch zugeschnittenes Dackelgesicht. `object-fit: cover`; Ausschnitt pro Motiv bei Bedarf anpassen.
- Gefundene Paare bleiben gut erkennbar; ein dezenter Rahmen und ein zusätzliches Symbol markieren ihren Status.
- Überschrift „Dackel-Memory“, kurze Spielanleitung, Spielstand, Spielfeld und Schaltfläche „Neues Spiel“ bilden die gesamte Hauptansicht.
- Blaue Akzente für Bedienelemente und deutlich sichtbare Tastatur-Fokusmarkierungen.
- Eine kurze Aufdeckanimation ist optional; bei `prefers-reduced-motion` werden Bewegungen reduziert oder deaktiviert.

## Responsive Layout und Bedienung

Das Spielfeld behält auf Desktop, Tablet und Smartphone seine sechs Spalten und sechs Reihen. Es ist auf großen Bildschirmen zentriert und auf etwa 720 px begrenzt. Auf kleinen Displays passen sich Karten, Abstände und Seitenränder an; ab 320 px Viewportbreite entsteht kein horizontaler Scrollbalken. Vertikales Scrollen ist erlaubt.

Karten sind native Buttons und lassen sich mit Maus, Touch sowie Tab, Enter und Leertaste bedienen. Verdeckte Karten haben neutrale zugängliche Namen wie „Karte 7, verdeckt“; ihr Motiv wird erst beim Aufdecken für assistive Technologien benannt. Statusänderungen und der Gewinn werden über eine zurückhaltende Live-Region mitgeteilt. Fokus und Spielstatus müssen auch ohne Farbwahrnehmung erkennbar sein.

## Bildmaterial

Benötigt werden **18 deutlich unterscheidbare Dackelgesichter**, beispielsweise mit unterschiedlichen Fellfarben, Felllängen, Blickrichtungen und Hintergründen. Innerhalb eines Paares wird exakt dasselbe Bild verwendet. Illustrationen und Comicmotive sind ausgeschlossen.

Zulässige Beschaffungswege:

- Internetfotos mit dokumentierter Erlaubnis beziehungsweise Lizenz für die öffentliche Nutzung und Weiterverteilung im Repository. Keine beliebigen Suchmaschinenbilder übernehmen.
- Selbst erzeugte fotorealistische Bilder; die Erzeugung und gegebenenfalls relevante Nutzungsbedingungen dokumentieren.

Alle Bilder werden lokal unter `assets/images/` gespeichert, ohne Hotlinks oder externe Laufzeitabhängigkeiten. Zielgröße pro Motiv: etwa 400 × 400 px, komprimiertes WebP und möglichst maximal 80 KB. Für jedes Motiv werden ID, Dateiname, kurze deutsche Beschreibung sowie Herkunft in `assets/images/SOURCES.md` dokumentiert. Bei Internetfotos kommen Original-URL, Urheber, Lizenz und notwendiger Attributionstext hinzu. Erforderliche Bildnachweise sind auch auf der Website zugänglich.

Vor Spielbeginn werden die Bilder geladen. Bei einem Ladefehler erscheint eine verständliche Meldung mit erneuter Lademöglichkeit; eine unvollständig bebilderte Runde startet nicht.

## Technische Umsetzung

- Reines HTML, CSS und JavaScript, ohne Framework, Backend, Paketinstallation oder Build-Schritt.
- CSS Grid bildet das 6 × 6-Spielfeld; CSS erzeugt die Kartenrückseiten.
- Eine Motivliste liefert die 18 Bild-IDs, Pfade und Beschreibungen. Jede Karteninstanz erhält eine eigene ID und zusätzlich die gemeinsame Motiv-ID ihres Paares.
- Fisher-Yates mischt das verdoppelte Deck bei jedem Spielstart.
- Ein zentraler Spielzustand verwaltet Karten, erste und zweite Auswahl, gefundene Paare, Zugzahl, Eingabesperre und Rückdeck-Timer.
- Keine Konten, Analysewerkzeuge oder Datenspeicherung. Fortschritt bleibt nur für die aktuelle Runde im Arbeitsspeicher.
- Zielbrowser sind aktuelle Versionen von Chrome, Firefox, Safari und Edge.

Geplante Dateistruktur:

```text
index.html
styles.css
script.js
assets/images/
  dackel-01.webp … dackel-18.webp
  SOURCES.md
README.md
SPEC.md
TODO.md
```

## Veröffentlichung

Zielrepository ist `phausser/dackel-memory`. Vorgesehen ist GitHub Pages direkt aus dem Stammverzeichnis des Veröffentlichungsbranches, ohne Build-Pipeline. Branch und Pages-Einstellungen werden bei der Umsetzung geprüft und eingerichtet.

Die erwartete Projektadresse lautet `https://phausser.github.io/dackel-memory/`, sofern keine abweichende Domain konfiguriert wird. Alle internen Asset-Pfade sind relativ, damit sie unter dem Projekt-Unterpfad funktionieren. Die Veröffentlichung gilt erst nach erfolgreicher Prüfung der tatsächlich erreichbaren Website als abgeschlossen.

## Abnahmekriterien

- Das Spielfeld zeigt exakt 36 Karten in sechs Reihen und sechs Spalten; jedes der 18 Motive kommt exakt zweimal vor.
- Initial sind alle Karten verdeckt und zeigen das blau-weiße Schachbrettmuster auf weißen Karten.
- Aufdecken, Paarvergleich, Zugzählung, Rückdecken und Gewinnmeldung folgen dem beschriebenen Ablauf.
- Schnelle Mehrfachklicks können keine dritte Karte während eines laufenden Vergleichs aufdecken.
- Ein Neustart während eines Rückdeck-Timers führt zu einem sauberen neuen Spiel.
- Alle 18 Bilder sind fotorealistisch, unterscheidbar, lokal vorhanden und mit Herkunft dokumentiert.
- Die Seite ist ab 320 px Breite ohne horizontales Scrollen sowie mit Touch und Tastatur bedienbar.
- Verdeckte Motive werden assistiven Technologien nicht vorzeitig verraten.
- Fehlende Bilder erzeugen eine verständliche Fehlermeldung.
- Die veröffentlichte GitHub-Pages-Seite lädt HTML, CSS, JavaScript und Bilder fehlerfrei und lässt sich vollständig durchspielen.

## Nicht Teil der ersten Version

Schwierigkeitsstufen, Timer, Bestenlisten, Mehrspielermodus, Sound, Benutzerkonten und dauerhafte Speicherung sind nicht vorgesehen.
