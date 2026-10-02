'use client';

// One screenshot that opens full size on click: its own alt text and caption (unlike the shared
// gallery, where every thumbnail gets the same alt), labels passed in so they follow the language.
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

export default function BrunellaZoomImage({ src, alt, caption, openLabel, closeLabel, heightClass = 'h-56 md:h-72', priority = false }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <figure className="m-0">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors cursor-zoom-in"
        aria-label={`${openLabel}: ${alt}`}
      >
        <div className={`relative w-full ${heightClass} bg-slate-900`}>
          <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" priority={priority} />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
            <ZoomIn className="w-9 h-9 text-white opacity-0 group-hover:opacity-80 transition-opacity" aria-hidden="true" />
          </div>
        </div>
      </button>
      {caption ? <figcaption className="mt-2 text-sm text-gray-400">{caption}</figcaption> : null}

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label={closeLabel}
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="relative h-[85vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </figure>
  );
}
