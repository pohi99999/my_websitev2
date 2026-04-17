import Image from "next/image";
import { headers } from "next/headers";
import {
  Cpu, Globe, Zap, Search, BarChart3, Lightbulb, Mail,
  Target, TrendingUp, FileText, Package, Users, Brain,
  ArrowRight, CheckCircle, Building2, Truck, Shield, ExternalLink,
  Bot, FileSearch, Award
} from "lucide-react";

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "AI Systems for Companies | Services",
          description:
            "Business-ready AI systems, workflow automation, decision support and custom integrations for companies.",
          canonical: "/en/szolgaltatasok",
        }
      : language === "de"
        ? {
            title: "KI-Systeme für Unternehmen | Leistungen",
            description:
              "Unternehmensnahe KI-Systeme, Prozessautomatisierung, Entscheidungsunterstützung und individuelle Integrationen.",
            canonical: "/de/szolgaltatasok",
          }
        : {
            title: "AI rendszerek vállalkozásoknak – Szolgáltatások",
            description:
              "Vállalkozásokra szabott AI rendszerek, folyamatautomatizálás, intelligens döntéstámogatás és egyedi integrációk mérhető eredménnyel.",
            canonical: "/szolgaltatasok",
          };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: "/szolgaltatasok",
        en: "/en/szolgaltatasok",
        de: "/de/szolgaltatasok",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: "website",
      images: [{ url: "/images/logo.png", alt: "Pohánka és Társa Kft. – logó" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

const categories = [
  {
    id: "ai-rendszerek",
    icon: Brain,
    title: "AI rendszerek tervezése és kiépítése",
    subtitle: "Egyedi AI rendszerek, automatizálások és intelligens döntéstámogató megoldások tervezése, fejlesztése és integrálása vállalkozások számára.",
    services: [
      {
        name: "Folyamatautomatizálás és workflow optimalizálás",
        desc: "Az ismétlődő folyamatokat és manuális lépéseket kiváltó AI megoldásokat építünk, amelyek gyorsítják a napi működést.",
        bullets: ["Ismétlődő folyamatok kiváltása", "Workflow gyorsítás", "Admin terhelés csökkentése"],
      },
      {
        name: "AI komponensek és üzleti folyamatok összekapcsolása",
        desc: "Az AI komponenseket úgy illesztjük a működésbe, hogy ne különálló eszközök legyenek, hanem egymásra épülő rendszeralkotók.",
        bullets: ["Folyamatok összekötése", "Üzleti logika illesztése", "Működésközpontú tervezés"],
      },
      {
        name: "Intelligens döntéstámogatás és riporting",
        desc: "Adatokból, riportokból és elemzésekből AI-alapú javaslatokat és jól használható vezetői összefoglalókat készítünk.",
        bullets: ["Riportok és elemzések", "AI-alapú javaslatok", "Vezetői összefoglalók"],
      },
      {
        name: "CRM, email, ügyfélszolgálat és admin integráció",
        desc: "Összekötjük a napi üzleti rendszereket, hogy a csapatod egységesebb és gyorsabb működésben dolgozhasson.",
        bullets: ["CRM és belső rendszerek", "Email és ügyfélszolgálat", "Admin és dokumentumfolyamatok"],
      },
      {
        name: "Pilot, mérés, finomhangolás, skálázás",
        desc: "Kis kockázatú pilottal indulunk, mérjük a hatást, majd fokozatosan skálázzuk a működő megoldást.",
        bullets: ["Pilot és mérés", "Finomhangolás", "Skálázási terv"],
      },
    ],
  },
  {
    id: "nova",
    icon: Bot,
    title: "Nova — AI Üzleti Asszisztens",
    subtitle: "Egy tanuló, fejlődő napi társ, aki megismeri vállalkozásodat és 24/7 segíti az operatív munkát.",
    services: [
      {
        name: "Vállalkozás-specifikus tanulás",
        desc: "Nova beolvassa a cég folyamatait, szabályzatait és tudásbázisát, majd személyre szabott válaszokat ad.",
        bullets: ["Belső dokumentumok feldolgozása", "Folyamatos tanulás", "Személyre szabott tudásbázis"],
      },
      {
        name: "Hangalapú kommunikáció",
        desc: "Valódi hangfelismeréssel és TTS-sel kommunikál — tárgyalók, call-centerek, asszisztens feladatokra.",
        bullets: ["Hangfelismerés & TTS", "Természetes párbeszéd", "Telefonos integráció"],
      },
      {
        name: "24/7 Operatív segítség",
        desc: "Emailek szerkesztése, riportok összefoglalása, feladatok priorizálása és naptárkezelés emberi beavatkozás nélkül.",
        bullets: ["Email & naptár kezelés", "Riport összefoglalók", "Feladatpriorizálás"],
      },
    ],
  },
  {
    id: "psales",
    icon: FileSearch,
    title: "P-Sales — Ingatlan Értékesítő Platform",
    subtitle: "Dokumentumfelmérés, piackutatás és egyedi értékesítési stratégia egy komplex ügynöki rendszerrel.",
    services: [
      {
        name: "Felmérő ügynök & dokumentáció",
        desc: "Az ingatlan adatainak és kötelező iratainak összegyűjtése, hiányok jelzése és pontos lista a szükséges dokumentumokról.",
        bullets: ["Kötelező iratok ellenőrzése", "Dokumentum feltöltés segítség", "Hiánylisták generálása"],
      },
      {
        name: "Kutató & piacelemző ügynök",
        desc: "Valós idejű online kutatás hasonló ingatlanok adásáról, piaci árelemzés és értékelési riport készítése.",
        bullets: ["Ingatlan-árak összehasonlítása", "Piaci trend elemzés", "Értékelési riport PDF"],
      },
      {
        name: "Stratégia & végrehajtás",
        desc: "Tervező ügynök kialakítja az akciótervet, a jóváhagyás után az értékesítő ügynök végig vezet a folyamaton.",
        bullets: ["Akciótervek generálása", "Felhasználói jóváhagyás", "Értékesítési végrehajtás"],
      },
    ],
  },
  {
    id: "psearch",
    icon: Award,
    title: "P-Search — Pályázat & Hitelkereső",
    subtitle: "Folyamatos EU és hazai pályázat- és hitelfigyelem, személyre szabott találatokkal és Kanban-követéssel.",
    services: [
      {
        name: "Folyamatos pályázatfigyelem",
        desc: "Napi automatikus keresés EU és HU pályázati adatbázisokban — csak a te profil alapján releváns találatok.",
        bullets: ["Napi automatikus keresés", "EU & HU adatbázisok", "Profil alapú szűrés"],
      },
      {
        name: "Hitelkereső & ajánlategyeztetés",
        desc: "Piaci banki és alternatív hitelkonstrukciók összehasonlítása, személyre szabott ajánlatok kiemelése.",
        bullets: ["Banki ajánlatok összehasonlítása", "Kamat & feltétel elemzés", "Személyre szabott javaslatok"],
      },
      {
        name: "Kanban-követés & határidő értesítők",
        desc: "Minden pályázat és hiteligény Kanban-táblán nyomon követhető, automatikus határidő emlékeztetőkkel.",
        bullets: ["Kanban-tábla", "Automatikus emlékeztetők", "Státusz követés"],
      },
    ],
  },
  {
    id: "lead",
    icon: Target,
    title: "Intelligens Lead Generálás & Ügyfélszerzés",
    subtitle: "Nem Te keresed az ügyfeleket — az AI hozza őket. Minden nap, automatikusan.",
    services: [
      {
        name: "Automatikus potenciális vevő felkutatás",
        desc:
          "AI rendszerünk naponta figyeli az internetet és kiszűri azokat a vállalkozásokat, akiknek a legnagyobb szükségük van a te szolgáltatásodra. Minden jelöltet fájdalompontszámmal látunk el: nincs weboldala, hiányzik a Google Mapsről, kevés az értékelése.",
        bullets: [
          "Heti 100–200 előminősített, iparág-specifikus kontakt",
          "Automatikus digitális állapotjelentés minden leadhez",
          "Priorizálás fájdalompontszám alapján",
          "Budapest és vidéki városok (Debrecen, Miskolc, Pécs, Győr)",
          "Iparágak: fogorvos, kozmetikus, ügyvéd, ingatlan, könyvelő, fitness, étterem…",
        ],
        forWho: "Marketing ügynökségeknek, webdesign stúdióknak, SEO szakembereknek, B2B értékesítőknek",
      },
      {
        name: "Automatikus outreach kampányok",
        desc:
          "A lead lista csak az első lépés. Rendszerünk személyre szabott emaileket ír és küld — minden iparághoz, minden célcsoporthoz más hangnemben. Nem tömeges spam, hanem célzott, egyedi megkeresés.",
        bullets: [
          "Személyre szabott email sablonok automatikus generálása",
          "Ütemezett kiküldés üzleti csúcsidőben",
          "Válasz-követés és státuszkezelés Google Sheets integrációval",
          "Follow-up automatizálás — 5 nap csend után önállóan emlékeztet",
        ],
        forWho: "Ügynökségeknek, tanácsadóknak, bármilyen B2B értékesítőnek",
      },
    ],
  },
  {
    id: "automation",
    icon: Zap,
    title: "Üzleti Folyamatok Automatizálása",
    subtitle: "Amit ma kézzel csinálsz — holnaptól csinálja helyetted a rendszer.",
    services: [
      {
        name: "Számla- és pénzügyi feldolgozás",
        desc:
          "Az AI rendszer beolvassa, kategorizálja és exportálja a számlákat — OCR technológiával, anomália-detektálással. Véget ér a manuális számlavezetés.",
        bullets: [
          "Bejövő számlák automatikus felismerése (PDF, kép, email)",
          "Automatikus kategorizálás és könyvelési kód hozzárendelés",
          "Anomália-jelzés: dupla számla, hibás összeg, hiányzó adat",
          "Exportálás: Google Sheets, Excel, bármilyen számviteli rendszer",
          "Havi pénzügyi összesítők automatikus generálása",
        ],
        forWho: "Vállalkozóknak, könyvelőknek, KKV-knak",
      },
      {
        name: "Email kezelés és ügyfélszolgálat automatizálás",
        desc:
          "Beérkező levelek osztályozása, prioritás-meghatározás, válaszjavaslatok generálása. A rutinleveleket a rendszer kezeli, a fontosakat azonnal jelzi.",
        bullets: [
          "Automatikus email osztályozás (sürgős / normál / reklamáció / spam)",
          "AI-generált válaszjavaslatok — csak jóváhagyni kell",
          "Reklamáció és panasz detektálás, azonnali eszkalálás",
          "Hangulatelemzés — tudod mielőtt elolvasod, pozitív vagy negatív",
        ],
        forWho: "Ügyfélszolgálatos csapatoknak, webshopoknak, szolgáltatóknak",
      },
      {
        name: "Logisztika és szállítmánykövetés automatizálás",
        desc:
          "Automatikus csomagkövetés, szállítási státusz-értesítések és késési riasztások kezelése — emberi beavatkozás nélkül.",
        bullets: [
          "Tracking azonosítók kinyerése emailekből, PDF-ekből",
          "Valós idejű szállítási státusz figyelés",
          "Ügyfélértesítések automatikus küldése késés esetén",
          "Reklamáció-indítás automatizálása",
        ],
        forWho: "Logisztikai cégeknek, webshopoknak, importőröknek",
      },
    ],
  },
  {
    id: "market",
    icon: BarChart3,
    title: "Piackutatás & Versenytárselemzés",
    subtitle: "Tudd meg, mit csinál a konkurencia — mielőtt ő tenné ugyanezt.",
    services: [
      {
        name: "Automatikus piacfigyelés (Market Watcher)",
        desc:
          "Az AI rendszer folyamatosan figyeli a versenytársaid árait, kampányait, hirdetéseit és tartalmait. Reggel már asztalon van az összefoglaló.",
        bullets: [
          "Versenytársak árfigyelése valós időben",
          "Új termékek, promóciók, kampányok automatikus detektálása",
          "Iparági trendek összefoglalója hetente",
          "Riasztás, ha a konkurencia ár alá megy vagy új terméket vezet be",
        ],
        forWho: "Kiskereskedőknek, e-commerce vállalkozásoknak, disztribútoroknak",
      },
    ],
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing Kampány Automatizálás",
    subtitle: "Egy briefing — teljes kampány. Percek alatt, nem napok alatt.",
    services: [
      {
        name: "Teljes kampánygenerálás AI-val",
        desc:
          "Egy rövid briefing alapján a rendszer létrehozza a teljes kampányt: szövegek, közösségi média posztok, email sorozat, landing page vázlat — minden egyszerre.",
        bullets: [
          "Célcsoport-specifikus szövegek (B2C, B2B, helyi piac)",
          "Facebook / Instagram / LinkedIn poszt sorozat automatikus generálása",
          "Email sorozat: welcome, follow-up, reaktivációs kampány",
          "A/B tesztelési javaslatok",
          "Lokális kampányspecialitás: turisztikai, közösségi és helyi esemény kampányok",
        ],
        forWho: "Marketing ügynökségeknek, vállalkozóknak, önkormányzatoknak, turisztikai szereplőknek",
      },
    ],
  },
  {
    id: "innovation",
    icon: Lightbulb,
    title: "Kereszt-ipari Innováció",
    subtitle: "Más iparágak megoldásai — a te problémádra alkalmazva.",
    services: [
      {
        name: "TRIZ-alapú problémamegoldás (Innovation Bridge)",
        desc:
          "Az egyik iparágban bevált megoldásokat alkalmazzuk egy teljesen más területen. Bemutatsz egy problémát — mi megmutatjuk, más iparágak hogyan oldották meg, és hogyan alkalmazható ez nálad.",
        bullets: [
          "Strukturált problémaelemzés TRIZ módszertannal",
          "3–5 más iparágból vett, analóg megoldás leírása",
          "Konkrét implementációs javaslat a saját iparágadra",
          "Innovációs riport, amit továbbadhat a csapatodnak",
        ],
        forWho: "Vállalkozóknak, termékvezetőknek, innovációs csapatoknak",
      },
    ],
  },
  {
    id: "custom",
    icon: Brain,
    title: "Egyedi AI Rendszer Fejlesztés",
    subtitle: "Ha a kész megoldások nem elégek — megcsináljuk a sajátodat.",
    services: [
      {
        name: "Testreszabott AI rendszer és automatizálási megoldás",
        desc:
          "Teljesen egyedi AI rendszert fejlesztünk — a te folyamataidra, a te iparágadra, a te csapatod munkastílusához igazítva. Integrálunk meglévő rendszerekbe, és valós idejű dashboardot adunk mellé.",
        bullets: [
          "Teljes igényfelmérés és folyamattérkép",
          "Egyedi AI rendszerfejlesztés (Node.js / Python)",
          "Integráció meglévő rendszerekbe (CRM, ERP, Google Workspace)",
          "Dashboard és kezelői felület (webes, mobilbarát)",
          "Folyamatos karbantartás és fejlesztés",
        ],
        forWho: "Középvállalkozásoktól nagyvállalatig, bármilyen iparágban",
        examples: [
          "Ingatlanpiaci automatizálás",
          "HR és toborzás automatizálás",
          "Pályázatfigyelő rendszer",
          "Jogi változáskövető",
          "Raktár- és készlet automatizálás",
        ],
      },
    ],
  },
  {
    id: "web",
    icon: Globe,
    title: "Webfejlesztés AI-val kiegészítve",
    subtitle: "Modern weboldal, ami nem csak szép — hanem dolgozik is.",
    services: [
      {        name: "Next.js weboldal beépített AI funkciókkal",
        desc:
          "SEO-optimalizált, mobilbarát weboldalak — beépített AI funkciókkal. A weboldalad kap chatbotot, automatikus ajánlatküldőt, foglaláskezelőt vagy lead-qualification rendszert.",
        bullets: [
          "Gyors, modern weboldal (Next.js, Tailwind CSS)",
          "SEO alapok beépítve az első naptól",
          "AI chatbot integráció (ügyfélszolgálat, foglalás, ajánlатkérés)",
          "Google Analytics + teljesítménykövetés",
          "Folyamatos karbantartás és frissítés",
        ],
        forWho: "Vállalkozóknak, KKV-knak, szolgáltatóknak, önkormányzatoknak",
      },
      {
        name: "Blueprint & Dev-Flow",
        desc:
          "Ötletből kivitelezhető terv: követelmény, feladatbontás, végrehajtás és dokumentált átadás egyetlen folyamatban.",
        bullets: [
          "create-prd: termékkövetelmény dokumentum (PRD) készítés",
          "generate-tasks: részletes feladatlista generálás",
          "process-task-list: feladatok lépésenkénti végrehajtása és tesztelése",
        ],
        forWho: "Szoftvercégeknek, terméktulajdonosoknak, digitalizációs projektekhez",
      },
      {
        name: "Speciális ügynökcsapat (Planner, Scout, Coder, Tester, Reviewer)",
        desc:
          "Szerepkör-alapú delegálás komplex feladatokhoz — mintha egy tapasztalt szakmai csapat dolgozna párhuzamosan rajta.",
        bullets: [
          "Planner: stratégiai bontás és prioritás",
          "Scout: piac- és információfeltárás",
          "Coder/Tester/Reviewer: kivitelezés, validáció és minőségbiztosítás",
        ],
        forWho: "Vállalkozásoknak, ahol gyors döntés + gyors megvalósítás kell",
      },
      {
        name: "Cloudflare szolgáltatások (Radar + Security)",
        desc:
          "Valós idejű internetes és biztonsági betekintés, hogy adat alapon dönthess kampányról, kockázatról és prioritásról.",
        bullets: [
          "get_http_data: globális HTTP trendek",
          "get_l7_attack_data: alkalmazásrétegű támadási statisztikák",
          "get_as_details: ASN és hálózati háttérelemzés",
          "create_url_scan: weboldal biztonsági szkennelés",
        ],
        forWho: "E-kereskedelemnek, IT vezetőknek, marketing + biztonsági döntéshozóknak",
      },
      {
        name: "Google Workspace integráció (Gmail, Drive, Docs, Calendar, Chat)",
        desc:
          "A napi adminisztráció automatizálása a meglévő Google rendszeredben — emberi hibák és időveszteség nélkül.",
        bullets: [
          "Gmail: keresés, tartalomolvasás, válasz/piszkozat automatizálás",
          "Drive/Docs: dokumentumkészítés, keresés, rendszerezés",
          "Calendar/Chat: meeting szervezés és automatikus értesítés",
        ],
        forWho: "Irodáknak, ügyfélszolgálatoknak, értékesítési csapatoknak",
      },
      {
        name: "Google Cloud műveletek (gcloud)",
        desc:
          "Felhős infrastruktúra-operáció egyetlen vezérelt felületen keresztül, gyorsabb beavatkozással és auditálhatóan.",
        bullets: [
          "run_gcloud_command: Compute, SQL, GKE és egyéb szolgáltatások kezelése",
          "Üzemeltetési folyamatok standardizálása",
          "Gyors incident response és riportolhatóság",
        ],
        forWho: "Technológiai cégeknek, üzemeltetési csapatoknak",
      },
      {
        name: "Apify + Deep Research adatgyűjtés",
        desc:
          "Skálázható piackutatás és lead discovery közösségi és nyílt webforrásokból, strukturált exporttal.",
        bullets: [
          "Instagram / TikTok / YouTube scraper",
          "Google search scraper + lead generation",
          "research_start és file_search_upload RAG-támogatással",
        ],
        forWho: "Sales és kutatási csapatoknak, ügynökségeknek",
      },
      {
        name: "ComputerUse + Chrome DevTools automatizálás",
        desc:
          "Az AI úgy kezeli a böngészőt, mint egy ember: navigál, kitölt, kattint, ellenőriz és dokumentál.",
        bullets: [
          "Interaktív böngészés (click, type, scroll, keyboard)",
          "Képernyőkép-alapú vizuális elemzés és pontos navigáció",
          "Makrózható, több oldalon átívelő üzleti folyamatok",
          "navigate_page / click / fill / take_screenshot műveletek",
        ],
        forWho: "Adminisztrációs csapatoknak, operatív vezetőknek, backoffice folyamatokra",
      },
      {
        name: "Vibe Prospecting üzleti intelligencia",
        desc:
          "B2B döntéshozók, céges technológiák és piaci jelzések gyors feltárása értékesítéshez és stratégiai tervezéshez.",
        bullets: [
          "Cégdiscovery iparág/méret/lokáció alapján",
          "Döntéshozó-azonosítás és kapcsolati adatbővítés",
          "Tech stack + pénzügyi + versenytársinformáció",
          "CSV export és enrichment folyamatok",
        ],
        forWho: "B2B értékesítőknek, üzletfejlesztőknek, tanácsadóknak",
      },
    ],
  },
];



export default async function SzolgaltatasokPage() {
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const withLang = (href) => (language === 'hu' ? href : href === '/' ? `/${language}` : `/${language}${href}`);

  if (language !== 'hu') {
    const ui =
      language === 'en'
        ? {
            title: 'Our Services',
            subtitle:
              'We do more than software development — we automate your business workflows with practical AI systems.',
            highlights: ['Local market expertise', 'Production-ready systems', 'Transparent operations'],
            cards: [
              {
                title: 'Intelligent Lead Generation',
                desc: 'AI-powered prospect discovery, scoring and outreach automation tailored to your market.',
              },
              {
                title: 'Business Process Automation',
                desc: 'Invoice handling, support mailbox routing, and logistics monitoring with agent-based workflows.',
              },
              {
                title: 'Custom AI Solutions',
                desc: 'End-to-end design and implementation of custom AI systems integrated with your stack.',
              },
            ],
            whyTitle: 'Why choose us?',
            whyDesc:
              'We build and run real systems in production. You get measurable outcomes, transparent execution, and fast iteration.',
            cta: 'Free consultation',
          }
        : {
            title: 'Unsere Dienstleistungen',
            subtitle:
              'Wir entwickeln nicht nur Software — wir automatisieren Ihre Geschäftsprozesse mit praxisnahen KI-Systemen.',
            highlights: ['Marktexpertise', 'Produktive Systeme', 'Transparente Abläufe'],
            cards: [
              {
                title: 'Intelligente Lead-Generierung',
                desc: 'KI-gestützte Lead-Suche, Priorisierung und Outreach-Automatisierung für Ihren Zielmarkt.',
              },
              {
                title: 'Automatisierung von Geschäftsprozessen',
                desc: 'Rechnungsverarbeitung, E-Mail-Routing im Support und Logistik-Monitoring mit Agenten-Workflows.',
              },
              {
                title: 'Individuelle KI-Lösungen',
                desc: 'End-to-End Konzeption und Umsetzung maßgeschneiderter KI-Systeme inklusive Integrationen.',
              },
            ],
            whyTitle: 'Warum wir?',
            whyDesc:
              'Wir liefern echte produktive Systeme mit messbaren Ergebnissen, transparenter Umsetzung und schnellen Iterationen.',
            cta: 'Kostenlose Beratung',
          };

    return (
      <main className="relative min-h-screen">
        <div className="absolute inset-0 bg-black/70 z-[1]" />
        <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 text-white">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#00e5ff]">
              {ui.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">{ui.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {ui.highlights.map((tag) => (
                <span key={tag} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-gray-200 backdrop-blur-sm">
                  <CheckCircle size={14} className="text-[#00e5ff]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {ui.cards.map((card) => (
              <div key={card.title} className="glass-panel p-7 rounded-2xl border border-white/10 backdrop-blur-md bg-black/30">
                <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#00e5ff]">{ui.whyTitle}</h2>
            <p className="text-gray-300 text-lg mb-8">{ui.whyDesc}</p>
            <a
              href={withLang('/kapcsolat')}
              className="inline-flex items-center gap-2 border border-[#00e5ff] text-[#00e5ff] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#00e5ff]/10 hover:shadow-[#00e5ff]/20 hover:scale-105"
            >
              {ui.cta}
              <ArrowRight size={18} />
            </a>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Főoldal", "item": "https://www.pohankaestarsa.com/" },
            { "@type": "ListItem", "position": 2, "name": "Szolgáltatások", "item": "https://www.pohankaestarsa.com/szolgaltatasok" }
          ]
        })}}
      />
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 text-white">

        {/* Hero */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#00e5ff]">
            Szolgáltatásaink
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Nem csak szoftvert fejlesztünk —{" "}
            <span className="text-white font-semibold">automatizáljuk a vállalkozásod jövőjét.</span>{" "}
            AI rendszereink naponta végzik el azt a munkát, ami korábban egy 5–10 fős csapatnak kellett volna.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["Magyar piac ismerete", "Élesben futó rendszerek", "Átlátható működés"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-gray-200 backdrop-blur-sm">
                <CheckCircle size={14} className="text-[#00e5ff]" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Gyors navigáció */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 bg-[#00e5ff]/5 border border-[#00e5ff]/20 hover:border-[#00e5ff]/50 rounded-full px-4 py-2 text-sm text-[#00e5ff] backdrop-blur-sm transition-all duration-200 hover:scale-105"
              >
                <Icon size={14} />
                {cat.title.split(" ").slice(0, 3).join(" ")}…
              </a>
            );
          })}
        </div>

        {/* Kategóriák */}
        <div className="space-y-20">
          {categories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <section key={cat.id} id={cat.id}>
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-3 bg-[#00e5ff]/5 border border-[#00e5ff]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={28} className="text-[#00e5ff]" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#00e5ff]">
                      {catIdx + 1}. {cat.title}
                    </h2>
                    <p className="text-gray-400 mt-1 text-lg">{cat.subtitle}</p>
                  </div>
                </div>

                <div className={`grid gap-6 ${cat.services.length === 1 ? "grid-cols-1 max-w-3xl" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                  {cat.services.map((svc) => (
                    <div
                      key={svc.name}
                      className="glass-panel p-7 rounded-2xl border border-white/8 bg-white/2 hover:border-[#00e5ff]/30 transition-all duration-300 backdrop-blur-md"
                    >
                      <h3 className="text-xl font-bold mb-3 text-white">{svc.name}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-5">{svc.desc}</p>
                      <ul className="space-y-2 mb-5">
                        {svc.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-gray-200">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-[#00e5ff]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      {svc.examples && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Referencia példák</p>
                          <div className="flex flex-wrap gap-2">
                            {svc.examples.map((ex) => (
                              <span key={ex} className="text-xs bg-white/10 border border-white/10 rounded-full px-3 py-1 text-gray-300">
                                {ex}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {svc.refs && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Élő referencia oldalak</p>
                          <div className="flex flex-col gap-2">
                            {svc.refs.map((ref) => (
                              <a
                                key={ref.url}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group/ref"
                              >
                                <ExternalLink size={11} className="shrink-0" />
                                <span className="group-hover/ref:underline">{ref.text}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 border-t border-white/10 pt-4 mt-2">
                        <span className="text-gray-400 font-medium">Kinek szól: </span>
                        {svc.forWho}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#00e5ff]">
            Üzleti automatizálás valós példákon
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
            Az alábbi folyamatok mind AI rendszerekkel vezérelhetők: adatkinyerés, rendszerezés,
            riportolás, dokumentumkezelés és vezetői döntéstámogatás.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "AI géppark- és eszköznyilvántartás",
                desc: "Automatikus eszközállapot-követés, szerviz-emlékeztetők és heti vezetői riport.",
                src: "/images/biz-automation/geppark-nyilvantarto.jpg",
              },
              {
                title: "Munkaügyi adminisztráció automatizálás",
                desc: "Jelenlétek, igazolások, riportok és compliance nyilvántartás emberi hibák nélkül.",
                src: "/images/biz-automation/munkaugyi-nyilvantarto-ai.jpg",
              },
              {
                title: "Hangvezérelt operatív folyamatok",
                desc: "Gyors rögzítés és lekérdezés terepen dolgozó csapatoknak is, mobilbarát működéssel.",
                src: "/images/biz-automation/hangvezerelt-munkaugyi-kieg.jpg",
              },
              {
                title: "Okos ajánlatadó és értékesítési előkészítés",
                desc: "Ajánlatgenerálás, utánkövetés, dokumentáció és státuszfrissítés egy rendszerben.",
                src: "/images/biz-automation/okos-ajanlatado.jpg",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-md">
                <Image src={item.src} alt={item.title} width={1200} height={800} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#00e5ff]">
            Kiemelt, csábító AI folyamatok vállalkozásoknak
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Komplett könyvelési és admin folyamat",
                desc: "Számlafeldolgozás + OCR + kategorizálás + ellenőrzés + havi vezetői összesítő automatikusan.",
              },
              {
                title: "Teljes munkaügyi nyilvántartás AI rendszerrel",
                desc: "Beléptetés, jelenlét, dokumentumfrissítés, figyelmeztetések és audit-ready riportok egy helyen.",
              },
              {
                title: "Ingatlan/iparterület értékesítési kampány",
                desc: "Keresletfelmérés, döntéshozó-azonosítás, automatikus outreach, follow-up és dokumentációkészítés.",
              },
              {
                title: "LinkedIn + email B2B lead motor",
                desc: "Célpiac-feltárás, személyre szabott kommunikáció és pipeline-kezelés teljesen automatizáltan.",
              },
            ].map((flow) => (
              <div key={flow.title} className="p-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md">
                <h3 className="text-white font-bold mb-2">{flow.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{flow.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Miért mi */}
        <section className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#00e5ff]">
            Miért minket válassz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Zap,       title: "Nem tanácsadunk. Megcsináljuk.", desc: "Minden amit felsorolunk, élesben fut. Nem PowerPoint, hanem működő rendszer." },
              { icon: Users,     title: "Kis csapat, nagy teljesítmény.", desc: "AI rendszereink elvégzik, ami egy 5–10 fős csapatnak kellene. Gyorsan, hibátlanul, hétvégén is." },
              { icon: Building2, title: "Magyar piac ismerete.", desc: "Rendszereink magyar vállalkozásokra kalibráltak — magyar adatbázisokkal és kommunikációs stílussal." },
              { icon: Shield,    title: "Átláthatóság — Glass Box.", desc: "Minden futó folyamatot látsz: valós idejű dashboard, értesítések, riportok. Teljes kontroll." },
            ].map((item) => {
              const I = item.icon;
              return (
                <div key={item.title} className="flex gap-4 p-6 rounded-2xl border border-white/8 bg-white/2 hover:border-[#00e5ff]/30 backdrop-blur-md transition-all">
                  <I size={24} className="text-[#00e5ff] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6 text-lg">Kérdésed van? Mutasd meg a problémád — megmutatjuk a megoldást.</p>
          <a
            href="/kapcsolat"
            className="inline-flex items-center gap-2 border border-[#00e5ff] text-[#00e5ff] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#00e5ff]/10 hover:shadow-[#00e5ff]/20 hover:scale-105"
          >
            Ingyenes konzultáció
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </main>
  );
}
