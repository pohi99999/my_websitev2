import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '../chat/rate-limiter';

function getClientIp(req: NextRequest | Request): string {
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',');
    return ips[ips.length - 1]?.trim() ?? 'unknown';
  }
  return 'unknown';
}

export async function POST(req: NextRequest | Request) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Túl sok kérés érkezett. Kérjük, próbáld újra pár perc múlva.' },
      { status: 429 }
    );
  }

  try {
    const raw = await req.json();
    // Only the form's own fields go on; the n8n workflow saves them and notifies us.
    const FIELDS = ['industry', 'size', 'pain_points', 'goals', 'name', 'email'] as const;
    const body: Record<string, string> = {};
    for (const f of FIELDS) body[f] = typeof raw?.[f] === 'string' ? raw[f].slice(0, 2000) : '';
    if (!body.email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Hiányzó e-mail cím' }, { status: 400 });
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      console.error('N8N_WEBHOOK_URL is not configured');
      return NextResponse.json({ ok: false, error: 'Szerver konfigurációs hiba' }, { status: 500 });
    }

    const response = await fetch(`${n8nWebhookUrl}/webhook/lead-magnet-audit-v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('n8n Webhook error:', response.status, response.statusText);
      return NextResponse.json({ ok: false, error: 'Hiba a webhook hívásakor' }, { status: response.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead magnet audit error:', error);
    return NextResponse.json({ ok: false, error: 'Belső szerverhiba' }, { status: 500 });
  }
}
