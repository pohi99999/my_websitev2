"use client";

import { useEffect, useMemo, useState } from "react";

type KpiConfigResponse = {
    version: number;
    generatedAt: string;
    events: Record<string, string>;
    dimensions: {
        page: Record<string, string>;
        ctaLocation: Record<string, string>;
        form: Record<string, string>;
        formStatus: Record<string, string>;
    };
    funnel: {
        name: string;
        description: string;
        steps: Array<{
            key: string;
            event: string;
            filters?: Record<string, string[] | string>;
        }>;
    };
    kpis: Array<{
        key: string;
        label: string;
        event?: string;
        filters?: Record<string, string>;
        formula?: string;
        dimension?: string;
    }>;
};

type KpiSnapshotResponse = {
    source: "env" | "fallback";
    generatedAt: string;
    counts: {
        ctaClicksTotal: number;
        contactSubmitSuccess: number;
        contactSubmitError: number;
    };
    byLanguage: Record<string, { ctaClicks: number; contactSuccess: number }>;
    metrics: {
        conversionRate: number;
        errorRate: number;
    };
};

export default function AnalyticsAdminPage() {
    const [data, setData] = useState<KpiConfigResponse | null>(null);
    const [snapshot, setSnapshot] = useState<KpiSnapshotResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const [configRes, snapshotRes] = await Promise.all([
                    fetch("/api/analytics/kpi-config", { cache: "no-store" }),
                    fetch("/api/analytics/kpi-snapshot", { cache: "no-store" }),
                ]);

                if (!configRes.ok) {
                    throw new Error(`HTTP ${configRes.status}`);
                }
                if (!snapshotRes.ok) {
                    throw new Error(`HTTP ${snapshotRes.status}`);
                }

                const json = (await configRes.json()) as KpiConfigResponse;
                const snapshotJson = (await snapshotRes.json()) as KpiSnapshotResponse;
                if (!cancelled) {
                    setData(json);
                    setSnapshot(snapshotJson);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e instanceof Error ? e.message : "Unknown error");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void load();
        return () => {
            cancelled = true;
        };
    }, []);

    const summary = useMemo(() => {
        if (!data) return null;

        return {
            events: Object.keys(data.events).length,
            ctaLocations: Object.keys(data.dimensions.ctaLocation).length,
            pages: Object.keys(data.dimensions.page).length,
            kpis: data.kpis.length,
            funnelSteps: data.funnel.steps.length,
        };
    }, [data]);

    return (
        <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Analytics KPI Config
                    </h1>
                    <p className="text-slate-300">
                        Funnel and KPI schema served from <code>/api/analytics/kpi-config</code>
                    </p>
                </header>

                {loading && (
                    <section className="rounded-xl border border-white/10 bg-white/5 p-6 text-slate-300">
                        Loading KPI configuration...
                    </section>
                )}

                {error && (
                    <section className="rounded-xl border border-red-400/40 bg-red-500/10 p-6 text-red-200">
                        Failed to load analytics config: {error}
                    </section>
                )}

                {data && summary && snapshot && (
                    <>
                        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <StatCard label="Events" value={summary.events} />
                            <StatCard label="CTA locations" value={summary.ctaLocations} />
                            <StatCard label="Pages" value={summary.pages} />
                            <StatCard label="KPIs" value={summary.kpis} />
                            <StatCard label="Funnel steps" value={summary.funnelSteps} />
                        </section>

                        <section className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-3">
                            <h2 className="text-xl font-semibold">Funnel: {data.funnel.name}</h2>
                            <p className="text-slate-300">{data.funnel.description}</p>
                            <ol className="space-y-2 text-sm text-slate-200 list-decimal list-inside">
                                {data.funnel.steps.map((step) => (
                                    <li key={step.key}>
                                        <span className="font-semibold">{step.key}</span> → {step.event}
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Funnel Drop-off (Live Snapshot)</h2>
                            <p className="text-slate-300 text-sm">
                                Source: <span className="font-semibold text-white">{snapshot.source}</span> • generated at {new Date(snapshot.generatedAt).toLocaleString()}
                            </p>

                            <FunnelBar
                                label="CTA Clicks"
                                count={snapshot.counts.ctaClicksTotal}
                                percent={100}
                                colorClass="from-cyan-500 to-blue-500"
                            />
                            <FunnelBar
                                label="Contact Submit Success"
                                count={snapshot.counts.contactSubmitSuccess}
                                percent={snapshot.metrics.conversionRate}
                                colorClass="from-emerald-500 to-green-500"
                            />
                            <FunnelBar
                                label="Contact Submit Error"
                                count={snapshot.counts.contactSubmitError}
                                percent={snapshot.metrics.errorRate}
                                colorClass="from-red-500 to-rose-500"
                            />

                            <div className="text-sm text-slate-300">
                                Conversion rate: <span className="font-semibold text-white">{snapshot.metrics.conversionRate}%</span>
                            </div>
                        </section>

                        <section className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-3">
                            <h2 className="text-xl font-semibold">Language Split</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {Object.entries(snapshot.byLanguage).map(([lang, v]) => (
                                    <div key={lang} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200 space-y-1">
                                        <div className="uppercase tracking-wide text-xs text-slate-400">{lang}</div>
                                        <div>CTA clicks: <span className="font-semibold text-white">{v.ctaClicks}</span></div>
                                        <div>Contact success: <span className="font-semibold text-white">{v.contactSuccess}</span></div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
                            <h2 className="text-xl font-semibold">KPI Definitions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.kpis.map((kpi) => (
                                    <article key={kpi.key} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 space-y-2">
                                        <h3 className="font-semibold text-cyan-300">{kpi.label}</h3>
                                        <p className="text-xs text-slate-400">{kpi.key}</p>
                                        {kpi.event && <p className="text-sm text-slate-200">Event: {kpi.event}</p>}
                                        {kpi.dimension && <p className="text-sm text-slate-200">Dimension: {kpi.dimension}</p>}
                                        {kpi.formula && <p className="text-sm text-slate-300">Formula: {kpi.formula}</p>}
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-3">
                            <h2 className="text-xl font-semibold">Raw JSON</h2>
                            <pre className="text-xs text-slate-300 bg-slate-900/60 rounded-lg p-4 overflow-auto max-h-[420px]">
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-slate-400 uppercase tracking-wide">{label}</div>
            <div className="mt-1 text-2xl font-bold text-white">{value}</div>
        </div>
    );
}

function FunnelBar({
    label,
    count,
    percent,
    colorClass,
}: {
    label: string;
    count: number;
    percent: number;
    colorClass: string;
}) {
    const widthClass = getWidthClass(percent);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-200">
                <span>{label}</span>
                <span>
                    {count} ({percent}%)
                </span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${colorClass} ${widthClass}`} />
            </div>
        </div>
    );
}

function getWidthClass(percent: number): string {
    const p = Math.min(100, Math.max(0, percent));
    if (p >= 100) return 'w-full';
    if (p >= 90) return 'w-[90%]';
    if (p >= 80) return 'w-[80%]';
    if (p >= 70) return 'w-[70%]';
    if (p >= 60) return 'w-[60%]';
    if (p >= 50) return 'w-1/2';
    if (p >= 40) return 'w-[40%]';
    if (p >= 30) return 'w-[30%]';
    if (p >= 20) return 'w-1/5';
    if (p >= 10) return 'w-[10%]';
    if (p > 0) return 'w-[5%]';
    return 'w-0';
}
