# Zielzahl-Live – Notizen

Kopfrechnen rückwärts: Beamer zeigt eine **Zielzahl**, alle tippen gleichzeitig eine **Rechnung** (+ − · : und Klammern, z. B. `(7+5)·2`),
Ergebnis steht vorher nicht da. Nach der Runde werden **alle Rechnungen** gezeigt (Beamer + Handy).
Technik wie Geraden-Live (PeerJS, Code/QR). Ohne „Raum“-Modus (nur Beamer + Mitspielen). Rechen-Kern: `rechnen.js` (auch in Node testbar).

## Wertung (Stand 10.11.2026)

| Teil | Regel |
|---|---|
| **Rechnung** | `4 × Aufwand` (max. 45). Aufwand je Rechenschritt, Schritte zählen mit abnehmendem Gewicht 1 · .7 · .45 · .3 · .2 … |
| ⚡ Zeitbonus | bis **+30 %** der Rechnungspunkte, linear über die Rundenzeit; nur bei echter Rechnung (≥ 2 P). Zeit abgelaufen (Entwurf zählt) = kein Bonus |
| ✗ falsch | **Minus 1 … 6**, je nach Abstand (`1,2 · log₂(1 + Abstand / (1 + Ziel/100))`, auf ganze Zahlen) – nie Rechnungs- oder Zeitpunkte |
| keine Abgabe | 0 |

Aufwand je Schritt (kein genormter „Komplexitätsquotient“, aber die gut belegten Faktoren beim Kopfrechnen):
- **Rechenart** + < − (×1,2) < · < : (Division = 1,25 × passende Malaufgabe, Rest/Dezimalzahl +0,8)
- **Zahlengröße** (Problem-Size-Effekt): N(n) = log₁₀(n ohne Endnullen + 1) + 0,15 je Endnull; 1 zählt nur 0,25; Dezimalstellen +0,2 je Stelle
- **Übertrag / Borgen** über Stellen: +0,35 je Stelle (max. 3); beim Minus fallen gleiche führende Ziffern weg (9999 − 9975 ≈ 99 − 75)
- ±1 nur 35 %; · 10 / · 100 nur 55 %
- **Leerlauf = 0:** +0, −0, ·1, :1, Glieder mit Wert 0 / Faktoren mit Wert 1, und alles, was sich aufhebt (24 + 5 − 5, 6·4·5:5)

Beispiele (Ziel 24, ohne Zeitbonus): 24+0 → 0 · 25−1 → 2 · 20+4 → 3 · 30−6 → 6 · 6·4 → 8 · 48:2 → 10 · 72:3 → 12 · 100−76 → 11 · 7·8+44 (Ziel 100) → 18.
Falsch: 5·5 = 25 → −1, 7·3 = 21 → −2.

## Einstellungen
Zeit (20–90 s, ∞) · Runden · Zielzahlen (10–50 … 100–1000 oder **📈 steigend** = didaktische Treppe, Runde für Runde größer) ·
Rechenarten (alle / ohne : / nur + −, Tasten werden gesperrt) · automatisch weiter · 🤖 Bots zum Testen.
Zielzahlen sind nie glatte Zehner (sonst 20 + 30).

## Ideen / offen
- „Einzelstück“-Bonus, wenn niemand sonst dieselbe Rechnung hat.
- Raum-Modus (ohne Beamer) wie bei Geraden-Live.
- Schwellen (4 P je Aufwand, Gewichte) nach dem ersten Einsatz mit den Kindern nachjustieren.
