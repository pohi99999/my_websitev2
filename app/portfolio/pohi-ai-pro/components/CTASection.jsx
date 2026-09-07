import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../../components/GsapFadeIn';
import SpotlightCard from '../../../components/SpotlightCard';
import { Star, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <GsapFadeIn delay={0.2}>
          <SpotlightCard className="p-12 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Hasonló platformot szeretnél?
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Ha van egy üzleti folyamatod, amit egy intelligens platformra kellene emelni — megcsináljuk. Minden iparágban, minden méretnél.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
              >
                Ingyenes konzultáció <ArrowRight size={18} />
              </Link>
              <Link
                href="/portfolio/brunella-bas"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-purple-400/50 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Brunella Agent System <ArrowRight size={18} />
              </Link>
            </div>
          </SpotlightCard>
        </GsapFadeIn>
      </div>
    </section>
  );
}
