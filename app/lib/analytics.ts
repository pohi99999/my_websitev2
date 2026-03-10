"use client";

import { track } from "@vercel/analytics";

export function trackEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
  try {
    track(eventName, properties);
  } catch {
    // no-op: analytics should never break UX
  }
}
