// Exemplo base para Supabase Edge Function. Requer configurar bucket e permissões.
// Recebe multipart/form-data e retorna { url }.
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return new Response(JSON.stringify({ error: "Arquivo ausente" }), { status: 400 });
    if (file.size > 5 * 1024 * 1024) return new Response(JSON.stringify({ error: "Imagem acima de 5MB" }), { status: 413 });
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `bentos/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("bento-referencias").upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    const { data } = await supabase.storage.from("bento-referencias").createSignedUrl(path, 60 * 60 * 24 * 7);
    return new Response(JSON.stringify({ url: data?.signedUrl }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Falha no upload" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});
