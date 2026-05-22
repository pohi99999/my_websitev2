import { renderHook } from '@testing-library/react';
import { useRichMediaEnabled } from '../../app/hooks/useRichMediaEnabled';
import { usePrefersReducedMotion } from '../../app/hooks/usePrefersReducedMotion';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('../../app/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: vi.fn(),
}));

describe('useRichMediaEnabled hook', () => {
  const originalNavigator = global.navigator;

  beforeEach(() => {
    // Clear mock between tests
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('should return true when prefersReducedMotion is false and saveData is false', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false);

    Object.defineProperty(global, 'navigator', {
      value: {
        connection: { saveData: false }
      },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useRichMediaEnabled());
    expect(result.current).toBe(true);
  });

  it('should return false when prefersReducedMotion is true', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(true);

    Object.defineProperty(global, 'navigator', {
      value: {
        connection: { saveData: false }
      },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useRichMediaEnabled());
    expect(result.current).toBe(false);
  });

  it('should return false when saveData is true', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false);

    Object.defineProperty(global, 'navigator', {
      value: {
        connection: { saveData: true }
      },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useRichMediaEnabled());
    expect(result.current).toBe(false);
  });

  it('should return false when both prefersReducedMotion and saveData are true', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(true);

    Object.defineProperty(global, 'navigator', {
      value: {
        connection: { saveData: true }
      },
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useRichMediaEnabled());
    expect(result.current).toBe(false);
  });

  it('should fallback to saveData=false if connection object is missing', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false);

    Object.defineProperty(global, 'navigator', {
      value: {},
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useRichMediaEnabled());
    expect(result.current).toBe(true); // !prefersReducedMotion && !saveDataEnabled => !false && !false => true
  });

  it('should not throw and fallback gracefully if navigator object is completely undefined', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false);

    Object.defineProperty(global, 'navigator', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useRichMediaEnabled());
    expect(result.current).toBe(true);
  });
});
