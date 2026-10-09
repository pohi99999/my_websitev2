import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from './rate-limiter';
import { GEMINI_URL, buildGeminiBody, readGeminiText } from './gemini';
import { SYSTEM_PROMPT } from './system-prompt';

function getClientIp(req: NextRequest): string {
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',');
    return ips[ips.length - 1]?.trim() ?? 'unknown';
  }
  return 'unknown';
}



// ── Handler ─────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Túl sok kérés. Kérjük, várjon egy percet. / Too many requests. Please wait a minute.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen kérés.' }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('messages' in body) ||
    !Array.isArray((body as { messages: unknown }).messages) ||
    (body as { messages: ChatMessage[] }).messages.length === 0
  ) {
    return NextResponse.json({ error: 'Érvénytelen kérés.' }, { status: 400 });
  }

  const { messages } = body as { messages: ChatMessage[] };
  const hasInvalidRole = messages.some(
    (m) => m.role !== 'user' && m.role !== 'assistant'
  );
  if (hasInvalidRole) {
    return NextResponse.json({ error: 'Érvénytelen kérés.' }, { status: 400 });
  }

  // Trimmed: the key was stored with surrounding whitespace once, and a stray newline in a header
  // value makes the request fail in a way that looks like a provider outage.
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    console.error('CRITICAL: GEMINI_API_KEY is missing.');
    return NextResponse.json(
      { error: 'Belső szerverhiba.' },
      { status: 500 }
    );
  }

  const len = messages.length;
  const startIdx = len > 10 ? len - 10 : 0;
  const trimmedMessages: ChatMessage[] = [];
  for (let i = startIdx; i < len; i++) {
    const m = messages[i];
    trimmedMessages.push({ role: m.role, content: String(m.content).slice(0, 2000) });
  }

  const unavailable = () =>
    NextResponse.json(
      { error: 'AI szolgáltatás nem elérhető. Kérjük, próbálja később.' },
      { status: 502 }
    );

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The key goes in a header, never in the URL: URLs end up in logs.
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(buildGeminiBody(SYSTEM_PROMPT, trimmedMessages)),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Gemini error:', response.status, text.slice(0, 500));
      return unavailable();
    }

    // A provider that answers 200 with something that is not a reply (2026-10-09: GitHub Models
    // answered "OK" in text/plain) is an unavailable service, not an internal error.
    let data: unknown;
    try {
      data = await response.json();
    } catch (err) {
      console.error('Gemini returned a non-JSON body:', err);
      return unavailable();
    }
    const content = readGeminiText(data);
    if (!content) {
      const finish = (data as { candidates?: { finishReason?: string }[] })?.candidates?.[0]?.finishReason;
      console.error('Gemini returned no text, finishReason:', finish ?? 'none');
      return unavailable();
    }
    return NextResponse.json({ content });
  } catch (err) {
    console.error('Brunella chat error:', err);
    return NextResponse.json({ error: 'Belső szerverhiba.' }, { status: 500 });
  }
}
