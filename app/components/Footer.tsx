import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Github, Twitter, Youtube, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Céginfó */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Pohánka &amp; Társa
            </h3>
            <p className="text-slate-400 leading-relaxed">
              A jövő elkezdődött. Innováció és Mesterséges Intelligencia – az ember kapcsolata az elkövetkező időszak kulcsa a sikerhez.
            </p>
          </div>

          {/* Megoldások (Frissítve!) */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-blue-400">Megoldások</h4>
            <ul className="space-y-3">
              <li><a href="/termekek/brunella-agents" className="text-slate-400 hover:text-white transition-colors">Brunella Agent System</a></li>
              <li><a href="/termekek/pohi-ai-pro" className="text-slate-400 hover:text-white transition-colors">Pohi AI Pro</a></li>
              <li><a href="/szolgaltatasok" className="text-slate-400 hover:text-white transition-colors">Egyedi fejlesztések</a></li>
            </ul>
          </div>

          {/* Kapcsolat (Frissítve!) */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-blue-400">Kapcsolat</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-400">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>8900 Zalaegerszeg,<br />Magyarország</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="tel:+36302446779" className="hover:text-white transition-colors">+36 30 244 6779</a>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="mailto:peterpohankapersonal@gmail.com" className="hover:text-white transition-colors">peterpohankapersonal@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Vezető */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-blue-400">Vezetés</h4>
            <div className="text-slate-400">
              <p className="font-medium text-white">Pohánka József Péter</p>
              <p className="text-sm mb-4">CEO &amp; Lead Developer</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/pohi99999/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61576881120445"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/pohi99999"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/pohanka_peter"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://g.dev/PohankaPeter"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="Google Developer"
                >
                  <Code2 className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@J%C3%B3zsefP%C3%A9terPoh%C3%A1nka"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2025 Pohánka és Társa Kft. Minden jog fenntartva.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/impresszum" className="hover:text-white transition-colors">Impresszum</a>
            <a href="/adatvedelmi-nyilatkozat" className="hover:text-white transition-colors">Adatvédelmi nyilatkozat</a>
            <a href="/aszf" className="hover:text-white transition-colors">ÁSZF</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
