'use client';

import React, { useMemo, useState } from 'react';
import { ArrowRight, Calculator, Coins, TimerReset } from 'lucide-react';
import { CTA_LOCATIONS, PAGE_NAMES, trackCtaClick } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import CountUpNumber from './CountUpNumber';

const challengeAccent = 'from-[#00e5ff] via-emerald-400 to-[#f5a623]';

export default function RoiCalculator() {
  const { language } = useLanguage();
  const [hours, setHours] = useState(12);
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(3500);

  const ui =
    language === 'en'
        ? {
            badge: 'ROI calculator',
            title: 'How much admin time could AI give back this year?',
            subtitle:
              'Move the sliders and estimate how much value Brunella-style automation can unlock in your team.',
            snapshotBadge: 'Brunella ROI snapshot',
            hoursLabel: 'Hours spent on manual admin weekly',
            hoursUnit: 'hours',
            teamLabel: 'Team size',
            teamUnit: 'people',
            rateLabel: 'Average hourly cost (HUF)',
            currencySuffix: ' HUF',
            annual: 'Annual savings',
            monthly: 'Monthly savings',
            note: 'Formula: weekly admin hours × 75% automation × 52 weeks × team size × hourly cost',
          cta: 'Get a detailed proposal',
          support: 'Most SME automation projects reach measurable ROI in 30-90 days.',
        }
      : language === 'de'
          ? {
              badge: 'ROI-Rechner',
              title: 'Wie viel Verwaltungszeit kann KI Ihrem Team dieses Jahr zurückgeben?',
              subtitle:
                'Bewegen Sie die Regler und schätzen Sie den Wert, den Brunella-ähnliche Automatisierung freisetzen kann.',
              snapshotBadge: 'Brunella ROI Momentaufnahme',
              hoursLabel: 'Stunden manueller Admin-Arbeit pro Woche',
              hoursUnit: 'Std.',
              teamLabel: 'Teamgröße',
              teamUnit: 'Personen',
              rateLabel: 'Durchschnittlicher Stundensatz (HUF)',
              currencySuffix: ' HUF',
              annual: 'Jährliche Ersparnis',
              monthly: 'Monatliche Ersparnis',
              note: 'Formel: Admin-Stunden pro Woche × 75 % Automatisierung × 52 Wochen × Teamgröße × Stundensatz',
            cta: 'Detailliertes Angebot anfordern',
            support: 'Bei den meisten KMU-Projekten wird der ROI innerhalb von 30-90 Tagen messbar.',
          }
        : {
            badge: 'ROI kalkulátor',
            title: 'Mennyi adminisztrációs időt adhat vissza az AI egy év alatt?',
            subtitle:
              'Mozgasd a csúszkákat, és nézd meg, mekkora pénzügyi hatása lehet a Brunella-alapú automatizálásnak a csapatodban.',
            snapshotBadge: 'Brunella ROI pillanatkép',
            hoursLabel: 'Hány órát töltesz manuális adminisztrációval hetente?',
            hoursUnit: 'óra',
            teamLabel: 'Hány fős a csapatod?',
            teamUnit: 'fő',
            rateLabel: 'Átlagos órabér (Ft)',
            currencySuffix: ' Ft',
            annual: 'Éves megtakarítás',
            monthly: 'Havi megtakarítás',
            note: 'Képlet: heti admin órák × 75% automatizálás × 52 hét × csapatlétszám × órabér',
            cta: 'Kérek részletes ajánlatot',
            support: 'A legtöbb KKV-projektnél 30-90 napon belül megjelenik a mérhető ROI.',
          };

  const annualSavings = useMemo(
    () => Math.round(hours * 0.75 * 52 * teamSize * hourlyRate),
    [hours, teamSize, hourlyRate]
  );
  const monthlySavings = useMemo(() => Math.round(annualSavings / 12), [annualSavings]);

  return (
    <section id="roi-kalkulator" className="relative overflow-hidden bg-surface-1 px-6 py-24" style={{ background: 'rgba(0,0,0,0.82)' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/60 to-transparent" />
        <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#00e5ff]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#f5a623]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-panel-premium p-8 md:p-10">
          <div className="hud-badge mb-6 text-xs font-mono">{ui.badge}</div>
          <h2 className="heading-display mb-4 text-4xl font-bold text-white md:text-5xl">{ui.title}</h2>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-400">{ui.subtitle}</p>

          <div className="space-y-7">
            <div>
              <div className="mb-3 flex items-center justify-between gap-4 text-sm text-gray-300">
                <label htmlFor="roi-hours">{ui.hoursLabel}</label>
                <span className="font-mono text-[#00e5ff]">
                  {hours} {ui.hoursUnit}
                </span>
              </div>
              <input
                id="roi-hours"
                type="range"
                min={1}
                max={40}
                value={hours}
                onChange={(event) => setHours(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#00e5ff]"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-4 text-sm text-gray-300">
                <label htmlFor="roi-team">{ui.teamLabel}</label>
                <span className="font-mono text-emerald-300">
                  {teamSize} {ui.teamUnit}
                </span>
              </div>
              <input
                id="roi-team"
                type="range"
                min={1}
                max={50}
                value={teamSize}
                onChange={(event) => setTeamSize(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="roi-rate" className="mb-3 block text-sm text-gray-300">
                {ui.rateLabel}
              </label>
              <input
                id="roi-rate"
                type="number"
                min={500}
                step={100}
                value={hourlyRate}
                onChange={(event) => setHourlyRate(Math.max(500, Number(event.target.value) || 0))}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-lg font-semibold text-white outline-none transition focus:border-[#00e5ff]/50 focus:shadow-[0_0_0_1px_rgba(0,229,255,0.2)]"
              />
            </div>
          </div>
        </div>

        <div className="surface-panel-elevated flex flex-col justify-between gap-8 p-8 md:p-10">
            <div>
              <div className={`mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r ${challengeAccent}`}>
                {ui.snapshotBadge}
              </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-[#00e5ff]/20 bg-black/40 p-6">
                <div className="mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400">
                  <Calculator className="h-4 w-4 text-[#00e5ff]" />
                  {ui.annual}
                </div>
                <div className="heading-display text-4xl font-bold text-[#00e5ff] md:text-5xl">
                  <CountUpNumber value={annualSavings} duration={650} suffix={ui.currencySuffix} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gray-400">
                    <Coins className="h-4 w-4 text-emerald-300" />
                    {ui.monthly}
                  </div>
                  <div className="text-3xl font-bold text-emerald-300">
                    <CountUpNumber value={monthlySavings} duration={500} suffix={ui.currencySuffix} />
                  </div>
                </div>

                <div className="rounded-3xl border border-[#f5a623]/20 bg-[#f5a623]/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gray-400">
                    <TimerReset className="h-4 w-4 text-[#f5a623]" />
                    {language === 'hu' ? 'Automatizálható rész' : language === 'en' ? 'Automatable share' : 'Automatisierbarer Anteil'}
                  </div>
                  <div className="text-3xl font-bold text-[#f5a623]">75%</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">{ui.note}</p>
            <p className="mb-6 text-base text-white/80">{ui.support}</p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-[#00e5ff]/40 bg-[#00e5ff]/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#00e5ff] transition duration-300 hover:scale-105 hover:border-[#00e5ff] hover:bg-[#00e5ff]/15 hover:shadow-[0_0_35px_rgba(0,229,255,0.28)]"
              onClick={() =>
                trackCtaClick({
                  location: CTA_LOCATIONS.RoiPrimary,
                  language,
                  target: '#contact',
                  page: PAGE_NAMES.Home,
                })
              }
            >
              {ui.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
