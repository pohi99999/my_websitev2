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
      text: 'Az AI rendszer bevezetése után az ajánlatfeldolgozási időnk 80%-kal csökkent. Az értékesítési csapatom naponta több tucat releváns érdeklődést kap automatizált előszűréssel.',
      rating: 5,
      avatar: '👔',
    },
    {
      name: 'Tóth Marianna',
      role: 'Marketing Igazgató',
      company: 'AquaTech Solutions',
      text: 'Korábban három emberünk foglalkozott ajánlatokkal és utánkövetéssel. Ma ezt az AI rendszer végzi, mi pedig a kreatív munkára koncentrálunk. Havi több százezer forintot spórolunk.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Dr. Nagy Péter',
      role: 'Fogorvos – Praxisvezető',
      company: 'Mosolycentrum Fogászat',
      text: 'Az AI-alapú betegkommunikáció bevezetése óta a páciensek 40%-a online foglal időpontot. Az automatikus emlékeztetőknek köszönhetően a lemondások száma felére csökkent.',
      rating: 5,
      avatar: '🦷',
    },
    {
      name: 'Fekete Zsolt',
      role: 'CEO',
      company: 'FastLog Fuvarozó Kft.',
      text: 'A csapat nemcsak fejlesztőként, hanem stratégiai partnerként dolgozott velünk. Segítettek feltárni azokat a működési pontokat, ahol az automatizált diszpécser rendszer azonnali előrelépést hozott.',
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
      text: 'After implementing the AI system, our quote processing time dropped by 80%. My sales team now receives dozens of relevant prospects daily through automated pre-qualification.',
      rating: 5,
      avatar: '👔',
    },
    {
      name: 'Marianna Toth',
      role: 'Marketing Director',
      company: 'AquaTech Solutions',
      text: 'We used to have three people preparing quotes and following up with clients. Now the AI system handles it, and we focus on creative work. We save several hundred thousand HUF monthly.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Dr. Peter Nagy',
      role: 'Dentist – Practice Owner',
      company: 'Mosolycentrum Dental',
      text: 'Since implementing AI-powered patient communication, 40% of patients now book appointments online. Automated reminders cut cancellations in half.',
      rating: 5,
      avatar: '🦷',
    },
  ],
  de: [
    {
      name: 'Gabriel Kovacs',
      role: 'Geschäftsführer',
      company: 'GK Gebäudetechnik GmbH',
      text: 'Nach der Einführung des KI-Systems sank unsere Angebotsbearbeitungszeit um 80 %. Mein Vertriebsteam erhält täglich Dutzende relevante Interessenten mit automatischer Vorqualifizierung.',
      rating: 5,
      avatar: '👔',
    },
    {
      name: 'Marianna Toth',
      role: 'Marketingleiterin',
      company: 'AquaTech Solutions',
      text: 'Früher kümmerten sich drei Mitarbeiter um Angebote und Nachverfolgung. Heute erledigt das das KI-System, wir konzentrieren uns auf kreative Arbeit. Wir sparen monatlich mehrere hunderttausend HUF.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Zsolt Fekete',
      role: 'CEO',
      company: 'FastLog Transport GmbH',
      text: 'Das Team von Pohánka denkt nicht nur technisch, sondern strategisch. Sie haben uns geholfen, operative blinde Flecken zu erkennen und in ein automatisiertes Dispositionssystem zu überführen.',
      rating: 5,
      avatar: '🚛',
    },
  ],
};

const titles = {
  hu: { heading: 'Üzleti eredmények és visszajelzések', sub: 'Valódi cégeknél, valódi működésre épített AI rendszerek.' },
  en: { heading: 'Business Results & Feedback', sub: 'Real results from real businesses.' },
  de: { heading: 'Geschäftsergebnisse & Feedback', sub: 'Echte Ergebnisse von echten Unternehmen.' },
};

export default function Testimonials ()
{
  const { language } = useLanguage();
  const lang = ( language as 'hu' | 'en' | 'de' ) in testimonials ? ( language as 'hu' | 'en' | 'de' ) : 'hu';
  const items = testimonials[lang];
  const { heading, sub } = titles[lang];

  return (
    <section id="testimonials" className="py-24 bg-[#060608] relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.82)' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00e5ff]/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">
            {heading}
          </h2>
          <p className="text-gray-400 text-lg">{sub}</p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {items.map( ( item, idx ) => (
            <article
              key={idx}
              className="relative bg-[#0c0c10] border border-white/5 p-6 hover:border-[#00e5ff]/30 transition-all duration-300 group"
            >
              <Quote className="w-8 h-8 text-[#00e5ff]/30 mb-4" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`Értékelés: ${ item.rating }/5 csillag`}>
                {Array.from( { length: item.rating } ).map( ( _, i ) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ) )}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-12 h-12 rounded-full bg-[#0c0c10] border border-white/10 flex items-center justify-center text-2xl"
                  aria-hidden="true"
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.role}</p>
                  <p className="text-[#00e5ff] text-xs">{item.company}</p>
                </div>
              </div>
            </article>
          ) )}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '40+', label: lang === 'hu' ? 'Elégedett ügyfél' : lang === 'en' ? 'Happy Clients' : 'Zufriedene Kunden' },
            { value: '4.9/5', label: lang === 'hu' ? 'Átlag értékelés' : lang === 'en' ? 'Average Rating' : 'Bewertung ⌀' },
            { value: '80%', label: lang === 'hu' ? 'Időmegtakarítás átlag' : lang === 'en' ? 'Avg. Time Saved' : 'Zeit gespart ⌀' },
            { value: '3 hó', label: lang === 'hu' ? 'Átlagos ROI idő' : lang === 'en' ? 'Avg. ROI Timeline' : 'Ø ROI-Zeitraum' },
          ].map( ( stat, i ) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-[#00e5ff] mb-1 font-syne">{stat.value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ) )}
        </div>
      </div>
    </section>
  );
}
