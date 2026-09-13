'use client';

import { useEffect, useState } from 'react';
import { CONSENT_EVENT, readConsent, resetConsent, type ConsentValue } from './CookieConsent';

const LABEL: Record<ConsentValue | 'none', string> = {
  all: 'Jelenlegi beállítás: minden süti engedélyezve (statisztikai is).',
  necessary: 'Jelenlegi beállítás: csak a szükséges tárolás, statisztikai süti nincs.',
  none: 'Még nem döntött a sütikről.',
};

export default function CookieSettingsButton() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-gray-300">{LABEL[consent ?? 'none']}</p>
      <button
        type="button"
        onClick={() => {
          resetConsent();
          setConsent(null);
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}
        className="mt-3 rounded-lg border border-[#00e5ff]/60 px-4 py-2 text-sm font-semibold text-[#00e5ff] transition hover:bg-[#00e5ff]/10"
      >
        Süti-beállítások módosítása
      </button>
    </div>
  );
}
