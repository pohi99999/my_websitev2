import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import {
  ArrowLeft, ArrowRight, CheckCircle, Zap, Brain, Globe,
  Shield, Users, BarChart3, Cpu, Code2, Truck, Package,
  TrendingUp, Map, FileText, Star, Layers, Activity,
  Building2, ShoppingCart, LayoutDashboard, Bot, Award
} from 'lucide-react';

export const metadata = {
  title: 'Pohi AI Pro | Portfólió | Pohánka AI',
  description:
    'B2B nyersanyag-kereskedési platform Gemini AI-val. Automatikus logisztikai tervezés, interaktív térkép, 3 felhasználói szerepkör. Vevők, gyártók és adminisztrátorok egyetlen platformon.',
  alternates: { canonical: '/portfolio/pohi-ai-pro' },
  openGraph: {
    title: 'Pohi AI Pro — B2B Kereskedési Platform AI-val',
    description: 'Nyersanyag-kereskedés, logisztikai tervezés és AI integráció egyetlen platformon.',
    url: '/portfolio/pohi-ai-pro',
    type: 'article',
    locale: 'hu_HU',
    images: [{ url: '/images/pohi-ai-pro/pro-01.jpg', alt: 'Pohi AI Pro' }],
  },
};

const roles = [
  {
    icon: ShoppingCart,
    color: 'text-blue-400',
    bg: 'bg-blue-900/30',
    border: 'border-blue-500/30',
    title: 'Vevők',
    features: [
      'Részletes termékigények ("demands") beküldése — konkrét méretek, mennyiségek',
      'AI-alapú segítség alternatív termékek kereséséhez és összehasonlításához',
      'AI-generált érdeklődő üzenetek fogalmazása',
      'Párosítások nyomon követése, üzlettárgyalás, szállítmánykövetés',
    ],
  },
  {
    icon: Package,
    color: 'text-emerald-400',
    bg: 'bg-emerald-900/30',
    border: 'border-emerald-500/30',
    title: 'Gyártók',
    features: [
      'Készlet ("stock") listázása AI-segítséggel',
      'Meggyőző marketingleírások automatikus generálása',
      'Méltányos piaci ár javaslat AI-tól',
      'Hirdetés minőségelemzés és fotorealisztikus termékképek (Imagen 3)',
    ],
  },
  {
    icon: LayoutDashboard,
    color: 'text-purple-400',
    bg: 'bg-purple-900/30',
    border: 'border-purple-500/30',
    title: 'Adminisztrátor',
    features: [
      'Vertex AI-alapú platformelemzés és piaci kereslet-előrejelzés',
      'Kereskedelmi mintázat anomália-detektálás',
      'Teljes felhasználókezelés',
      'Logisztikai Irányítóközpont — a platform zászlóshajója',
    ],
  },
];

const techStack = [
  { name: 'React',            color: 'text-cyan-300'   },
  { name: 'Vite',             color: 'text-purple-300' },
  { name: 'Tailwind CSS',     color: 'text-blue-300'   },
  { name: 'Gemini AI',        color: 'text-yellow-300' },
  { name: 'Vertex AI',        color: 'text-green-300'  },
  { name: 'Imagen 3',         color: 'text-pink-300'   },
  { name: 'Google Maps API',  color: 'text-red-300'    },
  { name: 'responseSchema',   color: 'text-orange-300' },
  { name: 'localStorage',     color: 'text-gray-300'   },
  { name: 'Node.js (terv)',   color: 'text-green-200'  },
  { name: 'PostgreSQL (terv)',color: 'text-blue-200'   },
  { name: 'WebSockets (terv)',color: 'text-violet-200' },
];

const challenges = [
  {
    icon: Bot,
    color: 'text-yellow-400',
    title: 'Megbízható strukturált AI kimenet',
    desc: 'Összetett feladatoknál (rakodási terv, anomáliajelentés) a Gemini válaszainak mindig érvényes JSON formátumban kellett lenniük. Megoldás: a Gemini API responseSchema funkciójának kiterjedt használata — a frontend kód így tisztább és ellenállóbb lett.',
  },
  {
    icon: Users,
    color: 'text-blue-400',
    title: 'Intuitív AI élmény tervezése',
    desc: 'El akartuk kerülni a "ráragasztottnak" érződő AI funkciókat. Kontextus-érzékeny AiFeatureButton komponenseket hoztunk létre — például az AI "alkalmazza" egy feltöltött fotó elemzését közvetlenül a termékűrlap mezőire.',
  },
  {
    icon: Layers,
    color: 'text-purple-400',
    title: 'Komplex állapot-szinkronizáció',
    desc: 'A backend szimulálása localStorage-al manuális adatkonsisztencia-kezelést igényelt. Amikor egy üzlet létrejött, egyszerre kellett frissíteni az igény, a készlet és az érdeklődések listájának állapotát.',
  },
  {
    icon: Map,
    color: 'text-green-400',
    title: 'AI és térképek kombinálása',
    desc: 'A Gemini analitikai kimenetének (optimalizált útpontlista) és a Google Maps API vizuális megjelenítésének integrálása: Párosítás → Előkészített tételek → AI terv generálása → Térkép renderelése.',
  },
];

const results = [
  {
    icon: Truck,
    color: 'text-blue-400',
    title: 'Logisztikai Irányítóközpont',
    desc: 'A zászlóshajó funkció. AI-alapú tervezéstől a vizuális interaktív térképes felületig — különböző technológiák kombinálása egy valós probléma megoldására.',
  },
  {
    icon: Brain,
    color: 'text-purple-400',
    title: 'Mély és gyakorlatias AI integráció',
    desc: 'Az AI nem csak egy chatbot a képernyő sarkában. A gyártónak segít jobb termékleírás megírásában, az adminisztrátornak többmegállós teherautó-útvonal megtervezésében.',
  },
  {
    icon: Globe,
    color: 'text-emerald-400',
    title: 'Csiszolt, professzionális UI/UX',
    desc: 'Következetes dizájnnyelv, reszponzív elrendezés, átgondolt interakciók — érett, gyártásra kész termék érzete, annak ellenére, hogy nincs backend.',
  },
  {
    icon: Code2,
    color: 'text-orange-400',
    title: 'Teljesen interaktív prototípus',
    desc: 'Funkcióban gazdag alkalmazás teljes backend nélkül — demonstrálja a modern frontend eszközök és a jól átgondolt architektúra erejét.',
  },
];

const screenshots = [
  '/images/pohi-ai-pro/pro-01.jpg',
  '/images/pohi-ai-pro/pro-02.jpg',
  '/images/pohi-ai-pro/pro-03.jpg',
  '/images/pohi-ai-pro/pro-04.jpg',
  '/images/pohi-ai-pro/pro-05.jpg',
  '/images/pohi-ai-pro/pro-06.jpg',
  '/images/pohi-ai-pro/pro-07.jpg',
  '/images/pohi-ai-pro/pro-08.jpg',
  '/images/pohi-ai-pro/pro-09.jpg',
  '/images/pohi-ai-pro/pro-10.jpg',
  '/images/pohi-ai-pro/pro-11.jpg',
  '/images/pohi-ai-pro/pro-12.jpg',
];

export default function PohiAIProPage() {
  return (
    <div className="min-h-screen text-white">

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Vissza a Portfólióhoz
            </Link>
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-700 flex items-center justify-center shadow-lg shadow-purple-900/40">
                <span className="text-white font-black text-lg leading-tight text-center">Pohi<br/>AI Pro</span>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30">B2B Platform</span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/30">Saját fejlesztés</span>
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm border border-yellow-500/30">
                    <Award className="w-3 h-3 inline mr-1" />Díjnyertes prototípus
                  </span>
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm border border-orange-500/30">⚙️ Fejlesztés alatt</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                  Pohi AI Pro
                </h1>
                <p className="text-gray-400 text-sm">
                  Pohánka & Társa — saját fejlesztés &nbsp;|&nbsp; Nyersanyag-kereskedési platform
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Egy teljes körű <span className="text-white font-semibold">B2B nyersanyag-kereskedési platform</span>, amely összekapcsolja a vevőket, gyártókat és logisztikát — Gemini AI-val, interaktív Google Maps alapú szállítástervezéssel, és automatikus dokumentumgenerálással.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Stat kártyák */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '3',       label: 'Felhasználói szerepkör', icon: Users,       color: 'text-blue-400'   },
            { value: 'Gemini',  label: 'AI motor',               icon: Brain,       color: 'text-purple-400' },
            { value: '100%',    label: 'Frontend alapú',         icon: Globe,       color: 'text-cyan-400'   },
            { value: 'Teljes',  label: 'Interaktív prototípus',  icon: CheckCircle, color: 'text-green-400'  },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <GsapFadeIn key={s.label} delay={0.1 * i}>
                <SpotlightCard className="p-6 text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-3 ${s.color}`} />
                  <div className={`text-2xl font-black mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-gray-400 text-xs">{s.label}</div>
                </SpotlightCard>
              </GsapFadeIn>
            );
          })}
        </div>
      </section>

      {/* Mi a Pohi AI Pro? */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Mi a Pohi AI Pro?
            </h2>
          </GsapFadeIn>
          <GsapFadeIn delay={0.1}>
            <SpotlightCard className="p-8 mb-6">
              <p className="text-gray-300 leading-relaxed">
                A Pohi AI Pro egy egyedi fejlesztésű <strong className="text-white">B2B kereskedési és logisztikai platform</strong>, amely egy vevői adatbázist és annak rendelésállományát, valamint a gyártók készletnyilvántartását összefésüli — és kezeli a vevői igényekkel, fuvarszervezéssel egybehangolva.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                A platform testreszabott élményt nyújt három felhasználói szerepkörnek: <span className="text-blue-300 font-medium">vevőknek</span>, <span className="text-emerald-300 font-medium">gyártóknak</span> és <span className="text-purple-300 font-medium">adminisztrátoroknak</span>. Az AI nem kiegészítő funkció — a platform minden érintkezési pontján jelen van, kézzelfogható értéket nyújtva.
              </p>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* 3 szerepkör */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              3 Felhasználói Szerepkör
            </h2>
            <p className="text-gray-400 mb-10 text-sm">Mindenki megkapja, amire szüksége van — egy platformon belül</p>
          </GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <GsapFadeIn key={role.title} delay={0.15 * i}>
                  <SpotlightCard className={`p-7 h-full ${role.bg} border ${role.border}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className={`w-6 h-6 ${role.color}`} />
                      <h3 className={`text-xl font-bold ${role.color}`}>{role.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {role.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${role.color}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </GsapFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Logisztikai Irányítóközpont */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-900/40 rounded-xl border border-blue-500/30">
                <Truck className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Logisztikai Irányítóközpont
                </h2>
                <p className="text-gray-400 text-sm">A platform zászlóshajó funkciója</p>
              </div>
            </div>
          </GsapFadeIn>
          <GsapFadeIn delay={0.1}>
            <SpotlightCard className="p-8">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Az adminisztrátor leghatékonyabb eszköze — egy interaktív, AI-vezérelt logisztikai tervező, amely egyetlen képernyőn hoz össze mindent.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Map,       color: 'text-blue-400',   text: 'Összes hozzá nem rendelt megrendelés és telephely interaktív térképen' },
                  { icon: Bot,       color: 'text-purple-400', text: 'AI automatikusan feltölti a teherautókat — optimális kombináció térfogat és földrajzi közelség alapján' },
                  { icon: Truck,     color: 'text-emerald-400',text: 'Teljes, optimalizált rakodási terv és többmegállós szállítási útvonal generálás' },
                  { icon: FileText,  color: 'text-orange-400', text: 'AI-alapú szállítási dokumentumok (CMR, számla) automatikus generálása' },
                  { icon: BarChart3, color: 'text-cyan-400',   text: 'Szállítási költségbecslés és fuvarszervezési optimalizálási tippek' },
                  { icon: TrendingUp,color: 'text-pink-400',   text: 'Piaci kereslet-előrejelzés és anomália-detektálás Vertex AI-val' },
                ].map(item => {
                  const I = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-3">
                      <I className={`w-5 h-5 shrink-0 mt-0.5 ${item.color}`} />
                      <p className="text-sm text-gray-300">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Screenshots galéria */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Pohi AI Pro élesben
            </h2>
          </GsapFadeIn>

          {/* Hero kép nagyban */}
          <GsapFadeIn delay={0.05}>
            <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-300 mb-5">
              <div className="relative w-full h-72 md:h-96 bg-slate-900">
                <Image
                  src="/images/pohi-ai-pro/pro-01.jpg"
                  alt="Pohi AI Pro"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </GsapFadeIn>

          {/* 4 oszlopos rács — cím nélkül */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {screenshots.slice(1).map((src, i) => (
              <GsapFadeIn key={src} delay={0.04 * i}>
                <div className="group rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative h-40 bg-slate-900">
                    <Image
                      src={src}
                      alt="Pohi AI Pro képernyőkép"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                </div>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Kihívások */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Kihívások & Megoldások
            </h2>
            <p className="text-gray-400 mb-10 text-sm">Amit megtanultunk az építés során</p>
          </GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((c, i) => {
              const I = c.icon;
              return (
                <GsapFadeIn key={c.title} delay={0.1 * i}>
                  <SpotlightCard className="p-7">
                    <div className="flex items-start gap-4">
                      <I className={`w-6 h-6 shrink-0 mt-0.5 ${c.color}`} />
                      <div>
                        <h3 className="font-bold text-white mb-2">{c.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </GsapFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eredmények */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Amire büszkék vagyunk
            </h2>
          </GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((r, i) => {
              const I = r.icon;
              return (
                <GsapFadeIn key={r.title} delay={0.1 * i}>
                  <SpotlightCard className="p-7">
                    <div className="flex items-start gap-4">
                      <I className={`w-6 h-6 shrink-0 mt-0.5 ${r.color}`} />
                      <div>
                        <h3 className="font-bold text-white mb-2">{r.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </GsapFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Következő lépések */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              A jövő útiterve
            </h2>
            <p className="text-gray-400 mb-8 text-sm">Erőteljes prototípusból globálisan skálázható platformmá</p>
          </GsapFadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Layers,    color: 'text-blue-400',   title: 'Teljes körű backend',    desc: 'localStorage → Node.js/Express + PostgreSQL vagy Firebase, többfelhasználós hitelesítéssel' },
              { icon: Activity,  color: 'text-green-400',  title: 'Valós idejű funkciók',   desc: 'WebSockets: valós idejű csevegés, üzletkötési tárgyalások, azonnali riasztások' },
              { icon: TrendingUp,color: 'text-purple-400', title: 'Prediktív analitika',    desc: 'Piaci áringadozás előrejelzés, jövőbeli keresleti gócpontok, ellátási lánc szűk keresztmetszetei' },
              { icon: FileText,  color: 'text-orange-400', title: 'Multimodális bemenetek', desc: 'Fuvarlevelek és tanúsítványok feltöltése — Gemini automatikusan kinyeri és ellenőrzi az adatokat' },
              { icon: Globe,     color: 'text-cyan-400',   title: 'Mobilalkalmazás',        desc: 'Natív app: üzenetek, üzletkötési értesítések, valós idejű szállítmánykövetés' },
              { icon: Building2, color: 'text-pink-400',   title: 'Ipari általánosítás',    desc: 'Nyersanyag-logika adaptálása mezőgazdaságra, fémpiacra, textiliparra' },
            ].map((item, i) => {
              const I = item.icon;
              return (
                <GsapFadeIn key={item.title} delay={0.08 * i}>
                  <SpotlightCard className="p-6">
                    <I className={`w-5 h-5 mb-3 ${item.color}`} />
                    <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Alkalmazott Technológiák
            </h2>
          </GsapFadeIn>
          <div className="flex flex-wrap gap-3">
            {techStack.map(t => (
              <GsapFadeIn key={t.name}>
                <SpotlightCard className="px-4 py-2">
                  <span className={`text-sm font-medium ${t.color}`}>{t.name}</span>
                </SpotlightCard>
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
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Hasonló platformot szeretnél?
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Ha van egy üzleti folyamatod, amit egy intelligens platformra kellene emelni — megcsináljuk. Minden iparágban, minden méretnél.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kapcsolat"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
                >
                  Ingyenes konzultáció <ArrowRight size={18} />
                </Link>
                <Link
                  href="/portfolio/brunella-bas"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-purple-400/50 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Brunella Agent System <ArrowRight size={18} />
                </Link>
              </div>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

    </div>
  );
}
