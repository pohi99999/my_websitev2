import VideoBackground from "../components/VideoBackground";
import Link from "next/link";
import { Bot, BrainCircuit, ArrowRight } from "lucide-react";
import VideoShowcase from "./components/VideoShowcase";
import { headers } from "next/headers";

export const revalidate = 3600;

export function generateMetadata() {
  const headerLang = headers().get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "Products | Pohánka AI",
          description: "Brunella Agent System (BAS), Pohi AI Pro and additional AI solutions for SMEs.",
          locale: "en_US",
          canonical: "/en/termekek",
        }
      : language === "de"
        ? {
            title: "Produkte | Pohánka AI",
            description: "Brunella Agent System (BAS), Pohi AI Pro und weitere KI-Lösungen für KMU.",
            locale: "de_DE",
            canonical: "/de/termekek",
          }
        : {
            title: "Termékek | Pohánka AI",
            description: "Brunella Agent System (BAS), Pohi AI Pro és további AI megoldások – termékek és platformok KKV-k számára.",
            locale: "hu_HU",
            canonical: "/termekek",
          };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: "/termekek",
        en: "/en/termekek",
        de: "/de/termekek",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      type: "website",
      locale: meta.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function TermekekPage() {
  const headerLang = headers().get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";
  const withLang = (href) => (language === "hu" ? href : href === "/" ? `/${language}` : `/${language}${href}`);
  const ui =
    language === "en"
      ? {
          title: "Products & Solutions",
          basDesc:
            "The Brunella Agent System: a practical AI operating layer for businesses. Not just a chatbot, but a digital workforce that can perceive, decide and act.",
          pohiDesc:
            "A custom portal that unifies customer data, order flow, manufacturer stock, and transport planning, with AI-assisted automation.",
          moreTitle: "More Solutions",
          moreDesc:
            "Additional practical methods and AI patterns to improve innovation and competitiveness.",
          details: "Details",
          open: "Open",
          ctaTitle: "Need a better-fit solution?",
          ctaDesc:
            "Describe your process in a few lines and we will propose a concrete AI automation plan (fast ROI, secure rollout).",
          ctaBtn: "Request consultation",
        }
      : language === "de"
        ? {
            title: "Produkte & Lösungen",
            basDesc:
              "Das Brunella Agent System: eine praxisnahe KI-Betriebsschicht für Unternehmen. Nicht nur Chatbot, sondern eine digitale Workforce, die wahrnimmt, entscheidet und handelt.",
            pohiDesc:
              "Ein individuelles Portal, das Kundendaten, Bestellfluss, Herstellerbestände und Transportplanung mit KI-gestützter Automatisierung verbindet.",
            moreTitle: "Weitere Lösungen",
            moreDesc:
              "Zusätzliche praxisnahe Methoden und KI-Muster für mehr Innovation und Wettbewerbsfähigkeit.",
            details: "Details",
            open: "Öffnen",
            ctaTitle: "Keine passende Lösung gefunden?",
            ctaDesc:
              "Beschreiben Sie Ihren Prozess in wenigen Sätzen, und wir schlagen einen konkreten KI-Automatisierungsplan vor (schneller ROI, sichere Einführung).",
            ctaBtn: "Beratung anfragen",
          }
        : {
            title: "Termékeink & Megoldásaink",
            basDesc:
              "A Brunella Agent System: Az első valódi AI Operációs Rendszer vállalkozásoknak. Nem csak egy chatbot, hanem egy teljes digitális munkaerő, ami lát, hall és cselekszik helyetted.",
            pohiDesc:
              "Egyedi fejlesztésű, teljes portál rendszer amely egy vevői adatbázis és annak rendelés állományát valamint a gyártok készletnyilvántartását összefésüli és kezeli a vevői igényekkel, fuvarszervezéssel egybe hangolva. Még fejlesztés alatt , tesztelés a Mesterséges Intelligencia által vezérelt automatizálása bevezetése a gyorsabb és átláthatóbb nyilvántartás érdekében.",
            moreTitle: "További Megoldások",
            moreDesc:
              "További Fantasztikus Megoldások, melyek a Vállalkozások számára az Innováció és Versenyképesség élvonalába tartozásához Segítséget Nyújt, az alábbi linken mutatok pár praktikát, és módszert betekintést gyanánt",
            details: "Részletek",
            open: "Megnyitás",
            ctaTitle: "Nincs megfelelő megoldás?",
            ctaDesc:
              "Írja le pár mondatban a folyamatait, és javaslunk egy konkrét AI automatizálási tervet (gyors ROI fókusz, biztonságos bevezetés).",
            ctaBtn: "Kérjen konzultációt",
          };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Főoldal", "item": "https://www.pohankaestarsa.com/" },
            { "@type": "ListItem", "position": 2, "name": "Termékek", "item": "https://www.pohankaestarsa.com/termekek" }
          ]
        })}}
      />
      <VideoBackground videoSrc="/products.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {ui.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-blue-500/20 rounded-full text-blue-400 mr-4 group-hover:rotate-12 transition-transform">
                <BrainCircuit size={32} />
              </div>
              <h2 className="text-3xl font-bold">BAS System</h2>
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              {ui.basDesc}
            </p>
            <Link
              href={withLang('/termekek/brunella-agents')}
              className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors"
            >
              {ui.details} <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-purple-500/20 rounded-full text-purple-400 mr-4 group-hover:rotate-12 transition-transform">
                <Bot size={32} />
              </div>
              <h2 className="text-3xl font-bold">Pohi AI Pro</h2>
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              {ui.pohiDesc}
            </p>
            <Link
              href={withLang('/termekek/pohi-ai-pro')}
              className="inline-flex items-center text-purple-400 font-bold hover:text-purple-300 transition-colors"
            >
              {ui.details} <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-emerald-500/20 rounded-full text-emerald-400 mr-4 group-hover:rotate-12 transition-transform">
                <BrainCircuit size={32} />
              </div>
              <h2 className="text-3xl font-bold">{ui.moreTitle}</h2>
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              {ui.moreDesc}
            </p>
            <Link
              href={withLang('/blog')}
              className="inline-flex items-center text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
            >
              {ui.open} <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>

        <VideoShowcase />

        <section className="mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-10 rounded-2xl border border-white/10 backdrop-blur-md bg-black/40 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{ui.ctaTitle}</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                {ui.ctaDesc}
              </p>
              <Link href={withLang('/kapcsolat')} className="btn-primary inline-flex items-center gap-2">
                {ui.ctaBtn} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}