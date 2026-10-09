import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Card 780eb834 (Marveen 3248): the route can only pick the page link for the visitor's site language
// if the widget sends it. Without this field every visitor counts as Hungarian.
test("the chat widget sends the site language with every request", () => {
  const src = readFileSync(join(__dirname, "..", "app", "components", "BrunellaChat.tsx"), "utf-8");
  expect(src).toContain("body: JSON.stringify({ messages: newMessages, lang })");
  expect(src).toMatch(/const lang: Lang = language === 'en' \|\| language === 'de' \? language : 'hu';/);
});
