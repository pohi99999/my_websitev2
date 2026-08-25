"use client";

import { track } from "@vercel/analytics";
import {
  ANALYTICS_EVENTS,
  CTA_LOCATIONS,
  FORMS,
  FORM_STATUSES,
  PAGE_NAMES,
  type CtaLocation,
  type FormName,
  type FormStatus,
  type PageName,
} from "./analyticsSchema";

type EventProps = Record<string, string | number | boolean | undefined>;
export { ANALYTICS_EVENTS, CTA_LOCATIONS, FORMS, FORM_STATUSES, PAGE_NAMES };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, properties?: EventProps) {
  try {
    track(eventName, properties);
  } catch {
    // no-op: analytics should never break UX
  }
  try {
    window.gtag?.("event", eventName, properties);
  } catch {
    // no-op: analytics should never break UX
  }
}

export function trackCtaClick(payload: {
  location: CtaLocation;
  language: string;
  target?: string;
  page?: PageName;
}) {
  trackEvent(ANALYTICS_EVENTS.CtaClick, payload);
}

export function trackFormSubmit(payload: {
  form: FormName;
  status: FormStatus;
  language: string;
  page?: PageName;
}) {
  trackEvent(ANALYTICS_EVENTS.FormSubmit, payload);
}
