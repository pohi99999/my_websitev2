"use client";

import React from 'react';
import { Bot, Cpu, Globe, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import CountUpNumber from './CountUpNumber';

const statsData = {
    hu: [
        { value: 95, suffix: '+', label: 'AI Ügynök', icon: Bot },
        { value: 53, label: 'MCP Eszköz', icon: Cpu },
        { value: 3, label: 'Nyelv', icon: Globe },
        { value: '24/7', label: 'Működés', icon: Zap, live: true },
    ],
    en: [
        { value: 95, suffix: '+', label: 'AI Agents', icon: Bot },
        { value: 53, label: 'MCP Tools', icon: Cpu },
        { value: 3, label: 'Languages', icon: Globe },
        { value: '24/7', label: 'Live Ops', icon: Zap, live: true },
    ],
    de: [
        { value: 95, suffix: '+', label: 'KI-Agenten', icon: Bot },
        { value: 53, label: 'MCP-Tools', icon: Cpu },
        { value: 3, label: 'Sprachen', icon: Globe },
        { value: '24/7', label: 'Live-Betrieb', icon: Zap, live: true },
    ],
};

export default function StatsBar ()
{
    const { language } = useLanguage();
    const lang = ( language as 'hu' | 'en' | 'de' ) in statsData ? ( language as 'hu' | 'en' | 'de' ) : 'hu';
    const stats = statsData[lang];
    const liveBadgeLabel = language === 'en' ? 'LIVE' : language === 'de' ? 'LIVE' : 'ÉLŐ';

    return (
        <section className="py-16 border-y border-white/5 bg-surface-1" style={{ background: 'rgba(0,0,0,0.80)' }} aria-label="Key statistics" data-testid="stats-bar">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    { stats.map( ( stat ) => (
                        <div key={ stat.label } className="text-center group rounded-3xl border border-white/5 bg-black/20 px-4 py-5">
                            <stat.icon
                                className="w-6 h-6 text-[#00e5ff]/60 mx-auto mb-3 group-hover:text-[#00e5ff] transition-colors duration-200"
                                aria-hidden="true"
                            />
                            <p className="text-3xl md:text-4xl font-bold text-white font-syne tracking-tight flex items-center justify-center gap-2">
                                { typeof stat.value === 'number' ? (
                                    <CountUpNumber value={ stat.value } suffix={ stat.suffix ?? '' } />
                                ) : (
                                    <span>{ stat.value }</span>
                                ) }
                                { stat.live ? (
                                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300 animate-pulse">
                                        { liveBadgeLabel }
                                    </span>
                                ) : null }
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
