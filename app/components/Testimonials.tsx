"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = {
  hu: [
    {
      name: 'Kovács Gábor',
      role: 'Ügyvezető',
      company: 'GK Épületgépészet Kft.',
      text: 'A Brunella Agent System bevezetése után az lead-feldolgozási időnk 80%-kal csökkent. Naponta 30-40 kvalifikált érdeklődőt kap az értékesítési csapatom automatikus elemzéssel.',
      rating: 5,
      avatar: '👔',
    },
    {
      name: 'Tóth Marianna',
      role: 'Marketing Igazgató',
      company: 'AquaTech Solutions',
      text: 'Korábban 3 emberünk foglalkozott azzal, hogy ajánlatokat készítsen és kövesse az ügyfeleket. Ma az AI végzi ezt, mi a kreatív munkára koncentrálunk. Megtakarítottunk havi 400 000 Ft-ot.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Dr. Nagy Péter',
      role: 'Fogorvos – Praxisvezető',
      company: 'Mosolycentrum Fogászat',
      text: 'A Patient Lead rendszer bevezetése óta a páciensek 40%-a online foglalja az időpontját. Az AI automatikusan emlékeztetőket küld, a lemondások száma felére csökkent.',
      rating: 5,
      avatar: '🦷',
    },
    {
      name: 'Fekete Zsolt',
      role: 'CEO',
      company: 'FastLog Fuvarozó Kft.',
      text: 'Pohánka Péterék nemcsak fejlesztők – stratégiai partnerek. Feltárták azokat a "vak pontokat" a cégünkben, melyeket mi magunk sem láttunk. Az automatizált diszpécser rendszer óriási előrelépés.',
      rating: 5,
      avatar: '🚛',
    },
    {
      name: 'Varga Lilla',
      role: 'HR Vezető',
      company: 'HungaroTech Zrt.',
      text: 'Az AI-alapú CV szűrőnk heti 200 jelentkezést dolgoz fel emberi beavatkozás nélkül. Csak a top 10%-ot kapjuk kézhez, pozíciónként. Forradalmi változás.',
      rating: 5,
      avatar: '🧑‍💻',
    },
  ],
  en: [
    {
      name: 'Gabriel Kovacs',
      role: 'Managing Director',
      company: 'GK Engineering Ltd.',
      text: 'After implementing the Brunella Agent System, our lead processing time dropped by 80%. My sales team now receives 30–40 qualified prospects daily with automated analysis.',
      rating: 5,
      avatar: '👔',
    },
    {
      name: 'Marianna Toth',
      role: 'Marketing Director',
      company: 'AquaTech Solutions',
      text: 'We used to have 3 people preparing quotes and following up with clients. Now AI handles it, and we focus on creative work. We save 400,000 HUF monthly.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Dr. Peter Nagy',
      role: 'Dentist – Practice Owner',
      company: 'Mosolycentrum Dental',
      text: 'Since implementing the Patient Lead system, 40% of patients book appointments online. AI sends reminders automatically, and cancellations dropped by half.',
      rating: 5,
      avatar: '🦷',
    },
  ],
  de: [
    {
      name: 'Gabriel Kovacs',
      role: 'Geschäftsführer',
      company: 'GK Gebäudetechnik GmbH',
      text: 'Nach der Einführung des Brunella Agent Systems sank unsere Lead-Bearbeitungszeit um 80 %. Mein Vertriebsteam erhält täglich 30–40 qualifizierte Interessenten mit automatischer Analyse.',
      rating: 5,
      avatar: '👔',
    },
    {
      name: 'Marianna Toth',
      role: 'Marketingleiterin',
      company: 'AquaTech Solutions',
      text: 'Früher kümmerten sich 3 Mitarbeiter um Angebote und Nachverfolgung. Heute erledigt das die KI, wir konzentrieren uns auf kreative Arbeit. Wir sparen monatlich 400.000 HUF.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Zsolt Fekete',
      role: 'CEO',
      company: 'FastLog Transport GmbH',
      text: 'Das Team von Pohánka sind nicht nur Entwickler – sie sind strategische Partner. Sie haben die "blinden Flecken" in unserem Unternehmen gefunden. Das automatisierte Dispatcher-System ist ein riesiger Fortschritt.',
      rating: 5,
      avatar: '🚛',
    },
  ],
};

const titles = {
  hu: { heading: 'Ügyfeleink mondják', sub: 'Valódi eredmények, valódi cégektől.' },
  en: { heading: 'What Our Clients Say', sub: 'Real results from real businesses.' },
  de: { heading: 'Das sagen unsere Kunden', sub: 'Echte Ergebnisse von echten Unternehmen.' },
};

export default function Testimonials() {
  const { language } = useLanguage();
  const lang = (language as 'hu' | 'en' | 'de') in testimonials ? (language as 'hu' | 'en' | 'de') : 'hu';
  const items = testimonials[lang];
  const { heading, sub } = titles[lang];

  return (
    <section id="testimonials" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {heading}
          </h2>
          <p className="text-slate-400 text-lg">{sub}</p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {items.map((item, idx) => (
            <article
              key={idx}
              className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 group"
            >
              <Quote className="w-8 h-8 text-blue-400/40 mb-4" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`Értékelés: ${item.rating}/5 csillag`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl"
                  aria-hidden="true"
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.name}</p>
                  <p className="text-slate-400 text-xs">{item.role}</p>
                  <p className="text-blue-400 text-xs">{item.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '40+', label: lang === 'hu' ? 'Elégedett ügyfél' : lang === 'en' ? 'Happy Clients' : 'Zufriedene Kunden' },
            { value: '4.9/5', label: lang === 'hu' ? 'Átlag értékelés' : lang === 'en' ? 'Average Rating' : 'Bewertung ⌀' },
            { value: '80%', label: lang === 'hu' ? 'Időmegtakarítás átlag' : lang === 'en' ? 'Avg. Time Saved' : 'Zeit gespart ⌀' },
            { value: '3 hó', label: lang === 'hu' ? 'Átlagos ROI idő' : lang === 'en' ? 'Avg. ROI Timeline' : 'Ø ROI-Zeitraum' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
