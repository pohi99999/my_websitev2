"use client";

import React from 'react';
import SpotlightCard from '../../components/SpotlightCard';
import { useLanguage } from '../../context/LanguageContext';

const videos = [
  {
    id: 'D5t1_407FIs',
    titleKey: 'products.videoShowcase.videos.workspace.title',
    descKey: 'products.videoShowcase.videos.workspace.desc',
  },
  {
    id: '6Da1tQe-kcw',
    titleKey: 'products.videoShowcase.videos.analytics.title',
    descKey: 'products.videoShowcase.videos.analytics.desc',
  },
  {
    id: 'bNpxF1W7q0g',
    titleKey: 'products.videoShowcase.videos.automation.title',
    descKey: 'products.videoShowcase.videos.automation.desc',
  }
];

export default function VideoShowcase() {
  const { t } = useLanguage();

  return (
    <section className="mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
          {t('products.videoShowcase.title')}
        </h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          {t('products.videoShowcase.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => {
            const title = t(video.titleKey);
            const desc = t(video.descKey);

            return (
              <SpotlightCard
                key={video.id}
                className="p-0 overflow-hidden bg-black/40 border border-white/10 hover:border-white/20 backdrop-blur-md"
              >
                <div className="p-6">
                  <div className="text-xl font-bold mb-2">{title}</div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{desc}</p>

                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                      title={title}
                      frameBorder="0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
