import React from 'react';
import SpotlightCard from '../../components/SpotlightCard';

const videos = [
  {
    id: 'D5t1_407FIs',
    title: 'Gemini a Google Workspace-ben',
    desc: 'Így segít az AI az emailek írásában és a dokumentumok rendszerezésében.'
  },
  {
    id: '6Da1tQe-kcw',
    title: 'Adatelemzés másodpercek alatt',
    desc: 'Felejtsd el a bonyolult képleteket. Kérdezz rá az adataidra magyarul!'
  },
  {
    id: 'bNpxF1W7q0g',
    title: 'Irodai Automatizáció',
    desc: 'Unatkozol a repetitív feladatoktól? Nézd meg, hogyan veszi át őket az AI.'
  }
];

export default function VideoShowcase() {
  return (
    <section className="mt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
          AI a Gyakorlatban
        </h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Valós példák arra, hogyan segít a mindennapokban: e-mailek, dokumentumok, táblázatok és repetitív admin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <SpotlightCard
              key={video.id}
              className="p-0 overflow-hidden bg-black/40 border border-white/10 hover:border-white/20 backdrop-blur-md"
            >
              <div className="p-6">
                <div className="text-xl font-bold mb-2">{video.title}</div>
                <p className="text-gray-300 mb-4 leading-relaxed">{video.desc}</p>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
