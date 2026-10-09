import { test, expect } from "@playwright/test";
import { toGeminiContents, readGeminiText } from "../app/api/chat/gemini";

test.describe("gemini helpers (card 780eb834)", () => {
  test("leading assistant turns are dropped, same-role turns merged, the rest alternates", () => {
    expect(
      toGeminiContents([
        { role: "assistant", content: "welcome" },
        { role: "user", content: "a" },
        { role: "user", content: "b" },
        { role: "assistant", content: "c" },
      ]),
    ).toEqual([
      { role: "user", parts: [{ text: "a\n\nb" }] },
      { role: "model", parts: [{ text: "c" }] },
    ]);
  });

  test("readGeminiText joins the parts and returns null for anything that is not a reply", () => {
    expect(readGeminiText({ candidates: [{ content: { parts: [{ text: "Szia, " }, { text: "működöm." }] } }] })).toBe("Szia, működöm.");
    expect(readGeminiText({ choices: [{ message: { content: "x" } }] })).toBeNull();
    expect(readGeminiText({ candidates: [{ content: { parts: [{ text: "   " }] } }] })).toBeNull();
    expect(readGeminiText(null)).toBeNull();
    expect(readGeminiText("OK")).toBeNull();
  });
});
