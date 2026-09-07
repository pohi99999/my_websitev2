import React from 'react';
import SpotlightCard from '../../../../components/SpotlightCard';

const FlowCard = ({ step, title, icon: Icon, children, tone = 'from-blue-500/30 to-purple-500/20' }) => (
  <SpotlightCard className="p-0 overflow-hidden">
    <div className={`px-5 py-4 border-b border-white/10 bg-gradient-to-r ${tone}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 border border-white/10">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs text-gray-300">Step {step}</div>
          <div className="font-bold text-white">{title}</div>
        </div>
      </div>
    </div>
    <div className="p-5 sm:p-6 bg-black/35">{children}</div>
  </SpotlightCard>
);

export default FlowCard;
