"use client";

import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutCopy
{
    title: string;
    intro: string;
    valuesTitle: string;
    valuesP1: string;
    valuesP2: string;
    valuesP3: string;
    visionTitle: string;
    visionP1: string;
    visionP2: string;
    visionP3: string;
    teamTitle: string;
    teamP1: string;
    teamHeader: string;
    teamP2: string;
}

const copyMap: Record<string, AboutCopy> = {
    en: {
        title: 'About Us',
        intro:
            'We design and deliver business-ready AI systems that fit real operations — not generic tools, but practical solutions for teams that need measurable efficiency, better decisions and smoother workflows.',
        valuesTitle: 'Values & Philosophy',
        valuesP1: 'Our core values are clarity, reliability, measurable impact and long-term partnership.',
        valuesP2: 'We combine business process thinking with modern software engineering and AI orchestration.',
        valuesP3:
            'We do not just build software; we build systems that integrate AI into daily operations so businesses gain real efficiency and time back.',
        visionTitle: 'Our Vision',
        visionP1:
            'We believe technology should improve daily operations and unlock sustainable growth through controlled, cost-effective adoption.',
        visionP2:
            'We turn repetitive work into stable systems and data into decisions that support the business.',
        visionP3:
            'Our goal is to create solutions that scale with the business instead of adding complexity.',
        teamTitle: 'Commitment & Team',
        teamP1:
            'We treat every project as a partnership, with transparent communication and clear rollout milestones.',
        teamHeader: 'What we bring:',
        teamP2:
            'Experience across business process design, software delivery, system integration and AI orchestration.',
    },
    de: {
        title: 'Über uns',
        intro:
            'Wir entwerfen und liefern praxistaugliche KI-Systeme für Unternehmen — keine generischen Tools, sondern Lösungen, die sich in echte Abläufe einfügen und messbare Wirkung erzielen.',
        valuesTitle: 'Werte & Philosophie',
        valuesP1:
            'Unsere Grundwerte sind Klarheit, Zuverlässigkeit, messbare Wirkung und langfristige Partnerschaft.',
        valuesP2: 'Wir verbinden Geschäftsprozessdenken mit moderner Softwareentwicklung und KI-Orchestrierung.',
        valuesP3:
            'Wir entwickeln nicht nur Software, sondern Systeme, die KI in den Alltag integrieren und Unternehmen echte Effizienz zurückgeben.',
        visionTitle: 'Unsere Vision',
        visionP1:
            'Wir sind überzeugt, dass Technologie den Unternehmensalltag verbessern und nachhaltiges Wachstum durch kontrollierte, kosteneffiziente Einführung ermöglichen sollte.',
        visionP2:
            'Wir verwandeln wiederkehrende Arbeit in stabile Systeme und Daten in Entscheidungen, die das Geschäft unterstützen.',
        visionP3:
            'Unser Ziel ist es, Lösungen zu schaffen, die mit dem Unternehmen skalieren, statt zusätzliche Komplexität zu erzeugen.',
        teamTitle: 'Unser Engagement & Team',
        teamP1:
            'Wir behandeln jedes Projekt als Partnerschaft mit transparenter Kommunikation und klaren Rollout-Meilensteinen.',
        teamHeader: 'Was wir mitbringen:',
        teamP2:
            'Erfahrung in Geschäftsprozessdesign, Softwarelieferung, Systemintegration und KI-Orchestrierung.',
    },
    hu: {
        title: 'Rólunk',
        intro:
            'Vállalkozásokra szabott AI rendszereket tervezünk és vezetünk be. Nem sablonos eszközöket adunk, hanem olyan megoldásokat építünk, amelyek a napi működésbe illeszkednek, csökkentik a manuális munkát és gyorsítják a döntéshozatalt.',
        valuesTitle: 'Értékek és filozófia',
        valuesP1: 'Alapvető értékeink a tisztaság, megbízhatóság, mérhető hatás és a hosszú távú partnerség.',
        valuesP2: 'Üzleti folyamatokat, szoftverfejlesztést és AI orchestrationt kombinálunk.',
        valuesP3:
            'Nem csak szoftvert fejlesztünk: olyan rendszereket építünk, amelyek az AI-t a napi működés részévé teszik, így a vállalkozás valódi időt és hatékonyságot nyer vissza.',
        visionTitle: 'Jövőképünk',
        visionP1:
            'Hiszünk abban, hogy a technológiának javítania kell a vállalkozások mindennapjait és kontrollált, költséghatékony bevezetéssel kell növekedést segítenie.',
        visionP2:
            'Az ismétlődő munkát stabil rendszerré, az adatokat pedig döntéstámogatássá alakítjuk, hogy a csapat a fontosabb feladatokra koncentrálhasson.',
        visionP3:
            'Olyan megoldásokat építünk, amelyek a vállalkozással együtt skálázhatók, nem pedig bonyolítják a működést.',
        teamTitle: 'Elkötelezettségünk és csapatunk',
        teamP1:
            'Minden projektet partnerségként kezelünk, átlátható kommunikációval és világos mérföldkövekkel.',
        teamHeader: 'Amit hozunk:',
        teamP2:
            'Tapasztalat az üzleti folyamatok tervezésében, szoftverfejlesztésben, rendszerintegrációban és AI orchestrationben.',
    },
};

const AccordionItem = ( {
    title,
    isOpen,
    onClick,
    children,
}: {
    title: string;
    isOpen: boolean;
    onClick: () => void;
    children: ReactNode;
} ) => (
    <div className="border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-white/[0.04] transition-colors"
            aria-expanded={isOpen ? 'true' : 'false'}
        >
            <span className="font-semibold text-white">{title}</span>
            {isOpen ? (
                <ChevronUp className="w-5 h-5 text-[#00e5ff]" />
            ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
        </button>
        {isOpen && <div className="px-4 pb-4 text-gray-300 leading-relaxed">{children}</div>}
    </div>
);

export default function About ()
{
    const { language } = useLanguage();
    const copy = copyMap[language] || copyMap.hu;
    const [open, setOpen] = useState<number | null>( 0 );

    const toggle = ( index: number ) => setOpen( ( current ) => ( current === index ? null : index ) );

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#00e5ff] mb-5">
                            <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                            {language === 'en' ? 'About Pohánka AI' : language === 'de' ? 'Über Pohánka AI' : 'Pohánka AI bemutatkozás'}
                        </div>
                        <h2 className="heading-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {copy.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
                            {copy.intro}
                        </p>

                        <div className="space-y-4">
                            <AccordionItem
                                title={copy.valuesTitle}
                                isOpen={open === 0}
                                onClick={() => toggle( 0 )}
                            >
                                <p className="mb-3">{copy.valuesP1}</p>
                                <p className="mb-3">{copy.valuesP2}</p>
                                <p>{copy.valuesP3}</p>
                            </AccordionItem>
                            <AccordionItem
                                title={copy.visionTitle}
                                isOpen={open === 1}
                                onClick={() => toggle( 1 )}
                            >
                                <p className="mb-3">{copy.visionP1}</p>
                                <p className="mb-3">{copy.visionP2}</p>
                                <p>{copy.visionP3}</p>
                            </AccordionItem>
                            <AccordionItem
                                title={copy.teamTitle}
                                isOpen={open === 2}
                                onClick={() => toggle( 2 )}
                            >
                                <p className="mb-3">{copy.teamP1}</p>
                                <p className="mb-3 font-semibold text-white">{copy.teamHeader}</p>
                                <p>{copy.teamP2}</p>
                            </AccordionItem>
                        </div>
                    </div>

                    <div className="surface-panel-premium p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl shadow-black/20">
                        <div className="relative overflow-hidden rounded-xl aspect-[4/5] border border-white/10">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                poster="/1.jpg"
                            >
                                <source src="/contact.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="hud-badge mb-3 text-xs uppercase tracking-[0.2em] w-fit">
                                    {language === 'en' ? 'Business AI systems' : language === 'de' ? 'KI-Systeme für Unternehmen' : 'Vállalati AI rendszerek'}
                                </div>
                                <p className="text-white text-lg font-semibold leading-snug max-w-sm">
                                    {language === 'en'
                                        ? 'We help teams move from manual work to measurable AI-enabled operations.'
                                        : language === 'de'
                                            ? 'Wir helfen Teams dabei, manuelle Arbeit in messbare KI-gestützte Abläufe zu verwandeln.'
                                            : 'Segítünk a csapatoknak a manuális munkát mérhető, AI-vezérelt működéssé alakítani.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
