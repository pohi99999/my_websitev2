"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

// Second band on the home page: the website offer leads, the Brunella AI team is the
// option for larger teams (positioning decision 2026-10-05).
const COPY = {
  hu: {
    kicker: 'Nagyobb cégeknek',
    title: 'AI-csapat a napi adminisztrációra',
    body: 'Levelek átnézése, ajánlatok követése, napi összefoglaló. A Brunella-rendszer a cég saját gépén dolgozik, és amit a cégen kívülre küldene, azt előbb Ön hagyja jóvá.',
    cta: 'Bemutatót kérek',
  },
  en: {
    kicker: 'For larger teams',
    title: 'An AI team for daily admin work',
    body: "Sorting emails, following up on quotes, a daily summary. The Brunella system runs on your company's own computer, and anything it would send outside the company is approved by you first.",
    cta: 'Request a demo',
  },
  de: {
    kicker: 'Für größere Teams',
    title: 'Ein KI-Team für die tägliche Verwaltung',
    body: 'E-Mails sichten, Angebote nachverfolgen, eine tägliche Zusammenfassung. Das Brunella-System läuft auf dem eigenen Rechner Ihres Unternehmens, und alles, was es nach außen senden würde, geben Sie vorher frei.',
    cta: 'Vorführung anfragen',
  },
} as const;

export default function AiTeamBand ()
{
  const { language } = useLanguage();
  const lang = language === 'en' || language === 'de' ? language : 'hu';
  const c = COPY[ lang ];
  // the Brunella page itself (the /termekek/brunella-agents link only redirects here)
  const href = lang === 'hu' ? '/portfolio/brunella-bas' : `/${ lang }/portfolio/brunella-bas`;

  return (
    <section id="ai-csapat" className="relative px-4 py-16 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="surface-panel-elevated flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-sm md:flex-row md:items-center md:p-10">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-[#00e5ff]/30 bg-[#00e5ff]/10" aria-hidden="true">
            <Bot className="h-7 w-7 text-[#00e5ff]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00e5ff]">{ c.kicker }</p>
            <h2 className="heading-display mb-3 text-2xl font-bold text-white md:text-3xl">{ c.title }</h2>
            <p className="leading-relaxed text-gray-400">{ c.body }</p>
          </div>
          <Link
            href={ href }
            className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full border border-[#00e5ff]/40 bg-[#00e5ff]/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] transition hover:border-[#00e5ff] hover:bg-[#00e5ff]/15"
            onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.HomeAiTeamBand, language, target: href, page: PAGE_NAMES.Home } ) }
          >
            { c.cta }
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
