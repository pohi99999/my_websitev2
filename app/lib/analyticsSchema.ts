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
  RoiPrimary: "roi_primary",
  HomepageContactWhatsapp: "homepage_contact_whatsapp",
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

export const ANALYTICS_EVENTS = {
  CtaClick: "cta_click",
  FormSubmit: "form_submit",
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export const FORMS = {
  ContactMain: "contact_main",
  ContactHomeQuick: "contact_home_quick",
} as const;

export type FormName = (typeof FORMS)[keyof typeof FORMS];

export const FORM_STATUSES = {
  Success: "success",
  ErrorResponse: "error_response",
  ErrorException: "error_exception",
} as const;

export type FormStatus = (typeof FORM_STATUSES)[keyof typeof FORM_STATUSES];
