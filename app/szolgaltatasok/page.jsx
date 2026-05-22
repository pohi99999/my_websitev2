import Image from "next/image";
import { headers } from "next/headers";
import {
  Cpu, Globe, Zap, Search, BarChart3, Lightbulb, Mail,
  Target, TrendingUp, FileText, Package, Users, Brain,
  ArrowRight, CheckCircle, Building2, Truck, Shield, ExternalLink,
  Bot, FileSearch, Award, Clock, DollarSign
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
            title: "Automatizált Rendszerek Vállalkozásoknak – Szolgáltatások",
            description:
              "Vállalkozásokra szabott automatizáció, intelligens digitális munkatársak és 0 manuális adatrögzítést biztosító rendszerek mérhető ROI-val.",
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
    title: "Üzleti Automatizáció és Céges Memóriaközpont",
    subtitle: "Egyedi rendszerek, amelyek kiváltják a monoton adminisztrációt és biztosítják a 0 manuális adatrögzítést.",
    services: [
      {
        name: "Folyamatautomatizálás (Automation-as-a-Service)",
        desc: "Az ismétlődő folyamatokat és papírmunkát kiváltó megoldásokat építünk, amelyek heti 20+ órát takarítanak meg a csapatodnak.",
        bullets: ["0 manuális adatrögzítés", "Workflow gyorsítás", "Adminisztrációs teher eltüntetése"],
      },
      {
        name: "Közvetlen kapcsolat az applikációid között",
        desc: "A szoftvereidet úgy illesztjük össze, hogy azok emberi beavatkozás nélkül kommunikáljanak egymással.",
        bullets: ["Szoftverek (CRM, Számlázó) összekötése", "Üzleti logika automatizálása", "Működésközpontú tervezés"],
      },
      {
        name: "Céges Memóriaközpont",
        desc: "Egy okos kereső, ami minden céges PDF-et, szabályzatot és szerződést azonnal ismer és másodpercek alatt válaszol a kérdésekre.",
        bullets: ["Azonnali válaszok céges adatokból", "Saját dokumentumok feldolgozása", "Nincs több elveszett információ"],
      },
      {
        name: "CRM, email és ügyfélszolgálat automatizáció",
        desc: "Összekötjük a rendszereidet egy Virtuális Részleggé, hogy a csapatod a valódi ügyfelekre koncentrálhasson.",
        bullets: ["CRM és számlázó szinkronizáció", "Email és ügyfélszolgálat robot", "Ügyfélszerző csapdák kezelése"],
      },
      {
        name: "Pilot projekt, garantált megtérüléssel",
        desc: "Kis kockázatú pilottal indulunk, mérjük a megspórolt időt (ROI), majd fokozatosan skálázzuk a működő megoldást.",
        bullets: ["90 napos megtérülési terv", "Kockázatmentes indulás", "Mérhető skálázás"],
      },
    ],
  },
  {
    id: "nova",
    icon: Bot,
    title: "Nova — Intelligens Digitális Munkatárs",
    subtitle: "Egy 24/7 dolgozó virtuális asszisztens, aki megismeri vállalkozásodat és leveszi a terhet a válladról.",
    services: [
      {
        name: "Saját céges adatokból tanul",
        desc: "Nova beolvassa a cég folyamatait és azonnal a céged hangján, a te szabályaid szerint válaszol az ügyfeleknek.",
        bullets: ["Szabályzatok automatikus betartása", "Folyamatos tanulás a válaszokból", "Te ellenőrzöd az irányt (Glass Box)"],
      },
      {
        name: "Hangalapú telefonos ügyfélszolgálat",
        desc: "Valódi telefonhívásokat kezel természetes hangon — időpontfoglalás és ügyfélszolgálati panaszkezelés emberi erőforrás nélkül.",
        bullets: ["Automatikus telefonos recepció", "Természetes párbeszéd", "0-24 elérhetőség"],
      },
      {
        name: "24/7 Operatív Virtuális Részleg",
        desc: "Emailek megírása, riportok összefoglalása, feladatok priorizálása és naptárkezelés — mindez összehangoltan, a háttérben.",
        bullets: ["Bejövő emailek automatikus megválaszolása", "Napi teendők összefoglalója", "Naptárszinkronizáció"],
      },
    ],
  },
  {
    id: "psales",
    icon: FileSearch,
    title: "P-Sales — Ingatlan Értékesítő Platform",
    subtitle: "Dokumentumfelmérés és piackutatás egy összehangolt robotcsapattal, ami helyetted dolgozik.",
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
        desc: "A rendszer kialakítja az értékesítési tervet, majd egy átlátható felületen csak jóvá kell hagynod a lépéseket.",
        bullets: ["Automatikus akciótervek", "Átlátható jóváhagyási folyamat", "Kontroll a te kezedben"],
      },
    ],
  },
  {
    id: "psearch",
    icon: Award,
    title: "P-Search — Pályázat & Hitelkereső",
    subtitle: "24/7 automatikus piacfigyelés a te cégedre szabott pályázatok és hitelek után.",
    services: [
      {
        name: "24/7 Automata pályázatfigyelem",
        desc: "Nem kell hírleveleket bújnod. A rendszerünk napi szinten monitorozza az EU-s és hazai forrásokat, és csak a neked relevánsat küldi el.",
        bullets: ["Napi automatikus keresés a háttérben", "Csak a céged profiljába vágó találatok", "Azonnali értesítés új kiírásról"],
      },
      {
        name: "Hitelkereső & ajánlategyeztetés",
        desc: "Piaci banki konstrukciók automatikus összehasonlítása, hogy mindig a legolcsóbb finanszírozást találd meg.",
        bullets: ["Banki ajánlatok azonnali összehasonlítása", "Rejtett költségek kiszűrése", "Személyre szabott javaslatok"],
      },
      {
        name: "Átlátható Kanban-követés",
        desc: "Minden beadott pályázat és hitel státusza egy átlátható táblán (Glass Box) követhető, automatikus határidő-emlékeztetőkkel.",
        bullets: ["Vizuális státuszkövetés", "Automatikus emlékeztetők", "Soha nem csúszol le határidőről"],
      },
    ],
  },
  {
    id: "lead",
    icon: Target,
    title: "Automata Érdeklődő-Mágnes & Ügyfélszerzés",
    subtitle: "Nem Te keresed az ügyfeleket — a rendszer hozza őket. Minden nap, automatikusan.",
    services: [
      {
        name: "Automata potenciális vevő felkutatás",
        desc:
          "Rendszerünk naponta figyeli a piacot és kiszűri azokat a cégeket, akiknek a legnagyobb szükségük van rád. A jelölteket fájdalompontszámmal látjuk el (pl. rossz a weboldala, drága a könyvelője).",
        bullets: [
          "Heti 100–200 előminősített, releváns üzleti partner",
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
          "Átlátható követés Google Sheets-ben vagy a meglévő CRM-edben",
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
    subtitle: "Szüntesd meg a papírmunkát. 0 manuális adatrögzítés, 100% pontosság.",
    services: [
      {
        name: "Pénzügyi feldolgozás emberi hiba nélkül",
        desc:
          "A rendszer beolvassa, kategorizálja és a számlázódba/könyvelődnek küldi a számlákat. Véget ér az adatok kézi pötyögése és a duplikáció.",
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
          "A bejövő leveleket egy intelligens digitális munkatárs azonnal szétválogatja: a spamet törli, a rutinkérdést megválaszolja, a sürgős panaszt pedig azonnal a telefonodra küldi.",
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
          "Garantáltan a te célcsoportod nyelvén (B2B vagy B2C)",
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
    subtitle: "Meglévő szoftvereidet okosítjuk fel a garantált megtérülés érdekében.",
    services: [
      {
        name: "Testreszabott automatizációs megoldás",
        desc:
          "Összekötjük a jelenlegi számlázódat (pl. Számlázz.hu), a CRM-edet és az e-mail fiókodat. Létrehozunk egy olyan egyedi rendszert, amivel radikálisan csökken a bérköltséged és nő a profitod.",
        bullets: [
          "Ingyenes előzetes konzultáció és folyamattérkép készítés",
          "Zökkenőmentes és azonnali frissítések leállás nélkül",
          "Valós idejű, átlátható vezetői dashboard",
          "Folyamatos karbantartás: mi üzemeltetjük, te csak használod",
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
          "Egy gyors, mobilbarát weboldal önmagában kevés. Mi beépítjük azokat az érdeklődő-mágneseket (webhookokat) és automata időpontfoglalókat, amik rögtön a naptáradba teszik a vevőt.",
        bullets: [
          "Weboldal Egészségügyi és Gyorsasági Teszt (Kiváló Google pontszám)",
          "Beépített digitális munkatárs (Chatbot), ami 0-24 válaszol a vevőknek",
          "0 manuális adatrögzítés: az űrlapkitöltő rögtön bekerül a számlázódba",
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
              'We do more than software development — we automate your business workflows with practical, zero-data-entry AI systems.',
            highlights: ['Guaranteed ROI', '0 Manual Data Entry', 'Transparent Operations'],
            cards: [
              {
                title: 'Automated Lead Generation',
                desc: 'Client acquisition systems that bring in qualified leads every single day without manual effort.',
              },
              {
                title: 'Business Process Automation',
                desc: 'Invoice handling, support mailbox routing, and logistics monitoring running 24/7 in the background.',
              },
              {
                title: 'Custom Integrations',
                desc: 'Connecting your existing tools into a seamless, automated Virtual Department.',
              },
            ],
            whyTitle: 'Why choose us?',
            whyDesc:
              'We deliver clear business outcomes: hours saved per week, costs reduced, and zero manual data entry. Everything is trackable and transparent.',
            cta: 'Free consultation',
          }
        : {
            title: 'Unsere Dienstleistungen',
            subtitle:
              'Wir entwickeln nicht nur Software — wir automatisieren Ihre Geschäftsprozesse mit praxisnahen Systemen ohne manuelle Dateneingabe.',
            highlights: ['Garantierter ROI', '0 manuelle Dateneingabe', 'Transparente Abläufe'],
            cards: [
              {
                title: 'Automatische Lead-Generierung',
                desc: 'Kundengewinnungssysteme, die jeden Tag qualifizierte Leads ohne manuellen Aufwand liefern.',
              },
              {
                title: 'Automatisierung von Geschäftsprozessen',
                desc: 'Rechnungsverarbeitung, E-Mail-Routing und Logistik-Monitoring laufen rund um die Uhr im Hintergrund.',
              },
              {
                title: 'Individuelle Integrationen',
                desc: 'Wir verbinden Ihre bestehenden Tools zu einer nahtlosen, automatisierten virtuellen Abteilung.',
              },
            ],
            whyTitle: 'Warum wir?',
            whyDesc:
              'Wir liefern messbare Geschäftsergebnisse: eingesparte Stunden, reduzierte Kosten und null manuelle Dateneingabe.',
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
            Olyan rendszereket építünk, amelyek kiváltják az unalmas adminisztrációt, összekötik a szoftvereidet, és biztosítják a 0 manuális adatrögzítést.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["Garantált Megtérülés (ROI)", "0 Manuális Adatrögzítés", "Glass Box (Teljes Átláthatóság)"].map((tag) => (
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
            Fix havidíjas, kulcsrakész automatizációs rendszerek, amelyekkel azonnal látható költségcsökkenést és bevételnövekedést érhetsz el.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Basic Csomag",
                desc: "Ideális kezdő lépés az időrabló adminisztráció megszüntetésére.",
                price: "Megtakarítás: heti 10+ óra",
                features: ["Alapvető szoftverek (pl. Email, Naptár, Számlázó) összekötése", "1 db Automata Érdeklődő-mágnes", "Havi rendszerkarbantartás"]
              },
              {
                title: "Pro Csomag",
                desc: "Azoknak, akik egy komplett virtuális részleget szeretnének építeni.",
                price: "Megtakarítás: havi 1 teljes bér",
                features: ["Saját Céges Memóriaközpont (szabályzatokból, PDF-ekből)", "Automata Árajánlat generáló és Follow-up rendszer", "Glass Box vezetői dashboard"],
                highlight: true
              },
              {
                title: "Enterprise",
                desc: "Komplex, egyedi folyamatautomatizálás a legmagasabb biztonsági elvárásokkal.",
                price: "Garantált 90 napos ROI",
                features: ["Teljes ERP és vállalatirányítási integráció", "Intelligens döntéstámogató robotok a vezetőségnek", "Dedikált technikai projektmenedzser"]
              }
            ].map((pack) => (
              <div key={pack.title} className={`p-6 rounded-2xl border backdrop-blur-md flex flex-col h-full ${pack.highlight ? 'border-[#00e5ff] bg-[#00e5ff]/10 shadow-[0_0_20px_rgba(0,229,255,0.15)] relative' : 'border-white/10 bg-black/30'}`}>
                {pack.highlight && <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#00e5ff] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Legnépszerűbb</div>}
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
            Miért minket válassz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Clock,     title: "Garantált ROI és Időmegtakarítás", desc: "Minden fejlesztésünket az alapján mérjük, hogy hány munkaórát és mennyi pénzt spórol meg a cégednek." },
              { icon: Zap,       title: "Nem tanácsadunk. Megcsináljuk.", desc: "Minden amit felsorolunk, élesben fut. Nem PowerPoint, hanem kulcsrakészen működő rendszer." },
              { icon: Truck,     title: "0 Manuális Adatrögzítés", desc: "A rendszereink közötti kapcsolat megszünteti a dupla adatrögzítést és a felesleges Excel másolgatást." },
              { icon: Shield,    title: "Átláthatóság — Glass Box", desc: "A robot dolgozik, de a kontroll a tiéd. Minden folyamatot látsz a vizuális Kanban táblákon." },
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
          <p className="text-gray-400 mb-6 text-lg">Kérdésed van? Mutasd meg a problémád — megmutatjuk, mennyi időt és pénzt spórolunk meg neked.</p>
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