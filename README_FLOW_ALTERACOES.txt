Alterações realizadas pela Agência Flow

1. Home
- Inserida seção "Cardápio Premium" entre "Doces gourmet 100% artesanais para festas especiais" e "Tradição, carinho e experiência em cada encomenda".
- Adicionado link "Cardápio Premium" no menu principal e no rodapé.
- Criada vitrine dinâmica com sessões:
  - Delícias Mais Pedidas
  - Bolos Delícias
  - Delícias Cremosas
  - Confeitaria Inclusiva
- Criada área de categorias especiais.

2. Integração WooCommerce Store API
- Novo arquivo: products.js
- Produtos: https://deliciasdacidapba.com.br/wp-json/wc/store/products
- Categorias: https://deliciasdacidapba.com.br/wp-json/wc/store/products/categories
- Cards de produto abrem produto.html?id=ID.
- Botão "Pedir pelo WhatsApp" abre WhatsApp com mensagem pronta.
- Categorias abrem categoria.html?id=ID_DA_CATEGORIA quando a categoria é localizada pela API.

3. Páginas criadas
- produto.html
- categoria.html

4. Regras de preço
- Bolos, sobremesas e tortas: "A partir de R$ XX / kg" quando a API retorna preço.
- Docinhos e itens unitários: "A partir de R$ XX" quando a API retorna preço.
- Sem preço claro: "Consultar valor".

5. Observação técnica
- A vitrine tem fallback visual e nomes fixos para manter o site elegante mesmo se a API demorar ou falhar temporariamente.
