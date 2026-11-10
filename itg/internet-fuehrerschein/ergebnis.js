/* Ergebnis-Code für den Internet-Führerschein: kodieren (Schüler) und lesen (Auswertung).
   Der Code enthält Name, Punkte, Sterne und eine Prüfsumme gegen Tippfehler.
   Er ist KEIN Fälschungsschutz – er schützt nur vor versehentlichem Verändern. */
(function(){
  const clean = s => String(s||'').replace(/[|;\n\r]/g,' ').replace(/\s+/g,' ').trim().slice(0,30);
  const hash = s => { let h = 5381; for(let i=0;i<s.length;i++) h = ((h<<5)+h+s.charCodeAt(i))>>>0; return h.toString(36).toUpperCase().padStart(6,'0').slice(-5); };
  const b64 = s => btoa(unescape(encodeURIComponent(s)));
  const unb64 = s => decodeURIComponent(escape(atob(s)));
  function encode(r){
    const st = Object.keys(r.stars||{}).map(k=>k+':'+r.stars[k]).join(',');
    const body = ['v1', clean(r.name), r.date, r.total, r.erl, r.fin, r.finOk, r.finN, r.pass?1:0, st].join('|');
    const p = b64(body);
    return 'ITG-' + p + '-' + hash(p);
  }
  function decode(code){
    const m = /ITG-([A-Za-z0-9+\/=]+)-([0-9A-Z]{5})/.exec(code||'');
    if(!m) return null;
    if(hash(m[1]) !== m[2]) return {bad:true, code:m[0]};
    try{
      const a = unb64(m[1]).split('|'); if(a[0]!=='v1') return {bad:true, code:m[0]};
      const stars = {}; (a[9]||'').split(',').filter(Boolean).forEach(x=>{ const k = x.split(':'); stars[k[0]] = +k[1]; });
      return {code:m[0], name:a[1], date:a[2], total:+a[3], erl:+a[4], fin:+a[5], finOk:+a[6], finN:+a[7], pass:a[8]==='1', stars};
    }catch(e){ return {bad:true, code:m[0]}; }
  }
  function findAll(text){ const out = []; const re = /ITG-[A-Za-z0-9+\/=]+-[0-9A-Z]{5}/g; let m; while((m = re.exec(text||''))) out.push(m[0]); return out; }
  window.ITGE = {encode, decode, findAll};
})();
