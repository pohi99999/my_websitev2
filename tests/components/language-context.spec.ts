import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';

test.describe('LanguageContext Unit Tests', () => {
  test('Runs standard React unit tests via node', () => {
    try {
      const runnerPath = path.resolve(__dirname, 'test-runner.js');
      const output = execSync(`node ${runnerPath}`).toString();
      expect(output).toContain('All unit tests passed successfully!');
    } catch (err: any) {
      console.error(err.stdout ? err.stdout.toString() : err);
      console.error(err.stderr ? err.stderr.toString() : err);
      throw err;
    }
  });
});
