// The base package price, in ONE place (Péter, Telegram 4311, 2026-09-23; EN/DE 6328, 2026-10-05).
// Used by the price card (Arcsomag), the /weboldal-ai-kkv FAQ and checked by the chat prompt's
// drift guard. Change the price here and nowhere else.
export const NBSP = ' ';

export const BASE_PRICE = {
  hu: `150${NBSP}000${NBSP}Ft`,
  en: `HUF${NBSP}150,000`,
  de: `150.000${NBSP}Ft`,
} as const;
