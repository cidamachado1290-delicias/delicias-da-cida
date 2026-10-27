// Google Merchant Center preview feed. Does not alter the Meta feed or product data.
// Source of truth: previously validated Cloudflare Meta CSV (Supabase-backed).
const SITE = 'https://www.deliciasdacidapba.com.br';
const COLUMNS = ['id','title','description','link','image_link','availability','price','condition','brand','identifier_exists'];
function parseCsv(input) {
  const s = String(input || '').replace(/^\uFEFF/, '');
  const rows = []; let row = []; let value = ''; let quoted = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quoted) {
      if (c === '"' && s[i + 1] === '"') { value += '"'; i++; }
      else if (c === '"') quoted = false;
      else value += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(value); value = ''; }
    else if (c === '\n') { row.push(value.replace(/\r$/, '')); if (row.some(Boolean)) rows.push(row); row = []; value = ''; }
    else value += c;
  }
  if (quoted) throw Error('Unclosed CSV quote');
  if (value.length || row.length) { row.push(value); if (row.some(Boolean)) rows.push(row); }
  return rows;
}
function safeCell(value) {
  return String(value ?? '').replace(/[\t\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}
export async function onRequestGet() {
  try {
    const res = await fetch(SITE + '/meta-catalog.csv', {headers: {Accept: 'text/csv'}});
    if (!res.ok || !String(res.headers.get('content-type') || '').includes('text/csv')) throw Error('Meta feed unavailable');
    const rows = parseCsv(await res.text());
    const header = rows.shift();
    if (!header) throw Error('Missing header');
    const names = new Set(header);
    for (const col of ['id','title','description','link','image_link','availability','price','condition','brand']) {
      if (!names.has(col)) throw Error('Missing field: ' + col);
    }
    const items = []; const ids = new Set();
    for (const row of rows) {
      if (row.length !== header.length) throw Error('Malformed row');
      const p = Object.fromEntries(header.map((name, i) => [name, row[i]]));
      if (!/^\d+$/.test(p.id) || ids.has(p.id) || !/^\d+(\.\d{2}) BRL$/.test(p.price)) throw Error('Invalid id or price');
      if (!p.title || !p.description || !p.image_link || !p.link || !p.link.startsWith(SITE + '/')) throw Error('Incomplete item');
      ids.add(p.id);
      items.push({id:p.id,title:p.title.slice(0,150),description:p.description.slice(0,5000),link:p.link,image_link:p.image_link,
        // Source's 'available for order' indicates order acceptance, not guaranteed ready stock.
        // This mapping must be reviewed against real fulfillment before Merchant submission.
        availability:'in_stock',price:p.price,condition:'new',brand:'Delicias da Cida',identifier_exists:'no'});
    }
    if (items.length < 45 || items.length > 100) throw Error('Unexpected item count: ' + items.length);
    const body = '\uFEFF' + [COLUMNS.join('\t'), ...items.map(p => COLUMNS.map(k => safeCell(p[k])).join('\t'))].join('\n') + '\n';
    return new Response(body, {headers:{'Content-Type':'text/tab-separated-values; charset=utf-8','Content-Disposition':'inline; filename="google-catalog.txt"','Cache-Control':'public, max-age=300','X-Cida-Google-Items':String(items.length),'X-Content-Type-Options':'nosniff'}});
  } catch(err) {
    console.error('Google feed:', err);
    return new Response('Feed temporarily unavailable', {status:503,headers:{'Cache-Control':'no-store'}});
  }
}
