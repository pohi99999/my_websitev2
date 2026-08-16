import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '../chat/rate-limiter';

function getClientIp(req: NextRequest | Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: NextRequest | Request) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again shortly.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      console.error('N8N_WEBHOOK_URL is not configured');
      return NextResponse.json({ ok: false, error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(`${n8nWebhookUrl}/webhook/lead-magnet-audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error('n8n Webhook error:', response.statusText);
      throw new Error('Failed to fetch from n8n');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead magnet audit error:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
