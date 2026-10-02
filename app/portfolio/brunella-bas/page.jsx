import React from 'react';
import { headers } from 'next/headers';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import BrunellaBetaStory from '../../components/BrunellaBetaStory';
import BrunellaZoomImage from './BrunellaZoomImage';
import BrunellaDemoForm from './BrunellaDemoForm';
import { brunellaBetaContent, brunellaBetaImageSrcs } from './brunellaBetaContent';
import { brunellaPageContent, brunellaFaqShow } from './brunellaPageContent';
import { generatePortfolioMetadata } from '../../../utils/seo';
import {
  ArrowLeft, ArrowRight, Sun, Mail, LayoutGrid, Moon, Bot, Code2, Palette, Search,
  BarChart3, FileSearch, Compass, Target, Cpu, CheckCircle, ShieldCheck, Brain,
} from 'lucide-react';

// One layout for hu, en and de; every visible string comes from brunellaPageContent.js.
// Plan: Lumen's design plan, text: Stratéga's draft (Obsidian, 01_Projects, 2026-10-02). No prices.

const ICONS = { Sun, Mail, LayoutGrid, Moon, Bot, Code2, Palette, Search, BarChart3, FileSearch, Compass, Target, Cpu, CheckCircle, ShieldCheck, Brain };
const Icon = ({ name, className }) => {
  const C = ICONS[name] || Bot;
  return <C className={className} aria-hidden="true" />;
};

const UI = {
  hu: { open: 'Kép megnyitása', close: 'Bezárás' },
  en: { open: 'Open image', close: 'Close' },
  de: { open: 'Bild öffnen', close: 'Schließen' },
};

const LOCALE = { hu: 'hu_HU', en: 'en_US', de: 'de_DE' };
const pathFor = (lang) => (lang === 'hu' ? '/portfolio/brunella-bas' : `/${lang}/portfolio/brunella-bas`);

export async function generateMetadata() {
  const translations = Object.fromEntries(
    ['hu', 'en', 'de'].map((lang) => [lang, {
      title: brunellaPageContent[lang].meta.title,
      description: brunellaPageContent[lang].meta.description,
      canonical: pathFor(lang),
      locale: LOCALE[lang],
    }])
  );
  return generatePortfolioMetadata({ id: 'brunella-bas', translations, imageSrc: brunellaBetaImageSrcs[0] });
}

const h2Class = 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4';

export default async function BrunellaBASPage() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);
  const c = brunellaPageContent[language];
  const ui = UI[language];
  const img = (index) => brunellaBetaImageSrcs[index - 1];
  const faqItems = c.faq.items.filter((item) => brunellaFaqShow[item.id] !== false);
  const resourceHref = (href) => (href.startsWith('#') ? href : withLang(href));

  return (
    <div className="min-h-screen text-white">
      {/* S1 Hero */}
      <section className="relative px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {c.back}
            </Link>
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-5">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-300">
                  <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
                  {c.status}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-5">
                  {c.title}
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">{c.subtitle}</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href="#bemutato" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white transition-all hover:from-blue-500 hover:to-purple-500">
                    {c.ctaPrimary} <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a href="#egy-nap" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-gray-200 transition-colors hover:border-blue-400 hover:text-white">
                    {c.ctaSecondary}
                  </a>
                </div>
              </div>
              <div className="md:col-span-7">
                <BrunellaZoomImage src={img(c.heroImage.index)} alt={c.heroImage.alt} caption={c.heroImage.caption} openLabel={ui.open} closeLabel={ui.close} heightClass="h-64 md:h-96" priority />
              </div>
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* S2 A day with Brunella */}
      <section id="egy-nap" className="px-6 py-16 bg-white/5 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className={h2Class}>{c.day.title}</h2>
            <p className="text-gray-300 mb-10 max-w-3xl">{c.day.intro}</p>
          </GsapFadeIn>
          <ol className="relative grid gap-8 border-l border-white/10 pl-6 md:grid-cols-4 md:gap-6 md:border-l-0 md:border-t md:pl-0 md:pt-8">
            {c.day.steps.map((step, i) => (
              <li key={step.time} className="relative">
                <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 md:-top-[41px] md:left-0" aria-hidden="true" />
                <GsapFadeIn delay={0.08 * i}>
                  <div className="flex items-center gap-2 text-blue-300 font-semibold mb-2">
                    <Icon name={step.icon} className="w-5 h-5" /> {step.time}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{step.text}</p>
                </GsapFadeIn>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {c.day.images.map((im) => (
              <BrunellaZoomImage key={im.index} src={img(im.index)} alt={im.alt} caption={im.caption} openLabel={ui.open} closeLabel={ui.close} />
            ))}
          </div>
        </div>
      </section>

      {/* S3 The team */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className={h2Class}>{c.team.title}</h2>
          </GsapFadeIn>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {c.team.members.map((m) => (
              <li key={m.name} className={`min-w-0 rounded-2xl border p-4 ${m.reserve ? 'border-white/5 bg-white/[0.02] opacity-70' : 'border-white/10 bg-white/5'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={m.icon} className="w-5 h-5 text-blue-300" />
                  <span className="font-semibold text-white">{m.name}</span>
                  {m.reserve ? <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-xs text-gray-400">{c.team.reserveLabel}</span> : null}
                </div>
                <p className="text-sm text-gray-400 leading-snug break-words hyphens-auto">{m.role}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-gray-400">{c.team.note}</p>
        </div>
      </section>

      {/* S4 What it does, and what it doesn't */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className={h2Class}>{c.scope.title}</h2>
          </GsapFadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            <SpotlightCard className="p-6 h-full">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4"><Icon name={c.scope.does.icon} className="w-5 h-5 text-green-400" /> {c.scope.does.title}</h3>
              <ul className="space-y-2 text-gray-300">{c.scope.does.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </SpotlightCard>
            <SpotlightCard className="p-6 h-full">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4"><Icon name={c.scope.needsApproval.icon} className="w-5 h-5 text-amber-300" /> {c.scope.needsApproval.title}</h3>
              <ul className="space-y-2 text-gray-300">{c.scope.needsApproval.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <p className="mt-4 text-sm text-gray-400">{c.scope.needsApproval.note}</p>
            </SpotlightCard>
            <SpotlightCard className="p-6 h-full">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4"><Icon name={c.scope.remembers.icon} className="w-5 h-5 text-purple-300" /> {c.scope.remembers.title}</h3>
              <p className="text-gray-300 leading-relaxed">{c.scope.remembers.text}</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* S5 How it starts */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className={h2Class}>{c.start.title}</h2>
          </GsapFadeIn>
          <ol className="grid gap-6 md:grid-cols-4">
            {c.start.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold" aria-hidden="true">{i + 1}</span>
                <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* S6 Beta showcase (existing component and content) */}
      <section id="brunella-beta" className="px-6 py-16 bg-white/5 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <BrunellaBetaStory blocks={brunellaBetaContent[language] ?? brunellaBetaContent.hu} imageSrcs={brunellaBetaImageSrcs} />
        </div>
      </section>

      {/* S7 FAQ: native details/summary, works without JS and with a keyboard */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <GsapFadeIn>
            <h2 className={h2Class}>{c.faq.title}</h2>
          </GsapFadeIn>
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10">
            {faqItems.map((item) => (
              <details key={item.id} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                  {item.q}
                  <ArrowRight className="w-4 h-4 shrink-0 text-blue-300 transition-transform group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-gray-300 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* S8 Resources */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">{c.resources.title}</h2>
          <ul className="space-y-2">
            {c.resources.items.map((r) => (
              <li key={r.href}>
                <Link href={resourceHref(r.href)} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" /> {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* S9 Closing CTA with the demo form */}
      <section id="bemutato" className="px-6 pb-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <SpotlightCard className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{c.final.title}</h2>
            <BrunellaDemoForm t={c.final.form} privacyHref={withLang('/adatvedelmi-nyilatkozat')} />
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
}
