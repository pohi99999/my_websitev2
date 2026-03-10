import KapcsolatClient from "./KapcsolatClient";
import { headers } from "next/headers";

export function generateMetadata() {
  const headerLang = headers().get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "Contact | Pohánka AI",
          description: "Get in touch with us and request a free consultation for your software or AI project.",
          canonical: "/en/kapcsolat",
        }
      : language === "de"
        ? {
            title: "Kontakt | Pohánka AI",
            description: "Kontaktieren Sie uns für eine kostenlose Beratung zu Ihrem Software- oder KI-Projekt.",
            canonical: "/de/kapcsolat",
          }
        : {
            title: "Kapcsolat | Pohánka és Társa Kft.",
            description: "Lépjen kapcsolatba velünk! Kérjen ingyenes konzultációt szoftverfejlesztési vagy AI projektjéhez.",
            canonical: "/kapcsolat",
          };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
      languages: {
        hu: "/kapcsolat",
        en: "/en/kapcsolat",
        de: "/de/kapcsolat",
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

export default function KapcsolatPage() {
  return <KapcsolatClient />;
}
