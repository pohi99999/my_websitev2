import { test, expect } from "@playwright/test";
import { GET } from "../../app/api/analytics/kpi-snapshot/route";
import { FORMS, FORM_STATUSES, PAGE_NAMES } from "../../app/lib/analyticsSchema";

test.describe("GET /api/analytics/kpi-snapshot", () => {
  let originalEnvVar: string | undefined;

  test.beforeAll(() => {
    originalEnvVar = process.env.ANALYTICS_KPI_SNAPSHOT_JSON;
  });

  test.afterEach(() => {
    // Reset to original before each test run
    if (originalEnvVar === undefined) {
      delete process.env.ANALYTICS_KPI_SNAPSHOT_JSON;
    } else {
      process.env.ANALYTICS_KPI_SNAPSHOT_JSON = originalEnvVar;
    }
  });

  test.afterAll(() => {
    if (originalEnvVar === undefined) {
      delete process.env.ANALYTICS_KPI_SNAPSHOT_JSON;
    } else {
      process.env.ANALYTICS_KPI_SNAPSHOT_JSON = originalEnvVar;
    }
  });

  test("uses fallback when env var is not set", async () => {
    delete process.env.ANALYTICS_KPI_SNAPSHOT_JSON;

    const res = await GET();
    const data = await res.json();

    expect(data.source).toBe("fallback");
    expect(data.counts.ctaClicksTotal).toBe(100);
    expect(data.counts.contactSubmitSuccess).toBe(22);
    expect(data.counts.contactSubmitError).toBe(4);

    // Check calculations based on fallback
    const expectedConversionRate = Math.round((22 / Math.max(1, 100)) * 100);
    const expectedErrorRate = Math.round((4 / Math.max(1, 22 + 4)) * 100);

    expect(data.metrics.conversionRate).toBe(expectedConversionRate);
    expect(data.metrics.errorRate).toBe(expectedErrorRate);

    expect(data.semantics.submitForm).toBe(FORMS.ContactMain);
  });

  test("parses valid JSON from env var and calculates metrics", async () => {
    const mockData = {
      generatedAt: "2023-10-01T12:00:00.000Z",
      counts: {
        ctaClicksTotal: 500,
        contactSubmitSuccess: 50,
        contactSubmitError: 10
      },
      byLanguage: {
        en: { ctaClicks: 250, contactSuccess: 30 },
        hu: { ctaClicks: 250, contactSuccess: 20 }
      }
    };

    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify(mockData);

    const res = await GET();
    const data = await res.json();

    expect(data.source).toBe("env");
    expect(data.counts.ctaClicksTotal).toBe(500);
    expect(data.counts.contactSubmitSuccess).toBe(50);
    expect(data.counts.contactSubmitError).toBe(10);

    expect(data.byLanguage.en.ctaClicks).toBe(250);

    const expectedConversionRate = Math.round((50 / Math.max(1, 500)) * 100);
    const expectedErrorRate = Math.round((10 / Math.max(1, 50 + 10)) * 100);

    expect(data.metrics.conversionRate).toBe(expectedConversionRate);
    expect(data.metrics.errorRate).toBe(expectedErrorRate);
  });

  test("uses fallback on invalid JSON syntax", async () => {
    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = "{ invalid: json ";

    const res = await GET();
    const data = await res.json();

    expect(data.source).toBe("fallback");
  });

  test("uses fallback when JSON is missing required counts fields", async () => {
    const mockData = {
      counts: {
        // Missing ctaClicksTotal
        contactSubmitSuccess: 50,
        contactSubmitError: 10
      }
    };

    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify(mockData);

    const res = await GET();
    const data = await res.json();

    expect(data.source).toBe("fallback");
  });

  test("uses fallback when counts contain invalid numbers (e.g. strings)", async () => {
    const mockData = {
      counts: {
        ctaClicksTotal: "not a number",
        contactSubmitSuccess: 50,
        contactSubmitError: 10
      }
    };

    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify(mockData);

    const res = await GET();
    const data = await res.json();

    expect(data.source).toBe("fallback");
  });

  test("uses fallback when counts contain negative numbers", async () => {
    const mockData = {
      counts: {
        ctaClicksTotal: 100,
        contactSubmitSuccess: -5,
        contactSubmitError: 10
      }
    };

    process.env.ANALYTICS_KPI_SNAPSHOT_JSON = JSON.stringify(mockData);

    const res = await GET();
    const data = await res.json();

    expect(data.source).toBe("fallback");
  });
});
