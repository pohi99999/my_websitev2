import { test, expect } from '@playwright/test';
import { getBlogPostMeta } from '../app/blog/blogPosts.meta';

test.describe('getBlogPostMeta', () => {
  test('returns undefined for unknown slug', () => {
    const result = getBlogPostMeta('unknown-slug');
    expect(result).toBeUndefined();
  });

  test('resolves blog post meta with default language (hu) when not specified', () => {
    const result = getBlogPostMeta('automatizalt-bongeszo-agensek');

    expect(result).toBeDefined();
    expect(result?.slug).toBe('automatizalt-bongeszo-agensek');
    expect(result?.title).toBe('Automatizált Böngésző Ágensek: A Digitális Munkatársad a Hétköznapokban');
    expect(result?.date).toBe('2026. Június 8.');
    expect(result?.author).toBe('Pohánka József Péter');
    expect(result?.readTime).toBe('6 perc');
    expect(result?.category).toBe('Automatizáció');
  });

  test('resolves blog post meta with English (en) language', () => {
    const result = getBlogPostMeta('automatizalt-bongeszo-agensek', 'en');

    expect(result).toBeDefined();
    expect(result?.title).toBe('Automated Browser Agents: Your Digital Worker in Everyday Life');
    expect(result?.date).toBe('June 8, 2026');
    expect(result?.author).toBe('József Péter Pohánka');
    expect(result?.readTime).toBe('6 min');
    expect(result?.category).toBe('Automation');
  });

  test('resolves blog post meta with German (de) language', () => {
    const result = getBlogPostMeta('automatizalt-bongeszo-agensek', 'de');

    expect(result).toBeDefined();
    expect(result?.title).toBe('Automatisierte Browser-Agenten: Ihr digitaler Mitarbeiter im Alltag');
    expect(result?.date).toBe('8. Juni 2026');
    expect(result?.author).toBe('József Péter Pohánka');
    expect(result?.readTime).toBe('6 Min.');
    expect(result?.category).toBe('Automatisierung');
  });
});
