import { test, expect } from "@playwright/test";
import { GET } from "../app/api/analytics/kpi-snapshot/route";

test.describe("GET /api/analytics/kpi-snapshot", () => {
  let originalEnv: string | undefined;

  test.beforeAll(() => {
    originalEnv = process.env.ANALYTICS_KPI_SNAPSHOT_JSON;
  });

  test.afterAll(() => {
    if (originalEnv === undefined) {
      delete process.env.ANALYTICS_KPI_SNAPSHOT_JSON;
    } else {
      process.env.ANALYTICS_KPI_SNAPSHOT_JSON = originalEnv;
    }
  });

  test.afterEach(() => {
    delete process.env.ANALYTICS_KPI_SNAPSHOT_JSON;
  });

  test("returns fallback snapshot when env is not set", async () => {
    delete process.env.ANALYTICS_KPI_SNAPSHOT_JSON;
    const res = await GET();
    const body = await res.json();
    expect(body.source).toBe("fallback");
    expect(body.counts.ctaClicksTotal).toBe(100);
    expect(body.counts.contactSubmitSuccess).toBe(22);
    expect(body.counts.contactSubmitError).toBe(4);
    expect(body.metrics.conversionRate).toBe(22); // Math.round(22/100 * 100) = 22
    expect(body.metrics.errorRate).toBe(15); // Math.round(4 / 26 * 100) = 15
  });

  test("returns fallback snapshot when env is invalid JSON", async () => {
    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = "invalid-json";
    const res = await GET();
    const body = await res.json();
    expect(body.source).toBe("fallback");
  });

  test("returns fallback snapshot when env has negative counts", async () => {
    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify({
      counts: {
        ctaClicksTotal: -5,
        contactSubmitSuccess: 22,
        contactSubmitError: 4,
      }
    });
    const res = await GET();
    const body = await res.json();
    expect(body.source).toBe("fallback");
  });

  test("returns fallback snapshot when env has NaN counts", async () => {
    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify({
      counts: {
        ctaClicksTotal: "not a number",
      }
    });
    const res = await GET();
    const body = await res.json();
    expect(body.source).toBe("fallback");
  });

  test("returns env snapshot when env is valid", async () => {
    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify({
      generatedAt: "2023-01-01T00:00:00.000Z",
      counts: {
        ctaClicksTotal: 200,
        contactSubmitSuccess: 50,
        contactSubmitError: 10,
      },
      byLanguage: {
        hu: { ctaClicks: 100, contactSuccess: 30 },
      }
    });
    const res = await GET();
    const body = await res.json();

    expect(body.source).toBe("env");
    expect(body.generatedAt).toBe("2023-01-01T00:00:00.000Z");
    expect(body.counts.ctaClicksTotal).toBe(200);
    expect(body.counts.contactSubmitSuccess).toBe(50);
    expect(body.counts.contactSubmitError).toBe(10);
    expect(body.byLanguage.hu.ctaClicks).toBe(100);

    // Check calculations
    expect(body.metrics.conversionRate).toBe(25); // 50 / 200 * 100
    expect(body.metrics.errorRate).toBe(17); // Math.round(10 / 60 * 100)
  });

  test("returns env snapshot but with fallback byLanguage if not object", async () => {
    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify({
      counts: {
        ctaClicksTotal: 200,
        contactSubmitSuccess: 50,
        contactSubmitError: 10,
      },
      byLanguage: "invalid-not-an-object"
    });
    const res = await GET();
    const body = await res.json();

    expect(body.source).toBe("env");
    expect(body.byLanguage.hu.ctaClicks).toBe(62); // Fallback byLanguage
  });

  test("generates date if not provided in valid env snapshot", async () => {
    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify({
      counts: {
        ctaClicksTotal: 200,
        contactSubmitSuccess: 50,
        contactSubmitError: 10,
      }
    });
    const res = await GET();
    const body = await res.json();

    expect(body.source).toBe("env");
    expect(body.generatedAt).toBeDefined();
  });
});
