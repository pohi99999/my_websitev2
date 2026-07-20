import { test, expect } from '@playwright/test';
import { renderMarkdownToHtml } from '../lib/markdown';

test.describe('renderMarkdownToHtml', () => {
  test('renders basic markdown to html', async () => {
    const html = await renderMarkdownToHtml('# Hello World');
    expect(html.trim()).toBe('<h1>Hello World</h1>');
  });

  test('renders GFM features like strikethrough', async () => {
    const html = await renderMarkdownToHtml('~strikethrough~');
    expect(html.trim()).toBe('<p><del>strikethrough</del></p>');
  });

  test('renders links with target="_blank" and rel="noopener noreferrer"', async () => {
    const html = await renderMarkdownToHtml('[Example](https://example.com)');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  test('sanitizes malicious HTML', async () => {
    const html = await renderMarkdownToHtml('Hello <script>alert(1)</script>World');
    expect(html).not.toContain('<script>');
  });

  test('handles empty strings', async () => {
    const html = await renderMarkdownToHtml('');
    expect(html.trim()).toBe('');
  });
});
