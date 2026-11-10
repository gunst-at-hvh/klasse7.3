/* Teiler-Live – Kern: Teiler finden, Zahlen auswählen, Wertung (Version 1: Teiler 1 … 9) */
(function (root) {
'use strict';
const SMALL = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const divisors = n => { const d = []; for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i); return d; };
const smallDivs = n => SMALL.filter(d => n % d === 0);
/* Zahl wählen: bis max, mit erhöhter Chance auf Zahlen mit vielen einstelligen Teilern (Einmaleins-Reihen: 24, 36, 48, 60, 72 …) */
function pickNumber(max, mode, used) {
  used = used || [];
  const cand = [];
  for (let n = 12; n <= max; n++) {
    if (used.includes(n)) continue;
    const d = smallDivs(n).length - 1;               // ohne die 1
    if (mode === 'many') { if (d >= 2) cand.push([n, Math.pow(d, 3)]); }
    else cand.push([n, 1]);
  }
  if (!cand.length) return 24;
  const sum = cand.reduce((s, c) => s + c[1], 0); let r = Math.random() * sum;
  for (const [n, w] of cand) { r -= w; if (r <= 0) return n; }
  return cand[cand.length - 1][0];
}
/* Wertung: richtig +2, falsch −3, alle richtig und nichts falsch +4, ⚡ bis +30 % der Pluspunkte */
function score(picks, n, opts = {}) {
  const set = [...new Set(picks.map(Number))].filter(x => x >= 1 && x <= 9).sort((a, b) => a - b), good = smallDivs(n);
  const correct = set.filter(x => n % x === 0), wrong = set.filter(x => n % x !== 0), missed = good.filter(x => !set.includes(x));
  const perfect = wrong.length === 0 && missed.length === 0 && correct.length > 0;
  const plus = 2 * correct.length, base = plus - 3 * wrong.length + (perfect ? 4 : 0);
  const frac = opts.timed ? Math.max(0, Math.min(1, opts.frac == null ? 1 : opts.frac)) : 1;
  const time = opts.timed && base > 0 ? Math.round(plus * .3 * (1 - frac)) : 0;
  return {picks: set, correct, wrong, missed, perfect, plus, minus: 3 * wrong.length, bonus: perfect ? 4 : 0, time, pts: base + time};
}
const api = {SMALL, divisors, smallDivs, pickNumber, score};
if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Teiler = api;
})(typeof self !== 'undefined' ? self : this);
