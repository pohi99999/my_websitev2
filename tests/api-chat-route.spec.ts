import { test, expect } from "@playwright/test";
import { POST } from "../app/api/chat/route";
import { NextRequest } from "next/server";
import sinon from "sinon";
import { rateMemory } from "../app/api/chat/rate-limiter";

test.describe("POST /api/chat", () => {
  let originalToken: string | undefined;

  test.beforeAll(() => {
    originalToken = process.env.GEMINI_API_KEY;
  });

  test.afterAll(() => {
    if (originalToken === undefined) {
      delete process.env.GEMINI_API_KEY;
    } else {
      process.env.GEMINI_API_KEY = originalToken;
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

  test("returns 500 when GEMINI_API_KEY is missing", async () => {
    delete process.env.GEMINI_API_KEY;
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ messages: [{ role: "user", content: "hello" }] }),
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe(
      "Belső szerverhiba.",
    );

    // Restore for other tests if any
    if (originalToken === undefined) {
      delete process.env.GEMINI_API_KEY;
    } else {
      process.env.GEMINI_API_KEY = originalToken;
    }
  });

  test.describe("AI Generation paths (Gemini, card 780eb834)", () => {
    let fetchStub: sinon.SinonStub;

    test.beforeEach(() => {
      // the route's per-IP limiter keeps its count across tests (every test request is "unknown")
      rateMemory.clear();
      fetchStub = sinon.stub(global, "fetch");
      // stored with stray whitespace on purpose: the route must trim it
      process.env.GEMINI_API_KEY = "  test-key\n";
    });

    test.afterEach(() => {
      fetchStub.restore();
    });

    const ask = (messages: unknown) =>
      POST(new NextRequest("http://localhost", { method: "POST", body: JSON.stringify({ messages }) }));

    test("returns 502 when AI service responds with an error", async () => {
      fetchStub.resolves({ ok: false, status: 503, text: async () => "overloaded" } as Response);
      const res = await ask([{ role: "user", content: "hello" }]);
      expect(res.status).toBe(502);
      expect((await res.json()).error).toBe("AI szolgáltatás nem elérhető. Kérjük, próbálja később.");
    });

    test("returns 500 when fetch throws an exception", async () => {
      fetchStub.rejects(new Error("Network connection failed"));
      const res = await ask([{ role: "user", content: "hello" }]);
      expect(res.status).toBe(500);
      expect((await res.json()).error).toBe("Belső szerverhiba.");
    });

    test("a 200 that is not JSON (GitHub Models answered text/plain OK) is a 502, not a 500", async () => {
      fetchStub.resolves({
        ok: true,
        status: 200,
        json: async () => { throw new SyntaxError("Unexpected token 'O', \"OK\r\n\" is not valid JSON"); },
      } as unknown as Response);
      const res = await ask([{ role: "user", content: "hello" }]);
      expect(res.status).toBe(502);
    });

    test("a reply in another provider's shape (choices[0].message.content) is a 502, never an empty 200", async () => {
      fetchStub.resolves({
        ok: true,
        json: async () => ({ choices: [{ message: { content: "wrong field" } }] }),
      } as unknown as Response);
      const res = await ask([{ role: "user", content: "hello" }]);
      expect(res.status).toBe(502);
    });

    test("a blocked or empty candidate is a 502", async () => {
      fetchStub.resolves({
        ok: true,
        json: async () => ({ candidates: [{ finishReason: "SAFETY" }] }),
      } as unknown as Response);
      expect((await ask([{ role: "user", content: "hello" }])).status).toBe(502);
    });

    test("returns 200 with the text of candidates[0].content.parts and sends a correct Gemini request", async () => {
      fetchStub.resolves({
        ok: true,
        json: async () => ({
          candidates: [{ content: { role: "model", parts: [{ text: "Hello, I am " }, { text: "Brunella." }] }, finishReason: "STOP" }],
        }),
      } as unknown as Response);

      // the widget opens with an assistant welcome before the first user turn
      const res = await ask([
        { role: "assistant", content: "Szia! Brunella vagyok." },
        { role: "user", content: "hello" },
      ]);
      expect(res.status).toBe(200);
      expect((await res.json()).content).toBe("Hello, I am Brunella.");

      expect(fetchStub.callCount).toBe(1);
      const [url, init] = fetchStub.firstCall.args;
      expect(String(url)).toBe("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent");
      expect(String(url)).not.toContain("key=");
      expect(init.headers["x-goog-api-key"]).toBe("test-key");
      const sent = JSON.parse(String(init.body));
      expect(sent.systemInstruction.parts[0].text).toContain("You are Brunella");
      expect(sent.contents).toEqual([{ role: "user", parts: [{ text: "hello" }] }]);
      expect(sent.generationConfig.thinkingConfig.thinkingBudget).toBe(0);
      expect(sent.generationConfig.maxOutputTokens).toBe(600);
    });

    test("an assistant turn after the first user turn is sent as role 'model'", async () => {
      fetchStub.resolves({ ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: "ok" }] } }] }) } as unknown as Response);
      await ask([
        { role: "user", content: "a" },
        { role: "assistant", content: "b" },
        { role: "user", content: "c" },
      ]);
      const sent = JSON.parse(String(fetchStub.firstCall.args[1].body));
      expect(sent.contents.map((c: { role: string }) => c.role)).toEqual(["user", "model", "user"]);
    });

    // ── card 780eb834, Marveen 3248/3249: site language and free-tier fallback ──
    const ok = (text: string) => ({ ok: true, status: 200, json: async () => ({ candidates: [{ content: { parts: [{ text }] } }] }) }) as unknown as Response;
    const quota = () => ({ ok: false, status: 429, text: async () => '{"error":{"code":429,"status":"RESOURCE_EXHAUSTED"}}' }) as unknown as Response;
    const askLang = (lang: unknown) =>
      POST(new NextRequest("http://localhost", { method: "POST", body: JSON.stringify({ messages: [{ role: "user", content: "price?" }], lang }) }));
    const promptOf = (call: number) => JSON.parse(String(fetchStub.getCall(call).args[1].body)).systemInstruction.parts[0].text as string;

    test("the site language puts its own page link at the end of the prompt; unknown or missing is Hungarian", async () => {
      fetchStub.resolves(ok("x"));
      await askLang("en");
      await askLang("de");
      await askLang("xx");
      await askLang(undefined);
      const tails = [0, 1, 2, 3].map((i) => promptOf(i).trim().split("\n").pop());
      expect(tails).toEqual([
        "https://www.pohankaestarsa.com/en/weboldal-ai-kkv",
        "https://www.pohankaestarsa.com/de/weboldal-ai-kkv",
        "https://www.pohankaestarsa.com/weboldal-ai-kkv",
        "https://www.pohankaestarsa.com/weboldal-ai-kkv",
      ]);
      expect(promptOf(0)).toContain("THIS VISITOR IS ON THE ENGLISH SITE");
    });

    test("a 429 on gemini-2.5-flash retries the same request once on gemini-3.5-flash-lite", async () => {
      fetchStub.onFirstCall().resolves(quota());
      fetchStub.onSecondCall().resolves(ok("Az alapcsomag ára fix 150 000 Ft."));
      const res = await askLang("hu");
      expect(res.status).toBe(200);
      expect((await res.json()).content).toBe("Az alapcsomag ára fix 150 000 Ft.");
      expect(fetchStub.callCount).toBe(2);
      expect(String(fetchStub.getCall(0).args[0])).toContain("/models/gemini-2.5-flash:generateContent");
      expect(String(fetchStub.getCall(1).args[0])).toContain("/models/gemini-3.5-flash-lite:generateContent");
      expect(fetchStub.getCall(1).args[1].body).toBe(fetchStub.getCall(0).args[1].body);
    });

    test("a 429 on both models answers 200 with the busy text and the page link in the site language", async () => {
      fetchStub.resolves(quota());
      const hu = await askLang("hu");
      expect(hu.status).toBe(200);
      const huBody = await hu.json();
      expect(huBody.content).toContain("Most nagy az érdeklődés");
      expect(huBody.content).toContain("https://www.pohankaestarsa.com/weboldal-ai-kkv");
      expect(huBody.content).toContain("https://www.pohankaestarsa.com/kapcsolat");
      const en = await askLang("en");
      expect(en.status).toBe(200);
      const enText = (await en.json()).content as string;
      expect(enText).toContain("https://www.pohankaestarsa.com/en/weboldal-ai-kkv");
      expect(enText).not.toContain("Most nagy");
      expect(fetchStub.callCount).toBe(4);
    });

    test("any other failure stays a 502, without a fallback call; a fallback that fails otherwise is a 502 too", async () => {
      fetchStub.resolves({ ok: false, status: 500, text: async () => "boom" } as unknown as Response);
      expect((await askLang("hu")).status).toBe(502);
      expect(fetchStub.callCount).toBe(1);
      fetchStub.reset();
      fetchStub.onFirstCall().resolves(quota());
      fetchStub.onSecondCall().resolves({ ok: false, status: 500, text: async () => "boom" } as unknown as Response);
      expect((await askLang("hu")).status).toBe(502);
      expect(fetchStub.callCount).toBe(2);
    });
  });
});
