"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const [openSection, setOpenSection] = useState<string | null>('values');
  const { language } = useLanguage();

  const txt =
    language === 'en'
      ? {
        title: 'About Us',
        intro:
          'We believe this is the era of creators, where technology is the brush, you are the artist, and success is your creation. Our mission is to empower creators with ideas and solutions so their work can truly thrive.',
        valuesTitle: 'Values & Philosophy',
        valuesP1: 'Our core values are expertise, reliability, customer focus and continuous improvement.',
        valuesP2: 'We combine modern technology with deep industry knowledge.',
        valuesP3:
          'We do not just build software; we build practical systems enhanced with advanced AI models so businesses gain real efficiency and, most importantly, time.',
        visionTitle: 'Our Vision',
        visionP1:
          'We believe technology can improve daily operations and unlock sustainable growth. We continuously research innovative approaches so our clients stay ahead.',
        visionP2:
          'Speed matters everywhere: market timing, campaigns, funding opportunities, exchange rates, and changing customer behavior.',
        visionP3:
          'Our goal is to turn these signals into practical strategy and support your short- and long-term growth.',
        teamTitle: 'Commitment & Team',
        teamP1:
          'We are committed to our clients’ success. Every project is a partnership built on transparency and trust.',
        teamHeader: 'Our expert team:',
        teamP2:
          'Our team brings multi-domain experience in finance, compliance, logistics, permitting and market intelligence, supported by a strong domestic and international partner network.',
      }
      : language === 'de'
        ? {
          title: 'Über uns',
          intro:
            'Wir glauben an das Zeitalter der Gestalter: Technologie ist der Pinsel, Sie sind der Künstler, und Erfolg ist Ihr Werk. Unsere Mission ist es, Unternehmen mit Ideen und Lösungen zu stärken.',
          valuesTitle: 'Werte & Philosophie',
          valuesP1:
            'Unsere Grundwerte sind Fachkompetenz, Zuverlässigkeit, Kundenorientierung und kontinuierliche Weiterentwicklung.',
          valuesP2: 'Wir verbinden moderne Technologie mit tiefem Branchenwissen.',
          valuesP3:
            'Wir entwickeln nicht nur Software, sondern praxisnahe Systeme mit fortschrittlicher KI — für echte Effizienz und mehr Zeit für das Wesentliche.',
          visionTitle: 'Unsere Vision',
          visionP1:
            'Wir sind überzeugt, dass Technologie den Alltag von Unternehmen verbessert und neues Wachstum ermöglicht.',
          visionP2:
            'Geschwindigkeit ist entscheidend: Marktzugang, Kampagnen, Förderungen, Wechselkurse und Kundenverhalten.',
          visionP3:
            'Unser Ziel ist es, daraus umsetzbare Strategien abzuleiten und Ihre kurz- und langfristigen Ziele zu unterstützen.',
          teamTitle: 'Unser Engagement & Team',
          teamP1:
            'Wir sind dem Erfolg unserer Kunden verpflichtet. Jedes Projekt ist eine Partnerschaft auf Basis von Transparenz und Vertrauen.',
          teamHeader: 'Unser Expertenteam:',
          teamP2:
            'Unser Team verfügt über langjährige Erfahrung in Finanzen, Compliance, Logistik, Genehmigungen und Marktanalyse sowie ein starkes Partnernetzwerk.',
        }
        : {
          title: 'Rólunk',
          intro:
            'Hiszünk abban, hogy az Alkotók ideje jött el, ahol a technológia az ecset, Te vagy a Művész, és a siker a Te Alkotásod! Cégünk küldetése, hogy a Művészt inspirációval, ötletekkel és megoldásokkal vértezze fel, hogy mesterműve valóban sikeres legyen. Ha felkeltettük érdeklődésedet, tanulmányozd tovább weboldalunkat! Folyamatosan bővíteni fogjuk hasznos tartalmakkal, esettanulmányokkal, bemutatókkal és egyéb érdekességekkel, amelyekkel foglalkozunk.',
          valuesTitle: 'Értékek és Filozófia',
          valuesP1:
            'Alapvető értékeink a szakértelem, megbízhatóság, ügyfélközpontúság és a folyamatos fejlődés iránti elkötelezettség.',
          valuesP2: 'Munkánk során a legmodernebb technológiákat ötvözzük a mély iparági ismeretekkel.',
          valuesP3:
            'Nem csak szoftvert fejlesztünk, programokat, alkalmazásokat, applikációkat készítünk, hanem a Mesterséges Intelligencia Google támogatásának köszönhetően, az Ők általuk kifejlesztett legújabb technológiájú modellek állnak a rendelkezésünkre, melyeket ha okosan beleépítjük a vállalkozás ökoszisztémájába, olyan hatékonyságot érhetünk el amivel nem csak esélyünk van egy gazdaságosabb működést elérni, hanem a legértékesebb dolgot is mellé kapjuk, ami nem más mint a manapság mindennél értékesebb dolog, az IDŐ..!',
          visionTitle: 'Jövőképünk',
          visionP1:
            'Hiszünk a technológia erejében, hogy jobbá tegye a vállalkozások mindennapjait és új távlatokat nyisson a növekedésben. Folyamatosan kutatjuk az innovatív megoldásokat, hogy ügyfeleink mindig a piaci verseny élvonalában maradhassanak.',
          visionP2:
            'Képzeljétek el, hogy mennyire felgyorsult körülöttünk az idő, mindenki rohan, az információ sebessége manapság kulcskérdés az élet minden területén. Igaz ez az üzleti életre is: ki tud előbb megszerezni egy piacot? Ki tudja először vírusként elterjeszteni a terméket, amit értékesíteni szeretne? Ki tudja meg először mikor, mire érdemes pályázni? Mennyi lesz a Ft/Euro árfolyam várható alakulása? Mi a fogyasztók viselkedése, érdeklődése jelenleg stb...?',
          visionP3:
            'Mi képesek leszünk rá, hogy ezeket és még elképesztőbb dolgokat beleépítsük a stratégiánkba, hogy a kitűzött rövid, és hosszútávú céljaid elérésében segítséget nyújtsunk.',
          teamTitle: 'Elkötelezettségünk és Csapatunk',
          teamP1:
            'Elkötelezettek vagyunk ügyfeleink sikere mellett. Minden projektet partnerségként kezelünk, szorosan együttműködve a legjobb eredmények elérése érdekében, biztosítva az átláthatóságot és a kölcsönös bizalmat.',
          teamHeader: 'Szakértő csapatunk:',
          teamP2:
            'Szakértő csapatunk tagjai több éves tapasztalattal rendelkeznek a könyviteli, pályázatírási, finanszírozási, pénzügyi, vám ügyintézés, munkavédelmi, munkaügyi engedélyezés területén, komplett engedélyezési kapcsolat rendszerünk van kiépítve az iparkamarával és a növényegészségügyi hivatallal egyaránt. Elemző, és piackutató módszerünk egyedülálló az országban. Kereskedelmi és logisztikai kapcsolatunk van hazai, és nemzetközi fuvarozó cégekkel és hajózási szállítási szolgáltatókkal.',
        };

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src="/contact.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">{txt.title}</h2>

          <p className="text-slate-300 text-lg leading-relaxed text-center mb-10">
            {txt.intro}
          </p>

          <div className="space-y-4">
            {/* 1. Értékek és Filozófia */}
            <AccordionItem
              title={txt.valuesTitle}
              isOpen={openSection === 'values'}
              onClick={() => toggleSection('values')}
            >
              <p className="mb-4">
                {txt.valuesP1}
              </p>
              <p className="mb-4">
                {txt.valuesP2}
              </p>
              <p>
                {txt.valuesP3}
              </p>
            </AccordionItem>

            {/* 2. Jövőképünk */}
            <AccordionItem
              title={txt.visionTitle}
              isOpen={openSection === 'vision'}
              onClick={() => toggleSection('vision')}
            >
              <p className="mb-4">
                {txt.visionP1}
              </p>
              <p className="mb-4">
                {txt.visionP2}
              </p>
              <p>
                {txt.visionP3}
              </p>
            </AccordionItem>

            {/* 3. Elkötelezettség és Csapat */}
            <AccordionItem
              title={txt.teamTitle}
              isOpen={openSection === 'team'}
              onClick={() => toggleSection('team')}
            >
              <p className="mb-4">
                {txt.teamP1}
              </p>
              <h4 className="text-white font-semibold mb-2">{txt.teamHeader}</h4>
              <p>
                {txt.teamP2}
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </section>
  );
};

// Segédkomponens az Accordionhoz
const AccordionItem = ({ title, isOpen, onClick, children }: any) => (
  <div className="border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-slate-800 transition-colors"
    >
      <span className="text-xl font-semibold text-white">{title}</span>
      {isOpen ? <ChevronUp className="text-blue-400" /> : <ChevronDown className="text-slate-500" />}
    </button>

    <div
      className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
    >
      <div className="px-6 pb-6 pt-2 text-slate-400 leading-relaxed text-justify">{children}</div>
    </div>
  </div>
);

export default About;
