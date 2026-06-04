import { Brain, CheckCircle } from "lucide-react";
import { SmartContactForm } from "../../../components/SmartContactForm";
import seoTargets from "../../../lib/data/seo_targets.json";

export async function generateStaticParams() {
  return seoTargets.map((target) => ({
    industry: target.industry,
    city: target.city,
  }));
}

export async function generateMetadata({ params }: { params: { industry: string, city: string } }) {
  const target = seoTargets.find(t => t.industry === params.industry && t.city === params.city) || {
    original_industry: params.industry,
    original_city: params.city
  };

  return {
    title: `Professzionális ${target.original_industry} weboldal készítés ${target.original_city} - Pohánka & Társa`,
    description: `${target.original_city} területén működő ${target.original_industry} vállalkozások számára kínálunk MI-alapú weboldalakat és automatizációt mérhető ROI-val.`,
  };
}

export default function IndustryCityPage({ params }: { params: { industry: string, city: string } }) {
  const target = seoTargets.find(t => t.industry === params.industry && t.city === params.city) || {
    original_industry: params.industry,
    original_city: params.city
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto pt-16">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            <span>Iparági Megoldások</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Professzionális {target.original_industry} weboldal készítés {target.original_city} területén
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Segítünk a(z) {target.original_city} környéki {target.original_industry.toLowerCase()} cégeknek, hogy modern, MI-vel támogatott weboldallal és 0 manuális adatrögzítéssel növeljék hatékonyságukat.
          </p>
        </header>

        <section className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Miért válassza a Pohánka & Társát?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "0 manuális adatrögzítés",
              "Azonnali MI válaszadó az ügyfeleknek",
              "Lokális keresőoptimalizálás (SEO)",
              "Folyamatautomatizálás (n8n)",
              "Mobil-első, villámgyors design",
              "Garantált megtérülés (ROI focus)"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="kapcsolat" className="bg-slate-900 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Kérjen egyedi ajánlatot {target.original_city} területén!</h2>
            <p className="text-slate-400">Töltse ki az alábbi űrlapot, és 24 órán belül felvesszük Önnel a kapcsolatot.</p>
          </div>
          <SmartContactForm />
        </section>
      </div>
    </div>
  );
}
