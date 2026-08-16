'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Lead {
  id: number;
  name: string;
  address: string;
  phone: string;
  website: string;
  query: string;
  scraped_at: string;
  status: string;
  audit: {
    title: string;
    loadTimeMs: number;
    hasDescription: boolean;
    isMobileFriendly: boolean;
    score: number;
  } | null;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function CrmAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setStatusFilter] = useState('all');
  const [selectedAudit, setSelectedAudit] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? '/api/v1/potential-clients' 
        : `/api/v1/potential-clients?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.ok) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/v1/potential-clients/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  // Memoized stats and chart data to prevent redundant loops on every render
  const aggregatedData = useMemo(() => {
    let auditCount = 0;
    const statusCounts: Record<string, number> = {};
    const industryCounts: Record<string, number> = {};

    for (let i = 0; i < leads.length; i++) {
      const l = leads[i];

      if (l.audit) auditCount++;
      statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;

      const cat = l.query ? l.query.split(' ')[0] : 'Egyéb';
      industryCounts[cat] = (industryCounts[cat] || 0) + 1;
    }

    const total = leads.length || 1;
    const sentCount = statusCounts['sent'] || 0;
    const newCount = statusCounts['new'] || 0;

    const stats = {
      auditCount,
      auditPercent: Math.round((auditCount / total) * 100) || 0,
      sentCount,
      sentPercent: Math.round((sentCount / total) * 100) || 0,
      newCount,
    };

    const statusData = Object.keys(statusCounts).map((status) => ({
      name: status.toUpperCase(),
      value: statusCounts[status],
    }));

    const industryData = Object.keys(industryCounts).map((cat) => ({
      name: cat.toUpperCase(),
      Leadek: industryCounts[cat],
    }));

    return { stats, statusData, industryData };
  }, [leads]);

  const { stats, statusData, industryData } = aggregatedData;

  return (
    <div className="container mx-auto p-6 bg-slate-950 min-h-screen text-white relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-400">B2B CRM Dashboard</h1>
        <a 
          href="/admin/crm/pipeline" 
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
        >
          View Sales Pipeline (Kanban) →
        </a>
      </div>
      
      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-xl">
              <div className="text-slate-400 text-sm mb-1">Összes Lead</div>
              <div className="text-3xl font-bold">{leads.length}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-xl">
              <div className="text-slate-400 text-sm mb-1">Auditált Cégek</div>
              <div className="text-3xl font-bold text-purple-400">
                {stats.auditCount} 
                <span className="text-sm font-normal text-slate-500 ml-2">
                  ({stats.auditPercent}%)
                </span>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-xl">
              <div className="text-slate-400 text-sm mb-1">Kiküldött (SENT)</div>
              <div className="text-3xl font-bold text-green-400">
                {stats.sentCount}
                <span className="text-sm font-normal text-slate-500 ml-2">
                  ({stats.sentPercent}%)
                </span>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-xl">
              <div className="text-slate-400 text-sm mb-1">Új / Kapcsolatfelvételre vár</div>
              <div className="text-3xl font-bold text-blue-400">
                {stats.newCount}
              </div>
            </div>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-xl h-80">
                <h3 className="text-lg font-semibold text-slate-300 mb-4">Státusz Megoszlás</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-xl h-80">
                <h3 className="text-lg font-semibold text-slate-300 mb-4">Iparági Eloszlás (Keresések)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                    <Bar dataKey="Leadek" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </>
      )}

      <div className="flex gap-4 mb-6">
        {['all', 'new', 'audited', 'drafted', 'sent'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-full border transition-all ${
              filter === s ? 'bg-emerald-500 border-emerald-500' : 'border-slate-700 hover:border-emerald-400'
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mx-auto mb-4"></div>
           Betöltés...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-4">Név</th>
                <th className="p-4">Weboldal</th>
                <th className="p-4">Státusz</th>
                <th className="p-4">Audit</th>
                <th className="p-4">Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-t border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-medium">{lead.name}</td>
                  <td className="p-4">
                    {lead.website ? (
                      <a href={lead.website} target="_blank" className="text-blue-400 hover:underline truncate block max-w-xs">
                        {new URL(lead.website).hostname}
                      </a>
                    ) : '-'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      lead.status === 'new' ? 'bg-blue-900 text-blue-200' :
                      lead.status === 'audited' ? 'bg-purple-900 text-purple-200' :
                      lead.status === 'sent' ? 'bg-green-900 text-green-200' : 'bg-slate-700'
                    }`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    {lead.audit ? (
                      <button 
                        onClick={() => setSelectedAudit(lead)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-xs px-2 py-1 rounded transition-colors"
                      >
                        VIEW ({lead.audit.score})
                      </button>
                    ) : (
                      <span className="text-slate-600 text-xs italic">Nincs audit</span>
                    )}
                  </td>
                  <td className="p-4">
                    <select 
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded p-1 text-sm focus:outline-none focus:border-emerald-400"
                    >
                      <option value="new">NEW</option>
                      <option value="audited">AUDITED</option>
                      <option value="drafted">DRAFTED</option>
                      <option value="sent">SENT</option>
                      <option value="rejected">REJECTED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Audit Modal */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 max-w-2xl w-full shadow-2xl relative">
            <button 
              onClick={() => setSelectedAudit(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
            >✕</button>
            
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">Audit Report: {selectedAudit.name}</h2>
            <p className="text-slate-400 mb-6">{selectedAudit.website}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-500 text-sm mb-1">Score</div>
                <div className={`text-2xl font-bold ${selectedAudit.audit!.score > 60 ? 'text-green-400' : 'text-orange-400'}`}>
                  {selectedAudit.audit!.score} / 100
                </div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-500 text-sm mb-1">Load Time</div>
                <div className="text-2xl font-bold">{selectedAudit.audit!.loadTimeMs} ms</div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-500 text-sm mb-1">Mobile Friendly</div>
                <div className={`text-lg font-bold ${selectedAudit.audit!.isMobileFriendly ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedAudit.audit!.isMobileFriendly ? 'YES' : 'NO'}
                </div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-500 text-sm mb-1">Has Meta Desc.</div>
                <div className={`text-lg font-bold ${selectedAudit.audit!.hasDescription ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedAudit.audit!.hasDescription ? 'YES' : 'NO'}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
               <button 
                 onClick={() => setSelectedAudit(null)}
                 className="flex-1 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
               >
                 Close
               </button>
               <a 
                 href={`mailto:info@${new URL(selectedAudit.website).hostname.replace('www.', '')}`}
                 className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-center font-bold transition-all"
               >
                 Send Web Rescue Offer
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
