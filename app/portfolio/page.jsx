import Portfolio from "../components/Portfolio";

export const metadata = {
  title: "Portfólió",
  description: "Kiemelt projektek és esettanulmányok – AI, automatizálás, webfejlesztés és üzleti rendszerek.",
  alternates: {
    canonical: "/portfolio"
  },
  openGraph: {
    title: "Portfólió | Pohánka AI",
    description: "Kiemelt projektek és esettanulmányok – AI, automatizálás, webfejlesztés és üzleti rendszerek.",
    url: "/portfolio",
    type: "website",
    locale: "hu_HU"
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólió | Pohánka AI",
    description: "Kiemelt projektek és esettanulmányok – AI, automatizálás, webfejlesztés és üzleti rendszerek."
  }
};

export default function PortfolioPage() {
  return <Portfolio />;
}
