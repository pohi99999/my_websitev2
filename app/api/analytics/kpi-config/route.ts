import { NextResponse } from "next/server";
import { ANALYTICS_EVENTS, CTA_LOCATIONS, FORMS, FORM_STATUSES, PAGE_NAMES } from "../../../lib/analyticsSchema";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    version: 1,
    generatedAt: new Date().toISOString(),
    events: ANALYTICS_EVENTS,
    dimensions: {
      page: PAGE_NAMES,
      ctaLocation: CTA_LOCATIONS,
      form: FORMS,
      formStatus: FORM_STATUSES,
    },
    funnel: {
      name: "primary_lead_funnel",
      description: "Home CTA and navigation interactions leading to successful contact form submit.",
      steps: [
        {
          key: "cta_click",
          event: ANALYTICS_EVENTS.CtaClick,
          filters: {
            page: [PAGE_NAMES.Home, PAGE_NAMES.Global],
          },
        },
        {
          key: "contact_submit_success",
          event: ANALYTICS_EVENTS.FormSubmit,
          filters: {
            form: [FORMS.ContactMain],
            status: [FORM_STATUSES.Success],
            page: [PAGE_NAMES.Contact],
          },
        },
      ],
    },
    kpis: [
      {
        key: "kpi_cta_clicks_total",
        label: "CTA clicks total",
        event: ANALYTICS_EVENTS.CtaClick,
      },
      {
        key: "kpi_contact_submit_success_total",
        label: "Contact form submit success total",
        event: ANALYTICS_EVENTS.FormSubmit,
        filters: { status: FORM_STATUSES.Success, form: FORMS.ContactMain },
      },
      {
        key: "kpi_contact_submit_error_rate",
        label: "Contact submit error rate",
        formula:
          "(form_submit where status in ['error_response','error_exception']) / max(1, form_submit total)",
      },
      {
        key: "kpi_home_to_contact_conversion",
        label: "Home CTA to contact success conversion",
        formula:
          "(form_submit where status='success' and form='contact_main') / max(1, cta_click where page in ['home','global'])",
      },
      {
        key: "kpi_top_cta_locations",
        label: "Top CTA locations",
        dimension: "location",
        event: ANALYTICS_EVENTS.CtaClick,
      },
    ],
  });
}
