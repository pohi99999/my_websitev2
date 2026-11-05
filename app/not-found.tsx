import Link from 'next/link';
import { headers } from 'next/headers';

const TEXT = {
  hu: {
    home: '/',
    title: 'A keresett oldal nem található',
    body: 'Sajnos az oldal, amelyet keres, már nem létezik, vagy áthelyezték.',
    back: 'Vissza a főoldalra',
  },
  en: {
    home: '/en',
    title: 'The page you are looking for cannot be found',
    body: 'Sorry, this page no longer exists or has been moved.',
    back: 'Back to the home page',
  },
  de: {
    home: '/de',
    title: 'Die gesuchte Seite wurde nicht gefunden',
    body: 'Leider existiert diese Seite nicht mehr oder sie wurde verschoben.',
    back: 'Zurück zur Startseite',
  },
};

export default async function NotFound() {
  const headerLang = (await headers()).get('x-site-language');
  const t = headerLang === 'en' || headerLang === 'de' ? TEXT[headerLang] : TEXT.hu;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#00ff9d] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">{t.title}</h2>
      <p className="text-slate-400 mb-8 max-w-md">
        {t.body}
      </p>
      <Link 
        href={t.home}
        className="px-8 py-3 bg-[#00ff9d] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,255,157,0.5)] transition-all"
      >
        {t.back}
      </Link>
    </div>
  );
}
