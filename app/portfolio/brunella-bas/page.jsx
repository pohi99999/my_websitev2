import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GsapFadeIn from '../../components/GsapFadeIn';
import ImageLightboxGallery from '../../components/ImageLightboxGallery';
import SpotlightCard from '../../components/SpotlightCard';
import { headers } from 'next/headers';
import {
  ArrowLeft, ArrowRight, CheckCircle, Zap, Brain, Globe,
  Shield, Users, BarChart3, Cpu, Code2, Target, Lightbulb,
  TrendingUp, Server, Cloud, Database, FileText, Star,
  Layers, Activity, Bot, Mail, Truck, Search, Building2
} from 'lucide-react';

export function generateMetadata() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Brunella Agent System (BAS) | Portfolio | Pohánka AI',
          description:
            'Self-healing AI operating system with 57 agents, hybrid Node.js + Python architecture and end-to-end workflow automation.',
          canonical: '/en/portfolio/brunella-bas',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Brunella Agent System (BAS) | Portfolio | Pohánka AI',
          description:
            'Selbstheilendes KI-Betriebssystem mit 57 Agenten, hybrider Node.js + Python Architektur und End-to-End-Automatisierung.',
          canonical: '/de/portfolio/brunella-bas',
          locale: 'de_DE',
        }
      : {
          title: 'Brunella Agent System (BAS) | Portfólió | Pohánka AI',
          description:
            '57 AI ügynökből álló, öngyógyító operációs rendszer vállalkozásoknak. Node.js + Python + Cloudflare hibrid architektúra, teljes üzleti folyamat automatizálással.',
          canonical: '/portfolio/brunella-bas',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/portfolio/brunella-bas',
        en: '/en/portfolio/brunella-bas',
        de: '/de/portfolio/brunella-bas',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'article',
      locale: meta.locale,
      images: [{ url: '/images/bas/bas-00.jpg', alt: 'Brunella Agent System' }],
    },
  };
}

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
  '/images/bas/bas-13.jpg',
  '/images/bas/bas-14.jpg',
  '/images/bas/bas-15.jpg',
  '/images/bas/bas-16.jpg',
];

const basNarrative = {
  hu: {
    executiveTitle: 'Vezetői összefoglaló',
    executiveBody: [
      'A Brunella Agent System (BAS) ma már nem laboratóriumi koncepció, hanem egy teljes értékű hibrid MI operációs rendszer. A cél egy olyan digitális idegrendszer létrehozása, amely alapjaiban változtatja meg a szoftverfejlesztésről és a vállalati automatizálásról alkotott korábbi dogmákat.',
      'A rendszer nem “fekete dobozként” működik, hanem a Glass Box és a kognitív augmentáció elvére épül: az emberi döntéshozást erősíti fel. Minél nagyobb a raj, minél több ügynök csatlakozik hozzá, annál stabilabb, önellátóbb és költséghatékonyabb lesz.',
      'A BAS nem egyszerű szoftvert értékesít, hanem Expertise-as-a-Service modellt: folyamatosan fejlődő szakértelmet ad iparágfüggetlenül — a logisztikától a K+F-ig, a városi rendszerektől a tartalomgyártásig.',
    ],
    pillarsTitle: 'A rendszer forradalmi pillérei',
    pillars: [
      {
        title: 'Felderítők és Adat-Volán',
        description:
          'A Robotkéz V2 és a CEAN micro-workerei emberként navigálnak a weben, strukturált adatot gyűjtenek, az adattudós modulok pedig megtisztítják ezt Arany Adattá és a LanceDB szemantikus memóriájába írják.',
      },
      {
        title: 'Inkubátor és “kis csibészek”',
        description:
          'A rendszer a saját sikereiből tanul: az Inkubátor modul éjszakánként finomhangolt, gyors, specializált modelleket képez a felhalmozott Arany Adaton, így a BAS minden reggel okosabban ébred.',
      },
      {
        title: 'Enterprise Suite és Software Genesis',
        description:
          'A 18 modulos Enterprise Suite konkrét üzleti feladatokat vesz át, míg a Software Genesis protokoll ötletből specifikációt, kódot, tesztet és kiadási folyamatot generál — emberi felügyelet mellett, de nagyrészt autonóm módon.',
      },
      {
        title: 'Phoenix Protocol & LangSmith',
        description:
          'A Phoenix Protocol v2 biztosítja az öngyógyítást és a checkpointingot, a LangSmith telemetria pedig valós idejű auditálhatóságot ad: minden döntés, gondolatmenet és adatforrás követhető.',
      },
    ],
    roadmapTitle: 'Technológiai ütemterv (TRL 4 → 9)',
    roadmap: [
      {
        phase: 'Q1 2026',
        title: 'TRL 4 → 5',
        description: 'Architektúra stabilizálás, szűk keresztmetszetek felszámolása, BOV MVP élesítés, Robotkéz és Phoenix Protocol teljes aktiválása.',
      },
      {
        phase: 'Q2 2026',
        title: 'TRL 5 → 6',
        description: 'Pilot ügyfelek integrálása, Cogella Core MCP szabványosítás, GDPR/ISO audit, Adat-Volán és Inkubátor működésének felskálázása.',
      },
      {
        phase: 'Q3–Q4 2026 → 2027',
        title: 'TRL 6 → 9',
        description: 'Multi-tenant SaaS, Enterprise funkciók, Software Genesis, majd iparágfüggetlen, globálisan skálázható MI ökoszisztéma és piaci érettség.',
      },
    ],
  },
  en: {
    executiveTitle: 'Executive Summary',
    executiveBody: [
      'The Brunella Agent System (BAS) is no longer a lab concept — it is a full hybrid AI Operating System. Its purpose is to create a digital nervous system that redefines software delivery and business automation.',
      'Unlike black-box copilots, BAS follows a Glass Box and cognitive augmentation philosophy: it amplifies human capability instead of obscuring it. As the swarm grows, the platform becomes more stable, self-sustaining, useful, and cost-efficient.',
      'BAS is not simply software; it is an Expertise-as-a-Service model. It continuously evolves domain knowledge across logistics, enterprise operations, R&D, smart city systems, and content automation.',
    ],
    pillarsTitle: 'Revolutionary system pillars',
    pillars: [
      {
        title: 'Scouts and Data Flywheel',
        description:
          'Robotkez V2 and CEAN edge workers navigate the web like human operators, collect structured signals, and refinery modules transform that signal into Golden Data stored in LanceDB semantic memory.',
      },
      {
        title: 'Incubator and “small chicks”',
        description:
          'The platform learns from its own successful outputs. The Incubator trains smaller, faster, specialized models overnight on Golden Data, so the system wakes up smarter every day.',
      },
      {
        title: 'Enterprise Suite and Software Genesis',
        description:
          'The 18-module Enterprise Suite takes over concrete business workflows, while the Software Genesis protocol can turn an idea into specs, code, tests, and deployment flow with high autonomy.',
      },
      {
        title: 'Phoenix Protocol and LangSmith',
        description:
          'Phoenix Protocol v2 delivers self-healing and checkpoint recovery, while LangSmith telemetry makes every reasoning chain, decision point, and source auditable in real time.',
      },
    ],
    roadmapTitle: 'Technology roadmap (TRL 4 → 9)',
    roadmap: [
      {
        phase: 'Q1 2026',
        title: 'TRL 4 → 5',
        description: 'Architecture hardening, bottleneck removal, BOV MVP release, and full activation of Robotkez and Phoenix Protocol.',
      },
      {
        phase: 'Q2 2026',
        title: 'TRL 5 → 6',
        description: 'Pilot customer integration, Cogella Core MCP standardization, compliance audits, and scale-up of the Golden Data / Incubator loop.',
      },
      {
        phase: 'Q3–Q4 2026 → 2027',
        title: 'TRL 6 → 9',
        description: 'Multi-tenant SaaS evolution, enterprise capabilities, Software Genesis expansion, and full market maturity across industries.',
      },
    ],
  },
  de: {
    executiveTitle: 'Management-Zusammenfassung',
    executiveBody: [
      'Das Brunella Agent System (BAS) ist kein Laborprototyp mehr, sondern ein vollwertiges hybrides KI-Betriebssystem. Ziel ist ein digitales Nervensystem, das Softwareentwicklung und Unternehmensautomatisierung neu definiert.',
      'Im Gegensatz zu Black-Box-Copilots folgt BAS der Glass-Box- und Augmentationsphilosophie: menschliche Fähigkeiten werden verstärkt statt verborgen. Je größer der Schwarm, desto stabiler, autonomer, nützlicher und kosteneffizienter wird das System.',
      'BAS verkauft nicht nur Software, sondern ein Expertise-as-a-Service-Modell. Das System entwickelt Fachwissen kontinuierlich weiter — branchenübergreifend von Logistik bis Forschung, von Smart City bis Content Automation.',
    ],
    pillarsTitle: 'Die revolutionären Säulen des Systems',
    pillars: [
      {
        title: 'Scouts und Data Flywheel',
        description:
          'Robotkez V2 und CEAN-Edge-Worker navigieren wie menschliche Operatoren im Web, sammeln strukturierte Signale und veredeln diese über Refinery-Module zu Golden Data in der LanceDB-Semantikschicht.',
      },
      {
        title: 'Inkubator und „kleine Küken“',
        description:
          'Das System lernt aus eigenen Erfolgen. Der Inkubator trainiert nachts kleinere, schnellere Spezialmodelle auf Golden Data — dadurch wird BAS täglich intelligenter.',
      },
      {
        title: 'Enterprise Suite und Software Genesis',
        description:
          'Die 18-modulige Enterprise Suite übernimmt konkrete Geschäftsprozesse, während das Software-Genesis-Protokoll Ideen in Spezifikationen, Code, Tests und Rollout-Flows überführt.',
      },
      {
        title: 'Phoenix Protocol und LangSmith',
        description:
          'Phoenix Protocol v2 liefert Self-Healing und Checkpoint-Wiederherstellung, während LangSmith-Telemetrie jede Entscheidung, jedes Reasoning und jede Quelle in Echtzeit auditierbar macht.',
      },
    ],
    roadmapTitle: 'Technologischer Fahrplan (TRL 4 → 9)',
    roadmap: [
      {
        phase: 'Q1 2026',
        title: 'TRL 4 → 5',
        description: 'Architektur-Stabilisierung, Beseitigung technischer Engpässe, BOV-MVP und volle Aktivierung von Robotkez und Phoenix Protocol.',
      },
      {
        phase: 'Q2 2026',
        title: 'TRL 5 → 6',
        description: 'Pilotkunden, Standardisierung des Cogella Core MCP, Compliance-Audits und Skalierung des Golden-Data-/Inkubator-Kreislaufs.',
      },
      {
        phase: 'Q3–Q4 2026 → 2027',
        title: 'TRL 6 → 9',
        description: 'Multi-Tenant-SaaS, Enterprise-Funktionen, Ausbau von Software Genesis und volle Marktreife als branchenunabhängiges KI-Ökosystem.',
      },
    ],
  },
};

export default function BrunellaBASPage() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);
  const narrative = basNarrative[language] ?? basNarrative.hu;

  if (language !== 'hu') {
    const ui =
      language === 'en'
        ? {
            back: 'Back to Portfolio',
            title: 'Brunella Agent System',
            subtitle:
              'A self-healing AI operating system for SME automation with orchestrated agents, observability and resilient execution.',
            points: [
              '57 specialized agents coordinated in a unified architecture',
              'Hybrid Node.js + Python implementation with production resilience',
              'Transparent operations and traceable decision workflow',
            ],
            cta: 'Request architecture consultation',
          }
        : {
            back: 'Zurück zum Portfolio',
            title: 'Brunella Agent System',
            subtitle:
              'Ein selbstheilendes KI-Betriebssystem für KMU-Automatisierung mit orchestrierten Agenten, Observability und stabiler Ausführung.',
            points: [
              '57 spezialisierte Agenten in einer einheitlichen Architektur',
              'Hybride Node.js + Python Umsetzung mit produktiver Stabilität',
              'Transparente Abläufe und nachvollziehbare Entscheidungswege',
            ],
            cta: 'Architektur-Beratung anfragen',
          };

    return (
      <div className="min-h-screen text-white">
        <section className="relative py-12 px-6 pt-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn>
              <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {ui.back}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">{ui.title}</h1>
              <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">{ui.subtitle}</p>
            </GsapFadeIn>
          </div>
        </section>

        <section className="px-6 py-16 bg-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.points.map((item, i) => (
              <GsapFadeIn key={item} delay={0.1 * i}>
                <SpotlightCard className="p-7 h-full">
                  <CheckCircle className="w-6 h-6 mb-4 text-blue-300" />
                  <p className="text-gray-200 text-sm leading-relaxed">{item}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto space-y-10">
            <GsapFadeIn>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {narrative.executiveTitle}
              </h2>
            </GsapFadeIn>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              {narrative.executiveBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-5">{narrative.pillarsTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {narrative.pillars.map((pillar) => (
                  <SpotlightCard key={pillar.title} className="p-6">
                    <h4 className="font-semibold text-blue-300 mb-2">{pillar.title}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{pillar.description}</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-5">{narrative.roadmapTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {narrative.roadmap.map((item) => (
                  <SpotlightCard key={item.phase} className="p-6">
                    <div className="text-xs uppercase tracking-wide text-purple-300 mb-2">{item.phase}</div>
                    <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <GsapFadeIn>
              <SpotlightCard className="p-10 text-center">
                <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">
                  {ui.cta} <ArrowRight size={18} />
                </Link>
              </SpotlightCard>
            </GsapFadeIn>
          </div>
        </section>
      </div>
    );
  }

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

      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-10">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {narrative.executiveTitle}
            </h2>
          </GsapFadeIn>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            {narrative.executiveBody.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-5">{narrative.pillarsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {narrative.pillars.map((pillar) => (
                <SpotlightCard key={pillar.title} className="p-6">
                  <h4 className="font-semibold text-blue-300 mb-2">{pillar.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{pillar.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-5">{narrative.roadmapTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {narrative.roadmap.map((item) => (
                <SpotlightCard key={item.phase} className="p-6">
                  <div className="text-xs uppercase tracking-wide text-purple-300 mb-2">{item.phase}</div>
                  <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                </SpotlightCard>
              ))}
            </div>
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

      {/* Screenshots galéria — lightbox */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Brunella Agent System élesben
            </h2>
          </GsapFadeIn>
          <ImageLightboxGallery
            screenshots={screenshots.slice(1)}
            heroSrc="/images/bas/bas-00.jpg"
            heroAlt="Brunella Agent System"
            thumbAlt="Brunella Agent System képernyőkép"
            accentColor="blue"
          />
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
