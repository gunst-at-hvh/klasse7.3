# Gemeinwohl-Spiel – Notizen

Stand: 17.10.2026 · Skizzen: `skizze.html` (Storyboard, aktuell) · `skizze-v1.html` (erste Skizze)

## Bisher festgelegt
- Krakeliger Comic-Stil (rough.js, wie Excalidraw), Handschrift-Fonts
- Startgeld **100 €** pro Gruppe, Beträge in **€**
- Jede Runde geheim einzahlen (0 € bis alles, kein Höchstbetrag) → Topf ×2 → an alle gleich verteilt
- Gemeinwohl = Summe allen Geldes; Ziel ca. 10 × Startgeld aller (z. B. 8 Gruppen → 8.000 €)
- Ziel erreicht → reichste Gruppe gewinnt; Gefahr/Ende nach 15 Runden („Flut“)
- Phasen: ① Einzahlen → ② Showdown (Münzturm füllt sich, Skala „alle nichts“ bis „alle alles“) → ③ ×2 → ④ Ausschüttung (Kacheln, Ø + individuell) → ⑤ Bau-Update + Prognose → ⑥ § Regelrunde (größter Einzahler schlägt vor, geheime Abstimmung)
- Immer sichtbar: Spielstand-Leiste oben, Haus + Runden-Balken rechts, § Regeltafel links (einklappbar), Handy-Reiter 💰 Ich · § Regeln · 🏢 Stand

## Notizen von Mo (17.10.)
- **Betrags-Markierung:** statt gelbem Textmarker lieber **weiß mit Rahmen** oder **hellgrün mit Rahmen**
- **Alternativen zu „Haus vs. Flut“** sammeln (siehe unten)
- **Transparenz in zwei Regeln aufteilen:**
  - **Kontostand-Transparenz** (man sieht, wie viel Geld jede Gruppe insgesamt hat) – eher früh, evtl. schon zu Beginn eingeführt / als Startoption
  - **Einzahlungs-Transparenz** (man sieht, wer wie viel einzahlt und bekommt) – eher später
- **Reihenfolge der Regeln:** „Strafe für den Geringsten“ ergibt erst Sinn, wenn man weiß, wer das ist → erst nach Einzahlungs-Transparenz (Freischalten/Abhängigkeit im Regelkatalog?)
- **Mindesteinzahlung** ist eine eigene Regel

## Ideen: Alternativen zu „Haus vs. Flut“
Gemeinsames Projekt + Bedrohung mit Countdown – optisch könnten Projekt und Countdown in **ein** Bild (z. B. Wasser steigt jede Runde am Haus hoch):
| Projekt (wächst mit Gemeinwohl) | Bedrohung (Countdown) | Bezug |
|---|---|---|
| 🏠 Haus / 🧱 Deich | 🌊 Flut steigt | Klassiker, anschaulich |
| ⚡ Windräder / Solarpark | 🌡️ Thermometer – Klima-Kipppunkt | Klimapolitik, Gemeingut Klima |
| 🪵 Holzvorrat / Dorfhütte | ❄️ Winter kommt (Kalender) | einfach, kindgerecht |
| 🕳️ Brunnen graben | ☀️ Dürre | Wasser als Gemeingut |
| 🚀 Rakete / Schutzschild | ☄️ Asteroid kommt näher | actionreich |
| 🛶 Floß bauen | 🌋 Vulkan bricht aus | Insel-Abenteuer |
| 🚌 Klassenkasse für die Klassenfahrt | 📅 Abfahrtstag | nah an der Lebenswelt |
| 🌳 Park / Spielplatz im Kiez | 🏗️ Investor kauft die Fläche | Bezug zum Kiezprojekt |

## Offene Fragen
- Transparenz von Anfang an als Lobby-Option?
- Ziel 10× – passt die Rundenzahl?
- Bei Misserfolg: alle verlieren, oder trotzdem gewinnt der Reichste?
- Regelvorschlag jede Runde? „Regel abschaffen“ erlaubt?

## Prototyp (17.10.) – `index.html`
- Beamer- und Raum-Modus (ohne Beamer), „Spielername“, Bots (kooperativ / bedingt / geizig / schlau)
- Spiellänge (nötige Ø-Einzahlung ~50 %, Topf ×2 Standard auch bei 2–3 Spielern): ⚡ sehr kurz 5× in 4 Runden · kurz 12× in 6 · normal 25× in 8; keine Hinweise auf die nötige Quote während des Spiels – erst in der Auswertung; Prognose nur als Option
- Flut: Reichste gehen leer aus, 🥈 Trostpreis für den Zweitreichsten · 👏 Publikumspreis für die höchste Gesamteinzahlung (immer)
- Regeln: 💰 Kontostand-Transparenz (auch als Startoption), 👁️ Einzahlungs-Transparenz, 📏 Mindestbeitrag 10 %, 🧾 Grundsteuer 5 %, ⚖️ Strafe (erst nach 👁️), 🏅 Ehrenpreis, Abschaffen, Passen (📈 Leistungsprinzip gestrichen – stellt die Spielidee auf den Kopf)
- Auswertung am Ende: alles aufgedeckt + Kurve Ø-Einzahlung mit Regel-Markierungen
- Ablauf: Aufdeck-Phasen warten standardmäßig auf „Weiter ▶“ (Beamer-Knopf, Leertaste/→/Presenter; im Raum-Modus Host-Leiste) – Option „automatisch mit Pausen“; weniger Text pro Phase
- Haus-Maßstab logarithmisch: gleicher Wachstumsfaktor = gleich viel Haus (bei ~nötiger Einzahlung wächst es jede Runde gleichmäßig); Haus wächst sichtbar erst in der Bau-Phase
- Hintergrund etwas dunkler
- Animationen & Töne: Münze fällt beim Setzen, Turm wird beim Vervielfachen „geklont“ (Klammer + Ergebnis), Beträge zählen hoch, Bau mit Hämmern/Funken/„+X €“, Stempel mit Rumms, Flut mit Wellen + Platschen, Sieg mit Konfetti
- Ausschüttung: „Ø eingezahlt → jede/r bekommt“; Handy zeigt Balken du / Ø alle / zurück + „über/unter dem Durchschnitt“; beim Einzahlen „Letzte Runde: Ø … pro Kopf“
- Flut-/Runden-Balken direkt links am Haus, gleiche Höhe wie Boden…Ziel; Stockwerke wachsen linear mit dem Baufortschritt → Erwartung (Runden) vs. Stand (Haus) direkt vergleichbar
- Handy: zwei schmale Balken (🌊 Runden, 🏗️ Bau) unter der Phase; Stand-Tab scrollbar auch mit Host-Leiste; ohne Beamer am PC (ab 1000 px) dreispaltig mit Regeln und Stand
- Phasenwechsel: Stempel-Banner + altes Bild wischt weg, neues zoomt/wischt/rutscht rein
- Ausschüttung Handy: Schritte nacheinander (Ø eingezahlt → du → alle bekommen → groß: ±X € mehr/weniger als der Durchschnitt), Topf-Aufteilung aufklappbar
- Beamer: Topf-Aufteilung „rein“ (wer hat eingezahlt, mit 👁️) → ×2 → „raus“ + ±-Chips, wer gewonnen/verloren hat
- 📜 Verlauf (Handy-Tab, Beamer-Knopf, PC-Seitenleiste): Topf + Ø je Runde; Beträge pro Spieler nur für Runden mit 👁️
- ⚡ sehr kurz startet mit sichtbaren Kontoständen; größere Spieler-Emojis; kompaktere Abstimmung/Regelwahl; Knöpfe am PC begrenzt
