import { test, expect } from "@playwright/test";
import { FAQ_COPY } from "../app/weboldal-ai-kkv/components/faqCopy";
import { BASE_PRICE } from "../app/lib/basePrice";

// Card 780eb834 (Marveen 3252): the /weboldal-ai-kkv FAQ in hu/en/de. Until 2026-10-09 /en and /de
// showed the Hungarian FAQ (measured live).
test.describe("FAQ copy", () => {
  test("every language has the heading and the same four questions, the price answer reads BASE_PRICE", () => {
    expect(FAQ_COPY.hu.heading).toBe("Gyakori kérdések");
    expect(FAQ_COPY.en.heading).toBe("Frequently asked questions");
    expect(FAQ_COPY.de.heading).toBe("Häufige Fragen");
    for (const lang of ["hu", "en", "de"] as const) {
      expect(FAQ_COPY[lang].items).toHaveLength(4);
      expect(FAQ_COPY[lang].items[3].a).toContain(BASE_PRICE[lang]);
    }
  });

  test("the Hungarian price answer is the owner's text (Telegram 6926)", () => {
    expect(FAQ_COPY.hu.items[3].a.replace(/ /g, " ")).toBe(
      "Az alapcsomag ára fix 150 000 Ft bruttó, egyszeri díj. Az online időpontfoglalásra és bankkártyás előlegre, illetve a nagyobb, egyedi rendszerekre ingyenes konzultáció után tételes, fix áras ajánlatot adunk, rejtett költségek nélkül.",
    );
  });

  test("the English and German FAQ carry no Hungarian text, and the German one is formal (Sie)", () => {
    for (const lang of ["en", "de"] as const) {
      const all = [FAQ_COPY[lang].heading, ...FAQ_COPY[lang].items.flatMap((i) => [i.q, i.a])].join(" ");
      expect(all, lang).not.toMatch(/[őűŐŰ]|\b(Az|és|Önnek|ajánlat)\b/);
    }
    const de = FAQ_COPY.de.items.map((i) => i.a).join(" ");
    expect(de).toMatch(/\bSie\b|\bIhnen\b/);
    expect(de).not.toMatch(/\b(du|dich|dir|dein)\b/i);
  });
});
