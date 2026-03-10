"use client";

import { track } from "@vercel/analytics";

type EventProps = Record<string, string | number | boolean | undefined>;

export const AnalyticsEvent = {
  CtaClick: "cta_click",
  FormSubmit: "form_submit",
} as const;

export function trackEvent(eventName: string, properties?: EventProps) {
  try {
    track(eventName, properties);
  } catch {
    // no-op: analytics should never break UX
  }
}

export function trackCtaClick(payload: {
  location: string;
  language: string;
  target?: string;
  page?: string;
}) {
  trackEvent(AnalyticsEvent.CtaClick, payload);
}

export function trackFormSubmit(payload: {
  form: string;
  status: "success" | "error_response" | "error_exception";
  language: string;
  page?: string;
}) {
  trackEvent(AnalyticsEvent.FormSubmit, payload);
}
