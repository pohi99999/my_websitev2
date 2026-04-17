import About from "../components/About";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headerStore = await headers();
  const headerLang = headerStore.get("x-site-language");
  const language = headerLang === "en" ? "en" : headerLang === "de" ? "de" : "hu";

  const meta =
    language === "en"
      ? {
          title: "About Us | Business AI Systems",
          description: "Pohánka & Társa designs and delivers business-ready AI systems, custom automations and practical integrations for companies.",
          canonical: "/en/rolunk",
        }
      : language === "de"
        ? {
            title: "Über uns | KI-Systeme für Unternehmen",
            description: "Pohánka & Társa entwirft und liefert praxisnahe KI-Systeme, individuelle Automatisierung und Integrationen für Unternehmen.",
            canonical: "/de/rolunk",
          }
        : {
            title: "Rólunk | AI rendszerek vállalkozásoknak",
            description: "Pohánka és Társa Kft. vállalkozásokra szabott AI rendszereket, automatizálást és integrációkat tervez, fejleszt és vezet be.",
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
