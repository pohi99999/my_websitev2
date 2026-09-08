import { test, expect } from "@playwright/test";
import { NextRequest } from "next/server";
import { middleware } from "../middleware";

// The analytics API was reachable without a token until 2026-09-08 (measured
// live). These tests call the middleware directly, no server needed, and check
// BOTH directions: the unauthenticated request is refused, the authenticated
// one (cookie or bearer) passes through, and unrelated /api paths stay open.

const TOKEN = "test-admin-token-123";
const BASE = "https://example.test";

function req(path: string, init?: { cookie?: string; authorization?: string }) {
  const headers = new Headers();
  if (init?.cookie) headers.set("cookie", init.cookie);
  if (init?.authorization) headers.set("authorization", init.authorization);
  return new NextRequest(`${BASE}${path}`, { headers });
}

test.describe("middleware: /api/analytics is gated by ADMIN_ANALYTICS_TOKEN", () => {
  const originalToken = process.env.ADMIN_ANALYTICS_TOKEN;
  const originalEnv = process.env.NODE_ENV;

  test.beforeEach(() => {
    process.env.ADMIN_ANALYTICS_TOKEN = TOKEN;
  });
  test.afterAll(() => {
    if (originalToken === undefined) delete process.env.ADMIN_ANALYTICS_TOKEN;
    else process.env.ADMIN_ANALYTICS_TOKEN = originalToken;
    (process.env as Record<string, string | undefined>).NODE_ENV = originalEnv;
  });

  for (const path of ["/api/analytics/kpi-snapshot", "/api/analytics/kpi-config", "/api/analytics"]) {
    test(`${path} without a token -> 401 JSON, no-store`, async () => {
      const res = middleware(req(path));
      expect(res.status).toBe(401);
      expect(res.headers.get("content-type")).toContain("application/json");
      expect(res.headers.get("cache-control")).toBe("no-store");
      expect(await res.json()).toEqual({ error: "Unauthorized" });
    });
  }

  test("wrong bearer token -> 401", () => {
    expect(middleware(req("/api/analytics/kpi-snapshot", { authorization: "Bearer nope" })).status).toBe(401);
  });

  test("?token= in the URL does NOT log an API client in (no redirect, no cookie)", () => {
    const res = middleware(req(`/api/analytics/kpi-snapshot?token=${TOKEN}`));
    expect(res.status).toBe(401);
  });

  test("valid admin cookie -> passes through", () => {
    const res = middleware(req("/api/analytics/kpi-snapshot", { cookie: `admin_analytics_auth=${TOKEN}` }));
    expect(res.status).toBe(200);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  test("valid Authorization: Bearer -> passes through", () => {
    const res = middleware(req("/api/analytics/kpi-config", { authorization: `Bearer ${TOKEN}` }));
    expect(res.status).toBe(200);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  test("an unrelated /api path stays open", () => {
    const res = middleware(req("/api/contact"));
    expect(res.status).toBe(200);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });

  test("production without a configured token fails secure (401), dev stays open", () => {
    delete process.env.ADMIN_ANALYTICS_TOKEN;
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    expect(middleware(req("/api/analytics/kpi-snapshot")).status).toBe(401);
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
    expect(middleware(req("/api/analytics/kpi-snapshot")).status).toBe(200);
  });

  test("the admin page keeps its ?token= login flow (redirect + cookie)", () => {
    const res = middleware(req(`/admin/analytics?token=${TOKEN}`));
    expect(res.status).toBeGreaterThanOrEqual(300);
    expect(res.status).toBeLessThan(400);
    expect(res.headers.get("set-cookie")).toContain("admin_analytics_auth=");
  });
});
