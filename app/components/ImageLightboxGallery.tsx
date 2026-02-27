"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface Props {
  screenshots: string[];
  heroSrc?: string;
  heroAlt?: string;
  thumbAlt?: string;
  accentColor?: string; // tailwind border color token e.g. "blue" | "purple"
}

export default function ImageLightboxGallery({
  screenshots,
  heroSrc,
  heroAlt = 'Képernyőkép',
  thumbAlt = 'Képernyőkép',
  accentColor = 'blue',
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // All images: hero first (if provided), then the rest
  const allImages = heroSrc ? [heroSrc, ...screenshots] : screenshots;
  const thumbImages = heroSrc ? screenshots : screenshots.slice(1);
  const heroImage = heroSrc ?? screenshots[0];

  const open = useCallback((idx: number) => setLightboxIndex(idx), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i - 1 + allImages.length) % allImages.length));
  }, [allImages.length]);

  const next = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i + 1) % allImages.length));
  }, [allImages.length]);

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

  const borderHover = accentColor === 'purple'
    ? 'hover:border-purple-500/50'
    : 'hover:border-blue-500/50';

  const borderActive = accentColor === 'purple'
    ? 'border-purple-500/40'
    : 'border-blue-500/40';

  return (
    <>
      {/* Hero kép */}
      <button
        type="button"
        onClick={() => open(0)}
        className={`group w-full rounded-2xl overflow-hidden border border-white/10 ${borderHover} transition-all duration-300 mb-5 block relative cursor-zoom-in`}
        aria-label="Kép megnyitása"
      >
        <div className="relative w-full h-72 md:h-96 bg-slate-900">
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg" />
          </div>
        </div>
      </button>

      {/* Thumbnail rács */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {thumbImages.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => open(i + 1)}
            className={`group rounded-xl overflow-hidden border border-white/10 ${borderHover} transition-all duration-300 hover:scale-[1.02] block cursor-zoom-in w-full`}
            aria-label="Kép megnyitása"
          >
            <div className="relative h-40 bg-slate-900">
              <Image
                src={src}
                alt={thumbAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          {/* Bezárás gomb */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 p-2"
            onClick={close}
            aria-label="Bezárás"
          >
            <X size={36} />
          </button>

          {/* Számláló */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm z-10">
            {lightboxIndex + 1} / {allImages.length}
          </div>

          {/* Bal nyíl */}
          {allImages.length > 1 && (
            <button
              className="absolute left-2 md:left-6 text-white/60 hover:text-white transition-colors z-10 p-3"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Előző kép"
            >
              <ChevronLeft size={44} />
            </button>
          )}

          {/* Kép */}
          <div
            className="relative max-w-[92vw] max-h-[88vh] w-auto h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[lightboxIndex]}
              alt={thumbAlt}
              width={1600}
              height={1000}
              className="max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
              sizes="92vw"
              priority
            />
          </div>

          {/* Jobb nyíl */}
          {allImages.length > 1 && (
            <button
              className="absolute right-2 md:right-6 text-white/60 hover:text-white transition-colors z-10 p-3"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Következő kép"
            >
              <ChevronRight size={44} />
            </button>
          )}

          {/* Swipe hint mobilon */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs md:hidden">
            ← nyilak a navigáláshoz →
          </div>
        </div>
      )}
    </>
  );
}
