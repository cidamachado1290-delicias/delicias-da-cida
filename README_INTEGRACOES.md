# Integrações preparadas - Delícias da Cida V6

Esta versão foi organizada para conectar depois:

## Google Reviews
- Pasta: `integrations/google-reviews/`
- Cole o script do Elfsight, Trustindex ou EmbedSocial no bloco indicado em `index.html` ou use o arquivo `widget-placeholder.html`.

## Catálogos do site antigo
- Arquivos preparados em `data/catalogo-bolos.json` e `data/catalogo-doces.json`.
- Links de origem: site oficial, Catálogo Bolos e Catálogo Doces Gourmets.
- Próximo passo: importar fotos em `assets/produtos/` e trocar `precoReferencia` quando a Cida confirmar valores atuais.

## Supabase + IA
- Pasta `supabase/` já contém schema e Edge Function base para evoluir o Vida Delícia com IA real.
- Nunca colocar chave da IA direto no front-end. Use Supabase Edge Function/Secrets.

## WhatsApp
- Número atual: +55 67 98103-2677.
- Todos os botões principais montam mensagem pré-preenchida.

## Pronto para trazer o site antigo para cá

A estrutura deste pacote já está preparada para receber os conteúdos do site atual `deliciasdacidapba.com.br`:

- `data/catalogo-bolos.json` para produtos de bolos;
- `data/catalogo-doces.json` para doces gourmet, doces finos e categorias;
- `integrations/legacy-import/` para documentação de importação;
- `integrations/google-reviews/` para widget de avaliações reais do Google;
- `supabase/` para evolução com banco, IA e cache.

Para importar fotos e preços depois, o caminho recomendado é transformar cada produto em JSON com nome, categoria, foto, preço de referência, descrição e mensagem de WhatsApp. O visual já está preparado para cards premium no mesmo padrão de fontes, cores, botões e bordas do site novo.
