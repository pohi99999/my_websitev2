import type { Metadata } from 'next';
import PSearchPrivacy from '../../../p-search/PSearchPrivacy';

// Public on purpose (no noindex): Google Play links to this URL as the app's privacy policy.
// A static route, so it wins over the /en/[[...slug]] catch-all.
export const metadata: Metadata = {
  title: 'P-Search – Privacy Policy',
  description:
    'Privacy policy of the P-Search (Grant Finder) mobile app: what personal data we process, why, on what legal basis, who processes it, how long we keep it, and your rights.',
  alternates: {
    canonical: '/en/p-search/privacy',
    languages: {
      hu: '/p-search/adatvedelem',
      en: '/en/p-search/privacy',
      'x-default': '/p-search/adatvedelem',
    },
  },
};

export default function PSearchPrivacyPage() {
  return <PSearchPrivacy lang="en" />;
}
