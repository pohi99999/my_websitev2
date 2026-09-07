import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const ALLOWED_ORIGINS = [
  'https://www.pohankaestarsa.com',
  'https://pohankaestarsa.com',
  'http://localhost:3000',
];



export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';
  if (origin && !ALLOWED_ORIGINS.includes(origin) && process.env.NODE_ENV === 'production') {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const res = new NextResponse(null, { status: 204 });
  res.headers.set('Access-Control-Allow-Origin', origin || '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.headers.set('Access-Control-Max-Age', '86400');
  return res;
}


type RateWindow = { count: number; resetAtMs: number };

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 perc
const RATE_LIMIT_MAX = 2; // 2 kérés / 2 perc / IP
const DAILY_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 nap
const DAILY_LIMIT_MAX = 10; // 10 email / nap (összesen)
export const rateMemory = new Map<string, RateWindow>();

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const upstashRedis =
  upstashUrl && upstashToken ? new Redis({ url: upstashUrl, token: upstashToken }) : null;

const upstashRatelimitBurst =
  upstashRedis
    ? new Ratelimit({
        redis: upstashRedis,
        limiter: Ratelimit.fixedWindow(RATE_LIMIT_MAX, `${Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)} s`),
        prefix: 'contact:burst'
      })
    : null;

const upstashRatelimitDaily =
  upstashRedis
    ? new Ratelimit({
        redis: upstashRedis,
        limiter: Ratelimit.fixedWindow(DAILY_LIMIT_MAX, `${Math.ceil(DAILY_LIMIT_WINDOW_MS / 1000)} s`),
        prefix: 'contact:daily'
      })
    : null;

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function getClientIp(req: Request): string {
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',');
    const last = ips[ips.length - 1]?.trim();
    if (last) return last;
  }

  return 'unknown';
}

export function checkRateLimitFixed(
  key: string,
  windowMs: number,
  max: number
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const existing = rateMemory.get(key);

  if (!existing || now >= existing.resetAtMs) {
    rateMemory.set(key, { count: 1, resetAtMs: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= max) {
    const retryAfterSec = Math.max(1, Math.ceil((existing.resetAtMs - now) / 1000));
    return { ok: false, retryAfterSec };
  }

  existing.count += 1;
  rateMemory.set(key, existing);
  return { ok: true };
}

function ratelimitRetryAfterSec(reset: unknown, fallbackWindowMs: number): number {
  const resetMs = typeof reset === 'number' ? reset : Date.now() + fallbackWindowMs;
  return Math.max(1, Math.ceil((resetMs - Date.now()) / 1000));
}

async function checkBurstLimit(clientIp: string): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const key = `ip:${clientIp}`;
  if (!upstashRatelimitBurst) {
    return checkRateLimitFixed(`contact:burst:${key}`, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX);
  }

  const result = await upstashRatelimitBurst.limit(key);
  if (result.success) return { ok: true };
  return { ok: false, retryAfterSec: ratelimitRetryAfterSec(result.reset, RATE_LIMIT_WINDOW_MS) };
}

async function checkDailyLimit(): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const key = 'global';
  if (!upstashRatelimitDaily) {
    return checkRateLimitFixed('contact:daily:global', DAILY_LIMIT_WINDOW_MS, DAILY_LIMIT_MAX);
  }

  const result = await upstashRatelimitDaily.limit(key);
  if (result.success) return { ok: true };
  return { ok: false, retryAfterSec: ratelimitRetryAfterSec(result.reset, DAILY_LIMIT_WINDOW_MS) };
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || '';
    if (origin && !ALLOWED_ORIGINS.includes(origin) && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
    }

    // Allow Access-Control-Allow-Origin header to match request origin
    const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : '*';
    const corsHeaders = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    };

    const clientIp = getClientIp(req);
    const burstLimited = await checkBurstLimit(clientIp);
    if (burstLimited.ok === false) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { ...corsHeaders, 'Retry-After': String(burstLimited.retryAfterSec) } }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Invalid content-type' }, { status: 415, headers: corsHeaders });
    }

    const body = (await req.json()) as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
      website?: unknown; // honeypot
    };

    const honeypot = asNonEmptyString(body.website);
    if (honeypot) {
      return NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders });
    }

    const name = asNonEmptyString(body.name);
    const email = asNonEmptyString(body.email);
    const message = asNonEmptyString(body.message);

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400, headers: corsHeaders });
    }

    if (name.length > 120 || email.length > 200 || message.length > 6000) {
      return NextResponse.json({ ok: false, error: 'Input too long' }, { status: 400, headers: corsHeaders });
    }

    const dailyLimited = await checkDailyLimit();
    if (dailyLimited.ok === false) {
      return NextResponse.json(
        { ok: false, error: 'Daily message limit reached. Please try again tomorrow.' },
        { status: 429, headers: { ...corsHeaders, 'Retry-After': String(dailyLimited.retryAfterSec) } }
      );
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
        { status: 500, headers: corsHeaders }
      );
    }

    const smtpPort = Number(smtpPortRaw);
    if (!Number.isFinite(smtpPort)) {
      return NextResponse.json({ ok: false, error: 'Invalid SMTP_PORT' }, { status: 500, headers: corsHeaders });
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

    return NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders });
  } catch {
    // Keep err variable so it doesn't complain about unused error, but ignore it.
    // In case of catch, corsHeaders might not be defined if error happened early. Default to generous CORS.
    const errCorsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    };
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500, headers: errCorsHeaders });
  }
}
