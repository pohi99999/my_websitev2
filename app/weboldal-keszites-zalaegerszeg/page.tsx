import type { Metadata } from 'next';
import { Check, ExternalLink, MapPin, Phone } from 'lucide-react';
import { googleReviews } from '../components/googleReviews';

/*
 * Helyi SEO-aloldal (Péter GO, Telegram 4317). Célkeresések: "weboldal készítés
 * Zalaegerszeg", "weboldal készítés Zala", "honlapkészítés Zalaegerszeg",
 * "foglaló rendszer szalonnak".
 *
 * Minden állítás jóváhagyott tényből jön: az árcsomag (Telegram 4311) és a nyilvános
 * Google-vélemény (googleReviews.ts). Számot, határidőt, garanciát kitalálni tilos --
 * ami nincs jóváhagyva (pl. a bővítmény ára, havidíj), az "egyedi ajánlat szerint" vagy
 * nem szerepel.
 */
const PAGE_URL = 'https://www.pohankaestarsa.com/weboldal-keszites-zalaegerszeg';
const NBSP = ' ';
const PRICE = `150${ NBSP }000${ NBSP }Ft`;

export const metadata: Metadata = {
  title: 'Weboldal készítés Zalaegerszeg',
  description:
    'Weboldal és honlap készítés Zalaegerszegen és Zala megyében: bemutatkozó weboldal 150 000 Ft-ért (bruttó, egyszeri), két hét alatt, online foglaló rendszer szalonoknak.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Weboldal készítés Zalaegerszeg | Pohánka és Társa',
    description:
      'Bemutatkozó weboldal 150 000 Ft-ért (bruttó, egyszeri), két hét alatt; online időpontfoglalás és ajándékutalvány szalonoknak.',
    url: PAGE_URL,
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Pohánka és Társa',
  },
};

const alapcsomag = [
  'Bemutatkozó weboldal',
  'Telefonon és laptopon',
  'Magyar + angol',
  'Két hét átfutás',
  'A tulajdonos maga szerkeszti a szövegeket, árakat, galériát',
];

const faq = [
  {
    q: 'Mennyibe kerül egy weboldal?',
    a: `Az alapcsomag ${ PRICE }, bruttó, egyszeri díj. Az online időpontfoglalás és a bankkártyás előleg vagy ajándékutalvány bővítmény ára egyedi ajánlat szerint alakul.`,
  },
  { q: 'Mennyi idő alatt készül el?', a: 'Az alapcsomag átfutása két hét.' },
  { q: 'Módosíthatom később magam a weboldalt?', a: 'Igen: a szövegeket, az árakat és a galériát Ön szerkeszti.' },
  { q: 'Milyen nyelven készül a weboldal?', a: 'Magyarul és angolul.' },
];

/* Reni véleményéből az a bekezdés, ami a foglaló rendszerről szól -- szó szerint. */
const reni = googleReviews.find( ( r ) => r.featured );
const reniFoglalas = reni?.paragraphs.find( ( p ) => p.includes( 'időpontfoglalás' ) );

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map( ( f ) => ( {
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a.replace( / /g, ' ' ) },
  } ) ),
};

// A gyökér-layout már <main id="main-content">-be csomagol: itt nem nyitunk másodikat.
export default function WeboldalKeszitesZalaegerszeg ()
{
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify( faqJsonLd ) }} />
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#00e5ff]/80">Zalaegerszeg · Zala megye</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-bold font-syne leading-tight text-balance">
          Weboldal készítés Zalaegerszegen
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
          Bemutatkozó weboldalt készítünk zalaegerszegi és Zala megyei vállalkozásoknak: telefonon és laptopon is jól
          működik, magyarul és angolul, két hét alatt elkészül, és a szövegeket, árakat, galériát utána Ön szerkeszti.
        </p>

        {/* Alapcsomag */}
        <section aria-labelledby="alapcsomag" className="mt-14 border border-[#00e5ff]/40 bg-[#0c0c10] p-6 md:p-10">
          <h2 id="alapcsomag" className="text-2xl md:text-3xl font-bold font-syne">Mit kap az alapcsomagban?</h2>
          <p className="mt-5 text-4xl md:text-5xl font-bold font-syne tabular-nums">{PRICE}</p>
          <p className="mt-1 text-gray-400 text-sm">bruttó, egyszeri</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {alapcsomag.map( ( item ) => (
              <li key={item} className="flex gap-3 text-gray-200 leading-relaxed">
                <Check className="w-5 h-5 mt-0.5 shrink-0 text-[#00e5ff]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ) )}
          </ul>
        </section>

        {/* Foglaló rendszer */}
        <section aria-labelledby="foglalo" className="mt-10 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 id="foglalo" className="text-2xl md:text-3xl font-bold font-syne">Foglaló rendszer szalonnak</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Online időpontfoglalás bankkártyás előleggel vagy ajándékutalvánnyal, a weboldal bővítményeként.
            </p>
            <p className="mt-3 font-semibold text-[#00e5ff]">Egyedi ajánlat szerint</p>
          </div>
          {reni && reniFoglalas && (
            <figure className="md:col-span-3 border border-white/10 bg-[#0c0c10] p-6">
              <blockquote lang="hu" className="text-gray-200 leading-relaxed">„{reniFoglalas}”</blockquote>
              <figcaption className="mt-4 text-sm text-gray-400">
                <span className="font-semibold text-white">{reni.name}</span>, {reni.role} · Google-vélemény ·{' '}
                <a href={reni.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#00e5ff] hover:underline">
                  {reni.urlLabel}
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          )}
        </section>

        {/* Karbantartás */}
        <section aria-labelledby="karbantartas" className="mt-10">
          <h2 id="karbantartas" className="text-2xl md:text-3xl font-bold font-syne">Karbantartás</h2>
          <p className="mt-4 text-gray-300 leading-relaxed">Karbantartás és tartalomfrissítés, igény szerint. Opcionális.</p>
        </section>

        {/* GYIK */}
        <section aria-labelledby="gyik" className="mt-14">
          <h2 id="gyik" className="text-2xl md:text-3xl font-bold font-syne">Gyakori kérdések</h2>
          <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {faq.map( ( f ) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00e5ff]">
                  {f.q}
                  <span aria-hidden="true" className="text-[#00e5ff] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ) )}
          </div>
        </section>

        {/* Kapcsolat */}
        <section aria-labelledby="kapcsolat" className="mt-14 border border-white/10 bg-[#0c0c10] p-6 md:p-10">
          <h2 id="kapcsolat" className="text-2xl md:text-3xl font-bold font-syne">Kapcsolat</h2>
          <ul className="mt-5 space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[#00e5ff]" aria-hidden="true" />
              <span>Zalaegerszeg, Kossuth Lajos u. 39, 8900</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0 text-[#00e5ff]" aria-hidden="true" />
              <a href="tel:+36304291227" className="hover:text-white">+36 30 429 1227</a>
            </li>
          </ul>
          <a
            href="/kapcsolat"
            className="mt-8 inline-flex items-center rounded-full border border-[#00e5ff]/60 bg-[#00e5ff]/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] transition-colors hover:border-[#00e5ff] hover:bg-[#00e5ff]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00e5ff]"
          >
            Kapcsolat
          </a>
        </section>
      </div>
    </div>
  );
}
