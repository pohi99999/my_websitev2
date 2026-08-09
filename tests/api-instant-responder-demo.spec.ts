import { test, expect } from "@playwright/test";
import { POST } from "../app/api/instant-responder/demo/route";
import { NextRequest } from "next/server";

test.describe("POST /api/instant-responder/demo", () => {
  test("returns 400 for missing message", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("a message mező kötelező és szövegnek kell lennie");
  });

  test("returns 400 for non-string message", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ message: 123 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("a message mező kötelező és szövegnek kell lennie");
  });

  test("returns 400 for overly long message", async () => {
    const longMessage = "a".repeat(2001);
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ message: longMessage }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("a message túl hosszú");
  });

  test("returns 400 for non-string tone", async () => {
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ message: "Hello", tone: 123 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("a tone mezőnek szövegnek kell lennie");
  });

  test("returns 400 for overly long tone", async () => {
    const longTone = "a".repeat(101);
    const req = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({ message: "Hello", tone: longTone }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("a tone túl hosszú");
  });
});
