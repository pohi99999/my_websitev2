import { test, expect } from "@playwright/test";
import { GET } from "../app/api/analytics/kpi-config/route";

test.describe("GET /api/analytics/kpi-config", () => {
  test("returns 200 and correctly structured JSON configuration", async () => {
    const res = await GET();

    // Status check isn't standard in NextResponse like standard Response,
    // but typically NextResponse.json() returns a 200 implicitly unless configured otherwise.
    expect(res.status).toBe(200);

    const body = await res.json();

    // Schema check
    expect(body).toHaveProperty("version", 1);
    expect(body).toHaveProperty("generatedAt");
    expect(typeof body.generatedAt).toBe("string");

    // Structure check
    expect(body).toHaveProperty("events");
    expect(body).toHaveProperty("dimensions");
    expect(body).toHaveProperty("funnel");
    expect(body).toHaveProperty("kpis");

    // Minimal sub-structure assertions for safety without over-specifying
    expect(body.dimensions).toHaveProperty("page");
    expect(body.dimensions).toHaveProperty("ctaLocation");

    expect(body.funnel).toHaveProperty("name");
    expect(body.funnel).toHaveProperty("steps");
    expect(Array.isArray(body.funnel.steps)).toBe(true);

    expect(Array.isArray(body.kpis)).toBe(true);
  });
});
