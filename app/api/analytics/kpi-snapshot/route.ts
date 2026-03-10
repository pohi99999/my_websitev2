import { NextResponse } from "next/server";
import { FORMS, FORM_STATUSES, PAGE_NAMES } from "../../../lib/analyticsSchema";

type KpiSnapshot = {
  source: "env" | "fallback";
  generatedAt: string;
  counts: {
    ctaClicksTotal: number;
    contactSubmitSuccess: number;
    contactSubmitError: number;
  };
  byLanguage: Record<string, { ctaClicks: number; contactSuccess: number }>;
};

const fallbackSnapshot: KpiSnapshot = {
  source: "fallback",
  generatedAt: new Date().toISOString(),
  counts: {
    ctaClicksTotal: 100,
    contactSubmitSuccess: 22,
    contactSubmitError: 4,
  },
  byLanguage: {
    hu: { ctaClicks: 62, contactSuccess: 16 },
    en: { ctaClicks: 25, contactSuccess: 4 },
    de: { ctaClicks: 13, contactSuccess: 2 },
  },
};

function safeParseEnvSnapshot(value: string | undefined): KpiSnapshot | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<KpiSnapshot>;

    const ctaClicksTotal = Number(parsed?.counts?.ctaClicksTotal ?? NaN);
    const contactSubmitSuccess = Number(parsed?.counts?.contactSubmitSuccess ?? NaN);
    const contactSubmitError = Number(parsed?.counts?.contactSubmitError ?? NaN);

    if ([ctaClicksTotal, contactSubmitSuccess, contactSubmitError].some((v) => Number.isNaN(v) || v < 0)) {
      return null;
    }

    const byLanguage = parsed.byLanguage && typeof parsed.byLanguage === "object" ? parsed.byLanguage : fallbackSnapshot.byLanguage;

    return {
      source: "env",
      generatedAt: typeof parsed.generatedAt === "string" ? parsed.generatedAt : new Date().toISOString(),
      counts: {
        ctaClicksTotal,
        contactSubmitSuccess,
        contactSubmitError,
      },
      byLanguage,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const envSnapshot = safeParseEnvSnapshot(process.env.ANALYTICS_KPI_SNAPSHOT_JSON);
  const snapshot = envSnapshot ?? fallbackSnapshot;

  const conversionRate = Math.round((snapshot.counts.contactSubmitSuccess / Math.max(1, snapshot.counts.ctaClicksTotal)) * 100);
  const errorRate = Math.round((snapshot.counts.contactSubmitError / Math.max(1, snapshot.counts.contactSubmitSuccess + snapshot.counts.contactSubmitError)) * 100);

  return NextResponse.json({
    ...snapshot,
    semantics: {
      ctaEvent: "cta_click",
      submitEvent: "form_submit",
      submitForm: FORMS.ContactMain,
      submitSuccess: FORM_STATUSES.Success,
      submitErrorResponse: FORM_STATUSES.ErrorResponse,
      submitErrorException: FORM_STATUSES.ErrorException,
      funnelPages: [PAGE_NAMES.Home, PAGE_NAMES.Global, PAGE_NAMES.Contact],
    },
    metrics: {
      conversionRate,
      errorRate,
    },
  });
}
