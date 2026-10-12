// Brunella chat on Claude (card 63a125ae, owner GO 2026-10-12, Telegram 7257).
// Gemini before (780eb834, 2026-10-09) ran on the free quota, and the Gemini API terms allow only
// the paid service for apps offered to users in the EEA. Now Claude Haiku 5.5 on the site's own
// ANTHROPIC_API_KEY (Vercel Production only), one call, no second provider.
// Not sent on purpose: temperature, top_p/top_k, thinking / budget_tokens (Haiku 5.5 thinks
// adaptively; these come back 400 on the 5.x models). Its thinking counts against max_tokens, so
// the cap is generous: it is only a ceiling, output is billed as used.

export const CLAUDE_URL = 'https://api.anthropic.com/v1/messages';
export const ANTHROPIC_VERSION = '2023-06-01';
/** checked against GET /v1/models on 2026-10-12; ANTHROPIC_MODEL overrides it */
export const DEFAULT_MODEL = 'claude-haiku-5-5';
export const MAX_TOKENS = 8000;
export const TIMEOUT_MS = 25_000;

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * The Messages API wants the conversation to open with the user and the roles to alternate. The
 * widget opens with an assistant welcome, so leading assistant turns are dropped and consecutive
 * same-role turns merged.
 */
export function toClaudeMessages(turns: ChatTurn[]): ChatTurn[] {
  const out: ChatTurn[] = [];
  for (const t of turns) {
    if (out.length === 0 && t.role === 'assistant') continue;
    const last = out[out.length - 1];
    if (last && last.role === t.role) last.content += `\n\n${t.content}`;
    else out.push({ role: t.role, content: t.content });
  }
  return out;
}

export function buildClaudeBody(systemPrompt: string, turns: ChatTurn[], model: string = DEFAULT_MODEL) {
  return { model, max_tokens: MAX_TOKENS, system: systemPrompt, messages: toClaudeMessages(turns) };
}

/** The reply: the text blocks only (a thinking block comes first on Haiku 5.5); null when there is
 *  none or the answer was cut off at max_tokens. */
export function readClaudeText(data: unknown): string | null {
  const d = data as { content?: { type?: string; text?: unknown }[]; stop_reason?: string };
  if (d?.stop_reason === 'max_tokens') return null;
  const blocks = Array.isArray(d?.content) ? d.content : [];
  const text = blocks.filter((b) => b?.type === 'text' && typeof b.text === 'string').map((b) => b.text as string).join('').trim();
  return text.length > 0 ? text : null;
}

/** 429 rate limit, 529/503 overloaded, the 400 "credit balance is too low" (the shared monthly credit). */
export function isBusy(status: number, body: string): boolean {
  return status === 429 || status === 529 || status === 503 || /credit balance/i.test(body);
}
