/* Delicias da Cida - Flow Tracking v2.0 | direct integrations, consent-first */
(function () {
  'use strict';
  if (window.CidaFlowTracking) return;
  const GA_ID = 'G-E81J8073YN';
  const META_ID = '1072531990334488';
  const KEY = 'cida_tracking_consent_v2';
  const PHONE = '5567981032677';
  const events = [];
  const valid = new Set(['page_view','view_catalog','view_lookbook','view_item','search','calculator_complete','contact','generate_lead','form_submit_attempt']);
  let enabled = false;
  let loaded = false;
  let choice = null;
  try { choice = localStorage.getItem(KEY); } catch (_) {}
  if (!['accepted','rejected'].includes(choice)) choice = null;
  const source = (function () {
    const p = location.pathname.toLowerCase();
    if (p.includes('catalogo-de-bolos')) return 'livro_bolos';
    if (p.includes('catalogo-doces-gourmet')) return 'livro_gourmet';
    if (p.includes('catalogo')) return 'catalogo_produtos';
    if (p.includes('produto')) return 'produto';
    if (p.includes('categoria')) return 'categoria';
    return 'home';
  })();
  function clean(data) {
    const out = {};
    for (const key of ['source','form_id','catalog','destination','item_id','status']) {
      const val = data && data[key];
      if (typeof val === 'string' || typeof val === 'number') out[key] = String(val).slice(0,80);
    }
    return out;
  }
  function send(e) {
    if (!enabled) return;
    const params = Object.assign({}, e.data);
    if (typeof window.gtag === 'function') {
      window.gtag('event', e.name, params);
    }
    if (typeof window.fbq === 'function') {
      if (e.name === 'page_view') window.fbq('track', 'PageView');
      if (e.name === 'view_item') window.fbq('track', 'ViewContent');
      if (e.name === 'contact') window.fbq('track', 'Contact');
      if (e.name === 'generate_lead') window.fbq('track', 'Lead');
      if (e.name === 'view_catalog' || e.name === 'view_lookbook' || e.name === 'calculator_complete') window.fbq('trackCustom', e.name, params);
    }
  }
  function record(name, data) {
    if (!valid.has(name)) return;
    const event = {name, data:clean(data), timestamp:new Date().toISOString()};
    events.push(event);
    if (events.length > 150) events.shift();
    send(event);
  }
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, {send_page_view:false});
    const ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(ga);
    (function(f,b,e,v,n,t,s){
      if(f.fbq)return;
      n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments);};
      if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=true;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_ID);
  }
  function setConsent(accept) {
    choice = accept ? 'accepted' : 'rejected';
    try { localStorage.setItem(KEY, choice); } catch (_) {}
    enabled = accept;
    if (enabled) {
      loadAnalytics();
      // Replay only the page view. Do not retroactively attribute earlier clicks.
      const page = events.find(e => e.name === 'page_view');
      if (page) send(page);
    }
    const banner = document.getElementById('cida-consent-banner');
    if (banner) banner.remove();
  }
  function showBanner() {
    if (choice !== null || document.getElementById('cida-consent-banner')) return;
    const bar = document.createElement('div');
    bar.id = 'cida-consent-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Preferencias de privacidade');
    bar.style.cssText = 'position:fixed;z-index:2147483646;bottom:12px;left:12px;right:12px;max-width:720px;margin:auto;background:#fff;color:#32222b;border:1px solid #ecd4df;box-shadow:0 10px 35px #24111a38;padding:17px 20px;border-radius:16px;font:14px/1.5 system-ui,sans-serif';
    const msg = document.createElement('p');
    msg.style.cssText='margin:0 0 12px';
    msg.textContent='Usamos dados de navegacao para entender o interesse pelos nossos produtos e melhorar nossas campanhas. Voce pode aceitar ou recusar os cookies de analise e publicidade. O site funciona sem eles.';
    const actions = document.createElement('div');
    actions.style.cssText='display:flex;gap:10px;flex-wrap:wrap';
    function button(label, accept) {
      const btn=document.createElement('button');
      btn.type='button';btn.textContent=label;
      btn.style.cssText='cursor:pointer;border-radius:10px;border:1px solid #ba4370;padding:9px 14px;background:'+(accept?'#bd3f73':'#fff')+';color:'+(accept?'#fff':'#7b2850')+';font:600 14px system-ui,sans-serif';
      btn.addEventListener('click',()=>setConsent(accept));
      actions.appendChild(btn);
    }
    button('Recusar',false);button('Aceitar',true);
    bar.appendChild(msg);bar.appendChild(actions);document.body.appendChild(bar);
  }
  window.CidaFlowTracking = Object.freeze({
    version:'2.0.0', mode:'direct',
    inspect:()=>events.map(e=>({name:e.name,data:Object.assign({},e.data),timestamp:e.timestamp})),
    consent:()=>choice,
    setConsent:setConsent,
    reopenConsent:function(){
      choice=null;
      showBanner();
    },
    record:record
  });
  record('page_view',{source});
  if (source==='catalogo_produtos') record('view_catalog',{source});
  if (source==='livro_bolos'||source==='livro_gourmet') record('view_lookbook',{source,catalog:source});
  if (source==='produto') record('view_item',{source,item_id:new URLSearchParams(location.search).get('id')||''});
  document.addEventListener('click',function(ev){
    const a=ev.target.closest&&ev.target.closest('a[href]');
    if(!a)return;
    let url;
    try{url=new URL(a.href,location.href);}catch(_){return;}
    if((url.hostname==='wa.me'||url.hostname==='api.whatsapp.com')&&url.pathname.replace(/\D/g,'')===PHONE) {
      record('contact',{source,destination:'whatsapp'});
    }
  },true);
  const forms=new Set(['cakeForm','weddingForm','partySweetForm','bentoFunForm']);
  document.addEventListener('submit',function(ev){
    const id=ev.target&&ev.target.id;
    if(forms.has(id))record('form_submit_attempt',{source,form_id:id,status:'attempt'});
  },true);
  if (choice==='accepted') {
    enabled=true;loadAnalytics();
    events.forEach(send);
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',showBanner,{once:true});
  else showBanner();
})();
