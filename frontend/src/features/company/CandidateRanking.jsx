import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCandidates } from '../../data/mockData';
import {
  Search, Filter, Users, ChevronRight, CheckCircle2, AlertCircle,
  Zap, ClipboardList, Video, X
} from 'lucide-react';

const statusConfig = {
  Review:    { bg: 'bg-slate-100 text-slate-600 border-slate-200' },
  Shortlist: { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  Tes:       { bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  Interview: { bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  Diterima:  { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  Ditolak:   { bg: 'bg-red-50 text-red-700 border-red-200' },
};

const allStatuses = ['Semua', 'Review', 'Shortlist', 'Tes', 'Interview', 'Diterima', 'Ditolak'];

const CandidateRanking = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [candidates, setCandidates] = useState(mockCandidates);

  const filtered = [...candidates]
    .filter(c => {
      const q = search.toLowerCase();
      return (c.name.toLowerCase().includes(q) || c.jobTitle.toLowerCase().includes(q)) &&
        (statusFilter === 'Semua' || c.status === statusFilter);
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const updateStatus = (id, newStatus) => {
    setCandidates(cs => cs.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ranking Kandidat</h1>
          <p className="text-slate-500 text-sm mt-1">{candidates.length} kandidat ditemukan · Diurutkan berdasarkan skor kecocokan AI.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama atau posisi..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {allStatuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${statusFilter === s ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Users size={36} className="mx-auto mb-3 opacity-30" />
            <p>Tidak ada kandidat ditemukan.</p>
          </div>
        )}
        {filtered.map((c, i) => {
          const cfg = statusConfig[c.status] || statusConfig.Review;
          return (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                {/* Rank */}
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-bold flex-shrink-0 mt-1">
                  {i + 1}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {c.name.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900">{c.name}</h3>
                      <p className="text-sm text-slate-500">{c.education} · {c.experience}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${c.matchScore >= 90 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : c.matchScore >= 75 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        <Zap size={11} /> {c.matchScore}% Cocok
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.bg}`}>{c.status}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.matchedSkills.map(sk => (
                      <span key={sk} className="flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={9} /> {sk}
                      </span>
                    ))}
                    {c.gapSkills.map(sk => (
                      <span key={sk} className="flex items-center gap-1 text-[11px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                        <AlertCircle size={9} /> {sk}
                      </span>
                    ))}
                  </div>

                  {/* Test Status */}
                  {c.testStatus && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <ClipboardList size={12} />
                      Tes: <span className={`font-semibold ${c.testStatus === 'Selesai' ? 'text-emerald-600' : c.testStatus === 'Menunggu' ? 'text-amber-600' : 'text-slate-500'}`}>
                        {c.testStatus} {c.testScore ? `· Skor ${c.testScore}/100` : ''}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <select value={c.status}
                      onChange={(e) => updateStatus(c.id, e.target.value)}
                      className="text-xs font-semibold border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer">
                      {Object.keys(statusConfig).map(s => <option key={s}>{s}</option>)}
                    </select>
                    <button className="flex items-center gap-1 text-xs font-semibold border border-amber-200 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors">
                      <ClipboardList size={12} /> Kirim Tes
                    </button>
                    <button className="flex items-center gap-1 text-xs font-semibold border border-blue-200 text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                      <Video size={12} /> Jadwalkan Interview
                    </button>
                    <Link to={`/company/candidates/${c.id}`}
                      className="flex items-center gap-1 text-xs font-semibold border border-indigo-200 text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors ml-auto">
                      Lihat Detail <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateRanking;
