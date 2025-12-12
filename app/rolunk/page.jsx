import VideoBackground from "../components/VideoBackground";

export default function RolunkPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <VideoBackground videoSrc="/about.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Rólunk
        </h1>
        
        <div className="prose prose-lg prose-invert max-w-3xl glass-panel p-8 rounded-2xl border border-white/10 backdrop-blur-md bg-black/40">
          <p className="text-xl leading-relaxed mb-6">
            A Pohánka és Társa Kft. nem csupán szoftverfejlesztő cég. Mi vagyunk az Ön digitális partnerei a jövőben.
          </p>
          <p className="text-gray-300">
             Csapatunk a legjobb fejlesztőkből és AI szakértőkből áll, akik szenvedélyesen hisznek az innovációban. Célunk, hogy olyan megoldásokat hozzunk létre, amelyek valóban megváltoztatják az üzleteket.
          </p>
        </div>
      </div>
    </main>
  );
}
