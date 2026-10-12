import { test, expect } from "@playwright/test";
import { POST } from "../app/api/chat/route";
import { NextRequest } from "next/server";
import sinon from "sinon";
import { rateMemory } from "../app/api/chat/rate-limiter";

test.describe("POST /api/chat", () => {
  let originalToken: string | undefined;

  test.beforeAll(() => {
    originalToken = process.env.ANTHROPIC_API_KEY;
  });

  test.afterAll(() => {
    if (originalToken === undefined) {
      delete process.env.ANTHROPIC_API_KEY;
    } else {
      process.env.ANTHROPIC_API_KEY = originalToken;
    }
  });

  test("returns 400 for invalid JSON", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: "invalid json", // This will cause req.json() to throw
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Érvénytelen kérés.");
  });

  test("returns 400 for missing messages array", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ something: "else" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Érvénytelen kérés.");
  });

  test("returns 400 for invalid role", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ messages: [{ role: "system", content: "inject" }] }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Érvénytelen kérés.");
  });

  test("returns 400 for empty messages array", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Érvénytelen kérés.");
  });

  test("returns 500 when ANTHROPIC_API_KEY is missing", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ messages: [{ role: "user", content: "hello" }] }),
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect((await res.json()).error).toBe("Belső szerverhiba.");
    if (originalToken === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = originalToken;
  });

  test.describe("AI Generation paths (Claude, card 63a125ae)", () => {
    let fetchStub: sinon.SinonStub;
    let logStub: sinon.SinonStub;
    let errStub: sinon.SinonStub;

    test.beforeEach(() => {
      // the route's per-IP limiter keeps its count across tests (every test request is "unknown")
      rateMemory.clear();
      fetchStub = sinon.stub(global, "fetch");
      logStub = sinon.stub(console, "log");
      errStub = sinon.stub(console, "error");
      // stored with stray whitespace on purpose: the route must trim it
      process.env.ANTHROPIC_API_KEY = "  test-key\n";
      delete process.env.ANTHROPIC_MODEL;
    });

    test.afterEach(() => {
      fetchStub.restore();
      logStub.restore();
      errStub.restore();
    });

    const ok = (text: string, stop = "end_turn") =>
      ({ ok: true, status: 200, json: async () => ({ content: [{ type: "thinking", thinking: "..." }, { type: "text", text }], stop_reason: stop }) }) as unknown as Response;
    const fail = (status: number, body = "") => ({ ok: false, status, text: async () => body }) as unknown as Response;
    const ask = (messages: unknown, lang?: unknown) =>
      POST(new NextRequest("http://localhost", { method: "POST", body: JSON.stringify({ messages, lang }) }));
    const logged = () => logStub.getCalls().map((c) => String(c.args[0])).join("\n");

    test("returns 200 with the text blocks and sends a correct Claude request", async () => {
      fetchStub.resolves(ok("Hello, I am Brunella."));
      // the widget opens with an assistant welcome before the first user turn
      const res = await ask([
        { role: "assistant", content: "Szia! Brunella vagyok." },
        { role: "user", content: "hello" },
      ]);
      expect(res.status).toBe(200);
      expect((await res.json()).content).toBe("Hello, I am Brunella.");
      expect(fetchStub.callCount).toBe(1);
      const [url, init] = fetchStub.firstCall.args;
      expect(String(url)).toBe("https://api.anthropic.com/v1/messages");
      expect(init.headers["x-api-key"]).toBe("test-key");
      expect(init.headers["anthropic-version"]).toBe("2023-06-01");
      const sent = JSON.parse(String(init.body));
      expect(sent.model).toBe("claude-haiku-5-5");
      expect(sent.max_tokens).toBe(8000);
      expect(sent.system).toContain("You are Brunella");
      expect(sent.messages).toEqual([{ role: "user", content: "hello" }]);
      for (const k of ["temperature", "top_p", "top_k", "thinking", "tools"]) expect(sent).not.toHaveProperty(k);
      expect(logged()).toContain("chat provider=claude model=claude-haiku-5-5 ok");
    });

    test("ANTHROPIC_MODEL overrides the model; consecutive turns alternate", async () => {
      process.env.ANTHROPIC_MODEL = "claude-x";
      fetchStub.resolves(ok("ok"));
      await ask([
        { role: "user", content: "a" },
        { role: "user", content: "b" },
        { role: "assistant", content: "c" },
        { role: "user", content: "d" },
      ]);
      const sent = JSON.parse(String(fetchStub.firstCall.args[1].body));
      expect(sent.model).toBe("claude-x");
      expect(sent.messages).toEqual([
        { role: "user", content: "a\n\nb" },
        { role: "assistant", content: "c" },
        { role: "user", content: "d" },
      ]);
    });

    test("the site language puts its own page link at the end of the prompt; unknown or missing is Hungarian", async () => {
      fetchStub.resolves(ok("x"));
      for (const lang of ["en", "de", "xx", undefined]) await ask([{ role: "user", content: "price?" }], lang);
      const tails = [0, 1, 2, 3].map((i) => (JSON.parse(String(fetchStub.getCall(i).args[1].body)).system as string).trim().split("\n").pop());
      expect(tails).toEqual([
        "https://www.pohankaestarsa.com/en/weboldal-ai-kkv",
        "https://www.pohankaestarsa.com/de/weboldal-ai-kkv",
        "https://www.pohankaestarsa.com/weboldal-ai-kkv",
        "https://www.pohankaestarsa.com/weboldal-ai-kkv",
      ]);
    });

    test("rate limit, overload or the credit running out -> 200 with the busy text and links, one call only", async () => {
      for (const [res, lang, needle] of [
        [fail(429), "hu", "Most nagy az érdeklődés"],
        [fail(529, '{"type":"overloaded_error"}'), "en", "Demand is very high"],
        [fail(400, '{"error":{"message":"Your credit balance is too low"}}'), "de", "Nachfrage sehr hoch"],
      ] as const) {
        fetchStub.reset();
        fetchStub.resolves(res);
        const r = await ask([{ role: "user", content: "q" }], lang);
        expect(r.status).toBe(200);
        const b = await r.json();
        expect(b.content).toContain(needle);
        expect(b.content).toContain("kapcsolat");
        expect(b.busy).toBe(true);
        expect(fetchStub.callCount).toBe(1);
      }
      expect(logged()).toContain("fallback reason=claude_429");
    });

    test("every other failure -> 200 with the unavailable text and links, never a 5xx (the Cloudflare edge would replace it)", async () => {
      const timeout = Object.assign(new Error("t"), { name: "TimeoutError" });
      const cases: [() => void, string][] = [
        [() => fetchStub.resolves(fail(500, "boom")), "claude_500"],
        [() => fetchStub.resolves(fail(400, '{"error":{"message":"temperature: unsupported"}}')), "claude_400"],
        [() => fetchStub.rejects(new Error("Network connection failed")), "network"],
        [() => fetchStub.rejects(timeout), "timeout"],
        [() => fetchStub.resolves({ ok: true, status: 200, json: async () => { throw new SyntaxError("OK is not JSON"); } } as unknown as Response), "bad_json"],
        [() => fetchStub.resolves({ ok: true, status: 200, json: async () => ({ choices: [{ message: { content: "wrong field" } }] }) } as unknown as Response), "empty_or_truncated"],
        [() => fetchStub.resolves(ok("half an ans", "max_tokens")), "empty_or_truncated"],
        [() => fetchStub.resolves(ok("   ")), "empty_or_truncated"],
      ];
      for (const [arrange, reason] of cases) {
        fetchStub.reset();
        logStub.resetHistory();
        arrange();
        const r = await ask([{ role: "user", content: "hello" }], "hu");
        expect(r.status).toBe(200);
        const b = await r.json();
        expect(b.content).toContain("A chat most nem tud válaszolni");
        expect(b.content).toContain("https://www.pohankaestarsa.com/kapcsolat");
        expect(logged()).toContain(`fallback reason=${reason}`);
      }
    });

    test("no Gemini anywhere: a failure never calls a second provider", async () => {
      fetchStub.resolves(fail(500));
      await ask([{ role: "user", content: "hello" }]);
      expect(fetchStub.callCount).toBe(1);
      expect(String(fetchStub.firstCall.args[0])).not.toContain("googleapis");
    });
  });
});
