import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Impresszum',
  description: 'Céginformációk és elérhetőségek – Pohánka és Társa Kft.',
};

// Company data from the company register extract (cégkivonat, CK 5/1, 21/3, 49/1); the seat and the
// office as the owner put it (Telegram 11990, 2026-10-30): "a berek a székhely, a kossuth az iroda címe".
const COPY = {
  hu: {
    title: 'Impresszum', seat: 'Székhely', office: 'Iroda', reg: 'Cégjegyzékszám', court: 'Zalaegerszegi Törvényszék Cégbírósága',
    tax: 'Adószám', vat: 'Közösségi adószám', email: 'E-mail', phone: 'Telefon',
    seatAddr: '8900 Zalaegerszeg, Berek utca 38.', officeAddr: '8900 Zalaegerszeg, Kossuth Lajos u. 39.',
  },
  en: {
    title: 'Imprint', seat: 'Registered office', office: 'Office', reg: 'Company registration number', court: 'Registry Court of Zalaegerszeg',
    tax: 'Tax number', vat: 'EU VAT number', email: 'Email', phone: 'Phone',
    seatAddr: 'Berek utca 38., 8900 Zalaegerszeg, Hungary', officeAddr: 'Kossuth Lajos u. 39., 8900 Zalaegerszeg, Hungary',
  },
  de: {
    title: 'Impressum', seat: 'Firmensitz', office: 'Büro', reg: 'Handelsregisternummer', court: 'Registergericht Zalaegerszeg',
    tax: 'Steuernummer', vat: 'USt-IdNr.', email: 'E-Mail', phone: 'Telefon',
    seatAddr: 'Berek utca 38., 8900 Zalaegerszeg, Ungarn', officeAddr: 'Kossuth Lajos u. 39., 8900 Zalaegerszeg, Ungarn',
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
            <div>{c.seat}: {c.seatAddr}</div>
            <div>{c.office}: {c.officeAddr}</div>
            <div>{c.reg}: 20-09-069482 ({c.court})</div>
            <div>{c.tax}: 14728864-2-20</div>
            <div>{c.vat}: HU14728864</div>
            <div>{c.email}: peterpohankapersonal@gmail.com</div>
            <div>{c.phone}: +36 30 429 1227</div>
          </div>
        </div>
      </div>
    </main>
  );
}
