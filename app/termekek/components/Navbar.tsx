import React from 'react';
import Link from 'next/link';

// Placeholder Logó
const Logo = () => <span className="text-2xl font-bold text-white">AI Partner</span>;

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-dark/80 backdrop-blur-md border-b border-brand-light/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logó */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Navigációs Linkek (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/termekek/pohi-ai" className="text-brand-light/80 hover:text-brand-accent transition-colors">
              Pohi AI Pro
            </Link>
            <Link href="/termekek/brunella-agents" className="text-brand-light/80 hover:text-brand-accent transition-colors">
              Brunella Agents
            </Link>
            <Link href="/misszionk" className="text-brand-light/80 hover:text-brand-accent transition-colors">
              Missziónk
            </Link>
            <Link href="/kapcsolat" className="text-brand-light/80 hover:text-brand-accent transition-colors">
              Kapcsolat
            </Link>
          </div>

          {/* CTA Gomb */}
          <div className="hidden md:block">
            <Link
              href="/kapcsolat"
              className="bg-brand-accent text-brand-dark font-bold py-2.5 px-6 rounded-full text-sm hover:bg-opacity-90 transition-all"
            >
              Kezdjük el
            </Link>
          </div>

          {/* Mobil Menü Gomb (Placeholder) */}
          <div className="md:hidden">
            <button className="text-brand-light/80 text-3xl">☰</button>
          </div>

        </div>
      </div>
    </nav>
  );
}