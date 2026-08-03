import { test, expect } from '@playwright/test';
import { render } from '@testing-library/react';
import GoogleAnalytics from '../app/components/GoogleAnalytics';
import React from 'react';

// Playwright tests typically run against a built Next.js app in the browser,
// but since we want to test the component behavior directly (XSS validation),
// we might need to test it differently, or just verify the validation logic works.
// Actually, `@playwright/test` can run tests in Node or Browser.
// We can test the function directly.

test.describe('GoogleAnalytics Component Validation', () => {
  let consoleErrorStub: any;

  test.beforeEach(() => {
    // Stub console.error to avoid noise in test output and to assert on it
    consoleErrorStub = null;
  });

  test.afterEach(() => {
    // Restore console.error if needed
  });

  test('returns null and logs error for invalid GA_MEASUREMENT_ID (XSS attack)', async () => {
    const maliciousId = "G-12345'; alert('XSS'); //";

    // We can't render it in playwright node test if it uses 'use client' and next/script easily.
    // Let's call the function directly.
    // However, it returns React elements which might require React to be in scope.

    let errorLogged = false;
    const originalConsoleError = console.error;
    console.error = (msg: string) => {
      if (msg === 'Invalid Google Analytics Measurement ID format.') {
        errorLogged = true;
      }
    };

    const result = GoogleAnalytics({ GA_MEASUREMENT_ID: maliciousId });

    console.error = originalConsoleError;

    expect(result).toBeNull();
    expect(errorLogged).toBe(true);
  });

  test('returns a React fragment for valid GA_MEASUREMENT_ID', async () => {
    const validId = "G-BZQL39E3RD";

    let errorLogged = false;
    const originalConsoleError = console.error;
    console.error = (msg: string) => {
      if (msg === 'Invalid Google Analytics Measurement ID format.') {
        errorLogged = true;
      }
    };

    const result = GoogleAnalytics({ GA_MEASUREMENT_ID: validId });

    console.error = originalConsoleError;

    expect(result).not.toBeNull();
    expect(errorLogged).toBe(false);
  });
});
