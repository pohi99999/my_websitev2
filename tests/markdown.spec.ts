import { test, expect } from '@playwright/test';
import { renderMarkdownToHtml } from '../lib/markdown';

test.describe('renderMarkdownToHtml', () => {
  test('renders basic markdown headings and paragraphs', async () => {
    const input = '# Heading 1\n\nThis is a paragraph.';
    const html = await renderMarkdownToHtml(input);
    expect(html).toContain('<h1>Heading 1</h1>');
    expect(html).toContain('<p>This is a paragraph.</p>');
  });

  test('adds target="_blank" and rel attributes to external links', async () => {
    const input = '[Google](https://google.com)';
    const html = await renderMarkdownToHtml(input);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel=');
  });

  test('sanitizes unsafe script tags', async () => {
    const input = '<script>alert("xss")</script>Hello';
    const html = await renderMarkdownToHtml(input);
    expect(html).not.toContain('<script>');
  });
});
