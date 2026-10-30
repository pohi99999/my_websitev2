'use client';

import GsapFadeIn from './GsapFadeIn';
import { useLanguage } from '../context/LanguageContext';

type Lang = 'hu' | 'en' | 'de';

type Card = { icon: string; title: string; text: string };

const copy: Record<Lang, { heading: string; lead: string; original?: string; frameTitle: string; cards: Card[] }> = {
  hu: {
    heading: 'Interjú pár elégedett ügyfelünkkel',
    lead: 'Nézze meg, mit gondolnak rólunk azok, akik már bevezették az MI automatizációt. (Figyelem: a videó nyomokban humort tartalmaz!)',
    frameTitle: 'Pohánka és Társa - Ügyfél interjúk',
    cards: [
      { icon: '🦁', title: 'Bátor Megoldások', text: 'Nem félünk a vadonban sem rendet tenni az automatizációval.' },
      { icon: '🦊', title: 'Ravasz Integrációk', text: 'Okos algoritmusok, amik kijátsszák a manuális munka nehézségeit.' },
      { icon: '🦉', title: 'Bölcs Döntések', text: 'Méréseken alapuló, intelligens rendszerek a jövő vállalkozásainak.' },
    ],
  },
  en: {
    heading: 'Interviews with a few happy clients',
    lead: 'See what people who have already introduced AI automation think of us. (Warning: the video contains traces of humor!)',
    original: 'Original video, in Hungarian.',
    frameTitle: 'Pohánka és Társa - client interviews',
    cards: [
      { icon: '🦁', title: 'Bold Solutions', text: 'We are not afraid to bring order with automation, even in the wild.' },
      { icon: '🦊', title: 'Clever Integrations', text: 'Smart algorithms that outwit the hard parts of manual work.' },
      { icon: '🦉', title: 'Wise Decisions', text: 'Intelligent systems built on measurement, for the businesses of the future.' },
    ],
  },
  de: {
    heading: 'Interviews mit einigen zufriedenen Kunden',
    lead: 'Sehen Sie, was Kunden über uns sagen, die KI-Automatisierung bereits eingeführt haben. (Achtung: Das Video enthält Spuren von Humor!)',
    original: 'Originalvideo auf Ungarisch.',
    frameTitle: 'Pohánka és Társa - Kundeninterviews',
    cards: [
      { icon: '🦁', title: 'Mutige Lösungen', text: 'Wir scheuen uns nicht, mit Automatisierung selbst in der Wildnis Ordnung zu schaffen.' },
      { icon: '🦊', title: 'Clevere Integrationen', text: 'Kluge Algorithmen, die die Mühen der Handarbeit überlisten.' },
      { icon: '🦉', title: 'Weise Entscheidungen', text: 'Intelligente, auf Messungen beruhende Systeme für die Unternehmen von morgen.' },
    ],
  },
};

export default function ClientVideo() {
  const { language } = useLanguage();
  const t = copy[(language === 'en' || language === 'de') ? language : 'hu'];

  // The same dark layer as the introduction-video section: over the fixed page video, the old
  // bg-white/5 let the lead and card text fall to ~2:1 on bright frames.
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.82)' }}>
      <div className="max-w-6xl mx-auto relative z-10">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
              {t.heading}
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              {t.lead}
            </p>
          </div>
        </GsapFadeIn>

        <GsapFadeIn delay={0.2}>
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 group">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/TGO37iUOgOY?si=TGO37iUOgOY"
              title={t.frameTitle}
              loading="lazy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          {t.original && <p className="text-gray-400 text-sm mt-3 text-center">{t.original}</p>}
        </GsapFadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {t.cards.map((card) => (
            <div key={card.icon} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-zinc-400 text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[120px] -z-10 rounded-full" />
    </section>
  );
}
