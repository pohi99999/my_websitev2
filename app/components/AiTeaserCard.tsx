'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';

const COPY = {
  hu: {
    title: 'Több kell, mint weboldal? Az ismétlődő adminisztrációt is átvesszük.',
    cta: 'Megnézem a szolgáltatásokat',
    href: '/szolgaltatasok',
  },
  en: {
    title: 'Need more than a website? We take over the repetitive admin too.',
    cta: 'See the services',
    href: '/en/szolgaltatasok',
  },
  de: {
    title: 'Mehr als eine Website nötig? Wir übernehmen auch die wiederkehrende Verwaltung.',
    cta: 'Leistungen ansehen',
    href: '/de/szolgaltatasok',
  },
};

export default function AiTeaserCard() {
  const { language } = useLanguage();
  const t = COPY[language as keyof typeof COPY] ?? COPY.hu;

  return (
    <section id="ai-folyamatok" className="relative bg-surface-0 px-6 py-16" data-testid="ai-teaser" style={{ background: 'rgba(0,0,0,0.82)' }}>
      <div className="surface-panel-premium mx-auto flex max-w-4xl flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <h2 className="heading-display text-2xl font-bold text-white md:text-3xl">{t.title}</h2>
        <Link
          href={t.href}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#00e5ff]/40 px-6 py-3 font-semibold text-[#00e5ff]"
          onClick={() => trackCtaClick({ location: CTA_LOCATIONS.AiWorkflowServices, language, target: t.href, page: PAGE_NAMES.Home })}
        >
          {t.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
