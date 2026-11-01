'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONSENT_STORAGE_KEY } from '../lib/consentFlag';

export { CONSENT_STORAGE_KEY };
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
  // Visible in the server HTML, so a first visit paints the banner with the page; a visitor who already chose
  // never sees it (the head script + CSS in lib/consentFlag.ts hide it before paint), and it leaves the DOM here.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(readConsent() === null);
    const onReset = () => {
      document.documentElement.removeAttribute('data-consent');
      setVisible(true);
    };
    window.addEventListener(CONSENT_RESET_EVENT, onReset);
    return () => window.removeEventListener(CONSENT_RESET_EVENT, onReset);
  }, []);

  if (!visible) return null;

  const copy = COPY[(language as keyof typeof COPY) in COPY ? (language as keyof typeof COPY) : 'hu'];

  const choose = (value: ConsentValue) => {
    writeConsent(value);
    setVisible(false);
  };

  // The two choices are equal in size and emphasis (GDPR / NMHH: refusing is as easy as accepting), each
  // at least 44 px tall. On a phone the banner is docked to the bottom edge and compact (12 px text,
  // tight spacing), so on a first visit at 360-412 px the hero title and the configurator button stay
  // above it (Marveen 5766); the text itself is unchanged.
  const choice =
    'min-h-[44px] rounded-lg border border-[#00e5ff]/60 bg-[#00e5ff]/10 px-3 text-sm font-semibold text-white transition hover:bg-[#00e5ff]/20 sm:px-4';

  return (
    <div
      id="cookie-consent"
      role="dialog"
      aria-live="polite"
      aria-label={copy.link}
      className="fixed inset-x-0 bottom-0 z-[9998] sm:px-6 sm:pb-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-2 rounded-t-2xl border-t border-white/10 bg-slate-900/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-sm text-gray-200 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:gap-4 sm:rounded-2xl sm:border sm:p-5">
        <p className="flex-1 text-xs leading-snug sm:text-sm sm:leading-relaxed">
          {copy.text}{' '}
          <a href={copy.href} className="underline decoration-[#00e5ff]/60 underline-offset-2 hover:text-white">
            {copy.link}
          </a>
        </p>
        <div className="grid flex-shrink-0 grid-cols-2 gap-2">
          <button type="button" onClick={() => choose('necessary')} className={choice}>
            {copy.necessary}
          </button>
          <button type="button" onClick={() => choose('all')} className={choice}>
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
