import Portfolio from "../components/Portfolio";
import { headers } from "next/headers";

export const revalidate = 3600;

export function generateMetadata() {
  const headerLang = headers().get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "Portfolio",
          description: "Featured projects and case studies — AI, automation, web development and business systems.",
          locale: "en_US",
          canonical: "/en/portfolio",
        }
      : language === "de"
        ? {
            title: "Portfolio",
            description: "Ausgewählte Projekte und Fallstudien — KI, Automatisierung, Webentwicklung und Geschäftssysteme.",
            locale: "de_DE",
            canonical: "/de/portfolio",
          }
        : {
            title: "Portfólió",
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
  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Főoldal", "item": "https://www.pohankaestarsa.com/" },
            { "@type": "ListItem", "position": 2, "name": "Portfólió", "item": "https://www.pohankaestarsa.com/portfolio" }
          ]
        })}}
      />
      <Portfolio />
    </>
  );
}
