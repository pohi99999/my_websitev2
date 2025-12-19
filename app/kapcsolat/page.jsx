import KapcsolatClient from "./KapcsolatClient";

export const metadata = {
  title: 'Kapcsolat | Pohánka és Társa Kft.',
  description: 'Lépjen kapcsolatba velünk! Kérjen ingyenes konzultációt szoftverfejlesztési vagy AI projektjéhez.',
  alternates: {
    canonical: "/kapcsolat"
  },
  openGraph: {
    title: 'Kapcsolat | Pohánka és Társa Kft.',
    description: 'Lépjen kapcsolatba velünk! Kérjen ingyenes konzultációt szoftverfejlesztési vagy AI projektjéhez.',
    url: "/kapcsolat",
    images: [{ url: "/images/logo.png", alt: "Pohánka és Társa Kft. – logó" }]
  },
  twitter: {
    card: "summary",
    title: 'Kapcsolat | Pohánka és Társa Kft.',
    description: 'Lépjen kapcsolatba velünk! Kérjen ingyenes konzultációt szoftverfejlesztési vagy AI projektjéhez.'
  }
};

export default function KapcsolatPage() {
  return <KapcsolatClient />;
}
