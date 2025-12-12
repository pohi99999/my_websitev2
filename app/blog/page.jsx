import VideoBackground from "../components/VideoBackground";

export default function BlogPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Blog oldal Videója */}
      <VideoBackground videoSrc="https://res.cloudinary.com/dbrwg0av5/video/upload/v1765517146/5_mumff9.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Blog & Tudástár
        </h1>
        
        {/* Blog Lista (Placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Minta Blog Poszt 1 */}
           <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-md bg-black/30">
              <span className="text-xs font-mono text-pink-400 mb-2 block">2023. Okt. 25.</span>
              <h2 className="text-2xl font-bold mb-3">A BAS Rendszer Születése</h2>
              <p className="text-gray-300 mb-4">Hogyan jutottunk el a fekete doboztól az átlátható AI operációs rendszerig.</p>
              <button className="text-sm font-bold text-white uppercase tracking-wider hover:text-pink-400 transition-colors">
                Olvass tovább →
              </button>
           </div>

           {/* Minta Blog Poszt 2 */}
           <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-md bg-black/30">
              <span className="text-xs font-mono text-pink-400 mb-2 block">2023. Nov. 12.</span>
              <h2 className="text-2xl font-bold mb-3">AI vs. Emberi Kreativitás</h2>
              <p className="text-gray-300 mb-4">Miért a szinergia a jövő, és nem a helyettesítés?</p>
              <button className="text-sm font-bold text-white uppercase tracking-wider hover:text-pink-400 transition-colors">
                Olvass tovább →
              </button>
           </div>
        </div>
      </div>
    </main>
  );
}
