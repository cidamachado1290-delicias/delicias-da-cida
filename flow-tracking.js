/* Flow Tracking v1 - diagnostic mode. No analytics network dispatch. */
(function () {
  'use strict';
  if (window.CidaFlowTracking) return;
  const config = Object.freeze({ version: '1.0.0', mode: 'diagnostic', ga4: 'G-E81J8073YN', meta: '1072531990334488' });
  const events = [];
  const valid = /^[a-z][a-z0-9_]{1,63}$/;
  const allowed = new Set(['page_view','view_catalog','view_lookbook','view_item','search','calculator_complete','contact','generate_lead','form_submit_attempt']);
  function record(name, data) {
    if (!valid.test(name) || !allowed.has(name)) return;
    const clean = {};
    for (const key of ['source','form_id','catalog','destination','item_id','status']) {
      const val = data && data[key];
      if (typeof val === 'string' || typeof val === 'number') clean[key] = String(val).slice(0,80);
    }
    events.push({ name, data: clean, timestamp: new Date().toISOString() });
    if (events.length > 150) events.shift();
  }
  function where() {
    const p = location.pathname.toLowerCase();
    if (p.includes('catalogo-de-bolos')) return 'livro_bolos';
    if (p.includes('catalogo-doces-gourmet')) return 'livro_gourmet';
    if (p.includes('catalogo')) return 'catalogo_produtos';
    if (p.includes('produto')) return 'produto';
    if (p.includes('categoria')) return 'categoria';
    return 'home';
  }
  const source = where();
  record('page_view', { source });
  if (source === 'catalogo_produtos') record('view_catalog', { source });
  if (source === 'livro_bolos' || source === 'livro_gourmet') record('view_lookbook', { source, catalog: source });
  if (source === 'produto') record('view_item', { source, item_id: new URLSearchParams(location.search).get('id') || '' });
  document.addEventListener('click', function (ev) {
    const a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    let u;
    try { u = new URL(a.href, location.href); } catch (_) { return; }
    if ((u.hostname === 'wa.me' || u.hostname === 'api.whatsapp.com') && u.pathname.replace(/\D/g, '') === '5567981032677') {
      record('contact', { source, destination: 'whatsapp' });
    }
  }, true);
  const forms = new Set(['cakeForm','weddingForm','partySweetForm','bentoFunForm']);
  document.addEventListener('submit', function (ev) {
    const id = ev.target && ev.target.id;
    if (forms.has(id)) record('form_submit_attempt', { source, form_id: id, status: 'attempt' });
  }, true);
  window.CidaFlowTracking = Object.freeze({
    version: config.version,
    mode: config.mode,
    inspect: function () { return events.map(e => ({ name: e.name, data: Object.assign({}, e.data), timestamp: e.timestamp })); },
    clear: function () { events.length = 0; },
    record: record
  });
})();
