"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-20">
      {/* Background video */}
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

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Főcím */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white block mb-2">{t('hero.headlineLine1')}</span>
          <span className="relative inline-block">
            <span className="absolute inset-0 text-white" aria-hidden="true">{t('hero.headlineLine2')}</span>
            <span className="relative bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t('hero.headlineLine2')}
            </span>
          </span>
        </h1>
        
        {/* Alcím (A mondat folytatása) */}
        <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          {t('hero.subheadline')}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Link
            href="/termekek/brunella-agents"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center shadow-lg shadow-blue-900/50"
          >
            {t('hero.ctaPrimary')} <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <a href="#contact" className="px-8 py-4 bg-transparent border border-slate-600 hover:border-white text-white rounded-full font-semibold transition-all hover:bg-slate-800">
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
