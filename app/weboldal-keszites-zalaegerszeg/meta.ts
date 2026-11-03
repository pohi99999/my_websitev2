import type { Metadata } from 'next';
import { ogImageFor } from '../lib/ogImage';

// Metadata of the Hungarian-only local SEO page, kept apart from page.tsx (as app/labor/meta.ts): the
// share-image route reads it through localizedRouteMeta, which the /en and /de homepage also imports.

const PAGE_URL = 'https://www.pohankaestarsa.com/weboldal-keszites-zalaegerszeg';

export const metadata: Metadata = {
  title: 'Weboldal készítés Zalaegerszeg',
  description:
    'Weboldal készítés Zalaegerszegen és Zala megyében: bemutatkozó weboldal 150 000 Ft + áfa egyszeri díjért, két hét alatt, online foglalással is.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Weboldal készítés Zalaegerszeg | Pohánka és Társa',
    description:
      'Bemutatkozó weboldal 150 000 Ft + áfa egyszeri díjért, két hét alatt; online időpontfoglalás és ajándékutalvány szalonoknak.',
    url: PAGE_URL,
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Pohánka és Társa',
    // the share image (app/og/[...slug]) draws this page's title; without it the layout's image was lost
    images: [{ url: ogImageFor('hu', '/weboldal-keszites-zalaegerszeg'), width: 1200, height: 630, alt: 'Weboldal készítés Zalaegerszeg' }],
  },
  // the same image on X (the layout sets none, and the root twitter-image would be the generic card)
  twitter: {
    card: 'summary_large_image',
    title: 'Weboldal készítés Zalaegerszeg | Pohánka és Társa',
    images: [ogImageFor('hu', '/weboldal-keszites-zalaegerszeg')],
  },
};
