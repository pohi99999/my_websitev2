"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';
import { GOOGLE_RATING, GOOGLE_PROFILE_URL } from './googleReviews';

const Hero = () =>
{
  const { t, language } = useLanguage();
  // Only things we can show or keep: the Google rating (googleReviews.ts), the two-week
  // website delivery (Arcsomag) and the free first consultation (owner decision 2026-10-05).
  const rating = GOOGLE_RATING.average.toFixed( 1 );
  const heroStats =
    language === 'en'
      ? [
        { value: `${ rating } ★`, label: `${ GOOGLE_RATING.count } Google reviews`, href: GOOGLE_PROFILE_URL },
        { value: '2 weeks', label: 'website delivery' },
        { value: 'Free', label: 'first consultation' },
      ]
      : language === 'de'
        ? [
          { value: `${ rating.replace( '.', ',' ) } ★`, label: `${ GOOGLE_RATING.count } Google-Bewertungen`, href: GOOGLE_PROFILE_URL },
          { value: '2 Wochen', label: 'Umsetzung einer Website' },
          { value: 'Kostenlos', label: 'Erstberatung' },
        ]
        : [
          { value: `${ rating.replace( '.', ',' ) } ★`, label: `${ GOOGLE_RATING.count } Google-vélemény`, href: GOOGLE_PROFILE_URL },
          { value: '2 hét', label: 'weboldal átfutása' },
          { value: 'Ingyenes', label: 'első konzultáció' },
        ];
  const portfolioHref = language === 'hu' ? '/portfolio' : `/${ language }/portfolio`;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-transparent px-4 pb-12 pt-24 md:min-h-screen md:px-6"
    >
      {/* Ambient glow only — keep the video visible */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(0,229,255,0.10) 0%, rgba(0,229,255,0.03) 34%, transparent 72%), radial-gradient(ellipse 60% 80% at 70% 80%, rgba(0,229,255,0.05) 0%, transparent 62%)',
        }}
      />

      {/* HUD corner brackets */}
      <div className="absolute inset-8 md:inset-16 pointer-events-none z-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#00e5ff]/40" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#00e5ff]/40" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#00e5ff]/40" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#00e5ff]/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Context badge */}
        <div className="hud-badge mb-6 text-xs font-mono" data-testid="hero-context-badge">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" aria-hidden="true" />
          Pohánka és Társa, Zalaegerszeg
        </div>

        {/* 360 px alatt 30 px, hogy a leghosszabb szó (pl. "ajánlatot", "Kostenlosen") se lógjon ki. */}
        <h1 className="heading-display text-[1.875rem] min-[360px]:text-4xl md:text-6xl mb-6 leading-tight font-syne">
          <span className="text-white font-light block mb-2 tracking-tight">
            {language === 'en' ? 'Websites, automation and an AI team' : language === 'de' ? 'Websites, Automatisierung und ein KI-Team' : 'Weboldal, automatizálás és AI-csapat'}
          </span>{' '}
          <span
            className="block font-bold"
            style={{
              color: '#00e5ff',
              textShadow: '0 0 30px rgba(0, 229, 255, 0.5), 0 0 60px rgba(0, 229, 255, 0.2)',
            }}
          >
            {language === 'en' ? 'for small businesses.' : language === 'de' ? 'für kleine Unternehmen.' : 'kisvállalkozásoknak.'}
          </span>
        </h1>

        {/* Thin cyan accent line */}
        <div className="flex justify-center mb-8">
          <div className="h-px w-20 bg-[#00e5ff]/60" aria-hidden="true" />
        </div>

        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          {language === 'en' ? 'We build websites where customers book or request a quote, and we take over part of your manual admin work. We start with a free, no-obligation consultation or design preview.' : language === 'de' ? 'Wir bauen Websites, auf denen Kunden buchen oder ein Angebot anfragen, und übernehmen einen Teil Ihrer manuellen Verwaltung. Wir beginnen mit einer kostenlosen, unverbindlichen Beratung oder einem Entwurf.' : 'Olyan weboldalt készítünk, amelyen a vevő foglal vagy ajánlatot kér, és átvesszük a kézi adminisztráció egy részét. Ingyenes, kötelezettségmentes konzultációval vagy látványtervvel kezdünk.'}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Primary CTA — HUD octagon */}
          <a
            href="#contact-form"
            className="group inline-flex items-center gap-3 rounded-full border border-[#00e5ff]/60 bg-[#00e5ff]/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] transition-all duration-300 hover:scale-105 hover:border-[#00e5ff] hover:bg-[#00e5ff]/15 hover:shadow-[0_0_35px_rgba(0,229,255,0.28)] animate-[pulse_3.4s_ease-in-out_infinite]"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            }}
            onClick={() =>
              trackCtaClick( {
                location: CTA_LOCATIONS.HeroPrimary,
                language,
                target: '#contact-form',
                page: PAGE_NAMES.Home,
              } )
            }
          >
            {t( 'hero.ctaPrimary' )}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

          {/* Secondary CTA — minimal with underline reveal */}
          <a
            href={portfolioHref}
            className="group inline-flex flex-col items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors duration-200 uppercase tracking-widest"
            onClick={() =>
              trackCtaClick( {
                location: CTA_LOCATIONS.HeroSecondaryScroll,
                language,
                target: portfolioHref,
                page: PAGE_NAMES.Home,
              } )
            }
          >
            <span className="flex items-center gap-2">
              {t( 'hero.ctaSecondary' )}
              <span className="text-[#00e5ff]">→</span>
            </span>
            <span
              className="block h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          {heroStats.map( ( stat ) =>
          {
            const body = (
              <>
                <div className="heading-display mb-2 text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-400">{stat.label}</p>
              </>
            );
            const cls = 'surface-panel-elevated block rounded-3xl border border-white/10 bg-black/45 px-6 py-5 backdrop-blur-sm';
            return stat.href ? (
              <a key={stat.label} href={stat.href} target="_blank" rel="noopener noreferrer" className={`${ cls } transition-colors hover:border-[#00e5ff]/40`}>
                {body}
              </a>
            ) : (
              <div key={stat.label} className={cls}>{body}</div>
            );
          } )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true" data-testid="hero-scroll-indicator">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-[#00e5ff] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
