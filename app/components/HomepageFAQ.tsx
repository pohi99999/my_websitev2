"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const faqData = {
    hu: [
        {
            q: 'Mi a különbség egy AI rendszer és egy chatbot között?',
            a: 'Az AI rendszer nem különálló beszélgetőfelület, hanem a vállalkozás működésébe beépített megoldás: automatizálja a folyamatokat, összeköti a rendszereket és támogatja a döntéshozatalt.',
        },
        {
            q: 'Mennyi idő alatt látok eredményt?',
            a: 'Egy weboldal két hét alatt elkészül, az ingyenes látványterv után. Egy automatizálásnál az első lépést és annak mérését a felmérésen közösen határozzuk meg.',
        },
        {
            q: 'Kell hozzá programozási tudás?',
            a: 'Nem. A rendszert úgy tervezzük meg, hogy a csapata napi működéséhez illeszkedjen. A beállítást, a testreszabást és az induló betanítást mi végezzük.',
        },
        {
            // released 2026-10-05 (marveen 2901); a privacy expert review is a separate, non-blocking item
            q: 'Hogyan kezeli a rendszer az adatait?',
            a: 'Az adatokat az Ön tárhelyén vagy az általunk kezelt tárhelyen tároljuk. Ha egy folyamatban AI-modell is dolgozik, a feldolgozandó szöveg a modell szolgáltatójához kerül. Hogy ez pontosan milyen adat, azt az adatkezelési tájékoztató és a szerződés rögzíti.',
        },
        {
            q: 'Milyen vállalkozásoknak ajánlott?',
            a: 'Elsősorban olyan vállalkozásoknak, amelyek sok időt töltenek ismétlődő adminisztrációval, riportolással, ügyfélkommunikációval vagy belső folyamatokkal.',
        },
        {
            q: 'Mi történik, ha elakad az AI?',
            a: 'Beépített monitorozást, hibakezelést és visszaesési logikát használunk. Ha valami elakad, naplózzuk az eseményt, újrapróbáljuk a feladatot, és szükség esetén emberi jóváhagyási pontot építünk be.',
        },
    ],
    en: [
        {
            q: 'What is the difference between an AI system and a chatbot?',
            a: 'An AI system is not a standalone chat window — it is a solution built into your business operations to automate workflows, connect systems and support decision-making.',
        },
        {
            q: 'How quickly will I see results?',
            a: 'A website is ready two weeks after the free design preview. For an automation, we agree on the first step and how to measure it together during the assessment.',
        },
        {
            q: 'Do I need programming skills?',
            a: 'No. We design the system so it fits your team’s day-to-day operations. We handle setup, customization and initial onboarding.',
        },
        {
            q: 'How does the system handle your data?',
            a: 'Data is stored on your own hosting or on hosting we manage. If an AI model is part of a workflow, the text to be processed is sent to the model provider. Exactly which data that is, is set out in the privacy notice and the contract.',
        },
        {
            q: 'Which businesses is this for?',
            a: 'Primarily businesses that spend a lot of time on repetitive admin work, reporting, customer communication or internal processes.',
        },
        {
            q: 'What happens if the AI gets stuck?',
            a: 'We build in monitoring, error handling and fallback logic. If something gets stuck, we log the event, retry the task and add a human approval step where needed.',
        },
    ],
    de: [
        {
            q: 'Was ist der Unterschied zwischen einem KI-System und einem Chatbot?',
            a: 'Ein KI-System ist kein isoliertes Chatfenster, sondern eine in Ihre Geschäftsabläufe integrierte Lösung für Automatisierung, Systemverknüpfung und Entscheidungsunterstützung.',
        },
        {
            q: 'Wie schnell sehe ich Ergebnisse?',
            a: 'Eine Website ist zwei Wochen nach dem kostenlosen Entwurf fertig. Bei einer Automatisierung legen wir den ersten Schritt und seine Messung gemeinsam im Erstgespräch fest.',
        },
        {
            q: 'Brauche ich Programmierkenntnisse?',
            a: 'Nein. Wir gestalten das System so, dass es zu den täglichen Abläufen Ihres Teams passt. Einrichtung, Anpassung und Onboarding übernehmen wir.',
        },
        {
            q: 'Wie geht das System mit Ihren Daten um?',
            a: 'Die Daten werden auf Ihrem eigenen Hosting oder auf von uns betreutem Hosting gespeichert. Wenn in einem Ablauf ein KI-Modell arbeitet, wird der zu verarbeitende Text an den Modellanbieter übermittelt. Welche Daten das genau sind, regeln die Datenschutzhinweise und der Vertrag.',
        },
        {
            q: 'Für welche Unternehmen ist das geeignet?',
            a: 'Vor allem für Unternehmen, die viel Zeit mit wiederkehrender Verwaltung, Berichten, Kundenkommunikation oder internen Prozessen verbringen.',
        },
        {
            q: 'Was passiert, wenn die KI stecken bleibt?',
            a: 'Wir bauen Monitoring, Fehlerbehandlung und Fallback-Logik ein. Wenn etwas hängen bleibt, wird der Vorfall protokolliert, der Task erneut versucht und bei Bedarf ein menschlicher Freigabepunkt eingesetzt.',
        },
    ],
};

const sectionTitles = {
    hu: { heading: 'Gyakran ismételt kérdések', sub: 'Amit a vállalati AI rendszerek tervezéséről és bevezetéséről a legtöbben megkérdeznek.' },
    en: { heading: 'Frequently Asked Questions', sub: 'What clients usually ask about business AI systems and rollout.' },
    de: { heading: 'Häufig gestellte Fragen', sub: 'Was Kunden typischerweise über KI-Systeme und Rollout wissen möchten.' },
};

function FAQItem ( { question, answer }: { question: string; answer: string } )
{
    const [open, setOpen] = useState( false );

    return (
        <div className="border-b border-white/5 last:border-b-0">
            <button
                onClick={() => setOpen( !open )}
                className="w-full flex items-center justify-between py-5 text-left group"
                aria-expanded={open ? 'true' : 'false'}
            >
                <span className="text-white font-medium pr-4 group-hover:text-[#00e5ff] transition-colors duration-200">
                    {question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-[#00e5ff]/60 shrink-0 transition-transform duration-300 ${ open ? 'rotate-180' : ''
                        }`}
                    aria-hidden="true"
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${ open ? 'max-h-96 pb-5' : 'max-h-0'
                    }`}
            >
                <p className="text-gray-400 leading-relaxed text-sm">{answer}</p>
            </div>
        </div>
    );
}

export default function HomepageFAQ ()
{
    const { language } = useLanguage();
    const lang = ( language as 'hu' | 'en' | 'de' ) in faqData ? ( language as 'hu' | 'en' | 'de' ) : 'hu';
    const items = faqData[lang];
    const { heading, sub } = sectionTitles[lang];

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map( ( item ) => ( {
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        } ) ),
    };

    return (
        <section id="faq" className="py-24 px-6 bg-surface-0" style={{ background: 'rgba(0,0,0,0.82)' }} data-testid="homepage-faq">
            {/* FAQPage structured data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify( faqSchema ) }}
            />

            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-syne">
                        {heading}
                    </h2>
                    <p className="text-gray-400">{sub}</p>
                </div>

                <div className="surface-panel p-6 md:p-8">
                    {items.map( ( item, idx ) => (
                        <FAQItem key={idx} question={item.q} answer={item.a} />
                    ) )}
                </div>
            </div>
        </section>
    );
}
