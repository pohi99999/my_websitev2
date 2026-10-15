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
