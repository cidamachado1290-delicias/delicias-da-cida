# Plugin de envio de imagem do Bentô Cake

O WhatsApp via `wa.me` não anexa arquivos automaticamente. Esta versão tenta primeiro a Web Share API em celulares compatíveis.

Para envio automático por link, configure um endpoint HTTPS e defina no site:

```html
<script>window.BENTO_UPLOAD_ENDPOINT="https://SEU_ENDPOINT/upload-bento";</script>
```

O endpoint deve receber `multipart/form-data` com o campo `file` e devolver JSON:

```json
{"url":"https://link-publico-ou-temporario-da-imagem"}
```

Sugestão premium: Supabase Storage com expiração/limpeza periódica e limite de tamanho.
