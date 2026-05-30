import React, { useState } from 'react';
import { mockJobs } from '../../data/mockData';
import { Link } from 'react-router-dom';
import {
  Search, MapPin, Briefcase, Filter, ChevronRight,
  Zap, CheckCircle2, AlertCircle, TrendingUp
} from 'lucide-react';

const typeColors = {
  'Full-time': 'bg-indigo-50 text-indigo-700',
  'Part-time': 'bg-violet-50 text-violet-700',
  'Remote': 'bg-emerald-50 text-emerald-700',
  'Hybrid': 'bg-blue-50 text-blue-700',
};

const ScoreBadge = ({ score }) => {
  const color = score >= 85 ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
    : score >= 70 ? 'bg-amber-100 text-amber-700 border-amber-200'
    : 'bg-slate-100 text-slate-600 border-slate-200';
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-sm ${color}`}>
      <Zap size={13} />
      {score}% Cocok
    </div>
  );
};

const JobRecommendations = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Semua');

  const types = ['Semua', 'Full-time', 'Part-time', 'Remote'];
  const filtered = mockJobs.filter((j) => {
    const q = search.toLowerCase();
    const matchQ = j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
    const matchType = filterType === 'Semua' || j.type === filterType;
    return matchQ && matchType;
  });

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Rekomendasi Lowongan</h1>
        <p className="text-slate-500 text-sm mt-1">AI mencocokkan profilmu dengan {mockJobs.length} lowongan relevan.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari posisi atau perusahaan..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all border ${filterType === t ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Briefcase size={36} className="mx-auto mb-3 opacity-30" />
            <p>Tidak ada lowongan ditemukan.</p>
          </div>
        )}
        {filtered.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center flex-shrink-0 font-extrabold text-indigo-600 text-lg">
                {job.company.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                    <p className="text-slate-600 text-sm mt-0.5">{job.company}</p>
                  </div>
                  <ScoreBadge score={job.matchScore} />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${typeColors[job.type] || 'bg-slate-50 text-slate-600'}`}>{job.type}</span>
                  <span>{job.salary}</span>
                  <span className="text-slate-400">{job.postedAt}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.matchedSkills.map((sk) => (
                    <span key={sk} className="flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={10} /> {sk}
                    </span>
                  ))}
                  {job.gapSkills.map((sk) => (
                    <span key={sk} className="flex items-center gap-1 text-[11px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                      <AlertCircle size={10} /> {sk}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  {job.applied && (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">✓ Sudah Dilamar</span>
                  )}
                  <Link to={`/candidate/jobs/${job.id}`}
                    className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                    Lihat Detail <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;
