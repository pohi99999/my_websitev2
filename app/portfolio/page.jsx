import VideoBackground from "../components/VideoBackground";

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Portfólió oldal Videója */}
      <VideoBackground videoSrc="https://res.cloudinary.com/dbrwg0av5/video/upload/v1765517024/4_sucbhe.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Portfólió
        </h1>
        
        {/* Itt lesznek a kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Minta Kártya 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-md bg-black/30">
            <h3 className="text-2xl font-bold mb-2">HerWinner App</h3>
            <p className="text-gray-300">A befektetői projekt. Hamarosan...</p>
          </div>

          {/* Minta Kártya 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md bg-black/30">
            <h3 className="text-2xl font-bold mb-2">BAS System</h3>
            <p className="text-gray-300">Brunella Agent System operációs rendszer.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
