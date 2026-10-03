import React from 'react';
import { PSEARCH_PRIVACY, PSEARCH_PRIVACY_META } from './privacyText';

type Lang = 'hu' | 'en';

type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] };

// The source is a small Markdown subset: ## headings, paragraphs, "- " lists and pipe tables.
function parse(body: string): Block[] {
  const blocks: Block[] = [];
  const lines = body.split('\n');
  let i = 0;
  const cells = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) });
      i++;
    } else if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) items.push(lines[i++].slice(2));
      blocks.push({ type: 'ul', items });
    } else if (line.startsWith('|')) {
      const head = cells(lines[i]);
      i += 2; // header row + |---| separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(cells(lines[i++]));
      blocks.push({ type: 'table', head, rows });
    } else {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(## |- |\|)/.test(lines[i])) parts.push(lines[i++]);
      blocks.push({ type: 'p', text: parts.join(' ') });
    }
  }
  return blocks;
}

const LINK = 'text-[#00e5ff] hover:underline break-words';

// **bold**, `code`, e-mail addresses, the phone number and www. addresses; the visible text is unchanged.
function inline(text: string): React.ReactNode[] {
  const re = /(\*\*[^*]+\*\*|`[^`]+`|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+36 30 429 1227|www\.[\w-]+\.[a-z]{2,})/g;
  return text.split(re).map((part, k) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={k} className="text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={k} className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-white break-words">{part.slice(1, -1)}</code>;
    }
    if (/^[\w.+-]+@/.test(part)) return <a key={k} href={`mailto:${part}`} className={LINK}>{part}</a>;
    if (part.startsWith('+36')) return <a key={k} href={`tel:${part.replace(/\s/g, '')}`} className={`${LINK} whitespace-nowrap`}>{part}</a>;
    if (part.startsWith('www.')) return <a key={k} href={`https://${part}`} className={LINK} rel="noopener noreferrer" target="_blank">{part}</a>;
    return <React.Fragment key={k}>{part}</React.Fragment>;
  });
}

function Placeholder({ children }: { children: string }) {
  return (
    <mark className="rounded bg-amber-300 px-1.5 py-0.5 font-bold text-slate-950" title="Helykitöltő / placeholder">
      {children}
    </mark>
  );
}

function MetaLine({ lang }: { lang: Lang }) {
  const { effective, version } = PSEARCH_PRIVACY_META;
  const date = effective ? effective[lang] : <Placeholder>{lang === 'hu' ? '[dátum]' : '[date]'}</Placeholder>;
  const ver = version ?? <Placeholder>{lang === 'hu' ? '[verziószám]' : '[version]'}</Placeholder>;
  return (
    <p className="mt-3 text-sm text-gray-400">
      <strong className="text-white">{lang === 'hu' ? 'Hatályos:' : 'Effective:'}</strong> {date} ·{' '}
      <strong className="text-white">{lang === 'hu' ? 'Verzió:' : 'Version:'}</strong> {ver}
    </p>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <>
      {/* phone: one card per row, every cell labelled with its column name */}
      <div className="mt-4 space-y-3 md:hidden">
        {rows.map((row) => (
          <dl key={row[0]} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            <dt className="sr-only">{head[0]}</dt>
            <dd className="font-semibold text-white">{inline(row[0])}</dd>
            {row.slice(1).map((cell, c) => (
              <div key={head[c + 1]} className="mt-2">
                <dt className="text-xs uppercase tracking-wide text-gray-500">{head[c + 1]}</dt>
                <dd className="text-gray-300">{inline(cell)}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
      {/* tablet and up: the table itself */}
      <div className="mt-4 hidden md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/20 text-left text-white">
              {head.map((h) => (
                <th key={h} scope="col" className="py-2 pr-4 align-bottom last:pr-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-white/10 align-top">
                {row.map((cell, c) => (
                  <td key={c} className={`py-3 pr-4 last:pr-0 ${c === 0 ? 'font-semibold text-white' : 'text-gray-300'}`}>
                    {inline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function PSearchPrivacy({ lang }: { lang: Lang }) {
  const { title, body } = PSEARCH_PRIVACY[lang];
  const blocks = parse(body);
  return (
    <main lang={lang} className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-6">
      <article className="max-w-3xl mx-auto text-gray-300 leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-extrabold gradient-text [text-wrap:balance]">{title}</h1>
        <MetaLine lang={lang} />
        {blocks.map((b, k) => {
          switch (b.type) {
            case 'h2':
              return <h2 key={k} className="mt-10 text-xl font-bold text-white">{b.text}</h2>;
            case 'p':
              return <p key={k} className="mt-4">{inline(b.text)}</p>;
            case 'ul':
              return (
                <ul key={k} className="mt-4 list-disc space-y-1 pl-5">
                  {b.items.map((item) => <li key={item}>{inline(item)}</li>)}
                </ul>
              );
            case 'table':
              return <Table key={k} head={b.head} rows={b.rows} />;
          }
        })}
      </article>
    </main>
  );
}
