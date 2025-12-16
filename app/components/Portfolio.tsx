import React from 'react';
import { ArrowRight, Award, ShieldCheck, TrendingUp } from 'lucide-react';

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Kiemelt Projektjeink
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ahol a technológia találkozik az üzleti hatékonysággal.
          </p>
        </div>

        {/* Projekt Kártyák */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* 1. BAS */}
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-blue-900/50 to-slate-900/50 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">BAS</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Brunella Agent System</h3>
              <p className="text-slate-400 mb-6">
                Az első valódi AI Operációs Rendszer. Nem csak válaszol, hanem önállóan cselekszik és végrehajt.
              </p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Részletek <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Pohi AI Pro */}
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30 flex items-center">
              <Award className="w-3 h-3 mr-1" /> WINNER
            </div>
            <div className="h-48 bg-gradient-to-br from-purple-900/50 to-slate-900/50 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">Pohi AI Pro</span>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Pohi AI Pro</h3>
              <p className="text-slate-400 mb-6">
                Intelligens B2B kereskedelmi és logisztikai platform. Gyártók és vevők automatizált összekapcsolása.
              </p>
              <a href="#" className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Részletek <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3. Üzleti Automatizálás */}
          <div className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-emerald-900/50 to-slate-900/50 flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-emerald-400" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Üzleti Automatizálás</h3>
              <p className="text-slate-400 mb-6">
                Teljes körű folyamat-automatizálás a BAS rendszer segítségével. Spórolj időt, növeld a profitot.
              </p>
              <a href="#" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Részletek <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Eredmények és Tanúsítványok Sáv (Trust Bar) */}
        <div className="border-t border-slate-800 pt-16">
          <h3 className="text-center text-2xl font-bold text-white mb-10">Minősítéseink és Eredményeink</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Google Developer */}
            <div className="p-6 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-center mb-4">
                <img
                  src="/images/google-dev-badge1.png"
                  alt="Google Developer"
                  className="h-16 w-16 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
              <h4 className="font-semibold text-white">Google Developer Program</h4>
              <p className="text-sm text-slate-500">Hivatalos Tag</p>
            </div>

            {/* Cloud Innovator */}
            <div className="p-6 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="h-12 w-12 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white">Google Cloud Innovators</h4>
              <p className="text-sm text-slate-500">AI &amp; Cloud Expert</p>
            </div>

            {/* A+ Minősítés */}
            <div className="p-6 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-center mb-4 text-4xl font-bold text-yellow-500">A+</div>
              <h4 className="font-semibold text-white">Pénzügyi Stabilitás</h4>
              <p className="text-sm text-slate-500">Kiemelt cégminősítés</p>
            </div>

            {/* Track Record */}
            <div className="p-6 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-center mb-4 text-4xl font-bold text-emerald-500">3.2 Mrd</div>
              <h4 className="font-semibold text-white">Igazolt Forgalom</h4>
              <p className="text-sm text-slate-500">Korábbi cégvezetés alatt</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
