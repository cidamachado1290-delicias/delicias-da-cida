const BASE='https://impkkhztouayqhzwsaog.supabase.co';
const KEY='sb_publishable_6suNtXmyZNYJXpSHIKkn8A_xLsEo6TV';
const SITE='https://www.deliciasdacidapba.com.br';
const clean=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/\s+/g,' ').trim();
const csv=s=>'"'+String(s??'').replace(/"/g,'""').replace(/[\r\n]+/g,' ')+'"';
const img=path=>BASE+'/storage/v1/object/public/catalogo-produtos/'+String(path).split('/').map(encodeURIComponent).join('/');
function priceOf(p){
  const n=Number(p.price);
  if(p.price!=null && p.price!=='' && Number.isFinite(n) && n>0)return n;
  const m=String(p.price_note||'').match(/R\$\s*([\d.]+,\d{2})/i);
  if(!m)return null;
  const v=Number(m[1].replace(/\./g,'').replace(',','.'));
  return Number.isFinite(v)&&v>0?v:null;
}
export async function onRequestGet(){
  try{
    const url=new URL(BASE+'/rest/v1/products');
    url.searchParams.set('select','legacy_woocommerce_id,name,description,short_description,price,price_note,product_images(storage_path,is_cover,sort_order)');
    url.searchParams.set('limit','1000');
    const result=await fetch(url,{headers:{apikey:KEY,Accept:'application/json'}});
    if(!result.ok)throw Error('Supabase '+result.status);
    const products=await result.json();
    if(!Array.isArray(products)||products.length<50)throw Error('Incomplete product set');
    const rows=[['id','title','description','availability','condition','price','link','image_link','brand'].map(csv).join(',')];
    const omitted=[];
    for(const p of products){
      const id=String(p.legacy_woocommerce_id||'');
      const title=clean(p.name);
      const price=priceOf(p);
      const pics=(p.product_images||[]).filter(i=>i&&i.storage_path).sort((a,b)=>Number(!!b.is_cover)-Number(!!a.is_cover)||Number(a.sort_order||0)-Number(b.sort_order||0));
      const wizard=/^\s*(?:[a-d]\)|3\)\s*Embalagem)/i.test(title);
      if(!id||!title||!price||!pics.length||wizard){omitted.push(id);continue;}
      const desc=clean(p.description||p.short_description)||title+' - feito sob encomenda. Consulte disponibilidade.';
      rows.push([id,title,desc.slice(0,4500),'available for order','new',price.toFixed(2)+' BRL',SITE+'/produto?id='+encodeURIComponent(id),img(pics[0].storage_path),'Delicias da Cida'].map(csv).join(','));
    }
    if(rows.length-1<45)throw Error('Too few sellable products: '+(rows.length-1));
    return new Response('\uFEFF'+rows.join('\r\n')+'\r\n',{headers:{'Content-Type':'text/csv; charset=utf-8','Cache-Control':'public, max-age=300','X-Cida-Feed-Items':String(rows.length-1),'X-Cida-Feed-Omitted':omitted.join(','),'X-Content-Type-Options':'nosniff'}});
  }catch(err){console.error('Meta feed:',err);return new Response('Feed temporarily unavailable',{status:503,headers:{'Cache-Control':'no-store'}});}
}
