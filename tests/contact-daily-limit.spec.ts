import { test, expect } from '@playwright/test';
import { POST, rateMemory, checkBurstLimit, checkDailyLimit } from '../app/api/contact/route';

// 2026-11-05, Peter 13607: 50 messages a day in all; a visitor still gets 2 in 2 minutes. No mail goes out here: with no
// SMTP settings the route answers 500 after the limits, and that 500 is what "not limited" looks like in this test.
// The store's path is in contact-redis-store.spec.ts.

const SMTP = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
const NO_STORE = { burst: null, daily: null };
const send = (ip: string) => POST(new Request('http://localhost/api/contact', {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
  body: JSON.stringify({ name: 'Teszt', email: 'teszt@example.com', message: 'Teszt' }),
}));

test.describe('the contact limits', () => {
  test.beforeEach(() => {
    for (const key of SMTP) delete process.env[key];
    rateMemory.clear();
  });

  test('the day: the 50th message passes the limit, the 51st does not', async () => {
    for (let i = 1; i <= 50; i++) {
      const res = await send(`10.0.${Math.floor(i / 200)}.${i}`);
      expect(res.status, `message ${i}`).toBe(500);
    }
    const over = await send('10.1.0.1');
    expect(over.status).toBe(429);
    expect((await over.json()).error).toContain('Daily message limit');
  });

  test('a visitor: the third message within the window is refused, another visitor still passes', async () => {
    expect((await send('10.2.0.1')).status).toBe(500);
    expect((await send('10.2.0.1')).status).toBe(500);
    const third = await send('10.2.0.1');
    expect(third.status).toBe(429);
    expect((await third.json()).error).toContain('Too many requests');
    expect((await send('10.2.0.2')).status).toBe(500);
  });

  test('in memory the wait counts from the first message: about 120 s, not the store window\'s boundary', async () => {
    await checkBurstLimit('10.3.0.1', NO_STORE);
    await checkBurstLimit('10.3.0.1', NO_STORE);
    const refused = await checkBurstLimit('10.3.0.1', NO_STORE);
    expect(refused.ok).toBe(false);
    if (refused.ok === false) expect(refused.retryAfterSec).toBeGreaterThan(115);
    expect((await checkDailyLimit(NO_STORE)).ok).toBe(true);
  });
});
