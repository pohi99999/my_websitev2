import { test, expect } from '@playwright/test';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import { renderHook, act } from '@testing-library/react';
import { useLoopingTypewriter, useTypewriterOnce } from '../app/hooks/useTypewriter';

test.describe('useTypewriter hooks unit tests', () => {
  let clock: sinon.SinonFakeTimers;
  let dom: JSDOM;

  test.beforeEach(() => {
    // Setup JSDOM
    dom = new JSDOM('<!doctype html><html><body></body></html>', {
      url: 'http://localhost'
    });

    // Assign properties manually without using getter overrides when possible
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;

    if (!(global as any).navigator) {
      (global as any).navigator = { userAgent: 'node.js' };
    } else {
      Object.defineProperty(global, 'navigator', {
        value: { userAgent: 'node.js' },
        configurable: true
      });
    }

    // Use shouldClearNativeTimers: true to suppress the sinon warnings in Node environments
    clock = sinon.useFakeTimers({
      toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'],
      shouldClearNativeTimers: true
    });
  });

  test.afterEach(() => {
    if (clock) clock.restore();
    delete (global as any).window;
    delete (global as any).document;
  });

  test('useLoopingTypewriter types text completely, pauses, and restarts', () => {
    const text = 'Hello';
    const speedMs = 10;
    const pauseMs = 100;

    const { result } = renderHook(() =>
      useLoopingTypewriter({ text, speedMs, pauseMs, enabled: true })
    );

    act(() => { clock.tick(250); });
    expect(result.current).toBe('H');

    act(() => { clock.tick(speedMs); });
    expect(result.current).toBe('He');

    act(() => { clock.tick(speedMs); });
    expect(result.current).toBe('Hel');

    act(() => { clock.tick(speedMs); });
    expect(result.current).toBe('Hell');

    act(() => { clock.tick(speedMs); });
    expect(result.current).toBe('Hello');

    act(() => { clock.tick(pauseMs); });
    expect(result.current).toBe('');

    act(() => { clock.tick(250); });
    expect(result.current).toBe('H');
  });

  test('useLoopingTypewriter handles disabled state', () => {
    const { result, rerender } = renderHook(
      (props) => useLoopingTypewriter(props),
      { initialProps: { text: 'Hello', speedMs: 10, pauseMs: 100, enabled: true } }
    );

    act(() => { clock.tick(250); });
    expect(result.current).toBe('H');

    rerender({ text: 'Hello', speedMs: 10, pauseMs: 100, enabled: false });
    expect(result.current).toBe('');

    act(() => { clock.tick(1000); });
    expect(result.current).toBe('');
  });

  test('useTypewriterOnce types text once and stops', () => {
    const text = 'Done';
    const speedMs = 10;

    const { result } = renderHook(() =>
      useTypewriterOnce({ text, speedMs, enabled: true })
    );

    act(() => { clock.tick(150); });
    expect(result.current).toBe('D');

    act(() => { clock.tick(speedMs); });
    expect(result.current).toBe('Do');

    act(() => { clock.tick(speedMs); });
    expect(result.current).toBe('Don');

    act(() => { clock.tick(speedMs); });
    expect(result.current).toBe('Done');

    act(() => { clock.tick(1000); });
    expect(result.current).toBe('Done');
  });

  test('useTypewriterOnce clears when disabled', () => {
    const { result, rerender } = renderHook(
      (props) => useTypewriterOnce(props),
      { initialProps: { text: 'Done', speedMs: 10, enabled: true } }
    );

    act(() => { clock.tick(150 + 20); });
    expect(result.current).toBe('Don');

    rerender({ text: 'Done', speedMs: 10, enabled: false });
    expect(result.current).toBe('');

    act(() => { clock.tick(1000); });
    expect(result.current).toBe('');
  });
});
