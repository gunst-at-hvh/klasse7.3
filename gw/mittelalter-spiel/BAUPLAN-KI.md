# Bauplan für eine KI: Rollen-Adventure „Ein Jahr im Dorf“

Stand 16.11.2026 · gehört zu `KONZEPT.md` · Entwurf, noch kein Code vorhanden

**Wie dieses Dokument zu lesen ist**

- `REGEL … (MUSS/SOLL/KANN)` sind Anweisungen an die KI.
- `> Warum:` sind Kommentare für Menschen. Sie begründen eine Entscheidung und sagen, wo man sie ändert.
- Zuerst `KONZEPT.md` lesen. Bei Widerspruch gilt für Inhalt und Didaktik das Konzept, für Technik dieser Bauplan.
- Die KI arbeitet immer genau **ein** Arbeitspaket aus Abschnitt 10 ab und hört dann auf.

---

## 1. Feste Regeln

REGEL 1.1 (MUSS): Motor und Inhalt sind getrennt. Der Motor kennt kein Mittelalter. Alles Inhaltliche steht im Epochenpaket.

> Warum: Die Lehrkraft will das Muster später für andere Epochen nutzen. Wer im Motor „Bauer“ oder „Zehnt“ schreibt, macht das unmöglich.

REGEL 1.2 (MUSS): Reines HTML, CSS und JavaScript. Keine Bibliotheken, kein Build-Schritt, keine Schriften oder Skripte von fremden Servern.

REGEL 1.3 (MUSS): Das Spiel läuft auch, wenn man `index.html` per Doppelklick öffnet. Deshalb werden Inhalte als `.js`-Dateien eingebunden, nicht per `fetch` aus `.json`.

> Warum: Im PC-Raum der Schule gibt es nicht immer Internet und keinen Server. `fetch` funktioniert bei Doppelklick nicht.

REGEL 1.4 (MUSS): Das Spiel ist ohne jede Bilddatei vollständig spielbar. Fehlt ein Bild, zeichnet der Motor einen beschrifteten Platzhalter.

REGEL 1.5 (MUSS): Keine Sackgassen durch Rätsel. Zu jedem Zeitpunkt gibt es einen Weg zum Ende des Akts. Verlieren kann man nur durch eigenes, wiederholtes Nein (REGEL 1.13), nie durch Zufall, Zeitdruck oder ein übersehenes Ding.

REGEL 1.13 (MUSS): Jede Forderung an die Spielfigur hat eine Antwort „Ich tue es nicht“, ohne Vorbedingung. Jedes Nein erhöht die Zahl `mahnung` um 1 und löst die Folge der Stufe aus (`KONZEPT.md`, Abschnitt 5a). Bei `mahnung==3` endet das Spiel für diese Figur mit Ausgang, Heute-Fenster und Neustart am letzten Knotenpunkt.

REGEL 1.6 (MUSS): Kein Zeitdruck durch Reaktionsgeschwindigkeit, keine Information nur über Farbe, Schrift mindestens 18 px, Tippflächen mindestens 44 px.

REGEL 1.7 (MUSS): Keine historischen Fakten erfinden. Jede Sachangabe im Inhalt bekommt das Feld `beleg` mit `"belegt"`, `"wahrscheinlich"` oder `"erfunden"`. Unklares wird in `OFFEN.md` gesammelt und der Lehrkraft vorgelegt.

REGEL 1.8 (MUSS): Nichts aus bestehenden Spielen übernehmen, weder Figuren noch Namen, Bilder, Rätsel oder Texte.

REGEL 1.9 (MUSS): Vor jedem größeren Bauschritt den Plan in drei Sätzen nennen und auf ein Ja der Lehrkraft warten.

REGEL 1.11 (MUSS): Das Dorf ist ein Modell ohne Ortsnamen und ohne Jahreszahl. Keine Ortsgeschichte einbauen, solange die Lehrkraft das nicht bestellt.

REGEL 1.12 (MUSS): Jede Entscheidung und jeder Knotenpunkt hat ein Heute-Fenster (Abschnitt 4.3). Die Inhalte kommen aus der Tabelle in `KONZEPT.md`, Abschnitt 2a. Die KI erfindet keine neuen Vergleiche, sondern schlägt sie der Lehrkraft vor.

REGEL 1.10 (SOLL): Umfang halten. Ein Akt einer Rolle hat höchstens 5 Räume, 5 Figuren, 30 Gesprächsschritte, 2 Rätsel.

---

## 2. Ordner

```
gw/mittelalter-spiel/
  index.html              Startseite: Rolle wählen, Einstellungen
  motor/
    motor.js              Zustand, Bedingungen, Effekte, Speichern
    buehne.js             Raum zeichnen, Tippen, Platzhalter
    gespraech.js          Gespräche und Auswahl
    stopp.js              Stopps und Losungswörter
    tagebuch.js           Protokoll und Druckansicht
    stil.css
  paket-mittelalter/
    paket.js              Rollen, Anzeigen, Stopps, Lexikon
    mette-akt1.js         ein Akt einer Rolle pro Datei
    henning-akt1.js
    heute.js                alle Heute-Fenster
    bilder/               optional, siehe Abschnitt 6
  demo/index.html         DEMO einer Szene, nur zur Vorführung (siehe REGEL 2.2)
  KONZEPT.md
  BAUPLAN-KI.md
  IDEEN.md                Ideensammlung der Lehrkraft, kein Auftrag (siehe REGEL 2.3)
  OFFEN.md                offene Sachfragen an die Lehrkraft
```

REGEL 2.1 (MUSS): Jede Inhaltsdatei hängt sich an das globale Objekt `PAKET` an und ändert nichts anderes.

REGEL 2.2 (MUSS): `demo/` ist eine fest verdrahtete Vorführung der Idee (Abgabetag über drei Jahre aus zwei Rollen: Nein-Antwort mit drei Stufen, Dorffiguren mit Mitmach-Schwellen, Heute-Fenster). Sie ist kein Teil des Motors. Nicht darauf aufbauen und keinen Code daraus übernehmen, nur die Idee.

REGEL 2.3 (MUSS): `IDEEN.md` ist eine Sammlung von Überlegungen. Verbindlich ist nur, was in `KONZEPT.md` steht. Die KI baut nichts aus `IDEEN.md`, ohne die Lehrkraft zu fragen, und trägt neue Überlegungen der Lehrkraft dort ein statt ins Konzept.

---

## 3. Bausteine des Motors

| Baustein | Aufgabe |
|---|---|
| Zustand | `rolle`, `akt`, `raum`, `marken` (Menge von Namen), `zahlen` (Name → Zahl), `inventar` (Liste), `tagebuch` (Liste) |
| Bühne | zeigt einen Raum mit Bild oder Platzhalter und antippbaren Stellen |
| Werkzeugleiste | drei Zeichen: Ansehen, Benutzen/Nehmen, Reden. Darunter das Inventar. |
| Gespräch | Textkasten mit Sprecher, Vorlese-Knopf, bis zu drei Antworten |
| Anzeigen | zwei bis drei Balken je Rolle, im Paket festgelegt |
| Stopp | hält an, zeigt Wartezimmer, nimmt Losungswort an |
| Tagebuch | schreibt jede Entscheidung mit, Druckansicht in Schwarzweiß |
| Hilfe | drei Stufen je Rätsel |
| Heute-Fenster | Vergleich Damals und Heute mit Frage |
| Speichern | `localStorage`, ein Schlüssel je Paket und Rolle |

---

## 4. Datenformat

### 4.1 Paket

```js
window.PAKET = {
  id: "mittelalter-dorf",
  titel: "Ein Jahr im Dorf",
  rollen: {
    mette: {
      name: "Mette",
      wer: "Tochter eines Bauern",
      ziel: "Deine Familie soll gut über den Winter kommen.",
      anzeigen: [
        { id: "korn",  name: "Korn",  start: 6, max: 10 },
        { id: "tage",  name: "Tage",  start: 4, max: 4 },
        { id: "ruf",   name: "Ansehen im Dorf", start: 5, max: 10 }
      ],
      akte: ["mette-akt1"]
    }
  },
  lexikon: {
    zins: { wort: "Zins", kurz: "Das musst du jedes Jahr an den Herrn abgeben.",
            beleg: "belegt" }
  },
  stopps: {},      // siehe Abschnitt 7
  akte: {}         // wird von den Akt-Dateien gefüllt
};
```

### 4.2 Akt, Raum, Stelle

```js
PAKET.akte["mette-akt1"] = {
  titel: "Der Acker wartet",
  start: "hof",
  raeume: {
    hof: {
      name: "Euer Hof",
      bild: "hof",                         // sucht bilder/hof.webp, sonst Platzhalter
      stellen: [
        { id: "mutter", name: "Mutter", art: "figur",
          flaeche: [10, 40, 18, 45],        // x, y, Breite, Höhe in Prozent des Bildes
          reden: "mutter_morgen" },
        { id: "scheune", name: "Scheune", art: "weg",
          flaeche: [60, 30, 30, 50],
          benutzen: ["geh:scheune"] },
        { id: "huehner", name: "Hühnerstall", art: "ding",
          flaeche: [35, 60, 15, 25],
          ansehen: "Zwei Eier liegen im Stroh.",
          benutzen: [
            { wenn: ["schmied_will_lohn", "!eier_genommen"],
              dann: ["nimm:eier", "+eier_genommen", "log:Ich habe die Zins-Eier genommen."] },
            { sonst: "Die Eier sind für den Zins. Lass sie liegen." }
          ] }
      ]
    }
  },
  gespraeche: {
    mutter_morgen: {
      start: "a",
      schritte: {
        a: { wer: "Mutter",
             kurz: "Vater ist krank. Du musst heute das Feld pflügen.",
             lang: "Dein Vater hat Fieber. Das Sommerfeld muss heute gepflügt werden. Kümmere dich darum.",
             antworten: [
               { text: "Was brauche ich dafür?", weiter: "b" },
               { text: "Ich gehe los.", dann: ["+auftrag_pflug"], weiter: null }
             ] },
        b: { wer: "Mutter",
             kurz: "Den Pflug und zwei Ochsen. Wir haben nur einen.",
             lang: "Den Pflug aus der Scheune und zwei Ochsen. Wir haben nur einen. Frag den Nachbarn.",
             dann: ["+auftrag_pflug", "+weiss_zwei_ochsen"], weiter: null }
      }
    }
  },
  hilfen: {
    pflug: ["Schau dir den Pflug in der Scheune an.",
            "Die Pflugschar ist stumpf. Wer im Dorf arbeitet mit Eisen?",
            "Geh zum Schmied am Anger."]
  },
  ende: { wenn: ["schreiber_fertig"], dann: ["halt:stopp1"] }
};
```

### 4.3 Heute-Fenster

```js
PAKET.heute = {
  abgabe: {
    damals: "Der Herr und die Kirche bekommen einen Teil der Ernte. Niemand fragt dich.",
    heute:  "Heute zahlen Erwachsene Steuern. Ein gewähltes Parlament beschließt sie.",
    frage:  "Was ist gleich? Was ist anders?",
    beleg:  "wahrscheinlich"
  }
};
// Aufruf als Effekt:  "heute:abgabe"
```

Das Fenster zeigt links „Damals“, rechts „Heute“, darunter die Frage. Es schließt mit „Weiter“. Der Aufruf schreibt die Frage ins Tagebuch, damit sie auf dem Ausdruck steht.

REGEL 4.1 (MUSS): Jeder Text für Kinder hat `kurz` (ein Satz, höchstens 90 Zeichen) und `lang` (höchstens 240 Zeichen). Antworten haben höchstens 8 Wörter, je Schritt höchstens 3 Antworten.

REGEL 4.2 (MUSS): `flaeche` ist immer in Prozent des Bildes angegeben, nie in Pixeln.

> Warum: So bleiben die Tippflächen richtig, wenn später ein Bild in anderer Auflösung eingesetzt wird.

---

## 5. Bedingungen und Effekte

Beides sind Listen von kurzen Zeichenketten. Die KI verwendet nur die Formen aus dieser Tabelle.

**Bedingungen** (`wenn`): alle müssen zutreffen.

| Form | Bedeutung |
|---|---|
| `"name"` | Marke `name` ist gesetzt |
| `"!name"` | Marke ist nicht gesetzt |
| `"hat:ding"` | `ding` ist im Inventar |
| `"korn>=3"` | Zahl-Vergleich, erlaubt sind `>=`, `<=`, `==` |

**Effekte** (`dann`): werden der Reihe nach ausgeführt.

| Form | Bedeutung |
|---|---|
| `"+name"` / `"-name"` | Marke setzen / löschen |
| `"nimm:ding"` / `"gib:ding"` | ins Inventar / aus dem Inventar |
| `"korn+=2"` / `"tage-=1"` | Zahl ändern, wird auf 0 bis `max` begrenzt |
| `"geh:raum"` | Raum wechseln |
| `"rede:gespraech"` | Gespräch starten |
| `"log:Text"` | Zeile ins Tagebuch |
| `"halt:stopp"` | Stopp auslösen |
| `"heute:id"` | Heute-Fenster öffnen |

REGEL 5.1 (MUSS): Jede Entscheidung, die eine Zahl ändert oder später abgefragt wird, schreibt eine `log:`-Zeile in der Ich-Form.

> Warum: Aus dem Tagebuch erzählt das Kind am Ende sein Jahr. Ohne Einträge gibt es nichts zu erzählen.

REGEL 5.2 (MUSS): Sinkt `tage` auf 0, endet der Tag mit einer Übergangsszene. Es gibt keine Strafe und kein Spielende.

---

## 6. Grafik-Schnittstelle

REGEL 6.1 (MUSS): Bilder liegen in `paket-…/bilder/` und heißen wie im Feld `bild`, Endung `.webp`. Fehlt die Datei, zeichnet die Bühne eine helle Fläche, den Raumnamen und jede Stelle als Rahmen mit Namen.

| Art | Größe | Hinweis |
|---|---|---|
| Raumbild | 1600 × 900, Querformat 16:9 | wichtige Dinge nicht in den äußeren 5 % |
| Figur im Gespräch | 600 × 800, durchsichtiger Hintergrund | Datei `figur-<id>.webp` |
| Ding im Inventar | 256 × 256, durchsichtiger Hintergrund | Datei `ding-<id>.webp` |
| Lexikonbild | 800 × 600 | |

**Stilvorgabe für alle Bildwerkzeuge:** klare dunkle Umrisslinien, wenige flächige Farben, keine Fotos, keine Schrift im Bild, Tageslicht, Blick leicht von oben. Die Bilder müssen auch in Schwarzweiß gedruckt erkennbar sein.

> Warum: Einheitlicher Stil auch bei wechselnden Werkzeugen, und Raumbilder lassen sich als Arbeitsblatt drucken. Ändern: diese Zeile, und danach alle Bilder neu erzeugen.

REGEL 6.2 (SOLL): Zu jedem Raum eine Zeile `bildauftrag` im Inhalt pflegen, die das Bild für ein Bildwerkzeug beschreibt, einschließlich der Dinge, die antippbar sein müssen.

REGEL 6.3 (MUSS): Nach dem Einsetzen eines Bildes die Flächen prüfen: Ein Prüfmodus (`?flaechen=1`) blendet alle Rahmen über dem Bild ein.

---

## 7. Stopps und Losungswörter

```js
PAKET.stopps.stopp3 = {
  titel: "Dorfversammlung",
  warten: "Halt. Geh zu deiner Gruppe. Ihr entscheidet gemeinsam.",
  wartezimmer: ["lexikon", "zusatz:netz-zeichnen"],
  fragen: [                                 // Vorlage für Kahoot oder Handzeichen
    { an: "ritterhaus", text: "Wie bezahlt ihr die Sondersteuer?",
      wahl: ["Abgabe erhöhen", "Neuen Dienst fordern", "Selbst Schulden machen"] },
    { an: "kirche", text: "Was predigt ihr am Sonntag?",
      wahl: ["Gehorsam", "Barmherzigkeit", "Das Recht der Bauern"] }
  ],
  losungen: {
    "HAFER":  ["+herr_gibt_nach"],
    "DISTEL": ["+neue_last", "+riegel_unrecht"],
    "GLOCKE": ["+neue_last", "+riegel_unrecht", "+riegel_rechtfertigung"]
  },
  sprung: "WEITER"                           // bringt ein langsames Kind zum Stopp
};
```

REGEL 7.1 (MUSS): Losungswörter sind kurze deutsche Hauptwörter ohne Umlaute. Groß- und Kleinschreibung ist egal.

REGEL 7.2 (MUSS): Je Stopp höchstens sechs Losungen. Für die Lehrkraft erzeugt `stopp.js` unter `?lehrkraft=1` eine druckbare Tabelle „Ergebnis der Klasse → Losungswort“.

REGEL 7.3 (MUSS): Die fünf Riegel aus dem Konzept sind Marken `riegel_not`, `riegel_unrecht`, `riegel_einigkeit`, `riegel_rechtfertigung`, `riegel_gelegenheit`. Der Ausgang „Aufruhr“ verlangt alle fünf und die Marke `funke`.

REGEL 7.4 (KANN): Aus `fragen` lässt sich mit einem Kahoot-Werkzeug ein Quiz oder eine Umfrage erzeugen. Das Spiel selbst spricht nie mit Kahoot.

> Warum: Kein Server, keine Konten, keine Abhängigkeit von einem Dienst. Die Verbindung zwischen Abstimmung und Spiel ist ein Wort an der Tafel.

---

## 8. Speichern, Tagebuch, Druck

- Speicherschlüssel: `<paket.id>:<rolle>`. Gespeichert wird nach jedem Effekt.
- Startseite zeigt „Weiterspielen“ und „Neu beginnen“ (mit Nachfrage).
- Tagebuch-Ansicht: Rolle, Ziel, alle `log`-Zeilen nach Akten, Endstand der Anzeigen, drei Leerzeilen für den Urteilssatz.
- Druck: Schwarzweiß, eine A4-Seite, keine Hintergrundbilder.

REGEL 8.1 (MUSS): Es werden keine Namen von Kindern gespeichert oder übertragen. Das Feld „Name“ steht nur auf dem Ausdruck als leere Linie.

---

## 9. Sprache und Hilfen

REGEL 9.1 (MUSS): Du-Form, Gegenwart, ein Gedanke pro Satz, keine Nebensatzketten.

REGEL 9.2 (MUSS): Jedes Fachwort steht im Lexikon und ist im Text antippbar. Schreibweise im Text: `[[zins]]`.

REGEL 9.3 (MUSS): Vorlesen über `speechSynthesis` mit deutscher Stimme. Fehlt die Funktion, wird der Knopf ausgeblendet.

REGEL 9.4 (MUSS): Jedes Rätsel hat in `hilfen` genau drei Stufen: Hinweis, deutlicher Hinweis, Lösung.

REGEL 9.5 (SOLL): Schalter „kurze Texte / lange Texte“ auf der Startseite, Standard ist kurz.

---

## 10. Arbeitspakete

Reihenfolge einhalten. Nach jedem Paket: Abnahme prüfen, Ergebnis der Lehrkraft zeigen, auf Rückmeldung warten.

| Nr. | Inhalt | Abnahme |
|---|---|---|
| AP0 | **Papierfassung** von Mette Akt 1: Rollenkarte, 8 Szenenkarten, Entscheidungskarten, Bogen für die Lehrkraft. Schwarzweiß, A4. | In 15 Minuten ohne Gerät spielbar. |
| AP1 | Liste `OFFEN.md` aus den `[PRÜFEN]`-Stellen des Konzepts, mit Vorschlag, wo man nachschlägt. | Jede Stelle hat eine Zeile. |
| AP2 | Motor: Zustand, Bedingungen, Effekte, Speichern. Ohne Oberfläche, mit kleinen Selbsttests. | Alle Formen aus Abschnitt 5 getestet. |
| AP3 | Bühne mit Platzhaltern, Werkzeugleiste, Inventar. | Raum wechseln, Ding nehmen, Ding benutzen. |
| AP4 | Gespräche, kurz/lang, Lexikon, Vorlesen. | Ein Gespräch mit Verzweigung läuft. |
| AP5 | Inhalt: Mette Akt 1 vollständig nach Konzept Abschnitt 11. | Von Anfang bis Stopp 1 durchspielbar, mit und ohne Zins-Eier. |
| AP6 | Hilfe in drei Stufen, Tagebuch, Druckansicht. | Ausdruck auf einer Seite. |
| AP7 | Stopps, Losungswörter, Wartezimmer, Tabelle für die Lehrkraft. | Jede Losung führt zu einem anderen Zustand. |
| AP8 | Inhalt: Henning Akt 1 als Spiegel. | Die Schmiede-Szene kommt in beiden Akten vor. |
| AP9 | Inhalt: Alheyd, Tyle, Jakob Akt 1. | Jede Rolle erreicht Stopp 1. |
| AP10 | Akt 2 und 3, Dorfversammlung, Riegel, Ausgänge. | Jeder Ausgang aus Konzept 6.4 ist erreichbar. |
| AP11 | Bilder einsetzen, Flächen prüfen. | Prüfmodus zeigt keine verrutschte Fläche. |

> Warum AP0 zuerst: Eine Papierfassung kostet eine Stunde und zeigt, ob Rollen, Druck und Stopps bei der Klasse ankommen. Erst danach lohnt sich das Programmieren.

---

## 11. Prüfen

REGEL 11.1 (MUSS): Nach jedem Paket mit einem Testbrowser im Handy-Format (390 × 780) und im PC-Format (1366 × 768) prüfen: keine Fehler in der Konsole, Akt von Anfang bis Ende durchspielbar.

REGEL 11.2 (MUSS): Für jeden Akt ein automatischer Durchlauf, der jeden Weg mindestens einmal geht und meldet, falls ein Zustand ohne Ausweg entsteht.

REGEL 11.3 (MUSS): Im Bericht trennen: im Testbrowser geprüft, auf echtem Gerät geprüft, mit Kindern erprobt. Nichts davon gleichsetzen.

REGEL 11.5 (MUSS): Balance-Probe. Ein automatischer Durchlauf spielt die fünf Spielweisen aus `KONZEPT.md`, Abschnitt 5a, und prüft, dass jede beim dort genannten Ausgang landet. Nach jeder Änderung an Zahlen oder Folgen neu laufen lassen.

REGEL 11.4 (MUSS): Texte zählen lassen. Ein Skript meldet jeden Text, der die Grenzen aus REGEL 4.1 überschreitet.

---

## 12. Häufige Fehler, die zu vermeiden sind

| Fehler | Stattdessen |
|---|---|
| Der Motor enthält Wörter aus der Epoche | alles ins Paket |
| Ein Rätsel ist nur ein Suchbild | Lösung muss über eine andere Figur führen |
| Eine Entscheidung ist „richtig“ oder „falsch“ | jede Wahl hat einen Preis und einen Nutzen |
| Lange Erklärtexte | eine Figur sagt es in einem Satz, der Rest steht im Lexikon |
| Aufruhr als Heldengeschichte | selten, teuer, mit Folgen (Konzept 6.4) |
| Forderung ohne Nein-Antwort | „Ich tue es nicht“ immer anbieten, Folgen nach Konzept 5a |
| Nein ohne spürbare Folge, oder Nein führt sofort zum Ende | drei Stufen, erst die dritte beendet das Spiel |
| Ritter als Bösewicht | er hat eigenen Druck und eigene Angst |
| Mehr Umfang als bestellt | genau ein Arbeitspaket, dann stoppen |
| Sachangaben ohne Beleg | Feld `beleg` setzen, Unklares in `OFFEN.md` |
| Szene ohne Bezug zu heute | Heute-Fenster ergänzen, sonst ist die Szene nicht fertig |
| Heute-Fenster wertet („heute ist alles besser“) | Unterschied und Gemeinsamkeit nennen, Frage offen lassen |
