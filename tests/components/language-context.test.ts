import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost'
});
(global as any).window = dom.window;
(global as any).document = dom.window.document;
Object.defineProperty(global, 'navigator', {
  value: { language: 'en-US' },
  writable: true,
  configurable: true
});

import React from 'react';
import { render, act, cleanup } from '@testing-library/react';
import * as assert from 'assert';
import { LanguageProvider, useLanguage } from '../../app/context/LanguageContext';

function setup(navLang = 'en-US', initialStorage: Record<string, string> = {}) {
  cleanup(); // Clean up previous renders
  (global as any).navigator.language = navLang;

  const localStorageMock = (() => {
    let store: Record<string, string> = { ...initialStorage };
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      }
    };
  })();
  Object.defineProperty(dom.window, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true
  });
}

function TestComponent() {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  return React.createElement('div', null,
    React.createElement('span', { 'data-testid': 'lang' }, language),
    React.createElement('button', { 'data-testid': 'toggle', onClick: toggleLanguage }, 'Toggle'),
    React.createElement('button', { 'data-testid': 'set-de', onClick: () => setLanguage('de') }, 'Set DE'),
    React.createElement('span', { 'data-testid': 'trans-notfound' }, t('does.not.exist'))
  );
}

function renderApp(initialLanguage?: string) {
  const props = initialLanguage !== undefined ? { initialLanguage, children: React.createElement(TestComponent) } : { children: React.createElement(TestComponent) };
  return render(React.createElement(LanguageProvider, props), { container: document.body });
}

async function runTests() {
  console.log('Running tests...');

  // Test 1
  setup('fr');
  let utils = renderApp();
  assert.strictEqual(utils.getByTestId('lang').textContent, 'hu', 'Test 1 failed');

  // Test 2
  setup('en-US', { 'site-language': 'en' });
  utils = renderApp('de');
  assert.strictEqual(utils.getByTestId('lang').textContent, 'de', 'Test 2 failed');

  // Test 3
  setup('en-US', { 'site-language': 'en' });
  utils = renderApp('unsupported');
  assert.strictEqual(utils.getByTestId('lang').textContent, 'en', 'Test 3 failed');

  // Test 4
  setup('de-DE');
  utils = renderApp('unsupported');
  assert.strictEqual(utils.getByTestId('lang').textContent, 'de', 'Test 4 failed');

  // Test 5
  setup('hu');
  utils = renderApp('hu');
  assert.strictEqual(utils.getByTestId('lang').textContent, 'hu', 'Test 5 initial failed');

  act(() => { utils.getByTestId('toggle').click(); });
  assert.strictEqual(utils.getByTestId('lang').textContent, 'en', 'Test 5 toggle 1 failed');

  act(() => { utils.getByTestId('toggle').click(); });
  assert.strictEqual(utils.getByTestId('lang').textContent, 'de', 'Test 5 toggle 2 failed');

  act(() => { utils.getByTestId('toggle').click(); });
  assert.strictEqual(utils.getByTestId('lang').textContent, 'hu', 'Test 5 toggle 3 failed');

  // Test 6
  setup();
  utils = renderApp();
  assert.strictEqual(utils.getByTestId('trans-notfound').textContent, 'does.not.exist', 'Test 6 failed');

  // Test 7
  setup();
  utils = renderApp('hu');
  act(() => { utils.getByTestId('set-de').click(); });
  assert.strictEqual(utils.getByTestId('lang').textContent, 'de', 'Test 7 UI failed');
  assert.strictEqual((global as any).window.localStorage.getItem('site-language'), 'de', 'Test 7 storage failed');

  console.log('All unit tests passed successfully!');
}

runTests().catch(e => { console.error(e); process.exit(1); });
