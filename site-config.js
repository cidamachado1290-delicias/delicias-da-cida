// Configuracoes do site Delicias da Cida.
// Upload da referencia do Bento Cake via Supabase Storage.
// Chave publishable pode ficar no navegador. Nunca colocar secret/service_role aqui.
window.SUPABASE_BENTO_CONFIG = {
  url: "https://impkkhztouayqhzwsaog.supabase.co",
  key: "sb_publishable_6suNtXmyZNYJXpSHIKkn8A_xLsEo6TV",
  bucket: "bento-referencias",
  folder: "pedidos-bento"
};

// Opcional: se algum dia preferir Edge Function, preencha este endpoint.
// Se ficar vazio, o site usa upload direto no Supabase Storage acima.
window.BENTO_UPLOAD_ENDPOINT = "";
