'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type CountUpNumberProps = {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export default function CountUpNumber({
  value,
  duration = 1200,
  className = '',
  prefix = '',
  suffix = '',
  locale = 'hu-HU',
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
}: CountUpNumberProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);
  const displayValueRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      displayValueRef.current = value;
      previousValueRef.current = value;
      return;
    }

    const startValue = displayValueRef.current;
    const delta = value - startValue;

    if (delta === 0) {
      setDisplayValue(value);
      displayValueRef.current = value;
      previousValueRef.current = value;
      return;
    }

    let animationFrame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = startValue + delta * easedProgress;

      displayValueRef.current = nextValue;
      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      displayValueRef.current = value;
      setDisplayValue(value);
      previousValueRef.current = value;
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, prefersReducedMotion, value]);

  const formattedValue = useMemo(() => {
    const roundedValue = Number(displayValue.toFixed(maximumFractionDigits));

    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(roundedValue);
  }, [displayValue, locale, maximumFractionDigits, minimumFractionDigits]);

  return (
    <span className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
