'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Hiba</h1>
      <h2 className="text-2xl font-semibold mb-6">Valami váratlan hiba történt</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        A szerverünk nem tudta feldolgozni a kérést. Próbáld meg újra később vagy térj vissza a főoldalra.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all"
        >
          Újrapróbálkozás
        </button>
        <Link
          href="/"
          className="px-8 py-3 bg-[#00ff9d] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,255,157,0.5)] transition-all"
        >
          Vissza a főoldalra
        </Link>
      </div>
    </div>
  );
}
