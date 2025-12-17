'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import GsapFadeIn from '../components/GsapFadeIn';

const glossaryTerms = [
  {
    term: 'Adapter',
    definition:
      'A BAS architektúrájában egy interfész modul, amely egy-egy integrált eszközhöz (pl. Git, Docker, Google Drive API) tartozik. Feladata az adott eszköz specifikus parancsainak kezelése és standardizált visszajelzés biztosítása az orchestrator számára.'
  },
  {
    term: 'Agent (Ügynök)',
    definition:
      'Egy autonóm entitás (pl. szoftverprogram), amely képes proaktívan cselekedni célok elérése érdekében, környezetével kölcsönhatásba lépve, anélkül, hogy állandó emberi irányításra szorulna.'
  },
  {
    term: 'Agentic Reasoning',
    definition:
      'Az ügynökök azon képessége, hogy megértsék a kontextust, cselekvési terveket hozzanak létre, és a feladatokat önállóan hajtsák végre, miközben összhangban maradnak az emberi célokkal.'
  },
  {
    term: 'BAS (Brunella Agent System)',
    definition:
      'Egy autonóm, több ügynökből álló rendszer (multi-agent system), amelynek célja egy kooperatív MI operációs rendszer létrehozása. Komplex üzleti és technikai folyamatok automatizálására tervezték.'
  },
  {
    term: 'BOV (Brunella Operations Visualizer)',
    definition:
      'Egy valós idejű vizualizációs és monitorozó réteg a BAS számára, amely egy dinamikus, gráf-alapú felületen ("gondolattérkép") teszi átláthatóvá és követhetővé az MI ügynökök működését.'
  },
  {
    term: 'CEaaS (Content Ecosystem as a Service)',
    definition:
      'Egy prémium, B2B ügyfeleket célzó szolgáltatási modell, amely az egyedi tartalmak helyett egy teljes, MI-vezérelt tartalommarketing ökoszisztéma létrehozását és menedzselését kínálja.'
  },
  {
    term: 'CrewAI',
    definition:
      'Egy magasszintű Python keretrendszer, amely lehetővé teszi több, együttműködő MI ügynökből álló "csapatok" létrehozását, ahol minden ügynöknek meghatározott szerepe van.'
  },
  {
    term: 'Edge AI / Helyi AI',
    definition:
      'Olyan MI modellek telepítése és futtatása, ahol a számítások helyben, a felhasználó eszközén történnek. Előnyei az alacsony késleltetés és a fokozott adatvédelem.'
  },
  {
    term: 'GPGPU',
    definition:
      'General-Purpose GPU computing. Az a technika, amikor a grafikus processzort (GPU) nemcsak grafikai, hanem általános célú számításokra (pl. fizikai szimuláció, gépi tanulás) használják.'
  },
  {
    term: 'HCAI (Human-Centered AI)',
    definition:
      'Emberközpontú MI; egy paradigma, amely nem az emberi munkaerő helyettesítését, hanem annak képességeinek felerősítését tűzi ki célul.'
  },
  {
    term: 'Human-in-the-Loop (HITL)',
    definition:
      'Olyan folyamat, ahol egy automatizált rendszer egy kritikus döntési pontnál megszakítja a végrehajtást, és emberi jóváhagyást kér a folytatáshoz.'
  },
  {
    term: 'LangGraph',
    definition:
      'Egy keretrendszer, amely lehetővé teszi az LLM-alapú alkalmazások gráfszerű állapotgépekként való felépítését, támogatva a ciklikus folyamatokat.'
  },
  {
    term: 'Micro-SaaS',
    definition:
      'Kisméretű, specifikus problémát megoldó szoftver-mint-szolgáltatás termék. A Brunella rendszer "Őrszem" és "Piacfigyelő" szolgáltatásai ebbe a kategóriába tartoznak.'
  },
  {
    term: 'MLOps',
    definition:
      'Machine Learning Operations. A gépi tanulási modellek fejlesztési és üzemeltetési ciklusának automatizálására szolgáló elvek, a DevOps mintájára.'
  },
  {
    term: 'Orchestrator',
    definition:
      'Egy központi menedzser ügynök (a BAS-ban "brunella"), amely a rendszer vezérlőfolyamataként működik: eseményeket érzékel és feladatokat oszt szét.'
  },
  {
    term: 'RAG (Retrieval-Augmented Generation)',
    definition:
      'Egy technika, ahol az MI modell válaszgenerálás előtt egy külső tudásbázisból kér le releváns információkat a pontosság növelése érdekében.'
  },
  {
    term: 'ReAct (Reason and Act)',
    definition:
      'Egy kognitív keretrendszer, ahol az ügynök felváltva "gondolkodik" a következő lépésről és "cselekszik", egy belső monológot folytatva.'
  },
  {
    term: 'TRL (Technology Readiness Level)',
    definition:
      'Technológiai Érettségi Szint. A TRL 4 szint a laboratóriumi környezetben validált komponenseket jelöli, ami a deep-tech pályázatok gyakori feltétele.'
  }
];

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <GsapFadeIn>
          <div className="text-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Vissza a főoldalra
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Al és Technológiai Fogalomtár
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A Brunella Rendszer és a modern MI technológia legfontosabb kifejezései,
              érthetően elmagyarázva.
            </p>
          </div>
        </GsapFadeIn>

        {/* Search Bar */}
        <GsapFadeIn delay={0.2}>
          <div className="max-w-xl mx-auto mb-16 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
              placeholder="Keress a fogalmak között (pl. Agent, RAG)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </GsapFadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((item, index) => (
            <GsapFadeIn key={index} delay={0.1 * (index % 5)}>
              <div className="h-full p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {item.term}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{item.definition}</p>
                  </div>
                </div>
              </div>
            </GsapFadeIn>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Nem találtunk ilyen kifejezést. Próbálj másik kulcsszót!
          </div>
        )}
      </div>
    </div>
  );
}
