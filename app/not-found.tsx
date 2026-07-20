import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#00ff9d] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Az oldal nem található</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        Úgy tűnik, ez az oldal nem létezik, vagy el lett távolítva.
        Kérjük, ellenőrizd az URL-t vagy térj vissza a főoldalra.
      </p>
      <Link 
        href="/"
        className="px-8 py-3 bg-[#00ff9d] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,255,157,0.5)] transition-all"
      >
        Vissza a főoldalra
      </Link>
    </div>
  );
}
