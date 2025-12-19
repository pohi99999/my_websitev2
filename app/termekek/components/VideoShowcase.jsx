"use client";

import React, { useEffect, useMemo, useState } from 'react';
import SpotlightCard from '../../components/SpotlightCard';
import { useLanguage } from '../../context/LanguageContext';

function buildYouTubeEmbedSrc(videoId) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: videoId,
    controls: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3'
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function buildXEmbedSrc(tweetUrl) {
  // X/Twitter közvetlen iframe embed gyakran tiltott (X-Frame-Options),
  // a twitframe egy egyszerű wrapper a megjelenítéshez.
  return `https://twitframe.com/show?url=${encodeURIComponent(tweetUrl)}`;
}

const videos = [
  {
    type: 'youtube',
    id: 'b7vWOfSKy_0',
    titleKey: 'products.videoShowcase.videos.workspace.title',
    descKey: 'products.videoShowcase.videos.workspace.desc',
  },
  {
    type: 'youtube',
    id: 'mbasMhYMwbk',
    titleKey: 'products.videoShowcase.videos.analytics.title',
    descKey: 'products.videoShowcase.videos.analytics.desc',
  },
  {
    type: 'x',
    url: 'https://x.com/antigravity/status/1990813606217236828?s=20',
    titleKey: 'products.videoShowcase.videos.automation.title',
    descKey: 'products.videoShowcase.videos.automation.desc',
  }
];

export default function VideoShowcase() {
  const { t } = useLanguage();

  const youTubeVideoIds = useMemo(
    () => videos.filter((v) => v.type === 'youtube').map((v) => v.id),
    []
  );
  const [availability, setAvailability] = useState(() => Object.create(null));

  useEffect(() => {
    let cancelled = false;

    async function checkAll() {
      const checks = await Promise.all(
        youTubeVideoIds.map(async (id) => {
          const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
            `https://www.youtube.com/watch?v=${id}`
          )}&format=json`;

          try {
            const res = await fetch(url, { method: 'GET' });
            return [id, res.ok];
          } catch {
            return [id, false];
          }
        })
      );

      if (cancelled) return;
      setAvailability(Object.fromEntries(checks));
    }

    checkAll();
    return () => {
      cancelled = true;
    };
  }, [youTubeVideoIds]);

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

            const isYouTube = video.type === 'youtube';
            const isX = video.type === 'x';

            return (
              <SpotlightCard
                key={isYouTube ? video.id : video.url}
                className="p-0 overflow-hidden bg-black/40 border border-white/10 hover:border-white/20 backdrop-blur-md"
              >
                <div className="p-6">
                  <div className="text-xl font-bold mb-2">{title}</div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{desc}</p>

                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    {isYouTube && availability[video.id] ? (
                      <>
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={buildYouTubeEmbedSrc(video.id)}
                          title={title}
                          frameBorder="0"
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                          allowFullScreen
                        />

                        <div className="absolute left-3 bottom-3 rounded-lg bg-black/50 border border-white/10 px-2 py-1 text-[11px] text-gray-200">
                          Ha nem indul automatikusan, koppints a lejátszásra.
                        </div>
                      </>
                    ) : isX ? (
                      <>
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={buildXEmbedSrc(video.url)}
                          title={title}
                          frameBorder="0"
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="fullscreen; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />

                        <div className="absolute left-3 bottom-3 rounded-lg bg-black/50 border border-white/10 px-2 py-1 text-[11px] text-gray-200">
                          X videóknál előfordulhat, hogy kattintani kell.
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                        <div className="text-white/90 font-semibold">A videó jelenleg nem beágyazható</div>
                        <div className="mt-1 text-xs text-gray-300">
                          Valószínűleg privát/törölt vagy a YouTube tiltja az embedet.
                        </div>
                        <a
                          className="mt-4 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 px-3 py-2 text-xs text-white"
                          href={isYouTube ? `https://www.youtube.com/watch?v=${video.id}` : video.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Megnyitás
                        </a>
                      </div>
                    )}
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
