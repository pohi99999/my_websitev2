import Portfolio from "../components/Portfolio";
import { headers } from "next/headers";

export function generateMetadata() {
  const headerLang = headers().get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "Portfolio | Pohánka AI",
          description: "Featured projects and case studies — AI, automation, web development and business systems.",
          locale: "en_US",
          canonical: "/en/portfolio",
        }
      : language === "de"
        ? {
            title: "Portfolio | Pohánka AI",
            description: "Ausgewählte Projekte und Fallstudien — KI, Automatisierung, Webentwicklung und Geschäftssysteme.",
            locale: "de_DE",
            canonical: "/de/portfolio",
          }
        : {
            title: "Portfólió | Pohánka AI",
            description: "Kiemelt projektek és esettanulmányok – AI, automatizálás, webfejlesztés és üzleti rendszerek.",
            locale: "hu_HU",
            canonical: "/portfolio",
          };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: "/portfolio",
        en: "/en/portfolio",
        de: "/de/portfolio",
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

export default function PortfolioPage() {
  return <Portfolio />;
}
