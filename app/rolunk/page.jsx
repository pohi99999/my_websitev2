import About from "../components/About";
import { headers } from "next/headers";

export function generateMetadata() {
  const headerLang = headers().get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "About Us | Pohánka AI",
          description: "Pohánka & Társa — AI agency and software development. Mission, approach and technology focus.",
          canonical: "/en/rolunk",
        }
      : language === "de"
        ? {
            title: "Über uns | Pohánka AI",
            description: "Pohánka & Társa — KI-Agentur und Softwareentwicklung. Mission, Ansatz und technologischer Fokus.",
            canonical: "/de/rolunk",
          }
        : {
            title: "Rólunk | Pohánka AI",
            description: "Pohánka és Társa Kft. – AI ügynökség és szoftverfejlesztés. Küldetés, szemlélet és technológiai fókusz.",
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
      images: [{ url: "/images/logo.png", alt: "Pohánka és Társa Kft. – logó" }],
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function RolunkPage() {
  return <About />;
}
