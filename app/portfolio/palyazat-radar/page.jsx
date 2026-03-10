import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { headers } from 'next/headers';
import {
  ArrowLeft, ArrowRight, CheckCircle, FileSearch, Bell, Scale,
  Target, Mail, Building2, Search, AlertTriangle
} from 'lucide-react';

export function generateMetadata() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Grant Radar — Automated Grant & Regulation Monitoring | Pohánka AI',
          description: 'AI monitoring of grants and regulation updates with structured weekly reports.',
          canonical: '/en/portfolio/palyazat-radar',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Förder-Radar — Automatisches Förder- & Regelwerk-Monitoring | Pohánka AI',
          description: 'KI-basierte Beobachtung von Förderungen und Regeländerungen mit wöchentlichen Reports.',
          canonical: '/de/portfolio/palyazat-radar',
          locale: 'de_DE',
        }
      : {
          title: 'Pályázat Radar — Automatikus Pályázat & Jogszabály Figyelés | Pohánka AI',
          description:
            'Soha többé ne maradj le pályázatról. AI figyeli az EU/HU pályázatokat és jogszabály-változásokat — heti riport emailben.',
          canonical: '/portfolio/palyazat-radar',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/portfolio/palyazat-radar',
        en: '/en/portfolio/palyazat-radar',
        de: '/de/portfolio/palyazat-radar',
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

const features = [
  { icon: Search, color: 'text-amber-400', title: 'Pályázat Keresés', desc: 'Automatikusan figyeljük a palyazat.gov.hu, pafi.hu és EU pályázati portálokat. Szűrés TEÁOR kód, méret és régió alapján.' },
  { icon: Scale, color: 'text-blue-400', title: 'Jogszabály Figyelés', desc: 'Magyar Közlöny napi elemzése — ha egy új jogszabály érinti a te iparágadat, azonnal értesítünk.' },
  { icon: Target, color: 'text-emerald-400', title: 'Eligibility Check', desc: 'Minden pályázathoz automatikus megfelelőség ellenőrzés — megmondjuk, hogy a te céged jogosult-e rá.' },
  { icon: Mail, color: 'text-purple-400', title: 'Heti Riport Email', desc: 'Minden hétfőn reggel kapsz egy összefoglalót: új pályázatok, közelgő határidők, jogszabály változások.' },
  { icon: AlertTriangle, color: 'text-red-400', title: 'Határidő Riasztás', desc: 'Automatikus értesítés 30, 14 és 7 nappal a pályázati határidő előtt.' },
  { icon: Building2, color: 'text-cyan-400', title: 'Iparág Specifikus', desc: 'Testreszabás a te iparágadra: vendéglátás, IT, gyártás, kereskedelem, egészségügy, építőipar.' },
];

const pricingPlans = [
  { name: 'Pályázat Radar', price: '9.990 Ft', period: '/hó', features: ['Heti pályázat összefoglaló', 'Email riport', '1 TEÁOR szűrés', 'Határidő riasztás'], color: 'border-slate-600', highlight: false },
  { name: 'Radar + Jogszabály', price: '14.990 Ft', period: '/hó', features: ['Pályázat + jogszabály figyelés', 'KKV hatáselemzés', '3 TEÁOR szűrés', 'Prioritás support'], color: 'border-amber-500/50', highlight: true },
  { name: 'Prémium', price: '29.990 Ft', period: '/hó', features: ['Teljes eligibility check', 'Korlátlan TEÁOR', 'Havi személyes konzultáció', 'Telefon support'], color: 'border-purple-500/50', highlight: false }
];

const stats = [
  { value: '73%', label: 'KKV lemarad pályázatról', icon: AlertTriangle, color: 'text-red-400' },
  { value: '500+', label: 'Figyelt pályázat/év', icon: Search, color: 'text-amber-400' },
  { value: '24h', label: 'Értesítés új pályázatra', icon: Bell, color: 'text-emerald-400' },
  { value: '95%', label: 'Pontosság', icon: Target, color: 'text-blue-400' },
];

export default function PalyazatRadarPage() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);

  if (language !== 'hu') {
    const ui =
      language === 'en'
        ? {
            back: 'Back to Portfolio',
            title: 'Grant Radar',
            subtitle: 'Automated grant and regulation intelligence to keep your business ahead of deadlines and opportunities.',
            bullets: [
              'Weekly summary of relevant grants',
              'Regulation-change alerts for your sector',
              'Deadline notifications and eligibility support',
            ],
            cta: 'Start free trial',
          }
        : {
            back: 'Zurück zum Portfolio',
            title: 'Förder-Radar',
            subtitle:
              'Automatisierte Förder- und Regelwerksintelligenz, damit Ihr Unternehmen Chancen und Fristen nicht verpasst.',
            bullets: [
              'Wöchentliche Zusammenfassung relevanter Förderungen',
              'Alerts zu Regeländerungen je Branche',
              'Fristen-Hinweise und Eignungsunterstützung',
            ],
            cta: 'Kostenlose Testphase starten',
          };

    return (
      <div className="min-h-screen text-white">
        <section className="relative py-12 px-6 pt-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn>
              <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> {ui.back}</Link>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-3">{ui.title}</h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{ui.subtitle}</p>
            </GsapFadeIn>
          </div>
        </section>
        <section className="px-6 py-16 bg-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.bullets.map((b, i) => (
              <GsapFadeIn key={b} delay={0.1 * i}><SpotlightCard className="p-7 h-full"><CheckCircle className="w-6 h-6 mb-4 text-amber-300" /><p className="text-gray-200 text-sm leading-relaxed">{b}</p></SpotlightCard></GsapFadeIn>
            ))}
          </div>
        </section>
        <section className="px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <GsapFadeIn delay={0.2}>
              <SpotlightCard className="p-12 text-center">
                <FileSearch className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">{ui.cta} <ArrowRight size={18} /></Link>
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
            <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> Vissza a Portfólióhoz</Link>
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-lg shadow-amber-900/40"><FileSearch className="w-12 h-12 text-white" /></div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm border border-amber-500/30">KKV Szolgáltatás</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-500/30">🟢 Azonnal elérhető</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-3">Pályázat Radar</h1>
                <p className="text-gray-400 text-sm">Automatikus pályázat- és jogszabályfigyelés — soha többé ne maradj le</p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">A magyar KKV-k <span className="text-white font-semibold">73%-a lemarad a számára releváns pályázatokról</span>, mert nincs idejük figyelni. Mi megtesszük helyetted — AI figyeli a pályázatokat és jogszabály-változásokat, és <span className="text-white font-semibold">heti emailben küldünk összefoglalót</span>.</p>
          </GsapFadeIn>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => { const Icon = s.icon; return (
            <GsapFadeIn key={s.label} delay={0.1 * i}><SpotlightCard className="p-6 text-center"><Icon className={`w-6 h-6 mx-auto mb-3 ${s.color}`} /><div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div><div className="text-gray-400 text-sm">{s.label}</div></SpotlightCard></GsapFadeIn>
          ); })}
        </div>
      </section>

      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn><h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Mit kapsz?</h2></GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => { const Icon = f.icon; return (
              <GsapFadeIn key={f.title} delay={0.1 * i}><SpotlightCard className="p-7 h-full"><Icon className={`w-8 h-8 mb-4 ${f.color}`} /><h3 className="font-bold text-white mb-2 text-lg">{f.title}</h3><p className="text-gray-300 text-sm leading-relaxed">{f.desc}</p></SpotlightCard></GsapFadeIn>
            ); })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <GsapFadeIn><h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Ilyen riportot kapsz hetente</h2></GsapFadeIn>
          <GsapFadeIn delay={0.15}>
            <SpotlightCard className="p-8">
              <div className="space-y-6 text-sm">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base"><Bell className="w-5 h-5" /> PÁLYÁZAT RADAR — Heti összefoglaló (2026. W10)</div>
                <div>
                  <div className="text-white font-semibold mb-3">📋 ÚJ PÁLYÁZATOK (3 db):</div>
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-900/20 border border-emerald-500/20 rounded-lg"><div className="text-emerald-300 font-medium">[GINOP-PLUSZ-1.1.1-24] KKV digitalizáció</div><div className="text-gray-400 mt-1">Keretösszeg: max 10M Ft | ⏰ Határidő: 2026-04-15 | 🎯 Relevanciád: 85%</div></div>
                    <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg"><div className="text-blue-300 font-medium">[VEKOP-1.2.1] Vállalkozásfejlesztési támogatás</div><div className="text-gray-400 mt-1">Keretösszeg: max 50M Ft | ⏰ Határidő: 2026-05-30 | 🎯 Relevanciád: 70%</div></div>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold mb-3">⚖️ JOGSZABÁLY VÁLTOZÁS (1 db):</div>
                  <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-lg"><div className="text-red-300 font-medium">[364/2026. Korm. rendelet] Online pénztárgép módosítás</div><div className="text-gray-400 mt-1">💥 KKV hatás: KÖZEPES — érint ha vendéglátásban dolgozol</div></div>
                </div>
              </div>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn><h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Árazás</h2><p className="text-gray-400 mb-10">Az első 2 hét INGYENES — nem kérünk bankkártya adatot</p></GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <GsapFadeIn key={plan.name} delay={0.1 * i}>
                <div className={`relative p-7 rounded-2xl border ${plan.color} ${plan.highlight ? 'bg-amber-900/20 ring-1 ring-amber-400/30' : 'bg-slate-800/30'} h-full flex flex-col`}>
                  {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full">LEGJOBB ÉRTÉK</div>}
                  <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-6"><span className="text-3xl font-black text-white">{plan.price}</span><span className="text-gray-400 text-sm">{plan.period}</span></div>
                  <ul className="space-y-3 mb-8 flex-1">{plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />{f}</li>)}</ul>
                  <Link href={withLang('/kapcsolat')} className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.highlight ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'border border-white/20 text-gray-300 hover:border-amber-400/50 hover:text-white'}`}>Ingyenes próba <ArrowRight size={16} /></Link>
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
              <FileSearch className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">2 hét INGYENES próba</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">Nincs kockázat — próbáld ki 2 hétig ingyen. Ha nem tetszik, egyszerűen lemondod.</p>
              <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">Ingyenes próba indítása <ArrowRight size={18} /></Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}
