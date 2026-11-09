/* Zielzahl-Live – Rechen-Kern
   Ausdruck lesen (+ − · : und Klammern), ausrechnen und den RECHENAUFWAND bewerten.

   Die Wertung folgt dem, was die Forschung zum Kopfrechnen gut belegt (kein genormter „Quotient“, aber stabile Faktoren):
   · Rechenart:     + < − < · < :           (Division = Umkehrung der Multiplikation)
   · Zahlengröße:   Problem-Size-Effekt – größere Zahlen brauchen mehr Zeit; runde Zahlen (20, 300) sind leichter
   · Stellenwert-Übergang: Übertrag beim Addieren, Borgen beim Subtrahieren (Zehnerübergang)
   · Rechenschritte: jeder weitere Schritt zählt, aber mit abnehmendem Gewicht (kein Punkte-Farmen mit langen Ketten)
   · „Leerlauf“ zählt nicht: +0, −0, ·1, :1, und alles, was sich aufhebt (24 + 5 − 5, 6 · 4 · 5 : 5) bringt 0 Punkte        */
(function (root) {
'use strict';

/* ---------- Eingabe vereinheitlichen ---------- */
const MAXLEN = 40, MAXOPS = 8, MAXINT = 5, MAXDEC = 2;
function normalize(s) {
  return String(s == null ? '' : s)
    .replace(/[−–—]/g, '-').replace(/[×·*xX⋅]/g, '*').replace(/[÷:/]/g, '/').replace(/,/g, '.').replace(/\s+/g, '');
}
/* schöne Anzeige: · für mal, : für geteilt, − für minus, Komma */
function pretty(s) {
  return normalize(s).replace(/\*/g, ' · ').replace(/\//g, ' : ').replace(/(?<=[\d)])-/g, ' − ').replace(/^-/, '−').replace(/\(-/g, '(−')
    .replace(/(?<=[\d)])\+/g, ' + ').replace(/\./g, ',').replace(/\s+/g, ' ').trim();
}

/* ---------- Parser: expr := term (+|- term)*, term := unary (*|/ unary)*, unary := [-] factor, factor := Zahl | ( expr ) ---------- */
function parse(src) {
  const s = normalize(src);
  if (!s) return {err: 'leer'};
  if (s.length > MAXLEN) return {err: 'zu lang'};
  if (/[^0-9+\-*/().]/.test(s)) return {err: 'Zeichen'};
  let i = 0, ops = 0;
  const fail = m => { const e = new Error(m); e.parse = true; throw e; };
  function expr() {
    let neg = false;
    if (s[i] === '-') { i++; neg = true; }                       // Minus nur am Anfang bzw. direkt nach „(“
    let a = term(); if (neg) a = {k: 'neg', a};
    while (s[i] === '+' || s[i] === '-') { const o = s[i++]; const b = term(); a = {k: 'b', o, a, b}; if (++ops > MAXOPS) fail('zu viele Schritte'); }
    return a;
  }
  function term() {
    let a = factor();
    while (s[i] === '*' || s[i] === '/') { const o = s[i++]; const b = factor(); a = {k: 'b', o, a, b}; if (++ops > MAXOPS) fail('zu viele Schritte'); }
    return a;
  }
  function factor() {
    if (s[i] === '(') { i++; const a = expr(); if (s[i] !== ')') fail('Klammer fehlt'); i++; return {k: 'p', a}; }
    const m = /^(\d+)(\.(\d+))?/.exec(s.slice(i));
    if (!m) fail(s[i] === '-' ? 'Minus an falscher Stelle' : 'Zahl erwartet');
    if (m[1].length > MAXINT) fail('Zahl zu groß');
    if (m[3] && m[3].length > MAXDEC) fail('zu viele Nachkommastellen');
    i += m[0].length;
    return {k: 'n', v: parseFloat(m[0]), d: m[3] ? m[3].length : 0};
  }
  try {
    const tree = expr();
    if (i < s.length) fail(s[i] === ')' ? 'Klammer zu viel' : 'unerwartetes Zeichen');
    const v = ev(tree);
    return {tree, value: v, text: s, ops};
  } catch (e) {
    if (e.parse || e.calc) return {err: e.message};
    throw e;
  }
}
const R9 = v => Math.round(v * 1e9) / 1e9;
function ev(n) {
  switch (n.k) {
    case 'n': return n.v;
    case 'p': return ev(n.a);
    case 'neg': return -ev(n.a);
    case 'b': {
      const a = ev(n.a), b = ev(n.b); let r;
      if (n.o === '+') r = a + b; else if (n.o === '-') r = a - b; else if (n.o === '*') r = a * b;
      else { if (Math.abs(b) < 1e-12) { const e = new Error('durch 0'); e.calc = true; throw e; } r = a / b; }
      r = R9(r);
      if (Math.abs(r) > 1e9) { const e = new Error('zu groß'); e.calc = true; throw e; }
      return r;
    }
  }
}
const canon = n => n.k === 'n' ? String(n.v) : n.k === 'p' ? canon(n.a) : n.k === 'neg' ? '(-' + canon(n.a) + ')'
  : '(' + canon(n.a) + n.o + canon(n.b) + ')';
function opsUsed(n, set = new Set()) { if (n.k === 'b') { set.add(n.o); opsUsed(n.a, set); opsUsed(n.b, set); } else if (n.a) opsUsed(n.a, set); return set; }

/* ---------- Aufwand einzelner Zahlen und Schritte ---------- */
const dig = n => String(n);
function scaleInt(v) { for (let d = 0; d <= 3; d++) { const x = R9(v * Math.pow(10, d)); if (Math.abs(x - Math.round(x)) < 1e-9) return {i: Math.round(x), d}; } return {i: Math.round(v * 1000), d: 3}; }
/* N(n): „gefühlte Größe“. 0 → 0, 1 → .25, sonst log10 der Zahl ohne Endnullen + kleiner Zuschlag je Endnull */
function N(v) {
  v = Math.abs(v); if (v === 0) return 0; if (v === 1) return .25;
  const {i, d} = scaleInt(v);
  let m = i, t = 0; while (m % 10 === 0 && m > 0) { m /= 10; t++; }
  return Math.log10(m + 1) + .15 * t + .2 * d;
}
const isPow10 = v => { const {i} = scaleInt(Math.abs(v)); return i >= 10 && /^10*$/.test(String(i)); };
/* Stellen, an denen beim schriftlichen Rechnen ein Übertrag (+) bzw. Borgen (−) entsteht – gleiche führende Ziffern beim Minus zählen nicht */
function carries(x, y, sub, dec) {
  const f = Math.pow(10, dec), X = Math.round(x * f), Y = Math.round(y * f);
  const a = String(Math.max(X, Y)).split('').reverse().map(Number), b = String(Math.min(X, Y)).split('').reverse().map(Number);
  let c = 0, k = 0;
  for (let p = 0; p < a.length; p++) {
    const u = a[p], w = b[p] || 0;
    if (!sub) { const t = u + w + c; c = t >= 10 ? 1 : 0; if (c) k++; }
    else { const t = u - w - c; c = t < 0 ? 1 : 0; if (c) k++; }
  }
  return k;
}
/* Plus/Minus mit Vorzeichen: a ⊕ b (b trägt sein Vorzeichen) */
function costAddSub(a, b) {
  if (a === 0 || b === 0) return 0;
  const sub = (a < 0) !== (b < 0);
  let x = Math.abs(a), y = Math.abs(b);
  const dec = Math.max(scaleInt(x).d, scaleInt(y).d);
  // beim Minus: gleiche führende Stellen fallen weg (9999 − 9975 ist eigentlich 99 − 75)
  if (sub && x !== y) {
    const f = Math.pow(10, dec), X = String(Math.round(Math.max(x, y) * f)), Y = String(Math.round(Math.min(x, y) * f)).padStart(X.length, '0');
    let k = 0; while (k < X.length - 1 && X[k] === Y[k]) k++;
    if (k > 0) { x = parseInt(X.slice(k), 10) / f; y = parseInt(Y.slice(k), 10) / f; }
  }
  let c = .6 * (N(x) + N(y));
  if (Math.min(Math.abs(a), Math.abs(b)) === 1) c *= .35;        // ±1 ist fast geschenkt
  c += .35 * Math.min(3, carries(Math.max(x, y), Math.min(x, y), sub, dec));
  if (sub) c *= 1.2;                                            // minus ist schwerer als plus
  if (dec) c *= 1.2;
  return c;
}
function costMul(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  if (a === 0 || b === 0) return 0;
  if (a === 1 || b === 1) return .15;
  let c = 1 + 1.6 * N(a) * N(b);
  if (isPow10(a) || isPow10(b)) c *= .55;                       // · 10, · 100 = Nullen anhängen
  if (scaleInt(a).d || scaleInt(b).d) c *= 1.2;
  return c;
}
function costDiv(D, d) {
  D = Math.abs(D); d = Math.abs(d);
  if (D === 0) return 0;
  if (d === 1) return .15;
  const q = R9(D / d), exact = Math.abs(q - Math.round(q * 100) / 100) < 1e-9;
  let c = 1.25 * costMul(d, exact ? q : Math.round(q * 100) / 100 || 1);
  if (!(Math.abs(q - Math.round(q)) < 1e-9)) c += .8;           // Rest / Dezimalzahl dabei
  return c;
}

/* ---------- Aufwand eines ganzen Ausdrucks (mit Erkennung von Leerlauf) ---------- */
function flat(n, sign, kind, out) {   // kind 'add' → Summanden, 'mul' → Faktoren
  if (n.k === 'p') return flat(n.a, sign, kind, out);
  if (kind === 'add') {
    if (n.k === 'neg') return flat(n.a, -sign, kind, out);
    if (n.k === 'b' && (n.o === '+' || n.o === '-')) { flat(n.a, sign, kind, out); flat(n.b, n.o === '+' ? sign : -sign, kind, out); return out; }
  } else if (n.k === 'b' && (n.o === '*' || n.o === '/')) { flat(n.a, sign, kind, out); flat(n.b, n.o === '*' ? sign : -sign, kind, out); return out; }
  out.push({sign, node: n}); return out;
}
function cancelPairs(items) {   // gleiche Terme mit entgegengesetztem Vorzeichen heben sich auf
  const alive = items.map(() => true);
  for (let i = 0; i < items.length; i++) if (alive[i]) for (let j = i + 1; j < items.length; j++)
    if (alive[j] && items[i].sign === -items[j].sign && canon(items[i].node) === canon(items[j].node)) { alive[i] = alive[j] = false; break; }
  return items.filter((_, i) => alive[i]);
}
/* liefert {val, costs:[…]} – costs sind die „echten“ Rechenschritte */
function work(n) {
  if (n.k === 'p') return work(n.a);
  if (n.k === 'n') return {val: n.v, costs: []};
  if (n.k === 'neg') { const w = work(n.a); return {val: -w.val, costs: w.costs}; }
  const add = n.o === '+' || n.o === '-';
  let items = flat(n, 1, add ? 'add' : 'mul', []);
  const val = ev(n);
  const wk = items.map(it => ({sign: it.sign, node: it.node, w: work(it.node), v: ev(it.node)}));
  let live = cancelPairs(wk);
  // neutrale Glieder entfernen: Summand 0, Faktor 1 (auch als berechneter Wert)
  const neutral = add ? 0 : 1;
  if (!add && live.some(t => t.sign > 0 && t.v === 0)) return {val, costs: []};   // · 0 → alles egal
  const rest = live.filter(t => Math.abs(t.v - neutral) > 1e-12);
  live = rest.length ? rest : live.slice(0, 1);
  let costs = []; live.forEach(t => costs.push(...t.w.costs));
  if (live.length === 1 && !(live[0].sign < 0 && add)) return {val, costs};
  // Schrittfolge von links nach rechts
  let acc = add ? live[0].sign * live[0].v : (live[0].sign > 0 ? live[0].v : 1 / live[0].v);
  if (!add && live[0].sign < 0) acc = live[0].v;   // vorne Division: 1 : x, selten – behandeln wie x
  for (let k = 1; k < live.length; k++) {
    const t = live[k];
    if (add) { costs.push(costAddSub(acc, t.sign * t.v)); acc = R9(acc + t.sign * t.v); }
    else if (t.sign > 0) { costs.push(costMul(acc, t.v)); acc = R9(acc * t.v); }
    else { costs.push(costDiv(acc, t.v)); acc = R9(acc / t.v); }
  }
  return {val, costs};
}
const WEIGHTS = [1, .7, .45, .3, .2, .15, .1, .1, .1];
const K = 4;                         // Punkte je Aufwandseinheit
const MAXCALC = 45;
function complexity(tree) {
  const w = work(tree);
  const c = w.costs.filter(x => x > 0.005).sort((a, b) => b - a);
  const total = c.reduce((s, x, i) => s + x * WEIGHTS[Math.min(i, WEIGHTS.length - 1)], 0);
  return {total, steps: c.length, costs: c};
}

/* ---------- Auswertung einer Abgabe ---------- */
/* opts: allowed = 'all' | 'pm' | 'pmm', frac = Anteil der Zeit, der schon verbraucht war (0 … 1), timed = ob es eine Zeitwertung gibt */
function check(expr, opts = {}) {
  const p = parse(expr);
  if (p.err) return {ok: false, err: p.err};
  const used = opsUsed(p.tree), allowed = opts.allowed || 'all';
  if (allowed === 'pm' && (used.has('*') || used.has('/'))) return {ok: false, err: 'Nur + und − erlaubt'};
  if (allowed === 'pmm' && used.has('/')) return {ok: false, err: 'Teilen ist hier nicht erlaubt'};
  return {ok: true, value: p.value, text: p.text, tree: p.tree};
}
function score(expr, target, opts = {}) {
  const c = check(expr, opts);
  if (!c.ok) return {ok: false, err: c.err, pts: 0};
  const cx = complexity(c.tree);
  const r = {ok: true, value: c.value, target, text: c.text, steps: cx.steps, cx: Math.round(cx.total * 100) / 100};
  const dev = Math.abs(c.value - target);
  if (dev < 1e-9) {
    r.correct = true;
    r.calc = Math.min(MAXCALC, Math.round(K * cx.total));
    const frac = opts.timed ? Math.max(0, Math.min(1, opts.frac == null ? 1 : opts.frac)) : 1;
    r.time = opts.timed && r.calc >= 2 ? Math.round(r.calc * .3 * (1 - frac)) : 0;   // bis +30 % für Schnelligkeit – nur auf echte Rechnung
    r.pen = 0;
    r.pts = r.calc + r.time;
    r.trivial = r.calc < 2;
  } else {
    r.correct = false; r.calc = 0; r.time = 0; r.dev = Math.round(dev * 100) / 100;
    const d = dev / (1 + Math.abs(target) / 100);
    r.pen = Math.min(6, Math.max(1, Math.round(1.2 * Math.log2(1 + d))));
    r.pts = -r.pen;
  }
  r.stars = Math.max(0, Math.min(5, Math.round(r.calc / 7)));
  return r;
}

/* ---------- Zielzahlen ---------- */
const RANGES = {'1': [10, 50], '2': [20, 100], '3': [50, 500], '4': [100, 1000]};
function rangeFor(level, round, rounds) {
  if (level === 'up') {   // didaktische Treppe: erst klein, dann größer
    const f = rounds > 1 ? (round - 1) / (rounds - 1) : 0;
    const hi = Math.round((30 + f * f * 970) / 10) * 10;
    return [Math.max(10, Math.round((hi / 4) / 5) * 5), hi];
  }
  return RANGES[level] || RANGES['2'];
}
function makeTarget(level, round, rounds, last) {
  const [lo, hi] = rangeFor(level, round, rounds);
  for (let k = 0; k < 50; k++) {
    const t = lo + Math.floor(Math.random() * (hi - lo + 1));
    if (t !== last && t % 10 !== 0 || k > 40) return t;   // glatte Zehnerzahlen vermeiden – sie laden zu 20 + 30 ein
  }
  return lo + 1;
}

const api = {normalize, pretty, parse, check, score, complexity, makeTarget, rangeFor, N, MAXLEN};
if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Rechnen = api;
})(typeof self !== 'undefined' ? self : this);
