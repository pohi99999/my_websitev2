import React from 'react';
import Link from 'next/link';

// Placeholder Logó
const Logo = () => <span className="text-2xl font-bold text-white">AI Partner</span>;

export default function Footer() {
  return (
    <footer className="bg-brand-gray border-t border-brand-light/10 text-brand-light/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* 1. oszlop: Logó és Misszió */}
          <div>
            <Logo />
            <p className="mt-4 text-sm">
              Automatizált intelligencia, ami felszabadítja az emberi kreativitást.
            </p>
            {/* Social Ikonok Placeholder */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-2xl hover:text-brand-accent">🔗</a>
              <a href="#" className="text-2xl hover:text-brand-accent">🔗</a>
              <a href="#" className="text-2xl hover:text-brand-accent">🔗</a>
            </div>
          </div>

          {/* 2. oszlop: Linkek */}
          <div>
            <h4 className="font-semibold text-brand-light uppercase tracking-wider">Oldaltérkép</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/termekek/pohi-ai" className="hover:text-brand-accent">Pohi AI Pro</Link></li>
              <li><Link href="/termekek/brunella-agents" className="hover:text-brand-accent">Brunella Agents</Link></li>
              <li><Link href="/misszionk" className="hover:text-brand-accent">Missziónk (Rólunk)</Link></li>
              <li><Link href="/kapcsolat" className="hover:text-brand-accent">Kapcsolat</Link></li>
            </ul>
          </div>
          
          {/* 3. oszlop: Cím (Placeholder) */}
          <div>
            <h4 className="font-semibold text-brand-light uppercase tracking-wider">Iroda</h4>
            <p className="mt-4">
              8900 Zalaegerszeg,
              <br />
              Minta utca 1.
              <br />
              info@domain.hu
            </p>
          </div>
        </div>

        {/* Alsó sáv */}
        <div className="mt-16 pt-8 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} AI Partner Kft. Minden jog fenntartva.</p>
          
          {/* A stratégiailag leválasztott "legacy" link */}
          <p className="mt-4 md:mt-0">
            <Link href="/legacy-szolgaltatasok" className="text-xs hover:text-brand-accent underline">
              Hagyományos pénzügyi és logisztikai szolgáltatásaink
            </Link>
          </p>
        </div>

      </div>
    </footer>
  );
}