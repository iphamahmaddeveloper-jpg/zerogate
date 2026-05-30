import React from 'react';
import { Link } from 'react-router-dom';
import { mockRecruiterStats, mockRecruiterJobs, mockCandidates } from '../../data/mockData';
import {
  Briefcase, Users, ClipboardList, Video, TrendingUp, Plus,
  ChevronRight, CheckCircle2, Clock, AlertCircle, ArrowUpRight
} from 'lucide-react';

const statCards = [
  { label: 'Lowongan Aktif', key: 'activeJobs', icon: Briefcase, color: 'indigo', link: '/company/jobs' },
  { label: 'Total Pelamar', key: 'totalApplicants', icon: Users, color: 'violet', link: '/company/candidates' },
  { label: 'Menunggu Tes', key: 'pendingTest', icon: ClipboardList, color: 'amber', link: '/company/assessments' },
  { label: 'Menunggu Interview', key: 'pendingInterview', icon: Video, color: 'blue', link: '/company/assessments' },
  { label: 'Diterima', key: 'hired', icon: CheckCircle2, color: 'emerald', link: '/company/candidates' },
  { label: 'Ditolak', key: 'rejected', icon: AlertCircle, color: 'rose', link: '/company/candidates' },
];

const statusColors = {
  Aktif: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Ditutup: 'bg-slate-50 text-slate-500 border-slate-200',
};

const DashboardCompany = () => {
  const topCandidates = [...mockCandidates].sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Perekrut</h1>
          <p className="text-slate-500 text-sm mt-1">Ringkasan aktivitas rekrutmen kamu hari ini.</p>
        </div>
        <Link to="/company/jobs/create"
          className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
          <Plus size={16} /> Posting Lowongan
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((s) => {
          const Icon = s.icon;
          const val = mockRecruiterStats[s.key];
          return (
            <Link key={s.label} to={s.link}
              className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all group text-center">
              <div className={`w-9 h-9 rounded-xl bg-${s.color}-50 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform`}>
                <Icon size={17} className={`text-${s.color}-600`} />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{val}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{s.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Jobs */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Lowongan Aktif</h2>
            <Link to="/company/jobs/create" className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline">
              <Plus size={13} /> Buat Baru
            </Link>
          </div>
          <div className="space-y-3">
            {mockRecruiterJobs.map((job) => (
              <div key={job.id} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 transition-all">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl flex items-center justify-center font-bold text-indigo-600 flex-shrink-0">
                  {job.title.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{job.title}</p>
                  <p className="text-xs text-slate-500">Posted {job.postedAt} · Deadline {job.deadline}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-900">{job.applicants} <span className="font-normal text-slate-500 text-xs">pelamar</span></p>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[job.status]}`}>{job.status}</span>
                </div>
                <Link to="/company/candidates" className="text-slate-400 hover:text-indigo-600 transition-colors flex-shrink-0">
                  <ChevronRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-4">Aksi Cepat</h2>
            <div className="space-y-2.5">
              {[
                { label: 'Buat Lowongan Baru', icon: Plus, link: '/company/jobs/create', color: 'indigo' },
                { label: 'Lihat Semua Kandidat', icon: Users, link: '/company/candidates', color: 'violet' },
                { label: 'Manajemen Tes & Interview', icon: ClipboardList, link: '/company/assessments', color: 'amber' },
              ].map((a) => {
                const Icon = a.icon;
                return (
                  <Link key={a.label} to={a.link}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-${a.color}-100 bg-${a.color}-50 hover:bg-${a.color}-100 transition-colors group`}>
                    <div className={`w-8 h-8 bg-${a.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon size={15} className={`text-${a.color}-600`} />
                    </div>
                    <span className={`text-sm font-semibold text-${a.color}-800`}>{a.label}</span>
                    <ArrowUpRight size={14} className={`ml-auto text-${a.color}-400 group-hover:text-${a.color}-600 transition-colors`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Top Candidate Teaser */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-slate-900 text-sm">Kandidat Teratas</h2>
              <Link to="/company/candidates" className="text-xs text-indigo-600 font-medium hover:underline">Semua</Link>
            </div>
            <div className="space-y-2.5">
              {topCandidates.map((c, i) => (
                <Link key={c.id} to={`/company/candidates/${c.id}`}
                  className="flex items-center gap-3 hover:bg-slate-50 rounded-xl p-1.5 -mx-1.5 transition-colors">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{c.name}</p>
                    <p className="text-xs text-slate-400 truncate">{c.experience}</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 flex-shrink-0">{c.matchScore}%</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCompany;
