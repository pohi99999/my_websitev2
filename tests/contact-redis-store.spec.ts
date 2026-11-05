import { test, expect } from '@playwright/test';
import { checkBurstLimit, checkDailyLimit, contactLimiters, rateMemory } from '../app/api/contact/route';

// 2026-11-05 live audit: production has KV_REST_API_* (the Vercel integration), the route read only
// UPSTASH_REDIS_REST_*, so "10 messages a day" was counted per instance. Nothing here reaches a real store: fetch is
// replaced by a counter that answers like the Upstash REST API, and an unexpected host fails the test.

const HOST = 'https://fake-store.upstash.test';

function fakeStore(failing = false) {
  const counts = new Map<string, number>();
  const calls: { url: string; auth: string | null; key: string }[] = [];
  const real = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    expect(url.startsWith(HOST)).toBe(true);
    // the client sends one command, or a batch of them on /pipeline
    const body = JSON.parse(String(init?.body)) as string[] | string[][];
    const batch = Array.isArray(body[0]);
    const commands = (batch ? body : [body]) as string[][];
    const auth = new Headers(init?.headers).get('authorization');
    if (failing) {
      calls.push({ url, auth, key: String(commands[0][3]) });
      throw new TypeError('store down');
    }
    const results = commands.map((command) => {
      const key = String(command[3]);
      calls.push({ url, auth, key });
      const used = (counts.get(key) ?? 0) + 1;
      counts.set(key, used);
      // the fixed-window script answers [used, limit]; ["evalsha", hash, numkeys, key, dynamicKey, limit, ...]
      return { result: [used, Number(command[5])] };
    });
    return new Response(JSON.stringify(batch ? results : results[0]), { status: 200, headers: { 'content-type': 'application/json' } });
  }) as typeof fetch;
  return { calls, restore: () => { globalThis.fetch = real; } };
}

test.describe('the contact limits use the store whichever name it has', () => {
  test.beforeEach(() => rateMemory.clear());

  for (const [name, env] of [
    ['KV_REST_API_* (what production has)', { KV_REST_API_URL: HOST, KV_REST_API_TOKEN: 'tok', VERCEL_ENV: 'production' }],
    ['UPSTASH_REDIS_REST_*', { UPSTASH_REDIS_REST_URL: HOST, UPSTASH_REDIS_REST_TOKEN: 'tok', VERCEL_ENV: 'production' }],
  ] as const) {
    test(`${name}: the count is in the store, the third message of a burst is refused`, async () => {
      const store = fakeStore();
      try {
        const l = contactLimiters(env as unknown as NodeJS.ProcessEnv);
        expect(await checkBurstLimit('1.2.3.4', l)).toEqual({ ok: true });
        expect(await checkBurstLimit('1.2.3.4', l)).toEqual({ ok: true });
        expect((await checkBurstLimit('1.2.3.4', l)).ok).toBe(false);
        // another visitor has a count of their own
        expect(await checkBurstLimit('5.6.7.8', l)).toEqual({ ok: true });
        expect(store.calls.length).toBe(4);
        expect(store.calls[0].auth).toBe('Bearer tok');
        expect(store.calls[0].key).toContain('contact:production:burst');
        expect(rateMemory.size).toBe(0);
      } finally {
        store.restore();
      }
    });
  }

  test('the daily limit is one count: the 51st message is refused', async () => {
    const store = fakeStore();
    try {
      const l = contactLimiters({ KV_REST_API_URL: HOST, KV_REST_API_TOKEN: 'tok', VERCEL_ENV: 'production' } as unknown as NodeJS.ProcessEnv);
      for (let i = 0; i < 50; i++) expect(await checkDailyLimit(l)).toEqual({ ok: true });
      expect((await checkDailyLimit(l)).ok).toBe(false);
      expect(store.calls[0].key).toContain('contact:production:daily');
    } finally {
      store.restore();
    }
  });

  test('a preview does not use up the production count', async () => {
    const store = fakeStore();
    try {
      const prod = contactLimiters({ KV_REST_API_URL: HOST, KV_REST_API_TOKEN: 'tok', VERCEL_ENV: 'production' } as unknown as NodeJS.ProcessEnv);
      const preview = contactLimiters({ KV_REST_API_URL: HOST, KV_REST_API_TOKEN: 'tok', VERCEL_ENV: 'preview' } as unknown as NodeJS.ProcessEnv);
      await checkBurstLimit('1.2.3.4', prod);
      await checkBurstLimit('1.2.3.4', prod);
      expect(await checkBurstLimit('1.2.3.4', preview)).toEqual({ ok: true });
    } finally {
      store.restore();
    }
  });

  test('no store: memory, and no call goes out', async () => {
    const store = fakeStore();
    try {
      const l = contactLimiters({} as NodeJS.ProcessEnv);
      expect(l).toEqual({ burst: null, daily: null });
      expect(await checkBurstLimit('1.2.3.4', l)).toEqual({ ok: true });
      expect(await checkBurstLimit('1.2.3.4', l)).toEqual({ ok: true });
      expect((await checkBurstLimit('1.2.3.4', l)).ok).toBe(false);
      expect(store.calls.length).toBe(0);
    } finally {
      store.restore();
    }
  });

  test('a store that does not answer does not cost the message, and the memory limit still holds', async () => {
    const store = fakeStore(true);
    try {
      const l = contactLimiters({ KV_REST_API_URL: HOST, KV_REST_API_TOKEN: 'tok', VERCEL_ENV: 'production' } as unknown as NodeJS.ProcessEnv);
      expect(await checkBurstLimit('1.2.3.4', l)).toEqual({ ok: true });
      expect(await checkBurstLimit('1.2.3.4', l)).toEqual({ ok: true });
      expect((await checkBurstLimit('1.2.3.4', l)).ok).toBe(false);
      expect(store.calls.length).toBeGreaterThan(0);
    } finally {
      store.restore();
    }
  });
});
