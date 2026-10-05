"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Globe, Smartphone, Workflow } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

// Home page: the umbrella message in the hero, then one card per service line
// (positioning decision 2026-10-05, copy by Stratéga, szoveg-v2.md). Targets follow the header menu;
// the AI-team card links straight to the Brunella page (the /termekek/brunella-agents path redirects there).
type Lang = 'hu' | 'en' | 'de';

const CARDS: { icon: typeof Globe; path: string; title: Record<Lang, string>; body: Record<Lang, string> }[] = [
  {
    icon: Globe,
    path: '/weboldal-ai-kkv',
    title: { hu: 'Weboldal és foglalás', en: 'Website and booking', de: 'Website und Buchung' },
    body: {
      hu: 'Weboldal időpontfoglalással vagy ajánlatkérő űrlappal, két hét alatt, fix áron.',
      en: 'A website with online booking or a quote request form, ready in two weeks at a fixed price.',
      de: 'Eine Website mit Online-Buchung oder Anfrageformular, in zwei Wochen zum Festpreis.',
    },
  },
  {
    icon: Workflow,
    path: '/szolgaltatasok',
    title: { hu: 'Folyamat-automatizálás', en: 'Workflow automation', de: 'Prozessautomatisierung' },
    body: {
      hu: 'Az ajánlatkérés, a nyilvántartás, a válaszlevél és a számla közötti kézi lépéseket automatizáljuk.',
      en: 'We automate the manual steps between a quote request, your records, the reply and the invoice.',
      de: 'Wir automatisieren die manuellen Schritte zwischen Anfrage, Erfassung, Antwort und Rechnung.',
    },
  },
  {
    icon: Smartphone,
    path: '/portfolio',
    title: { hu: 'Web- és mobilalkalmazás', en: 'Web and mobile apps', de: 'Web- und Mobile-Apps' },
    body: {
      hu: 'Egyedi webes alkalmazás, portál vagy webáruház, projektalapon. Példa: a P-Szakrajz webalkalmazás.',
      en: 'Custom web apps, portals or online shops, built per project. Example: the P-Szakrajz web app.',
      de: 'Individuelle Web-Apps, Portale oder Onlineshops, projektbezogen. Beispiel: die Web-App P-Szakrajz.',
    },
  },
  {
    icon: Bot,
    path: '/portfolio/brunella-bas',
    title: { hu: 'AI-csapat (Brunella)', en: 'AI team (Brunella)', de: 'KI-Team (Brunella)' },
    body: {
      hu: 'A cég saját gépén futó AI-csapat levelekre, ajánlatkövetésre és napi összefoglalóra. Amit kifelé küldene, azt Ön hagyja jóvá.',
      en: "An AI team running on your company's own computer for emails, quote follow-up and a daily summary. Anything it would send out is approved by you first.",
      de: 'Ein KI-Team auf dem eigenen Rechner Ihres Unternehmens für E-Mails, Angebotsverfolgung und eine tägliche Zusammenfassung. Was nach außen geht, geben Sie vorher frei.',
    },
  },
];

const HEADING: Record<Lang, string> = { hu: 'Szolgáltatásaink', en: 'What we do', de: 'Unsere Leistungen' };

export default function ServiceCards ()
{
  const { language } = useLanguage();
  const lang: Lang = language === 'en' || language === 'de' ? language : 'hu';
  const withLang = ( path: string ) => ( lang === 'hu' ? path : `/${ lang }${ path }` );

  return (
    <section id="szolgaltatas-kartyak" className="relative px-4 py-16 md:px-6" aria-labelledby="szolgaltatas-kartyak-cim">
      <div className="container mx-auto max-w-6xl">
        <h2 id="szolgaltatas-kartyak-cim" className="sr-only">{ HEADING[ lang ] }</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          { CARDS.map( ( card ) =>
          {
            const Icon = card.icon;
            const href = withLang( card.path );
            return (
              <li key={ card.path }>
                <Link
                  href={ href }
                  onClick={ () => trackCtaClick( { location: CTA_LOCATIONS.HomeServiceCards, language, target: href, page: PAGE_NAMES.Home } ) }
                  className="group surface-panel-elevated flex h-full flex-col rounded-3xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm transition-colors hover:border-[#00e5ff]/50 focus-visible:border-[#00e5ff]"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e5ff]/30 bg-[#00e5ff]/10" aria-hidden="true">
                    <Icon className="h-5 w-5 text-[#00e5ff]" />
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-white">{ card.title[ lang ] }</h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-400">{ card.body[ lang ] }</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff]">
                    { lang === 'hu' ? 'Részletek' : 'Details' }
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          } ) }
        </ul>
      </div>
    </section>
  );
}
