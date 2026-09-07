import React from 'react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';

export default function IntroSection() {
  return (
    <section className="px-6 py-16 bg-white/5">
      <div className="max-w-5xl mx-auto">
        <GsapFadeIn>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Mi a Pohi AI Pro?
          </h2>
        </GsapFadeIn>
        <GsapFadeIn delay={0.1}>
          <SpotlightCard className="p-8 mb-6">
            <p className="text-gray-300 leading-relaxed">
              A Pohi AI Pro egy egyedi fejlesztésű <strong className="text-white">B2B kereskedési és logisztikai platform</strong>, amely egy vevői adatbázist és annak rendelésállományát, valamint a gyártók készletnyilvántartását összefésüli — és kezeli a vevői igényekkel, fuvarszervezéssel egybehangolva.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              A platform testreszabott élményt nyújt három felhasználói szerepkörnek: <span className="text-blue-300 font-medium">vevőknek</span>, <span className="text-emerald-300 font-medium">gyártóknak</span> és <span className="text-purple-300 font-medium">adminisztrátoroknak</span>. Az AI nem kiegészítő funkció — a platform minden érintkezési pontján jelen van, kézzelfogható értéket nyújtva.
            </p>
          </SpotlightCard>
        </GsapFadeIn>
      </div>
    </section>
  );
}
