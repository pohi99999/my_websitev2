"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const About = () => {
  const [openSection, setOpenSection] = useState<string | null>('values');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section id="about" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Rólunk</h2>

          <div className="space-y-4">
            {/* 1. Értékek és Filozófia */}
            <AccordionItem
              title="Értékek és Filozófia"
              isOpen={openSection === 'values'}
              onClick={() => toggleSection('values')}
            >
              <p className="mb-4">
                Alapvető értékeink a szakértelem, megbízhatóság, ügyfélközpontúság és a folyamatos fejlődés iránti elkötelezettség.
              </p>
              <p className="mb-4">
                Munkánk során a legmodernebb technológiákat ötvözzük a mély iparági ismeretekkel.
              </p>
              <p>
                Nem csak szoftvert fejlesztünk, programokat, alkalmazásokat, applikációkat készítünk, hanem a Mesterséges Intelligencia Google támogatásának köszönhetően, az Ők általuk kifejlesztett legújabb technológiájú modellek állnak a rendelkezésünkre, melyeket ha okosan beleépítjük a vállalkozás ökoszisztémájába, olyan hatékonyságot érhetünk el amivel nem csak esélyünk van egy gazdaságosabb működést elérni, hanem a legértékesebb dolgot is mellé kapjuk, ami nem más mint a manapság mindennél értékesebb dolog, az IDŐ..!
              </p>
            </AccordionItem>

            {/* 2. Jövőképünk */}
            <AccordionItem
              title="Jövőképünk"
              isOpen={openSection === 'vision'}
              onClick={() => toggleSection('vision')}
            >
              <p className="mb-4">
                Hiszünk a technológia erejében, hogy jobbá tegye a vállalkozások mindennapjait és új távlatokat nyisson a növekedésben. Folyamatosan kutatjuk az innovatív megoldásokat, hogy ügyfeleink mindig a piaci verseny élvonalában maradhassanak.
              </p>
              <p className="mb-4">
                Képzeljétek el, hogy mennyire felgyorsult körülöttünk az idő, mindenki rohan, az információ sebessége manapság kulcskérdés az élet minden területén. Igaz ez az üzleti életre is: ki tud előbb megszerezni egy piacot? Ki tudja először vírusként elterjeszteni a terméket, amit értékesíteni szeretne? Ki tudja meg először mikor, mire érdemes pályázni? Mennyi lesz a Ft/Euro árfolyam várható alakulása? Mi a fogyasztók viselkedése, érdeklődése jelenleg stb...?
              </p>
              <p>
                Mi képesek leszünk rá, hogy ezeket és még elképesztőbb dolgokat beleépítsük a stratégiánkba, hogy a kitűzött rövid, és hosszútávú céljaid elérésében segítséget nyújtsunk.
              </p>
            </AccordionItem>

            {/* 3. Elkötelezettség és Csapat */}
            <AccordionItem
              title="Elkötelezettségünk és Csapatunk"
              isOpen={openSection === 'team'}
              onClick={() => toggleSection('team')}
            >
              <p className="mb-4">
                Elkötelezettek vagyunk ügyfeleink sikere mellett. Minden projektet partnerségként kezelünk, szorosan együttműködve a legjobb eredmények elérése érdekében, biztosítva az átláthatóságot és a kölcsönös bizalmat.
              </p>
              <h4 className="text-white font-semibold mb-2">Szakértő csapatunk:</h4>
              <p>
                Szakértő csapatunk tagjai több éves tapasztalattal rendelkeznek a könyviteli, pályázatírási, finanszírozási, pénzügyi, vám ügyintézés, munkavédelmi, munkaügyi engedélyezés területén, komplett engedélyezési kapcsolat rendszerünk van kiépítve az iparkamarával és a növényegészségügyi hivatallal egyaránt. Elemző, és piackutató módszerünk egyedülálló az országban. Kereskedelmi és logisztikai kapcsolatunk van hazai, és nemzetközi fuvarozó cégekkel és hajózási szállítási szolgáltatókkal.
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
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 pb-6 pt-2 text-slate-400 leading-relaxed text-justify">{children}</div>
    </div>
  </div>
);

export default About;
