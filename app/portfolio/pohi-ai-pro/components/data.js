import {
  Brain, Globe, Users, Map, Layers, Bot, Truck, Package,
  LayoutDashboard, ShoppingCart, CheckCircle, BarChart3,
  TrendingUp, FileText, Code2, Activity, Building2
} from 'lucide-react';

export const roles = [
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

export const techStack = [
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

export const challenges = [
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

export const results = [
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

export const pohiNarrative = {
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

export const screenshots = [
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
