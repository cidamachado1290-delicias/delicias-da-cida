Delícias da Cida - ajustes finais Flow

Nesta versão foram aplicados:
- Vida Delícia simplificada com IA da Cida usando apenas o tipo de necessidade e tempo disponível.
- Compartilhamento da Vida Delícia incluindo @deliciasdacidapba.
- Noivos e Delícia de Festa com quantidade em menu: 100 a 500 de 50 em 50, 1000 e acima de 1000 pelo WhatsApp.
- Delícia de Festa com data da festa no lugar de perfil da mesa.
- Bentô Cake com bloqueio inteligente: frase curta usa Mini; frase de zoeira/maior bloqueia Mini e força Mega.
- Botão Me Surpreenda corrigido.
- Chips sem função removidos, mantendo Ver ideias e Buscar florks.
- Upload de imagem do Bentô com prévia, loading fofo e tentativa de Web Share API em dispositivos compatíveis.
- Plugin preparado para upload real por link via endpoint/Supabase Storage em integrations/bento-upload/.
- História da Cida reescrita e layout reforçado.
- Redes sociais com botão Flow pra sua festa.
- Imagem destacada quadrada criada em assets/og-image-square.jpg.

Observação técnica importante:
O WhatsApp via wa.me não anexa arquivo automaticamente. Esta versão tenta usar Web Share API em celulares compatíveis. Para envio automático por link, configure window.BENTO_UPLOAD_ENDPOINT com backend/Supabase Storage, conforme README em integrations/bento-upload/.
