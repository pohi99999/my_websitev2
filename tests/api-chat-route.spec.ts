import { test, expect } from "@playwright/test";
import { POST } from "../app/api/chat/route";
import { NextRequest } from "next/server";

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
      "AI konfiguráció hiányzik. Kérjük, vegye fel velünk a kapcsolatot.",
    );

    // Restore for other tests if any
    if (originalToken === undefined) {
      delete process.env.GITHUB_TOKEN;
    } else {
      process.env.GITHUB_TOKEN = originalToken;
    }
  });
});
