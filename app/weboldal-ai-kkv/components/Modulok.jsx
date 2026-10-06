"use client";

import React from 'react';
import { ExternalLink, ImageUp, PencilLine, CalendarOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Modules we built for Bé-Da Klíma (bdklima.hu), offered with a website (Péter 6408, kanban 799d8b6e).
// Only what is live and measured there (2026-10-04/06): the client editor (prices, offers on and off),
// photo upload from a phone for the references (automatic resizing, order, caption), the closed notice.
const COPY = {
  hu: {
    eyebrow: 'Élesben a Bé-Da Klímánál',
    title: 'Modulok, amelyeket a weboldal mellé kérhet',
    intro: 'Ezeket a debreceni Bé-Da Klímának készítettük el. A cég ezekkel fejlesztő nélkül, maga szerkeszti az oldalát.',
    items: [
      { icon: PencilLine, title: 'Ügyfél-szerkesztő', text: 'Saját felületen Ön módosítja az árakat, és Ön teszi akcióba vagy veszi le a termékeket.' },
      { icon: ImageUp, title: 'Képfeltöltés telefonról', text: 'A referenciaképeket telefonról tölti fel. A rendszer magától kicsinyíti őket, a sorrendet és a képleírást Ön állítja be.' },
      { icon: CalendarOff, title: 'Zárva-jelzés', text: 'Saját szövegű sáv minden oldal tetején, például szabadság idejére, amíg ki nem kapcsolja.' },
    ],
    link: 'Élőben: bdklima.hu',
  },
  en: {
    eyebrow: 'Live at Bé-Da Klíma',
    title: 'Modules you can add to your website',
    intro: 'We built these for Bé-Da Klíma, an air-conditioning installer in Debrecen. With them, the company edits its own site without a developer.',
    items: [
      { icon: PencilLine, title: 'Client editor', text: 'In your own editor you change the prices and put products on offer or take them off.' },
      { icon: ImageUp, title: 'Photo upload from your phone', text: 'Upload reference photos from your phone. They are resized automatically, and you set the order and the captions.' },
      { icon: CalendarOff, title: 'Closed notice', text: 'A band with your own text at the top of every page, for example during holidays, until you switch it off.' },
    ],
    link: 'See it live: bdklima.hu',
  },
  de: {
    eyebrow: 'Live bei Bé-Da Klíma',
    title: 'Module für Ihre Website',
    intro: 'Diese Module haben wir für Bé-Da Klíma gebaut, einen Klimatechnik-Betrieb in Debrecen. Damit pflegt das Unternehmen seine Website selbst, ohne Entwickler.',
    items: [
      { icon: PencilLine, title: 'Kunden-Editor', text: 'Im eigenen Editor ändern Sie die Preise und nehmen Produkte in Aktionen auf oder wieder heraus.' },
      { icon: ImageUp, title: 'Fotos vom Handy', text: 'Referenzfotos laden Sie vom Handy hoch. Sie werden automatisch verkleinert, Reihenfolge und Bildbeschreibung legen Sie selbst fest.' },
      { icon: CalendarOff, title: 'Hinweis „Geschlossen“', text: 'Ein Balken mit Ihrem eigenen Text oben auf jeder Seite, etwa während des Urlaubs, bis Sie ihn ausschalten.' },
    ],
    link: 'Live ansehen: bdklima.hu',
  },
};

export default function Modulok() {
  const { language } = useLanguage();
  const c = COPY[language === 'en' || language === 'de' ? language : 'hu'];
  return (
    <section className="py-20 px-6 container mx-auto" aria-labelledby="modulok-cim">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] text-center mb-3">{c.eyebrow}</p>
        <h2 id="modulok-cim" className="text-4xl font-bold mb-6 text-center">{c.title}</h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">{c.intro}</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {c.items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="p-8 border border-white/10 rounded-2xl bg-gradient-to-b from-white/5 to-transparent">
              <Icon className="w-7 h-7 text-[#00e5ff] mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-bold mb-4 text-[#00e5ff]">{title}</h3>
              <p className="text-gray-400">{text}</p>
            </li>
          ))}
        </ul>
        <p className="text-center mt-10">
          <a href="https://bdklima.hu/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00e5ff] font-semibold underline decoration-[#00e5ff]/40 underline-offset-4 hover:decoration-[#00e5ff]">
            {c.link}
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
