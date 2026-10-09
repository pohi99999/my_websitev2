// The visitor's site language, sent by the widget (card 780eb834, Marveen 3248/3249, 2026-10-09).
// The prompt alone did not make the model pick the right page link: an English answer linked the
// Hungarian page. The route now puts the link for the visitor's site language at the end of the prompt.
import { SYSTEM_PROMPT } from './system-prompt';

export type SiteLang = 'hu' | 'en' | 'de';

/** The site language from the request body; anything unknown is Hungarian. */
export function parseSiteLang(value: unknown): SiteLang {
  return value === 'en' || value === 'de' ? value : 'hu';
}

const SITE = 'https://www.pohankaestarsa.com';
export const PAGE_LINK: Record<SiteLang, string> = {
  hu: `${SITE}/weboldal-ai-kkv`,
  en: `${SITE}/en/weboldal-ai-kkv`,
  de: `${SITE}/de/weboldal-ai-kkv`,
};
export const CONTACT_LINK: Record<SiteLang, string> = {
  hu: `${SITE}/kapcsolat`,
  en: `${SITE}/en/kapcsolat`,
  de: `${SITE}/de/kapcsolat`,
};

const SITE_NAME: Record<SiteLang, string> = { hu: 'HUNGARIAN', en: 'ENGLISH', de: 'GERMAN' };

/** The system prompt plus the one page link this visitor's answer must use. */
export function systemPromptFor(lang: SiteLang): string {
  return `${SYSTEM_PROMPT}

THIS VISITOR IS ON THE ${SITE_NAME[lang]} SITE. When you give the page link, use exactly this one and no other:
${PAGE_LINK[lang]}`;
}

/**
 * Shown when both models are out of quota (429 twice). Sent with HTTP 200 so the Cloudflare edge
 * does not replace it with its own "error code: 502" page. Text: Marveen 3249.
 */
export function busyMessage(lang: SiteLang): string {
  if (lang === 'en') {
    return `Demand is very high right now, and the chat cannot answer at the moment. Request a free design preview or write to us: ${PAGE_LINK.en} or the Contact page: ${CONTACT_LINK.en}`;
  }
  if (lang === 'de') {
    return `Derzeit ist die Nachfrage sehr hoch, und der Chat kann gerade nicht antworten. Fordern Sie einen kostenlosen Entwurf an oder schreiben Sie uns: ${PAGE_LINK.de} oder die Kontaktseite: ${CONTACT_LINK.de}`;
  }
  return `Most nagy az érdeklődés, és a chat pillanatnyilag nem tud válaszolni. Kérjen ingyenes látványtervet vagy írjon nekünk: ${PAGE_LINK.hu} vagy a Kapcsolat oldal: ${CONTACT_LINK.hu}`;
}
