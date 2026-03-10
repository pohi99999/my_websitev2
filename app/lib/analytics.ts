"use client";

import { track } from "@vercel/analytics";

type EventProps = Record<string, string | number | boolean | undefined>;

export const PAGE_NAMES = {
  Home: "home",
  Contact: "contact",
  Global: "global",
} as const;

export type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];

export const CTA_LOCATIONS = {
  HeroPrimary: "hero_primary",
  HeroSecondaryScroll: "hero_secondary_scroll",
  AiWorkflowServices: "ai_workflow_services",
  AiWorkflowContact: "ai_workflow_contact",
  AiWorkflowServicesHu: "ai_workflow_services_hu",
  AiWorkflowContactHu: "ai_workflow_contact_hu",
  HeaderNavDesktop: "header_nav_desktop",
  HeaderNavMobile: "header_nav_mobile",
  HeaderContactDesktop: "header_contact_desktop",
  HeaderContactMobile: "header_contact_mobile",
  NavbarHome: "navbar_home",
  NavbarPortfolio: "navbar_portfolio",
  NavbarAbout: "navbar_about",
  NavbarContact: "navbar_contact",
  NavbarMobileHome: "navbar_mobile_home",
  NavbarMobilePortfolio: "navbar_mobile_portfolio",
  NavbarMobileAbout: "navbar_mobile_about",
  NavbarMobileContact: "navbar_mobile_contact",
  PortfolioFeaturedBrunella: "portfolio_featured_brunella",
  PortfolioFeaturedPohi: "portfolio_featured_pohi",
  PortfolioServiceRobotpilot: "portfolio_service_robotpilot",
  PortfolioServiceRadar: "portfolio_service_radar",
  PortfolioServiceContent: "portfolio_service_content",
  PortfolioReferenceExternal: "portfolio_reference_external",
} as const;

export type CtaLocation = (typeof CTA_LOCATIONS)[keyof typeof CTA_LOCATIONS];

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
  location: CtaLocation;
  language: string;
  target?: string;
  page?: PageName;
}) {
  trackEvent(AnalyticsEvent.CtaClick, payload);
}

export function trackFormSubmit(payload: {
  form: string;
  status: "success" | "error_response" | "error_exception";
  language: string;
  page?: PageName;
}) {
  trackEvent(AnalyticsEvent.FormSubmit, payload);
}
