'use client';

import GsapFadeIn from './GsapFadeIn';
import { useLanguage } from '../context/LanguageContext';

type Lang = 'hu' | 'en' | 'de';

const copy: Record<Lang, { badge: string; heading: string; accent: string; lead: string; original?: string; frameTitle: string }> = {
  hu: {
    badge: 'Bemutató videó',
    heading: 'Pohánka és Társa ',
    accent: 'bemutató',
    lead: 'Ismerje meg a Pohánka és Társa csapatát és megközelítésünket: hogyan tervezzük és valósítjuk meg az AI rendszereket vállalkozásoknak.',
    frameTitle: 'Pohánka és Társa bemutató',
  },
  en: {
    badge: 'Introduction video',
    heading: 'Meet ',
    accent: 'Pohánka és Társa',
    lead: 'Get to know our team and our approach: how we design and build AI systems for businesses.',
    original: 'Original video, in Hungarian.',
    frameTitle: 'Pohánka és Társa introduction',
  },
  de: {
    badge: 'Vorstellungsvideo',
    heading: 'Pohánka és Társa ',
    accent: 'stellt sich vor',
    lead: 'Lernen Sie das Team von Pohánka és Társa und unsere Arbeitsweise kennen: wie wir KI-Systeme für Unternehmen planen und umsetzen.',
    original: 'Originalvideo auf Ungarisch.',
    frameTitle: 'Pohánka és Társa stellt sich vor',
  },
};

export default function BemutatkozoVideo() {
  const { language } = useLanguage();
  const t = copy[(language === 'en' || language === 'de') ? language : 'hu'];

  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.82)' }}>
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#00e5ff]/5 blur-[120px] -z-10 rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/8 blur-[100px] -z-10 rounded-full pointer-events-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        <GsapFadeIn>
          <div className="text-center mb-10">
            {/* HUD badge */}
            <div className="hud-badge text-sm font-medium mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" aria-hidden="true" />
              {t.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne tracking-tight">
              {t.heading}<span style={{ color: '#00e5ff' }}>{t.accent}</span>
            </h2>
            <div className="flex justify-center mb-6">
              <div className="h-px w-16 bg-[#00e5ff]/50" aria-hidden="true" />
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {t.lead}
            </p>
          </div>
        </GsapFadeIn>

        <GsapFadeIn delay={0.2}>
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#00e5ff]/20 shadow-[0_0_60px_rgba(0,229,255,0.08),0_24px_64px_rgba(0,0,0,0.7)]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dZ3H49-OJfE"
              title={t.frameTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          {t.original && <p className="text-gray-500 text-sm mt-3 text-center">{t.original}</p>}
        </GsapFadeIn>
      </div>
    </section>
  );
}
