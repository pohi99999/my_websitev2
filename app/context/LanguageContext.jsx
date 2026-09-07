'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import hu from '../locales/hu';
import en from '../locales/en';
import de from '../locales/de';

const STORAGE_KEY = 'site-language';

const translations = {
  hu,
  en,
  de,
};

function isSupportedLanguage(value) {
  return value === 'hu' || value === 'en' || value === 'de';
}

const pathCache = new Map();
const MAX_CACHE_SIZE = 10000;

function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;

  let keys = pathCache.get(path);
  if (!keys) {
    if (pathCache.size >= MAX_CACHE_SIZE) {
      pathCache.clear();
    }
    keys = path.split('.');
    pathCache.set(path, keys);
  }

  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    if (current == null) return undefined;
    current = current[keys[i]];
  }
  return current;
}

const LanguageContext = createContext({
  language: 'hu',
  setLanguage: (_lang) => {},
  toggleLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children, initialLanguage = 'hu' }) {
  const [language, setLanguage] = useState(isSupportedLanguage(initialLanguage) ? initialLanguage : 'hu');

  useEffect(() => {
    try {
      // Route-driven language should win over previously stored preference.
      if (isSupportedLanguage(initialLanguage)) {
        setLanguage(initialLanguage);
        window.localStorage.setItem(STORAGE_KEY, initialLanguage);
        return;
      }

      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isSupportedLanguage(stored)) {
        setLanguage(stored);
        return;
      }

      const browserLang = (navigator.language || '').toLowerCase();
      if (browserLang.startsWith('en')) setLanguage('en');
      if (browserLang.startsWith('de')) setLanguage('de');
    } catch {
      // no-op
    }
  }, [initialLanguage]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // no-op
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      if (prev === 'hu') return 'en';
      if (prev === 'en') return 'de';
      return 'hu';
    });
  }, []);

  const t = useCallback(
    (key) => {
      const value = getNestedValue(translations[language], key);
      if (value != null) return value;

      const fallback = getNestedValue(translations.hu, key);
      if (fallback != null) return fallback;

      return key;
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage: (lang) => {
        if (isSupportedLanguage(lang)) setLanguage(lang);
      },
      toggleLanguage,
      t,
    }),
    [language, toggleLanguage, t]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
