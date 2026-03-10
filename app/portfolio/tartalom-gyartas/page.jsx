import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { headers } from 'next/headers';
import {
  ArrowLeft, ArrowRight, CheckCircle, PenTool, Instagram, Mail,
  Sparkles, Clock, Star, FileText, Users, MessageSquare, Palette, Share2, Megaphone
} from 'lucide-react';

export function generateMetadata() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'AI Content Production — Social Media & Email Marketing | Pohánka AI',
          description: 'Monthly social media, blog and email content tailored to your industry and brand voice.',
          canonical: '/en/portfolio/tartalom-gyartas',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'KI-Content-Produktion — Social Media & E-Mail Marketing | Pohánka AI',
          description: 'Monatlicher Content für Social Media, Blog und E-Mail, abgestimmt auf Branche und Tonalität.',
          canonical: '/de/portfolio/tartalom-gyartas',
          locale: 'de_DE',
        }
      : {
          title: 'AI Tartalom Gyártás — Social Media & Email Marketing | Pohánka AI',
          description:
            'Havi social media posztok, blog cikkek és email kampányok — AI-val generálva, a te iparágadra és hangnemedre szabva.',
          canonical: '/portfolio/tartalom-gyartas',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/portfolio/tartalom-gyartas',
        en: '/en/portfolio/tartalom-gyartas',
        de: '/de/portfolio/tartalom-gyartas',
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

const contentTypes = [
  { icon: Instagram, color: 'text-pink-400', title: 'Social Media Posztok', desc: 'Facebook, Instagram, LinkedIn — iparágra szabva, posztoló naptárral.' },
  { icon: FileText, color: 'text-blue-400', title: 'Blog Cikkek', desc: 'SEO-optimalizált, 800-1500 szavas blog cikkek. Kulcsszó kutatás, meta leírás.' },
  { icon: Mail, color: 'text-purple-400', title: 'Email Kampányok', desc: 'Welcome sorozat, heti hírlevél, remarketing email — automatikusan generálva.' },
  { icon: Megaphone, color: 'text-orange-400', title: 'Hirdetési Szövegek', desc: 'Google Ads, Facebook Ads szövegek. Több variáció, CTA optimalizálás.' },
  { icon: Palette, color: 'text-emerald-400', title: 'Landing Page Szövegek', desc: 'Konverzió-optimalizált landing page tartalom. Hero, feature blokkok, CTA.' },
  { icon: Share2, color: 'text-cyan-400', title: 'White-Label (Ügynökségeknek)', desc: 'Tartalom generálás a te ügyfeled brandjére — a te nevedben, az ő hangnemükben.' },
];

const samplePosts = [
  { industry: '🦷 Fogorvos', posts: ['"Tudtad, hogy a fogínygyulladás 2x növeli a szívbetegség kockázatát? 🫀 Rendszeres szájhigiéniával megelőzheted. Foglalj időpontot: [link] #fogászat #megelőzés"', '"Fehérebb mosolyt szeretnél? 🔆 Professzionális fogfehérítésünk 1 alkalom alatt 3-8 árnyalatot világosít. Akció: -20% márciusban! 📞"'] },
  { industry: '🏋️ Fitness', posts: ['"5 reggeli rutin ami 10x több energiát ad az edzéshez ⚡ Olvasd el a blogon: [link] #fitness #energy"', '"Új csoportos órarend márciustól! 🔥 HIIT, Yoga, CrossFit — válaszd ki a kedvencedet. Első alkalom INGYEN! 💪"'] },
  { industry: '🍕 Étterem', posts: ['"Heti menü előrendelés 📱 Rendeld meg péntek estig a jövő heti ebéded — házhoz visszük! Menü: [link] #ebédmenü"', '"Új szezonális kínálat! 🌿 Tavaszi saláták friss, helyi alapanyagokból. Kóstold meg a Farm-to-Table élményt! 🥗"'] }
];

const pricingPlans = [
  { name: 'Social Basic', price: '9.990 Ft', period: '/hó', features: ['10 poszt/hó (FB+IG)', 'Posztoló naptár', 'Hashtag kutatás'], color: 'border-slate-600', highlight: false },
  { name: 'Social Pro', price: '19.990 Ft', period: '/hó', features: ['20 poszt/hó', '2 email sorozat', '1 blog cikk', 'A/B tesztelés'], color: 'border-pink-500/50', highlight: true },
  { name: 'Content Full', price: '39.990 Ft', period: '/hó', features: ['30 poszt/hó', '4 email sorozat', '4 blog cikk', 'Landing page szöveg'], color: 'border-purple-500/50', highlight: false },
  { name: 'Agency', price: '79.990 Ft', period: '/hó', features: ['White-label', 'Korlátlan tartalom', 'API hozzáférés', 'Multi-brand'], color: 'border-cyan-500/50', highlight: false },
];

const stats = [
  { value: '5 perc', label: 'Átlag generálási idő', icon: Clock, color: 'text-pink-400' },
  { value: '10+', label: 'Támogatott iparág', icon: Users, color: 'text-emerald-400' },
  { value: '3 nyelv', label: 'HU, EN, DE', icon: MessageSquare, color: 'text-blue-400' },
  { value: '95%', label: 'Ügyfél-elégedettség', icon: Star, color: 'text-yellow-400' },
];

export default function TartalomGyartasPage() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);

  if (language !== 'hu') {
    const ui =
      language === 'en'
        ? {
            back: 'Back to Portfolio',
            title: 'AI Content Production',
            subtitle: 'AI-generated, editor-reviewed social, blog and email content tailored to your business tone.',
            bullets: ['Social media content calendar', 'SEO blog articles', 'Automated email campaign copy'],
            cta: 'Request free sample',
          }
        : {
            back: 'Zurück zum Portfolio',
            title: 'KI-Content-Produktion',
            subtitle:
              'KI-generierter, redaktionell geprüfter Content für Social Media, Blog und E-Mail — abgestimmt auf Ihre Marke.',
            bullets: ['Social-Media Redaktionsplan', 'SEO-Blogartikel', 'Automatisierte E-Mail-Kampagnentexte'],
            cta: 'Kostenlose Muster anfordern',
          };

    return (
      <div className="min-h-screen text-white">
        <section className="relative py-12 px-6 pt-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn>
              <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> {ui.back}</Link>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">{ui.title}</h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{ui.subtitle}</p>
            </GsapFadeIn>
          </div>
        </section>
        <section className="px-6 py-16 bg-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.bullets.map((b, i) => (
              <GsapFadeIn key={b} delay={0.1 * i}><SpotlightCard className="p-7 h-full"><CheckCircle className="w-6 h-6 mb-4 text-pink-300" /><p className="text-gray-200 text-sm leading-relaxed">{b}</p></SpotlightCard></GsapFadeIn>
            ))}
          </div>
        </section>
        <section className="px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <GsapFadeIn delay={0.2}>
              <SpotlightCard className="p-12 text-center">
                <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">{ui.cta} <ArrowRight size={18} /></Link>
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
            <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 mb-8 transition-colors"><ArrowLeft className="w-4 h-4" /> Vissza a Portfólióhoz</Link>
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center shadow-lg shadow-pink-900/40"><PenTool className="w-12 h-12 text-white" /></div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm border border-pink-500/30">Marketing</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-500/30">🟢 Azonnal elérhető</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">AI Tartalom Gyártás</h1>
                <p className="text-gray-400 text-sm">AI által generálva, ember által ellenőrizve — a te hangodban</p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">Havi social media posztok, blog cikkek és email kampányok — <span className="text-white font-semibold">a te iparágadra és hangnemedre szabva</span>. Az első 5 minta poszt INGYEN.</p>
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
          <GsapFadeIn><h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Minta posztok</h2><p className="text-gray-400 mb-10">Ilyen tartalmakat generálunk — azonnal posztolható minőségben</p></GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePosts.map((sp, i) => (
              <GsapFadeIn key={sp.industry} delay={0.1 * i}>
                <SpotlightCard className="p-7 h-full">
                  <h3 className="font-bold text-white mb-4 text-lg">{sp.industry}</h3>
                  <div className="space-y-4">{sp.posts.map((post, j) => <div key={j} className="p-3 bg-white/5 rounded-lg border border-white/10"><p className="text-gray-300 text-sm leading-relaxed italic">{post}</p></div>)}</div>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn><h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Milyen tartalmat készítünk?</h2></GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentTypes.map((ct, i) => { const Icon = ct.icon; return (
              <GsapFadeIn key={ct.title} delay={0.1 * i}><SpotlightCard className="p-7 h-full"><Icon className={`w-8 h-8 mb-4 ${ct.color}`} /><h3 className="font-bold text-white mb-2 text-lg">{ct.title}</h3><p className="text-gray-300 text-sm leading-relaxed">{ct.desc}</p></SpotlightCard></GsapFadeIn>
            ); })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn><h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Árazás</h2><p className="text-gray-400 mb-10">Az első 5 minta poszt INGYEN — próbáld ki kockázatmentesen</p></GsapFadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, i) => (
              <GsapFadeIn key={plan.name} delay={0.1 * i}>
                <div className={`relative p-7 rounded-2xl border ${plan.color} ${plan.highlight ? 'bg-pink-900/20 ring-1 ring-pink-400/30' : 'bg-slate-800/30'} h-full flex flex-col`}>
                  {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">NÉPSZERŰ</div>}
                  <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-6"><span className="text-3xl font-black text-white">{plan.price}</span><span className="text-gray-400 text-sm">{plan.period}</span></div>
                  <ul className="space-y-3 mb-8 flex-1">{plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle className="w-4 h-4 text-pink-400 shrink-0" />{f}</li>)}</ul>
                  <Link href={withLang('/kapcsolat')} className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.highlight ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'border border-white/20 text-gray-300 hover:border-pink-400/50 hover:text-white'}`}>Kezdjük el <ArrowRight size={16} /></Link>
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
              <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">5 minta poszt INGYEN</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">Írd meg az iparágadat és a céged hangnemét — 24 órán belül küldünk 5 kész, posztolható tartalmat.</p>
              <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">Ingyenes minta kérése <ArrowRight size={18} /></Link>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>
    </div>
  );
}
