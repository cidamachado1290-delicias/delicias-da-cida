(function(){
  const API_BASE = 'https://deliciasdacidapba.com.br/wp-json/wc/store';
  const WHATSAPP = '5567981032677';
  const DEFAULT_MESSAGE = 'Olá, vim pelo site Delícias da Cida e me encantei por este produto: [NOME DO PRODUTO]. Gostaria de saber valores, disponibilidade e prazo de encomenda.';

  const HOME_GROUPS = [
    { title: 'Delícias Mais Pedidas', description: 'Os queridinhos reais do catálogo para celebrar com afeto, beleza e sabor.', ids: [2739, 3424, 5215, 2554] },
    { title: 'Bolos Delícias', description: 'Bolos recheados oficiais da loja, organizados por nível de recheio e ocasião.', ids: [2746, 2745, 2744, 2743] },
    { title: 'Delícias Cremosas', description: 'Tortas, sobremesas e taças cadastradas no cardápio da Delícias da Cida.', ids: [4259, 4243, 4230, 3407, 3260] },
    { title: 'Confeitaria Inclusiva', description: 'Produtos especiais para acolher restrições sem perder sabor, carinho e presença.', ids: [5167, 5158, 4537] }
  ];

  const CACHED_CATEGORIES = [
    { id: 999, name: 'Docinhos Gourmet', slug: 'docinhos-gourmet', count: 1, permalink: 'https://deliciasdacidapba.com.br/produto/docinhos-gourmet-deliciasdacidapba/' },
    { id: 68, name: 'Banoffee', slug: 'banoffee', count: 1, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/banoffee/' },
    { id: 67, name: 'Bolo da Vovó', slug: 'bolo-da-vovo', count: 1, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/bolo-da-vovo/' },
    { id: 70, name: 'Bolo Nega Maluca', slug: 'bolo-nega-maluca', count: 1, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/bolo-nega-maluca/' },
    { id: 64, name: 'Bolos Fit', slug: 'bolos-fit', count: 1, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/bolos-fit/' },
    { id: 72, name: 'Chocotones', slug: 'panetones-e-chocotones', count: 12, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/panetones-e-chocotones/' },
    { id: 77, name: 'Panetones', slug: 'panetones', count: 11, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/panetones/' },
    { id: 91, name: 'Confeitaria Inclusiva', slug: 'confeitaria-inclusiva', count: 3, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/confeitaria-inclusiva/' },
    { id: 89, name: 'Ovos de Páscoa', slug: 'ovos-de-pascoa', count: 8, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/ovos-de-pascoa/' },
    { id: 62, name: 'Bentô Cake', slug: 'bento-cake', count: 4, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/bento-cake/' },
    { id: 57, name: 'Bolos', slug: 'bolos', count: 7, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/bolos/' },
    { id: 58, name: 'Tortas Doces', slug: 'tortas-doces', count: 10, permalink: 'https://deliciasdacidapba.com.br/categoria-produto/tortas-doces/' }
  ];

  const REAL_PRODUCTS = {
    2739: product(2739, '1) Bentô Cake', 'https://deliciasdacidapba.com.br/produto/mini-bento-cake/', 'de R$49,90 a R$84,90', 62, 'Bentô Cake', 'Disponível em Mini Bentô Cake de aproximadamente 600g e Mega Bentô Cake de aproximadamente 1kg. Massa branca ou chocolate, recheio de brigadeiro de ninho ou brigadeiro trufado e desenho personalizado.'),
    3424: product(3424, 'Torta Paulista', 'https://deliciasdacidapba.com.br/produto/torta-paulista/', 'por apenas R$74,90/kg', 58, 'Tortas Doces', 'Sobremesa com camadas de biscoito e creme, cerejas frescas e paladar suave, criada para entregar textura e sabor em cada fatia.'),
    5215: product(5215, 'Crunch Cake', 'https://deliciasdacidapba.com.br/produto/crunch-cake/', 'a partir de R$84,90/kg', 57, 'Bolos', 'Bolo crocante com massa de chocolate úmida, ganache cremosa de chocolate meio amargo e camada crunch para uma experiência intensa de textura e sabor.'),
    2554: product(2554, 'Banoffee', 'https://deliciasdacidapba.com.br/produto/torta-banoffee/', 'R$74,90/kg', 68, 'Banoffee', 'Torta com banana fresca, creme de leite condensado caramelizado e base crocante de biscoitos. Uma sobremesa clássica, cremosa e marcante.'),
    2746: product(2746, 'Bolos Recheios Super Especiais', 'https://deliciasdacidapba.com.br/produto/bolo-delicias-recheios-super-especiais-por-kg/', 'a partir de R$99,90/kg', 57, 'Bolos', 'Linha de bolos super especiais com recheios premium como bolo com dinheiro, nozes, castanhas, Kit Kat, Ferrero Rocher, cookies, brownie, tsunami e elementos comestíveis.'),
    2745: product(2745, 'Bolos Recheios Especiais', 'https://deliciasdacidapba.com.br/produto/bolos-recheios-especiais/', 'a partir de R$89,90/kg', 57, 'Bolos', 'Bolos especiais com opções como brigadeiro de ninho com morango, Ninho com Nutella, trufado com bombons, Oreo, Red Velvet, prestígio e brigadeiros gourmet.'),
    2744: product(2744, 'Bolos Recheios Nobres', 'https://deliciasdacidapba.com.br/produto/bolo-recheios-nobres/', 'a partir de R$84,90/kg', 57, 'Bolos', 'Bolos nobres com recheios como brigadeiro de ninho, trufado de chocolate nobre, mousse de chocolate branco com morango, brigadeiro gourmet com bombons, prestígio e vulcão.'),
    2743: product(2743, 'Bolos Recheios Básicos', 'https://deliciasdacidapba.com.br/produto/bolo-recheios-basicos/', 'a partir de R$74,90/kg', 57, 'Bolos', 'Bolos básicos recheados com opções afetivas como doce de leite, abacaxi com coco, ameixa, pêssego com ganache de doce de leite e mousse de chocolate com morango.'),
    4259: product(4259, 'Torta Cheesecake', 'https://deliciasdacidapba.com.br/produto/torta-cheesecake/', 'de R$84,90/kg', 58, 'Tortas Doces', 'Cheesecake com opções de frutas vermelhas, frutas amarelas ou chocolate, em base de biscoito, bolo de chocolate, bolo branco ou Red Velvet com creme especial de cream cheese.'),
    4243: product(4243, 'Torta de Vitrine', 'https://deliciasdacidapba.com.br/produto/torta-de-vitrine/', 'de R$74,90/kg', 58, 'Tortas Doces', 'Torta de vitrine com massas de biscoito de maisena, bolo de chocolate, bolo branco ou Red Velvet, combinadas com creme especial de ninho, chocolate branco, Nutella e doce de leite.'),
    4230: product(4230, 'Sobremesa na Travessa', 'https://deliciasdacidapba.com.br/produto/sobremesa-na-travessa/', 'de R$59,90 a R$119,90', 58, 'Tortas Doces', 'Sobremesa com massa especial de pão de mel, recheio de doce de leite e ganache de chocolate nobre. Disponível em travessa P e G.'),
    3407: product(3407, 'Sobremesa na Taça', 'https://deliciasdacidapba.com.br/produto/sobremesa-na-taca/', 'de R$79,90 a R$99,90/kg', 58, 'Tortas Doces', 'Sobremesa na taça com opções cremosas como Ninho trufado com chocolate nobre e morango, chocolatuda com brigadeiro trufado e versões com chocotone e decoração especial.'),
    3260: product(3260, 'Zuppa Inglesa', 'https://deliciasdacidapba.com.br/produto/zuppa-inglesa/', 'de R$44,90 a R$69,90/kg', 58, 'Tortas Doces', 'Zuppa inglesa com suspiro e chantininho, opções de creme quatro leites com morango/frutas e ganache de doce de leite, ou creme belga branco com morango, coco e ganache.'),
    9001: product(9001, 'Docinhos Gourmet | @deliciasdacidapba', 'https://deliciasdacidapba.com.br/produto/docinhos-gourmet-deliciasdacidapba/', 'R$125,00 / 100 unidades', 999, 'Docinhos Gourmet', 'Docinhos gourmet artesanais para festas, casamentos e momentos especiais. Opções clássicas: Brigadeiro, Beijinho, Casadinho e Brigadeiro Bicho de Pé.'),
    5167: product(5167, 'Docinhos Zero Gluten, Zero Lactose', 'https://deliciasdacidapba.com.br/produto/docinhos-zero-gluten-zero-lactose/', 'a partir de R$1,75', 91, 'Confeitaria Inclusiva', 'Docinhos zero glúten e zero lactose feitos artesanalmente, com pedido mínimo de 50 unidades e sabores como brigadeiro no chocolate escuro.'),
    5158: product(5158, 'Bolo Zero Gluten, Zero Lactose', 'https://deliciasdacidapba.com.br/produto/bolo-zero-gluten-zero-lactose/', 'a partir de R$89,90/kg', 91, 'Confeitaria Inclusiva', 'Bolo fofinho zero glúten e zero lactose, feito artesanalmente para quem busca restrição alimentar com sabor de confeitaria afetiva.'),
    4537: product(4537, 'Bolo Zero Gluten', 'https://deliciasdacidapba.com.br/produto/bolo-zero-gluten/', 'a partir de R$89,90/kg', 57, 'Bolos', 'Bolo com massa especial artesanal com farinha de arroz e recheios como creme especial de brigadeiro de ninho com chocolate branco, Nutella e ganache com doce de leite.')
  };

  function product(id, name, permalink, priceText, categoryId, categoryName, description){
    return {
      id, name, permalink, priceText,
      short_description: description,
      description,
      categories: [{ id: categoryId, name: categoryName }],
      images: [],
      prices: null,
      isCachedRealProduct: true
    };
  }



  const PRODUCT_IMAGE_CACHE = {
    2739: [
      'assets/bentos/b5.jpeg',
      'assets/bentos/b6.jpeg',
      'assets/bentos/b1.jpeg'
    ],
    3424: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/05/AnyConv.com__1-16.webp'
    ],
    5215: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/11/crunch-cake-delicias-da-cida-4-600x600.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/11/crunch-cake-delicias-da-cida-6-600x600.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/11/crunch-cake-delicias-da-cida-7-600x600.webp'
    ],
    2554: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__1-1-3.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__2-1-3.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__8-10.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/2-1.png'
    ],
    2746: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__18-1-1.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__3-5.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__2-5.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__4-5.webp'
    ],
    2745: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__15-1-1-1.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__4-7.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__5-8.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__6-8.webp'
    ],
    2744: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__12-1-1-1.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__3-5.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__15-1-1-1.webp'
    ],
    2743: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__19.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__22-2.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__21.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__23-1.webp'
    ],
    4259: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/12/AnyConv.com__5-2.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/12/AnyConv.com__6-2.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/12/AnyConv.com__Design-sem-nome-2.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/12/AnyConv.com__8-2-1.webp'
    ],
    4243: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/12/AnyConv.com__13-1.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/12/AnyConv.com__15-1.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/12/AnyConv.com__14.webp'
    ],
    4230: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__3-13.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__1-15.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__2-14.webp'
    ],
    3407: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/05/AnyConv.com__WhatsApp-Image-2024-05-01-at-11.55.49-600x597.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/05/AnyConv.com__WhatsApp-Image-2024-05-01-at-11.56.06-600x596.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/05/AnyConv.com__WhatsApp-Image-2024-05-01-at-11.56.35-600x599.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/05/AnyConv.com__WhatsApp-Image-2024-05-01-at-11.56.50-600x599.webp'
    ],
    3260: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__1-13.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__zuppa-1-1.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__2-12.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2024/04/AnyConv.com__zuppa-2-1.webp'
    ],
    9001: [
      'assets/importados/catalogos/docinhos-gourmet-1.webp',
      'assets/importados/catalogos/docinhos-gourmet-2.webp',
      'assets/importados/catalogos/docinhos-gourmet-3.webp'
    ],
    5167: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/10/docinho-zero-gluten-delicias-da-cida-paranaiba-5-600x600.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/10/docinho-zero-gluten-delicias-da-cida-paranaiba-600x600.jpg',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/10/docinho-zero-gluten-delicias-da-cida-paranaiba-1-1-600x600.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/10/docinho-zero-gluten-delicias-da-cida-paranaiba-2-1-600x600.webp'
    ],
    5158: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/10/bolo-zero-gluten-delicias-da-cida-paranaiba-2-600x600.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/10/bolo-zero-gluten-delicias-da-cida-paranaiba-1-600x600.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/10/bolo-zero-gluten-delicias-da-cida-paranaiba-3-600x600.webp'
    ],
    4537: [
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/01/AnyConv.com__WhatsApp-Image-2025-01-04-at-09.51.06-1-1-600x1067.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/01/AnyConv.com__WhatsApp-Image-2025-01-04-at-09.51.06-2-600x1067.webp',
      'https://deliciasdacidapba.com.br/wp-content/uploads/2025/10/bolo-zero-gluten-delicias-da-cida-paranaiba-1-600x600.webp'
    ]
  };

  const PRODUCT_FULL_HTML = {
    2739: `<h2>1) Bentô Cake</h2><p>Disponível em 2 tamanhos:</p><h3>Mini Bentô Cake — R$49,90</h3><p>Aproximadamente 600g. Serve em média 4 a 5 pessoas.</p><h3>Mega Bentô Cake — R$84,90</h3><p>Aproximadamente 1kg. Serve em média 9 a 10 pessoas.</p><ul><li>Massa: branca ou chocolate.</li><li>Recheio: brigadeiro de ninho ou brigadeiro trufado.</li><li>Desenho personalizado. Se precisar de ideias, a equipe ajuda.</li><li>Opcionais: morango, bombom ou Nutella.</li></ul>`,
    3424: `<h2>Torta Paulista</h2><p>Sobremesa com camadas de biscoito e creme, cerejas frescas e paladar suave, criada para entregar textura e sabor em cada fatia.</p><p>Ideal para festas, encontros em família e ocasiões em que a sobremesa precisa chegar bonita, cremosa e com sabor afetivo.</p>`,
    5215: `<h2>Crunch Cake</h2><p>Bolo crocante com massa de chocolate úmida, ganache cremosa de chocolate meio amargo e camada crunch para uma experiência intensa de textura e sabor.</p><p>Uma opção marcante para quem ama chocolate, cremosidade e aquele toque crocante que transforma a sobremesa em destaque da mesa.</p>`,
    2554: `<h2>Banoffee</h2><p>A torta Banoffee combina camadas de banana fresca, creme de leite condensado caramelizado e base crocante de biscoitos.</p><p>A doçura da banana contrasta com a suavidade do creme e a crocância da base, criando uma sobremesa cremosa, clássica e muito marcante.</p>`,
    2746: `<h2>Bolos Super Especiais</h2><p>Escolha uma opção de recheio:</p><ul><li>Bolo com dinheiro</li><li>Nozes e castanhas</li><li>Kit Kat ou Ferrero Rocher em cima</li><li>Cookies ou brownie</li><li>Brigadeiro de ninho com bombom</li><li>Brigadeiro branco, normal ou gourmet</li><li>Elementos comestíveis</li><li>Tsunami</li></ul><p>Escolha também a massa: branca, chocolate, Red Velvet ou mesclada. Pedido com orientação pelo WhatsApp e confirmação de peso/finalização.</p>`,
    2745: `<h2>Bolos Recheios Especiais</h2><p>Opções especiais para festas e celebrações, com combinações como brigadeiro de ninho com morango, Ninho com Nutella, trufado com bombons, Oreo, Red Velvet, prestígio e brigadeiros gourmet.</p><p>Escolha a massa, o recheio e a finalização. A equipe confirma peso, disponibilidade, prazo e detalhes do acabamento pelo WhatsApp.</p>`,
    2744: `<h2>Bolos Recheios Nobres</h2><p>Escolha uma opção de recheio:</p><ul><li>Brigadeiro de Ninho</li><li>Trufado de Chocolate Nobre</li><li>Mousse de Chocolate Branco com Morango</li><li>Brigadeiro Gourmet com Bombons</li><li>Prestígio</li><li>Vulcão</li></ul><p>Depois, escolha a massa: branca, chocolate, Red Velvet ou mesclada. O peso final pode variar conforme recheios, frutas, cremes, raspas e finalização.</p><p>Pedidos com antecedência e sinal conforme orientação pelo WhatsApp.</p>`,
    2743: `<h2>Bolos Recheios Básicos</h2><p>Bolos básicos recheados com opções afetivas como doce de leite, abacaxi com coco, ameixa, pêssego com ganache de doce de leite e mousse de chocolate com morango.</p><p>Uma linha pensada para quem quer sabor tradicional, acabamento bonito e aquele toque caseiro que combina com aniversários, cafés e celebrações familiares.</p>`,
    4259: `<h2>Torta Cheesecake</h2><p>Disponível em opções com frutas vermelhas, frutas amarelas ou chocolate.</p><p>Opções de massa/base: biscoito de maisena com creme especial de cream cheese, bolo de chocolate, bolo branco ou Red Velvet.</p><p>Uma torta cremosa, elegante e perfeita para ocasiões especiais.</p>`,
    4243: `<h2>Torta de Vitrine</h2><p>Disponível em quatro tipos de massa/base:</p><ul><li>Base com biscoito de maisena</li><li>Massa de bolo de chocolate</li><li>Massa de bolo branca</li><li>Massa Red Velvet</li></ul><p>Combina creme especial de ninho, chocolate branco, Nutella e doce de leite.</p>`,
    4230: `<h2>Sobremesa na Travessa</h2><p>Massa especial de pão de mel, recheio de doce de leite e ganache de chocolate nobre.</p><ul><li>Travessa P: serve aproximadamente 4 pessoas.</li><li>Travessa G: serve aproximadamente 10 pessoas.</li></ul><p>Consulte disponibilidade, prazo e finalização pelo WhatsApp.</p>`,
    3407: `<h2>Sobremesa na Taça</h2><p>Sobremesa cremosa na taça com versões generosas e decoração especial.</p><p>Opções como Ninho trufado com chocolate nobre e morango, chocolatuda com brigadeiro trufado e combinações sazonais com chocotone.</p>`,
    3260: `<h2>Zuppa Inglesa</h2><p>Sobremesa com suspiro e chantininho.</p><ul><li>Zuppa 1500g: creme quatro leites com morango/frutas e ganache de doce de leite.</li><li>Zuppa 600g: creme belga branco com morango, coco em flocos e ganache de doce de leite.</li><li>Adicional de bombom disponível sob consulta.</li></ul>`,
    9001: `<h2>Docinhos Gourmet | @deliciasdacidapba</h2><p>Docinhos gourmet 100% artesanais para festas, casamentos, aniversários e momentos especiais. Uma linha clássica, afetiva e pronta para deixar a mesa mais bonita e saborosa.</p><p><strong>Valor de referência:</strong> R$125,00 / 100 unidades.</p><h3>Opções disponíveis</h3><ul><li>Brigadeiro</li><li>Beijinho</li><li>Casadinho</li><li>Brigadeiro Bicho de Pé</li></ul><p>Consulte fotos, sabores, disponibilidade e prazo pelo WhatsApp antes de fechar o pedido.</p>`,
    5167: `<h2>Docinhos Zero Glúten, Zero Lactose</h2><p>Pequenos no tamanho, gigantes no sabor. Feitos artesanalmente com ingredientes selecionados e toque caseiro.</p><p>Perfeitos para festas, presentes ou para adoçar o dia. Pedido mínimo de 50 unidades.</p><h3>Sabores disponíveis</h3><ul><li>Brigadeiro no chocolate escuro</li><li>Brigadeiro de ninho</li><li>Brigadeiro de ninho com uva</li><li>Brigadeiro de nozes</li><li>Brigadeiro de pistache</li><li>Brigadeiro flocado no amendoim</li><li>Casadinho</li><li>Olho de sogra</li><li>Beijinho</li><li>Beijinho com damasco</li><li>Cajuzinho</li><li>Camafeu de nozes no fondant</li><li>Camafeu de pistache no fondant</li></ul>`,
    5158: `<h2>Bolo Zero Glúten, Zero Lactose</h2><p>Bolo fofinho, artesanal e preparado para quem busca restrição alimentar sem abrir mão de sabor, textura e apresentação.</p><p>Consulte recheios, sabores disponíveis, peso, prazo e cuidados de produção pelo WhatsApp.</p>`,
    4537: `<h2>Bolo Zero Glúten</h2><p>Bolo com massa especial artesanal com farinha de arroz e recheios como creme especial de brigadeiro de ninho com chocolate branco, Nutella e ganache com doce de leite.</p><p>Uma opção especial para quem precisa evitar glúten e ainda quer uma experiência de confeitaria bonita e saborosa.</p>`
  };

  Object.entries(PRODUCT_IMAGE_CACHE).forEach(([id, urls]) => {
    if(!REAL_PRODUCTS[id]) return;
    REAL_PRODUCTS[id].images = urls.map((src, index) => ({ src, thumbnail: src, name: `${REAL_PRODUCTS[id].name} - foto ${index + 1}`, alt: REAL_PRODUCTS[id].name }));
  });
  Object.entries(PRODUCT_FULL_HTML).forEach(([id, html]) => {
    if(!REAL_PRODUCTS[id]) return;
    REAL_PRODUCTS[id].description = html;
    REAL_PRODUCTS[id].short_description = strip(html).slice(0, 260);
  });

  function $(selector){ return document.querySelector(selector); }
  function esc(value){ return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch])); }
  function strip(html){ const div=document.createElement('div'); div.innerHTML=html || ''; return div.textContent || div.innerText || ''; }
  function safeHtml(html){
    const template = document.createElement('template');
    template.innerHTML = html || '';
    const allowed = new Set(['H2','H3','H4','H5','P','UL','OL','LI','STRONG','B','EM','I','BR','SPAN']);
    template.content.querySelectorAll('*').forEach(el => {
      if(!allowed.has(el.tagName)){ el.replaceWith(document.createTextNode(el.textContent || '')); return; }
      [...el.attributes].forEach(attr => el.removeAttribute(attr.name));
    });
    return template.innerHTML;
  }
  function normalizeKey(value){ return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); }

  function buildUrl(path, params){
    const url = new URL(API_BASE + path);
    Object.entries(params || {}).forEach(([key, value]) => {
      if(value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
    });
    return url.toString();
  }
  async function getJson(path, params){
    const res = await fetch(buildUrl(path, params), { headers: { 'Accept': 'application/json' }, mode: 'cors' });
    if(!res.ok) throw new Error('Falha ao carregar catálogo');
    return res.json();
  }
  function mergeProduct(cached, live){
    if(!live || !live.id) return cached;
    const liveImages = Array.isArray(live.images) ? live.images.filter(img => img && (img.src || img.thumbnail) && !/cropped-AnyConv\.com__Natal-Delicias-da-Cida/i.test(img.src || img.thumbnail || '')) : [];
    const cachedImages = cached && Array.isArray(cached.images) ? cached.images : [];
    return Object.assign({}, cached || {}, live, {
      images: liveImages.length ? liveImages : cachedImages,
      priceText: live.priceText || (live.price_html ? strip(live.price_html) : '') || (cached && cached.priceText) || '',
      description: live.description || (cached && cached.description) || live.short_description || '',
      short_description: live.short_description || (cached && cached.short_description) || live.description || '',
      permalink: live.permalink || (cached && cached.permalink) || ''
    });
  }
  function moneyFromPrices(prices){
    if(!prices) return '';
    const raw = prices.price || prices.regular_price || prices.sale_price || prices.min_price || '';
    if(!raw) return '';
    const minor = Number(prices.currency_minor_unit ?? 2);
    const amount = Number(raw) / Math.pow(10, minor);
    if(!Number.isFinite(amount) || amount <= 0) return '';
    return amount.toLocaleString('pt-BR', { style:'currency', currency: prices.currency_code || 'BRL' });
  }
  function isKgProduct(name, categoryName){ return /bolo|bolos|torta|tortas|sobremesa|cheesecake|banoffee|zuppa|cake/i.test(`${name || ''} ${categoryName || ''}`); }
  function isUnitProduct(name){ return /docinho|docinhos|bent[oô]|bombom|brigadeiro|unidade/i.test(name || ''); }
  function priceLabel(product){
    if(product && product.priceText){
      const txt = String(product.priceText).replace(/\s+/g, ' ').trim();
      if(/^a partir|^de |^por |^r\$/i.test(txt)) return txt.charAt(0).toUpperCase() + txt.slice(1);
      return txt;
    }
    const value = moneyFromPrices(product && product.prices);
    if(!value) return 'Consultar valor';
    const name = product.name || '';
    const category = product.categories && product.categories[0] ? product.categories[0].name : '';
    if(isKgProduct(name, category) && !isUnitProduct(name)) return `A partir de ${value} / kg`;
    return `A partir de ${value}`;
  }
  function imagesOf(product){
    const imgs = product && Array.isArray(product.images) ? product.images : [];
    return imgs.map((img, index) => ({
      src: img.src || img.thumbnail || '',
      alt: img.alt || img.name || product.name || `Foto ${index + 1}`
    })).filter(img => img.src);
  }
  function imageOf(product){ const imgs = imagesOf(product); return imgs[0] ? imgs[0].src : ''; }
  function categoryOf(product){ return product && product.categories && product.categories[0] ? product.categories[0] : null; }
  function categoryKicker(product){
    const category = categoryOf(product);
    return category && category.name ? `<span class="product-kicker">${esc(category.name)}</span>` : '<span class="product-kicker">Delícias da Cida</span>';
  }
  function productGallery(product){
    const imgs = imagesOf(product);
    const name = product && product.name ? product.name : 'DelÃ­cia artesanal';
    if(!imgs.length) return `<div class="detail-media no-image"><span>${esc(name)}</span></div>`;
    return `<div class="detail-gallery" data-gallery>
      <div class="detail-media">
        <img data-main-image src="${esc(imgs[0].src)}" alt="${esc(imgs[0].alt || name)}" onerror="this.onerror=null;this.src='assets/logo.png';this.classList.add('image-fallback-logo')">
        ${imgs.length > 1 ? `<button type="button" class="gallery-arrow gallery-prev" data-gallery-prev aria-label="Foto anterior">&#10094;</button><button type="button" class="gallery-arrow gallery-next" data-gallery-next aria-label="Pr&#243;xima foto">&#10095;</button><span class="gallery-count" data-gallery-count>1/${imgs.length}</span>` : ''}
      </div>
      ${imgs.length > 1 ? `<div class="gallery-thumbs" aria-label="Fotos do produto">${imgs.map((img, index) => `<button type="button" class="gallery-thumb ${index === 0 ? 'active' : ''}" data-gallery-thumb="${index}" data-src="${esc(img.src)}" data-alt="${esc(img.alt || name)}" aria-label="Exibir foto ${index + 1}" aria-pressed="${index === 0}"><img src="${esc(img.src)}" alt="${esc(img.alt || name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/logo.png';this.classList.add('image-fallback-logo')"></button>`).join('')}</div>` : ''}
    </div>`;
  }
  function bindGalleries(root){
    (root || document).querySelectorAll('[data-gallery]').forEach(gallery => {
      const main = gallery.querySelector('[data-main-image]');
      const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
      const counter = gallery.querySelector('[data-gallery-count]');
      let selected = 0;
      const show = index => {
        if(!main || !thumbs.length) return;
        selected = (index + thumbs.length) % thumbs.length;
        const btn = thumbs[selected];
        main.src = btn.dataset.src || main.src;
        main.alt = btn.dataset.alt || main.alt;
        thumbs.forEach((b, i) => {
          b.classList.toggle('active', i === selected);
          b.setAttribute('aria-pressed', String(i === selected));
        });
        if(counter) counter.textContent = `${selected + 1}/${thumbs.length}`;
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      };
      thumbs.forEach((btn, index) => btn.addEventListener('click', () => show(index)));
      gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(selected - 1));
      gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(selected + 1));
      gallery.addEventListener('keydown', event => {
        if(event.key === 'ArrowLeft'){ event.preventDefault(); show(selected - 1); }
        if(event.key === 'ArrowRight'){ event.preventDefault(); show(selected + 1); }
      });
    });
  }
  function premiumDescription(raw){
    const clean = safeHtml(raw || 'Consulte valores e disponibilidade pelo WhatsApp.');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = clean;
    const htmlWithBreaks = wrapper.innerHTML.replace(/<br\s*\/?\s*>/gi, '\n')
      .replace(/<\/(?:p|div|h[2-5]|li|ul|ol)>/gi, '\n');
    const text = strip(htmlWithBreaks)
      .replace(/\\r\\n|\\n|\\r/g, '\n')
      .replace(/\r\n?/g, '\n')
      .replace(/\u00a0/g, ' ');
    const lines = text.split(/\n+/).map(s => s.replace(/\s+/g, ' ').trim())
      .filter(Boolean).filter((s, i, arr) => i === 0 || s !== arr[i - 1]);
    // Preserve the original details but remove imported blank lines and duplicated adjacent text.
    return lines.map(line => {
      const heading = /^(?:\d+\)\s*)?(?:Mini|Mega) Bent[o\u00f4] Cake\b/i.test(line);
      const special = /^(?:Escolha:|Opcionais:|Massa:|Recheio:|Tamanho:|Ingredientes:)/i.test(line);
      return heading ? `<h3>${esc(line)}</h3>` :
        special ? `<p class="product-detail-accent">${esc(line)}</p>` : `<p>${esc(line)}</p>`;
    }).join('');
  }
  function premiumSnippet(raw, priceText){
    const clean = String(raw || '').replace(/\\r\\n|\\n|\\r/g, ' ').replace(/\s+/g, ' ').trim();
    const text = strip(safeHtml(clean)).trim();
    if(!text || text.toLowerCase() === String(priceText || '').toLowerCase()) return '';
    if(/^\s*(?:de|a partir de|por apenas)?\s*r\$\s*[\d.,]+\s*(?:a\s*r\$\s*[\d.,]+)?\s*$/i.test(text)) return '';
    return text.slice(0, 165);
  }
  function premiumHighlights(product){
    const text = strip(product.description || '').replace(/\\r\\n|\\n|\\r/g, ' ').replace(/\s+/g, ' ');
    if(Number(product.id) !== 2739 || !/Mini Bent[o\u00f4] Cake/i.test(text) || !/Mega Bent[o\u00f4] Cake/i.test(text)) return '';
    return `<div class="premium-size-cards" aria-label="Tamanhos do Bent\u00f4 Cake">
      <div class="premium-size-card"><strong>Mini Bent\u00f4 Cake</strong><span>R$ 49,90</span><small>Aprox. 600 g \u00b7 Serve 4 a 5 pessoas</small></div>
      <div class="premium-size-card"><strong>Mega Bent\u00f4 Cake</strong><span>R$ 84,90</span><small>Aprox. 1 kg \u00b7 Serve 9 a 10 pessoas</small></div>
    </div>`;
  }
  function productUrl(id){ return `produto.html?id=${encodeURIComponent(id)}`; }
  function categoryUrl(id, name){ return `categoria.html?id=${encodeURIComponent(id)}${name ? `&nome=${encodeURIComponent(name)}` : ''}`; }
  function whatsUrl(name){
    const message = DEFAULT_MESSAGE.replace('[NOME DO PRODUTO]', name || 'uma delícia do catálogo');
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  }
  function productCard(product){
    const id = product.id;
    const name = String(product.name || REAL_PRODUCTS[id]?.name || 'Delícia artesanal').replace(/^\s*\d+\)\s*/, '').trim();
    const img = imageOf(product);
    const short = strip(product.short_description || product.description || '').slice(0, 150);
    return `<article class="product-card" data-product-id="${esc(String(id))}" onclick="window.location.href='${productUrl(id)}'" tabindex="0" role="link" aria-label="Abrir ${esc(name)}">
      <div class="product-media ${img ? '' : 'no-image'}">${img ? `<img src="${esc(img)}" alt="${esc(name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/logo.png';this.classList.add('image-fallback-logo')">` : `<span>${esc(name)}</span>`}</div>
      <div class="product-body">
        ${categoryKicker(product)}
        <h3>${esc(name)}</h3>
        <p>${esc(short || 'Produto artesanal preparado sob encomenda, com confirmação de valores e disponibilidade pelo WhatsApp.')}</p>
        <strong class="price-label">${esc(priceLabel(product))}</strong>
      </div>
      <div class="product-actions">
        <a class="btn btn-ghost-dark" href="${productUrl(id)}" onclick="event.stopPropagation()">Ver detalhes</a>
        <a class="btn btn-primary" href="${whatsUrl(name)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Pedir pelo WhatsApp</a>
      </div>
    </article>`;
  }
  async function fetchProductById(id){
    try{
      const live = await getJson(`/products/${id}`);
      return mergeProduct(REAL_PRODUCTS[id], live);
    }catch(err){
      return REAL_PRODUCTS[id];
    }
  }
  async function fetchHomeProducts(){
    const ids = HOME_GROUPS.flatMap(g => g.ids);
    const map = new Map(ids.map(id => [id, REAL_PRODUCTS[id]]));
    try{
      const products = await getJson('/products', { include: ids.join(','), per_page: 100 });
      (Array.isArray(products) ? products : []).forEach(p => map.set(Number(p.id), mergeProduct(REAL_PRODUCTS[p.id], p)));
      const missingImages = ids.filter(id => !imageOf(map.get(id)));
      if(missingImages.length){
        const detailed = await Promise.all(missingImages.map(fetchProductById));
        detailed.forEach(p => p && map.set(Number(p.id), p));
      }
    }catch(err){
      document.documentElement.dataset.catalogSource = 'cache';
      const detailed = await Promise.all(ids.map(fetchProductById));
      detailed.forEach(p => p && map.set(Number(p.id), p));
    }
    return map;
  }
  function renderHomeProducts(map){
    const wrap = $('#homeProductGroups');
    if(!wrap) return;
    wrap.innerHTML = HOME_GROUPS.map(group => `<section class="catalog-group">
      <div class="catalog-group-head">
        <div><span class="tag">${esc(group.title)}</span><h3>${esc(group.description)}</h3></div>
      </div>
      <div class="product-grid">${group.ids.map(id => productCard(map.get(id) || REAL_PRODUCTS[id])).join('')}</div>
    </section>`).join('');
  }

  async function fetchCategories(){
    try{
      const live = await getJson('/products/categories', { per_page: 100 });
      if(Array.isArray(live) && live.length){
        return live.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          count: cat.count,
          permalink: cat.permalink || cat.link || `https://deliciasdacidapba.com.br/categoria-produto/${cat.slug || ''}/`
        }));
      }
    }catch(err){
      console.warn('Categorias carregadas do cache local.', err);
    }
    return CACHED_CATEGORIES;
  }

  function renderHomeCategories(categories){
    const wrap = $('#homeCategoryGrid');
    if(!wrap) return;
    const wanted = CACHED_CATEGORIES;
    const byName = new Map(categories.map(c => [normalizeKey(c.name), c]));
    wrap.innerHTML = wanted.map(base => {
      const cat = byName.get(normalizeKey(base.name)) || categories.find(c => normalizeKey(c.slug) === normalizeKey(base.slug)) || base;
      const href = categoryUrl(cat.id || base.id, base.name);
      return `<a class="category-chip" href="${href}" data-category-id="${esc(cat.id || base.id)}"><span>${esc(base.name)}</span><small>${cat.count ? `${esc(cat.count)} opções` : 'Ver opções'}</small></a>`;
    }).join('');
  }
  async function initHome(){
    const status = $('#catalogStatus');
    const [productMap, categories] = await Promise.all([fetchHomeProducts(), fetchCategories()]);
    renderHomeProducts(productMap);
    renderHomeCategories(categories);
    wrap.addEventListener('click', event => {
      const button = event.target.closest('[data-gourmet-photo]');
      if(!button || !wrap.contains(button)) return;
      const section = button.closest('.cida-gourmet-showcase');
      const main = section && section.querySelector('[data-gourmet-main]');
      if(!main) return;
      main.src = button.dataset.src || main.src;
      main.alt = button.dataset.alt || main.alt;
      section.querySelectorAll('[data-gourmet-photo]').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active',active);
        item.setAttribute('aria-pressed',String(active));
      });
    }, {once:false});
    if(status) status.innerHTML = '<span>✓</span> Delícias carregadas. Toque em uma opção para ver detalhes ou pedir pelo WhatsApp.';
  }
  async function initProductPage(){
    const page = $('#productPage');
    if(!page) return;
    const id = Number(new URLSearchParams(location.search).get('id'));
    if(!id){ page.innerHTML = emptyState('Produto não encontrado', 'Volte para a home e escolha uma delícia do catálogo.'); return; }
    let product = REAL_PRODUCTS[id];
    try{ product = mergeProduct(product, await getJson(`/products/${id}`)); }catch(err){}
    if(!product){
      page.innerHTML = emptyState('Produto não encontrado', 'Volte para a home e escolha uma delícia do catálogo.');
      return;
    }
    renderProductPage(product);
  }
  function renderProductPage(product){
    const page = $('#productPage');
    const name = product.name || 'Produto do cat\u00e1logo';
    const displayName = name.replace(/^\s*\d+\)\s*/, '');
    const price = priceLabel(product);
    const descriptionHtml = premiumDescription(product.description || product.short_description || '');
    const category = product.categories && product.categories[0] ? product.categories[0] : null;
    const summary = premiumSnippet(product.short_description || '', price);
    const orderHref = whatsUrl(name);
    page.innerHTML = `<section class="detail-hero premium-product-page">
      <a class="back-link" href="catalogo.html">\u2190 Voltar ao card\u00e1pio</a>
      <div class="detail-grid">
        ${productGallery(product)}
        <div class="detail-copy">
          ${category ? `<span class="tag">${esc(category.name)}</span>` : '<span class="tag">Del\u00edcias da Cida</span>'}
          <h1>${esc(displayName)}</h1>
          ${category ? `<a class="mini-category-link" href="${categoryUrl(category.id, category.name)}">${esc(category.name)}</a>` : ''}
          <strong class="price-label big">${esc(price)}</strong>
          ${summary ? `<p class="premium-product-summary">${esc(summary)}</p>` : ''}
          ${premiumHighlights(product)}
          <div class="detail-actions">
            <a class="btn btn-primary" href="${orderHref}" target="_blank" rel="noopener">Pedir pelo WhatsApp \u2192</a>
            <a class="btn btn-ghost-dark" href="catalogo.html">Ver outras del\u00edcias</a>
          </div>
          <details class="premium-detail-accordion">
            <summary>Ver todos os detalhes e op\u00e7\u00f5es</summary>
            <div class="product-full-description">${descriptionHtml}</div>
          </details>
          <div class="order-note">Valores, disponibilidade, peso, sabores e prazo s\u00e3o confirmados diretamente com a Cida antes do fechamento.</div>
        </div>
      </div>
    </section>`;
    bindGalleries(page);
    document.title = `${displayName} | Del\u00edcias da Cida`;
  }
  async function initCategoryPage(){
    const page = $('#categoryPage');
    if(!page) return;
    const params = new URLSearchParams(location.search);
    const id = Number(params.get('id'));
    const nome = params.get('nome');
    const categories = await fetchCategories();
    const category = categories.find(c => Number(c.id) === id) || CACHED_CATEGORIES.find(c => Number(c.id) === id || normalizeKey(c.name) === normalizeKey(nome)) || { id, name: nome || `Categoria #${id}` };
    let products = Object.values(REAL_PRODUCTS).filter(p => (p.categories || []).some(c => Number(c.id) === Number(category.id) || normalizeKey(c.name) === normalizeKey(category.name)));
    try{
      if(category.id){
        const live = await getJson('/products', { category: category.id, per_page: 100 });
        if(Array.isArray(live) && live.length) products = live.map(p => mergeProduct(REAL_PRODUCTS[p.id], p));
      }
    }catch(err){}
    renderCategoryPage(category, products);
  }
  function renderCategoryPage(category, products){
    const page = $('#categoryPage');
    const name = category.name || 'Categoria';
    page.innerHTML = `<section class="category-page-head">
      <a class="back-link" href="catalogo.html">← Voltar ao cardápio</a>
      <span class="tag">Categoria</span>
      <h1>${esc(name)}</h1>
      <p>Veja as opções desta categoria e consulte disponibilidade, valores e prazo pelo WhatsApp.</p>
    </section>
    ${products.length ? `<div class="product-grid detail-list">${products.map(productCard).join('')}</div>` : emptyState('Nenhum produto carregado nesta categoria', 'A categoria foi aberta, mas não há produtos desta vitrine vinculados a ela no momento. Fale com a Cida para receber opções disponíveis.')}`;
    bindGalleries(page);
    document.title = `${name} | Delícias da Cida`;
  }
  function emptyState(title, text){ return `<div class="catalog-empty"><h2>${esc(title)}</h2><p>${esc(text)}</p><a class="btn btn-primary" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">Falar com a Cida</a></div>`; }


  /* Flow import premium: trazer o site raiz para 7 seções sem perder calculadoras */
  const FLOW_CATALOG_SECTIONS = [
    {
      key: 'mais-pedidos',
      title: 'Mais Pedidos',
      tag: 'Clássicos mais buscados',
      description: 'Uma vitrine com as delícias que mais aparecem no catálogo oficial: bolos, tortas e sobremesas artesanais para pedir com segurança pelo WhatsApp.',
      ids: [2739, 3424, 5215, 2554, 3260, 4259, 4243, 3407]
    },
    {
      key: 'bolos-artesanais',
      title: 'Bolos Artesanais',
      tag: 'Feitos sob encomenda',
      description: 'Bolos recheados, bentô, linhas especiais, bolos fit e opções afetivas para aniversário, família e celebrações. Fotos e textos vêm do catálogo oficial sempre que disponíveis.',
      categorySlugs: ['bolos', 'bento-cake', 'bolo-da-vovo', 'bolo-nega-maluca', 'bolos-fit'],
      fallbackIds: [2743, 2744, 2745, 2746, 2739, 4537, 5215]
    },
    {
      key: 'doces-gourmet',
      title: 'Doces Gourmet',
      tag: '100% artesanais',
      description: 'Docinhos gourmet 100% artesanais para festas, casamentos e momentos especiais. Bombons, brigadeiros, copinhos e opções finas com orientação da Cida para fotos, valores, sabores e disponibilidade pelo WhatsApp.',
      ids: [9001],
      categorySlugs: ['docinhos-gourmet'],
      fallbackIds: [9001]
    },
    {
      key: 'confeitaria-inclusiva',
      title: 'Confeitaria Inclusiva',
      tag: 'Cuidado em cada detalhe',
      description: 'Doce bom é aquele que todo mundo pode viver. Linha inclusiva com opções zero lactose, zero açúcar e zero glúten, feita com cuidado, ingredientes selecionados e orientação direta da Cida para cada pedido.',
      categorySlugs: ['confeitaria-inclusiva', 'bolos-fit'],
      fallbackIds: [5167, 5158, 4537]
    },
    {
      key: 'chocotones-especiais',
      title: 'Chocotones Especiais',
      tag: 'Produtos sazonais',
      description: 'Chocotones e panetones artesanais com recheios generosos, acabamentos premium e disponibilidade sazonal. Consulte a Cida para datas, sabores e produção.',
      categorySlugs: ['panetones-e-chocotones', 'panetones'],
      fallbackIds: []
    },
    {
      key: 'ovos-pascoa',
      title: 'Ovos de Páscoa',
      tag: 'Produtos sazonais',
      description: 'Ovos de colher e opções especiais de Páscoa importadas do catálogo oficial quando estiverem disponíveis. Produção sazonal com consulta de sabores e agenda pelo WhatsApp.',
      categorySlugs: ['ovos-de-pascoa'],
      fallbackIds: []
    },
    {
      key: 'galeria-catalogos',
      title: 'Galeria de Catálogos',
      tag: 'Catálogo visual oficial',
      description: 'Para ver a galeria completa de doces gourmet, opções e valores do catálogo original, acesse o catálogo oficial ou fale com a Cida pelo WhatsApp.',
      gallery: true
    }
  ];

  const FLOW_GALLERY_IMAGES = Array.from({ length: 16 }, (_, i) => ({
    src: `assets/importados/catalogos/catalogo-${String(i + 1).padStart(2, '0')}.jpeg`,
    alt: `Catálogo visual Delícias da Cida ${i + 1}`
  }));

  function findCategoryBySlugOrName(categories, slug){
    const key = normalizeKey(slug);
    return categories.find(c => normalizeKey(c.slug) === key || normalizeKey(c.name) === key || normalizeKey((c.permalink || '').split('/').filter(Boolean).pop()) === key);
  }

  async function fetchProductsByCategoryId(categoryId){
    if(!categoryId) return [];
    try{
      const live = await getJson('/products', { category: categoryId, per_page: 100 });
      return Array.isArray(live) ? live.map(p => mergeProduct(REAL_PRODUCTS[p.id], p)) : [];
    }catch(err){
      console.warn('Categoria carregada via fallback/cache.', categoryId, err);
      return [];
    }
  }

  async function fetchProductsForFlowSection(section, categories){
    if(section.gallery) return [];
    const products = [];
    const seen = new Set();
    const add = p => {
      if(!p || !p.id || seen.has(String(p.id))) return;
      seen.add(String(p.id));
      products.push(p);
    };
    if(Array.isArray(section.ids)){
      const detailed = await Promise.all(section.ids.map(fetchProductById));
      detailed.forEach(add);
    }
    if(Array.isArray(section.categorySlugs)){
      for(const slug of section.categorySlugs){
        const cat = findCategoryBySlugOrName(categories, slug);
        const live = await fetchProductsByCategoryId(cat && cat.id);
        live.forEach(add);
      }
    }
    if(!products.length && Array.isArray(section.fallbackIds)){
      section.fallbackIds.map(id => REAL_PRODUCTS[id]).filter(Boolean).forEach(add);
    }
    return products;
  }

  function renderFlowGallerySection(section){
    const msg = 'Olá, Cida! Vim pelo site da Delícias da Cida e quero ver fotos, opções, valores e disponibilidade do catálogo de doces gourmet.';
    return `<section class="catalog-group catalog-gallery-group">
      <div class="catalog-group-head">
        <div><span class="tag">${esc(section.tag)}</span><h3>${esc(section.title)}</h3><p>${esc(section.description)}</p></div>
      </div>
      <div class="gallery-cta">
        <a class="btn btn-ghost-dark" href="https://deliciasdacidapba.com.br/doces-gourmets/" target="_blank" rel="noopener">Abrir catálogo original</a>
        <a class="btn btn-primary" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Ver fotos e valores no WhatsApp</a>
      </div>
    </section>`;
  }


  function renderDocesGourmetHighlight(product){
    const images = imagesOf(product);
    const main = images[0] || {src:'assets/logo.png', alt:'Doces Gourmet'};
    const msg = 'Ol\u00e1, Cida! Quero conhecer os sabores, fotos, valores e disponibilidade dos Doces Gourmet.';
    const contact = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    const items = images.slice(0,8);
    const photos = items.length > 1 ? `<div class="cida-gourmet-photo-strip" aria-label="Galeria de doces gourmet">${items.map((img,index)=>`<button type="button" class="cida-gourmet-photo ${index === 0 ? 'is-active' : ''}" data-gourmet-photo data-src="${esc(img.src)}" data-alt="${esc(img.alt || 'Doces Gourmet')}" aria-label="Ver foto ${index + 1}" aria-pressed="${index === 0}"><img src="${esc(img.src)}" alt="" loading="lazy" onerror="this.onerror=null;this.src='assets/logo.png'"></button>`).join('')}</div>` : '';
    return `<article class="cida-gourmet-showcase">
      <div class="cida-gourmet-visual">
        <div class="cida-gourmet-main"><img data-gourmet-main src="${esc(main.src)}" alt="${esc(main.alt || 'Doces Gourmet da Cida')}" loading="lazy" onerror="this.onerror=null;this.src='assets/logo.png'"></div>
        ${photos}
      </div>
      <div class="cida-gourmet-info">
        <span class="cida-gourmet-label">FEITOS COM CARINHO</span>
        <h4>Doces Gourmet para momentos especiais</h4>
        <p>Artesanais e preparados para deixar sua comemora\u00e7\u00e3o ainda mais doce. Consulte as op\u00e7\u00f5es e monte sua encomenda com a Cida.</p>
        <div class="cida-gourmet-varieties" aria-label="Sabores cl\u00e1ssicos">
          <span>Brigadeiro</span><span>Beijinho</span><span>Casadinho</span><span>Bicho de P\u00e9</span>
        </div>
        <div class="cida-gourmet-note"><strong>Valores e encomendas</strong><span>Consulte pre\u00e7os, quantidades, sabores e disponibilidade diretamente com a Cida.</span></div>
        <div class="cida-gourmet-buttons"><a class="btn btn-primary" href="${contact}" target="_blank" rel="noopener">Pedir pelo WhatsApp</a><a class="btn btn-ghost-dark" href="${productUrl(product.id)}">Ver detalhes</a></div>
      </div>
    </article>`;
  }
  function sectionProductCard(product, section){
    const card = productCard(product);
    if(/chocotones|pascoa|páscoa|sazonais/i.test(section.key + ' ' + section.title)){
      return card.replace('<div class="product-body">', '<div class="product-body"><span class="seasonal-badge">Produto sazonal · consulte disponibilidade</span>');
    }
    return card;
  }

  async function renderHomeProducts(productMapIgnored, categoriesOverride){
    const wrap = $('#homeProductGroups');
    if(!wrap) return;
    const categories = categoriesOverride || await fetchCategories();
    const blocks = [];
    for(const section of FLOW_CATALOG_SECTIONS){
      if(section.gallery){
        blocks.push(renderFlowGallerySection(section));
        continue;
      }
      const products = await fetchProductsForFlowSection(section, categories);
      let sectionContent = products.length ? `<div class="product-grid">${products.map(product => sectionProductCard(product, section)).join('')}</div>` : `<div class="catalog-empty mini"><h2>${esc(section.title)}</h2><p>Essa categoria está preparada para puxar produtos do site oficial. Se não carregar localmente, consulte a Cida pelo WhatsApp.</p><a class="btn btn-primary" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">Falar com a Cida</a></div>`;
      if(section.key === 'doces-gourmet' && products.length){
        sectionContent = renderDocesGourmetHighlight(products[0]);
      }
      blocks.push(`<section class="catalog-group catalog-section-${esc(section.key)}">
        <div class="catalog-group-head">
          <div><span class="tag">${esc(section.tag)}</span><h3>${esc(section.title)}</h3><p>${esc(section.description)}</p></div>
        </div>
        ${sectionContent}
      </section>`);
    }
    wrap.innerHTML = blocks.join('');
  }

  function renderHomeCategories(categories){
    const wrap = $('#homeCategoryGrid');
    if(!wrap) return;
    const chips = FLOW_CATALOG_SECTIONS.filter(s => !s.gallery).map(section => {
      const firstSlug = section.categorySlugs && section.categorySlugs[0];
      const cat = firstSlug ? findCategoryBySlugOrName(categories, firstSlug) : null;
      const href = cat ? categoryUrl(cat.id, section.title) : `#cardapio-premium`;
      return `<a class="category-chip" href="${href}"><span>${esc(section.title)}</span><small>${section.gallery ? 'Ver galeria' : 'Explorar categoria'}</small></a>`;
    }).concat(`<a class="category-chip" href="#cardapio-premium"><span>Mais inspirações</span><small>Ver galeria</small></a>`);
    wrap.innerHTML = chips.join('');
  }

  async function initHome(){
    const wrap = document.getElementById('homeProductGroups');
    const status = $('#catalogStatus');
    const categories = await fetchCategories();
    await renderHomeProducts(null, categories);
    renderHomeCategories(categories);
    wrap.addEventListener('click', event => {
      const button = event.target.closest('[data-gourmet-photo]');
      if(!button || !wrap.contains(button)) return;
      const section = button.closest('.cida-gourmet-showcase');
      const main = section && section.querySelector('[data-gourmet-main]');
      if(!main) return;
      main.src = button.dataset.src || main.src;
      main.alt = button.dataset.alt || main.alt;
      section.querySelectorAll('[data-gourmet-photo]').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active',active);
        item.setAttribute('aria-pressed',String(active));
      });
    }, {once:false});
    if(status) status.innerHTML = '<span>✓</span> Catálogo premium carregado com produtos, galerias e categorias do site oficial.';
  }

  document.addEventListener('DOMContentLoaded', () => {
    if($('#homeProductGroups')) initHome();
    initProductPage();
    initCategoryPage();
  });
})();
