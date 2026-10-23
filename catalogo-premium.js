(function(){
  'use strict';
  const API = 'https://deliciasdacidapba.com.br/wp-json/wc/store';
  const $ = (s,root=document)=>root.querySelector(s);
  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const text = html => { const el=document.createElement('div'); el.innerHTML=String(html||'').replace(/\\n/g,' '); return (el.textContent||'').replace(/\s+/g,' ').trim(); };
  const categoryHref = c => `categoria.html?id=${encodeURIComponent(c.id)}&nome=${encodeURIComponent(c.name||'')}`;
  const productHref = p => `produto.html?id=${encodeURIComponent(p.id)}`;
  const priority = ['bolos','docinhos-gourmet','bento-cake','tortas-doces','confeitaria-inclusiva','panetones-e-chocotones','ovos-de-pascoa'];
  const fallback = 'assets/logo.png';
  const load = async path => {const response=await fetch(API+path);if(!response.ok)throw Error('Falha ao carregar catalogo: '+response.status);return response.json();};
  let allProducts=[], allCategories=[];
  function validCategory(c){return c && Number(c.id)>0 && c.name && !/sem categoria/i.test(c.name) && Number(c.count||0)>0;}
  function categoriesOf(p){return Array.isArray(p.categories)?p.categories:[];}
  function productsOf(c){return allProducts.filter(p=>categoriesOf(p).some(pc=>String(pc.id)===String(c.id)));}
  function imageOf(p){const img=(p.images||[])[0];return img && (img.src||img.thumbnail)||fallback;}
  function displayPrice(p){if(p.priceText)return String(p.priceText);const price=p.prices && p.prices.price;if(price && Number(price)>0)return (Number(price)/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});return 'Consulte valores';}
  function categoryCover(c){return imageOf(productsOf(c).find(p=>imageOf(p)!==fallback)||productsOf(c)[0]||{});}
  function sortedCategories(){return allCategories.filter(validCategory).sort((a,b)=>{let ai=priority.indexOf(a.slug),bi=priority.indexOf(b.slug);if(ai<0)ai=100;if(bi<0)bi=100;return ai-bi || a.name.localeCompare(b.name,'pt-BR')});}
  function categoryCard(c){return `<a class="cida-category-tile" href="${categoryHref(c)}"><span class="cida-category-cover"><img src="${esc(categoryCover(c))}" alt="${esc(c.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/logo.png'"></span><span class="cida-category-bottom"><strong>${esc(c.name)}</strong><small>${productsOf(c).length} ${productsOf(c).length===1?'delícia':'delícias'} · Explorar <span aria-hidden="true">→</span></small></span></a>`;}
  function productCard(p){const name=String(p.name||'Delícia artesanal').replace(/^\s*\d+\)\s*/,'');const summary=text(p.short_description||p.description).slice(0,100);return `<a class="cida-catalog-product" href="${productHref(p)}"><span class="cida-catalog-product-img"><img src="${esc(imageOf(p))}" alt="${esc(name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/logo.png'"></span><span class="cida-catalog-product-copy"><strong>${esc(name)}</strong><span>${esc(summary)}</span><b>${esc(displayPrice(p))}</b><em>Ver detalhes <span aria-hidden="true">→</span></em></span></a>`;}
  function homePreview(){const root=$('#cidaHomeCategoryPreview');if(!root)return;const chosen=sortedCategories().slice(0,6);root.innerHTML=chosen.length ? chosen.map(categoryCard).join('') : '<p>Consulte nossas delícias no catálogo completo.</p>';}
  function mainCatalog(){const root=$('#cidaCatalogApp');if(!root)return;const catGrid=$('#cidaCatalogCategoryGrid');const result=$('#cidaCatalogProducts');const count=$('#cidaCatalogCount');const search=$('#cidaCatalogSearch');const filter=$('#cidaCatalogFilter');const sort=$('#cidaCatalogSort');const cats=sortedCategories();catGrid.innerHTML=cats.map(categoryCard).join('');filter.innerHTML='<option value="all">Todas as categorias</option>'+cats.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');
    const params=new URLSearchParams(location.search);const prefilter=params.get('categoria');if(prefilter && cats.some(c=>String(c.id)===prefilter))filter.value=prefilter;
    const render=()=>{const q=clean(search.value.trim());const value=filter.value;let shown=allProducts.filter(p=>{
      const matchCategory=value==='all'||categoriesOf(p).some(c=>String(c.id)===value);
      const matchTerm=!q||clean([p.name,text(p.short_description||p.description),...categoriesOf(p).map(c=>c.name)].join(' ')).includes(q);
      return matchCategory&&matchTerm;
    });if(sort.value==='az')shown.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));else if(sort.value==='za')shown.sort((a,b)=>b.name.localeCompare(a.name,'pt-BR'));
    count.textContent=`${shown.length} ${shown.length===1?'delícia encontrada':'delícias encontradas'}`;
    result.innerHTML=shown.length?shown.map(productCard).join(''):`<div class="cida-catalog-empty"><h3>Nenhuma delícia encontrada</h3><p>Tente outro nome ou selecione todas as categorias.</p><button type="button" id="cidaCatalogReset">Limpar filtros</button></div>`;
    $('#cidaCatalogReset')?.addEventListener('click',()=>{search.value='';filter.value='all';sort.value='default';render();search.focus()});};
    search.addEventListener('input',render);filter.addEventListener('change',render);sort.addEventListener('change',render);render();
  }
  async function init(){if(!$('#cidaCatalogApp')&&!$('#cidaHomeCategoryPreview'))return;try{const [products,categories]=await Promise.all([load('/products?per_page=100'),load('/products/categories?per_page=100')]);allProducts=(Array.isArray(products)?products:[]).filter(p=>p&&Number(p.id)>0);allCategories=Array.isArray(categories)?categories:[];homePreview();mainCatalog();}catch(e){console.error('Falha no catalogo premium',e);const app=$('#cidaCatalogApp');if(app)app.innerHTML='<div class="cida-catalog-empty"><h3>Não conseguimos carregar o catálogo agora.</h3><p>Tente atualizar a página ou fale com a Cida pelo WhatsApp.</p><a class="btn btn-primary" href="https://wa.me/5567981032677">Falar com a Cida</a></div>';const home=$('#cidaHomeCategoryPreview');if(home)home.innerHTML='<p>Confira todas as opções no nosso catálogo.</p>';}}
  document.addEventListener('DOMContentLoaded',init);
})();
