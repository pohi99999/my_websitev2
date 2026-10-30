// The hero configurator's UI side (card ff1d7435): the sketch texts per industry, the strict reader
// of the /api/chat answer and the prefill hand-over to the contact form. The keys, labels and the
// fixed price table live in the shared contract, lib/configurator.ts (Kenshin, PR #163).
import {
  FEATURES,
  INDUSTRIES,
  packagesFor,
  type ConfiguratorLang,
  type Feature,
  type Industry,
  type PackageKey,
} from './configurator';

export type ConfiguratorResult = { industry: Industry; features: Feature[]; packages: PackageKey[] };

const isIndustry = ( v: unknown ): v is Industry => ( INDUSTRIES as readonly unknown[] ).includes( v );
const isFeature = ( v: unknown ): v is Feature => ( FEATURES as readonly unknown[] ).includes( v );

/** The general sketch: a 403/429/network failure, or before the endpoint answers anything usable. */
export const OTHER_RESULT: ConfiguratorResult = { industry: 'other', features: [ 'quote' ], packages: packagesFor( [ 'quote' ] ) };

/**
 * Reads the endpoint's answer strictly: an unknown industry becomes "other", unknown features are
 * dropped, and the packages are recomputed with the shared packagesFor, so nothing the model wrote
 * reaches the page. Returns null when the answer is not a success.
 */
export function parseConfiguratorResponse ( data: unknown ): ConfiguratorResult | null
{
  if ( !data || typeof data !== 'object' || ( data as { ok?: unknown } ).ok !== true ) return null;
  const { industry, features } = data as { industry?: unknown; features?: unknown };
  const feats = Array.isArray( features ) ? [ ...new Set( features.filter( isFeature ) ) ] : [];
  return { industry: isIndustry( industry ) ? industry : 'other', features: feats, packages: packagesFor( feats ) };
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

/** The contact form's "What do you need?" option that fits the result (QUOTE_NEEDS in quoteRequest.ts). */
export function contactNeedFor ( result: ConfiguratorResult ): 'lead' | 'accounting'
{
  return result.packages.includes( 'booking' ) ? 'lead' : 'accounting';
}

/** The event the hero sends to the contact form (ContactCapture) to prefill it. */
export const CONFIGURATOR_PREFILL_EVENT = 'configurator:prefill';
export type ConfiguratorPrefill = { need: 'lead' | 'accounting'; business: string };
