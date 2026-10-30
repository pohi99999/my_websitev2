// Daily ceiling on paid Claude calls for the whole site (denial-of-wallet guard).
// The per-IP limit in rate-limiter.ts lives in one serverless instance's memory and is per IP, so
// many IPs (or many instances) multiply it without bound. This cap counts every chat call: in
// Upstash when UPSTASH_REDIS_REST_URL/TOKEN are set (shared by all instances), otherwise in
// memory (per instance, still a ceiling). Over the cap the chat answers with the busy text.
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export const DAILY_CHAT_MAX = 500;
const DAY_MS = 24 * 60 * 60 * 1000;

export const budgetMemory = { count: 0, resetAtMs: 0 };

function checkMemory(): boolean {
  const now = Date.now();
  if (now >= budgetMemory.resetAtMs) {
    budgetMemory.count = 0;
    budgetMemory.resetAtMs = now + DAY_MS;
  }
  if (budgetMemory.count >= DAILY_CHAT_MAX) return false;
  budgetMemory.count++;
  return true;
}

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
const upstashDaily =
  url && token
    ? new Ratelimit({
        redis: new Redis({ url, token }),
        limiter: Ratelimit.fixedWindow(DAILY_CHAT_MAX, `${DAY_MS / 1000} s`),
        prefix: 'chat:daily',
      })
    : null;

export async function checkDailyBudget(): Promise<boolean> {
  if (upstashDaily) {
    try {
      return (await upstashDaily.limit('global')).success;
    } catch {
      // Upstash down: fall back to the in-memory ceiling rather than an unlimited chat.
    }
  }
  return checkMemory();
}

// The configurator's own ceiling (card ff1d7435, Péter 11929: "50 beírás / nap"): at most 50 paid
// model calls a day for the whole site, counted apart from the chat's 500. Over it the configurator
// answers from its keyword rules (configurator.ts), the visitor still gets a complete answer.
export const DAILY_CONFIGURATOR_MAX = 50;
export const configuratorMemory = { count: 0, resetAtMs: 0 };

const upstashConfigurator =
  url && token
    ? new Ratelimit({
        redis: new Redis({ url, token }),
        limiter: Ratelimit.fixedWindow(DAILY_CONFIGURATOR_MAX, `${DAY_MS / 1000} s`),
        prefix: 'chat:configurator:daily',
      })
    : null;

export async function checkConfiguratorBudget(): Promise<boolean> {
  if (upstashConfigurator) {
    try {
      return (await upstashConfigurator.limit('global')).success;
    } catch {
      // Upstash down: the in-memory ceiling, never an unlimited model.
    }
  }
  const now = Date.now();
  if (now >= configuratorMemory.resetAtMs) {
    configuratorMemory.count = 0;
    configuratorMemory.resetAtMs = now + DAY_MS;
  }
  if (configuratorMemory.count >= DAILY_CONFIGURATOR_MAX) return false;
  configuratorMemory.count++;
  return true;
}
