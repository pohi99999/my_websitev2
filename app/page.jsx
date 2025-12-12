import VideoBackground from "./components/VideoBackground";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Főoldal Videója */}
      <VideoBackground videoSrc="https://res.cloudinary.com/dbrwg0av5/video/upload/v1765516398/0_rgswdr.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Pohánka & Társa
        </h1>
        <p className="text-2xl md:text-3xl mb-10 text-gray-200">
          A Jövő Elkezdődött. Innováció és Mesterséges Intelligencia.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/szolgaltatasok" className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 flex items-center justify-center">
            <span className="font-bold text-lg mr-2">Szolgáltatásaink</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link href="/kapcsolat" className="px-8 py-4 border-2 border-white/30 hover:border-white rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-white/10 font-bold text-lg">
            Kapcsolat
          </Link>
        </div>
      </div>
    </main>
  );
}
