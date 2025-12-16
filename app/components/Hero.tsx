import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden pt-20">
      {/* Háttér effekt */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Főcím */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-white block mb-2">A Jövő Elkezdődött.</span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Innováció és Mesterséges Intelligencia
          </span>
        </h1>
        
        {/* Alcím (A mondat folytatása) */}
        <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          ...az ember kapcsolata az elkövetkező időszak kulcsa a sikerhez.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a href="#portfolio" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 flex items-center shadow-lg shadow-blue-900/50">
            Szolgáltatásaink <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a href="#contact" className="px-8 py-4 bg-transparent border border-slate-600 hover:border-white text-white rounded-full font-semibold transition-all hover:bg-slate-800">
            Kapcsolat
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
