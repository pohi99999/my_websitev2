import { test, expect } from "@playwright/test";
import { POST } from "../app/api/lead-magnet-audit/route";
import { NextRequest } from "next/server";
import { rateMemory, RATE_MAX } from "../app/api/chat/rate-limiter";
import sinon from "sinon";

test.describe("POST /api/lead-magnet-audit", () => {
  let originalN8nUrl: string | undefined;
  let originalNextN8nUrl: string | undefined;
  let fetchStub: sinon.SinonStub;

  test.beforeAll(() => {
    originalN8nUrl = process.env.N8N_WEBHOOK_URL;
    originalNextN8nUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  });

  test.afterAll(() => {
    if (originalN8nUrl === undefined) {
      delete process.env.N8N_WEBHOOK_URL;
    } else {
      process.env.N8N_WEBHOOK_URL = originalN8nUrl;
    }

    if (originalNextN8nUrl === undefined) {
      delete process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    } else {
      process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL = originalNextN8nUrl;
    }
  });

  test.beforeEach(() => {
    rateMemory.clear();
    process.env.N8N_WEBHOOK_URL = "http://test-n8n.com";
    fetchStub = sinon.stub(global, "fetch");
  });

  test.afterEach(() => {
    fetchStub.restore();
  });

  test("returns 429 when rate limit is exceeded", async () => {
    const ip = "127.0.0.1";
    rateMemory.set(ip, { count: RATE_MAX, resetAtMs: Date.now() + 60000 });

    const req = new NextRequest("http://localhost", {
      method: "POST",
      headers: {
        "x-real-ip": ip,
      },
      body: JSON.stringify({ website: "test.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error).toBe("Túl sok kérés érkezett. Kérjük, próbáld újra pár perc múlva.");
  });

  test("returns 500 when N8N_WEBHOOK_URL is missing", async () => {
    delete process.env.N8N_WEBHOOK_URL;
    delete process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ website: "test.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Szerver konfigurációs hiba");
  });

  test("returns webhook HTTP status when webhook responds with error", async () => {
    fetchStub.resolves({
      ok: false,
      status: 400,
      statusText: "Bad Request"
    } as Response);

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ website: "test.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Hiba a webhook hívásakor");
  });

  test("returns 500 when webhook throws an exception", async () => {
    fetchStub.rejects(new Error("Network Error"));

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ website: "test.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Belső szerverhiba");
  });

  test("returns 200 on successful webhook execution", async () => {
    fetchStub.resolves({
      ok: true,
      status: 200,
    } as Response);

    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ website: "test.com", email: "test@example.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);

    // Verify fetch was called with correct arguments
    expect(fetchStub.calledOnce).toBe(true);
    expect(fetchStub.firstCall.args[0]).toBe("http://test-n8n.com/webhook/lead-magnet-audit");
    expect(fetchStub.firstCall.args[1].method).toBe("POST");
    expect(JSON.parse(fetchStub.firstCall.args[1].body)).toEqual({ website: "test.com", email: "test@example.com" });
  });

  test("returns 500 when JSON parsing fails", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: "invalid json", // This will cause req.json() to throw
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Belső szerverhiba");
  });
});
