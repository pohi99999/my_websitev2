import { ogImageFor, ogLocale } from '../lib/ogImage';
import Image from "next/image";
import { headers } from "next/headers";
import {
  Cpu, Globe, Zap, Search, BarChart3, Lightbulb, Mail,
  Target, TrendingUp, FileText, Package, Users, Brain,
  ArrowRight, CheckCircle, Building2, Truck, Shield, ExternalLink,
  Bot, FileSearch, Award, Clock, DollarSign
} from "lucide-react";
import { SmartContactForm } from "../components/SmartContactForm";
import { AbandonedCartDemo } from "../components/AbandonedCartDemo";

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
            title: "Automatizált Rendszerek Vállalkozásoknak – Szolgáltatások",
            description:
              "Vállalkozásokra szabott automatizálás, digitális munkatársak és rendszerek, amelyek csökkentik a kézi adatrögzítést.",
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
        'x-default': "/szolgaltatasok",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: "website",
      locale: ogLocale(language),
      images: [{ url: ogImageFor(language, '/szolgaltatasok'), width: 1200, height: 630, alt: meta.title }],
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
    title: "Üzleti Automatizáció és Céges Memóriaközpont",
    subtitle: "Egyedi rendszerek, amelyek átveszik a monoton adminisztráció egy részét, és csökkentik a kézi adatrögzítést.",
    services: [
      {
        name: "Folyamatautomatizálás (Automation-as-a-Service)",
        desc: "Az ismétlődő folyamatokat és a papírmunkát kiváltó megoldásokat építünk, hogy a csapata a fontosabb munkára jusson.",
        bullets: ["Kevesebb kézi adatrögzítés", "Gyorsabb ügymenet", "Kevesebb adminisztráció"],
      },
      {
        name: "Közvetlen kapcsolat az alkalmazásai között",
        desc: "A szoftvereit úgy illesztjük össze, hogy azok emberi beavatkozás nélkül kommunikáljanak egymással.",
        bullets: ["Szoftverek (CRM, Számlázó) összekötése", "Üzleti logika automatizálása", "Működésközpontú tervezés"],
      },
      {
        name: "Céges Memóriaközpont",
        desc: "Egy okos kereső, ami minden céges PDF-et, szabályzatot és szerződést azonnal ismer és másodpercek alatt válaszol a kérdésekre.",
        bullets: ["Azonnali válaszok céges adatokból", "Saját dokumentumok feldolgozása", "Nincs több elveszett információ"],
      },
      {
        name: "CRM, email és ügyfélszolgálat automatizáció",
        desc: "Összekötjük a rendszereit egy Virtuális Részleggé, hogy a csapata a valódi ügyfelekre koncentrálhasson.",
        bullets: ["CRM és számlázó szinkronizáció", "Email és ügyfélszolgálat robot", "Ügyfélszerző csapdák kezelése"],
      },
      {
        name: "Pilot projekt, közösen mért eredménnyel",
        desc: "Kis pilottal indulunk, közösen mérjük, mennyi időt takarít meg, és csak ezután bővítjük a működő megoldást.",
        bullets: ["Előre rögzített mérőszám", "Kis kezdő lépés", "Bővítés a mérés után"],
      },
    ],
  },
  {
    id: "nova",
    icon: Bot,
    title: "Nova — Intelligens Digitális Munkatárs",
    subtitle: "Virtuális asszisztens, amely megismeri a vállalkozása szabályait, és átvesz egy részt a napi teendőkből.",
    services: [
      {
        name: "Saját céges adatokból tanul",
        desc: "Nova beolvassa a cég folyamatait, és a cége hangján, az Ön szabályai szerint válaszol az ügyfeleknek.",
        bullets: ["Szabályzatok automatikus betartása", "Folyamatos tanulás a válaszokból", "Ön ellenőrzi az irányt (Glass Box)"],
      },
      {
        name: "Hangalapú telefonos ügyfélszolgálat",
        desc: "Valódi telefonhívásokat kezel természetes hangon — időpontfoglalás és ügyfélszolgálati panaszkezelés emberi erőforrás nélkül.",
        bullets: ["Telefonos recepció", "Természetes párbeszéd", "Munkaidőn túl is fogadja a hívást"],
      },
      {
        name: "Operatív virtuális részleg",
        desc: "Emailek megírása, riportok összefoglalása, feladatok priorizálása és naptárkezelés — mindez összehangoltan, a háttérben.",
        bullets: ["Bejövő emailek automatikus megválaszolása", "Napi teendők összefoglalója", "Naptárszinkronizáció"],
      },
    ],
  },
  {
    id: "psales",
    icon: FileSearch,
    title: "P-Sales — Ingatlan Értékesítő Platform",
    subtitle: "Dokumentumfelmérés és piackutatás egy összehangolt robotcsapattal, amely Ön helyett dolgozik.",
    services: [
      {
        name: "Felmérő robot & dokumentáció",
        desc: "Az ingatlan adatainak és kötelező iratainak azonnali, automatikus összegyűjtése és ellenőrzése.",
        bullets: ["Kötelező iratok azonnali ellenőrzése", "Ügyfél tájékoztatás automatizálása", "Hiánylisták kiküldése"],
      },
      {
        name: "Kutató & piacelemző rendszer",
        desc: "Valós idejű online kutatás a versenytársak és hasonló ingatlanok árazásáról, majd azonnali PDF értékelés generálása.",
        bullets: ["Ingatlan-árak automatikus összehasonlítása", "Piaci trend elemzés 1 kattintással", "Kész PDF riport az ügyfélnek"],
      },
      {
        name: "Stratégia & Glass Box jóváhagyás",
        desc: "A rendszer kialakítja az értékesítési tervet, majd egy átlátható felületen csak jóvá kell hagynia a lépéseket.",
        bullets: ["Automatikus akciótervek", "Átlátható jóváhagyási folyamat", "Az irányítás az Ön kezében"],
      },
    ],
  },
  {
    id: "psearch",
    icon: Award,
    title: "P-Search — Pályázat & Hitelkereső",
    subtitle: "Naponta, automatikusan figyeli a vállalkozására szabott pályázatokat és hiteleket.",
    services: [
      {
        name: "Automatikus pályázatfigyelés",
        desc: "Nem kell hírleveleket böngésznie. A rendszerünk napi szinten figyeli az EU-s és hazai forrásokat, és csak az Önnek relevánsat küldi el.",
        bullets: ["Napi automatikus keresés a háttérben", "Csak a cége profiljába vágó találatok", "Azonnali értesítés új kiírásról"],
      },
      {
        name: "Hitelkereső & ajánlategyeztetés",
        desc: "Piaci banki konstrukciók automatikus összehasonlítása, hogy a legkedvezőbb finanszírozást találja meg.",
        bullets: ["Banki ajánlatok azonnali összehasonlítása", "Rejtett költségek kiszűrése", "Személyre szabott javaslatok"],
      },
      {
        name: "Átlátható Kanban-követés",
        desc: "Minden beadott pályázat és hitel státusza egy átlátható táblán (Glass Box) követhető, automatikus határidő-emlékeztetőkkel.",
        bullets: ["Vizuális státuszkövetés", "Automatikus emlékeztetők", "Határidők egy helyen"],
      },
    ],
  },
  {
    id: "lead",
    icon: Target,
    title: "Automata Érdeklődő-Mágnes & Ügyfélszerzés",
    subtitle: "A rendszer naponta összegyűjti az Önnek releváns cégeket, Ön pedig a legjobbakkal kezdi a megkeresést.",
    services: [
      {
        name: "Automata potenciális vevő felkutatás",
        desc:
          "Rendszerünk naponta figyeli a piacot és kiszűri azokat a cégeket, akiknek a legnagyobb szükségük van az Ön szolgáltatására. A jelölteket fájdalompontszámmal látjuk el (pl. rossz a weboldala, drága a könyvelője).",
        bullets: [
          "Előminősített, releváns üzleti partnerek listája",
          "Automatikus állapotjelentés minden érdeklődőhöz",
          "Priorizálás azonnali üzleti igény alapján",
          "Országos vagy lokális fókusz (pl. csak Debrecen vagy csak könyvelők)",
        ],
        forWho: "B2B értékesítőknek, ügynökségeknek, szolgáltatóknak",
      },
      {
        name: "Személyre szabott outreach kampányok",
        desc:
          "Az ügyfélszerző csapda csak az első lépés. A rendszerünk automatikusan ír és küld személyre szabott e-maileket. Nem tömeges spam, hanem pontos, célzott ajánlat, ami találkozót generál.",
        bullets: [
          "Személyre szabott e-mailek emberi beavatkozás nélkül",
          "Ütemezett kiküldés a legjobb konverziós időpontokban",
          "Átlátható követés Google Sheets-ben vagy a meglévő CRM-jében",
          "Automata follow-up: ha nem válaszol 5 napig, a gép újra ír",
        ],
        forWho: "Bármilyen cégnek, aki stabil ügyfélkört akar építeni",
      },
    ],
  },
  {
    id: "automation",
    icon: Zap,
    title: "Adminisztráció és Üzleti Folyamatok Automatizálása",
    subtitle: "Kevesebb papírmunka, kevesebb kézi adatrögzítés.",
    services: [
      {
        name: "Pénzügyi feldolgozás kevesebb kézi lépéssel",
        desc:
          "A rendszer beolvassa, kategorizálja, és a számlázójába, illetve a könyvelőjének küldi a számlákat. Véget ér az adatok kézi pötyögése és a duplikáció.",
        bullets: [
          "Bejövő számlák azonnali adatkinyerése (PDF, kép, email)",
          "Könyvelési kódok automatikus hozzárendelése",
          "Anomália-jelzés (Glass Box): dupla számla vagy rossz összeg azonnali blokkolása",
          "Automatikus havi vezetői pénzügyi riport",
        ],
        forWho: "Vállalkozóknak, akik unják az Excel táblákat",
      },
      {
        name: "Ügyfélszolgálat és E-mail szűrés",
        desc:
          "A bejövő leveleket egy intelligens digitális munkatárs azonnal szétválogatja: a spamet törli, a rutinkérdést megválaszolja, a sürgős panaszt pedig azonnal a telefonjára küldi.",
        bullets: [
          "Levelek automatikus szétválogatása (sürgős / árajánlat / panasz)",
          "Azonnal kiküldhető, pontos válaszjavaslatok generálása",
          "Ideges ügyfelek azonnali felismerése (hangulatelemzés)",
        ],
        forWho: "Webshopoknak, szolgáltatóknak, leterhelt irodáknak",
      },
    ],
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing Kampány & Tartalomgyártás",
    subtitle: "Egyetlen mondatból kész havi marketing naptár — azonnal.",
    services: [
      {
        name: "Virtuális Marketing Részleg",
        desc:
          "Egy rövid iránymutatás alapján az összehangolt robotcsapat megírja a posztokat, az e-mail sorozatot és a hirdetési szövegeket, majd időzítve közzé is teszi őket.",
        bullets: [
          "A célcsoportja nyelvén (B2B vagy B2C)",
          "Facebook / LinkedIn posztok 1 kattintással",
          "Hírlevél sorozatok és elhagyott kosár kampányok",
          "A/B tesztelés: a rendszer figyeli, melyik szöveg hoz több pénzt",
        ],
        forWho: "Akiknek nincs idejük heti 10 órát posztírással tölteni",
      },
    ],
  },
  {
    id: "custom",
    icon: Building2,
    title: "Egyedi Rendszerfejlesztés & Integráció",
    subtitle: "A meglévő szoftvereit kötjük össze és egészítjük ki, hogy kevesebb legyen a kézi munka.",
    services: [
      {
        name: "Testreszabott automatizációs megoldás",
        desc:
          "Összekötjük a jelenlegi számlázóját (pl. Számlázz.hu), a CRM-jét és az e-mail fiókját. Létrehozunk egy egyedi rendszert, amely csökkenti a kézi adminisztrációt.",
        bullets: [
          "Ingyenes előzetes konzultáció és folyamattérkép készítés",
          "Zökkenőmentes és azonnali frissítések leállás nélkül",
          "Valós idejű, átlátható vezetői dashboard",
          "Folyamatos karbantartás: mi üzemeltetjük, Ön csak használja",
        ],
        forWho: "Növekedni vágyó KKV-knak, akiknél szűk keresztmetszet az adminisztráció",
      },
    ],
  },
  {
    id: "web",
    icon: Globe,
    title: "Modern Weboldal & Webes Alkalmazás",
    subtitle: "Olyan weboldalt építünk, ami konkrétan elad és automatikusan hozza az ügyfelet.",
    services: [
      {
        name: "Bevételtermelő Weboldalak",
        desc:
          "Egy gyors, mobilbarát weboldal önmagában kevés. Mi beépítjük azokat az érdeklődő-mágneseket (webhookokat) és automata időpontfoglalókat, amelyek rögtön a naptárába teszik a vevőt.",
        bullets: [
          "Weboldal Egészségügyi és Gyorsasági Teszt (Kiváló Google pontszám)",
          "Beépített digitális munkatárs (chatbot), amely munkaidőn túl is válaszol a vevőknek",
          "Kevesebb kézi adatrögzítés: az űrlap adatai közvetlenül a nyilvántartásba kerülnek",
        ],
        forWho: "Aki a weboldalától azonnali bevételt vár, nem csak egy digitális névjegyet",
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
              'We do more than software development: we automate your business workflows with practical AI systems that reduce manual data entry.',
            highlights: ['Measured together', 'Less manual data entry', 'Transparent operations'],
            cards: [
              {
                title: 'Automated Lead Generation',
                desc: 'Client acquisition systems that collect relevant prospects every day, so you start your outreach with the best ones.',
              },
              {
                title: 'Business Process Automation',
                desc: 'Invoice handling, support mailbox routing and logistics monitoring, running automatically in the background.',
              },
              {
                title: 'Custom Integrations',
                desc: 'Connecting your existing tools into a seamless, automated Virtual Department.',
              },
            ],
            whyTitle: 'Why choose us?',
            whyDesc:
              'We agree on what to measure up front: hours saved, costs, fewer manual steps. Everything is trackable and transparent.',
            cta: 'Free consultation',
          }
        : {
            title: 'Unsere Dienstleistungen',
            subtitle:
              'Wir entwickeln nicht nur Software: Wir automatisieren Ihre Geschäftsprozesse mit praxisnahen KI-Systemen, die manuelle Dateneingabe reduzieren.',
            highlights: ['Gemeinsam gemessen', 'Weniger manuelle Dateneingabe', 'Transparente Abläufe'],
            cards: [
              {
                title: 'Automatische Lead-Generierung',
                desc: 'Systeme zur Kundengewinnung, die täglich relevante Interessenten sammeln, damit Sie mit den besten beginnen.',
              },
              {
                title: 'Automatisierung von Geschäftsprozessen',
                desc: 'Rechnungsverarbeitung, E-Mail-Routing und Logistik-Monitoring laufen automatisch im Hintergrund.',
              },
              {
                title: 'Individuelle Integrationen',
                desc: 'Wir verbinden Ihre bestehenden Tools zu einer nahtlosen, automatisierten virtuellen Abteilung.',
              },
            ],
            whyTitle: 'Warum wir?',
            whyDesc:
              'Wir legen vorab fest, was gemessen wird: eingesparte Stunden, Kosten, weniger manuelle Schritte. Alles ist nachvollziehbar und transparent.',
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
            Automatizáció, ami Profitot Termel
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Mi nem szoftvert árulunk, hanem <span className="text-white font-semibold">időt és megtakarítást.</span>{" "}
            Olyan rendszereket építünk, amelyek átveszik az unalmas adminisztráció egy részét, összekötik a szoftvereit, és csökkentik a kézi adatrögzítést.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["Közösen mért eredmény", "Kevesebb kézi adatrögzítés", "Átlátható működés"].map((tag) => (
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
                      {svc.forWho && (
                        <p className="text-xs text-gray-500 border-t border-white/10 pt-4 mt-2">
                          <span className="text-gray-400 font-medium">Kinek szól: </span>
                          {svc.forWho}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#00e5ff]">
            "Automation-as-a-Service" Csomagok
          </h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
            Fix havidíjas, kulcsrakész automatizációs rendszerek, amelyekkel csökkentheti a kézi adminisztrációt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Basic Csomag",
                desc: "Ideális kezdő lépés az időrabló adminisztráció megszüntetésére.",
                price: "Árajánlat felmérés után",
                features: ["Alapvető szoftverek (pl. Email, Naptár, Számlázó) összekötése", "1 db Automata Érdeklődő-mágnes", "Havi rendszerkarbantartás"]
              },
              {
                title: "Pro Csomag",
                desc: "Azoknak, akik egy komplett virtuális részleget szeretnének építeni.",
                price: "Árajánlat felmérés után",
                features: ["Saját Céges Memóriaközpont (szabályzatokból, PDF-ekből)", "Automata Árajánlat generáló és Follow-up rendszer", "Glass Box vezetői dashboard"],
                highlight: true
              },
              {
                title: "Enterprise",
                desc: "Komplex, egyedi folyamatautomatizálás a legmagasabb biztonsági elvárásokkal.",
                price: "Egyedi ajánlat",
                features: ["Teljes ERP és vállalatirányítási integráció", "Intelligens döntéstámogató robotok a vezetőségnek", "Dedikált technikai projektmenedzser"]
              }
            ].map((pack) => (
              <div key={pack.title} className={`p-6 rounded-2xl border backdrop-blur-md flex flex-col h-full ${pack.highlight ? 'border-[#00e5ff] bg-[#00e5ff]/10 shadow-[0_0_20px_rgba(0,229,255,0.15)] relative' : 'border-white/10 bg-black/30'}`}>
                <h3 className="text-2xl font-bold text-white mb-2">{pack.title}</h3>
                <p className="text-gray-300 text-sm mb-4 min-h-[40px]">{pack.desc}</p>
                <p className="text-[#00e5ff] font-semibold mb-6 flex items-center gap-2"><DollarSign size={18}/> {pack.price}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pack.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-200">
                      <CheckCircle size={16} className="text-[#00e5ff] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={withLang('/kapcsolat')} className={`text-center py-3 rounded-xl font-bold transition-all ${pack.highlight ? 'bg-[#00e5ff] text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  Ingyenes felmérés
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Miért mi */}
        <section className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#00e5ff]">
            Miért minket válasszon?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Clock,     title: "Mért eredmény", desc: "Minden fejlesztés előtt rögzítjük, mit mérünk: hány munkaórát és mennyi költséget takarít meg a cégének." },
              { icon: Zap,       title: "Nem tanácsadunk. Megcsináljuk.", desc: "A felsorolt megoldásokat a saját működésünkben is használjuk, vagy ügyfélnél már átadtuk. Nem bemutató, hanem működő rendszer." },
              { icon: Truck,     title: "Kevesebb kézi adatrögzítés", desc: "A rendszerek összekötése megszünteti a dupla adatrögzítést és a felesleges Excel-másolgatást." },
              { icon: Shield,    title: "Átlátható működés", desc: "A rendszer dolgozik, de a döntés az Öné. Minden folyamatot lát a feladattáblán." },
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

        {/* Interactive Demos */}
        <section className="mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#00e5ff] mb-4">Próbálja ki élőben az automatizálást!</h2>
            <p className="text-gray-300">Válassza ki az Önt érdeklő demót, és nézze meg a működését.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <SmartContactForm />
            <div className="space-y-8">
              <AbandonedCartDemo />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6 text-lg">Kérdése van? Mutassa meg a problémát, és megmutatjuk, hol takaríthat meg időt.</p>
          <a
            href="/kapcsolat"
            className="inline-flex items-center gap-2 border border-[#00e5ff] text-[#00e5ff] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#00e5ff]/10 hover:shadow-[#00e5ff]/20 hover:scale-105"
          >
            Kérem a díjmentes konzultációt
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </main>
  );
}