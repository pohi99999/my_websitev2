import Link from 'next/link';

export const metadata = {
  title: '404 – Az oldal nem található',
  description: 'A kért oldal nem található. Navigálj vissza a főoldalra vagy a bloghoz.'
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-sm text-gray-400">404</div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold gradient-text">Az oldal nem található</h1>
        <p className="mt-4 text-gray-300 leading-relaxed">
          Lehet, hogy megváltozott a link, vagy elgépelés történt. Válassz egy biztos útvonalat:
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary inline-flex justify-center">
            Vissza a főoldalra
          </Link>
          <Link href="/blog" className="inline-flex justify-center px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
            Blog & Tudástár
          </Link>
        </div>
      </div>
    </main>
  );
}
