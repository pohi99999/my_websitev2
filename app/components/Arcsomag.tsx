"use client";

import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/*
 * Árcsomag (Péter döntése, Telegram 4311, 2026-09-23). Csak a jóváhagyott tételek:
 * egy konkrét ár (alapcsomag), a bővítmény "egyedi ajánlat szerint", a karbantartás
 * összeg nélkül. Számot kitalálni tilos -- ha Péter árat ad a bővítményre vagy a
 * karbantartásra, az ide kerül, máshova nem.
 * Csak magyar nézetben jelenik meg: az angol és német szöveg még nincs jóváhagyva.
 */
const NBSP = ' ';

const alap = [
  'Bemutatkozó weboldal',
  'Telefonon és laptopon',
  'Magyar + angol',
  'Két hét átfutás',
  'A tulajdonos maga szerkeszti a szövegeket, árakat, galériát',
];

export default function Arcsomag ()
{
  const { language } = useLanguage();
  if ( language === 'en' || language === 'de' ) return null;

  return (
    <section
      id="arcsomag"
      aria-labelledby="arcsomag-heading"
      className="py-24 relative overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.82)' }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 id="arcsomag-heading" className="text-center text-3xl md:text-5xl font-bold text-white mb-12 font-syne">
          Árcsomag
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {/* Alapcsomag: az egyetlen konkrét ár, ezért ez a kiemelt kártya. */}
          <article className="flex flex-col border border-[#00e5ff]/40 bg-[#0c0c10] p-6 md:p-8 lg:row-span-1">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff]">Alapcsomag</h3>
            <p className="mt-4 text-4xl md:text-5xl font-bold text-white font-syne tabular-nums">
              {`150${ NBSP }000${ NBSP }Ft`}
            </p>
            <p className="mt-1 text-gray-400 text-sm">bruttó, egyszeri</p>
            <ul className="mt-6 space-y-3">
              {alap.map( ( item ) => (
                <li key={item} className="flex gap-3 text-gray-200 text-sm leading-relaxed">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#00e5ff]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ) )}
            </ul>
          </article>

          <article className="flex flex-col border border-white/10 bg-[#0c0c10] p-6 md:p-8">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-300">Bővítmény</h3>
            <p className="mt-4 text-lg text-white leading-snug">
              Online időpontfoglalás + bankkártyás előleg vagy ajándékutalvány
            </p>
            <p className="mt-3 text-[#00e5ff] font-semibold">Egyedi ajánlat szerint</p>
            <p className="mt-auto pt-6 text-gray-400 text-sm">
              Referencia:{' '}
              <a
                href="https://hetenyirenata.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#00e5ff] hover:underline"
              >
                hetenyirenata.com
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </p>
          </article>

          <article className="flex flex-col border border-white/10 bg-[#0c0c10] p-6 md:p-8">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-300">Karbantartás</h3>
            <p className="mt-4 text-lg text-white leading-snug">Karbantartás és tartalomfrissítés, igény szerint</p>
            <p className="mt-3 text-gray-400 text-sm">Opcionális</p>
          </article>
        </div>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Részletek és gyakori kérdések:{' '}
          <a href="/weboldal-keszites-zalaegerszeg" className="text-[#00e5ff] hover:underline">
            weboldal készítés Zalaegerszegen
          </a>
        </p>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-[#00e5ff]/60 bg-[#00e5ff]/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] transition-colors duration-300 hover:border-[#00e5ff] hover:bg-[#00e5ff]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00e5ff]"
          >
            Kapcsolat
          </a>
        </div>
      </div>
    </section>
  );
}
