import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MAX_FILE = 5 * 1024 * 1024;
const MAX_BODY = MAX_FILE + 128 * 1024;
const BUCKET = "bento-referencias";

const formats: Record<string, {
  ext: string;
  matches: (b: Uint8Array) => boolean;
}> = {
  "image/jpeg": {
    ext: "jpg",
    matches: b => b.length >= 3 &&
      b[0] === 255 && b[1] === 216 && b[2] === 255
  },
  "image/png": {
    ext: "png",
    matches: b => b.length >= 8 &&
      [137,80,78,71,13,10,26,10].every((v,i) => b[i] === v)
  },
  "image/webp": {
    ext: "webp",
    matches: b => b.length >= 12 &&
      String.fromCharCode(...b.slice(0,4)) === "RIFF" &&
      String.fromCharCode(...b.slice(8,12)) === "WEBP"
  }
};

function json(
  data: unknown,
  status: number,
  origin = ""
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "vary": "Origin",
      ...(origin ? {
        "access-control-allow-origin": origin,
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type, apikey"
      } : {})
    }
  });
}

async function readLimited(req: Request): Promise<Uint8Array | null> {
  const reader = req.body?.getReader();
  if (!reader) return null;

  const parts: Uint8Array[] = [];
  let size = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    size += value.byteLength;

    if (size > MAX_BODY) {
      await reader.cancel();
      return null;
    }

    parts.push(value);
  }

  const output = new Uint8Array(size);
  let pos = 0;

  for (const part of parts) {
    output.set(part, pos);
    pos += part.byteLength;
  }

  return output;
}

serve(async (req: Request) => {
  const allowedOrigins = (Deno.env.get("BENTO_ALLOWED_ORIGIN") || "").split(",").map(s => s.trim()).filter(Boolean);
  const requestOrigin = req.headers.get("origin") || "";

  const corsOrigin =
    allowedOrigins.includes(requestOrigin)
      ? requestOrigin
      : "";

  if (req.method === "OPTIONS") {
    return corsOrigin
      ? json({ ok: true }, 200, corsOrigin)
      : json({ error: "Origem recusada" }, 403);
  }

  if (req.method !== "POST") {
    return json({ error: "Metodo nao permitido" }, 405, corsOrigin);
  }

  if (!corsOrigin) {
    return json({ error: "Origem recusada" }, 403);
  }

  const secret = Deno.env.get("BENTO_TURNSTILE_SECRET");
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!secret || !url || !key) {
    return json({ error: "Servico indisponivel" }, 503, corsOrigin);
  }

  const contentType = req.headers.get("content-type") || "";

  if (!/^multipart\/form-data\s*;/i.test(contentType)) {
    return json({ error: "Formato invalido" }, 415, corsOrigin);
  }

  const declaredLength = Number(
    req.headers.get("content-length") || "0"
  );

  if (
    !Number.isFinite(declaredLength) ||
    declaredLength < 0 ||
    declaredLength > MAX_BODY
  ) {
    return json({ error: "Requisicao muito grande" }, 413, corsOrigin);
  }

  try {
    const body = await readLimited(req);

    if (!body) {
      return json({ error: "Requisicao muito grande" }, 413, corsOrigin);
    }

    const parsed = new Request(req.url, {
      method: "POST",
      headers: { "content-type": contentType },
      body
    });

    const form = await parsed.formData();

    const file = form.get("file");
    const token = form.get("turnstile_token");

    if (!(file instanceof File)) {
      return json({ error: "Arquivo ausente" }, 400, corsOrigin);
    }

    const format = formats[file.type];

    if (!format || file.size === 0 || file.size > MAX_FILE) {
      return json({ error: "Arquivo invalido" }, 415, corsOrigin);
    }

    if (
      typeof token !== "string" ||
      !token ||
      token.length > 2048
    ) {
      return json({ error: "Verificacao ausente" }, 403, corsOrigin);
    }

    const bytes = new Uint8Array(await file.arrayBuffer());

    if (!format.matches(bytes)) {
      return json({ error: "Assinatura invalida" }, 415, corsOrigin);
    }

    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          secret,
          response: token
        }),
        signal: AbortSignal.timeout(10000)
      }
    );

    if (!verification.ok) {
      return json({ error: "Verificacao indisponivel" }, 503, corsOrigin);
    }

    const result = await verification.json();

    if (
      result.success !== true ||
      !allowedOrigins.some(origin => new URL(origin).hostname === result.hostname)
    ) {
      return json({ error: "Verificacao recusada" }, 403, corsOrigin);
    }

    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    // Rate limit: executado apos validar o Turnstile,
    // antes de gravar o arquivo no Storage.
    const forwarded = req.headers.get("x-forwarded-for") || "";
    const clientIp = forwarded.split(",")[0].trim() || "unknown";

    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(`${secret}:${clientIp}`)
    );

    const clientHash = Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    const { data: permitted, error: rateError } = await supabase.rpc(
      "bento_upload_rate_allow",
      { p_client_hash: clientHash }
    );

    if (rateError) {
      return json(
        { error: "Controle de seguranca indisponivel" },
        503,
        corsOrigin
      );
    }

    if (permitted !== true) {
      return json(
        { error: "Limite de envios atingido. Tente novamente mais tarde." },
        429,
        corsOrigin
      );
    }
    const { data: bucket, error: bucketError } =
      await supabase.storage.getBucket(BUCKET);

    if (bucketError || !bucket || bucket.public !== false) {
      return json({
        error: "Armazenamento privado indisponivel"
      }, 503, corsOrigin);
    }

    const date = new Date().toISOString().slice(0,10);
    const path =
      `pedidos-bento/${date}/${crypto.randomUUID()}.${format.ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      return json({ error: "Falha no upload" }, 503, corsOrigin);
    }

    const { data: signed, error: signedError } =
      await supabase.storage
        .from(BUCKET)
        .createSignedUrl(path, 604800);

    if (signedError || !signed?.signedUrl) {
      return json({
        error: "Falha no link temporario"
      }, 503, corsOrigin);
    }

    return json({
      url: signed.signedUrl,
      expires_in_seconds: 604800
    }, 200, corsOrigin);

  } catch {
    return json({
      error: "Falha no processamento"
    }, 500, corsOrigin);
  }
});