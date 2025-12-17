import About from "../components/About";

export const metadata = {
  title: "Rólunk",
  description: "Pohánka és Társa Kft. – AI ügynökség és szoftverfejlesztés. Küldetés, szemlélet és technológiai fókusz.",
  alternates: {
    canonical: "/rolunk"
  },
  openGraph: {
    title: "Rólunk | Pohánka AI",
    description:
      "Pohánka és Társa Kft. – AI ügynökség és szoftverfejlesztés. Küldetés, szemlélet és technológiai fókusz.",
    url: "/rolunk",
    images: [{ url: "/images/logo.png", alt: "Pohánka és Társa Kft. – logó" }]
  },
  twitter: {
    card: "summary",
    title: "Rólunk | Pohánka AI",
    description:
      "Pohánka és Társa Kft. – AI ügynökség és szoftverfejlesztés. Küldetés, szemlélet és technológiai fókusz."
  }
};

export default function RolunkPage() {
  return <About />;
}
