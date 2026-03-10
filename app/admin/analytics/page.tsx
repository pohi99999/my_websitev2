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

export default function AnalyticsAdminPage() {
  const [data, setData] = useState<KpiConfigResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/analytics/kpi-config", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = (await res.json()) as KpiConfigResponse;
        if (!cancelled) {
          setData(json);
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

        {data && summary && (
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
