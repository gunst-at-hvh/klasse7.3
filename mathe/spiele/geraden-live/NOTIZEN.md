# Geraden-Live – Notizen

## Aktuelle Wertung (Stand 18.10.2026)

| Teil | max. | volle Punkte bis | 0 Punkte ab |
|---|---|---|---|
| 📍 Anker (Abstand 1. Punkt zur Lösung) | 30 | nur exakt ≤ 0,03 (bis 0,3 → 28) | 1,8 |
| 📏 Lage (Ø-Abstand entlang der Lösung) | 35 | 0,03 (exakt) | 2,8 |
| 📐 Steigung (Winkel) | 35 | nur exakt ≤ 0,2° (bis 4° → 32) | 15° |
| 🎯 Volltreffer (Lösung ganz im dicken Strich, max. 0,3) | +10 | | |
| ⚡ Zeitbonus (ab 50 P) | bis +15 | | |
| 💎 Perfekt (Volltreffer, überall max. 0,1 daneben) | Animation | | |

Punkte einrasten: **auf 0,1 (Standard)** · auf ½ 🔰 · auf ganze Zahlen 🔰 · frei.
Grund: Was als Koordinate angezeigt wird (1 Nachkommastelle), ist genau der Punkt, der gewertet wird – keine unsichtbaren Hundertstel.

Grundidee: Anker und Steigung zählen etwa gleich viel (wie in der Klassenarbeit: 1 BE Achsenabschnitt, 1 BE Steigung).
Die Lage federt ab und belohnt „ungefähr richtig gezeichnet“.
Jede sichtbare Abweichung kostet etwas (wie im Prozentspiel), innerhalb der Toleranz aber nur wenig:
Anker 0,1 → 29, 0,3 → 28 · Lage Ø 0,1 → 34, Ø 0,3 → 32 · Steigung 1,6° → 34, 4° → 32. Außerhalb der Toleranz fällt es normal ab.
Der Anker zählt als Abstand zur Lösungsgeraden (nächster Punkt), nicht zum vorgegebenen Punkt der Aufgabe.

## Idee „Super-Volltreffer-Gefühl“ (Lage-Teil umgesetzt am 18.10.)

Beobachtung: Ein Volltreffer, der sichtbar etwas neben der Lösung liegt, bekommt dieselben 110 Punkte wie eine exakt getroffene Gerade.

Idee:
- Volltreffer (+10) bleibt wie er ist.
- ✅ Lage ohne Toleranz-Plateau: volle 35 nur bei Ø ≤ 0,03, danach leichter Abzug.
  Folge: Volltreffer meist 106–109, exakt getroffen 110.
- ✅ „💎 Perfekt“: Volltreffer mit max. Abstand ≤ 0,1 → eigene Animation (Diamanten-Regen, Glitzer-Sound), keine Extrapunkte (offen: evtl. +5).
- Anker und Steigung: volle Punkte nur noch exakt; innerhalb der Toleranz nur kleiner Abzug (max. −2 bzw. −3).

## Offene Punkte (zum Merken)

- **💎 Perfekt vs. volle Punkte (19.10.):** „PERFEKT!“ erscheint schon bei max. 0,1 Abstand, volle Punkte gibt es
  aber erst bei exakt (Anker ≤ 0,03, Lage Ø ≤ 0,03, Steigung ≤ 0,2°). Beispiel: Perfekt mit 📍 29/30 · 📏 34/35 · 📐 35/35.
  Wirkt leicht widersprüchlich. Optionen: Perfekt nur bei allen vollen Punkten (110) – oder Perfekt-Schwelle auf ~0,05 senken
  – oder so lassen („Perfekt“ = sichtbar exakt, Punkte = rechnerisch exakt).

- **Typische Fehler in der Steigungs-Erklärung erkennen (19.10.) – beim nächsten Mal nachfragen, ob umsetzen:**
  Wenn naheliegend, gezielten Hinweis statt nur „falsche Richtung“ geben:
  - **Vorzeichen vergessen:** gleicher Betrag, anderes Vorzeichen (z. B. +2/5 statt −2/5).
    Bei umgestellten Formen konkret: „y + 2/5x = −4,1 → beim Umstellen wird aus +2/5x auf der rechten Seite −2/5x.“
    (Beispiel aus dem Test: Aufgabe y + 2/5x = −4,1, gezeichnet m ≈ 0,3 statt −2/5.)
  - **Kehrwert verwechselt:** gezeichnet ≈ 1/m (z. B. 5/2 statt 2/5) → „Δx und Δy vertauscht: 5 nach rechts, 2 nach oben – nicht umgekehrt.“
  - **Beides:** gezeichnet ≈ −1/m.
  - **b und m vertauscht**, **b mit falschem Vorzeichen** (Anker-Erklärung).
  Erkennung mit Toleranz (z. B. ±15 % bzw. Winkel), nur melden, wenn eindeutig näher an der Fehler-Variante als an der Lösung.

- **Neuer Modus „Manuelle Aufgaben“ (19.10., präzisiert):** keine Liste vorab, sondern umschalten während des Spiels.
  - Umschalter **🎲 automatisch / ✍️ manuell** am Beamer (Kopfleiste) und in den Einstellungen; evtl. auch für den Raum-Host.
  - Schaltet man auf ✍️ manuell, läuft die **aktuelle Runde normal zu Ende** (sie wird nicht abgebrochen).
  - Vor der **nächsten Runde** hält das Spiel an: Eingabefeld für die Gleichung erscheint, Handys zeigen „Gleich kommt die nächste Aufgabe …“.
  - Gleichung eingeben → **„▶ Los“** → Runde startet mit dieser Aufgabe.
  - Das bleibt so (jede Runde Eingabe), bis man wieder auf **🎲 automatisch** stellt – dann kommen wieder Zufallsaufgaben.
  - Erlaubte Formen: y = mx + b, umgestellt (y + 2x = 3, 2y = …), „durch (x|y) mit m = …“, „durch (x1|y1) und (x2|y2)“.
  - **Vereinfachte Bruch-Eingabe:** z. B. „2/5“ oder „2//5“ wird automatisch als Bruch angezeigt (Live-Vorschau während der Eingabe),
    Minus/Komma tolerant („-“ → „−“, „0.5“/„0,5“).
  - Prüfen, ob die Gerade im gewählten Koordinatensystem sichtbar ist (Warnung sonst); Live-Vorschau der Geraden für die Lehrkraft
    (nicht am Beamer sichtbar, damit die Lösung nicht verraten wird – oder nur klein/verdeckt).
