'use client';

export default function GlobalVideoBackground ()
{
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -10 }}
      aria-hidden="true"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/1.jpg"
        className="h-full w-full object-cover"
      >
        <source src="/home.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
