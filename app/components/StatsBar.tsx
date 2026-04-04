"use client";

import React from 'react';
import { Bot, Cpu, Globe, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const statsData = {
    hu: [
        { value: '95+', label: 'AI Ügynök', icon: Bot },
        { value: '53', label: 'MCP Eszköz', icon: Cpu },
        { value: '3', label: 'Nyelv', icon: Globe },
        { value: '24/7', label: 'Automatizálás', icon: Zap },
    ],
    en: [
        { value: '95+', label: 'AI Agents', icon: Bot },
        { value: '53', label: 'MCP Tools', icon: Cpu },
        { value: '3', label: 'Languages', icon: Globe },
        { value: '24/7', label: 'Automation', icon: Zap },
    ],
    de: [
        { value: '95+', label: 'KI-Agenten', icon: Bot },
        { value: '53', label: 'MCP-Tools', icon: Cpu },
        { value: '3', label: 'Sprachen', icon: Globe },
        { value: '24/7', label: 'Automatisierung', icon: Zap },
    ],
};

export default function StatsBar ()
{
    const { language } = useLanguage();
    const lang = ( language as 'hu' | 'en' | 'de' ) in statsData ? ( language as 'hu' | 'en' | 'de' ) : 'hu';
    const stats = statsData[lang];

    return (
        <section className="py-16 border-y border-white/5 bg-[#060608]" aria-label="Key statistics">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    { stats.map( ( stat ) => (
                        <div key={ stat.label } className="text-center group">
                            <stat.icon
                                className="w-6 h-6 text-[#00e5ff]/60 mx-auto mb-3 group-hover:text-[#00e5ff] transition-colors duration-200"
                                aria-hidden="true"
                            />
                            <p className="text-3xl md:text-4xl font-bold text-white font-syne tracking-tight">
                                { stat.value }
                            </p>
                            <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">
                                { stat.label }
                            </p>
                        </div>
                    ) ) }
                </div>
            </div>
        </section>
    );
}
