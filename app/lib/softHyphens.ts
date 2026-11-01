// Soft hyphens (U+00AD) for the few heading words that cannot fit a 360 px phone line even at the
// fluid mobile heading size (globals.css, measured 2026-11-01 on every sitemap URL at 360/390 px).
// Headings are not hyphenated automatically on phones any more, so the browser breaks such a word
// only at these points, only when it does not fit, and shows a hyphen there; on a wide screen the
// word stays whole. Applied where a title is rendered as a heading, never to metadata (titles, OG,
// JSON-LD), so search results and shared links keep the plain word.
const SOFT: Record<string, string> = {
  Geschäftsprozessautomatisierung: 'Geschäfts­prozess­automatisierung',
};

const PATTERN = new RegExp(Object.keys(SOFT).join('|'), 'g');

export function softHyphens(text: string): string {
  return text.replace(PATTERN, (word) => SOFT[word] ?? word);
}
