import React from 'react';
import { mockApplications } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { Briefcase, ChevronRight, CheckCircle2, AlertCircle, Clock, Video, ClipboardList } from 'lucide-react';

const statusConfig = {
  'Screening AI': { bg: 'bg-slate-100 text-slate-600 border-slate-200', icon: Clock },
  'Tes Online': { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: ClipboardList },
  'Wawancara': { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Video },
  'Shortlist': { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: CheckCircle2 },
  'Diterima': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  'Ditolak': { bg: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
};

const CandidateApplications = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Lamaran Saya</h1>
        <p className="text-slate-500 text-sm mt-1">Pantau semua status lamaranmu di sini.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Lamaran', value: mockApplications.length, color: 'slate' },
          { label: 'Sedang Diproses', value: mockApplications.filter(a => !['Diterima','Ditolak'].includes(a.status)).length, color: 'indigo' },
          { label: 'Berhasil', value: mockApplications.filter(a => a.status === 'Diterima').length, color: 'emerald' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
            <p className={`text-2xl font-extrabold text-${s.color}-600`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {mockApplications.map((app) => {
          const cfg = statusConfig[app.status] || { bg: 'bg-slate-50 text-slate-600 border-slate-200', icon: Clock };
          const Icon = cfg.icon;
          return (
            <div key={app.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center font-bold text-indigo-600 text-base flex-shrink-0">
                  {app.company.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900">{app.jobTitle}</h3>
                      <p className="text-sm text-slate-500">{app.company}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${cfg.bg}`}>
                      <Icon size={12} /> {app.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <span className="text-xs text-slate-400">Dilamar: {app.appliedAt}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${app.matchScore >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {app.matchScore}% cocok
                    </span>
                  </div>
                  {app.nextStep && (
                    <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 flex items-center gap-2">
                      <ChevronRight size={14} className="text-indigo-400 flex-shrink-0" />
                      <p className="text-xs text-indigo-700 font-medium">{app.nextStep}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Link to="/candidate/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline">
          <Briefcase size={15} /> Cari Lowongan Baru
        </Link>
      </div>
    </div>
  );
};

export default CandidateApplications;
