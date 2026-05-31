import { test, expect } from '@playwright/test';

test('environment variable NEXT_PUBLIC_N8N_WEBHOOK_URL should be defined', async () => {
  expect(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL).toBeDefined();
  expect(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL).not.toBe('');
});
