"use client";

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Github, Twitter, Youtube, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () =>
{
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const withLang = ( href: string ) =>
  {
    if ( language === 'hu' ) return href;
    if ( href === '/' ) return `/${ language }`;
    return href.startsWith( '/' ) ? `/${ language }${ href }` : href;
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Céginfó */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#00e5ff]">
              {t( 'footer.companyName' )}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {t( 'footer.tagline' )}
            </p>
          </div>

          {/* Megoldások */}
          <div>
            <h4 className="text-xs font-semibold mb-6 text-[#00e5ff]/70 uppercase tracking-[0.12em]">
              {t( 'footer.sections.solutions' )}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={withLang( '/termekek/brunella-agents' )}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t( 'footer.solutions.brunella' )}
                </a>
              </li>
              <li>
                <a
                  href={withLang( '/termekek/pohi-ai-pro' )}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t( 'footer.solutions.pohi' )}
                </a>
              </li>
              <li>
                <a
                  href={withLang( '/szolgaltatasok' )}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t( 'footer.solutions.customDev' )}
                </a>
              </li>
            </ul>
          </div>

          {/* Kapcsolat */}
          <div>
            <h4 className="text-xs font-semibold mb-6 text-[#00e5ff]/70 uppercase tracking-[0.12em]">
              {t( 'footer.sections.contact' )}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#00e5ff]/50 mt-1 flex-shrink-0" />
                <span>8900 Zalaegerszeg,<br />Magyarország</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#00e5ff]/50 flex-shrink-0" />
                <a href="tel:+36304291227" className="hover:text-white transition-colors">
                  +36 30 429 1227
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#00e5ff]/50 flex-shrink-0" />
                <a
                  href="mailto:peterpohankapersonal@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  peterpohankapersonal@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Vezető */}
          <div>
            <h4 className="text-xs font-semibold mb-6 text-[#00e5ff]/70 uppercase tracking-[0.12em]">
              {t( 'footer.sections.leadership' )}
            </h4>
            <div className="text-gray-400">
              <p className="font-medium text-white">{t( 'footer.leadership.name' )}</p>
              <p className="text-sm mb-4">{t( 'footer.leadership.title' )}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/pohi99999/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full border border-white/10 bg-transparent text-gray-400 hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61576881120445"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full border border-white/10 bg-transparent text-gray-400 hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/pohi99999"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full border border-white/10 bg-transparent text-gray-400 hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/pohanka_peter"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full border border-white/10 bg-transparent text-gray-400 hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://g.dev/PohankaPeter"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full border border-white/10 bg-transparent text-gray-400 hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-colors"
                  aria-label="Google Developer"
                >
                  <Code2 className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@J%C3%B3zsefP%C3%A9terPoh%C3%A1nka"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-full border border-white/10 bg-transparent text-gray-400 hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} {t( 'footer.companyName' )} {t( 'footer.legal.rights' )}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href={withLang( '/impresszum' )} className="hover:text-white transition-colors">
              {t( 'footer.legal.imprint' )}
            </a>
            <a href={withLang( '/adatvedelmi-nyilatkozat' )} className="hover:text-white transition-colors">
              {t( 'footer.legal.privacy' )}
            </a>
            <a href={withLang( '/aszf' )} className="hover:text-white transition-colors">
              {t( 'footer.legal.terms' )}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
