// A fooldali ajanlat-/konzultaciokero urlap (ContactCapture) es a kiserleti
// WebMCP eszkoz (app/lib/webmcp/requestQuoteTool.ts) KOZOS logikaja: a mezok,
// a validacios szabalyok es az /api/contact-nak kuldott uzenet itt egy helyen
// van, hogy a ket bekuldesi ut ne terhessen el egymastol.

export type QuoteLanguage = 'hu' | 'en' | 'de';

export const QUOTE_NEEDS = ['lead', 'accounting', 'support', 'other'] as const;
export type QuoteNeed = (typeof QUOTE_NEEDS)[number];

// Az urlap es a szerver szabalyai: az urlap `required` + `type="email"` +
// `maxLength={1000}`, a szerver (app/api/contact/route.ts) nev <= 120,
// email <= 200 karakter.
export const QUOTE_LIMITS = {
  nameMax: 120,
  emailMax: 200,
  businessMax: 1000,
} as const;

export const QUOTE_NEED_LABELS: Record<QuoteLanguage, Record<QuoteNeed, string>> = {
  en: {
    lead: 'Website with online booking',
    accounting: 'Website with quote requests',
    support: 'Online shop or app',
    other: 'Automation or AI',
  },
  de: {
    lead: 'Website mit Online-Buchung',
    accounting: 'Website mit Anfrageformular',
    support: 'Onlineshop oder App',
    other: 'Automatisierung oder KI',
  },
  hu: {
    lead: 'Weboldal időpontfoglalással',
    accounting: 'Ajánlatkérő weboldal',
    support: 'Webáruház vagy alkalmazás',
    other: 'Automatizálás vagy AI',
  },
};

export type QuoteInput = {
  name: string;
  email: string;
  need: QuoteNeed;
  business?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website: '';
};

// `language` szandekosan string: minden, ami nem 'en'/'de', magyar marad (mint eddig).
export function buildQuoteMessage(
  language: string,
  needLabel: string,
  business: string,
  email: string
): string {
  const about = business.trim();
  return language === 'en'
    ? `Homepage request for a free consultation or design preview\nNeeds: ${ needLabel }${ about ? `\nBusiness: ${ about }` : '' }\nPreferred contact: ${ email }`
    : language === 'de'
      ? `Homepage-Anfrage für Beratung oder Entwurf\nBedarf: ${ needLabel }${ about ? `\nUnternehmen: ${ about }` : '' }\nBevorzugter Kontakt: ${ email }`
      : `Főoldali konzultáció- vagy látványterv-kérés\nIgény: ${ needLabel }${ about ? `\nVállalkozás: ${ about }` : '' }\nKapcsolati e-mail: ${ email }`;
}

export function buildContactPayload(language: QuoteLanguage, input: QuoteInput): ContactPayload {
  const needLabel = QUOTE_NEED_LABELS[language][input.need] ?? QUOTE_NEED_LABELS[language].other;
  return {
    name: input.name,
    email: input.email,
    message: buildQuoteMessage(language, needLabel, input.business ?? '', input.email),
    // honeypot: a valodi urlap is mindig uresen kuldi
    website: '',
  };
}

// Ugyanaz az egyszeru alak, amit a bongeszo `type="email"` mezoje elfogad
// (WHATWG "valid e-mail address", egyszerusitve).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type QuoteValidationResult =
  | { ok: true; value: QuoteInput }
  | { ok: false; errors: string[] };

// Kliensoldali ellenorzes a gepi bemenetre. Ez NEM helyettesiti a szerveroldali
// validaciot: a bekuldes utana is az /api/contact route ellenorzesein megy at.
export function validateQuoteInput(raw: unknown): QuoteValidationResult {
  const errors: string[] = [];
  const input = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const need = input.need;
  const business = input.business;

  if (!name) errors.push('name: required / kötelező');
  else if (name.length > QUOTE_LIMITS.nameMax) errors.push(`name: max ${ QUOTE_LIMITS.nameMax } characters / karakter`);

  if (!email) errors.push('email: required / kötelező');
  else if (email.length > QUOTE_LIMITS.emailMax) errors.push(`email: max ${ QUOTE_LIMITS.emailMax } characters / karakter`);
  else if (!EMAIL_PATTERN.test(email)) errors.push('email: invalid e-mail address / érvénytelen e-mail-cím');

  if (typeof need !== 'string' || !(QUOTE_NEEDS as readonly string[]).includes(need)) {
    errors.push(`need: must be one of / ezek egyike: ${ QUOTE_NEEDS.join(', ') }`);
  }

  if (business !== undefined && typeof business !== 'string') errors.push('business: must be a string / szöveg legyen');
  else if (typeof business === 'string' && business.length > QUOTE_LIMITS.businessMax) {
    errors.push(`business: max ${ QUOTE_LIMITS.businessMax } characters / karakter`);
  }

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      name,
      email,
      need: need as QuoteNeed,
      ...(typeof business === 'string' && business.trim() ? { business: business.trim() } : {}),
    },
  };
}
