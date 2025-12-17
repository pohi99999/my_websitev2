import KapcsolatClient from "./KapcsolatClient";

export const metadata = {
  title: "Kapcsolat",
  description:
    "Kapcsolatfelvétel a Pohánka és Társa Kft.-vel – AI megoldások, Brunella Agent System és egyedi fejlesztések.",
  alternates: {
    canonical: "/kapcsolat"
  },
  openGraph: {
    title: "Kapcsolat | Pohánka AI",
    description:
      "Kapcsolatfelvétel a Pohánka és Társa Kft.-vel – AI megoldások, Brunella Agent System és egyedi fejlesztések.",
    url: "/kapcsolat",
    images: [{ url: "/images/logo.png", alt: "Pohánka és Társa Kft. – logó" }]
  },
  twitter: {
    card: "summary",
    title: "Kapcsolat | Pohánka AI",
    description:
      "Kapcsolatfelvétel a Pohánka és Társa Kft.-vel – AI megoldások, Brunella Agent System és egyedi fejlesztések."
  }
};

export default function KapcsolatPage() {
  return <KapcsolatClient />;
}
