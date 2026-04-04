import About from "../components/About";
import { headers } from "next/headers";

export function generateMetadata() {
  const headerLang = headers().get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "About Us",
          description: "Pohánka & Társa — AI agency and software development. Learn about our mission, values, approach and technology focus.",
          canonical: "/en/rolunk",
        }
      : language === "de"
        ? {
            title: "Über uns",
            description: "Pohánka & Társa — KI-Agentur und Softwareentwicklung. Erfahren Sie mehr über unsere Mission, Werte und Technologie-Fokus.",
            canonical: "/de/rolunk",
          }
        : {
            title: "Rólunk",
            description: "Pohánka és Társa Kft. – AI ügynökség és szoftverfejlesztés. Ismerje meg küldetésünket, értékeinket és technológiai fókuszunkat.",
            canonical: "/rolunk",
          };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: "/rolunk",
        en: "/en/rolunk",
        de: "/de/rolunk",
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

export default function RolunkPage() {
  return <About />;
}
