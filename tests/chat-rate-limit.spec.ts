import { test, expect } from '@playwright/test';
import { checkRateLimit, rateMemory, RATE_MAX } from '../app/api/chat/rate-limiter';

test.describe('chat rate limiter', () => {
  test.beforeEach(() => {
    rateMemory.clear();
  });

  test('allows requests under the limit', () => {
    const ip = '127.0.0.1';
    for (let i = 0; i < RATE_MAX; i++) {
      expect(checkRateLimit(ip)).toBe(true);
    }
  });

  test('blocks requests over the limit', () => {
    const ip = '192.168.1.1';
    for (let i = 0; i < RATE_MAX; i++) {
      expect(checkRateLimit(ip)).toBe(true);
    }
    // The next one should be blocked
    expect(checkRateLimit(ip)).toBe(false);
  });

  test('resets after the time window', () => {
    const ip = '10.0.0.1';
    // Mock Date.now
    const originalDateNow = Date.now;
    let mockedTime = 1000000;
    Date.now = () => mockedTime;

    try {
      // Exhaust the limit
      for (let i = 0; i < RATE_MAX; i++) {
        expect(checkRateLimit(ip)).toBe(true);
      }
      expect(checkRateLimit(ip)).toBe(false);

      // Advance time by 60 seconds + 1 ms
      mockedTime += 60 * 1000 + 1;

      // Should be allowed again
      expect(checkRateLimit(ip)).toBe(true);
    } finally {
      Date.now = originalDateNow;
    }
  });

  test('tracks IPs separately', () => {
    const ip1 = '1.1.1.1';
    const ip2 = '2.2.2.2';

    // Exhaust IP1
    for (let i = 0; i < RATE_MAX; i++) {
      checkRateLimit(ip1);
    }
    expect(checkRateLimit(ip1)).toBe(false);

    // IP2 should still be allowed
    expect(checkRateLimit(ip2)).toBe(true);
  });
});
