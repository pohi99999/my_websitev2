// Daily ceiling on paid Claude calls for the whole site (denial-of-wallet guard).
// The per-IP limit in rate-limiter.ts lives in one serverless instance's memory and is per IP, so
// many IPs (or many instances) multiply it without bound. This cap counts every chat call: in
// Upstash when a store is configured (shared by all instances), otherwise in memory (per instance,
// still a ceiling). Over the cap the chat answers with the busy text.
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export const DAILY_CHAT_MAX = 500;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Where a ceiling was counted: the shared store, memory (no store), or memory because the store failed. */
export type BudgetSource = 'upstash' | 'memory' | 'memory-fallback';
export type BudgetResult = { ok: boolean; source: BudgetSource };

/**
 * The Upstash store the ceilings use, or null for memory. The Vercel Marketplace integration
 * ("Upstash for Redis") creates KV_REST_API_URL / KV_REST_API_TOKEN, a hand-made setup the
 * UPSTASH_REDIS_REST_* names; either works (the same order as @upstash/redis's own fromEnv).
 * Preview and Production share one store, so the keys carry VERCEL_ENV: testing a preview never
 * uses up the production day.
 */
export function budgetStore(env: NodeJS.ProcessEnv = process.env): { url: string; token: string; scope: string } | null {
  const url = (env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL || '').trim();
  const token = (env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || '').trim();
  if (!url || !token) return null;
  return { url, token, scope: (env.VERCEL_ENV || 'local').trim() };
}

const store = budgetStore();
// a failing store answers within a second instead of retrying for seconds
const redis = store ? new Redis({ url: store.url, token: store.token, retry: { retries: 1, backoff: () => 100 } }) : null;

function upstashCeiling(max: number, name: string): Ratelimit | null {
  return redis && store
    ? new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(max, `${DAY_MS / 1000} s`), prefix: `${name}:${store.scope}`, timeout: 3000 })
    : null;
}

/**
 * One ceiling: the store when there is one, memory otherwise. A store that throws OR times out falls
 * back to memory. The timeout matters: on a timeout @upstash/ratelimit resolves success:true with
 * reason "timeout", so taking its answer as it is would let every call through while Upstash is slow.
 */
export async function ceiling(upstash: Pick<Ratelimit, 'limit'> | null, memory: () => boolean): Promise<BudgetResult> {
  if (upstash) {
    try {
      const r = await upstash.limit('global');
      if (r.reason !== 'timeout') return { ok: r.success, source: 'upstash' };
    } catch {
      // Upstash down: fall back to the in-memory ceiling rather than an unlimited model.
    }
    return { ok: memory(), source: 'memory-fallback' };
  }
  return { ok: memory(), source: 'memory' };
}

export const budgetMemory = { count: 0, resetAtMs: 0 };

function countIn(mem: { count: number; resetAtMs: number }, max: number): boolean {
  const now = Date.now();
  if (now >= mem.resetAtMs) {
    mem.count = 0;
    mem.resetAtMs = now + DAY_MS;
  }
  if (mem.count >= max) return false;
  mem.count++;
  return true;
}

const upstashDaily = upstashCeiling(DAILY_CHAT_MAX, 'chat:daily');

export async function dailyBudget(): Promise<BudgetResult> {
  return ceiling(upstashDaily, () => countIn(budgetMemory, DAILY_CHAT_MAX));
}

export async function checkDailyBudget(): Promise<boolean> {
  return (await dailyBudget()).ok;
}

// The configurator's own ceiling (card ff1d7435, Péter 11929: "50 beírás / nap"): at most 50 paid
// model calls a day for the whole site, counted apart from the chat's 500. Over it the configurator
// answers from its keyword rules (configurator.ts), the visitor still gets a complete answer.
export const DAILY_CONFIGURATOR_MAX = 50;
export const configuratorMemory = { count: 0, resetAtMs: 0 };

const upstashConfigurator = upstashCeiling(DAILY_CONFIGURATOR_MAX, 'chat:configurator:daily');

export async function configuratorBudget(): Promise<BudgetResult> {
  return ceiling(upstashConfigurator, () => countIn(configuratorMemory, DAILY_CONFIGURATOR_MAX));
}

export async function checkConfiguratorBudget(): Promise<boolean> {
  return (await configuratorBudget()).ok;
}
