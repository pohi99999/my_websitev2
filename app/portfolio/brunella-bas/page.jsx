import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import {
  ArrowLeft, ArrowRight, CheckCircle, Zap, Brain, Globe,
  Shield, Users, BarChart3, Cpu, Code2, Target, Lightbulb,
  TrendingUp, Server, Cloud, Database, FileText, Star,
  Layers, Activity, Bot, Mail, Truck, Search, Building2
} from 'lucide-react';

export const metadata = {
  title: 'Brunella Agent System (BAS) | Portfólió | Pohánka AI',
  description:
    '57 AI ügynökből álló, öngyógyító operációs rendszer vállalkozásoknak. Node.js + Python + Cloudflare hibrid architektúra, teljes üzleti folyamat automatizálással.',
  alternates: { canonical: '/portfolio/brunella-bas' },
  openGraph: {
    title: 'Brunella Agent System — AI Operációs Rendszer',
    description: '57 AI ügynök, öngyógyító architektúra, teljes üzleti automatizálás.',
    url: '/portfolio/brunella-bas',
    type: 'article',
    locale: 'hu_HU',
    images: [{ url: '/images/bas/bas-00.jpg', alt: 'Brunella Agent System' }],
  },
};

const agentFamilies = [
  {
    id: 'intelligence',
    icon: Brain,
    name: '🔮 Intelligencia & Kutatás',
    color: 'text-blue-300',
    bg: 'bg-blue-900/30',
    border: 'border-blue-500/30',
    dot: 'bg-blue-400',
    agents: ['ResearcherAgent', 'DataScientistAgent', 'MarketIntelAgent', 'ApifyScraping'],
    desc: 'Internetes kutatás, adatelemzés, piackutatás, RAG memória',
  },
  {
    id: 'lead',
    icon: Target,
    name: '🎯 Lead & Marketing',
    color: 'text-emerald-300',
    bg: 'bg-emerald-900/30',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
    agents: ['LeadMiningAgent', 'MarketingDirectorAgent', 'CopywriterAgent', 'CampaignGeneratorAgent', 'NurturerAgent'],
    desc: 'Lead generálás, kampány alkotás, email sablonok, outreach',
  },
  {
    id: 'automation',
    icon: Zap,
    name: '🤖 Automatizálás',
    color: 'text-yellow-300',
    bg: 'bg-yellow-900/30',
    border: 'border-yellow-500/30',
    dot: 'bg-yellow-400',
    agents: ['RobotkezV2Agent', 'EmailTriageAgent', 'LogisticsDispatcherAgent', 'VoiceAgent'],
    desc: 'Böngésző vezérlés, email kezelés, szállítmánykövetés, hang feldolgozás',
  },
  {
    id: 'enterprise',
    icon: Building2,
    name: '💼 Vállalati Suite',
    color: 'text-purple-300',
    bg: 'bg-purple-900/30',
    border: 'border-purple-500/30',
    dot: 'bg-purple-400',
    agents: ['FinanceGuardianAgent', 'SalesAgent', 'HeadHunterAgent', 'ProcurementAgent', 'ConflictMediatorAgent'],
    desc: 'Pénzügyek, értékesítés, HR toborzás, beszerzés, konfliktus kezelés',
  },
  {
    id: 'specialized',
    icon: Lightbulb,
    name: '⚖️ Speciális Tudás',
    color: 'text-pink-300',
    bg: 'bg-pink-900/30',
    border: 'border-pink-500/30',
    dot: 'bg-pink-400',
    agents: ['LawDetectiveAgent', 'PropertyVisionaryAgent', 'GrantWatcherAgent', 'InnovationBridgeAgent', 'LocalCSRAgent'],
    desc: 'Jogi figyelés, ingatlan elemzés, pályázat figyelő, kereszt-ipari innováció',
  },
  {
    id: 'dev',
    icon: Code2,
    name: '🛠️ Fejlesztés & Ops',
    color: 'text-cyan-300',
    bg: 'bg-cyan-900/30',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
    agents: ['DeveloperAgent', 'EvaluatorAgent', 'DevOpsAgent', 'SpecWriterAgent', 'TaskDecomposerAgent'],
    desc: 'Kód fejlesztés, audit, CI/CD, specifikáció írás, feladat bontás',
  },
];

const infraStack = [
  { name: 'Node.js v24', icon: Server,   color: 'text-green-400',  bg: 'bg-green-900/30',  border: 'border-green-500/30'  },
  { name: 'TypeScript',  icon: Code2,    color: 'text-blue-400',   bg: 'bg-blue-900/30',   border: 'border-blue-500/30'   },
  { name: 'Python 3.12', icon: Cpu,      color: 'text-yellow-400', bg: 'bg-yellow-900/30', border: 'border-yellow-500/30' },
  { name: 'FastAPI',     icon: Zap,      color: 'text-orange-400', bg: 'bg-orange-900/30', border: 'border-orange-500/30' },
  { name: 'React 19',    icon: Globe,    color: 'text-cyan-400',   bg: 'bg-cyan-900/30',   border: 'border-cyan-500/30'   },
  { name: 'Cloudflare',  icon: Cloud,    color: 'text-orange-300', bg: 'bg-orange-900/20', border: 'border-orange-500/20' },
  { name: 'SQLite',      icon: Database, color: 'text-gray-300',   bg: 'bg-gray-800/30',   border: 'border-gray-600/30'   },
  { name: 'LanceDB',     icon: Database, color: 'text-purple-300', bg: 'bg-purple-900/20', border: 'border-purple-500/20' },
  { name: 'Ollama',      icon: Brain,    color: 'text-pink-300',   bg: 'bg-pink-900/20',   border: 'border-pink-500/20'   },
  { name: 'Gemini AI',   icon: Brain,    color: 'text-blue-300',   bg: 'bg-blue-900/20',   border: 'border-blue-500/20'   },
  { name: 'Socket.IO',   icon: Activity, color: 'text-green-300',  bg: 'bg-green-900/20',  border: 'border-green-500/20'  },
  { name: 'MCP Protocol',icon: Layers,   color: 'text-violet-300', bg: 'bg-violet-900/20', border: 'border-violet-500/20' },
];

const stats = [
  { value: '57',   label: 'Regisztrált ügynök',    icon: Bot,        color: 'text-blue-400'   },
  { value: '90+',  label: 'Fejlesztési track',      icon: FileText,   color: 'text-purple-400' },
  { value: '97%',  label: 'Teszt lefedettség',      icon: CheckCircle,color: 'text-green-400'  },
  { value: '24/7', label: 'Öngyógyító futás',       icon: Activity,   color: 'text-orange-400' },
];

const screenshots = [
  '/images/bas/bas-00.jpg',
  '/images/bas/bas-01.jpg',
  '/images/bas/bas-02.jpg',
  '/images/bas/bas-03.jpg',
  '/images/bas/bas-04.jpg',
  '/images/bas/bas-05.jpg',
  '/images/bas/bas-06.jpg',
  '/images/bas/bas-07.jpg',
  '/images/bas/bas-08.jpg',
  '/images/bas/bas-09.jpg',
  '/images/bas/bas-10.jpg',
  '/images/bas/bas-11.jpg',
  '/images/bas/bas-12.jpg',
];

export default function BrunellaBASPage() {
  return (
    <div className="min-h-screen text-white">

      {/* Hero */}
      <section className="relative py-12 px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Vissza a Portfólióhoz
            </Link>
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-900/40">
                BAS
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/30">AI / Automatizálás</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30">Saját fejlesztés</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-500/30">🟢 Élesben fut</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  Brunella Agent System
                </h1>
                <p className="text-gray-400 text-sm">
                  Pohánka & Társa — saját fejlesztés &nbsp;|&nbsp; 2025. október – folyamatban
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Az első valódi <span className="text-white font-semibold">AI Operációs Rendszer</span> kis- és középvállalkozásoknak.
              Nem csak egy chatbot — hanem egy 57 ügynökből álló, öngyógyító digitális munkaerő,
              amely lát, hall, kutat, tárgyal, kódot ír és automatizál. Egyszerre.
            </p>
          </GsapFadeIn>
        </div>
      </section>

      {/* Stat kártyák */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <GsapFadeIn key={s.label} delay={0.1 * i}>
                <SpotlightCard className="p-6 text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-3 ${s.color}`} />
                  <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-gray-400 text-sm">{s.label}</div>
                </SpotlightCard>
              </GsapFadeIn>
            );
          })}
        </div>
      </section>

      {/* Mi a BAS? */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mi a BAS?
            </h2>
          </GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GsapFadeIn delay={0.1}>
              <SpotlightCard className="p-8">
                <h3 className="text-xl font-bold text-blue-300 mb-4">🎯 A kihívás</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  A kis- és középvállalkozásoknak rengeteg ismétlődő, időrabló feladatuk van:
                  lead keresés, email írás, versenytárs figyelés, számla feldolgozás, kampány gyártás —
                  ezek mind embereket foglalnak le, akiket sokkal értékesebb munkában lehetne használni.
                  Ugyanakkor egy teljes marketing/IT/adminisztrációs csapat fenntartása a legtöbb cégnek
                  nem megfizetehető.
                </p>
              </SpotlightCard>
            </GsapFadeIn>
            <GsapFadeIn delay={0.2}>
              <SpotlightCard className="p-8">
                <h3 className="text-xl font-bold text-purple-300 mb-4">💡 A megoldás</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  A BAS egy hibrid, multi-agent AI ökoszisztéma, amelyben minden ügynök egy konkrét
                  szakterületre specializálódott. Az Orchestrator ügynök koordinálja a többit —
                  feladatokat bont le, delegál, ellenőriz. A Phoenix Protocol öngyógyítást biztosít:
                  ha valami elromlik, a rendszer automatikusan helyreállítja magát.
                  Eredmény: egy 5–10 főnek való munkamennyiség egy ember irányításával.
                </p>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </div>
      </section>

      {/* Architektúra Diagram */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Rendszer Architektúra
            </h2>
            <p className="text-gray-400 mb-10 text-sm">Háromrétegű hibrid rendszer — helyi AI + felhő + edge</p>
          </GsapFadeIn>
          <GsapFadeIn delay={0.15}>
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 border border-purple-500/40 rounded-2xl p-5 mb-2">
                <div className="text-xs text-purple-300 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 inline-block animate-pulse" />
                  Layer 1 — Orchestration (Vezérlő Réteg)
                </div>
                <div className="flex flex-wrap gap-3">
                  {['OrchestratorAgent', 'EnterpriseOrchestratorAgent', 'PAIOS Orchestrator'].map(a => (
                    <div key={a} className="bg-purple-800/60 border border-purple-500/40 rounded-lg px-4 py-2 text-white text-sm font-medium">{a}</div>
                  ))}
                </div>
                <p className="text-purple-200/60 text-xs mt-3">Feladatok fogadása → tervezés → delegálás → eredmény összesítés</p>
              </div>
              <div className="flex justify-center my-1"><div className="w-px h-5 bg-gradient-to-b from-purple-500 to-blue-500" /></div>
              <div className="border border-blue-500/20 rounded-2xl p-4 bg-blue-950/20 mb-2">
                <div className="text-xs text-blue-300 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                  Layer 2 — Agent Families (57 ügynök, 6 csoport)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {agentFamilies.map(f => {
                    const Icon = f.icon;
                    return (
                      <div key={f.id} className={`${f.bg} border ${f.border} rounded-xl p-4`}>
                        <div className={`flex items-center gap-2 font-semibold text-sm ${f.color} mb-2`}>
                          <Icon size={14} />{f.name}
                        </div>
                        <div className="space-y-0.5 mb-2">
                          {f.agents.map(a => (
                            <div key={a} className="flex items-center gap-1.5 text-xs text-gray-300">
                              <span className={`w-1 h-1 rounded-full shrink-0 ${f.dot}`} />{a}
                            </div>
                          ))}
                        </div>
                        <p className="text-gray-500 text-xs italic">{f.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center my-1"><div className="w-px h-5 bg-gradient-to-b from-blue-500 to-zinc-500" /></div>
              <div className="bg-zinc-900/60 border border-zinc-600/30 rounded-2xl p-5">
                <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 inline-block" />
                  Layer 3 — Infrastructure (Technológiai Alap)
                </div>
                <div className="flex flex-wrap gap-2">
                  {infraStack.map(t => {
                    const I = t.icon;
                    return (
                      <div key={t.name} className={`flex items-center gap-1.5 ${t.bg} border ${t.border} rounded-lg px-3 py-1.5 text-xs ${t.color} font-medium`}>
                        <I size={12} />{t.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Screenshots galéria */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Brunella Agent System élesben
            </h2>
          </GsapFadeIn>

          {/* Hero kép nagyban */}
          <GsapFadeIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-300 mb-5">
              <div className="relative w-full h-72 md:h-96 bg-slate-900">
                <Image
                  src="/images/bas/bas-00.jpg"
                  alt="Brunella Agent System"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </GsapFadeIn>

          {/* 4 oszlopos rács — kép alatti cím nélkül */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {screenshots.slice(1).map((src, i) => (
              <GsapFadeIn key={src} delay={0.05 * i}>
                <div className="group rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative h-40 bg-slate-900">
                    <Image
                      src={src}
                      alt="Brunella Agent System képernyőkép"
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

      {/* Eredmények */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Eredmények & Teljesítmény
            </h2>
          </GsapFadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { metric: 'Napi friss lead', value: '250+', sub: 'Cloudflare Worker gyűjti',  color: 'text-blue-400'   },
              { metric: 'Ügynök tesztek',  value: '97%',  sub: '657/679 teszt zöld',        color: 'text-green-400'  },
              { metric: 'Befejezett track',value: '90+',  sub: 'aktív fejlesztés',          color: 'text-purple-400' },
              { metric: 'Archit. réteg',   value: '3',    sub: 'Node.js + Python + Edge',   color: 'text-orange-400' },
            ].map((r, i) => (
              <GsapFadeIn key={r.metric} delay={0.1 * i}>
                <SpotlightCard className="p-7 text-center">
                  <BarChart3 className={`w-5 h-5 mx-auto mb-3 ${r.color}`} />
                  <p className="text-gray-400 text-xs mb-1">{r.metric}</p>
                  <p className={`text-3xl font-black mb-1 ${r.color}`}>{r.value}</p>
                  <p className="text-gray-500 text-xs">{r.sub}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Főbb funkciók */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Főbb Funkciók
            </h2>
          </GsapFadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield,    color: 'text-green-400',  title: 'Phoenix Protocol — Öngyógyítás',    desc: 'Ha bármely ügynök hibás állapotba kerül, a rendszer automatikusan észleli és visszaállítja. Nincsenek "halott" folyamatok, nincs emberi beavatkozás.' },
              { icon: Brain,     color: 'text-purple-400', title: 'RAG Memória & Tudásbázis',          desc: 'LanceDB vektoradatbázis + AnythingLLM integráció — az ügynökök "emlékeznek" korábbi feladatokra és tanulnak belőlük.' },
              { icon: Layers,    color: 'text-blue-400',   title: 'MCP Protocol — Dual-mode Szerver',  desc: 'Egyszerre fut MCP StdIO módban (AI kliensek számára) és Express HTTP szerverként (Dashboard + CLI). Egy indítás, két elérési mód.' },
              { icon: Cloud,     color: 'text-orange-400', title: 'Cloudflare Edge Integration',       desc: 'Lead Intelligence Worker, D1 adatbázis, AI Workers — a peremhálózati komponensek naponta futnak és frissítik a lead adatbázist.' },
              { icon: Activity,  color: 'text-cyan-400',   title: 'Valós idejű Mission Control',       desc: 'Socket.IO alapú élő dashboard: ügynök státuszok, feladat sor, log nézegető, metrikák — minden egy képernyőn.' },
              { icon: TrendingUp,color: 'text-pink-400',   title: 'Model Router — Smart AI választás', desc: 'Feladat bonyolultságától függően automatikusan választ helyi (Ollama) vagy felhő AI-t (Gemini, GPT-4o). Budget módban teljesen offline.' },
            ].map((f, i) => {
              const I = f.icon;
              return (
                <GsapFadeIn key={f.title} delay={0.1 * i}>
                  <SpotlightCard className="p-7">
                    <div className="flex items-start gap-4">
                      <I className={`w-6 h-6 shrink-0 mt-0.5 ${f.color}`} />
                      <div>
                        <h3 className="font-bold text-white mb-2">{f.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
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
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Alkalmazott Technológiák
            </h2>
          </GsapFadeIn>
          <div className="flex flex-wrap gap-3">
            {['TypeScript', 'Node.js v24', 'Python 3.12', 'FastAPI', 'React 19', 'Vite', 'Tailwind v4',
              'Express 5', 'Socket.IO', 'Cloudflare Workers', 'Cloudflare D1', 'Cloudflare AI',
              'Ollama', 'Gemini 2.0', 'GPT-4o', 'GitHub Models', 'SQLite', 'LanceDB',
              'AnythingLLM', 'Playwright', 'Vitest', 'MCP Protocol', 'Wrangler'].map(tech => (
              <GsapFadeIn key={tech}>
                <SpotlightCard className="px-4 py-2">
                  <span className="text-blue-300 text-sm font-medium">{tech}</span>
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
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Neked is épülhet ilyen rendszer
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                A BAS minden eleme testreszabható. Ha van egy üzleti problémád amit automatizálható — megcsináljuk a saját verziód.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kapcsolat" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">
                  Ingyenes konzultáció <ArrowRight size={18} />
                </Link>
                <Link href="/termekek/brunella-agents" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-blue-400/50 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300">
                  Termék oldal <ArrowRight size={18} />
                </Link>
              </div>
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

    </div>
  );
}
