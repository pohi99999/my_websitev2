import { test, expect } from "@playwright/test";
import { toClaudeMessages, readClaudeText, isBusy } from "../app/api/chat/claude";

test.describe("claude helpers (card 63a125ae)", () => {
  test("leading assistant turns are dropped, same-role turns merged, the rest alternates", () => {
    expect(
      toClaudeMessages([
        { role: "assistant", content: "welcome" },
        { role: "user", content: "a" },
        { role: "user", content: "b" },
        { role: "assistant", content: "c" },
      ]),
    ).toEqual([
      { role: "user", content: "a\n\nb" },
      { role: "assistant", content: "c" },
    ]);
  });

  test("readClaudeText keeps only text blocks, and returns null for anything that is not a full reply", () => {
    expect(readClaudeText({ content: [{ type: "thinking", thinking: "plan" }, { type: "text", text: "Szia, " }, { type: "text", text: "működöm." }], stop_reason: "end_turn" })).toBe("Szia, működöm.");
    // a non-text block that happens to carry a text field must not leak into the reply
    expect(readClaudeText({ content: [{ type: "server_tool_use", text: "NOPE" }, { type: "text", text: "igen" }] })).toBe("igen");
    expect(readClaudeText({ content: [{ type: "text", text: "félbe" }], stop_reason: "max_tokens" })).toBeNull();
    expect(readClaudeText({ choices: [{ message: { content: "x" } }] })).toBeNull();
    expect(readClaudeText({ content: [{ type: "text", text: "   " }] })).toBeNull();
    expect(readClaudeText(null)).toBeNull();
    expect(readClaudeText("OK")).toBeNull();
  });

  test("isBusy: 429, 529, 503 and the credit-balance 400; other errors are not busy", () => {
    expect([429, 529, 503].map((s) => isBusy(s, ""))).toEqual([true, true, true]);
    expect(isBusy(400, "Your credit balance is too low to access the Anthropic API.")).toBe(true);
    expect(isBusy(400, "temperature: unsupported")).toBe(false);
    expect(isBusy(500, "")).toBe(false);
  });
});
