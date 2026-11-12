import PrivacyNotice, { type Lang } from '../components/privacy/PrivacyNotice';
import { PSEARCH_PRIVACY, PSEARCH_PRIVACY_META } from './privacyText';

export default function PSearchPrivacy({ lang }: { lang: Lang }) {
  const { title, body } = PSEARCH_PRIVACY[lang];
  return <PrivacyNotice lang={lang} title={title} body={body} meta={PSEARCH_PRIVACY_META} />;
}
