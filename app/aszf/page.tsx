import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { renderMarkdownToHtml } from '../../lib/markdown';
import { ASZF, type AszfLang } from './content';
import styles from './aszf.module.css';

export const metadata: Metadata = {
  title: 'ÁSZF',
  description: 'Általános Szerződési Feltételek (ÁSZF) – Pohánka és Társa Kft.',
  alternates: {
    canonical: '/aszf'
  }
};

// The approved ÁSZF (Péter, Telegram 12456; Marveen 5829), rendered from its markdown word for word
// (app/aszf/content.ts, generated). Only the look is the page's: the source's "###" sections follow the
// "#" title directly, so they are drawn as h2 (heading levels must not skip one). /en/aszf and /de/aszf
// render this page too; a language without its translation yet shows the Hungarian text.
async function aszfHtml(lang: AszfLang) {
  const doc = ASZF[lang] ?? ASZF.hu!;
  // a line that starts with a number and a dot ("- 2024. január 1-jétől …") would become a numbered list
  // and the number its hidden marker: escaped, it stays text
  const html = await renderMarkdownToHtml(doc.markdown.replace(/^(\s*(?:[-*]\s+)?)(\d+)\. /gm, '$1$2\\. '));
  return { lang: ASZF[lang] ? lang : 'hu', html: html.replace(/<(\/?)h3>/g, '<$1h2>').replace('<h1>', '<h1 class="text-4xl font-extrabold gradient-text">') };
}

export default async function AszfPage() {
  const headerLang = ( await headers() ).get( 'x-site-language' );
  const { lang, html } = await aszfHtml( headerLang === 'en' || headerLang === 'de' ? headerLang : 'hu' );

  return (
    // a div, not a second <main>: the layout's #main-content is the page's main landmark
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-6">
      <div lang={ lang } data-testid="aszf-doc" className={ `max-w-3xl mx-auto ${ styles.doc }` } dangerouslySetInnerHTML={ { __html: html } } />
    </div>
  );
}
