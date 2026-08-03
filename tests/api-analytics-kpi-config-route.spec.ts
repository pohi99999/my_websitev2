import { test, expect } from "@playwright/test";
import { GET } from "../app/api/analytics/kpi-config/route";

test.describe("GET /api/analytics/kpi-config", () => {
  test("returns 200 and correctly structured JSON configuration", async () => {
    const res = await GET();

    expect(res.status).toBe(200);

    const body = await res.json();

    expect(body).toHaveProperty("version", 1);
    expect(body).toHaveProperty("generatedAt");
    expect(typeof body.generatedAt).toBe("string");

    expect(body).toHaveProperty("events");
    expect(body).toHaveProperty("dimensions");
    expect(body).toHaveProperty("funnel");
    expect(body).toHaveProperty("kpis");

    expect(body.dimensions).toHaveProperty("page");
    expect(body.dimensions).toHaveProperty("ctaLocation");

    expect(body.funnel).toHaveProperty("name");
    expect(body.funnel).toHaveProperty("steps");
    expect(Array.isArray(body.funnel.steps)).toBe(true);

    expect(Array.isArray(body.kpis)).toBe(true);
  });
});
