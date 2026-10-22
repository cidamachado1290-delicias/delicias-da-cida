// Supabase Edge Function - gerar-receita
// Troque GEMINI_API_KEY nos secrets do Supabase.
// Esta funcao devolve JSON e valida categoria/dificuldade/tempo antes de responder ao site.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json"
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { categoria, dificuldade, tempo, termo } = await req.json();
    if (!categoria || !dificuldade || !tempo) {
      return new Response(JSON.stringify({ error: "Filtros obrigatorios ausentes." }), { status: 400, headers: corsHeaders });
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "IA indisponivel: GEMINI_API_KEY nao configurada." }), { status: 500, headers: corsHeaders });
    }

    const prompt = `Voce e a IA da Delicias da Cida. Gere UMA receita inspiracional para fazer em casa.
Regras obrigatorias:
- categoria deve ser exatamente: ${categoria}
- dificuldade deve ser exatamente: ${dificuldade}
- tempo deve ser exatamente: ${tempo}
- nao diga que a Delicias da Cida faz essa receita
- nao copie textos de sites
- nao use marcas obrigatorias
- responda apenas JSON valido no formato:
{
  "titulo": "",
  "categoria": "${categoria}",
  "dificuldade": "${dificuldade}",
  "tempo": "${tempo}",
  "rendimento": "",
  "ingredientes": [],
  "preparo": [],
  "observacao": "Receita inspiracional para fazer em casa. Nem toda receita faz parte do cardapio oficial da Delicias da Cida; para encomendas, fale com a Cida pelo WhatsApp.",
  "cta_whatsapp": "Help Cida, estou sem tempo"
}
Ideia ou ingrediente opcional: ${termo || "sem termo especifico"}`;

    const aiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const data = await aiRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const receita = JSON.parse(text || "{}");

    const valido = receita.categoria === categoria && receita.dificuldade === dificuldade && receita.tempo === tempo && Array.isArray(receita.ingredientes) && receita.ingredientes.length >= 4 && Array.isArray(receita.preparo) && receita.preparo.length >= 4 && String(receita.observacao || "").includes("inspiracional");

    if (!valido) {
      return new Response(JSON.stringify({ error: "Receita reprovada na validacao de seguranca." }), { status: 422, headers: corsHeaders });
    }

    return new Response(JSON.stringify(receita), { headers: corsHeaders });
  } catch (_err) {
    return new Response(JSON.stringify({ error: "Nao foi possivel gerar a receita agora." }), { status: 500, headers: corsHeaders });
  }
});
