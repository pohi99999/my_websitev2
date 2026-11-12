import type { Metadata } from 'next';
import PrivacyNotice from '../../components/privacy/PrivacyNotice';
import { PSZAKRAJZ_PRIVACY, PSZAKRAJZ_PRIVACY_META } from '../privacyText';

// Public on purpose (no noindex): Google Play links to this URL as the app's privacy policy.
// Hungarian only, like the app itself; a static route under app/, so the /en and /de catch-alls never import it.
export const metadata: Metadata = {
  title: 'P-Szakrajz – Adatvédelmi tájékoztató',
  description:
    'A P-Szakrajz alkalmazás adatvédelmi tájékoztatója: milyen adat kerül ki a készülékről, hová, mi történik vele, és mi marad az Ön készülékén.',
  alternates: { canonical: '/p-szakrajz/adatvedelem' },
};

export default function PSzakrajzAdatvedelemPage() {
  return (
    <PrivacyNotice lang="hu" title={PSZAKRAJZ_PRIVACY.title} body={PSZAKRAJZ_PRIVACY.body} meta={PSZAKRAJZ_PRIVACY_META} />
  );
}
