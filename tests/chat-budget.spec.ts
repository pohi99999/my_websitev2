import { test, expect } from "@playwright/test";
import sinon from "sinon";
import { NextRequest } from "next/server";
import { POST } from "../app/api/chat/route";
import { budgetMemory, checkDailyBudget, DAILY_CHAT_MAX } from "../app/api/chat/budget";
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
