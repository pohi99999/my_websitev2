import KapcsolatClient from "./KapcsolatClient";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "Contact",
          description: "Get in touch with Pohánka és Társa Kft. — business AI systems, automation and custom software development.",
          canonical: "/en/kapcsolat",
        }
      : language === "de"
        ? {
            title: "Kontakt",
            description: "Nehmen Sie Kontakt mit Pohánka és Társa Kft. auf — KI-Systeme, Automatisierung und individuelle Softwareentwicklung.",
            canonical: "/de/kapcsolat",
          }
        : {
            title: "Kapcsolat",
            description: "Vedd fel a kapcsolatot a Pohánka és Társa Kft.-vel — AI rendszerek, automatizálás és egyedi szoftverfejlesztés.",
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
        'x-default': "/kapcsolat",
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
