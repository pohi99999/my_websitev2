import { test, expect } from '@playwright/test';
import { POST, rateMemory } from '../app/api/contact/route';

// 2026-11-05, Peter's rule through Marveen 6341: behind Cloudflare the per-visitor limit counts cf-connecting-ip, and
// without that header the old chain stays. No mail goes out: with no SMTP settings the route answers 500 after the
// limits, and that 500 is what "not limited" looks like here.

const SMTP = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
const send = (headers: Record<string, string>) => POST(new Request('http://localhost/api/contact', {
  method: 'POST',
  headers: { 'content-type': 'application/json', ...headers },
  body: JSON.stringify({ name: 'Teszt', email: 'teszt@example.com', message: 'Teszt' }),
}));

test.describe('whom the per-visitor limit counts', () => {
  test.beforeEach(() => {
    for (const key of SMTP) delete process.env[key];
    rateMemory.clear();
  });

  test('one visitor through two Cloudflare exits is one count', async () => {
    expect((await send({ 'cf-connecting-ip': '203.0.113.1', 'x-real-ip': '172.64.0.1' })).status).toBe(500);
    expect((await send({ 'cf-connecting-ip': '203.0.113.1', 'x-real-ip': '172.64.0.2' })).status).toBe(500);
    expect((await send({ 'cf-connecting-ip': '203.0.113.1', 'x-real-ip': '172.64.0.3' })).status).toBe(429);
  });

  test('two visitors through one Cloudflare exit are two counts', async () => {
    expect((await send({ 'cf-connecting-ip': '203.0.113.1', 'x-real-ip': '172.64.0.1' })).status).toBe(500);
    expect((await send({ 'cf-connecting-ip': '203.0.113.1', 'x-real-ip': '172.64.0.1' })).status).toBe(500);
    expect((await send({ 'cf-connecting-ip': '203.0.113.2', 'x-real-ip': '172.64.0.1' })).status).toBe(500);
  });

  test('no header, or an empty one: x-real-ip counts, as before', async () => {
    expect((await send({ 'x-real-ip': '198.51.100.1' })).status).toBe(500);
    expect((await send({ 'cf-connecting-ip': '  ', 'x-real-ip': '198.51.100.1' })).status).toBe(500);
    expect((await send({ 'x-real-ip': '198.51.100.1' })).status).toBe(429);
    expect((await send({ 'x-real-ip': '198.51.100.2' })).status).toBe(500);
  });

  test('neither header: the last x-forwarded-for address counts, as before', async () => {
    expect((await send({ 'x-forwarded-for': '198.51.100.9, 198.51.100.3' })).status).toBe(500);
    expect((await send({ 'x-forwarded-for': '198.51.100.8, 198.51.100.3' })).status).toBe(500);
    expect((await send({ 'x-forwarded-for': '198.51.100.7, 198.51.100.3' })).status).toBe(429);
  });

  test('a forged header steps around the visitor limit, but the daily limit still stops at 50', async () => {
    for (let i = 1; i <= 50; i++) {
      expect((await send({ 'cf-connecting-ip': `203.0.113.${i}` })).status, `message ${i}`).toBe(500);
    }
    const over = await send({ 'cf-connecting-ip': '203.0.113.51' });
    expect(over.status).toBe(429);
    expect((await over.json()).error).toContain('Daily message limit');
  });
});
