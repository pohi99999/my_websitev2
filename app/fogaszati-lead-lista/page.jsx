import LeadListaClient from './LeadListaClient';

export const metadata = {
  title: 'Ingyenes Fogászati Lead Lista | 50 Budapesti Fogorvos | Pohánka AI',
  description:
    '50 budapesti fogorvosi rendelő AI-alapú digitális állapotfelmérése — weboldal, HTTPS, Google értékelések, digitális fájdalompontszám. Ingyenesen letölthető marketing ügynökségeknek.',
  alternates: { canonical: '/fogaszati-lead-lista' },
  openGraph: {
    title: 'Ingyenes Fogászati Lead Lista — 50 Budapesti Fogorvos',
    description: 'AI-alapú előminősített B2B lead lista ügynökségeknek. Weboldal állapot, HTTPS, értékelések, fájdalompontszám.',
    url: '/fogaszati-lead-lista',
    type: 'website',
    locale: 'hu_HU',
    images: [{ url: '/images/logo.png', alt: 'Pohánka AI Lead Lista' }],
  },
  robots: { index: true, follow: true },
};

export default function FogaszatiLeadListaPage() {
  return <LeadListaClient />;
}
