import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from './rate-limiter';
import { CLAUDE_URL, ANTHROPIC_VERSION, DEFAULT_MODEL, TIMEOUT_MS, buildClaudeBody, readClaudeText, isBusy } from './claude';
import { busyMessage, parseSiteLang, systemPromptFor, unavailableMessage } from './site-lang';
import { isAllowedOrigin } from '../../lib/allowedOrigin';

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
  // A foreign page could make its visitors' browsers post here (req.json() parses a text/plain
  // body too, so there is no CORS preflight): every visitor's IP is a fresh rate-limit bucket and
  // every request a paid Claude call. Browsers always send Origin on POST; no Origin is curl.
  if (!isAllowedOrigin(req.headers.get('origin') || '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

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
  const lang = parseSiteLang((body as { lang?: unknown }).lang);
  const hasInvalidRole = messages.some(
    (m) => m.role !== 'user' && m.role !== 'assistant'
  );
  if (hasInvalidRole) {
    return NextResponse.json({ error: 'Érvénytelen kérés.' }, { status: 400 });
  }

  // Trimmed: the key was stored with surrounding whitespace once, and a stray newline in a header
  // value makes the request fail in a way that looks like a provider outage.
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    console.error('CRITICAL: ANTHROPIC_API_KEY is missing.');
    return NextResponse.json(
      { error: 'Belső szerverhiba.' },
      { status: 500 }
    );
  }
  const model = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL;

  const len = messages.length;
  const startIdx = len > 10 ? len - 10 : 0;
  const trimmedMessages: ChatMessage[] = [];
  for (let i = startIdx; i < len; i++) {
    const m = messages[i];
    trimmedMessages.push({ role: m.role, content: String(m.content).slice(0, 2000) });
  }

  // Every Claude failure answers HTTP 200 with a way forward (the page and contact links): a 5xx
  // would be replaced by the Cloudflare edge's own error page, and the widget's own error text has
  // no contact. The log line names the provider and the reason; never the question or the answer.
  const fallback = (reason: string, busy: boolean) => {
    console.log(`chat provider=claude model=${model} fallback reason=${reason}`);
    return NextResponse.json({ content: busy ? busyMessage(lang) : unavailableMessage(lang), busy: true });
  };

  let response: Response;
  try {
    response = await fetch(CLAUDE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': ANTHROPIC_VERSION },
      body: JSON.stringify(buildClaudeBody(systemPromptFor(lang), trimmedMessages, model)),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    const timeout = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');
    return fallback(timeout ? 'timeout' : 'network', false);
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    // the error body goes to the function log only; it never contains the key
    console.error('Claude error:', response.status, text.slice(0, 300));
    return fallback(`claude_${response.status}`, isBusy(response.status, text));
  }

  // A provider that answers 200 with something that is not a reply (2026-10-09: GitHub Models
  // answered "OK" in text/plain) is an unavailable service, not an internal error.
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return fallback('bad_json', false);
  }
  const content = readClaudeText(data);
  if (!content) return fallback('empty_or_truncated', false);
  console.log(`chat provider=claude model=${model} ok`);
  return NextResponse.json({ content });
}
