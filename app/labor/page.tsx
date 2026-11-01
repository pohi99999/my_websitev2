import Link from 'next/link';
import { headers } from 'next/headers';
import { ArrowRight } from 'lucide-react';
import LaborScene from './LaborScene';
import LaborPoster from './LaborPoster';
import styles from './labor.module.css';

// metadata in its own module (no client imports): localizedRouteMeta imports it for the share image, and
// pulling this page in there put its client components into the /en and /de homepage JS
export { generateMetadata } from './meta';

// /labor (card 0c1060b6, Péter 10-30 + 11-01, visual approved 11-01): the 3D showcase of the four
// service lines, on its own page so the homepage's bundle and LCP stay untouched. Everything a visitor
// needs is the HTML below; the poster stills and the 3D canvas behind it are decoration. The scene
// loads after the page's load event and only on capable desktops (LaborScene). The four service texts
// and links are the homepage's ServiceCards ones. All styling is in labor.module.css, so nothing of
// this page reaches the shared stylesheet.

type Lang = 'hu' | 'en' | 'de';

const COPY: Record<Lang, {
  kicker: string; title: string; titleAccent: string; lead: string; scroll: string;
  steps: { title: string; body: string; href: string }[];
  more: string; outroTitle: string; outroBody: string; cta: string; ctaHref: string;
}> = {
  hu: {
    kicker: 'Labor',
    title: 'Négy modul,',
    titleAccent: 'egy rendszer.',
    lead: 'Weboldal, automatizálás, alkalmazás és AI-csapat. Nálunk ezek nem különálló eszközök: egy rendszerként dolgoznak az Ön vállalkozásában.',
    scroll: 'Görgessen tovább',
    steps: [
      { title: 'Weboldal és foglalás', body: 'Weboldal időpontfoglalással vagy ajánlatkérő űrlappal, két hét alatt, fix áron.', href: '/weboldal-ai-kkv' },
      { title: 'Folyamat-automatizálás', body: 'Az ajánlatkérés, a nyilvántartás, a válaszlevél és a számla közötti kézi lépéseket automatizáljuk.', href: '/szolgaltatasok' },
      { title: 'Web- és mobilalkalmazás', body: 'Egyedi webes alkalmazás, portál vagy webáruház, projektalapon. Példa: a P-Szakrajz webalkalmazás.', href: '/portfolio' },
      { title: 'AI-csapat (Brunella)', body: 'A cég saját gépén futó AI-csapat levelekre, ajánlatkövetésre és napi összefoglalóra. Amit kifelé küldene, azt Ön hagyja jóvá.', href: '/portfolio/brunella-bas' },
    ],
    more: 'Részletek',
    outroTitle: 'Ugyanaz a rendszer, az Ön vállalkozására szabva.',
    outroBody: 'Az első konzultáció ingyenes: megnézzük, melyik modullal érdemes kezdeni.',
    cta: 'Kérek ingyenes konzultációt',
    ctaHref: '/kapcsolat',
  },
  en: {
    kicker: 'Lab',
    title: 'Four modules,',
    titleAccent: 'one system.',
    lead: 'Website, automation, apps and an AI team. With us they are not separate tools: they work as one system in your business.',
    scroll: 'Keep scrolling',
    steps: [
      { title: 'Website and booking', body: 'A website with online booking or a quote request form, ready in two weeks at a fixed price.', href: '/en/weboldal-ai-kkv' },
      { title: 'Workflow automation', body: 'We automate the manual steps between a quote request, your records, the reply and the invoice.', href: '/en/szolgaltatasok' },
      { title: 'Web and mobile apps', body: 'Custom web apps, portals or online shops, built per project. Example: the P-Szakrajz web app.', href: '/en/portfolio' },
      { title: 'AI team (Brunella)', body: "An AI team running on your company's own computer for emails, quote follow-up and a daily summary. Anything it would send out is approved by you first.", href: '/en/portfolio/brunella-bas' },
    ],
    more: 'Details',
    outroTitle: 'The same system, tailored to your business.',
    outroBody: 'The first consultation is free: we look at which module to start with.',
    cta: 'Book a free consultation',
    ctaHref: '/en/kapcsolat',
  },
  de: {
    kicker: 'Labor',
    title: 'Vier Module,',
    titleAccent: 'ein System.',
    lead: 'Website, Automatisierung, Apps und ein KI-Team. Bei uns sind das keine Einzelwerkzeuge: Sie arbeiten als ein System in Ihrem Unternehmen.',
    scroll: 'Weiter scrollen',
    steps: [
      { title: 'Website und Buchung', body: 'Eine Website mit Online-Buchung oder Anfrageformular, in zwei Wochen zum Festpreis.', href: '/de/weboldal-ai-kkv' },
      { title: 'Prozess\u00ADautomatisierung', body: 'Wir automatisieren die manuellen Schritte zwischen Anfrage, Erfassung, Antwort und Rechnung.', href: '/de/szolgaltatasok' },
      { title: 'Web- und Mobile-Apps', body: 'Individuelle Web-Apps, Portale oder Onlineshops, projektbezogen. Beispiel: die Web-App P-Szakrajz.', href: '/de/portfolio' },
      { title: 'KI-Team (Brunella)', body: 'Ein KI-Team auf dem eigenen Rechner Ihres Unternehmens für E-Mails, Angebotsverfolgung und eine tägliche Zusammenfassung. Was nach außen geht, geben Sie vorher frei.', href: '/de/portfolio/brunella-bas' },
    ],
    more: 'Details',
    outroTitle: 'Dasselbe System, auf Ihr Unternehmen zugeschnitten.',
    outroBody: 'Das erste Gespräch ist kostenlos: Wir schauen, mit welchem Modul Sie am besten beginnen.',
    cta: 'Kostenloses Gespräch anfragen',
    ctaHref: '/de/kapcsolat',
  },
};

async function pageLanguage(): Promise<Lang> {
  const h = (await headers()).get('x-site-language');
  return h === 'en' ? 'en' : h === 'de' ? 'de' : 'hu';
}


export default async function LaborPage() {
  const lang = await pageLanguage();
  const c = COPY[lang];
  return (
    <div className={styles.page}>
      <div aria-hidden="true" className={styles.backdrop} />
      <LaborPoster />
      <LaborScene />

      <section data-labor-step="0" className={`${styles.step} ${styles.hero}`}>
        <div className={styles.inner}>
          <p className={`hud-badge ${styles.kicker}`}>{c.kicker}</p>
          <h1 className={`heading-display ${styles.title}`}>
            {c.title}
            <br />
            <span className={styles.accent}>{c.titleAccent}</span>
          </h1>
          <p className={styles.lead}>{c.lead}</p>
          <p aria-hidden="true" className={styles.scroll}>{c.scroll} ↓</p>
        </div>
      </section>

      {c.steps.map((s, i) => (
        <section key={s.href} data-labor-step={i + 1} className={`${styles.step} ${styles.module}`}>
          <div className={`${styles.inner} ${i % 2 === 0 ? styles.right : styles.left}`}>
            <article className={styles.card}>
              <p className={styles.index}>{String(i + 1).padStart(2, '0')} / 04</p>
              <h2 className={`heading-display ${styles.cardTitle}`}>{s.title}</h2>
              <p className={styles.cardBody}>{s.body}</p>
              <Link href={s.href} className={styles.more}>
                {c.more}
                {/* the four links share one word; screen readers list them with the service name */}
                <span className="sr-only">: {s.title}</span>
                <ArrowRight className={styles.icon} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </section>
      ))}

      <section data-labor-step="5" className={`${styles.step} ${styles.outro}`}>
        <div className={`${styles.inner} ${styles.center}`}>
          <h2 className={`heading-display ${styles.outroTitle}`}>{c.outroTitle}</h2>
          <p className={styles.outroBody}>{c.outroBody}</p>
          <Link href={c.ctaHref} className={styles.cta}>
            {c.cta} <ArrowRight className={styles.icon} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
