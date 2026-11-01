// The base package price, in ONE place (Péter, Telegram 4311, 2026-09-23; EN/DE 6328, 2026-10-05).
// Used by the price card (Arcsomag), the /weboldal-ai-kkv FAQ and checked by the chat prompt's
// drift guard. Change the price here and nowhere else.
export const NBSP = ' ';

export const BASE_PRICE = {
  hu: `150${NBSP}000${NBSP}Ft`,
  en: `HUF${NBSP}150,000`,
  de: `150.000${NBSP}Ft`,
} as const;

// The rest of the price card's price wording (Arcsomag), here so the configurator's fixed price
// table (app/api/chat/configurator.ts) shows exactly what the card shows. Péter 4311 / 6299 / 6328.
export const PRICE_TERMS = {
  hu: {
    gross: 'bruttó, egyszeri',
    addonPrice: 'Egyedi ajánlat, az árat előre, fixen rögzítjük az ajánlatban.',
    optional: 'Opcionális',
  },
  en: {
    gross: 'incl. VAT, one-off payment',
    addonPrice: 'Priced individually: the price is fixed up front in your quote.',
    optional: 'Optional',
  },
  de: {
    gross: 'inkl. MwSt., einmalig',
    addonPrice: 'Individuelles Angebot: Der Preis wird vorab verbindlich im Angebot festgelegt.',
    optional: 'Optional',
  },
} as const;
