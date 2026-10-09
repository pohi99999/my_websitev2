"use client";

import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BASE_PRICE } from '../lib/basePrice';

/*
 * Árcsomag (Péter döntése, Telegram 4311, 2026-09-23). Csak a jóváhagyott tételek:
 * egy konkrét ár (alapcsomag), a bővítmény "egyedi ajánlat szerint", a karbantartás
 * összeg nélkül. Számot kitalálni tilos -- ha Péter árat ad a bővítményre vagy a
 * karbantartásra, az ide kerül, máshova nem.
 * EN/DE: Péter 2026-10-05 (6328, kártya b6ca4d9a); az ár Ft-ban marad, a szöveg Stratégával egyeztetve.
 */

type Lang = 'hu' | 'en' | 'de';

const COPY: Record<Lang, {
  heading: string; base: string; price: string; gross: string; items: string[]; addon: string; addonDesc: string; addonPrice: string;
  reference: string; care: string; careDesc: string; optional: string; details: boolean; contact: string;
}> = {
  hu: {
    heading: 'Árcsomag',
    base: 'Alapcsomag',
    price: BASE_PRICE.hu,
    gross: 'bruttó, egyszeri',
    items: [
      'Bemutatkozó weboldal',
      'Telefonon és laptopon',
      'Magyar + angol',
      'Két hét átfutás',
      'A tulajdonos maga szerkeszti a szövegeket, árakat, galériát',
    ],
    addon: 'Bővítmény',
    addonDesc: 'Online időpontfoglalás + bankkártyás előleg vagy ajándékutalvány',
    // Péter 2026-10-05 (6299): the hero promises a fixed price, so the add-on says the quote fixes it
    addonPrice: 'Egyedi ajánlat, az árat előre, fixen rögzítjük az ajánlatban.',
    reference: 'Referencia:',
    care: 'Karbantartás',
    careDesc: 'Karbantartás és tartalomfrissítés, igény szerint',
    optional: 'Opcionális',
    details: true,
    contact: 'Kapcsolat',
  },
  en: {
    heading: 'Pricing',
    base: 'Base package',
    price: BASE_PRICE.en,
    gross: 'incl. VAT, one-off payment',
    items: [
      'Business website',
      'On phone and laptop',
      'Hungarian + English',
      'Ready in two weeks',
      'You edit the texts, prices and gallery yourself',
    ],
    addon: 'Add-on',
    addonDesc: 'Online booking with card deposit, or gift vouchers',
    addonPrice: 'Priced individually: the price is fixed up front in your quote.',
    reference: 'Reference:',
    care: 'Maintenance',
    careDesc: 'Maintenance and content updates, as needed',
    optional: 'Optional',
    // the FAQ page (/weboldal-keszites-zalaegerszeg) exists in Hungarian only
    details: false,
    contact: 'Free consultation',
  },
  de: {
    heading: 'Preise',
    base: 'Basispaket',
    price: BASE_PRICE.de,
    gross: 'inkl. MwSt., einmalig',
    items: [
      'Unternehmenswebsite',
      'Auf Handy und Laptop',
      'Ungarisch + Englisch',
      'Umsetzung in zwei Wochen',
      'Texte, Preise und Galerie bearbeiten Sie selbst',
    ],
    addon: 'Erweiterung',
    addonDesc: 'Online-Terminbuchung mit Anzahlung per Karte oder Geschenkgutschein',
    addonPrice: 'Individuelles Angebot: Der Preis wird vorab verbindlich im Angebot festgelegt.',
    reference: 'Referenz:',
    care: 'Wartung',
    careDesc: 'Wartung und Inhaltspflege nach Bedarf',
    optional: 'Optional',
    details: false,
    contact: 'Kostenlose Beratung',
  },
};

// Also shown on /weboldal-ai-kkv (Péter 6312: one price block, one source); there is no #contact
// section on that page, so its button goes to the contact page.
export default function Arcsomag ( { contactHref = '#contact' }: { contactHref?: string } = {} )
{
  const { language } = useLanguage();
  const c = COPY[ language === 'en' || language === 'de' ? language : 'hu' ];
  // a page path gets the language prefix (/en/kapcsolat); an in-page anchor (#contact) stays as is
  const contactLink = contactHref.startsWith( '/' ) && ( language === 'en' || language === 'de' ) ? `/${ language }${ contactHref }` : contactHref;

  return (
    <section
      id="arcsomag"
      aria-labelledby="arcsomag-heading"
      className="scroll-mt-24 py-24 relative overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.82)' }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 id="arcsomag-heading" className="text-center text-3xl md:text-5xl font-bold text-white mb-12 font-syne">
          { c.heading }
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {/* Alapcsomag: az egyetlen konkrét ár, ezért ez a kiemelt kártya. */}
          <article className="flex flex-col border border-[#00e5ff]/40 bg-[#0c0c10] p-6 md:p-8 lg:row-span-1">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff]">{ c.base }</h3>
            {/* the price must fit the card: "HUF 150,000" ran past it at 1280 px, and every language at 1024 px (three narrow columns) */}
            <p className={ `mt-4 ${ c.price.length > 10 ? 'text-4xl lg:text-[1.75rem] xl:text-4xl' : 'text-4xl md:text-5xl lg:text-[1.75rem] xl:text-5xl' } font-bold text-white font-syne tabular-nums` }>
              { c.price }
            </p>
            <p className="mt-1 text-gray-400 text-sm">{ c.gross }</p>
            <ul className="mt-6 space-y-3">
              {c.items.map( ( item ) => (
                <li key={item} className="flex gap-3 text-gray-200 text-sm leading-relaxed">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#00e5ff]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ) )}
            </ul>
          </article>

          <article className="flex flex-col border border-white/10 bg-[#0c0c10] p-6 md:p-8">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-300">{ c.addon }</h3>
            <p className="mt-4 text-lg text-white leading-snug">{ c.addonDesc }</p>
            <p className="mt-3 text-[#00e5ff] font-semibold">{ c.addonPrice }</p>
            <p className="mt-auto pt-6 text-gray-400 text-sm">
              { c.reference }{' '}
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
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-300">{ c.care }</h3>
            <p className="mt-4 text-lg text-white leading-snug">{ c.careDesc }</p>
            <p className="mt-3 text-gray-400 text-sm">{ c.optional }</p>
          </article>
        </div>

        { c.details ? (
          <p className="mt-8 text-center text-gray-400 text-sm">
            Részletek és gyakori kérdések:{' '}
            <a href="/weboldal-keszites-zalaegerszeg" className="text-[#00e5ff] hover:underline">
              weboldal készítés Zalaegerszegen
            </a>
          </p>
        ) : null }

        <div className="mt-10 text-center">
          <a
            href={ contactLink }
            className="inline-flex items-center rounded-full border border-[#00e5ff]/60 bg-[#00e5ff]/10 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#00e5ff] transition-colors duration-300 hover:border-[#00e5ff] hover:bg-[#00e5ff]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00e5ff]"
          >
            { c.contact }
          </a>
        </div>
      </div>
    </section>
  );
}
