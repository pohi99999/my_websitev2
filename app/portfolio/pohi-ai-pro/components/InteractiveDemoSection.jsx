import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';

export default function InteractiveDemoSection() {
  return (
    <section className="px-6 py-16 bg-white/5">
      <div className="max-w-6xl mx-auto">
        <GsapFadeIn>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Próbáld ki az interaktív prototípust
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Kattints végig a funkciókon: készíts új igényt vevőként, listázz terméket gyártóként, vagy szervezz fuvart adminisztrátorként.
            </p>
          </div>
        </GsapFadeIn>

        <GsapFadeIn delay={0.2}>
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900 group">
            <iframe
              src="https://demo.pohanka.ai/pro"
              className="absolute inset-0 w-full h-full border-0"
              title="Pohi AI Pro Interactive Demo"
              loading="lazy"
            />
            {/* Optional overlay can be added here if needed to capture initial clicks or provide a "Play" button */}
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            * A prototípus desktop felbontásra lett optimalizálva. A legteljesebb élményért asztali gépen próbáld ki.
          </p>
        </GsapFadeIn>
      </div>
    </section>
  );
}
