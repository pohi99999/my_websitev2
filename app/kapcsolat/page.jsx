import VideoBackground from "../components/VideoBackground";
import { Mail, Phone, MapPin } from "lucide-react";

export default function KapcsolatPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <VideoBackground videoSrc="/contact.mp4" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-white">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Lépj Velünk Kapcsolatba
        </h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Elérhetőségek</h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg font-semibold">peterpohankapersonal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telefon</p>
                  <p className="text-lg font-semibold">+36 30 244 6779</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-500/20 rounded-full text-pink-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Iroda</p>
                  <p className="text-lg font-semibold">8900 Zalaegerszeg, Magyarország</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Írj nekünk</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Név</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Az Ön neve"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="email@cim.hu"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Üzenet</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors h-32"
                  placeholder="Miben segíthetünk?"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Üzenet Küldése
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
