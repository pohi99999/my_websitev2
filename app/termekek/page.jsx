import Link from "next/link";
import { Bot, BrainCircuit, ArrowRight, PenTool } from "lucide-react";
import { headers } from "next/headers";

export const revalidate = 3600;

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "Products",
          description: "Our own products: Brunella, an AI team running on your company's own computer, P-Szakrajz for joiners, and Pohi AI Pro, in development.",
          locale: "en_US",
          canonical: "/en/termekek",
        }
      : language === "de"
        ? {
            title: "Produkte",
            description: "Unsere eigenen Produkte: Brunella, ein KI-Team auf dem eigenen Rechner Ihres Unternehmens, P-Szakrajz für Tischler und Pohi AI Pro, in Entwicklung.",
            locale: "de_DE",
            canonical: "/de/termekek",
          }
        : {
            title: "Termékek",
            description: "Saját termékeink: Brunella, a cég saját gépén futó AI-csapat, a P-Szakrajz asztalosoknak és a fejlesztés alatt álló Pohi AI Pro.",
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
        'x-default': "/termekek",
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

export default async function TermekekPage() {
  const headerStore = await headers();
  const headerLang = headerStore.get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";
  const withLang = (href) => (language === "hu" ? href : href === "/" ? `/${language}` : `/${language}${href}`);
  const ui =
    language === "en"
      ? {
          title: "Our own products",
          basDesc:
            "An AI team running on your company's own computer for emails, quote follow-up and a daily summary. Anything it would send out is approved by you first.",
          szakDesc:
            "Our own web app for joiners: Vision AI reads the dimensions from a hand sketch or an on-site photo, and the app turns them into a scaled technical drawing, a real-time 3D model and a quote.",
          status: "In development",
          pohiDesc:
            "A custom portal that unifies customer data, order flow, manufacturer stock, and transport planning, with AI-assisted automation.",
          details: "Details",
          open: "Open",
          ctaTitle: "No matching solution? Request a free consultation.",
          ctaBtn: "Request consultation",
        }
      : language === "de"
        ? {
            title: "Unsere eigenen Produkte",
            basDesc:
              "Ein KI-Team auf dem eigenen Rechner Ihres Unternehmens für E-Mails, Angebotsverfolgung und eine tägliche Zusammenfassung. Was nach außen geht, geben Sie vorher frei.",
            szakDesc:
              "Unsere eigene Web-App für Tischler: Vision AI liest die Maße aus einer Handskizze oder einem Foto vor Ort, und die App erstellt daraus eine maßstabsgetreue technische Zeichnung, ein 3D-Modell in Echtzeit und ein Angebot.",
            status: "In Entwicklung",
            pohiDesc:
              "Ein individuelles Portal, das Kundendaten, Bestellfluss, Herstellerbestände und Transportplanung mit KI-gestützter Automatisierung verbindet.",
            details: "Details",
            open: "Öffnen",
            ctaTitle: "Keine passende Lösung? Fordern Sie eine kostenlose Beratung an.",
            ctaBtn: "Beratung anfragen",
          }
        : {
            title: "Saját termékeink",
            basDesc:
              "A cég saját gépén futó AI-csapat levelekre, ajánlatkövetésre és napi összefoglalóra. Amit kifelé küldene, azt Ön hagyja jóvá.",
            szakDesc:
              "Saját webalkalmazásunk asztalosoknak: kézi vázlatból vagy helyszíni fotóból a Vision AI olvassa ki a méreteket, a program pedig méretarányos szakrajzot, valós idejű 3D modellt és árajánlatot készít belőle.",
            status: "Fejlesztés alatt",
            pohiDesc:
              "Egyedi fejlesztésű, teljes portál rendszer amely egy vevői adatbázis és annak rendelés állományát valamint a gyártok készletnyilvántartását összefésüli és kezeli a vevői igényekkel, fuvarszervezéssel egybe hangolva. Még fejlesztés alatt , tesztelés a Mesterséges Intelligencia által vezérelt automatizálása bevezetése a gyorsabb és átláthatóbb nyilvántartás érdekében.",
            details: "Részletek",
            open: "Megnyitás",
            ctaTitle: "Nincs megfelelő megoldás? Kérjen ingyenes konzultációt.",
            ctaBtn: "Kérjen konzultációt",
          };

  return (
    // a div, not a second <main>: the layout's #main-content is the page's main landmark
    <div className="relative min-h-screen flex flex-col items-center justify-center">
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
      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-[#00e5ff]">
          {ui.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="glass-panel p-8 rounded-2xl border border-white/8 hover:border-[#00e5ff]/30 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-[#00e5ff]/10 rounded-full text-[#00e5ff] mr-4 group-hover:rotate-12 transition-transform">
                <BrainCircuit size={32} />
              </div>
              <h2 className="text-3xl font-bold">Brunella</h2>
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              {ui.basDesc}
            </p>
            <Link
              href={withLang('/portfolio/brunella-bas')}
              className="inline-flex items-center text-[#00e5ff] font-bold hover:text-[#00e5ff]/80 transition-colors"
            >
              {ui.details} <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/8 hover:border-[#00e5ff]/30 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-[#00e5ff]/10 rounded-full text-[#00e5ff] mr-4 group-hover:rotate-12 transition-transform">
                <PenTool size={32} />
              </div>
              <h2 className="text-3xl font-bold">P-Szakrajz</h2>
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              {ui.szakDesc}
            </p>
            <a
              href="https://p-szakrajz.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#00e5ff] font-bold hover:text-[#00e5ff]/80 transition-colors"
            >
              {ui.open} <ArrowRight className="ml-2" size={20} />
            </a>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/8 hover:border-[#00e5ff]/30 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-[#00e5ff]/10 rounded-full text-[#00e5ff] mr-4 group-hover:rotate-12 transition-transform">
                <Bot size={32} />
              </div>
              <h2 className="text-3xl font-bold">Pohi AI Pro</h2>
            </div>
            <p className="mb-4">
              <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-300">
                {ui.status}
              </span>
            </p>
            <p className="text-gray-300 mb-6 flex-grow">
              {ui.pohiDesc}
            </p>
            <Link
              href={withLang('/termekek/pohi-ai-pro')}
              className="inline-flex items-center text-[#00e5ff] font-bold hover:text-[#00e5ff]/80 transition-colors"
            >
              {ui.details} <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

        </div>

        <section className="mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-10 rounded-2xl border border-white/10 backdrop-blur-md bg-black/40 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">{ui.ctaTitle}</h2>
              <Link href={withLang('/kapcsolat')} className="btn-primary inline-flex items-center gap-2">
                {ui.ctaBtn} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}