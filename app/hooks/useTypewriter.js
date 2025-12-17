import { useEffect, useRef, useState } from 'react';

export function useLoopingTypewriter({ text, speedMs = 16, pauseMs = 900, enabled = true }) {
  const [value, setValue] = useState('');
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setValue('');
      indexRef.current = 0;
      return;
    }

    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      const nextIndex = indexRef.current + 1;
      indexRef.current = nextIndex;
      setValue(text.slice(0, nextIndex));

      if (nextIndex >= text.length) {
        timeoutRef.current = setTimeout(() => {
          indexRef.current = 0;
          setValue('');
          timeoutRef.current = setTimeout(tick, 250);
        }, pauseMs);
        return;
      }

      timeoutRef.current = setTimeout(tick, speedMs);
    };

    timeoutRef.current = setTimeout(tick, 250);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, pauseMs, speedMs, text]);

  return value;
}

export function useTypewriterOnce({ text, speedMs = 14, enabled = true }) {
  const [value, setValue] = useState('');
  const idxRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setValue('');
      idxRef.current = 0;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    let cancelled = false;

    // reset when enabled or when text changes
    setValue('');
    idxRef.current = 0;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const tick = () => {
      if (cancelled) return;

      idxRef.current += 1;
      setValue(text.slice(0, idxRef.current));

      if (idxRef.current >= text.length) return;
      timeoutRef.current = setTimeout(tick, speedMs);
    };

    timeoutRef.current = setTimeout(tick, 150);

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, speedMs, text]);

  return value;
}
