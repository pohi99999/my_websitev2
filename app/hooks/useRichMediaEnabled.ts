'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

// Enables rich media (video backgrounds) on all screen sizes.
// Respects user accessibility preferences: prefers-reduced-motion and Save-Data.
export function useRichMediaEnabled() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [saveDataEnabled, setSaveDataEnabled] = useState(false);

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    setSaveDataEnabled(Boolean(connection?.saveData));
  }, []);

  return !prefersReducedMotion && !saveDataEnabled;
}
