// The homepage configurator (card ff1d7435, owner GO 2026-10-30, Marveen 5498): the visitor writes
// one sentence about the business, and the hero builds a sketch of their website with a suggested
// package. The model (the /api/chat "configurator" mode) only picks keys from the lists below; the
// texts and every price come from this file, never from the model.
import { BASE_PRICE } from './basePrice';

export type ConfiguratorLang = 'hu' | 'en' | 'de';

export const INDUSTRIES = ['hair_salon', 'car_service', 'guesthouse', 'beauty', 'carpentry', 'other'] as const;
export type Industry = (typeof INDUSTRIES)[number];

export const FEATURES = ['booking', 'quote', 'deposit', 'voucher'] as const;
export type Feature = (typeof FEATURES)[number];

export const PACKAGES = ['base', 'booking', 'deposit', 'voucher', 'care'] as const;
export type PackageKey = (typeof PACKAGES)[number];

export type ConfiguratorResult = { industry: Industry; features: Feature[]; packages: PackageKey[] };

export const CONFIGURATOR_TEXT_MAX = 300;

const isIndustry = ( v: unknown ): v is Industry => ( INDUSTRIES as readonly unknown[] ).includes( v );
const isFeature = ( v: unknown ): v is Feature => ( FEATURES as readonly unknown[] ).includes( v );

/**
 * The packages follow from the features, in code: the base package always (the quote request form is
 * part of it, owner 11931), one add-on per paid feature (a card deposit needs online booking), and
 * maintenance as an optional line.
 */
export function derivePackages ( features: readonly Feature[] ): PackageKey[]
{
  const out: PackageKey[] = [ 'base' ];
  if ( features.includes( 'booking' ) || features.includes( 'deposit' ) ) out.push( 'booking' );
  if ( features.includes( 'deposit' ) ) out.push( 'deposit' );
  if ( features.includes( 'voucher' ) ) out.push( 'voucher' );
  out.push( 'care' );
  return out;
}

/**
 * Reads the endpoint's answer strictly: an unknown industry becomes "other", unknown features are
 * dropped, and the packages are recomputed here, so nothing the model wrote reaches the page.
 * Returns null when the answer is not a success.
 */
export function parseConfiguratorResponse ( data: unknown ): ConfiguratorResult | null
{
  if ( !data || typeof data !== 'object' || ( data as { ok?: unknown } ).ok !== true ) return null;
  const { industry, features } = data as { industry?: unknown; features?: unknown };
  const feats = Array.isArray( features ) ? [ ...new Set( features.filter( isFeature ) ) ] : [];
  return { industry: isIndustry( industry ) ? industry : 'other', features: feats, packages: derivePackages( feats ) };
}

// The offline fallback (and the answer until the endpoint mode is live): a keyword match on the
// visitor's sentence in Hungarian, English or German.
const KEYWORDS: { industry: Exclude<Industry, 'other'>; re: RegExp; features: Feature[] }[] = [
  { industry: 'hair_salon', re: /fodr|haj|borbély|barber|\bhair|friseur/i, features: [ 'booking' ] },
  { industry: 'car_service', re: /autó|gépjármű|szerviz|gumi|\bcars?\b|garage|mechanic|\btyres?\b|\btires?\b|werkstatt|\bkfz|reifen/i, features: [ 'quote', 'booking' ] },
  { industry: 'guesthouse', re: /vendég|szállás|panzió|apartman|balaton|guest|b&b|hotel|holiday|pension|ferienwohnung|unterkunft/i, features: [ 'booking', 'voucher' ] },
  { industry: 'beauty', re: /kozmet|köröm|szépség|masszázs|bérlet|beauty|\bnails?\b|massage|\bspa\b|kosmetik|nagel/i, features: [ 'booking', 'deposit' ] },
  { industry: 'carpentry', re: /asztalos|bútor|konyha|carpent|joiner|furniture|kitchen|tischler|schreiner|möbel|küche/i, features: [ 'quote' ] },
];

export function classifyLocally ( text: string ): ConfiguratorResult
{
  const hit = KEYWORDS.find( ( k ) => k.re.test( text ) );
  const features: Feature[] = hit ? hit.features : [ 'quote' ];
  return { industry: hit ? hit.industry : 'other', features, packages: derivePackages( features ) };
}

type Profile = {
  name: string; nav: string; head: string; sub: string; cta: string; kind: string; why: string;
  slots: [ string, string ][]; color: string;
};

const COLORS: Record<Industry, string> = {
  hair_salon: '#00e5ff', car_service: '#f5a623', guesthouse: '#34d399', beauty: '#f0abfc', carpentry: '#fbbf24', other: '#00e5ff',
};

// The sketch texts per industry. Sample content only: the visitor sees what kind of page it becomes.
const PROFILE_TEXT: Record<ConfiguratorLang, Record<Industry, Omit<Profile, 'color'>>> = {
  hu: {
    hair_salon: { name: 'Hajszalon', nav: 'Szolgáltatások · Árak · Foglalás', head: 'Foglaljon időpontot két kattintással.', sub: 'Minta nyitvatartás · Zalaegerszeg', cta: 'Időpontot kérek', kind: 'fodrászszalon', why: 'online időpontfoglalás', slots: [ [ 'K 9:00', 'Női vágás' ], [ 'K 10:30', 'Festés' ], [ 'Sze 14:00', 'Férfi vágás' ], [ 'Cs 8:30', 'Szárítás' ] ] },
    car_service: { name: 'Autószerviz', nav: 'Szerviz · Ajánlatkérés · Időpont', head: 'Kérjen árajánlatot, mielőtt behozza.', sub: 'Árajánlat 24 órán belül (minta)', cta: 'Ajánlatot kérek', kind: 'autószerviz', why: 'ajánlatkérés + időpont', slots: [ [ 'H 8:00', 'Olajcsere' ], [ 'H 13:00', 'Diagnosztika' ], [ 'K 9:00', 'Gumicsere' ], [ 'Sze 10:00', 'Műszaki' ] ] },
    guesthouse: { name: 'Tóparti Vendégház', nav: 'Szobák · Árak · Utalvány', head: 'Szabad időpontok és ajándékutalvány egy helyen.', sub: 'Foglalás közvetlenül, jutalék nélkül', cta: 'Szabad napok', kind: 'vendégház', why: 'foglalás + ajándékutalvány', slots: [ [ 'Nov 6–8', '2 éj' ], [ 'Nov 13–15', '2 éj' ], [ 'Nov 20–23', '3 éj' ], [ 'Utalvány', 'ajándékba' ] ] },
    beauty: { name: 'Bőrápoló Stúdió', nav: 'Kezelések · Bérlet · Foglalás', head: 'Időpont és előleg, telefonálás nélkül.', sub: 'Foglalás és előleg online', cta: 'Kezelést foglalok', kind: 'kozmetikai szalon', why: 'foglalás + bankkártyás előleg', slots: [ [ 'K 10:00', 'Arckezelés' ], [ 'K 15:00', 'Manikűr' ], [ 'Cs 11:00', 'Masszázs' ], [ 'P 9:00', 'Bérlet' ] ] },
    carpentry: { name: 'Műhely Bútor', nav: 'Munkáink · Ajánlatkérés · Rólunk', head: 'Küldjön egy fotót, és árajánlatot adunk.', sub: 'Egyedi bútor méretre', cta: 'Ajánlatot kérek', kind: 'asztalosműhely', why: 'ajánlatkérés fotóval', slots: [ [ 'Konyha', 'fotóval' ], [ 'Gardrób', 'méretre' ], [ 'Asztal', 'tömörfa' ], [ 'Lépcső', 'egyedi' ] ] },
    other: { name: 'Az Ön cége', nav: 'Szolgáltatások · Munkáink · Kapcsolat', head: 'Kérjen ajánlatot egy perc alatt.', sub: 'Ajánlatkérés egy űrlapon', cta: 'Ajánlatot kérek', kind: 'helyi szolgáltató', why: 'ajánlatkérő űrlap', slots: [ [ '1.', 'Szolgáltatás' ], [ '2.', 'Szolgáltatás' ], [ '3.', 'Referencia' ], [ '4.', 'Kapcsolat' ] ] },
  },
  en: {
    hair_salon: { name: 'Hair Studio', nav: 'Services · Prices · Booking', head: 'Book an appointment in two clicks.', sub: 'Sample opening hours · Zalaegerszeg', cta: 'Book now', kind: 'hair salon', why: 'online booking', slots: [ [ 'Tue 9:00', 'Women’s cut' ], [ 'Tue 10:30', 'Colour' ], [ 'Wed 14:00', 'Men’s cut' ], [ 'Thu 8:30', 'Blow-dry' ] ] },
    car_service: { name: 'Car Service', nav: 'Service · Quote · Booking', head: 'Get a quote before you bring it in.', sub: 'Quote within 24 hours (sample)', cta: 'Request a quote', kind: 'car service', why: 'quote request + booking', slots: [ [ 'Mon 8:00', 'Oil change' ], [ 'Mon 13:00', 'Diagnostics' ], [ 'Tue 9:00', 'Tyre change' ], [ 'Wed 10:00', 'Inspection' ] ] },
    guesthouse: { name: 'Lakeside Guesthouse', nav: 'Rooms · Prices · Vouchers', head: 'Free dates and gift vouchers in one place.', sub: 'Book direct, no commission', cta: 'Free dates', kind: 'guesthouse', why: 'booking + gift vouchers', slots: [ [ 'Nov 6–8', '2 nights' ], [ 'Nov 13–15', '2 nights' ], [ 'Nov 20–23', '3 nights' ], [ 'Voucher', 'as a gift' ] ] },
    beauty: { name: 'Skin Care Studio', nav: 'Treatments · Passes · Booking', head: 'Booking and deposit, no phone calls.', sub: 'Booking and deposit online', cta: 'Book a treatment', kind: 'beauty salon', why: 'booking + card deposit', slots: [ [ 'Tue 10:00', 'Facial' ], [ 'Tue 15:00', 'Manicure' ], [ 'Thu 11:00', 'Massage' ], [ 'Fri 9:00', 'Pass' ] ] },
    carpentry: { name: 'Workshop Furniture', nav: 'Our work · Quote · About', head: 'Send us a photo and we send a quote.', sub: 'Custom furniture made to measure', cta: 'Request a quote', kind: 'joinery', why: 'quote request with a photo', slots: [ [ 'Kitchen', 'with photo' ], [ 'Wardrobe', 'to measure' ], [ 'Table', 'solid wood' ], [ 'Stairs', 'custom' ] ] },
    other: { name: 'Your company', nav: 'Services · Our work · Contact', head: 'Request a quote in a minute.', sub: 'Quote request on one form', cta: 'Request a quote', kind: 'local business', why: 'quote request form', slots: [ [ '1.', 'Service' ], [ '2.', 'Service' ], [ '3.', 'Reference' ], [ '4.', 'Contact' ] ] },
  },
  de: {
    hair_salon: { name: 'Haarstudio', nav: 'Leistungen · Preise · Termin', head: 'Termin mit zwei Klicks buchen.', sub: 'Beispiel-Öffnungszeiten · Zalaegerszeg', cta: 'Termin buchen', kind: 'Friseursalon', why: 'Online-Terminbuchung', slots: [ [ 'Di 9:00', 'Damenschnitt' ], [ 'Di 10:30', 'Färben' ], [ 'Mi 14:00', 'Herrenschnitt' ], [ 'Do 8:30', 'Föhnen' ] ] },
    car_service: { name: 'Autowerkstatt', nav: 'Service · Angebot · Termin', head: 'Angebot anfragen, bevor Sie kommen.', sub: 'Angebot innerhalb von 24 Stunden (Beispiel)', cta: 'Angebot anfragen', kind: 'Autowerkstatt', why: 'Anfrageformular + Termin', slots: [ [ 'Mo 8:00', 'Ölwechsel' ], [ 'Mo 13:00', 'Diagnose' ], [ 'Di 9:00', 'Reifenwechsel' ], [ 'Mi 10:00', 'HU' ] ] },
    guesthouse: { name: 'Gästehaus am See', nav: 'Zimmer · Preise · Gutschein', head: 'Freie Termine und Gutscheine an einem Ort.', sub: 'Direkt buchen, ohne Provision', cta: 'Freie Tage', kind: 'Gästehaus', why: 'Buchung + Geschenkgutschein', slots: [ [ '6.–8. Nov.', '2 Nächte' ], [ '13.–15. Nov.', '2 Nächte' ], [ '20.–23. Nov.', '3 Nächte' ], [ 'Gutschein', 'als Geschenk' ] ] },
    beauty: { name: 'Hautpflege-Studio', nav: 'Behandlungen · Abo · Termin', head: 'Termin und Anzahlung, ohne Anruf.', sub: 'Buchung und Anzahlung online', cta: 'Behandlung buchen', kind: 'Kosmetikstudio', why: 'Buchung + Anzahlung per Karte', slots: [ [ 'Di 10:00', 'Gesichtsbehandlung' ], [ 'Di 15:00', 'Maniküre' ], [ 'Do 11:00', 'Massage' ], [ 'Fr 9:00', 'Abo' ] ] },
    carpentry: { name: 'Möbelwerkstatt', nav: 'Arbeiten · Angebot · Über uns', head: 'Schicken Sie ein Foto, wir senden ein Angebot.', sub: 'Möbel nach Maß', cta: 'Angebot anfragen', kind: 'Tischlerei', why: 'Anfrage mit Foto', slots: [ [ 'Küche', 'mit Foto' ], [ 'Schrank', 'nach Maß' ], [ 'Tisch', 'Massivholz' ], [ 'Treppe', 'individuell' ] ] },
    other: { name: 'Ihr Unternehmen', nav: 'Leistungen · Arbeiten · Kontakt', head: 'Angebot in einer Minute anfragen.', sub: 'Anfrage über ein Formular', cta: 'Angebot anfragen', kind: 'lokaler Dienstleister', why: 'Anfrageformular', slots: [ [ '1.', 'Leistung' ], [ '2.', 'Leistung' ], [ '3.', 'Referenz' ], [ '4.', 'Kontakt' ] ] },
  },
};

export function profileFor ( industry: Industry, lang: ConfiguratorLang ): Profile
{
  return { ...PROFILE_TEXT[ lang ][ industry ], color: COLORS[ industry ] };
}

// The fixed price table, worded like the price card (Arcsomag, owner 4311 / 6328). The quote form
// line follows the owner's 2026-10-30 decision (11931): it is part of the base package.
export const PACKAGE_ROWS: Record<ConfiguratorLang, Record<PackageKey, [ string, string ]>> = {
  hu: {
    base: [ 'Alapcsomag: bemutatkozó weboldal ajánlatkérő űrlappal, magyar + angol, két hét', `${ BASE_PRICE.hu }, bruttó, egyszeri` ],
    booking: [ 'Bővítmény: online időpontfoglalás', 'egyedi ajánlat, fix ár' ],
    deposit: [ 'Bővítmény: bankkártyás előleg', 'egyedi ajánlat, fix ár' ],
    voucher: [ 'Bővítmény: ajándékutalvány', 'egyedi ajánlat, fix ár' ],
    care: [ 'Karbantartás és tartalomfrissítés', 'opcionális' ],
  },
  en: {
    base: [ 'Base package: business website with a quote request form, Hungarian + English, two weeks', `${ BASE_PRICE.en }, incl. VAT, one-off` ],
    booking: [ 'Add-on: online booking', 'priced individually, fixed in the quote' ],
    deposit: [ 'Add-on: card deposit', 'priced individually, fixed in the quote' ],
    voucher: [ 'Add-on: gift vouchers', 'priced individually, fixed in the quote' ],
    care: [ 'Maintenance and content updates', 'optional' ],
  },
  de: {
    base: [ 'Basispaket: Unternehmenswebsite mit Anfrageformular, Ungarisch + Englisch, zwei Wochen', `${ BASE_PRICE.de }, inkl. MwSt., einmalig` ],
    booking: [ 'Erweiterung: Online-Terminbuchung', 'individuelles Angebot, Festpreis' ],
    deposit: [ 'Erweiterung: Anzahlung per Karte', 'individuelles Angebot, Festpreis' ],
    voucher: [ 'Erweiterung: Geschenkgutschein', 'individuelles Angebot, Festpreis' ],
    care: [ 'Wartung und Inhaltspflege', 'optional' ],
  },
};

/** The contact form's "What do you need?" option that fits the result (QUOTE_NEEDS in quoteRequest.ts). */
export function contactNeedFor ( result: ConfiguratorResult ): 'lead' | 'accounting'
{
  return result.packages.includes( 'booking' ) ? 'lead' : 'accounting';
}

/** The event the hero sends to the contact form (ContactCapture) to prefill it. */
export const CONFIGURATOR_PREFILL_EVENT = 'configurator:prefill';
export type ConfiguratorPrefill = { need: 'lead' | 'accounting'; business: string };
