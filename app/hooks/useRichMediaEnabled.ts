'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export function useRichMediaEnabled(breakpointPx = 768) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [saveDataEnabled, setSaveDataEnabled] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsDesktop(window.innerWidth >= breakpointPx);
      const connection = (navigator as NavigatorWithConnection).connection;
      setSaveDataEnabled(Boolean(connection?.saveData));
    };

    update();

    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, [breakpointPx]);

  return isDesktop && !prefersReducedMotion && !saveDataEnabled;
}