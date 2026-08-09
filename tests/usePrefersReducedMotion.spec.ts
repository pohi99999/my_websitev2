import 'global-jsdom/register';
import { test, expect } from '@playwright/test';
import { renderHook, act } from '@testing-library/react';
import { usePrefersReducedMotion } from '../app/hooks/usePrefersReducedMotion';
import sinon from 'sinon';

test.describe('usePrefersReducedMotion', () => {
  let matchMediaStub: sinon.SinonStub;

  test.beforeEach(() => {
    // Basic stub for matchMedia before each test
    matchMediaStub = sinon.stub();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaStub,
    });
  });

  test.afterEach(() => {
    sinon.restore();
  });

  test('returns false when media query does not match', () => {
    const addEventListenerStub = sinon.stub();
    const removeEventListenerStub = sinon.stub();
    matchMediaStub.returns({
      matches: false,
      addEventListener: addEventListenerStub,
      removeEventListener: removeEventListenerStub,
    });

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
    expect(matchMediaStub.calledWith('(prefers-reduced-motion: reduce)')).toBeTruthy();
    expect(addEventListenerStub.calledOnce).toBeTruthy();
  });

  test('returns true when media query matches', () => {
    const addEventListenerStub = sinon.stub();
    const removeEventListenerStub = sinon.stub();
    matchMediaStub.returns({
      matches: true,
      addEventListener: addEventListenerStub,
      removeEventListener: removeEventListenerStub,
    });

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
    expect(addEventListenerStub.calledOnce).toBeTruthy();
  });

  test('updates value when media query changes', () => {
    let changeListener: any;
    const addEventListenerStub = sinon.stub().callsFake((event, listener) => {
      if (event === 'change') {
        changeListener = listener;
      }
    });
    const removeEventListenerStub = sinon.stub();

    const mediaMock = {
      matches: false,
      addEventListener: addEventListenerStub,
      removeEventListener: removeEventListenerStub,
    };
    matchMediaStub.returns(mediaMock);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);

    // Simulate media query change
    act(() => {
      mediaMock.matches = true;
      changeListener();
    });

    expect(result.current).toBe(true);
  });

  test('cleans up event listener on unmount (using addEventListener)', () => {
    let changeListener: any;
    const addEventListenerStub = sinon.stub().callsFake((event, listener) => {
      if (event === 'change') {
        changeListener = listener;
      }
    });
    const removeEventListenerStub = sinon.stub();

    matchMediaStub.returns({
      matches: false,
      addEventListener: addEventListenerStub,
      removeEventListener: removeEventListenerStub,
    });

    const { unmount } = renderHook(() => usePrefersReducedMotion());

    unmount();

    expect(removeEventListenerStub.calledOnce).toBeTruthy();
    expect(removeEventListenerStub.calledWith('change', changeListener)).toBeTruthy();
  });

  test('uses addListener fallback if addEventListener is not available', () => {
    let changeListener: any;
    const addListenerStub = sinon.stub().callsFake((listener) => {
      changeListener = listener;
    });
    const removeListenerStub = sinon.stub();

    const mediaMock: any = {
      matches: false,
      addListener: addListenerStub,
      removeListener: removeListenerStub,
    };
    matchMediaStub.returns(mediaMock);

    const { result, unmount } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
    expect(addListenerStub.calledOnce).toBeTruthy();

    act(() => {
      mediaMock.matches = true;
      changeListener();
    });

    expect(result.current).toBe(true);

    unmount();

    expect(removeListenerStub.calledOnce).toBeTruthy();
    expect(removeListenerStub.calledWith(changeListener)).toBeTruthy();
  });
});
