'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const CONSENT_STORAGE_KEY = 'pt-cookie-consent';
export const CONSENT_EVENT = 'pt-cookie-consent-change';
export const CONSENT_RESET_EVENT = 'pt-cookie-consent-reset';

export type ConsentValue = 'all' | 'necessary';

export function readConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw === 'all' || raw === 'necessary' ? raw : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Private mode / blocked storage: the banner will simply show again next time.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function resetConsent() {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(CONSENT_RESET_EVENT));
}

const COPY = {
  hu: {
    text: 'Ez a weboldal a működéshez szükséges tárolás mellett statisztikai sütiket (Google Analytics) csak az Ön hozzájárulásával használ.',
    link: 'Adatvédelmi tájékoztató',
    accept: 'Elfogadom',
    necessary: 'Csak a szükségesek',
    href: '/adatvedelmi-nyilatkozat',
  },
  en: {
    text: 'Besides storage required for the site to work, this website uses statistical cookies (Google Analytics) only with your consent.',
    link: 'Privacy notice',
    accept: 'Accept',
    necessary: 'Necessary only',
    href: '/en/adatvedelmi-nyilatkozat',
  },
  de: {
    text: 'Neben der für den Betrieb notwendigen Speicherung verwendet diese Website Statistik-Cookies (Google Analytics) nur mit Ihrer Einwilligung.',
    link: 'Datenschutzhinweis',
    accept: 'Akzeptieren',
    necessary: 'Nur notwendige',
    href: '/de/adatvedelmi-nyilatkozat',
  },
} as const;

export default function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
    const onReset = () => setVisible(true);
    window.addEventListener(CONSENT_RESET_EVENT, onReset);
    return () => window.removeEventListener(CONSENT_RESET_EVENT, onReset);
  }, []);

  if (!visible) return null;

  const copy = COPY[(language as keyof typeof COPY) in COPY ? (language as keyof typeof COPY) : 'hu'];

  const choose = (value: ConsentValue) => {
    writeConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={copy.link}
      className="fixed inset-x-0 bottom-0 z-[9998] px-4 pb-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/95 p-5 text-sm text-gray-200 shadow-2xl backdrop-blur sm:flex-row sm:items-center">
        <p className="flex-1 leading-relaxed">
          {copy.text}{' '}
          <a href={copy.href} className="underline decoration-[#00e5ff]/60 underline-offset-2 hover:text-white">
            {copy.link}
          </a>
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose('necessary')}
            className="rounded-lg border border-white/20 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
          >
            {copy.necessary}
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="rounded-lg bg-[#00e5ff] px-4 py-2 font-bold text-black transition hover:bg-[#33ebff]"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
