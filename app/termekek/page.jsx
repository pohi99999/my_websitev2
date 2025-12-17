import VideoBackground from "../components/VideoBackground";
import Link from "next/link";
import { Bot, BrainCircuit, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Termékek",
  description: "Brunella Agent System (BAS), Pohi AI Pro és további AI megoldások – termékek és platformok KKV-k számára.",
  alternates: {
    canonical: "/termekek"
  },
  openGraph: {
    title: "Termékek | Pohánka AI",
    description: "Brunella Agent System (BAS), Pohi AI Pro és további AI megoldások – termékek és platformok KKV-k számára.",
    url: "/termekek",
    images: [{ url: "/images/logo.png", alt: "Pohánka és Társa Kft. – logó" }]
  },
  twitter: {
    card: "summary",
    title: "Termékek | Pohánka AI",
    description: "Brunella Agent System (BAS), Pohi AI Pro és további AI megoldások – termékek és platformok KKV-k számára."
  }
};

export default function TermekekPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <VideoBackground videoSrc="/products.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Termékeink & Megoldásaink
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-blue-500/20 rounded-full text-blue-400 mr-4 group-hover:rotate-12 transition-transform">
                <BrainCircuit size={32} />
              </div>
              <h2 className="text-3xl font-bold">BAS System</h2>
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              A Brunella Agent System: Az első valódi AI Operációs Rendszer vállalkozásoknak. Nem csak egy chatbot, hanem egy teljes digitális munkaerő, ami lát, hall és cselekszik helyetted.
            </p>
            <Link
              href="/termekek/brunella-agents"
              className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors"
            >
              Részletek <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-purple-500/20 rounded-full text-purple-400 mr-4 group-hover:rotate-12 transition-transform">
                <Bot size={32} />
              </div>
              <h2 className="text-3xl font-bold">Pohi AI Pro</h2>
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              Egyedi fejlesztésű, teljes portál rendszer amely egy vevői adatbázis és annak rendelés állományát valamint a gyártok készletnyilvántartását összefésüli és kezeli a vevői igényekkel, fuvarszervezéssel egybe hangolva. Még fejlesztés alatt , tesztelés a Mesterséges Intelligencia által vezérelt automatizálása bevezetése a gyorsabb és átláthatóbb nyilvántartás érdekében.
            </p>
            <Link
              href="/termekek/pohi-ai-pro"
              className="inline-flex items-center text-purple-400 font-bold hover:text-purple-300 transition-colors"
            >
              Részletek <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-md bg-black/40 flex flex-col group">
            <div className="flex items-center mb-6">
              <div className="p-4 bg-emerald-500/20 rounded-full text-emerald-400 mr-4 group-hover:rotate-12 transition-transform">
                <BrainCircuit size={32} />
              </div>
              <h2 className="text-3xl font-bold">További Megoldások</h2>
            </div>
            <p className="text-gray-300 mb-6 flex-grow">
              További Fantasztikus Megoldások, melyek a Vállalkozások számára az Innováció és Versenyképesség élvonalába tartozásához Segítséget Nyújt, az alábbi linken mutatok pár praktikát, és módszert betekintést gyanánt
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
            >
              Megnyitás <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}