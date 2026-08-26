'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import GsapFadeIn from './GsapFadeIn';
import SpotlightCard from './SpotlightCard';

type Block =
  | { type: 'intro'; title: string; tagline: string; body: string }
  | { type: 'heading'; title: string; subtitle?: string }
  | { type: 'paragraphs'; items: string[] }
  | { type: 'quote'; entries: { speaker: string; text: string }[] }
  | { type: 'list'; items: { name: string; role: string }[] }
  | { type: 'stats'; items: { value: string; label: string }[]; note: string }
  | { type: 'image'; index: number; eyebrow: string; label: string; caption: string; alt: string }
  | { type: 'closing'; title: string; body: string };

interface Props {
  blocks: Block[];
  imageSrcs: string[]; // 13 image sources, index 1 => imageSrcs[0]
}

export default function BrunellaBetaStory({ blocks, imageSrcs }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imageBlocks = blocks.filter((b): b is Extract<Block, { type: 'image' }> => b.type === 'image');

  const open = useCallback((idx: number) => setLightboxIndex(idx), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + imageBlocks.length) % imageBlocks.length));
  }, [imageBlocks.length]);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % imageBlocks.length));
  }, [imageBlocks.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <div className="space-y-10">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'intro':
            return (
              <GsapFadeIn key={i}>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  {block.title}
                </h2>
                <p className="text-lg text-purple-200/80 font-medium mb-4">{block.tagline}</p>
                <p className="text-gray-300 leading-relaxed max-w-3xl">{block.body}</p>
              </GsapFadeIn>
            );

          case 'heading':
            return (
              <GsapFadeIn key={i} className="pt-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {block.title}
                </h3>
                {block.subtitle && (
                  <p className="text-gray-400 italic">{block.subtitle}</p>
                )}
              </GsapFadeIn>
            );

          case 'paragraphs':
            return (
              <GsapFadeIn key={i} className="space-y-4 text-gray-300 leading-relaxed max-w-3xl">
                {block.items.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </GsapFadeIn>
            );

          case 'quote':
            return (
              <GsapFadeIn key={i} className="max-w-2xl space-y-3">
                {block.entries.map((q, qi) => (
                  <SpotlightCard key={qi} className="p-5">
                    <p className="text-xs uppercase tracking-wide text-blue-300 mb-1.5">{q.speaker}</p>
                    <p className="text-gray-100 leading-relaxed">{q.text}</p>
                  </SpotlightCard>
                ))}
              </GsapFadeIn>
            );

          case 'list':
            return (
              <GsapFadeIn key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {block.items.map((m, mi) => (
                  <SpotlightCard key={mi} className="p-5">
                    <p className="font-semibold text-blue-300 mb-1.5">{m.name}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{m.role}</p>
                  </SpotlightCard>
                ))}
              </GsapFadeIn>
            );

          case 'stats':
            return (
              <GsapFadeIn key={i}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                  {block.items.map((s, si) => (
                    <SpotlightCard key={si} className="p-6 text-center">
                      <div className="text-3xl md:text-4xl font-black text-blue-300 mb-1">{s.value}</div>
                      <div className="text-gray-400 text-xs leading-snug">{s.label}</div>
                    </SpotlightCard>
                  ))}
                </div>
                <p className="text-gray-400 text-sm max-w-2xl">{block.note}</p>
              </GsapFadeIn>
            );

          case 'closing':
            return (
              <GsapFadeIn key={i} className="pt-4 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-3 pt-8">{block.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-3xl text-sm">{block.body}</p>
              </GsapFadeIn>
            );

          case 'image': {
            const src = imageSrcs[block.index - 1];
            const lbIdx = imageBlocks.findIndex((b) => b.index === block.index);
            return (
              <GsapFadeIn key={i}>
                <button
                  type="button"
                  onClick={() => open(lbIdx)}
                  className="group w-full rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 block relative cursor-zoom-in"
                  aria-label={block.alt}
                >
                  <div className="relative w-full h-64 md:h-[28rem] bg-slate-900">
                    <Image
                      src={src}
                      alt={block.alt}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 900px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg" />
                    </div>
                    <div className="absolute top-3 left-3 text-[11px] uppercase tracking-widest text-white/70 bg-black/40 rounded-full px-3 py-1">
                      {block.eyebrow} · {block.label}
                    </div>
                  </div>
                </button>
                <p className="text-gray-400 text-sm italic mt-3 max-w-2xl">{block.caption}</p>
              </GsapFadeIn>
            );
          }

          default:
            return null;
        }
      })}

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 p-2"
            onClick={close}
            aria-label="Close"
          >
            <X size={36} />
          </button>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm z-10">
            {lightboxIndex + 1} / {imageBlocks.length}
          </div>

          {imageBlocks.length > 1 && (
            <button
              className="absolute left-2 md:left-6 text-white/60 hover:text-white transition-colors z-10 p-3"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={44} />
            </button>
          )}

          <div
            className="relative max-w-[92vw] max-h-[80vh] w-auto h-auto flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageSrcs[imageBlocks[lightboxIndex].index - 1]}
              alt={imageBlocks[lightboxIndex].alt}
              width={1600}
              height={1000}
              className="max-w-[92vw] max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
              sizes="92vw"
              priority
            />
            <p className="text-gray-300 text-sm italic text-center max-w-2xl px-4">
              {imageBlocks[lightboxIndex].caption}
            </p>
          </div>

          {imageBlocks.length > 1 && (
            <button
              className="absolute right-2 md:right-6 text-white/60 hover:text-white transition-colors z-10 p-3"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight size={44} />
            </button>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs md:hidden">
            ← swipe / arrows →
          </div>
        </div>
      )}
    </div>
  );
}
