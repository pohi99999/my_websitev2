import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ÁSZF',
  description: 'Általános Szerződési Feltételek (ÁSZF) – Pohánka és Társa Kft.'
};

export default function AszfPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold gradient-text">Általános Szerződési Feltételek (ÁSZF)</h1>
        <p className="mt-6 text-gray-300 leading-relaxed">
          Ez egy vázoldal, hogy a footer linkek ne legyenek „#” placeholderen, és a route ne 404-oljon.
          Launch előtt ide kerülhet a végleges ÁSZF (szolgáltatások, fizetés, felelősség, elállás, stb.).
        </p>

        <section className="mt-10 space-y-4 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">Szolgáltató</h2>
          <p>Pohánka és Társa Kft. • 8900 Zalaegerszeg, Magyarország</p>
          <p>Email: peterpohankapersonal@gmail.com • Telefon: +36 30 244 6779</p>

          <h2 className="text-xl font-bold text-white mt-8">Hatály</h2>
          <p>A jelen ÁSZF a weboldalon keresztül nyújtott szolgáltatásokra vonatkozó alap tájékoztató.</p>
        </section>
      </div>
    </main>
  );
}
