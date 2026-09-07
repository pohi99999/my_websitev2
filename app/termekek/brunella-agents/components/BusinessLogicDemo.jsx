'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Bot } from 'lucide-react';
import GsapFadeIn from '../../../components/GsapFadeIn';
import { useTypewriterOnce } from '../../../hooks/useTypewriter';

import StepMarketResearch from './BusinessLogicDemo/StepMarketResearch';
import StepDataProcessing from './BusinessLogicDemo/StepDataProcessing';
import StepStrategicOptions from './BusinessLogicDemo/StepStrategicOptions';
import StepExecution from './BusinessLogicDemo/StepExecution';
import ArrowConnector from './BusinessLogicDemo/ArrowConnector';
import ArtifactModal from './BusinessLogicDemo/ArtifactModal';

export default function BusinessLogicDemo() {
  const [phase, setPhase] = useState(1); // 1: research, 2: process, 3: decision
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(null);

  const dataPoints = useMemo(
    () => [
      { label: 'Competitor Price: €50', top: '20%', left: '26%' },
      { label: 'Trend: Rising', top: '34%', left: '62%' },
      { label: 'CPC: -12%', top: '56%', left: '46%' },
      { label: 'Segment: SMB', top: '70%', left: '30%' },
      { label: 'Demand: High', top: '28%', left: '52%' }
    ],
    []
  );

  const artifacts = useMemo(
    () => ({
      email: {
        title: 'Gmail – Új üzenet',
        subtitle: 'Kampány: Q3 • Hangnem: professzionális • CTA: demó időpont',
        to: '{Címzett}',
        subject: 'Q3 piaci jelzés: készen állsz egy gyors stratégiára?',
        body:
          'Szia {Keresztnév}!\n\nA Brunella Agents a Q3-as piaci adatokat elemezte (5 versenytárs, árak és ajánlatok). A rendszer egyértelmű jelzést talált: átlagosan ~5% árcsökkenés + erősödő csomagajánlatok.\n\nJavaslat (következő 14 nap):\n• Tartsd a listaárat, indíts limitált bundle kampányt\n• Üzenet: ROI + gyors bevezetés + átláthatóság\n• Ajánlat: onboarding bónusz hónap végéig\n\nHa szeretnéd, 15 perc alatt összeállítok egy célcsoport-specifikus playbookot és 3 kreatív variánst.\n\nÜdv,\nPohánka & Társa\n\nUi.: Válaszolj annyit: „Q3”, és küldöm a részletes riportot.'
      },
      presentation: {
        title: 'PowerPoint – Slide Preview',
        subtitle: '1 oldalas stratégiai összefoglaló • vezetői fókusz',
        body:
          'Cím: Q3 piaci lehetőség – gyors döntési javaslat\n\n1) Jelzés\n- Versenytársak: átlag -5% ármozgás\n- Csomagajánlatok és limitált akciók erősödnek\n\n2) Hatás\n- Inbound: árérzékenység nő\n- Churn kockázat: price-only szegmensek\n\n3) Ajánlott lépések (14 nap)\n- Bundle + onboarding bónusz\n- Üzenet: ROI, gyors bevezetés, „Glass Box” transzparencia\n- 3 kreatív A/B teszt LinkedIn-en\n\n4) Output\n- Kampány assetek + sales enablement összegzés\n- Heti monitorozás automatizálva'
      },
      linkedin: {
        title: 'LinkedIn – Poszt előnézet',
        subtitle: 'Cél: lead gen • Hook: piaci jelzés • CTA: komment + DM',
        body:
          'Q3 piaci jelzés: a top versenytársak átlagosan ~5%-kal csökkentettek árat.\n\nA kérdés nem az, hogy olcsóbb leszel-e — hanem hogy gyorsabban tudsz-e végrehajtani.\n\nA Brunella Agents ezt csinálja helyetted:\n✅ versenytárs ajánlatok scan\n✅ trendek és pozicionálás összegzés\n✅ kampány és üzenetek generálása\n\nKéred a Q3 ár-térképet + playbookot?\nKomment: „PLAYBOOK” és küldjük DM-ben.'
      }
    }),
    []
  );

  const activeArtifact = choice ? artifacts[choice] : null;
  const typedBody = useTypewriterOnce({ text: activeArtifact?.body ?? '', enabled: open });

  useEffect(() => {
    if (open) return;

    const t1 = setTimeout(() => setPhase(2), 2600);
    const t2 = setTimeout(() => setPhase(3), 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <GsapFadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-emerald-200 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4">
              <Bot className="w-4 h-4" />
              <span className="text-sm font-semibold">Business Workflow Demo</span>
            </div>
            <h2 className="section-title">Valós Üzleti Szituációk</h2>
            <p className="section-subtitle">Research → Analysis → Decision → Output egyetlen vizuális folyamatban</p>
          </div>
        </GsapFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          <StepMarketResearch dataPoints={dataPoints} />

          <div className="hidden lg:flex">
            <ArrowConnector />
          </div>
          <div className="lg:hidden">
            <ArrowConnector direction="down" />
          </div>

          <StepDataProcessing phase={phase} dataPoints={dataPoints} />

          <div className="hidden lg:flex">
            <ArrowConnector />
          </div>
          <div className="lg:hidden">
            <ArrowConnector direction="down" />
          </div>

          <StepStrategicOptions phase={phase} setChoice={setChoice} setOpen={setOpen} />

          <div className="hidden lg:flex">
            <ArrowConnector />
          </div>
          <div className="lg:hidden">
            <ArrowConnector direction="down" />
          </div>

          <StepExecution />
        </div>

        <ArtifactModal
          open={open}
          setOpen={setOpen}
          activeArtifact={activeArtifact}
          choice={choice}
          setChoice={setChoice}
          setPhase={setPhase}
          typedBody={typedBody}
        />
      </div>
    </section>
  );
}
