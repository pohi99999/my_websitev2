import { test, expect } from '@playwright/test';
import { checkRateLimitFixed, rateMemory } from '../app/api/contact/route';

test.describe('Contact API - checkRateLimitFixed', () => {
  const windowMs = 60 * 1000; // 1 minute
  const max = 2;

  test.beforeEach(() => {
    rateMemory.clear();
  });

  test('allows requests under the limit', () => {
    const key = 'test-key';

    // First request
    const result1 = checkRateLimitFixed(key, windowMs, max);
    expect(result1.ok).toBe(true);

    // Second request
    const result2 = checkRateLimitFixed(key, windowMs, max);
    expect(result2.ok).toBe(true);
  });

  test('blocks requests over the limit and returns retryAfterSec', () => {
    const key = 'test-key-limit';

    // First request
    checkRateLimitFixed(key, windowMs, max);

    // Second request
    checkRateLimitFixed(key, windowMs, max);

    // Third request (should be blocked)
    const result3 = checkRateLimitFixed(key, windowMs, max);
    expect(result3.ok).toBe(false);

    if (result3.ok === false) {
      expect(result3.retryAfterSec).toBeGreaterThan(0);
      expect(result3.retryAfterSec).toBeLessThanOrEqual(60);
    }
  });

  test('resets after the time window', () => {
    const key = 'test-key-reset';

    // Mock Date.now
    const originalDateNow = Date.now;
    let mockedTime = 1000000;
    Date.now = () => mockedTime;

    try {
      // Exhaust the limit
      checkRateLimitFixed(key, windowMs, max);
      checkRateLimitFixed(key, windowMs, max);

      const blockedResult = checkRateLimitFixed(key, windowMs, max);
      expect(blockedResult.ok).toBe(false);

      // Advance time beyond the window
      mockedTime += windowMs + 1;

      // Should be allowed again
      const allowedResult = checkRateLimitFixed(key, windowMs, max);
      expect(allowedResult.ok).toBe(true);
    } finally {
      Date.now = originalDateNow;
    }
  });

  test('tracks different keys separately', () => {
    const key1 = 'key1';
    const key2 = 'key2';

    // Exhaust key1
    checkRateLimitFixed(key1, windowMs, max);
    checkRateLimitFixed(key1, windowMs, max);
    expect(checkRateLimitFixed(key1, windowMs, max).ok).toBe(false);

    // key2 should still be allowed
    const result2 = checkRateLimitFixed(key2, windowMs, max);
    expect(result2.ok).toBe(true);
  });
});
