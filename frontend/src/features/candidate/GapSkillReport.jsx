import React from 'react';
import { mockGapSkillReport } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { BarChart3, CheckCircle2, AlertCircle, TrendingUp, BookOpen, ExternalLink, Target, ArrowRight } from 'lucide-react';

const SkillBar = ({ name, level, targetLevel, category, showTarget }) => (
  <div className="group">
    <div className="flex items-center justify-between mb-1.5">
      <div>
        <span className="text-sm font-semibold text-slate-800">{name}</span>
        <span className="ml-2 text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{category}</span>
      </div>
      <span className="text-sm font-bold text-slate-700">{level}%</span>
    </div>
    <div className="relative w-full bg-slate-100 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full transition-all ${level >= 80 ? 'bg-emerald-500' : level >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
        style={{ width: `${level}%` }}
      />
      {showTarget && targetLevel && (
        <div
          className="absolute top-0 h-2.5 w-0.5 bg-indigo-500 rounded-full"
          style={{ left: `${targetLevel}%` }}
          title={`Target: ${targetLevel}%`}
        />
      )}
    </div>
    {showTarget && targetLevel && (
      <p className="text-[11px] text-slate-400 mt-1">Target: <span className="text-indigo-600 font-semibold">{targetLevel}%</span></p>
    )}
  </div>
);

const GapSkillReport = () => {
  const r = mockGapSkillReport;
  const scoreColor = r.overallReadiness >= 80 ? 'text-emerald-600' : r.overallReadiness >= 60 ? 'text-amber-600' : 'text-rose-600';
  const scoreBg = r.overallReadiness >= 80 ? 'from-emerald-500 to-teal-500' : 'from-amber-500 to-orange-500';

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Gap Skill Report</h1>
        <p className="text-slate-500 text-sm mt-1">Analisis kesiapan kerjamu dan rekomendasi pengembangan kompetensi.</p>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="transform -rotate-90" width="96" height="96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
              <circle cx="48" cy="48" r="40" fill="none" stroke="white" strokeWidth="8"
                strokeDasharray={`${(r.overallReadiness / 100) * 251.2} 251.2`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-extrabold">{r.overallReadiness}</span>
            </div>
          </div>
          <div>
            <p className="text-indigo-200 text-sm uppercase tracking-wide font-semibold mb-1">Skor Kesiapan Kerja</p>
            <p className="text-3xl font-extrabold">{r.overallReadiness}%</p>
            <p className="text-indigo-200 text-sm mt-2">
              Target Role: <span className="text-white font-semibold">{r.targetRole}</span>
            </p>
            <p className="text-indigo-200 text-sm mt-1">
              {r.gapSkills.length} skill perlu ditingkatkan · {r.strongSkills.length} skill sudah kuat
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Strong Skills */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <h2 className="font-bold text-slate-900">Skill Sudah Kuat</h2>
          </div>
          <div className="space-y-4">
            {r.strongSkills.map((sk) => (
              <SkillBar key={sk.name} {...sk} showTarget={false} />
            ))}
          </div>
        </div>

        {/* Gap Skills */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertCircle size={16} className="text-amber-600" />
            </div>
            <h2 className="font-bold text-slate-900">Skill Perlu Ditingkatkan</h2>
          </div>
          <div className="space-y-5">
            {r.gapSkills.map((sk) => (
              <div key={sk.name}>
                <SkillBar {...sk} showTarget={true} />
                <div className="flex items-center justify-between mt-1.5">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    sk.priority === 'Tinggi' ? 'bg-rose-50 text-rose-600'
                    : sk.priority === 'Sedang' ? 'bg-amber-50 text-amber-600'
                    : 'bg-slate-50 text-slate-500'
                  }`}>Prioritas {sk.priority}</span>
                  <p className="text-[11px] text-slate-400">{sk.resource.split(',')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
            <BookOpen size={16} className="text-indigo-600" />
          </div>
          <h2 className="font-bold text-slate-900">Rekomendasi Pelatihan</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {r.recommendations.map((rec) => (
            <div key={rec.title} className="border border-slate-100 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{rec.platform}</span>
                {rec.free && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Gratis</span>}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1">{rec.title}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{rec.duration}</span>
                <span>·</span>
                <span className="text-amber-500 font-bold">★ {rec.rating}</span>
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-semibold text-indigo-600 border border-indigo-200 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                Pelajari <ExternalLink size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-bold text-slate-900">Lihat Lowongan yang Lebih Sesuai</p>
          <p className="text-sm text-slate-500 mt-0.5">AI akan menyaring lowongan berdasarkan gap skill terkinimu.</p>
        </div>
        <Link to="/candidate/jobs" className="flex-shrink-0 flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
          Lihat Lowongan <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default GapSkillReport;
