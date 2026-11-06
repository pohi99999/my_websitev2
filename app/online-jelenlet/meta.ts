import type { Metadata } from 'next';
import { ogImageFor } from '../lib/ogImage';

// Metadata of the Hungarian-only package page, kept apart from page.tsx (as the /labor and the local SEO
// page do): the share-image route reads it through localizedRouteMeta, which the /en and /de homepage imports.

const PAGE_URL = 'https://www.pohankaestarsa.com/online-jelenlet';
const TITLE = 'Online jelenlét induló csomag kisvállalkozóknak';
const DESCRIPTION =
  'Céges weboldal, Google Cégprofil és Facebook céges oldal, összekapcsolva. Weboldal 150 000 Ft + áfa, a másik kettő beállítása 30 000 Ft + áfa. Havi díj nincs.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${TITLE} | Pohánka és Társa`,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Pohánka és Társa',
    images: [{ url: ogImageFor('hu', '/online-jelenlet'), width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | Pohánka és Társa`,
    images: [ogImageFor('hu', '/online-jelenlet')],
  },
};
