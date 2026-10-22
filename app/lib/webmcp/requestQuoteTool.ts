/// <reference types="webmcp-types" />
// KISERLETI WebMCP eszkoz: a fooldali ajanlatkero urlapot (ContactCapture)
// AI-agensek szamara is elerhetove teszi a document.modelContext API-n at.
// Csak progressziv bovites: ha a bongeszoben nincs document.modelContext,
// semmi nem regisztralodik es az oldal valtozatlan. Lasd docs/webmcp.md.
//
// Biztonsag: az eszkoz UGYANAZT az /api/contact route-ot hivja, ugyanazzal a
// payloaddal, mint az urlap (Origin-ellenorzes, rate limit, szerveroldali
// validacio valtozatlan), es CSAK a felhasznalo kifejezett, oldalon beluli
// megerositese utan kuld.

import {
  buildContactPayload,
  QUOTE_LIMITS,
  QUOTE_NEEDS,
  validateQuoteInput,
  type ContactPayload,
  type QuoteInput,
  type QuoteLanguage,
} from '../quoteRequest';

export const REQUEST_QUOTE_TOOL_NAME = 'request_quote';

export const REQUEST_QUOTE_DESCRIPTION =
  'HU: Ingyenes, kötelezettségmentes konzultáció- vagy látványterv-kérés küldése a Pohánka és Társa Kft.-nek ' +
  '(ugyanaz, mint a főoldali ajánlatkérő űrlap). A beküldés előtt a felhasználónak az oldalon meg kell erősítenie ' +
  'a kitöltött adatokat; megerősítés nélkül semmi nem kerül elküldésre. ' +
  'EN: Send a free, no-obligation consultation or design-preview request to Pohánka és Társa Kft. ' +
  '(the same as the quote-request form on the homepage). The user must confirm the filled-in data on the page ' +
  'before anything is sent; nothing is submitted without that confirmation.';

export const REQUEST_QUOTE_INPUT_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: QUOTE_LIMITS.nameMax,
      description: 'HU: A kérő neve. EN: Name of the person requesting the quote.',
    },
    email: {
      type: 'string',
      format: 'email',
      minLength: 3,
      maxLength: QUOTE_LIMITS.emailMax,
      description: 'HU: Kapcsolati e-mail-cím. EN: Contact e-mail address.',
    },
    need: {
      type: 'string',
      enum: QUOTE_NEEDS,
      description:
        'HU: Mire van szüksége? lead = weboldal időpontfoglalással, accounting = ajánlatkérő weboldal, ' +
        'support = webáruház vagy alkalmazás, other = automatizálás vagy AI. ' +
        'EN: What is needed? lead = website with online booking, accounting = website with quote requests, ' +
        'support = online shop or app, other = automation or AI.',
    },
    business: {
      type: 'string',
      maxLength: QUOTE_LIMITS.businessMax,
      description: 'HU: Mivel foglalkozik a vállalkozás? (nem kötelező) EN: What does the business do? (optional)',
    },
  },
  required: ['name', 'email', 'need'],
  additionalProperties: false,
} as const;

export type ConfirmQuote = (data: QuoteInput, signal: AbortSignal) => Promise<boolean>;

export type ToolResult = {
  content: { type: 'text'; text: string }[];
  isError?: boolean;
};

function textResult(text: string, isError = false): ToolResult {
  return isError ? { content: [{ type: 'text', text }], isError: true } : { content: [{ type: 'text', text }] };
}

export function getModelContext(doc: Document | undefined = typeof document === 'undefined' ? undefined : document) {
  const modelContext = doc?.modelContext;
  return modelContext && typeof modelContext.registerTool === 'function' ? modelContext : undefined;
}

// Ugyanaz a hivas, mint a ContactCapture handleSubmit-jeben.
export async function submitContactPayload(
  payload: ContactPayload,
  fetchImpl: typeof fetch,
  signal?: AbortSignal
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const response = await fetchImpl('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.ok) {
    return { ok: false, status: response.status, error: typeof data?.error === 'string' ? data.error : 'Request failed' };
  }
  return { ok: true };
}

export type RequestQuoteToolDeps = {
  getLanguage: () => QuoteLanguage;
  confirm: ConfirmQuote;
  fetchImpl?: typeof fetch;
};

export function createRequestQuoteExecute(deps: RequestQuoteToolDeps) {
  let pending = false;

  return async function execute(rawInput: unknown, options?: { signal?: AbortSignal }): Promise<ToolResult> {
    const validation = validateQuoteInput(rawInput);
    if (validation.ok === false) {
      return textResult(`Validation failed / Hibás adatok:\n- ${ validation.errors.join('\n- ') }`, true);
    }
    if (pending) {
      return textResult('Another request is already waiting for confirmation. / Egy másik kérés már megerősítésre vár.', true);
    }

    const signal = options?.signal ?? new AbortController().signal;
    pending = true;
    let confirmed = false;
    try {
      confirmed = await deps.confirm(validation.value, signal);
    } finally {
      pending = false;
    }
    if (!confirmed || signal.aborted) {
      return textResult('The user did not confirm; nothing was sent. / A felhasználó nem erősítette meg, semmi nem lett elküldve.', true);
    }

    const payload = buildContactPayload(deps.getLanguage(), validation.value);
    try {
      const result = await submitContactPayload(payload, deps.fetchImpl ?? fetch.bind(globalThis), signal);
      if (result.ok === false) {
        return textResult(`The server rejected the request (HTTP ${ result.status }): ${ result.error }`, true);
      }
    } catch {
      return textResult('The request could not be sent (network error). / A kérést nem sikerült elküldeni (hálózati hiba).', true);
    }
    return textResult('The quote request was sent. We will get back to you shortly. / Az ajánlatkérés elküldve, hamarosan jelentkezünk.');
  };
}

// Regisztral EGY eszkozt, ha van document.modelContext. Visszaad egy
// leiratkozo fuggvenyt; ha nincs API, `null`-t ad es semmit nem csinal.
export function registerRequestQuoteTool(
  deps: RequestQuoteToolDeps,
  modelContext: WebMCP.ModelContext | undefined = getModelContext()
): (() => void) | null {
  if (!modelContext) return null;

  const controller = new AbortController();
  const execute = createRequestQuoteExecute(deps);
  const tool: WebMCP.ModelContextTool = {
    name: REQUEST_QUOTE_TOOL_NAME,
    title: 'Ajánlatkérés / Request a quote',
    description: REQUEST_QUOTE_DESCRIPTION,
    inputSchema: REQUEST_QUOTE_INPUT_SCHEMA,
    execute: (input, options) => execute(input, options),
    annotations: { readOnlyHint: false, consequentialHint: true },
  };

  try {
    Promise.resolve(modelContext.registerTool(tool, { signal: controller.signal })).catch(() => {
      // Kiserleti API: ha a regisztracio elutasul, az oldal ugyanugy mukodik.
    });
  } catch {
    return null;
  }
  return () => controller.abort();
}
