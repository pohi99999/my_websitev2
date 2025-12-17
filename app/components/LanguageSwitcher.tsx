'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = () => {
    const nextLanguage = language === 'hu' ? 'en' : 'hu';
    setLanguage(nextLanguage);

    const currentPath = pathname || '/';
    const isEnPath = currentPath === '/en' || currentPath.startsWith('/en/');

    // Keep canonical HU routes without prefix; EN routes under /en.
    let targetPath: string;
    if (nextLanguage === 'en') {
      targetPath = isEnPath ? currentPath : currentPath === '/' ? '/en' : `/en${currentPath}`;
    } else {
      targetPath = isEnPath ? (currentPath.replace(/^\/en/, '') || '/') : currentPath;
    }

    router.push(targetPath);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Switch language"
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
    >
      <Globe className="h-4 w-4 text-white/70 transition group-hover:text-white" />
      <span className="tracking-wide">{language.toUpperCase()}</span>
    </button>
  );
}
