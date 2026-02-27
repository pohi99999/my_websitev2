import VideoBackground from "../components/VideoBackground";
import {
  Cpu, Globe, Zap, Search, BarChart3, Lightbulb, Mail,
  Target, TrendingUp, FileText, Package, Users, Brain,
  ArrowRight, CheckCircle, Building2, Truck, Shield
} from "lucide-react";

export const metadata = {
  title: "Szolgáltatásaink | Szoftverfejlesztés & AI | Pohánka AI",
  description:
    "AI-alapú lead generálás, üzleti folyamat automatizálás, marketing kampányok, piackutatás és egyedi szoftver fejlesztés. Pohánka & Társa — ahol az automatizálás munkává válik.",
  alternates: { canonical: "/szolgaltatasok" },
  openGraph: {
    title: "Szolgáltatásaink | AI Automatizálás & Szoftverfejlesztés",
    description:
      "AI-alapú lead generálás, üzleti folyamat automatizálás, marketing kampányok és egyedi szoftver fejlesztés.",
    url: "/szolgaltatasok",
    images: [{ url: "/images/logo.png", alt: "Pohánka és Társa Kft. – logó" }],
  },
  twitter: {
    card: "summary",
    title: "Szolgáltatásaink | Pohánka AI",
    description: "AI-alapú automatizálás, lead generálás és szoftverfejlesztés.",
  },
};

const categories = [
  {
    id: "lead",
    icon: Target,
    color: "blue",
    gradient: "from-blue-400 to-cyan-400",
    border: "hover:border-blue-500/60",
    bg: "bg-blue-500/20",
    text: "text-blue-400",
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
    color: "purple",
    gradient: "from-purple-400 to-pink-400",
    border: "hover:border-purple-500/60",
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    title: "Üzleti Folyamatok Automatizálása",
    subtitle: "Amit ma kézzel csinálsz — holnaptól csinálja helyetted a rendszer.",
    services: [
      {
        name: "Számla- és pénzügyi feldolgozás",
        desc:
          "AI ügynökünk beolvassa, kategorizálja és exportálja a számlákat — OCR technológiával, anomália-detektálással. Véget ér a manuális számlavezetés.",
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
    color: "green",
    gradient: "from-green-400 to-emerald-400",
    border: "hover:border-green-500/60",
    bg: "bg-green-500/20",
    text: "text-green-400",
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
    color: "orange",
    gradient: "from-orange-400 to-yellow-400",
    border: "hover:border-orange-500/60",
    bg: "bg-orange-500/20",
    text: "text-orange-400",
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
    color: "yellow",
    gradient: "from-yellow-400 to-amber-400",
    border: "hover:border-yellow-500/60",
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
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
    color: "pink",
    gradient: "from-pink-400 to-red-400",
    border: "hover:border-pink-500/60",
    bg: "bg-pink-500/20",
    text: "text-pink-400",
    title: "Egyedi AI Rendszer Fejlesztés",
    subtitle: "Ha a kész megoldások nem elégek — megcsináljuk a sajátodat.",
    services: [
      {
        name: "Testreszabott AI ügynök és automatizálási rendszer",
        desc:
          "Teljesen egyedi AI rendszert fejlesztünk — a te folyamataidra, a te iparágadra, a te csapatod munkastílusához igazítva. Integrálunk meglévő rendszerekbe, és valós idejű dashboardot adunk mellé.",
        bullets: [
          "Teljes igényfelmérés és folyamattérkép",
          "Egyedi AI ügynök fejlesztés (Node.js / Python)",
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
    color: "cyan",
    gradient: "from-cyan-400 to-blue-400",
    border: "hover:border-cyan-500/60",
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
    title: "Webfejlesztés AI-val kiegészítve",
    subtitle: "Modern weboldal, ami nem csak szép — hanem dolgozik is.",
    services: [
      {
        name: "Next.js weboldal beépített AI funkciókkal",
        desc:
          "SEO-optimalizált, mobilbarát weboldalak — beépített AI funkciókkal. A weboldalad kap chatbotot, automatikus ajánlatküldőt, foglaláskezelőt vagy lead-qualification rendszert.",
        bullets: [
          "Gyors, modern weboldal (Next.js, Tailwind CSS)",
          "SEO alapok beépítve az első naptól",
          "AI chatbot integráció (ügyfélszolgálat, foglalás, ajánlatkérés)",
          "Google Analytics + teljesítménykövetés",
          "Folyamatos karbantartás és frissítés",
        ],
        forWho: "Vállalkozóknak, KKV-knak, szolgáltatóknak, önkormányzatoknak",
      },
    ],
  },
];

const colorMap = {
  blue:   { dot: "bg-blue-400"   },
  purple: { dot: "bg-purple-400" },
  green:  { dot: "bg-green-400"  },
  orange: { dot: "bg-orange-400" },
  yellow: { dot: "bg-yellow-400" },
  pink:   { dot: "bg-pink-400"   },
  cyan:   { dot: "bg-cyan-400"   },
};

export default function SzolgaltatasokPage() {
  return (
    <main className="relative min-h-screen">
      <VideoBackground videoSrc="/services.mp4" />
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 text-white">

        {/* Hero */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Szolgáltatásaink
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Nem csak szoftvert fejlesztünk —{" "}
            <span className="text-white font-semibold">automatizáljuk a vállalkozásod jövőjét.</span>{" "}
            AI ügynökeink naponta végzik el azt a munkát, ami korábban egy 5–10 fős csapatnak kellett volna.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["Magyar piac ismerete", "Élesben futó rendszerek", "Átlátható működés"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-gray-200 backdrop-blur-sm">
                <CheckCircle size={14} className="text-green-400" />
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
                className={`flex items-center gap-2 ${cat.bg} border border-white/10 ${cat.border} rounded-full px-4 py-2 text-sm ${cat.text} backdrop-blur-sm transition-all duration-200 hover:scale-105`}
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
            const colors = colorMap[cat.color];
            return (
              <section key={cat.id} id={cat.id}>
                <div className="flex items-start gap-4 mb-8">
                  <div className={`p-3 ${cat.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={28} className={cat.text} />
                  </div>
                  <div>
                    <h2 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${cat.gradient}`}>
                      {catIdx + 1}. {cat.title}
                    </h2>
                    <p className="text-gray-400 mt-1 text-lg">{cat.subtitle}</p>
                  </div>
                </div>

                <div className={`grid gap-6 ${cat.services.length === 1 ? "grid-cols-1 max-w-3xl" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                  {cat.services.map((svc) => (
                    <div
                      key={svc.name}
                      className={`glass-panel p-7 rounded-2xl border border-white/10 ${cat.border} transition-all duration-300 backdrop-blur-md bg-black/30`}
                    >
                      <h3 className="text-xl font-bold mb-3 text-white">{svc.name}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-5">{svc.desc}</p>
                      <ul className="space-y-2 mb-5">
                        {svc.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-gray-200">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${colors.dot}`} />
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

        {/* Miért mi */}
        <section className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Miért minket válassz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Zap,       color: "text-yellow-400", bg: "bg-yellow-500/10", title: "Nem tanácsadunk. Megcsináljuk.", desc: "Minden amit felsorolunk, élesben fut. Nem PowerPoint, hanem működő rendszer." },
              { icon: Users,     color: "text-blue-400",   bg: "bg-blue-500/10",   title: "Kis csapat, nagy teljesítmény.", desc: "AI ügynökeink elvégzik, ami egy 5–10 fős csapatnak kellene. Gyorsan, hibátlanul, hétvégén is." },
              { icon: Building2, color: "text-green-400",  bg: "bg-green-500/10",  title: "Magyar piac ismerete.", desc: "Rendszereink magyar vállalkozásokra kalibráltak — magyar adatbázisokkal és kommunikációs stílussal." },
              { icon: Shield,    color: "text-purple-400", bg: "bg-purple-500/10", title: "Átláthatóság — Glass Box.", desc: "Minden futó folyamatot látsz: valós idejű dashboard, értesítések, riportok. Teljes kontroll." },
            ].map((item) => {
              const I = item.icon;
              return (
                <div key={item.title} className={`flex gap-4 p-6 rounded-2xl border border-white/10 backdrop-blur-md bg-black/30 ${item.bg}`}>
                  <I size={24} className={`${item.color} shrink-0 mt-0.5`} />
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:scale-105"
          >
            Ingyenes konzultáció
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </main>
  );
}
