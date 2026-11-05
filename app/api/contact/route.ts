import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Redis } from '@upstash/redis';
import { budgetStore } from '../chat/budget';
import { Ratelimit } from '@upstash/ratelimit';
import { isAllowedOrigin } from '../../lib/allowedOrigin';

export { isAllowedOrigin };

function corsHeadersFor(origin: string): Record<string, string> {
  if (!origin || !isAllowedOrigin(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';
  if (!isAllowedOrigin(origin)) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: { ...corsHeadersFor(origin), 'Access-Control-Max-Age': '86400' }
  });
}

type RateWindow = { count: number; resetAtMs: number };

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 perc
const RATE_LIMIT_MAX = 2; // 2 kérés / 2 perc / IP
const DAILY_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 nap
const DAILY_LIMIT_MAX = 50; // 50 email / nap (összesen)
export const rateMemory = new Map<string, RateWindow>();

type ContactLimiters = { burst: Ratelimit | null; daily: Ratelimit | null };

// The same store and the same two env spellings as the chat ceilings (budgetStore): the Vercel integration creates
// KV_REST_API_*, and until 2026-11-05 this route read only UPSTASH_REDIS_REST_*, so in production the limits lived in
// each instance's memory. Preview and Production share the store, so the keys carry VERCEL_ENV.
export function contactLimiters(env: NodeJS.ProcessEnv = process.env): ContactLimiters {
  const store = budgetStore(env);
  if (!store) return { burst: null, daily: null };
  // a failing store answers within a second instead of retrying for seconds
  const redis = new Redis({ url: store.url, token: store.token, retry: { retries: 1, backoff: () => 100 } });
  return {
    burst: new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(RATE_LIMIT_MAX, `${Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)} s`),
      prefix: `contact:${store.scope}:burst`,
    }),
    daily: new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(DAILY_LIMIT_MAX, `${Math.ceil(DAILY_LIMIT_WINDOW_MS / 1000)} s`),
      prefix: `contact:${store.scope}:daily`,
    }),
  };
}

const limiters = contactLimiters();

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

// A store that does not answer must not cost a visitor the message: the limit falls back to this instance's memory.
async function storeLimit(limiter: Ratelimit, key: string, fallbackWindowMs: number): Promise<{ ok: true } | { ok: false; retryAfterSec: number } | null> {
  try {
    const result = await limiter.limit(key);
    if (result.success) return { ok: true };
    return { ok: false, retryAfterSec: ratelimitRetryAfterSec(result.reset, fallbackWindowMs) };
  } catch (err) {
    console.error('contact rate limit: store unavailable, using memory', err instanceof Error ? err.message : 'unknown');
    return null;
  }
}

export async function checkBurstLimit(clientIp: string, l: ContactLimiters = limiters): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const key = `ip:${clientIp}`;
  const fromStore = l.burst && (await storeLimit(l.burst, key, RATE_LIMIT_WINDOW_MS));
  return fromStore ?? checkRateLimitFixed(`contact:burst:${key}`, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX);
}

export async function checkDailyLimit(l: ContactLimiters = limiters): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const fromStore = l.daily && (await storeLimit(l.daily, 'global', DAILY_LIMIT_WINDOW_MS));
  return fromStore ?? checkRateLimitFixed('contact:daily:global', DAILY_LIMIT_WINDOW_MS, DAILY_LIMIT_MAX);
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin') || '';
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  const cors = corsHeadersFor(origin);

  try {
    const clientIp = getClientIp(req);
    const burstLimited = await checkBurstLimit(clientIp);
    if (burstLimited.ok === false) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { ...cors, 'Retry-After': String(burstLimited.retryAfterSec) } }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Invalid content-type' }, { status: 415, headers: cors });
    }

    const body = (await req.json()) as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
      website?: unknown; // honeypot
    };

    const honeypot = asNonEmptyString(body.website);
    if (honeypot) {
      return NextResponse.json({ ok: true }, { status: 200, headers: cors });
    }

    const name = asNonEmptyString(body.name);
    const email = asNonEmptyString(body.email);
    const message = asNonEmptyString(body.message);

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400, headers: cors });
    }

    if (name.length > 120 || email.length > 200 || message.length > 6000) {
      return NextResponse.json({ ok: false, error: 'Input too long' }, { status: 400, headers: cors });
    }

    const dailyLimited = await checkDailyLimit();
    if (dailyLimited.ok === false) {
      return NextResponse.json(
        { ok: false, error: 'Daily message limit reached. Please try again tomorrow.' },
        { status: 429, headers: { ...cors, 'Retry-After': String(dailyLimited.retryAfterSec) } }
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
        { status: 500, headers: cors }
      );
    }

    const smtpPort = Number(smtpPortRaw);
    if (!Number.isFinite(smtpPort)) {
      return NextResponse.json({ ok: false, error: 'Invalid SMTP_PORT' }, { status: 500, headers: cors });
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

    return NextResponse.json({ ok: true }, { status: 200, headers: cors });
  } catch {
    // Keep err variable so it doesn't complain about unused error, but ignore it.
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500, headers: cors });
  }
}
