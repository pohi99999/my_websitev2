"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

const Hero = () => {
  const { t, language } = useLanguage();

  const withLang = (href: string) => {
    if (language === 'hu') return href;
    if (href === '/') return `/${language}`;
    return href.startsWith('/') ? `/${language}${href}` : href;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/home.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      {/* HUD corner brackets */}
      <div className="absolute inset-8 md:inset-16 pointer-events-none z-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#00e5ff]/40" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#00e5ff]/40" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#00e5ff]/40" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#00e5ff]/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl mb-6 leading-tight">
          <span className="text-white font-light block mb-2 tracking-tight">
            {t('hero.headlineLine1')}
          </span>
          <span
            className="block font-bold"
            style={{
              color: '#00e5ff',
              textShadow: '0 0 30px rgba(0, 229, 255, 0.5), 0 0 60px rgba(0, 229, 255, 0.2)',
            }}
          >
            {t('hero.headlineLine2')}
          </span>
        </h1>

        {/* Thin cyan accent line */}
        <div className="flex justify-center mb-8">
          <div className="h-px w-20 bg-[#00e5ff]/60" aria-hidden="true" />
        </div>

        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          {t('hero.subheadline')}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Primary CTA — HUD octagon */}
          <Link
            href={withLang('/termekek/brunella-agents')}
            className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] border border-[#00e5ff]/50 hover:border-[#00e5ff] hover:bg-[#00e5ff]/10 transition-all duration-300"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
            onClick={() =>
              trackCtaClick({
                location: CTA_LOCATIONS.HeroPrimary,
                language,
                target: '/termekek/brunella-agents',
                page: PAGE_NAMES.Home,
              })
            }
          >
            {t('hero.cta')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {/* Secondary CTA — minimal with underline reveal */}
          <a
            href="#ai-folyamatok"
            className="group inline-flex flex-col items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors duration-200 uppercase tracking-widest"
            onClick={() =>
              trackCtaClick({
                location: CTA_LOCATIONS.HeroSecondaryScroll,
                language,
                target: '#ai-folyamatok',
                page: PAGE_NAMES.Home,
              })
            }
          >
            <span className="flex items-center gap-2">
              {t('hero.ctaSecondary')}
              <span className="text-[#00e5ff]">→</span>
            </span>
            <span
              className="block h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
