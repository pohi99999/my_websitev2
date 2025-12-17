import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

type RateWindow = { count: number; resetAtMs: number };

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 perc
const RATE_LIMIT_MAX = 2; // 2 kérés / 2 perc / IP
const rateMemory = new Map<string, RateWindow>();

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const upstashRatelimit =
  upstashUrl && upstashToken
    ? new Ratelimit({
        redis: new Redis({ url: upstashUrl, token: upstashToken }),
        limiter: Ratelimit.fixedWindow(RATE_LIMIT_MAX, `${Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)} s`),
        prefix: 'contact'
      })
    : null;

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}

function checkRateLimit(key: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const existing = rateMemory.get(key);

  if (!existing || now >= existing.resetAtMs) {
    rateMemory.set(key, { count: 1, resetAtMs: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((existing.resetAtMs - now) / 1000));
    return { ok: false, retryAfterSec };
  }

  existing.count += 1;
  rateMemory.set(key, existing);
  return { ok: true };
}

async function checkRateLimitGlobal(key: string): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  if (!upstashRatelimit) {
    return checkRateLimit(key);
  }

  const result = await upstashRatelimit.limit(key);
  if (result.success) return { ok: true };

  const resetMs = typeof result.reset === 'number' ? result.reset : Date.now() + RATE_LIMIT_WINDOW_MS;
  const retryAfterSec = Math.max(1, Math.ceil((resetMs - Date.now()) / 1000));
  return { ok: false, retryAfterSec };
}

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    const limited = await checkRateLimitGlobal(`contact:${clientIp}`);
    if (limited.ok === false) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Invalid content-type' }, { status: 415 });
    }

    const body = (await req.json()) as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
      website?: unknown; // honeypot
    };

    const honeypot = asNonEmptyString(body.website);
    if (honeypot) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = asNonEmptyString(body.name);
    const email = asNonEmptyString(body.email);
    const message = asNonEmptyString(body.message);

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    if (name.length > 120 || email.length > 200 || message.length > 6000) {
      return NextResponse.json({ ok: false, error: 'Input too long' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPortRaw = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const to = process.env.CONTACT_TO || 'peterpohankapersonal@gmail.com';
    const from = process.env.CONTACT_FROM || smtpUser || 'no-reply@pohanka.vercel.app';

    if (!smtpHost || !smtpPortRaw || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Email service not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally CONTACT_TO/CONTACT_FROM).'
        },
        { status: 500 }
      );
    }

    const smtpPort = Number(smtpPortRaw);
    if (!Number.isFinite(smtpPort)) {
      return NextResponse.json({ ok: false, error: 'Invalid SMTP_PORT' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const subject = `Kapcsolat űrlap: ${name}`;
    const text = [
      'Új üzenet érkezett a kapcsolat űrlapról.',
      '',
      `Név: ${name}`,
      `Email: ${email}`,
      '',
      'Üzenet:',
      message
    ].join('\n');

    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject,
      text
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
}
