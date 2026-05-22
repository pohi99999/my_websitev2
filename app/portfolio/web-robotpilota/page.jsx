import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { headers } from 'next/headers';
import {
  ArrowLeft, ArrowRight, CheckCircle, Bot, Globe, Zap,
  Clock, Shield, ShoppingCart, Home, Users, Database, Monitor, Settings
} from 'lucide-react';

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Web Autopilot — AI Browser Automation | Pohánka AI',
          description: 'AI-driven browser automation for scraping, form filling and monitoring, running 24/7.',
          canonical: '/en/portfolio/web-robotpilota',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Web-Robotpilot — KI-Browser-Automatisierung | Pohánka AI',
          description: 'KI-gestützte Browser-Automatisierung für Datenerfassung, Formulare und Monitoring, 24/7.',
          canonical: '/de/portfolio/web-robotpilota',
          locale: 'de_DE',
        }
      : {
          title: 'Web Robotpilóta — AI Böngésző Automatizáció | Pohánka AI',
          description:
            'AI-vezérelt böngésző automatizáció: adatgyűjtés, form kitöltés, versenytárs monitoring — emberi felügyelet nélkül, 0-24-ben.',
          canonical: '/portfolio/web-robotpilota',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/portfolio/web-robotpilota',
        en: '/en/portfolio/web-robotpilota',
        de: '/de/portfolio/web-robotpilota',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'article',
      locale: meta.locale,
    },
  };
}

const useCases = [
  { icon: ShoppingCart, color: 'text-cyan-400', title: 'Versenytárs Ár Monitoring', desc: '5 webshop, 500 termék — árak és készlet automatikus összehasonlítása naponta.', result: 'Átlag 15% jobb árazás' },
  { icon: Home, color: 'text-emerald-400', title: 'Ingatlan Figyelő', desc: 'Ingatlan.com és jofogás.hu új hirdetések automatikus letöltése szűrők alapján.', result: '10x gyorsabb reakció' },
  { icon: Users, color: 'text-purple-400', title: 'HR & Toborzás', desc: 'LinkedIn és Profession.hu álláshirdetések + CV-k automatikus gyűjtése.', result: 'HR csapat 60%-kal kevesebb munkája' },
  { icon: Database, color: 'text-orange-400', title: 'Adatgyűjtés & Scraping', desc: 'Bármilyen weboldalról strukturált adat letöltése: cégadatok, termékek, árlisták.', result: 'Percek alatt ezer adat' },
  { icon: Monitor, color: 'text-blue-400', title: 'Weboldal Monitoring', desc: 'Versenytársak vagy saját oldal figyelése: tartalom változás, leállás, SEO változások.', result: 'Azonnali értesítés ha valami változik' },
  { icon: Settings, color: 'text-pink-400', title: 'Form Kitöltés & Tesztelés', desc: 'Automatikus űrlap kitöltés, regisztráció teszt, checkout flow ellenőrzés.', result: 'QA és outreach automatizálva' },
];

const pricingPlans = [
  { name: 'Eseti', price: '5.000 Ft', period: '/feladat', features: ['1 konkrét feladat', 'Eredmény 24h-n belül', 'Email riport'], color: 'border-slate-600', highlight: false },
  { name: 'Starter', price: '14.990 Ft', period: '/hó', features: ['10 feladat/hó', 'Havi riport', 'Email támogatás', 'Ütemezett futtatás'], color: 'border-cyan-500/50', highlight: false },
  { name: 'Business', price: '29.000 Ft', period: '/hó', features: ['Korlátlan feladat', 'Prioritásos végrehajtás', 'Heti riport', 'Telefon támogatás'], color: 'border-cyan-400', highlight: true },
  { name: 'Enterprise', price: '59.000 Ft', period: '/hó', features: ['Dedikált bot', 'Egyedi automatizáció', 'API hozzáférés', 'SLA garancia'], color: 'border-purple-500/50', highlight: false }
];

const stats = [
  { value: '0-24', label: 'Éjjel-nappal fut', icon: Clock, color: 'text-cyan-400' },
  { value: '500+', label: 'Oldal támogatva', icon: Globe, color: 'text-emerald-400' },
  { value: '99.5%', label: 'Megbízhatóság', icon: Shield, color: 'text-green-400' },
  { value: '<5mp', label: 'Átlag feladat idő', icon: Zap, color: 'text-orange-400' },
];

export default async function WebRobotpilotaPage() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);

  if (language !== 'hu') {
    const ui =
      language === 'en'
        ? {
            back: 'Back to Portfolio',
            badge: 'Automation',
            available: '🟢 Available now',
            title: 'Web Autopilot',
            tagline: 'AI-driven browser automation — your personal web robot',
            subtitle: 'We handle any web task with a robot — data collection, form filling, competitor monitoring — without human supervision, 24/7. First task FREE.',
            statsLabel: ['runs around the clock', 'supported sites', 'reliability', 'avg. task time'],
            useCasesTitle: 'What can you use it for?',
            useCases: [
              { title: 'Competitor Price Monitoring', desc: '5 webshops, 500 products — automatic daily price and stock comparison.', result: 'Avg. 15% better pricing' },
              { title: 'Property Listing Tracker', desc: 'Auto-download new real estate listings matching your filters from listing sites.', result: '10× faster market response' },
              { title: 'HR & Recruitment', desc: 'Automatic collection of job postings and CVs from LinkedIn and job boards.', result: '60% less HR team effort' },
              { title: 'Data Collection & Scraping', desc: 'Structured data download from any website: company data, products, price lists.', result: 'Thousands of records in minutes' },
              { title: 'Website Monitoring', desc: 'Monitor competitors or your own site: content changes, downtime, SEO shifts.', result: 'Instant alert when something changes' },
              { title: 'Form Filling & Testing', desc: 'Automated form submission, registration testing, checkout flow verification.', result: 'QA and outreach automated' },
            ],
            howTitle: 'How it works',
            howSteps: [
              { step: '1', title: 'Tell it what to do', desc: 'Describe the task in plain text — e.g. "collect my 5 competitors\' prices every day"', color: 'text-cyan-400', bg: 'bg-cyan-900/30' },
              { step: '2', title: 'The robot executes', desc: 'The Playwright + AI hybrid system opens a browser and carries out the task automatically.', color: 'text-blue-400', bg: 'bg-blue-900/30' },
              { step: '3', title: 'You receive the result', desc: 'Structured data via email, Google Sheets or API — however is most convenient for you.', color: 'text-purple-400', bg: 'bg-purple-900/30' },
            ],
            pricingTitle: 'Pricing',
            pricingNote: 'Choose the plan that fits you best',
            pricingPopular: 'POPULAR',
            plans: [
              { name: 'One-off', price: '5,000 HUF', period: '/task', features: ['1 specific task', 'Result within 24h', 'Email report'], highlight: false, color: 'border-slate-600' },
              { name: 'Starter', price: '14,990 HUF', period: '/mo', features: ['10 tasks/mo', 'Monthly report', 'Email support', 'Scheduled runs'], highlight: false, color: 'border-cyan-500/50' },
              { name: 'Business', price: '29,000 HUF', period: '/mo', features: ['Unlimited tasks', 'Priority execution', 'Weekly report', 'Phone support'], highlight: true, color: 'border-cyan-400' },
              { name: 'Enterprise', price: '59,000 HUF', period: '/mo', features: ['Dedicated bot', 'Custom automation', 'API access', 'SLA guarantee'], highlight: false, color: 'border-purple-500/50' },
            ],
            ctaBtn: 'Request free demo task',
            ctaTitle: 'Try it FREE',
            ctaBody: 'The first task is on us — describe what your robot should do and receive the result within 24 hours.',
          }
        : {
            back: 'Zurück zum Portfolio',
            badge: 'Automatisierung',
            available: '🟢 Sofort verfügbar',
            title: 'Web-Robotpilot',
            tagline: 'KI-gestützte Browser-Automatisierung — Ihr persönlicher Web-Roboter',
            subtitle: 'Wir erledigen beliebige Web-Aufgaben mit einem Roboter — Datenerfassung, Formulare, Wettbewerbs-Monitoring — ohne menschliche Aufsicht, 24/7. Erste Aufgabe KOSTENLOS.',
            statsLabel: ['rund um die Uhr aktiv', 'unterstützte Seiten', 'Zuverlässigkeit', 'Ø Aufgabenzeit'],
            useCasesTitle: 'Wofür können Sie es nutzen?',
            useCases: [
              { title: 'Wettbewerbspreis-Monitoring', desc: '5 Webshops, 500 Produkte — automatischer täglicher Preis- und Lagervergleich.', result: 'Ø 15% bessere Preisgestaltung' },
              { title: 'Immobilien-Inserat-Tracker', desc: 'Automatischer Download neuer Immobilieninserate nach Ihren Filtern von Portalen.', result: '10× schnellere Marktreaktion' },
              { title: 'HR & Recruiting', desc: 'Automatische Sammlung von Stellenanzeigen und Lebensläufen von LinkedIn und Jobbörsen.', result: '60% weniger HR-Aufwand' },
              { title: 'Datenerfassung & Scraping', desc: 'Strukturierter Daten-Download von beliebigen Websites: Firmendaten, Produkte, Preislisten.', result: 'Tausende Datensätze in Minuten' },
              { title: 'Website-Monitoring', desc: 'Wettbewerber oder eigene Seite beobachten: Inhaltsänderungen, Ausfälle, SEO-Verschiebungen.', result: 'Sofortbenachrichtigung bei Änderungen' },
              { title: 'Formular-Ausfüllung & Testing', desc: 'Automatisierte Formularabgabe, Registrierungstests, Checkout-Flow-Prüfung.', result: 'QA und Outreach automatisiert' },
            ],
            howTitle: 'Wie funktioniert es?',
            howSteps: [
              { step: '1', title: 'Aufgabe beschreiben', desc: 'Beschreiben Sie die Aufgabe in Klartext — z. B. „Sammle täglich die Preise meiner 5 Wettbewerber"', color: 'text-cyan-400', bg: 'bg-cyan-900/30' },
              { step: '2', title: 'Roboter führt aus', desc: 'Das Playwright + KI-Hybrid-System öffnet einen Browser und erledigt die Aufgabe vollautomatisch.', color: 'text-blue-400', bg: 'bg-blue-900/30' },
              { step: '3', title: 'Ergebnis erhalten', desc: 'Strukturierte Daten per E-Mail, Google Sheets oder API — so wie es Ihnen am besten passt.', color: 'text-purple-400', bg: 'bg-purple-900/30' },
            ],
            pricingTitle: 'Preise',
            pricingNote: 'Wählen Sie das passende Paket',
            pricingPopular: 'BELIEBT',
            plans: [
              { name: 'Einzelauftrag', price: '5.000 HUF', period: '/Aufgabe', features: ['1 konkrete Aufgabe', 'Ergebnis in 24h', 'E-Mail-Bericht'], highlight: false, color: 'border-slate-600' },
              { name: 'Starter', price: '14.990 HUF', period: '/Mo.', features: ['10 Aufgaben/Mo.', 'Monatsbericht', 'E-Mail-Support', 'Geplante Ausführung'], highlight: false, color: 'border-cyan-500/50' },
              { name: 'Business', price: '29.000 HUF', period: '/Mo.', features: ['Unbegrenzte Aufgaben', 'Prioritätsausführung', 'Wochenbericht', 'Telefon-Support'], highlight: true, color: 'border-cyan-400' },
              { name: 'Enterprise', price: '59.000 HUF', period: '/Mo.', features: ['Dedizierter Bot', 'Individuelle Automatisierung', 'API-Zugang', 'SLA-Garantie'], highlight: false, color: 'border-purple-500/50' },
            ],
            ctaBtn: 'Kostenlose Demo-Aufgabe anfragen',
            ctaTitle: 'Kostenlos ausprobieren',
            ctaBody: 'Die erste Aufgabe ist gratis — beschreiben Sie, was Ihr Roboter tun soll, und erhalten Sie das Ergebnis binnen 24 Stunden.',
          };

    const localUseCaseIcons = [
      { icon: ShoppingCart, color: 'text-cyan-400' },
      { icon: Home, color: 'text-emerald-400' },
      { icon: Users, color: 'text-purple-400' },
      { icon: Database, color: 'text-orange-400' },
      { icon: Monitor, color: 'text-blue-400' },
      { icon: Settings, color: 'text-pink-400' },
    ];

    const localStats = [
      { value: '24/7', icon: Clock, color: 'text-cyan-400' },
      { value: '500+', icon: Globe, color: 'text-emerald-400' },
      { value: '99.5%', icon: Shield, color: 'text-green-400' },
      { value: '<5s', icon: Zap, color: 'text-orange-400' },
    ];

    return (
      <div className="min-h-screen text-white">
        {/* Hero */}
        <section className="relative py-12 px-6 pt-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn>
              <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> {ui.back}</Link>
              <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                <div className="shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-900/40"><Bot className="w-12 h-12 text-white" /></div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm border border-cyan-500/30">{ui.badge}</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-500/30">{ui.available}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">{ui.title}</h1>
                  <p className="text-gray-400 text-sm">{ui.tagline}</p>
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{ui.subtitle}</p>
            </GsapFadeIn>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {localStats.map((s, i) => { const Icon = s.icon; return (
              <GsapFadeIn key={i} delay={0.1 * i}><SpotlightCard className="p-6 text-center"><Icon className={`w-6 h-6 mx-auto mb-3 ${s.color}`} /><div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div><div className="text-gray-400 text-sm">{ui.statsLabel[i]}</div></SpotlightCard></GsapFadeIn>
            ); })}
          </div>
        </section>

        {/* Use cases */}
        <section className="px-6 py-16 bg-white/5">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn><h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{ui.useCasesTitle}</h2></GsapFadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ui.useCases.map((uc, i) => { const Icon = localUseCaseIcons[i].icon; return (
                <GsapFadeIn key={uc.title} delay={0.1 * i}>
                  <SpotlightCard className="p-7 h-full">
                    <Icon className={`w-8 h-8 mb-4 ${localUseCaseIcons[i].color}`} />
                    <h3 className="font-bold text-white mb-2 text-lg">{uc.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{uc.desc}</p>
                    <div className="flex items-center gap-2 text-xs"><CheckCircle className="w-3.5 h-3.5 text-green-400" /><span className="text-green-300">{uc.result}</span></div>
                  </SpotlightCard>
                </GsapFadeIn>
              ); })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn><h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{ui.howTitle}</h2></GsapFadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ui.howSteps.map((s, i) => (
                <GsapFadeIn key={s.step} delay={0.15 * i}>
                  <SpotlightCard className="p-8 text-center">
                    <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center mx-auto mb-4`}><span className={`text-2xl font-black ${s.color}`}>{s.step}</span></div>
                    <h3 className="font-bold text-white mb-3 text-lg">{s.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 py-16 bg-white/5">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn><h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{ui.pricingTitle}</h2><p className="text-gray-400 mb-10">{ui.pricingNote}</p></GsapFadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ui.plans.map((plan, i) => (
                <GsapFadeIn key={plan.name} delay={0.1 * i}>
                  <div className={`relative p-7 rounded-2xl border ${plan.color} ${plan.highlight ? 'bg-cyan-900/20 ring-1 ring-cyan-400/30' : 'bg-slate-800/30'} h-full flex flex-col`}>
                    {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full">{ui.pricingPopular}</div>}
                    <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-6"><span className="text-3xl font-black text-white">{plan.price}</span><span className="text-gray-400 text-sm">{plan.period}</span></div>
                    <ul className="space-y-3 mb-8 flex-1">{plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />{f}</li>)}</ul>
                    <Link href={withLang('/kapcsolat')} className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.highlight ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'border border-white/20 text-gray-300 hover:border-cyan-400/50 hover:text-white'}`}>{ui.ctaBtn} <ArrowRight size={16} /></Link>
                  </div>
                </GsapFadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <GsapFadeIn delay={0.2}>
              <SpotlightCard className="p-12 text-center">
                <Bot className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{ui.ctaTitle}</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">{ui.ctaBody}</p>
                <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">{ui.ctaBtn} <ArrowRight size={18} /></Link>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <section className="relative py-12 px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Vissza a Portfólióhoz
            </Link>
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-900/40">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm border border-cyan-500/30">Automatizáció</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-500/30">🟢 Azonnal elérhető</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">Web Robotpilóta</h1>
                <p className="text-gray-400 text-sm">AI-vezérelt böngésző automatizáció — a te személyes web-robotod</p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Bármilyen webes feladatot elvégzünk robot-tal — <span className="text-white font-semibold">adatgyűjtés, form kitöltés, versenytárs monitoring</span> — emberi felügyelet nélkül, 0-24-ben. Az első feladat INGYEN.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => { const Icon = s.icon; return (
            <GsapFadeIn key={s.label} delay={0.1 * i}>
              <SpotlightCard className="p-6 text-center">
                <Icon className={`w-6 h-6 mx-auto mb-3 ${s.color}`} />
                <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </SpotlightCard>
            </GsapFadeIn>
          ); })}
        </div>
      </section>

      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn><h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Mire használhatod?</h2></GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => { const Icon = uc.icon; return (
              <GsapFadeIn key={uc.title} delay={0.1 * i}>
                <SpotlightCard className="p-7 h-full">
                  <Icon className={`w-8 h-8 mb-4 ${uc.color}`} />
                  <h3 className="font-bold text-white mb-2 text-lg">{uc.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{uc.desc}</p>
                  <div className="flex items-center gap-2 text-xs"><CheckCircle className="w-3.5 h-3.5 text-green-400" /><span className="text-green-300">{uc.result}</span></div>
                </SpotlightCard>
              </GsapFadeIn>
            ); })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn><h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Hogyan működik?</h2></GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ step: '1', title: 'Mondd el mit csináljon', desc: 'Írd le szövegesen a feladatot — pl. "gyűjtsd össze az 5 versenytársam árait naponta"', color: 'text-cyan-400', bg: 'bg-cyan-900/30' }, { step: '2', title: 'A robot elvégzi', desc: 'A Playwright + AI hibrid rendszer megnyitja a böngészőt és végrehajtja a feladatot automatikusan.', color: 'text-blue-400', bg: 'bg-blue-900/30' }, { step: '3', title: 'Megkapod az eredményt', desc: 'Strukturált adat emailben, Google Sheets-ben vagy API-n — ahogy neked kényelmes.', color: 'text-purple-400', bg: 'bg-purple-900/30' }].map((s, i) => (
              <GsapFadeIn key={s.step} delay={0.15 * i}>
                <SpotlightCard className="p-8 text-center">
                  <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center mx-auto mb-4`}><span className={`text-2xl font-black ${s.color}`}>{s.step}</span></div>
                  <h3 className="font-bold text-white mb-3 text-lg">{s.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn><h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Árazás</h2><p className="text-gray-400 mb-10">Válaszd ki a neked megfelelő csomagot</p></GsapFadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, i) => (
              <GsapFadeIn key={plan.name} delay={0.1 * i}>
                <div className={`relative p-7 rounded-2xl border ${plan.color} ${plan.highlight ? 'bg-cyan-900/20 ring-1 ring-cyan-400/30' : 'bg-slate-800/30'} h-full flex flex-col`}>
                  {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full">NÉPSZERŰ</div>}
                  <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-6"><span className="text-3xl font-black text-white">{plan.price}</span><span className="text-gray-400 text-sm">{plan.period}</span></div>
                  <ul className="space-y-3 mb-8 flex-1">{plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />{f}</li>)}</ul>
                  <Link href={withLang('/kapcsolat')} className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.highlight ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'border border-white/20 text-gray-300 hover:border-cyan-400/50 hover:text-white'}`}>Kezdjük el <ArrowRight size={16} /></Link>
                </div>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <GsapFadeIn delay={0.2}>
            <SpotlightCard className="p-12 text-center">
              <Bot className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Próbáld ki INGYEN</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">Az első feladat ajándék — írd meg mit csináljon a robotod, és 24 órán belül megkapod az eredményt.</p>
              <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">Ingyenes próba feladat <ArrowRight size={18} /></Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}
