import KapcsolatClient from "./KapcsolatClient";
import { headers } from "next/headers";

export function generateMetadata() {
  const headerLang = headers().get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "Contact",
          description: "Get in touch with Pohánka & Társa and request a free consultation for your software or AI project. We'd love to hear from you.",
          canonical: "/en/kapcsolat",
        }
      : language === "de"
        ? {
            title: "Kontakt",
            description: "Kontaktieren Sie Pohánka & Társa für eine kostenlose Beratung zu Ihrem Software- oder KI-Projekt. Wir freuen uns auf Ihre Nachricht.",
            canonical: "/de/kapcsolat",
          }
        : {
            title: "Kapcsolat",
            description: "Lépjen kapcsolatba a Pohánka és Társa Kft.-vel! Kérjen ingyenes konzultációt szoftverfejlesztési vagy AI projektjéhez. Várjuk megkeresését!",
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

export default function KapcsolatPage() {
  return <KapcsolatClient />;
}
