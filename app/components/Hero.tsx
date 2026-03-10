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
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-20">
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

      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white block mb-2">{t('hero.headlineLine1')}</span>
          <span className="relative inline-block">
            <span className="absolute inset-0 text-white" aria-hidden="true">{t('hero.headlineLine2')}</span>
            <span className="relative bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t('hero.headlineLine2')}
            </span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          {t('hero.subheadline')}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Link
            href={withLang('/termekek/brunella-agents')}
            className="btn-primary text-lg px-8 py-4 group"
            onClick={() => trackCtaClick({ location: CTA_LOCATIONS.HeroPrimary, language, target: '/termekek/brunella-agents', page: PAGE_NAMES.Home })}
          >
            {t('hero.cta')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#ai-folyamatok"
            className="px-8 py-4 bg-transparent border border-slate-600 hover:border-white text-white rounded-full font-semibold transition-all hover:bg-slate-800"
            onClick={() => trackCtaClick({ location: CTA_LOCATIONS.HeroSecondaryScroll, language, target: '#ai-folyamatok', page: PAGE_NAMES.Home })}
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
