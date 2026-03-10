'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const toLangPath = (targetLanguage: 'hu' | 'en' | 'de') => {
    const currentPath = pathname || '/';
    const isEnPath = currentPath === '/en' || currentPath.startsWith('/en/');
    const isDePath = currentPath === '/de' || currentPath.startsWith('/de/');
    const basePath = isEnPath
      ? currentPath.replace(/^\/en/, '') || '/'
      : isDePath
        ? currentPath.replace(/^\/de/, '') || '/'
        : currentPath;

    if (targetLanguage === 'hu') return basePath;
    if (targetLanguage === 'en') return basePath === '/' ? '/en' : `/en${basePath}`;
    return basePath === '/' ? '/de' : `/de${basePath}`;
  };

  const handleSwitch = (targetLanguage: 'hu' | 'en' | 'de') => {
    if (targetLanguage === language) return;
    setLanguage(targetLanguage);
    const targetPath = toLangPath(targetLanguage);
    router.push(targetPath);
  };

  const buttonClass = (langCode: 'hu' | 'en' | 'de') =>
    `rounded-full px-2 py-1 text-xs font-bold tracking-wide transition ${language === langCode ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-sm font-semibold text-white/80 backdrop-blur-md">
      <Globe className="h-4 w-4 text-white/70 transition group-hover:text-white" />
      <button type="button" onClick={() => handleSwitch('hu')} className={buttonClass('hu')} aria-label="Magyar nyelv">
        HU
      </button>
      <button type="button" onClick={() => handleSwitch('en')} className={buttonClass('en')} aria-label="English language">
        EN
      </button>
      <button type="button" onClick={() => handleSwitch('de')} className={buttonClass('de')} aria-label="Deutsch Sprache">
        DE
      </button>
    </div>
  );
}
