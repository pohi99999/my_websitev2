'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import hu from '../locales/hu';
import en from '../locales/en';

const STORAGE_KEY = 'site-language';

const translations = {
  hu,
  en,
};

function isSupportedLanguage(value) {
  return value === 'hu' || value === 'en';
}

function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj);
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
    setLanguage((prev) => (prev === 'hu' ? 'en' : 'hu'));
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
