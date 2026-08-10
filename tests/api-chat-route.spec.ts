import { test, expect } from "@playwright/test";
import { POST } from "../app/api/chat/route";
import { NextRequest } from "next/server";
import sinon from "sinon";

test.describe("POST /api/chat", () => {
  let originalToken: string | undefined;

  test.beforeAll(() => {
    originalToken = process.env.GITHUB_TOKEN;
  });

  test.afterAll(() => {
    if (originalToken === undefined) {
      delete process.env.GITHUB_TOKEN;
    } else {
      process.env.GITHUB_TOKEN = originalToken;
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

  test("returns 500 when GITHUB_TOKEN is missing", async () => {
    delete process.env.GITHUB_TOKEN;
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
      delete process.env.GITHUB_TOKEN;
    } else {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });

  test.describe("AI Generation paths", () => {
    let fetchStub: sinon.SinonStub;

    test.beforeEach(() => {
      fetchStub = sinon.stub(global, "fetch");
      process.env.GITHUB_TOKEN = "test-token";
    });

    test.afterEach(() => {
      fetchStub.restore();
    });

    test("returns 502 when AI service responds with an error", async () => {
      fetchStub.resolves({
        ok: false,
        status: 500,
        text: async () => "Internal server error from AI",
      } as Response);

      const req = new NextRequest("http://localhost", {
        method: "POST",
        body: JSON.stringify({ messages: [{ role: "user", content: "hello" }] }),
      });

      const res = await POST(req);
      expect(res.status).toBe(502);
      const body = await res.json();
      expect(body.error).toBe("AI szolgáltatás nem elérhető. Kérjük, próbálja később.");
    });

    test("returns 500 when fetch throws an exception", async () => {
      fetchStub.rejects(new Error("Network connection failed"));

      const req = new NextRequest("http://localhost", {
        method: "POST",
        body: JSON.stringify({ messages: [{ role: "user", content: "hello" }] }),
      });

      const res = await POST(req);
      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body.error).toBe("Belső szerverhiba.");
    });

    test("returns 200 and AI response on success", async () => {
      fetchStub.resolves({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: "Hello, I am Brunella.",
              },
            },
          ],
        }),
      } as Response);

      const req = new NextRequest("http://localhost", {
        method: "POST",
        body: JSON.stringify({ messages: [{ role: "user", content: "hello" }] }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.content).toBe("Hello, I am Brunella.");
    });
  });

});
