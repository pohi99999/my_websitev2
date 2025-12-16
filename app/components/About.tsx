'use client';

import React, { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type AccordionItemProps = {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
};

const AccordionItem = ({ title, isOpen, onClick, children }: AccordionItemProps) => (
  <div className="border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-slate-800 transition-colors"
      type="button"
    >
      <span className="text-xl font-semibold text-white">{title}</span>
      {isOpen ? <ChevronUp className="text-blue-400" /> : <ChevronDown className="text-slate-500" />}
    </button>

    <div
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 pb-6 pt-2 text-slate-400 leading-relaxed">{children}</div>
    </div>
  </div>
);

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
                Munkánk során a legmodernebb technológiákat ötvözzük a mély iparági ismeretekkel.
              </p>
              <p>
                Nem csak szoftvert fejlesztünk, hanem a Mesterséges Intelligencia Google támogatásának köszönhetően
                a legújabb modellek állnak rendelkezésünkre. Ezeket okosan beépítve nem csak gazdaságosabb működést érünk el,
                hanem visszaadjuk a legértékesebbet: az <strong>IDŐT</strong>.
              </p>
            </AccordionItem>

            {/* 2. Jövőképünk */}
            <AccordionItem
              title="Jövőképünk"
              isOpen={openSection === 'vision'}
              onClick={() => toggleSection('vision')}
            >
              <p className="mb-4">
                Hiszünk a technológia erejében. Képzeld el, mennyire felgyorsult a világ – az információ sebessége kulcskérdés.
                Ki szerzi meg előbb a piacot? Ki tudja vírusként terjeszteni a terméket? Ki látja előre az árfolyamokat?
              </p>
              <p>
                Mi képesek vagyunk rá, hogy ezeket az elképesztő adatokat és előrejelzéseket beépítsük a stratégiádba,
                hogy a kitűzött céljaidat gyorsabban elérhesd. Folyamatosan kutatjuk az innovatív megoldásokat,
                hogy ügyfeleink mindig az élvonalban maradjanak.
              </p>
            </AccordionItem>

            {/* 3. Elkötelezettség és Csapat */}
            <AccordionItem
              title="Elkötelezettségünk és Csapatunk"
              isOpen={openSection === 'team'}
              onClick={() => toggleSection('team')}
            >
              <p className="mb-4">
                Minden projektet partnerségként kezelünk. Szakértő csapatunk tagjai több éves tapasztalattal rendelkeznek
                könyviteli, pályázatírási, pénzügyi és vámügyintézési területeken.
              </p>
              <p>
                Komplett kapcsolatrendszerünk van az iparkamarával és hatóságokkal.
                Elemző és piackutató módszerünk egyedülálló, logisztikai hálózatunk pedig lefedi
                a hazai és nemzetközi szállítmányozást is.
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
