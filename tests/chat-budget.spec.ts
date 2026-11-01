import { test, expect } from "@playwright/test";
import sinon from "sinon";
import { NextRequest } from "next/server";
import { POST } from "../app/api/chat/route";
import { budgetMemory, budgetStore, ceiling, checkDailyBudget, DAILY_CHAT_MAX } from "../app/api/chat/budget";
import { rateMemory } from "../app/api/chat/rate-limiter";

// Without Upstash env (as in tests) the in-memory ceiling applies.
test.describe("chat daily budget", () => {
  test.beforeEach(() => {
    budgetMemory.count = 0;
    budgetMemory.resetAtMs = 0;
    rateMemory.clear();
  });

  test("allows DAILY_CHAT_MAX calls, refuses the next, resets after a day", async () => {
    const realNow = Date.now;
    let now = 1_000_000;
    Date.now = () => now;
    try {
      for (let i = 0; i < DAILY_CHAT_MAX; i++) expect(await checkDailyBudget()).toBe(true);
      expect(await checkDailyBudget()).toBe(false);
      now += 24 * 60 * 60 * 1000;
      expect(await checkDailyBudget()).toBe(true);
    } finally {
      Date.now = realNow;
    }
  });

  test("over the budget the route answers the busy text and makes no Claude call", async () => {
    const original = process.env.ANTHROPIC_API_KEY;
    process.env.ANTHROPIC_API_KEY = "test-key";
    budgetMemory.count = DAILY_CHAT_MAX;
    budgetMemory.resetAtMs = Date.now() + 60_000;
    const fetchStub = sinon.stub(global, "fetch");
    const logStub = sinon.stub(console, "log");
    try {
      const req = new NextRequest("http://localhost", {
        method: "POST",
        body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
      });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.busy).toBe(true);
      expect(fetchStub.callCount).toBe(0);
      expect(logStub.calledWithMatch(/reason=daily_budget/)).toBe(true);
    } finally {
      fetchStub.restore();
      logStub.restore();
      if (original === undefined) delete process.env.ANTHROPIC_API_KEY;
      else process.env.ANTHROPIC_API_KEY = original;
    }
  });
});

// The store wiring (card 61082ddd): the Vercel Marketplace names, one store shared by Preview and
// Production but counted apart, and a store that fails or is slow never means an open ceiling.
test.describe("daily budget store", () => {
  test("reads the Marketplace KV_* names as well as UPSTASH_*, and scopes the keys by VERCEL_ENV", () => {
    expect(budgetStore({})).toBeNull();
    expect(budgetStore({ KV_REST_API_URL: "https://kv.example", KV_REST_API_TOKEN: "t", VERCEL_ENV: "preview" }))
      .toEqual({ url: "https://kv.example", token: "t", scope: "preview" });
    expect(budgetStore({ UPSTASH_REDIS_REST_URL: "https://u.example", UPSTASH_REDIS_REST_TOKEN: "u", KV_REST_API_URL: "https://kv.example", KV_REST_API_TOKEN: "t", VERCEL_ENV: "production" }))
      .toEqual({ url: "https://u.example", token: "u", scope: "production" });
    expect(budgetStore({ KV_REST_API_URL: "https://kv.example", KV_REST_API_TOKEN: "t" })?.scope).toBe("local");
    expect(budgetStore({ KV_REST_API_URL: "https://kv.example" })).toBeNull();
  });

  test("the store's answer is used as it is; a throw or a timeout falls back to the memory ceiling", async () => {
    const counted: string[] = [];
    const memory = (ok: boolean) => () => { counted.push("memory"); return ok; };
    const store = (r: { success: boolean; reason?: string } | Error) => ({
      limit: async () => { if (r instanceof Error) throw r; return r; },
    }) as never;

    expect(await ceiling(store({ success: true }), memory(true))).toEqual({ ok: true, source: "upstash" });
    expect(await ceiling(store({ success: false }), memory(true))).toEqual({ ok: false, source: "upstash" });
    expect(counted).toEqual([]);
    // @upstash/ratelimit resolves success:true with reason "timeout" when Upstash is slow: not a pass
    expect(await ceiling(store({ success: true, reason: "timeout" }), memory(false))).toEqual({ ok: false, source: "memory-fallback" });
    expect(await ceiling(store(new Error("down")), memory(false))).toEqual({ ok: false, source: "memory-fallback" });
    expect(await ceiling(null, memory(true))).toEqual({ ok: true, source: "memory" });
    expect(counted).toEqual(["memory", "memory", "memory"]);
  });
});
