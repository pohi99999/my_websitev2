import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impresszum',
  description: 'Céginformációk és elérhetőségek – Pohánka és Társa Kft.',
  alternates: {
    canonical: '/impresszum'
  }
};

export default function ImpresszumPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold gradient-text">Impresszum</h1>

        <div className="mt-8 space-y-4 text-gray-300 leading-relaxed">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold">Pohánka és Társa Kft.</div>
            <div>Székhely: 8900 Zalaegerszeg, Magyarország</div>
            <div>Email: peterpohankapersonal@gmail.com</div>
            <div>Telefon: +36 30 244 6779</div>
          </div>

          <p className="text-sm text-gray-400">
            Megjegyzés: jogilag pontos cégadatok (adószám, cégjegyzékszám, nyilvántartó bíróság) launch előtt
            ide tölthetők fel.
          </p>
        </div>
      </div>
    </main>
  );
}
