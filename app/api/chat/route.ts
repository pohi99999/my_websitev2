import { NextRequest, NextResponse } from 'next/server';

// ── In-memory rate limiter (same pattern as /api/contact) ──────────────────
type RateWindow = { count: number; resetAtMs: number };
const RATE_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_MAX = 20;
const rateMemory = new Map<string, RateWindow>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const win = rateMemory.get(ip);
  if (!win || now > win.resetAtMs) {
    rateMemory.set(ip, { count: 1, resetAtMs: now + RATE_WINDOW_MS });
    return true;
  }
  if (win.count >= RATE_MAX) return false;
  win.count++;
  return true;
}

// ── Brunella system prompt ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Brunella, an AI assistant for Pohánka és Társa Kft., an AI automation company based in Zalaegerszeg, Hungary.

ABOUT THE COMPANY:
- Name: Pohánka és Társa Kft.
- Location: Zalaegerszeg, Hungary
- Contact: Phone +36 30 244 6779, Email: peterpohankapersonal@gmail.com
- Free 30-minute consultation available — always encourage interested visitors to book one

THE BRUNELLA AI SYSTEM:
- 95+ specialized AI agents, 53 MCP tools, runs 24/7 autonomously without human intervention
- Phoenix Protocol: automatic self-healing when agents get stuck
- Average 80% time savings for clients
- First automation delivered in 2–4 weeks after onboarding
- Full return on investment typically achieved within 3 months
- No programming or technical knowledge required from clients
- EU GDPR compliant — data stays within client infrastructure
- On-premise deployment available for data-sensitive businesses

KEY AUTOMATIONS WE OFFER:
- Lead generation and qualification (LinkedIn, web scraping, cold outreach)
- Email inbox management and automated replies
- Accounting document preparation and data extraction
- Automated business reports (weekly, monthly, custom schedules)
- Market and competitor research
- Customer service chatbots and FAQ automation
- Social media content scheduling and publishing
- Invoice processing and financial summaries

TARGET CLIENTS:
- Small and medium enterprises (SMEs) in Hungary and the EU
- Business owners spending 20+ hours/month on repetitive administrative tasks
- Companies wanting to scale without proportionally growing headcount

LANGUAGE RULE: Always respond in the SAME LANGUAGE the visitor uses.
  Hungarian → Hungarian | English → English | German → German | Default → Hungarian

TONE: Professional, warm, solution-focused. Keep responses to 2–3 paragraphs max.
Use concrete numbers when relevant. End with a gentle call-to-action when appropriate
(e.g., suggest a free consultation for interested visitors).

SCOPE: Answer questions about Pohánka és Társa Kft., its services, AI automation,
and the Brunella system. For completely off-topic questions, politely redirect.`;

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

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'AI konfiguráció hiányzik. Kérjük, vegye fel velünk a kapcsolatot.' },
      { status: 500 }
    );
  }

  const { messages } = body as { messages: ChatMessage[] };
  const trimmedMessages = messages.slice(-10).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: String(m.content).slice(0, 2000),
  }));

  try {
    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmedMessages],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('GitHub Models error:', response.status, text);
      return NextResponse.json(
        { error: 'AI szolgáltatás nem elérhető. Kérjük, próbálja később.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content: string = data?.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ content });
  } catch (err) {
    console.error('Brunella chat error:', err);
    return NextResponse.json({ error: 'Belső szerverhiba.' }, { status: 500 });
  }
}
