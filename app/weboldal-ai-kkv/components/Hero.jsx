"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// The website offer (moved here from the home page, 2026-10-05; copy by Stratéga, szoveg-v2.md).
// The two buttons used to be <button> elements without a link or handler: they did nothing.
const COPY = {
  hu: {
    title: ['Weboldal, amelyen a vevő foglal vagy ajánlatot kér.', 'Két hét alatt, fix áron.'],
    intro: 'Időpontfoglalás vagy ajánlatkérő űrlap, árlista és galéria, telefonon és laptopon. A szövegeket, az árakat és a képeket Ön szerkeszti. Ingyenes, kötelezettségmentes látványtervvel kezdünk.',
    points: [
      'Telefonon és laptopon egyaránt jól használható.',
      'Időpontfoglalás vagy ajánlatkérő űrlap, az érdeklődők egy helyen.',
      'Két hét átfutás, fix áron.',
      'Ingyenes, kötelezettségmentes látványterv.',
    ],
    primary: 'Kérek ingyenes látványtervet',
    secondary: 'Referenciák és csomagok',
  },
  en: {
    title: ['A website where customers book or request a quote.', 'Ready in two weeks, at a fixed price.'],
    intro: 'Online booking or a quote request form, price list and gallery, on phone and laptop. You edit the texts, prices and photos yourself. We start with a free, no-obligation design preview.',
    points: [
      'Works well on phone and laptop.',
      'Online booking or a quote request form, all enquiries in one place.',
      'Two weeks to launch, at a fixed price.',
      'Free, no-obligation design preview.',
    ],
    primary: 'Request a free design preview',
    secondary: 'Work and packages',
  },
  de: {
    title: ['Eine Website, auf der Kunden buchen oder ein Angebot anfragen.', 'In zwei Wochen fertig, zum Festpreis.'],
    intro: 'Online-Terminbuchung oder Anfrageformular, Preisliste und Galerie, auf Handy und Laptop. Texte, Preise und Bilder bearbeiten Sie selbst. Wir beginnen mit einem kostenlosen, unverbindlichen Entwurf.',
    points: [
      'Funktioniert gut auf Handy und Laptop.',
      'Online-Buchung oder Anfrageformular, alle Anfragen an einem Ort.',
      'Zwei Wochen bis zum Start, zum Festpreis.',
      'Kostenloser, unverbindlicher Entwurf.',
    ],
    primary: 'Kostenlosen Entwurf anfordern',
    secondary: 'Referenzen und Pakete',
  },
};

export default function Hero() {
  const { language } = useLanguage();
  const lang = language === 'en' || language === 'de' ? language : 'hu';
  const c = COPY[lang];
  const contactHref = lang === 'hu' ? '/kapcsolat' : `/${lang}/kapcsolat`;
  // the price block (Arcsomag) is shown on the Hungarian page only; EN/DE jump to the references
  const secondaryHref = lang === 'hu' ? '#arcsomag' : '#referenciak';

  return (
    <section className="relative py-20 px-6 container mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight">
        <span className="block text-white">{c.title[0]}</span>
        <span className="block text-[#00e5ff]">{c.title[1]}</span>
      </h1>
      <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-10">{c.intro}</p>

      <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl mx-auto mb-16 text-gray-200">
        {c.points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <span className="text-[#00e5ff]" aria-hidden="true">✔</span> {point}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={contactHref}
          className="inline-flex items-center justify-center gap-2 bg-[#00e5ff] text-black font-bold py-4 px-10 rounded-lg hover:bg-[#00e5ff]/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
        >
          {c.primary} <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <a
          href={secondaryHref}
          className="inline-flex items-center justify-center border border-white/20 py-4 px-10 rounded-lg hover:bg-white/5 transition"
        >
          {c.secondary}
        </a>
      </div>
    </section>
  );
}
