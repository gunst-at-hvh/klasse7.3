# Anleitung für eine KI: Ortserkundung als Karten-Schnitzeljagd nachbauen

Stand: 16.11.2026 · Referenz: Repo `gunst-at-hvh/klasse7.3`, Ordner `gw/ausflug-rudow/`

**Wie dieses Dokument zu lesen ist**

- Zeilen mit `REGEL` sind Anweisungen an die KI. `MUSS` ist verbindlich, `SOLL` ist der Normalfall, `KANN` ist freiwillig.
- Absätze, die mit `> Warum:` beginnen, sind Kommentare für Menschen. Sie erklären eine Entscheidung und sagen, wo man sie ändert. Die KI liest sie als Begründung, nicht als Befehl.
- Wenn eine Angabe fehlt, fragt die KI nach. Sie erfindet nichts, vor allem keine historischen Fakten und keine Orte.

---

## 1. Was gebaut wird

Eine Lehrkraft geht mit einer Klasse an einen Ort (Beispiel: Rudower Altstadt). Die Kinder suchen 3 bis 6 Stationen auf einer Umrisskarte, tippen das richtige Gebäude an, beantworten kurze Fragen und machen ein Foto.

Ergebnis sind genau diese Dateien in einem eigenen Ordner:

| Datei | Zweck |
|---|---|
| `index.html` | die ganze App in einer Datei (HTML, CSS, JavaScript) |
| `<ort>-daten.json` | fest eingebaute Kartendaten und Zuordnung der Stationen |
| `gruppenblatt.pdf` | A4-Blatt zum Kopieren, Vorderseite Aufgaben, Rückseite Karte |
| `bau.py` | Skript, das das PDF aus denselben Kartendaten erzeugt |

REGEL 1.1 (MUSS): Für einen neuen Ort wird der Referenzordner kopiert und angepasst. Die App wird nicht neu erfunden.

> Warum: Die Referenz ist an einer echten Klasse ausgerichtet und hat viele kleine Korrekturen hinter sich. Ein Neubau wiederholt die Fehler aus Abschnitt 9.

---

## 2. Was die Lehrkraft liefern muss

REGEL 2.1 (MUSS): Vor dem Bauen diese Angaben einholen. Fehlende Angaben in einer einzigen Nachricht erfragen.

1. Ort und ungefährer Kartenausschnitt
2. Startpunkt (zum Beispiel ein Bahnhof)
3. Stationen: Name, wie er vor Ort heißt, und woran man ihn in OpenStreetMap erkennt
4. Pro Station 1 bis 2 Fragen und ein Foto-Auftrag
5. Bewegungsradius: Was soll drin sein, was draußen (große Straßen, Läden)?
6. Fach, Klasse, Regeln fürs Blatt, Treffpunkt-Felder

REGEL 2.2 (MUSS): Bei aufwendigen Bauschritten erst kurz den Plan nennen und auf ein Ja warten.

REGEL 2.3 (SOLL): Mehrere Änderungswünsche in einem Durchgang umsetzen und einmal neu bauen.

> Warum: Im Rudow-Projekt wurde das Blatt rund zehnmal einzeln neu gebaut. Das kostet Zeit und Rechenkontingent.

---

## 3. Feste Regeln für die App

REGEL 3.1 (MUSS): Eine einzige HTML-Datei, reines JavaScript, keine Bibliotheken, keine Schriften oder Skripte von fremden Servern.

> Warum: Die Seite läuft über GitHub Pages auf Schüler-Handys. Jede fremde Abhängigkeit kann ausfallen oder vom Schulnetz gesperrt sein. Ändern: nur, wenn ein Kartendienst wie MapLibre bewusst gewollt ist (siehe Abschnitt 5, Weg D).

REGEL 3.2 (MUSS): Die Karte wird selbst auf ein Canvas gezeichnet. Verschieben, Zoomen und Zwei-Finger-Zoom sind selbst programmiert.

REGEL 3.3 (MUSS): Die Kartendaten liegen als JSON-Datei im selben Ordner. Die App lädt zur Laufzeit keine Daten von Overpass, außer als letzter Notweg.

> Warum: Der erste Entwurf lud live von Overpass. Das dauerte bis zu einer Minute und schlug oft fehl. Mit der eingebauten Datei lädt die Seite in unter einer Sekunde.

REGEL 3.4 (MUSS): Standard ist Schwarzweiß. Farbe ist nur ein Umschalter. Keine Information darf allein an Farbe hängen.

> Warum: Die Lehrkraft kopiert schwarzweiß, und App und Blatt sollen gleich aussehen.

REGEL 3.5 (MUSS): Alles bleibt auf dem Handy (`localStorage`). Keine Anmeldung, kein Server, kein Hochladen.

> Warum: Datenschutz bei Kindern und kein Betrieb eines Servers. Nachteil: Ergebnisse lassen sich nicht einsammeln. Siehe Abschnitt 10.

REGEL 3.6 (MUSS): Texte für Kinder sind kurz, in der Du-Form, ein Gedanke pro Satz. Das Schlagwort der Station steht fett.

REGEL 3.7 (MUSS): Standort, Kompass und Vollbild sind Zusätze. Die App funktioniert vollständig ohne sie. Ein Knopf, den das Gerät nicht unterstützt, wird ausgeblendet.

---

## 4. Datenformat der Kartendatei

```json
{
  "v": 1,
  "bbox": [süd, west, nord, ost],
  "features": [
    { "k": "b", "i": "w129764630", "n": "Dorfkirche Rudow", "h": "",
      "r": [[[52.41836, 13.49772], [52.41840, 13.49790]]] }
  ],
  "zuordnung": { "kirche": { "key": "w129764630" }, "teich": { "pt": [x, y] } }
}
```

| Feld | Bedeutung |
|---|---|
| `k` | Art: `b` Gebäude, `h` Straße oder Weg, `w` Wasser, `g` Grünfläche, `r` Schiene, `s` Bahnhof (Start), `p` benannter Punkt |
| `i` | OSM-Kennung: `n`, `w` oder `r` plus Nummer |
| `n` | Name, sonst leer |
| `h` | Wert von `highway`, sonst leer |
| `r` | Liste von Ringen, jeder Ring eine Liste `[lat, lon]`, auf 5 Stellen gerundet |
| `zuordnung` | Stations-Kennung → `key` (ein Feature) oder `pt` (ein Punkt in Metern) |

REGEL 4.1 (MUSS): Dieses Format nicht ändern. App und PDF-Skript lesen beide dieselbe Datei.

Umrechnung in Meter in der App: Mittelpunkt der `bbox` ist der Nullpunkt, `x = (lon − LON0) · 111320 · cos(LAT0)`, `y = −(lat − LAT0) · 110540`. Norden ist oben, deshalb das Minus.

---

## 5. Kartendaten beschaffen

REGEL 5.1 (MUSS): Zuerst prüfen, ob die eigene Umgebung Overpass erreicht (ein Versuch). Wenn nicht: nicht weiter probieren, sondern einen der Wege unten nehmen.

> Warum: In der Entstehungssitzung war Overpass aus der KI-Umgebung gesperrt, und der eingebaute Browser bekam Fehler 406. Mehrere Umgehungsversuche haben nur Zeit gekostet.

**Weg A, von Hand (so entstand die Referenz):**

1. `index.html?lehrer=1` öffnen. Der Knopf „Abfrage kopieren“ liefert die Abfrage unten.
2. Auf overpass-turbo.eu die Karte auf den Ausschnitt schieben, Abfrage einfügen, ausführen.
3. Exportieren als Rohdaten (JSON, nicht GeoJSON).
4. In der Lehrer-Ansicht „Datei einlesen“. Stationen, die nicht am Namen erkannt wurden, antippen und zuordnen.
5. „Daten als Datei speichern“ und die Datei in den Ordner im Repo legen.

```
[out:json][timeout:40];(
 way["building"]({{bbox}});
 way["highway"]({{bbox}});
 way["natural"="water"]({{bbox}}); relation["natural"="water"]({{bbox}}); way["waterway"]({{bbox}});
 way["leisure"~"park|garden|playground|pitch|common"]({{bbox}});
 way["landuse"~"grass|forest|meadow|recreation_ground|village_green|cemetery"]({{bbox}});
 way["natural"~"wood|scrub|grassland"]({{bbox}});
 way["railway"~"subway|rail|light_rail"]({{bbox}});
 nwr["railway"="station"]({{bbox}}); nwr["public_transport"="station"]({{bbox}});
 nwr["name"~"NAMEN|DER|STATIONEN",i]({{bbox}});
);out geom;
```

**Weg B, Skript:** Ein kleines Python- oder Node-Skript holt dieselbe Abfrage und schreibt die JSON-Datei. Läuft auf jedem Rechner mit freiem Internet.

**Weg C, GitHub Action:** Dasselbe Skript läuft im Repo, sobald eine Konfigurationsdatei geändert wird, und legt die Datendatei selbst ab.

**Weg D, anderer Aufbau:** Kartenkacheln mit einer Bibliothek wie MapLibre. Braucht keinen Datenschritt, bricht aber REGEL 3.1 und 3.3.

REGEL 5.2 (SOLL): Den Ausschnitt klein halten, etwa 1 bis 2 km Kantenlänge. Die Rudow-Datei hat 1,3 MB und rund 7000 Objekte, das ist die Obergrenze.

REGEL 5.3 (MUSS): Nach dem Laden prüfen, dass jede Station einem Objekt zugeordnet ist und der Startpunkt gefunden wurde.

---

## 6. Einstellungen in der App

Alles Ortsabhängige steht oben in `index.html` im Block `CONFIG`:

```js
const CONFIG = {
  bbox: [52.405, 13.475, 52.425, 13.510],          // süd, west, nord, ost
  start: { kurz: 'U Rudow', match: /rudow/i },     // Bahnhof, per Name gesucht
  orte: [
    { id: 'kirche', titel: 'die alte Dorfkirche', schlag: 'Dorfkirche', kurz: 'Dorfkirche',
      match: /dorfkirche/i, tippe: 'Tippe auf das Gebäude.',
      fragen: ['Woraus sind die alten Wände der Kirche gebaut?'],
      foto: 'Mach ein Foto von der Kirche.' }
  ],
  hinweisNach: 3,        // falsche Tipps bis zum Suchkreis
  hinweisRadius: 150,    // Meter
  bereich: { lat: 52.41791, lon: 13.49630, r: 145 },   // Bewegungsradius
  overpass: [ /* drei Spiegel-Server, nur Notweg */ ]
};
```

REGEL 6.1 (MUSS): Für einen neuen Ort auch die Namen der Speicher-Schlüssel ändern (`rudow-spiel-v1`, `rudow-daten-v1`) und den Dateinamen der Datendatei.

> Warum: Sonst mischen sich die Antworten zweier Ausflüge auf demselben Handy.

---

## 7. Verhalten der App

1. **Aufgabe:** Oben steht „Aufgabe 1 von 5: Finde die alte **Dorfkirche**. Tippe auf das Gebäude.“
2. **Tippen:** Treffer zählt, wenn der Tipp in der Fläche liegt oder höchstens 16 Bildschirmpunkte daneben. Falscher Tipp gibt eine kurze Rückmeldung. Nach 3 falschen Tipps erscheint ein gestrichelter Suchkreis.
3. **Blatt zur Station:** Fragen als Textfelder, Foto über `<input type="file" capture="environment">`. Fotos werden auf höchstens 720 Pixel verkleinert und als JPEG gespeichert.
4. **Kreise 1 bis 5 oben:** Schwarz ist die gewählte Station. Grün heißt gefunden. Der Haken kommt erst, wenn ein Foto da ist und jede Frage eine Antwort hat. Jede Station ist jederzeit anwählbar, auch vor der Reihe.
5. **Bewegungsradius:** dünner, gestrichelter roter Kreis aus `CONFIG.bereich`.
6. **Standort:** Punkt mit Genauigkeitsring. Wenn das Gerät eine Blickrichtung liefert, zusätzlich ein Sichtkegel, sonst nur der Punkt.
7. **Mein Blatt:** druckbare Übersicht in Schwarzweiß mit Antworten und Fotos.
8. **Lehrer-Ansicht (`?lehrer=1`):** Abfrage kopieren, Datei einlesen, Stationen zuordnen, Datendatei speichern.

> Warum Punkt 4: Die Lehrkraft wollte, dass „entdeckt“ und „fertig bearbeitet“ zwei sichtbare Stufen sind. Ändern in `updateHeader` und `complete`.

> Warum kein Wort „Start“ auf der Karte: Die Lehrkraft trägt den Start mit den Kindern von Hand ein. Ändern in der Zeile mit `CONFIG.start.kurz.toUpperCase()`.

---

## 8. Das Papierblatt

Erzeugt mit Python und `reportlab`, Schrift DejaVu Sans, aus derselben Datendatei.

**Vorderseite, A4 hoch:**
- Überschrift in einer Zeile, darunter „Gruppenblatt · Fach“
- Felder Gruppe und Namen
- Grundregeln: die Regeln der Lehrkraft plus eine leere Zeile
- Kasten „Treffpunkt am Ende“ mit Uhrzeit, Ort, Notfallkontakt
- QR-Code oben rechts, 15 mm, mit Adresse daneben
- runde Karte, 78 mm, Gebäude grau, Wasser schraffiert, Straßen weiß mit dunklem Rand
- Straßennamen entlang der Straße, auf weißem Feld
- Bewegungsradius schwarz gestrichelt, mit Legende „Bis hierhin dürft ihr gehen.“
- Nordpfeil rechts unten neben der Karte, Maßstab 100 m
- pro Station: Nummer, Titel, Kästchen „gefunden / Antworten / Foto“, Foto-Auftrag, Fragen mit je einer Schreiblinie (keine Kästen)

**Rückseite, A4 quer:**
- Überschrift „Unser Weg durch …“ und der Auftrag der Lehrkraft
- große Karte, etwa 340 m breit, Straßennamen, Bewegungsradius

REGEL 8.1 (MUSS): Die Stationen werden auf keiner Karte markiert. Die Kinder sollen sie finden.

REGEL 8.2 (MUSS): Nach jedem Bau das PDF als Bild rendern und ansehen. Den QR-Code aus dem Bild auslesen und die Adresse vergleichen.

REGEL 8.3 (SOLL): Den Bewegungsradius berechnen, nicht schätzen. Abstand der Kreismitte zu den großen Straßen und zu ausgeschlossenen Gebäuden messen, alle Stationen mit mindestens 20 m Rand einschließen. App und Blatt bekommen dieselben Werte.

---

## 9. Bekannte Fallen

| Falle | Lösung |
|---|---|
| Overpass ist aus der KI-Umgebung nicht erreichbar | einmal versuchen, dann Abschnitt 5 |
| Karte lädt live sehr langsam | Daten fest einbauen (REGEL 3.3) |
| `append()` mit Listen zeigt „[object HTMLDivElement]“ | Hilfsfunktion, die Listen vorher flach macht |
| Schraffur über einer Farbfläche verdeckt die Farbe | bei „gefunden“ deckende Farbe, keine Schraffur darüber |
| Kompass liefert nichts | Ereignisse immer anmelden, `requestPermission` nur zusätzlich und nur nach einem Tipp (iPhone) |
| Vollbild-Knopf ohne Wirkung auf dem iPhone | Knopf ausblenden, wenn die Funktion fehlt |
| Straßennamen im PDF unsichtbar | keine Umrandung per Textmodus, sondern weißes Feld hinter den Text |
| Textersetzung trifft die falsche Stelle | vor dem Ersetzen prüfen, dass die Fundstelle eindeutig ist, danach das Ergebnis ansehen |
| Testserver läuft nicht mehr | vor jedem Test prüfen, sonst zeigt der Screenshot einen alten Stand |
| Historische Angaben widersprechen sich | Quelle nennen, Unsicherheit dazuschreiben, nichts glätten |

---

## 10. Offene Schwächen der Referenz

Diese Punkte sind bekannt und nicht gelöst. Eine KI, die weiterbaut, behebt sie in dieser Reihenfolge und fragt vorher.

1. **Karte braucht bei jedem Laden Internet.** Die Datendatei wird jedes Mal neu geholt. Lösung: auf dem Gerät ablegen (Cache oder Service Worker).
2. **Keine Sicherung.** Antworten und Fotos liegen nur im Browser. Lösung: Knopf „Sichern“, der alles als eine Datei speichert.
3. **Nicht auf echten Handys im Gelände geprüft.** Standort, Kompass, Foto und Vollbild wurden nur im Testbrowser geprüft.
4. **Fragen stehen doppelt**, in der App und auf dem Blatt. Die Lehrkraft entscheidet, was gilt.

---

## 11. Prüfen und Abgeben

REGEL 11.1 (MUSS): Vor dem Hochladen mit einem Testbrowser (Playwright, Handy-Format 390 × 780) prüfen:

- Seite lädt ohne Fehler in der Konsole
- Aufgabentext stimmt
- Tipp auf die richtige Station öffnet das Blatt, Tipp daneben nicht
- Foto lässt sich einfügen und bleibt nach dem Neuladen erhalten
- Bewegungsradius ist sichtbar und liegt richtig

REGEL 11.2 (MUSS): Im Bericht an die Lehrkraft trennen, was geprüft wurde und was nicht. „Im Testbrowser geprüft“ ist nicht „auf dem Handy geprüft“.

REGEL 11.3 (MUSS): Hochladen nur, wenn die Lehrkraft es verlangt hat oder es zum Auftrag gehört. Eine Änderung, eine Commit-Nachricht in einem Satz.

REGEL 11.4 (SOLL): Skript und PDF des Blatts mit ins Repo legen.

> Warum: In der Entstehungssitzung lagen beide nur in der Arbeitsumgebung der KI und wären mit der Sitzung verloren gewesen.
