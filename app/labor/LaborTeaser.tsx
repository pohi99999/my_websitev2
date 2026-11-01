import Link from 'next/link';
import { headers } from 'next/headers';
import { ArrowRight } from 'lucide-react';
import styles from './teaser.module.css';

// The link to /labor at the bottom of the Portfolio page (card 0c1060b6, Marveen 5779: footer and
// Portfolio, not the main menu). A server component with its own CSS module, so the Portfolio page's
// client bundle and the shared stylesheet stay as they are.

const COPY = {
  hu: { kicker: 'Labor', title: 'A négy szolgáltatás, térben', body: 'Weboldal, automatizálás, alkalmazás és AI-csapat egy rendszerként, görgethető 3D-bemutatóban.', cta: 'Megnézem a Labort', href: '/labor' },
  en: { kicker: 'Lab', title: 'The four services, in 3D', body: 'Website, automation, apps and an AI team as one system, in a scrolling 3D showcase.', cta: 'Open the Lab', href: '/en/labor' },
  de: { kicker: 'Labor', title: 'Die vier Leistungen, in 3D', body: 'Website, Automatisierung, Apps und ein KI-Team als ein System, in einer scrollbaren 3D-Präsentation.', cta: 'Zum Labor', href: '/de/labor' },
} as const;

export default async function LaborTeaser() {
  const h = (await headers()).get('x-site-language');
  const c = COPY[h === 'en' ? 'en' : h === 'de' ? 'de' : 'hu'];
  return (
    <section className={styles.teaser} aria-labelledby="labor-teaser-title">
      <div className={styles.box}>
        <p className={styles.kicker}>{c.kicker}</p>
        <h2 id="labor-teaser-title" className={`heading-display ${styles.title}`}>{c.title}</h2>
        <p className={styles.body}>{c.body}</p>
        <Link href={c.href} className={styles.cta}>
          {c.cta} <ArrowRight className={styles.icon} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
