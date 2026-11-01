// The hero configurator's shared contract (card ff1d7435), used by the API (app/api/chat) and by the
// hero component: the keys, the request and answer types, the labels and the fixed price table.
// Agreed with Lumen (5504/5513). The answer carries KEYS only; labels and prices are looked up
// here, so neither the model nor the API ever writes text or a price the visitor sees.
// No server-only import in this file: the client imports it.
import { BASE_PRICE, PRICE_TERMS } from './basePrice';

export type ConfiguratorLang = 'hu' | 'en' | 'de';

export const INDUSTRIES = ['hair_salon', 'car_service', 'guesthouse', 'beauty', 'carpentry', 'other'] as const;
export type Industry = (typeof INDUSTRIES)[number];
/** What the business needs on its site. The quote request form is in the base package (Péter 11931). */
export const FEATURES = ['booking', 'quote', 'deposit', 'voucher'] as const;
export type Feature = (typeof FEATURES)[number];
export const PACKAGES = ['base', 'booking', 'deposit', 'voucher', 'care'] as const;
export type PackageKey = (typeof PACKAGES)[number];

/** The longest sentence the API reads; the rest is cut. */
export const MAX_TEXT = 300;

export type ConfiguratorRequest = { mode: 'configurator'; text: string; lang?: ConfiguratorLang };

/** Why the keyword rules answered instead of the model. */
export type FallbackReason = 'empty' | 'daily_budget' | 'model_error' | 'invalid' | 'no_key';

/** HTTP 200: always this shape. 403 (foreign Origin) and 429 (rate limit) are not, the hero shows "other" then. */
export type ConfiguratorAnswer = {
  ok: true;
  source: 'ai' | 'keywords';
  reason?: FallbackReason;
  industry: Industry;
  features: Feature[];
  packages: PackageKey[];
};

/**
 * Packages from features, deterministically: base always, one add-on per paid feature, care always
 * (optional). A card deposit is taken when booking ("Online booking with card deposit", Arcsomag),
 * so a deposit brings the booking add-on with it (Lumen 5549).
 */
export function packagesFor(features: readonly Feature[]): PackageKey[] {
  const needs = (f: Feature) => features.includes(f) || (f === 'booking' && features.includes('deposit'));
  return ['base', ...(['booking', 'deposit', 'voucher'] as const).filter(needs), 'care'];
}

type Text = Record<ConfiguratorLang, string>;

export const INDUSTRY_LABEL: Record<Industry, Text> = {
  hair_salon: { hu: 'Fodrászszalon', en: 'Hair salon', de: 'Friseursalon' },
  car_service: { hu: 'Autószerviz', en: 'Car service', de: 'Autowerkstatt' },
  guesthouse: { hu: 'Vendégház', en: 'Guesthouse', de: 'Gästehaus' },
  beauty: { hu: 'Kozmetikai szalon', en: 'Beauty salon', de: 'Kosmetikstudio' },
  carpentry: { hu: 'Asztalosműhely', en: 'Carpentry workshop', de: 'Tischlerei' },
  other: { hu: 'Helyi szolgáltató', en: 'Local business', de: 'Lokaler Dienstleister' },
};

export const FEATURE_LABEL: Record<Feature, Text> = {
  booking: { hu: 'Online időpontfoglalás', en: 'Online booking', de: 'Online-Terminbuchung' },
  quote: { hu: 'Ajánlatkérő űrlap', en: 'Quote request form', de: 'Angebotsformular' },
  deposit: { hu: 'Bankkártyás előleg', en: 'Card deposit', de: 'Anzahlung per Karte' },
  voucher: { hu: 'Ajándékutalvány', en: 'Gift voucher', de: 'Geschenkgutschein' },
};

export const PACKAGE_LABEL: Record<PackageKey, Text> = {
  base: {
    hu: 'Alapcsomag: bemutatkozó weboldal, magyar + angol, két hét, ajánlatkérő űrlappal',
    en: 'Base package: business website, Hungarian + English, two weeks, with a quote request form',
    de: 'Basispaket: Unternehmenswebsite, Ungarisch + Englisch, zwei Wochen, mit Angebotsformular',
  },
  booking: { hu: 'Bővítmény: online időpontfoglalás', en: 'Add-on: online booking', de: 'Erweiterung: Online-Terminbuchung' },
  deposit: { hu: 'Bővítmény: bankkártyás előleg', en: 'Add-on: card deposit', de: 'Erweiterung: Anzahlung per Karte' },
  voucher: { hu: 'Bővítmény: ajándékutalvány', en: 'Add-on: gift voucher', de: 'Erweiterung: Geschenkgutschein' },
  care: { hu: 'Karbantartás, tartalomfrissítés', en: 'Maintenance and content updates', de: 'Wartung und Inhaltspflege' },
};

/** The fixed price table: the only place a configurator price comes from (the price card's wording). */
export function packagePrice(key: PackageKey, lang: ConfiguratorLang): string {
  if (key === 'base') return `${BASE_PRICE[lang]} ${PRICE_TERMS[lang].gross}`;
  if (key === 'care') return PRICE_TERMS[lang].optional;
  return PRICE_TERMS[lang].addonPrice;
}

export function offerTitle(packages: readonly PackageKey[], lang: ConfiguratorLang): string {
  const addon = packages.some((p) => p === 'booking' || p === 'deposit' || p === 'voucher');
  return { hu: addon ? 'Alapcsomag + bővítmény' : 'Alapcsomag', en: addon ? 'Base package + add-on' : 'Base package', de: addon ? 'Basispaket + Erweiterung' : 'Basispaket' }[lang];
}
