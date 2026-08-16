'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Phone, Globe, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Lead {
  id: number;
  name: string;
  website: string;
  phone: string;
  deal_stage: string;
  status: string;
  intent: string | null;
  notes: string | null;
  audit?: {
    score: number;
    loadTimeMs: number;
    hasDescription: boolean;
    isMobileFriendly: boolean;
  } | null;
}

const STAGES = [
  { id: 'lead', title: 'Kapcsolatfelvétel', color: 'bg-blue-500/10 border-blue-500/20' },
  { id: 'interested', title: 'Érdeklődik', color: 'bg-purple-500/10 border-purple-500/20' },
  { id: 'negotiation', title: 'Tárgyalás', color: 'bg-yellow-500/10 border-yellow-500/20' },
  { id: 'won', title: 'Megnyerve', color: 'bg-green-500/10 border-green-500/20' },
  { id: 'lost', title: 'Elvesztve', color: 'bg-red-500/10 border-red-500/20' },
];

function SortableItem({ lead, moveStage, setSelectedAudit, editingNotes, setEditingNotes, updateLeadFields }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id, data: lead });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-lg hover:border-emerald-500/50 transition-all group cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-start mb-2">
        <div className="font-bold text-sm group-hover:text-emerald-400 transition-colors">{lead.name}</div>
        {lead.audit && (
          <button onPointerDown={(e) => { e.stopPropagation(); setSelectedAudit(lead); }} className="text-emerald-500 hover:text-emerald-400 pointer-events-auto">
            <Globe size={14} />
          </button>
        )}
      </div>
      
      <div className="text-xs text-slate-400 space-y-1 mb-4 pointer-events-auto" onPointerDown={(e) => e.stopPropagation()}>
        {lead.website && <div className="truncate opacity-60 text-[10px]">{new URL(lead.website).hostname}</div>}
        {lead.intent && (
          <div className={`mt-2 p-1 px-2 rounded inline-block text-[10px] font-bold ${
            lead.intent === 'positive' ? 'bg-green-900 text-green-200' : 
            lead.intent === 'question' ? 'bg-blue-900 text-blue-200' : 'bg-red-900 text-red-200'
          }`}>
            {lead.intent.toUpperCase()}
          </div>
        )}
        
        <div className="mt-2 pt-2 border-t border-slate-800">
          {editingNotes?.id === lead.id ? (
            <div className="space-y-2">
              <textarea 
                className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-white text-[11px] focus:outline-none"
                value={editingNotes.text}
                onChange={(e) => setEditingNotes({ ...editingNotes, text: e.target.value })}
                rows={3}
              />
              <div className="flex gap-2">
                <button onClick={() => updateLeadFields(lead.id, { notes: editingNotes.text })} className="text-[10px] bg-emerald-600 px-2 py-0.5 rounded">Save</button>
                <button onClick={() => setEditingNotes(null)} className="text-[10px] bg-slate-700 px-2 py-0.5 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div onClick={() => setEditingNotes({id: lead.id, text: lead.notes || ''})} className="cursor-pointer hover:bg-slate-800 p-1 rounded min-h-[20px] italic text-slate-500 text-[11px]">
              {lead.notes || 'Add notes...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function KanbanPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAudit, setSelectedAudit] = useState<Lead | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [editingNotes, setEditingNotes] = useState<{id: number, text: string} | null>(null);
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/potential-clients');
      const data = await res.json();
      if (data.ok) {
        const sentLeads = data.leads.filter((l: any) => l.status === 'sent' || l.deal_stage !== 'lead');
        setLeads(sentLeads);
      }
    } catch (err) {
      console.error('Fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    fetchLeads();
  }, []);

  const leadsByStage = useMemo(() => {
    return leads.reduce((acc, lead) => {
      const stage = lead.deal_stage;
      if (!acc[stage]) acc[stage] = [];
      acc[stage].push(lead);
      return acc;
    }, {} as Record<string, Lead[]>);
  }, [leads]);

  const updateLeadFields = async (id: number, fields: Partial<Lead>) => {
    try {
      const res = await fetch(`/api/v1/potential-clients/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, ...fields } : l));
        if (fields.notes !== undefined) setEditingNotes(null);
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const leadId = Number(active.id);
    const overId = over.id; // This will be the stage ID if dropped on a column

    if (STAGES.some(s => s.id === overId)) {
        if (active.data.current.deal_stage !== overId) {
            await updateLeadFields(leadId, { deal_stage: overId as string });
        }
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-emerald-400">Sales Pipeline Kanban</h1>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-400">
          Total Deals: {leads.length} | Won: {leads.filter(l => l.deal_stage === 'won').length}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={(e) => setActiveId(Number(e.active.id))} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-[calc(100vh-160px)] overflow-hidden">
            {STAGES.map(stage => {
              const stageLeads = leadsByStage[stage.id] || [];
              return (
              <div key={stage.id} id={stage.id} className={`flex flex-col rounded-xl border \${stage.color} p-4 h-full relative`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                  {stage.title}
                  <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">
                    {stageLeads.length}
                  </span>
                </h3>
                
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-1">
                  <SortableContext items={stageLeads.map(l => l.id)} strategy={verticalListSortingStrategy}>
                    {stageLeads.map(lead => (
                      <SortableItem 
                        key={lead.id} 
                        lead={lead} 
                        setSelectedAudit={setSelectedAudit} 
                        editingNotes={editingNotes}
                        setEditingNotes={setEditingNotes}
                        updateLeadFields={updateLeadFields}
                      />
                    ))}
                  </SortableContext>
                </div>
              </div>
            )})}
          </div>
        </DndContext>
      )}

      {/* Audit Modal */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 max-w-2xl w-full shadow-2xl relative">
            <button onClick={() => setSelectedAudit(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">Audit Report: {selectedAudit.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-500 text-sm mb-1">Score</div>
                <div className={`text-2xl font-bold \${selectedAudit.audit?.score && selectedAudit.audit.score > 60 ? 'text-green-400' : 'text-orange-400'}`}>{selectedAudit.audit?.score || 'N/A'} / 100</div>
              </div>
              <div className="p-4 bg-slate-800 rounded-lg">
                <div className="text-slate-500 text-sm mb-1">Load Time</div>
                <div className="text-2xl font-bold">{selectedAudit.audit?.loadTimeMs || 'N/A'} ms</div>
              </div>
            </div>
            <button onClick={() => setSelectedAudit(null)} className="mt-8 w-full py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">Close</button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}
