"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoSrc?: string; // Opcionális: ha másik oldalra mást akarsz
  overlayOpacity?: number; // Sötétítés erőssége
}

export default function VideoBackground({ 
  videoSrc = "https://res.cloudinary.com/dbrwg0av5/video/upload/v1765516398/0_rgswdr.mp4", // Az alapértelmezett hős videód
  overlayOpacity = 0.5 
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Biztosítjuk, hogy a videó automatikusan elinduljon (böngésző policy miatt)
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented by browser:", error);
      });
    }
  }, []);

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
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
