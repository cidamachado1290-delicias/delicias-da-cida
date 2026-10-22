UPLOAD DO BENTO ATIVADO - DELICIAS DA CIDA

Configuracao aplicada:
SUPABASE_URL: https://wjhaffbnhbggnfxxwfee.supabase.co
BUCKET: bento-referencias
PASTA: pedidos-bento
CHAVE: publishable key configurada no site-config.js

Fluxo:
1. Cliente escolhe imagem/flork de referencia.
2. Site faz upload para o bucket publico bento-referencias.
3. Supabase retorna link publico da imagem.
4. WhatsApp da Cida abre travado com o pedido + link da referencia.

Se o upload falhar:
- conferir se o bucket bento-referencias esta PUBLICO;
- conferir politicas de INSERT/SELECT para anon/authenticated/public;
- conferir limite de arquivo: ate 5 MB;
- formatos aceitos: image/jpeg, image/png, image/webp.

Observacao: a imagem nao vai como anexo nativo do WhatsApp; ela vai como link publico clicavel dentro da mensagem, que e o fluxo correto para manter o WhatsApp travado no numero da empresa.
