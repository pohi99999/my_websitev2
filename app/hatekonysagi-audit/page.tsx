import React from 'react';
import LeadMagnetForm from '../components/LeadMagnetForm';

export const metadata = {
  title: 'Digitális Hatékonysági Audit',
  description: 'Tudd meg 3 perc alatt, hol veszít a cég havonta 100+ munkaórát a manuális folyamatokon – és hogyan állíthatod meg ezt az MI segítségével!',
};

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00ff9d] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-syne font-bold mb-6">
            Digitális Hatékonysági <span className="text-[#00ff9d]">Audit</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Tudd meg 3 perc alatt, hol veszít a cég havonta 100+ munkaórát a manuális folyamatokon – és hogyan állíthatod meg ezt az MI segítségével!
          </p>
        </div>

        <LeadMagnetForm />
      </div>
    </div>
  );
}
