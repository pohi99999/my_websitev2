import type { Metadata } from 'next';
import PSearchPrivacy from '../PSearchPrivacy';

// Public on purpose (no noindex): Google Play links to this URL as the app's privacy policy.
export const metadata: Metadata = {
  title: 'P-Search – Adatvédelmi tájékoztató',
  description:
    'A P-Search (Pályázat Kereső) mobilalkalmazás adatvédelmi tájékoztatója: kezelt adatok, célok, jogalapok, adatfeldolgozók, megőrzési idők és az Ön jogai.',
  alternates: {
    canonical: '/p-search/adatvedelem',
    languages: {
      hu: '/p-search/adatvedelem',
      en: '/en/p-search/privacy',
      'x-default': '/p-search/adatvedelem',
    },
  },
};

export default function PSearchAdatvedelemPage() {
  return <PSearchPrivacy lang="hu" />;
}
