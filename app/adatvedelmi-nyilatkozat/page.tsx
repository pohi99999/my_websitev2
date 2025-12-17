import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adatvédelmi nyilatkozat',
  description: 'Adatvédelmi tájékoztató a Pohánka és Társa Kft. weboldalához.',
  alternates: {
    canonical: '/adatvedelmi-nyilatkozat'
  }
};

export default function AdatvedelmiPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold gradient-text">Adatvédelmi nyilatkozat</h1>
        <p className="mt-6 text-gray-300 leading-relaxed">
          Ez az oldal egy alap adatvédelmi tájékoztató váz. Launch előtt érdemes véglegesíteni a
          jogi szöveget (adatkezelő, célok, jogalap, megőrzés, adatfeldolgozók, sütik, érintetti jogok).
        </p>

        <section className="mt-10 space-y-4 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white">Adatkezelő</h2>
          <p>Pohánka és Társa Kft. • 8900 Zalaegerszeg, Magyarország</p>
          <p>Email: peterpohankapersonal@gmail.com • Telefon: +36 30 244 6779</p>

          <h2 className="text-xl font-bold text-white mt-8">Kezelt adatok</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kapcsolatfelvétel során megadott adatok (név, email, üzenet)</li>
            <li>Alap technikai adatok (naplófájlok, IP-cím – a szolgáltató rendszerein)</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8">Kapcsolat</h2>
          <p>
            Adatvédelmi kérdés esetén írj a fenti email címre.
          </p>
        </section>
      </div>
    </main>
  );
}
