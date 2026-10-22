(function(){
  const SUPABASE_URL = 'https://impkkhztouayqhzwsaog.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_6suNtXmyZNYJXpSHIKkn8A_xLsEo6TV';
  const BUCKET = 'catalogo-produtos';
  const nativeFetch = window.fetch.bind(window);
  let cachePromise = null;

  function headers(){
    return {
      Accept: 'application/json',
      apikey: SUPABASE_KEY
    };
  }

  function storageUrl(path){
    if(!path) return '';
    const encoded = String(path)
      .split('/')
      .map(encodeURIComponent)
      .join('/');
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encoded}`;
  }

  async function rest(table, query){
    const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
    Object.entries(query || {}).forEach(([key, value]) => {
      if(value !== undefined && value !== null && value !== ''){
        url.searchParams.set(key, value);
      }
    });

    const res = await nativeFetch(url.toString(), {
      headers: headers(),
      mode: 'cors'
    });

    if(!res.ok){
      const body = await res.text().catch(() => '');
      throw new Error(`Supabase ${res.status}: ${body || res.statusText}`);
    }

    return res.json();
  }

  function productRow(row){
    const categories = (row.product_categories || [])
      .map(link => link && link.categories)
      .filter(Boolean)
      .map(category => ({
        id: Number(category.legacy_woocommerce_id) || category.id,
        name: category.name || '',
        slug: category.slug || ''
      }));

    const images = (row.product_images || [])
      .slice()
      .sort((a, b) =>
        Number(Boolean(b.is_cover)) - Number(Boolean(a.is_cover)) ||
        Number(a.sort_order || 0) - Number(b.sort_order || 0)
      )
      .map((image, index) => ({
        src: storageUrl(image.storage_path),
        thumbnail: storageUrl(image.storage_path),
        alt: image.alt || row.name || `Foto ${index + 1}`,
        name: image.alt || row.name || `Foto ${index + 1}`
      }))
      .filter(image => image.src);

    const numericPrice = Number(row.price);
    const prices = Number.isFinite(numericPrice) && numericPrice > 0
      ? {
          price: String(Math.round(numericPrice * 100)),
          regular_price: String(Math.round(numericPrice * 100)),
          currency_minor_unit: 2,
          currency_code: 'BRL'
        }
      : null;

    return {
      id: Number(row.legacy_woocommerce_id),
      name: row.name || '',
      slug: row.slug || '',
      description: row.description || '',
      short_description: row.short_description || '',
      categories,
      images,
      prices,
      priceText: row.price_note || '',
      permalink: `produto.html?id=${encodeURIComponent(row.legacy_woocommerce_id)}`
    };
  }

  async function load(){
    if(cachePromise) return cachePromise;

    cachePromise = Promise.all([
      rest('products', {
        select: 'legacy_woocommerce_id,name,slug,short_description,description,price,price_note,sort_order,product_categories(categories(legacy_woocommerce_id,name,slug)),product_images(storage_path,alt,sort_order,is_cover)',
        order: 'sort_order.asc,name.asc'
      }),
      rest('categories', {
        select: 'legacy_woocommerce_id,name,slug,description,sort_order',
        order: 'sort_order.asc,name.asc'
      })
    ]).then(([rows, categoryRows]) => {
      const products = (rows || [])
        .map(productRow)
        .filter(product => product.id);

      const counts = new Map();

      products.forEach(product => {
        (product.categories || []).forEach(category => {
          const key = String(category.id);
          counts.set(key, (counts.get(key) || 0) + 1);
        });
      });

      const categories = (categoryRows || []).map(category => {
        const id = Number(category.legacy_woocommerce_id) || category.id;
        return {
          id,
          name: category.name || '',
          slug: category.slug || '',
          description: category.description || '',
          count: counts.get(String(id)) || 0,
          permalink: `categoria.html?id=${encodeURIComponent(id)}&nome=${encodeURIComponent(category.name || '')}`
        };
      });

      return { products, categories };
    });

    return cachePromise;
  }

  function jsonResponse(data){
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  window.fetch = async function(input, init){
    const raw = typeof input === 'string'
      ? input
      : ((input && input.url) || '');

    let url;

    try{
      url = new URL(raw, location.href);
    }catch(_){
      return nativeFetch(input, init);
    }

    if(
      url.hostname !== 'deliciasdacidapba.com.br' ||
      !url.pathname.startsWith('/wp-json/wc/store/')
    ){
      return nativeFetch(input, init);
    }

    const { products, categories } = await load();
    const path = url.pathname.replace('/wp-json/wc/store', '');

    if(path === '/products/categories'){
      return jsonResponse(categories);
    }

    const match = path.match(/^\/products\/(\d+)$/);

    if(match){
      let id = Number(match[1]);

      if(id === 9001) id = 2555;

      const product = products.find(item => Number(item.id) === id);

      return product
        ? jsonResponse(product)
        : new Response('Not found', { status: 404 });
    }

    if(path === '/products'){
      let list = products.slice();

      const include = (url.searchParams.get('include') || '')
        .split(',')
        .map(Number)
        .filter(Boolean)
        .map(id => id === 9001 ? 2555 : id);

      if(include.length){
        list = list.filter(product => include.includes(Number(product.id)));
      }

      const categoryId = Number(url.searchParams.get('category'));

      if(categoryId){
        list = list.filter(product =>
          (product.categories || []).some(category =>
            Number(category.id) === categoryId
          )
        );
      }

      const perPage = Number(url.searchParams.get('per_page'));

      if(perPage > 0){
        list = list.slice(0, perPage);
      }

      return jsonResponse(list);
    }

    return nativeFetch(input, init);
  };

  document.documentElement.dataset.catalogSource = 'supabase';
})();
