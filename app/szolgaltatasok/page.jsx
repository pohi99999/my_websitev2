import VideoBackground from "../components/VideoBackground";
import { Cpu, Globe, Zap } from "lucide-react";

export const metadata = {
  title: "Szolgáltatások",
  description: "Webfejlesztés, AI integráció és digitális transzformáció – modern megoldások Next.js és AI ágensek alapokon.",
  alternates: {
    canonical: "/szolgaltatasok"
  },
  openGraph: {
    title: "Szolgáltatások | Pohánka AI",
    description:
      "Webfejlesztés, AI integráció és digitális transzformáció – modern megoldások Next.js és AI ágensek alapokon.",
    url: "/szolgaltatasok",
    images: [{ url: "/images/logo.png", alt: "Pohánka és Társa Kft. – logó" }]
  },
  twitter: {
    card: "summary",
    title: "Szolgáltatások | Pohánka AI",
    description:
      "Webfejlesztés, AI integráció és digitális transzformáció – modern megoldások Next.js és AI ágensek alapokon."
  }
};

export default function SzolgaltatasokPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <VideoBackground videoSrc="/services.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Szolgáltatásaink
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md bg-black/30 group">
            <div className="p-4 bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <Globe size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Webfejlesztés</h3>
            <p className="text-gray-300">Modern, AI-vezérelt weboldalak és webalkalmazások Next.js alapokon.</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-md bg-black/30 group">
            <div className="p-4 bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
              <Cpu size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Integráció</h3>
            <p className="text-gray-300">Üzleti folyamatok automatizálása intelligens ágensekkel (BAS).</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-md bg-black/30 group">
            <div className="p-4 bg-pink-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Digitális Transzformáció</h3>
            <p className="text-gray-300">Azonnali hatékonyságnövelés a legújabb technológiák bevezetésével.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
