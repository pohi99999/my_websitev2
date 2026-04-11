"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';
import CountUpNumber from './CountUpNumber';

const Hero = () =>
{
  const { t, language } = useLanguage();
  const liveBadgeLabel = language === 'en' ? 'Live' : language === 'de' ? 'Live' : 'Élő';
  const heroStats =
    language === 'en'
      ? [
          { value: 95, suffix: '+', label: 'AI Agents' },
          { value: 53, label: 'MCP Tools' },
          { value: '24/7', label: 'Live Operations', live: true },
        ]
      : language === 'de'
        ? [
            { value: 95, suffix: '+', label: 'KI-Agenten' },
            { value: 53, label: 'MCP-Tools' },
            { value: '24/7', label: 'Live-Betrieb', live: true },
          ]
        : [
            { value: 95, suffix: '+', label: 'AI Ügynök' },
            { value: 53, label: 'MCP Eszköz' },
            { value: '24/7', label: 'Működés', live: true },
          ];

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-transparent px-4 pb-12 pt-24 md:min-h-screen md:px-6"
    >
      {/* Fallback gradient visible when video hasn't loaded */}
      <div
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        style={ {
          background:
            'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(0,229,255,0.10) 0%, transparent 65%), radial-gradient(ellipse 60% 80% at 70% 80%, rgba(0,229,255,0.06) 0%, transparent 60%), linear-gradient(160deg, #000000 0%, #00060a 50%, #000000 100%)',
        } }
      />


      {/* Dark overlay */ }
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* HUD corner brackets */ }
      <div className="absolute inset-8 md:inset-16 pointer-events-none z-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#00e5ff]/40" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#00e5ff]/40" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#00e5ff]/40" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#00e5ff]/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Context badge */ }
        <div className="hud-badge mb-6 text-xs font-mono" data-testid="hero-context-badge">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" aria-hidden="true" />
          { language === 'en' ? 'AI-Powered Enterprise Solutions' : language === 'de' ? 'KI-gestützte Unternehmenslösungen' : 'AI-Vezérelt Vállalati Megoldások' }
        </div>

        <h1 className="heading-display text-4xl md:text-6xl mb-6 leading-tight font-syne">
          <span className="text-white font-light block mb-2 tracking-tight">
            { t( 'hero.headlineLine1' ) }
          </span>
          <span
            className="block font-bold"
            style={ {
              color: '#00e5ff',
              textShadow: '0 0 30px rgba(0, 229, 255, 0.5), 0 0 60px rgba(0, 229, 255, 0.2)',
            } }
          >
            { t( 'hero.headlineLine2' ) }
          </span>
        </h1>

        {/* Thin cyan accent line */ }
        <div className="flex justify-center mb-8">
          <div className="h-px w-20 bg-[#00e5ff]/60" aria-hidden="true" />
        </div>

        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          { t( 'hero.subheadline' ) }
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Primary CTA — HUD octagon */ }
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-[#00e5ff]/60 bg-[#00e5ff]/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] transition-all duration-300 hover:scale-105 hover:border-[#00e5ff] hover:bg-[#00e5ff]/15 hover:shadow-[0_0_35px_rgba(0,229,255,0.28)] animate-[pulse_3.4s_ease-in-out_infinite]"
            style={ {
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            } }
            onClick={ () =>
              trackCtaClick( {
                location: CTA_LOCATIONS.HeroPrimary,
                language,
                target: '#contact',
                page: PAGE_NAMES.Home,
              } )
            }
          >
            { t( 'hero.ctaPrimary' ) }
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

          {/* Secondary CTA — minimal with underline reveal */ }
          <a
            href="#ai-folyamatok"
            className="group inline-flex flex-col items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors duration-200 uppercase tracking-widest"
            onClick={ () =>
              trackCtaClick( {
                location: CTA_LOCATIONS.HeroSecondaryScroll,
                language,
                target: '#ai-folyamatok',
                page: PAGE_NAMES.Home,
              } )
            }
          >
            <span className="flex items-center gap-2">
              { t( 'hero.ctaSecondary' ) }
              <span className="text-[#00e5ff]">→</span>
            </span>
            <span
              className="block h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          { heroStats.map( ( stat ) => (
            <div
              key={ stat.label }
              className="surface-panel-elevated rounded-3xl border border-white/10 bg-black/45 px-6 py-5 backdrop-blur-sm"
            >
              <div className="heading-display mb-2 flex items-center justify-center gap-3 text-3xl font-bold text-white md:text-4xl">
                { typeof stat.value === 'number' ? (
                  <CountUpNumber value={ stat.value } suffix={ stat.suffix ?? '' } />
                ) : (
                  <span>{ stat.value }</span>
                ) }
                { stat.live ? (
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.24em] text-emerald-300 animate-pulse">
                    { liveBadgeLabel }
                  </span>
                ) : null }
              </div>
              <p className="text-xs uppercase tracking-[0.24em] text-gray-400">{ stat.label }</p>
            </div>
          ) ) }
        </div>
      </div>

      {/* Scroll indicator */ }
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true" data-testid="hero-scroll-indicator">
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-[#00e5ff] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
