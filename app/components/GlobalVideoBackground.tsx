'use client';

import Image from 'next/image';

export default function GlobalVideoBackground ()
{
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -10 }}
      aria-hidden="true"
    >
      {/* Preload poster image for LCP optimization */}
      <Image
        src="/1.jpg"
        alt="Pohánka és Társa - Professzionális ügynöki képviselet háttérkép"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={75}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      >
        <source src="/home.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
