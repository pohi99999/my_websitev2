"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoSrc?: string; // Opcionális: ha másik oldalra mást akarsz
  overlayOpacity?: number; // Sötétítés erőssége
}

export default function VideoBackground({ 
  videoSrc = "https://res.cloudinary.com/dbrwg0av5/video/upload/v1765516398/0_rgswdr.mp4", // Az alapértelmezett hős videód
  overlayOpacity = 0.5 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const readSetting = () => {
      const prefersReduced = mediaQuery?.matches ?? false;
      const saveData = (navigator as any)?.connection?.saveData === true;
      setReduceMotion(prefersReduced || saveData);
    };

    readSetting();

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener("change", readSetting);
      return () => mediaQuery.removeEventListener("change", readSetting);
    }

    mediaQuery?.addListener?.(readSetting);
    return () => mediaQuery?.removeListener?.(readSetting);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    // Biztosítjuk, hogy a videó automatikusan elinduljon (böngésző policy miatt)
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented by browser:", error);
      });
    }
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10" aria-hidden="true">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(900px 600px at 20% 20%, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 55%), radial-gradient(900px 600px at 80% 80%, rgba(147,51,234,0.22) 0%, rgba(147,51,234,0) 55%), linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.92) 100%)",
          }}
        />

        <div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {/* Sötétítő réteg (Overlay) a szöveg olvashatósága miatt */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: overlayOpacity }} 
      />

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline // Fontos mobilra!
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
