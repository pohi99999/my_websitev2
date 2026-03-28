import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GsapFadeIn from '../../components/GsapFadeIn';
import ImageLightboxGallery from '../../components/ImageLightboxGallery';
import SpotlightCard from '../../components/SpotlightCard';
import { headers } from 'next/headers';
import {
  ArrowLeft, ArrowRight, CheckCircle, Zap, Brain, Globe,
  Shield, Users, BarChart3, Cpu, Code2, Truck, Package,
  TrendingUp, Map, FileText, Star, Layers, Activity,
  Building2, ShoppingCart, LayoutDashboard, Bot, Award
} from 'lucide-react';

export function generateMetadata() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';

  const meta =
    language === 'en'
      ? {
          title: 'Pohi AI Pro | Portfolio | Pohánka AI',
          description:
            'B2B raw-material trading platform with AI-driven logistics planning, map intelligence and role-based operations.',
          canonical: '/en/portfolio/pohi-ai-pro',
          locale: 'en_US',
        }
      : language === 'de'
      ? {
          title: 'Pohi AI Pro | Portfolio | Pohánka AI',
          description:
            'B2B-Rohstoffhandelsplattform mit KI-gestützter Logistikplanung, Kartenintelligenz und rollenbasiertem Betrieb.',
          canonical: '/de/portfolio/pohi-ai-pro',
          locale: 'de_DE',
        }
      : {
          title: 'Pohi AI Pro | Portfólió | Pohánka AI',
          description:
            'B2B nyersanyag-kereskedési platform Gemini AI-val. Automatikus logisztikai tervezés, interaktív térkép, 3 felhasználói szerepkör.',
          canonical: '/portfolio/pohi-ai-pro',
          locale: 'hu_HU',
        };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: '/portfolio/pohi-ai-pro',
        en: '/en/portfolio/pohi-ai-pro',
        de: '/de/portfolio/pohi-ai-pro',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: 'article',
      locale: meta.locale,
      images: [{ url: '/images/pohi-ai-pro/pro-01.jpg', alt: 'Pohi AI Pro' }],
    },
  };
}

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

// ─── Tri-lingual Executive Narrative ───────────────────────────────────────
const pohiNarrative = {
  en: {
    badge: 'Executive Summary',
    tagline: 'Where AI meets raw-material commerce',
    headline: 'A B2B marketplace that thinks, plans, and ships — autonomously.',
    body: `Pohi AI Pro is a fully interactive B2B trading and logistics platform built
for the raw-materials industry. Three distinct user roles — Buyers, Manufacturers,
and Administrators — each receive a tailored AI-assisted workspace. Buyers
articulate complex sourcing demands and get instant AI-matched supplier proposals.
Manufacturers list inventory with AI-generated descriptions, fair pricing guidance,
and photorealistic product images (Imagen 3). Administrators command a real-time
Logistics Control Centre that routes multi-stop shipments, generates CMR documents,
and forecasts demand anomalies — all powered by Gemini and Vertex AI.`,
    pillars: [
      { icon: Brain,       color: 'text-purple-400', title: 'Deep AI Integration',    body: 'AI is embedded at every touchpoint — not bolted on as an afterthought. From crafting supplier messages to autonomous truck loading, every workflow has a Gemini-powered step.' },
      { icon: Truck,       color: 'text-blue-400',   title: 'Logistics Control Centre', body: 'The flagship feature: AI optimises multi-stop routes, auto-fills vehicles by volume & proximity, and generates legally valid shipping documents in seconds.' },
      { icon: BarChart3,   color: 'text-cyan-400',   title: 'Predictive Analytics',   body: 'Vertex AI detects demand anomalies and surfaces supply-chain bottlenecks before they become costly disruptions.' },
      { icon: Globe,       color: 'text-emerald-400', title: 'Scalable Architecture', body: 'Built entirely on the frontend today; designed for a seamless migration to Node.js, PostgreSQL, and WebSocket real-time channels tomorrow.' },
    ],
    roadmap: [
      { phase: 'Now',    items: ['Full frontend prototype', 'Gemini AI at every touchpoint', 'Interactive logistics map'] },
      { phase: 'Next',   items: ['Node.js + PostgreSQL backend', 'Multi-user auth', 'Real-time WebSocket deals'] },
      { phase: 'Future', items: ['Mobile app (iOS/Android)', 'Predictive pricing AI', 'Cross-industry adaptation'] },
    ],
    cta: 'Interested in a platform like this?',
  },
  de: {
    badge: 'Management-Zusammenfassung',
    tagline: 'Wo KI auf Rohstoffhandel trifft',
    headline: 'Ein B2B-Marktplatz, der denkt, plant und liefert — autonom.',
    body: `Pohi AI Pro ist eine vollständig interaktive B2B-Handels- und Logistikplattform
für die Rohstoffbranche. Drei Benutzerrollen — Käufer, Hersteller und Administratoren —
erhalten jeweils einen KI-gestützten Arbeitsbereich. Käufer formulieren komplexe
Beschaffungsanforderungen und erhalten sofort KI-abgestimmte Lieferantenvorschläge.
Hersteller listen Bestände mit KI-generierten Beschreibungen, fairen Preisempfehlungen
und fotorealistischen Produktbildern (Imagen 3). Administratoren steuern ein
Echtzeit-Logistikzentrum, das Mehrfachlieferungen plant, CMR-Dokumente erzeugt
und Nachfrageanomalien erkennt — alles mit Gemini und Vertex AI.`,
    pillars: [
      { icon: Brain,       color: 'text-purple-400', title: 'Tiefe KI-Integration',     body: 'KI ist an jedem Berührungspunkt eingebettet — keine nachträgliche Ergänzung. Von der Lieferantenkommunikation bis zur autonomen Lkw-Beladung steckt Gemini in jedem Schritt.' },
      { icon: Truck,       color: 'text-blue-400',   title: 'Logistik-Leitstelle',       body: 'Das Flaggschiff-Feature: KI optimiert Mehrfachrouten, füllt Fahrzeuge automatisch nach Volumen und Nähe auf und erstellt rechtsgültige Versanddokumente in Sekunden.' },
      { icon: BarChart3,   color: 'text-cyan-400',   title: 'Prädiktive Analytik',       body: 'Vertex AI erkennt Nachfrageanomalien und zeigt Engpässe in der Lieferkette auf, bevor sie kostspielig werden.' },
      { icon: Globe,       color: 'text-emerald-400', title: 'Skalierbare Architektur', body: 'Heute vollständig im Frontend; konzipiert für eine nahtlose Migration auf Node.js, PostgreSQL und WebSocket-Echtzeitsystem.' },
    ],
    roadmap: [
      { phase: 'Jetzt',    items: ['Vollständiger Frontend-Prototyp', 'Gemini-KI an jedem Schritt', 'Interaktive Logistikkarte'] },
      { phase: 'Nächstes', items: ['Node.js + PostgreSQL Backend', 'Multi-User-Auth', 'Echtzeit-WebSocket-Deals'] },
      { phase: 'Zukunft',  items: ['Mobile App (iOS/Android)', 'Prädiktive Preis-KI', 'Branchenadaption'] },
    ],
    cta: 'Interesse an einer ähnlichen Plattform?',
  },
};

// ─── Screenshots ─────────────────────────────────────────────────────────────
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

const pohiNarrativeHuLegacy = {
  hu: {
    executiveTitle: 'Vezetői összefoglaló',
    executiveBody: [
      'A Pohi AI Pro a Brunella ökoszisztéma egyik legfontosabb vertikális demonstrációja: egy teljes értékű B2B kereskedelmi és logisztikai platform, amely a vevői igényeket, a gyártói készleteket és a fuvarszervezést egy közös operatív rétegbe emeli.',
      'A rendszer jelentősége abban áll, hogy a nyersanyag-kereskedelmet nem csupán digitalizálja, hanem intelligenssé teszi. Az AI nem különálló modul, hanem a folyamat minden pontján értéket ad — ajánl, előrejelez, optimalizál és dokumentál.',
      'Ez a platform egyben minta arra is, hogyan lehet egy konkrét iparági problémából skálázható, több iparágra adaptálható, SaaS-képes megoldást építeni.',
    ],
    pillarsTitle: 'A platform kulcspilléreit',
    pillars: [
      {
        title: 'Háromszereplős operációs modell',
        description:
          'A vevők, gyártók és adminisztrátorok külön szerepkör-alapú felületeken dolgoznak, mégis ugyanabban az intelligens rendszerben, közös adatlogikával és átlátható folyamatokkal.',
      },
      {
        title: 'AI-támogatott logisztikai központ',
        description:
          'A zászlóshajó funkció az Irányítóközpont: a rendszer optimalizált rakodási terveket, többmegállós útvonalakat és dokumentum-előkészítést generál, ezzel csökkentve az üresjáratot és a szervezési időt.',
      },
      {
        title: 'Strukturált AI és vizuális döntéstámogatás',
        description:
          'A Gemini-alapú responseSchema megközelítésnek köszönhetően az AI kimenete megbízhatóan strukturált. Ez tisztább UI-t, gyorsabb iterációt és kevesebb hibát jelent a kritikus üzleti munkafolyamatokban.',
      },
      {
        title: 'Fejlődő vállalati platform',
        description:
          'A jelenlegi interaktív prototípus már most teljes rendszerélményt ad, de a jövőképe multi-tenant, real-time és iparágfüggetlen vállalati platform irányába mutat.',
      },
    ],
    roadmapTitle: 'Technológiai útiterv',
    roadmap: [
      {
        phase: 'Q1–Q2 2026',
        title: 'Prototípus → Pilot',
        description:
          'A frontend-alapú prototípusból pilot üzem: validáció valós logisztikai és kereskedelmi use case-eken, a szerepkörök és az AI-folyamatok finomhangolásával.',
      },
      {
        phase: 'Q3 2026',
        title: 'Backend és real-time réteg',
        description:
          'Node.js/Express, PostgreSQL/Firebase, WebSocket-ek és jogosultsági modell bevezetése — teljes multi-user működés, valós idejű tárgyalás és értesítés.',
      },
      {
        phase: '2027',
        title: 'SaaS és iparági skálázás',
        description:
          'A nyersanyag-logika kiterjesztése más iparágakra: mezőgazdaság, fémipar, textilipar és további supply-chain folyamatok.',
      },
    ],
  },
  en: {
    executiveTitle: 'Executive Summary',
    executiveBody: [
      'Pohi AI Pro is one of the strongest vertical demonstrations inside the Brunella ecosystem: a full B2B commerce and logistics platform unifying customer demand, supplier stock, and transport execution in a single operational layer.',
      'Its importance lies in moving beyond digitization into intelligent operations. AI is not an add-on module here — it recommends, predicts, optimizes, and documents across the workflow.',
      'The platform also serves as a template for how a sector-specific operational problem can evolve into a scalable, SaaS-ready system adaptable across industries.',
    ],
    pillarsTitle: 'Key platform pillars',
    pillars: [
      {
        title: 'Three-role operating model',
        description:
          'Customers, manufacturers, and administrators work in role-specific experiences while sharing a unified data model and transparent operational flow.',
      },
      {
        title: 'AI-assisted logistics command center',
        description:
          'The flagship capability is the logistics control center: optimized loading plans, multi-stop route planning, and document preparation reduce idle capacity and planning time.',
      },
      {
        title: 'Structured AI and visual decision support',
        description:
          'Gemini responseSchema outputs make AI responses reliably structured, which leads to cleaner UI, faster iteration, and fewer operational errors.',
      },
      {
        title: 'A growing enterprise platform',
        description:
          'Today it functions as a highly interactive prototype, but the roadmap points toward a multi-tenant, real-time, industry-agnostic enterprise platform.',
      },
    ],
    roadmapTitle: 'Technology roadmap',
    roadmap: [
      {
        phase: 'Q1–Q2 2026',
        title: 'Prototype → Pilot',
        description:
          'Move from an interactive prototype to pilot deployments with real logistics and trading use cases, validating the operating model in practice.',
      },
      {
        phase: 'Q3 2026',
        title: 'Backend and real-time layer',
        description:
          'Introduce Node.js/Express, PostgreSQL/Firebase, WebSockets, and permissions for full multi-user execution, negotiation, and alerting.',
      },
      {
        phase: '2027',
        title: 'SaaS and industry scaling',
        description:
          'Extend the raw-material trading logic into agriculture, metals, textiles, and adjacent supply-chain-heavy industries.',
      },
    ],
  },
  de: {
    executiveTitle: 'Management-Zusammenfassung',
    executiveBody: [
      'Pohi AI Pro ist eine der stärksten vertikalen Demonstrationen im Brunella-Ökosystem: eine vollständige B2B-Handels- und Logistikplattform, die Kundennachfrage, Herstellerbestände und Transportausführung in einer operativen Schicht vereint.',
      'Die Relevanz liegt darin, dass nicht nur digitalisiert, sondern intelligent gearbeitet wird. KI ist hier kein Zusatzmodul, sondern empfiehlt, prognostiziert, optimiert und dokumentiert entlang des gesamten Prozesses.',
      'Zugleich ist die Plattform ein Modell dafür, wie aus einem branchenspezifischen Problem ein skalierbares, SaaS-fähiges System mit branchenübergreifendem Potenzial entsteht.',
    ],
    pillarsTitle: 'Zentrale Plattform-Säulen',
    pillars: [
      {
        title: 'Drei-Rollen-Betriebsmodell',
        description:
          'Kunden, Hersteller und Administratoren arbeiten in rollenspezifischen Oberflächen, teilen jedoch dieselbe Datenlogik und transparente Prozessstruktur.',
      },
      {
        title: 'KI-gestütztes Logistik-Kontrollzentrum',
        description:
          'Die Leitfunktion der Plattform erzeugt optimierte Beladepläne, Mehrstopp-Routen und Dokumentenvorbereitung — das reduziert Leerkapazität und Planungsaufwand.',
      },
      {
        title: 'Strukturierte KI und visuelle Entscheidungsunterstützung',
        description:
          'Dank Gemini responseSchema werden KI-Antworten verlässlich strukturiert. Das bedeutet sauberere UI, schnellere Iteration und weniger operative Fehler.',
      },
      {
        title: 'Wachsende Enterprise-Plattform',
        description:
          'Heute ist Pohi AI Pro ein hochinteraktiver Prototyp, langfristig entwickelt es sich in Richtung Multi-Tenant-, Echtzeit- und branchenübergreifende Enterprise-Plattform.',
      },
    ],
    roadmapTitle: 'Technologischer Fahrplan',
    roadmap: [
      {
        phase: 'Q1–Q2 2026',
        title: 'Prototyp → Pilot',
        description:
          'Übergang vom interaktiven Prototypen zu Pilotprojekten mit realen Handels- und Logistik-Use-Cases.',
      },
      {
        phase: 'Q3 2026',
        title: 'Backend und Echtzeit-Schicht',
        description:
          'Einführung von Node.js/Express, PostgreSQL/Firebase, WebSockets und Rollen-/Rechteverwaltung für produktiven Mehrbenutzerbetrieb.',
      },
      {
        phase: '2027',
        title: 'SaaS und Branchenskalierung',
        description:
          'Ausweitung der Rohstofflogik auf Landwirtschaft, Metall, Textil und weitere supply-chain-intensive Branchen.',
      },
    ],
  },
};

export default function PohiAIProPage() {
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);

  if (language !== 'hu') {
    const ui =
      language === 'en'
        ? {
            back: 'Back to Portfolio',
            title: 'Pohi AI Pro',
            subtitle:
              'A custom B2B operations platform connecting customers, manufacturers and logistics with AI assistance.',
            cards: [
              'Role-based operations for customer, supplier and admin workflows',
              'AI-supported logistics planning and process automation',
              'Interactive mapping and workflow visibility in one portal',
            ],
            cta: 'Request product consultation',
          }
        : {
            back: 'Zurück zum Portfolio',
            title: 'Pohi AI Pro',
            subtitle:
              'Eine individuelle B2B-Operationsplattform, die Kunden, Hersteller und Logistik mit KI-Unterstützung verbindet.',
            cards: [
              'Rollenbasierte Abläufe für Kunde, Lieferant und Administration',
              'KI-gestützte Logistikplanung und Prozessautomatisierung',
              'Interaktive Karten und Prozesssichtbarkeit in einem Portal',
            ],
            cta: 'Produktberatung anfragen',
          };

    return (
      <div className="min-h-screen text-white">
        <section className="relative px-6 pt-24 pb-16">
          <div className="max-w-5xl mx-auto">
            <GsapFadeIn>
              <Link href={withLang('/portfolio')} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> {ui.back}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">{ui.title}</h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">{ui.subtitle}</p>
            </GsapFadeIn>
          </div>
        </section>
        <section className="px-6 py-16 bg-white/5">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.cards.map((item, i) => (
              <GsapFadeIn key={item} delay={0.1 * i}>
                <SpotlightCard className="p-7 h-full">
                  <CheckCircle className="w-6 h-6 mb-4 text-purple-300" />
                  <p className="text-gray-200 text-sm leading-relaxed">{item}</p>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </section>
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <GsapFadeIn>
              <SpotlightCard className="p-10 text-center">
                <Link href={withLang('/kapcsolat')} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:scale-105">
                  {ui.cta}
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

      {/* ── Executive Summary (EN) ── */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30 mb-4">
              {pohiNarrative.en.badge}
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{pohiNarrative.en.tagline}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{pohiNarrative.en.headline}</h2>
          </GsapFadeIn>
          <GsapFadeIn delay={0.1}>
            <SpotlightCard className="p-8 mb-8">
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">{pohiNarrative.en.body}</p>
            </SpotlightCard>
          </GsapFadeIn>
          {/* EN pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {pohiNarrative.en.pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <GsapFadeIn key={p.title} delay={0.1 * i}>
                  <SpotlightCard className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-5 h-5 shrink-0 ${p.color}`} />
                      <h3 className={`font-semibold text-sm ${p.color}`}>{p.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{p.body}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              );
            })}
          </div>
          {/* EN roadmap */}
          <GsapFadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {pohiNarrative.en.roadmap.map((stage, i) => (
                <SpotlightCard key={stage.phase} className={`p-5 ${i === 0 ? 'border border-purple-500/40' : i === 1 ? 'border border-blue-500/30' : 'border border-gray-500/20'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 0 ? 'text-purple-400' : i === 1 ? 'text-blue-400' : 'text-gray-400'}`}>{stage.phase}</p>
                  <ul className="space-y-1">
                    {stage.items.map(item => (
                      <li key={item} className="text-xs text-gray-300 flex items-start gap-1.5">
                        <CheckCircle className={`w-3 h-3 shrink-0 mt-0.5 ${i === 0 ? 'text-purple-400' : i === 1 ? 'text-blue-400' : 'text-gray-500'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              ))}
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* ── Executive Summary (DE) ── */}
      <section className="px-6 py-16 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <GsapFadeIn>
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs border border-cyan-500/30 mb-4">
              🇩🇪 {pohiNarrative.de.badge}
            </span>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{pohiNarrative.de.tagline}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{pohiNarrative.de.headline}</h2>
          </GsapFadeIn>
          <GsapFadeIn delay={0.1}>
            <SpotlightCard className="p-8 mb-8">
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">{pohiNarrative.de.body}</p>
            </SpotlightCard>
          </GsapFadeIn>
          {/* DE pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {pohiNarrative.de.pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <GsapFadeIn key={p.title} delay={0.1 * i}>
                  <SpotlightCard className="p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-5 h-5 shrink-0 ${p.color}`} />
                      <h3 className={`font-semibold text-sm ${p.color}`}>{p.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{p.body}</p>
                  </SpotlightCard>
                </GsapFadeIn>
              );
            })}
          </div>
          {/* DE roadmap */}
          <GsapFadeIn delay={0.2}>
            <div className="grid grid-cols-3 gap-4">
              {pohiNarrative.de.roadmap.map((stage, i) => (
                <SpotlightCard key={stage.phase} className={`p-5 ${i === 0 ? 'border border-cyan-500/40' : i === 1 ? 'border border-blue-500/30' : 'border border-gray-500/20'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${i === 0 ? 'text-cyan-400' : i === 1 ? 'text-blue-400' : 'text-gray-400'}`}>{stage.phase}</p>
                  <ul className="space-y-1">
                    {stage.items.map(item => (
                      <li key={item} className="text-xs text-gray-300 flex items-start gap-1.5">
                        <CheckCircle className={`w-3 h-3 shrink-0 mt-0.5 ${i === 0 ? 'text-cyan-400' : i === 1 ? 'text-blue-400' : 'text-gray-500'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              ))}
            </div>
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

      {/* Screenshots galéria — lightbox */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <GsapFadeIn>
            <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Pohi AI Pro élesben
            </h2>
          </GsapFadeIn>
          <ImageLightboxGallery
            screenshots={screenshots.slice(1)}
            heroSrc="/images/pohi-ai-pro/pro-01.jpg"
            heroAlt="Pohi AI Pro"
            thumbAlt="Pohi AI Pro képernyőkép"
            accentColor="purple"
          />
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
