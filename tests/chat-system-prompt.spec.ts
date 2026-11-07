import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SYSTEM_PROMPT } from "../app/api/chat/system-prompt";
import { systemPromptFor } from "../app/api/chat/site-lang";
import { BASE_PRICE } from "../app/lib/basePrice";

// Card 780eb834 (2026-10-09): asked "how much is a website?", the chat answered that the company does not
// make websites. The prompt now carries the Weboldal + AI package, with facts ONLY from the live page.
test.describe("Brunella chat system prompt", () => {
  test("introduces the company as building websites too, and carries the website package facts", () => {
    const firstLine = SYSTEM_PROMPT.split("\n")[0];
    expect(firstLine).toMatch(/AI automation/);
    expect(firstLine).toMatch(/websites/);
    for (const fact of [
      "150 000 Ft + VAT", "HUF 150,000 + VAT", "one-off", "two weeks", "fixed price", "Hungarian + English",
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

  test("drift guard: the base price in the prompt is the site's single BASE_PRICE (price card and FAQ use it)", () => {
    const plain = (x: string) => x.replace(/\u00a0/g, " ");
    expect(SYSTEM_PROMPT).toContain(`${plain(BASE_PRICE.hu)} + VAT`);
    // Péter 12800 (2026-11-03): the base price is net + VAT; the old gross wording must not come back
    expect(SYSTEM_PROMPT).not.toMatch(/150 000 Ft gross|incl\. VAT/);
    expect(SYSTEM_PROMPT).toContain(plain(BASE_PRICE.en));
    // the price card and the FAQ read the same constant, so none of them can drift on its own
    const card = readFileSync(join(__dirname, "..", "app", "components", "Arcsomag.tsx"), "utf-8");
    const faq = readFileSync(join(__dirname, "..", "app", "weboldal-ai-kkv", "components", "faqCopy.ts"), "utf-8");
    for (const lang of ["hu", "en", "de"]) {
      expect(card).toContain(`price: BASE_PRICE.${lang},`);
      expect(faq).toContain("${BASE_PRICE." + lang + "}");
    }
    expect(card).toContain("hetenyirenata.com");
  });

  // Péter 13925 (2026-11-07): asked about the online presence package, the chat only knew the base package.
  test.describe("online presence starter package", () => {
    const page = readFileSync(join(__dirname, "..", "app", "online-jelenlet", "page.tsx"), "utf-8");

    test("carries the facts of the live page", () => {
      for (const fact of [
        "Online jelenlét induló csomag", "30 000 Ft + VAT", "HUF 30,000 + VAT", "no monthly fee", "price calculator",
        "5 working days", "client's OWN account", "Google may require verification", "not part of the 5 working days",
        "10-20 photos", "https://www.pohankaestarsa.com/online-jelenlet",
      ]) expect(SYSTEM_PROMPT, fact).toContain(fact);
      expect(SYSTEM_PROMPT).toMatch(/Website 150 000 Ft \+ VAT, one-off fee/);
    });

    test("drift guard: the setup price and the 5 working days are the ones on the page", () => {
      expect(page).toContain("const SETUP_PRICE = `30${NBSP}000${NBSP}Ft`;");
      expect(page).toContain("{BASE_PRICE.hu} + áfa");
      expect(page).toContain("5 munkanapon belül");
      expect(page).toContain("Havi díj nincs");
    });

    test("no gross price, no VAT rate, no review numbers, no invented language version of the page", () => {
      expect(SYSTEM_PROMPT).toMatch(/never a gross total or a VAT rate, VAT is added on top of both/);
      expect(SYSTEM_PROMPT).not.toMatch(/27\s?%|38 100|190 500|228 600|bruttó|\b5,0\b|10 (reviews|vélemény)/i);
      expect(SYSTEM_PROMPT).not.toMatch(/pohankaestarsa\.com\/(en|de)\/online-jelenlet/);
      expect(SYSTEM_PROMPT).toMatch(/Never write an \/en or \/de version of\s+this link/);
    });

    test("is only offered when asked about, and stays apart from the Weboldal + AI package", () => {
      expect(SYSTEM_PROMPT).toMatch(/Do not offer it in an answer about anything else, including AI automation and\s+the price of a website/);
      expect(SYSTEM_PROMPT).toMatch(/the two weeks, the free design preview and the optional modules belong to the\s+Weboldal \+ AI package/);
    });

    test("the site-language line at the end of the prompt does not forbid this package's link", () => {
      for (const lang of ["hu", "en", "de"] as const) {
        const full = systemPromptFor(lang);
        expect(full).toContain("https://www.pohankaestarsa.com/online-jelenlet");
        expect(full).toMatch(/When you give the Weboldal \+ AI page link, use exactly this one and no other:/);
        expect(full).not.toMatch(/When you give the page link/);
      }
    });
  });
});
