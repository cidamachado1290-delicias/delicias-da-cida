# Revisão final para hospedagem - Delícias da Cida

## WhatsApp
O site já envia para o WhatsApp os dados das calculadoras/formulários:
- Monte sua Delícia: massa, recheio, adicional, cobertura, ocasião, data, horário, entrega e pessoas.
- Orçamento Premium para Noivos: nomes, data, horário, local, convidados, interesse, estilo e sabores.
- Delícia de Festa: tipo de festa, horário, convidados, data, doces de interesse e estimativa.
- Vida Delícia: inspiração escolhida e pedido de praticidade.
- Bentô Cake: tamanho, massa, recheio, frase/estilo quando houver e referência de imagem.

## Imagem do Bentô
O WhatsApp via link (`wa.me`) não anexa arquivo automaticamente em 100% dos navegadores. O site está preparado em 3 níveis:

1. Preview + nome do arquivo no site.
2. Web Share API em celulares compatíveis, permitindo compartilhar imagem e texto juntos.
3. Plugin Supabase Storage para envio por link automático.

Para ativar o nível 3:
1. Criar bucket `site-uploads` no Supabase Storage.
2. Publicar `supabase/functions/upload-bento/index.ts`.
3. Colocar a URL da função em `site-config.js`:

```js
window.BENTO_UPLOAD_ENDPOINT = "https://SEU-PROJETO.supabase.co/functions/v1/upload-bento";
```

Sem essa configuração, o site continua funcionando e orienta a cliente a enviar a imagem na conversa.

## Arquivos principais
- `index.html`
- `style.css`
- `script.js`
- `site-config.js`
- `assets/`
- `data/`
- `integrations/`
- `supabase/`

## Teste antes de publicar
Abra o site em servidor local ou hospedagem HTTPS. Para áudio, Web Share e upload funcionarem melhor, use HTTPS.
