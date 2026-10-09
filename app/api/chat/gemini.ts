// Brunella chat on Google Gemini (card 780eb834, owner decision 2026-10-09).
// GitHub Models stopped answering: the old host is NXDOMAIN and models.github.ai answers every
// request -- even without a token, even a path that does not exist -- with 200 text/plain "OK".
// The site has its OWN Gemini key (GEMINI_API_KEY, Vercel Production only).

export const GEMINI_MODEL = 'gemini-2.5-flash';
// The site's key is on the free tier (owner decision 2026-10-09): gemini-2.5-flash allows 20 requests a
// day there. gemini-3.5-flash-lite has its own quota (measured 200 while 2.5-flash was exhausted, Marveen 3249).
export const GEMINI_FALLBACK_MODEL = 'gemini-3.5-flash-lite';
export const geminiUrl = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
export const GEMINI_URL = geminiUrl(GEMINI_MODEL);

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

/**
 * Gemini wants user/model turns that start with the user and alternate. The widget opens with an
 * assistant welcome, so leading model turns are dropped and consecutive same-role turns merged.
 */
export function toGeminiContents(turns: ChatTurn[]): GeminiContent[] {
  const out: GeminiContent[] = [];
  for (const t of turns) {
    const role = t.role === 'assistant' ? 'model' : 'user';
    if (out.length === 0 && role === 'model') continue;
    const last = out[out.length - 1];
    if (last && last.role === role) last.parts[0].text += `\n\n${t.content}`;
    else out.push({ role, parts: [{ text: t.content }] });
  }
  return out;
}

/**
 * thinkingBudget is a Gemini 2.5 setting. gemini-3.5-flash-lite rejects it with 400 INVALID_ARGUMENT
 * (measured 2026-10-09: the same request without it answered 200), so it is only sent to 2.5 models.
 */
export function usesThinkingBudget(model: string): boolean {
  return model.startsWith('gemini-2.5-');
}

export function buildGeminiBody(systemPrompt: string, turns: ChatTurn[], model: string = GEMINI_MODEL) {
  return {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: toGeminiContents(turns),
    generationConfig: {
      maxOutputTokens: 600,
      temperature: 0.7,
      // 2.5-flash thinks by default and the thinking tokens come out of maxOutputTokens:
      // an answer could end empty. A chat reply does not need it.
      ...(usesThinkingBudget(model) ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
    },
  };
}

/** The reply text from a generateContent response, or null when there is none (blocked, empty, wrong shape). */
export function readGeminiText(data: unknown): string | null {
  const parts = (data as { candidates?: { content?: { parts?: { text?: unknown }[] } }[] })
    ?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return null;
  const text = parts.map((p) => (typeof p?.text === 'string' ? p.text : '')).join('').trim();
  return text.length > 0 ? text : null;
}
