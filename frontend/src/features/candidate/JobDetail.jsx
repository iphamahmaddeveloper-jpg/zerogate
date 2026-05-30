import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockJobs } from '../../data/mockData';
import {
  ArrowLeft, MapPin, Briefcase, CheckCircle2, AlertCircle,
  Zap, Clock, ChevronRight, Building2, Star
} from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find((j) => j.id === parseInt(id));
  const [applied, setApplied] = useState(job?.applied || false);

  if (!job) return (
    <div className="text-center py-20 text-slate-400">
      <p>Lowongan tidak ditemukan.</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 text-sm hover:underline">← Kembali</button>
    </div>
  );

  const scoreColor = job.matchScore >= 85 ? 'text-emerald-600' : job.matchScore >= 70 ? 'text-amber-600' : 'text-slate-600';
  const scoreBg = job.matchScore >= 85 ? 'from-emerald-500 to-teal-500' : job.matchScore >= 70 ? 'from-amber-500 to-orange-500' : 'from-slate-400 to-slate-500';

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors">
        <ArrowLeft size={16} /> Kembali ke Lowongan
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center font-extrabold text-indigo-600 text-2xl flex-shrink-0">
            {job.company.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-slate-900">{job.title}</h1>
            <p className="text-slate-600 font-medium mt-0.5">{job.company}</p>
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500">
              <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
              <span className="flex items-center gap-1"><Briefcase size={14} />{job.type}</span>
              <span className="flex items-center gap-1"><Clock size={14} />{job.postedAt}</span>
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-2">{job.salary}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-5">
          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-3">Deskripsi Pekerjaan</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-3">Kualifikasi</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-3">Skill yang Dibutuhkan</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((sk) => (
                <span key={sk} className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-700 rounded-full">{sk}</span>
              ))}
            </div>
          </div>

          {/* Tahapan Seleksi */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-3">Tahapan Seleksi</h2>
            <div className="flex items-center gap-2">
              {job.stage.map((s, i) => (
                <React.Fragment key={s}>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">{i + 1}</div>
                    <p className="text-[11px] text-slate-500 mt-1 text-center max-w-16 leading-tight">{s}</p>
                  </div>
                  {i < job.stage.length - 1 && <div className="flex-1 h-0.5 bg-indigo-100 mb-4" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Match Score */}
        <div className="space-y-4">
          {/* Score Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 text-center">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Kecocokan Profilmu</p>
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${scoreBg} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
              <span className="text-2xl font-extrabold text-white">{job.matchScore}</span>
            </div>
            <p className={`font-bold text-lg ${scoreColor}`}>
              {job.matchScore >= 85 ? 'Sangat Cocok!' : job.matchScore >= 70 ? 'Cukup Cocok' : 'Kurang Cocok'}
            </p>
            <p className="text-xs text-slate-500 mt-1">dari 100% kecocokan maksimal</p>
          </div>

          {/* Match Detail */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 mb-3 text-sm">Detail Kecocokan</h3>
            <div className="space-y-2 mb-4">
              <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">Skill Cocok</p>
              {job.matchedSkills.map((sk) => (
                <div key={sk} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                  {sk}
                </div>
              ))}
            </div>
            {job.gapSkills.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wide">Perlu Ditingkatkan</p>
                {job.gapSkills.map((sk) => (
                  <div key={sk} className="flex items-center gap-2 text-sm text-slate-600">
                    <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
                    {sk}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setApplied(true)}
            disabled={applied}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              applied
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200'
            }`}
          >
            {applied ? <><CheckCircle2 size={16} /> Sudah Dilamar</> : <><Zap size={16} /> Lamar Sekarang</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
