// Supabase Edge Function: upload-bento
// Recebe a imagem/flork do Bentô Cake, salva no Supabase Storage e retorna URL pública/assinada.
// Deploy: supabase functions deploy upload-bento
// Secrets necessários: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return json({ error: "Supabase não configurado." }, 500);
    }

    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return json({ error: "Arquivo não enviado." }, 400);
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return json({ error: "Formato não permitido. Envie JPG, PNG, WEBP ou GIF." }, 415);
    }

    const maxBytes = 7 * 1024 * 1024;
    if (file.size > maxBytes) {
      return json({ error: "Imagem muito grande. Limite de 7MB." }, 413);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = `${crypto.randomUUID()}.${ext}`;
    const path = `bento-referencias/${new Date().toISOString().slice(0, 10)}/${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("site-uploads")
      .upload(path, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return json({ error: uploadError.message }, 500);
    }

    // URL assinada por 7 dias para não deixar referências pessoais públicas para sempre.
    const { data, error: signedError } = await supabase.storage
      .from("site-uploads")
      .createSignedUrl(path, 60 * 60 * 24 * 7);

    if (signedError || !data?.signedUrl) {
      return json({ error: signedError?.message || "Não foi possível gerar link." }, 500);
    }

    return json({ url: data.signedUrl, path });
  } catch (err) {
    return json({ error: "Falha ao enviar imagem." }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
