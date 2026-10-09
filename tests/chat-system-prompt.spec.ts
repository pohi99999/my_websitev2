import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SYSTEM_PROMPT } from "../app/api/chat/system-prompt";

// Card 780eb834 (2026-10-09): asked "how much is a website?", the chat answered that the company does not
// make websites. The prompt now carries the Weboldal + AI package, with facts ONLY from the live page.
test.describe("Brunella chat system prompt", () => {
  test("introduces the company as building websites too, and carries the website package facts", () => {
    const firstLine = SYSTEM_PROMPT.split("\n")[0];
    expect(firstLine).toMatch(/AI automation/);
    expect(firstLine).toMatch(/websites/);
    for (const fact of [
      "150 000 Ft gross", "HUF 150,000", "one-off", "two weeks", "fixed price", "Hungarian + English",
      "látványterv", "design preview", "gift vouchers", "hetenyirenata.com", "bdklima.hu",
      "https://www.pohankaestarsa.com/weboldal-ai-kkv", "https://www.pohankaestarsa.com/en/weboldal-ai-kkv",
    ]) expect(SYSTEM_PROMPT, fact).toContain(fact);
  });

  test("forbids invented prices and the 'we do not make websites' answer", () => {
    expect(SYSTEM_PROMPT).toMatch(/Never invent any other\s+price/);
    expect(SYSTEM_PROMPT).toMatch(/never say that the company does not make websites/);
  });

  test("format, link-language and Hungarian address rules (Marveen 3244)", () => {
    // plain text: the widget renders raw text, so ** showed up literally on the live site
    expect(SYSTEM_PROMPT).toMatch(/OUTPUT FORMAT: plain text only/);
    expect(SYSTEM_PROMPT).toMatch(/Never use Markdown: no \*\* or __ for bold, no # headings/);
    // the link follows the language of the answer
    expect(SYSTEM_PROMPT).toMatch(/answer in Hungarian -> https:\/\/www\.pohankaestarsa\.com\/weboldal-ai-kkv/);
    expect(SYSTEM_PROMPT).toMatch(/answer in English\s+-> https:\/\/www\.pohankaestarsa\.com\/en\/weboldal-ai-kkv/);
    expect(SYSTEM_PROMPT).toMatch(/Never put the Hungarian link in an English or German answer/);
    // Hungarian: always magázás
    expect(SYSTEM_PROMPT).toMatch(/in Hungarian ALWAYS use the formal address \(magázás/);
    expect(SYSTEM_PROMPT).toMatch(/Never use the informal tegezés/);
  });

  test("the AI automation part and its numbers are unchanged", () => {
    for (const n of ["95+ specialized AI agents", "Average 80% time savings", "within 3 months", "Free 30-minute consultation"])
      expect(SYSTEM_PROMPT).toContain(n);
  });

  test("drift guard: the base price in the prompt is the one on the page's price component", () => {
    const page = readFileSync(join(__dirname, "..", "app", "components", "Arcsomag.tsx"), "utf-8");
    // the component writes the price as a template string with an NBSP constant: `150${ NBSP }000${ NBSP }Ft`
    expect(page).toMatch(/150\$\{\s*NBSP\s*\}000\$\{\s*NBSP\s*\}Ft/);
    expect(page).toMatch(/HUF\$\{\s*NBSP\s*\}150,000/);
    expect(page).toContain("hetenyirenata.com");
  });
});
