import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Impresszum',
  description: 'Céginformációk és elérhetőségek – Pohánka és Társa Kft.',
  // without its own canonical the page inherited the layout's, which is the home page
  alternates: {
    canonical: '/impresszum',
  },
};

// Company data from the company register extract (cégkivonat, CK 5/1, 21/3, 49/1); the seat and the
// office as the owner put it (Telegram 11990, 2026-10-30): "a berek a székhely, a kossuth az iroda címe".
// The full name, the managing directors, the host and the conciliation body as in the approved ÁSZF
// (points 1 and 17.6; Marveen 5829).
const COPY = {
  hu: {
    title: 'Impresszum', seat: 'Székhely', office: 'Iroda', reg: 'Cégjegyzékszám', court: 'Zalaegerszegi Törvényszék Cégbírósága',
    tax: 'Adószám', vat: 'Közösségi adószám', email: 'E-mail', phone: 'Telefon',
    seatAddr: '8900 Zalaegerszeg, Berek utca 38.', officeAddr: '8900 Zalaegerszeg, Kossuth Lajos u. 39.',
    fullName: 'Teljes cégnév', directors: 'Ügyvezetők', directorsNote: 'önálló képviseleti joggal',
    host: 'Tárhelyszolgáltató', hostAddr: '440 N Barranca Avenue #4133, Covina, CA 91723, Amerikai Egyesült Államok',
    adr: 'Békéltető testület', adrAddr: '9021 Győr, Szent István út 10/A', web: 'Web',
  },
  en: {
    title: 'Imprint', seat: 'Registered office', office: 'Office', reg: 'Company registration number', court: 'Registry Court of Zalaegerszeg',
    tax: 'Tax number', vat: 'EU VAT number', email: 'Email', phone: 'Phone',
    seatAddr: 'Berek utca 38., 8900 Zalaegerszeg, Hungary', officeAddr: 'Kossuth Lajos u. 39., 8900 Zalaegerszeg, Hungary',
    fullName: 'Full company name', directors: 'Managing directors', directorsNote: 'each with sole power of representation',
    host: 'Hosting provider', hostAddr: '440 N Barranca Avenue #4133, Covina, CA 91723, USA',
    adr: 'Consumer conciliation body', adrAddr: 'Szent István út 10/A, 9021 Győr, Hungary', web: 'Web',
  },
  de: {
    title: 'Impressum', seat: 'Firmensitz', office: 'Büro', reg: 'Handelsregisternummer', court: 'Registergericht Zalaegerszeg',
    tax: 'Steuernummer', vat: 'USt-IdNr.', email: 'E-Mail', phone: 'Telefon',
    seatAddr: 'Berek utca 38., 8900 Zalaegerszeg, Ungarn', officeAddr: 'Kossuth Lajos u. 39., 8900 Zalaegerszeg, Ungarn',
    fullName: 'Vollständiger Firmenname', directors: 'Geschäftsführer', directorsNote: 'jeweils einzelvertretungsberechtigt',
    host: 'Hosting-Anbieter', hostAddr: '440 N Barranca Avenue #4133, Covina, CA 91723, USA',
    adr: 'Verbraucherschlichtungsstelle', adrAddr: 'Szent István út 10/A, 9021 Győr, Ungarn', web: 'Web',
  },
} as const;

export default async function ImpresszumPage() {
  const headerLang = ( await headers() ).get( 'x-site-language' );
  const c = COPY[ headerLang === 'en' || headerLang === 'de' ? headerLang : 'hu' ];

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold gradient-text">{c.title}</h1>

        <div className="mt-8 space-y-4 text-gray-300 leading-relaxed">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold">Pohánka és Társa Kft.</div>
            <div>{c.fullName}: Pohánka és Társa Könyvelő Iroda Korlátolt Felelősségű Társaság</div>
            <div>{c.directors}: Pohánka Józsefné, Pohánka József ({c.directorsNote})</div>
            <div>{c.seat}: {c.seatAddr}</div>
            <div>{c.office}: {c.officeAddr}</div>
            <div>{c.reg}: 20-09-069482 ({c.court})</div>
            <div>{c.tax}: 14728864-2-20</div>
            <div>{c.vat}: HU14728864</div>
            <div>{c.email}: info@pohankaestarsa.com</div>
            <div>{c.phone}: +36 30 429 1227</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold">{c.host}</div>
            <div>Vercel Inc., {c.hostAddr}</div>
            <div>{c.email}: privacy@vercel.com</div>
            <div>{c.web}: https://vercel.com</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold">{c.adr}</div>
            <div>Győr-Moson-Sopron Vármegyei Békéltető Testület</div>
            <div>{c.adrAddr}</div>
            <div>{c.phone}: +36 96 520 200</div>
            <div>{c.email}: bekelteto.testulet@gymsmkik.hu</div>
            <div>{c.web}: https://bekeltetesgyor.hu</div>
          </div>
        </div>
      </div>
    </main>
  );
}
