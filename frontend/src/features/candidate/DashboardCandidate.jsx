import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  mockCurrentUser, mockJobs, mockApplications, mockInterviews, mockGapSkillReport
} from '../../data/mockData';
import {
  ArrowRight, Briefcase, ClipboardList, Video, BarChart3,
  ChevronRight, AlertCircle, CheckCircle2, Clock, TrendingUp, Star
} from 'lucide-react';

const ScoreRing = ({ score, size = 80 }) => {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={6} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#6366f1" strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
    </svg>
  );
};

const statusConfig = {
  'Tes Online': { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: ClipboardList },
  'Wawancara': { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Video },
  'Shortlist': { color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: CheckCircle2 },
  'Ditolak': { color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle },
  'Diterima': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
};

const DashboardCandidate = () => {
  const { user } = useContext(AuthContext);
  const displayName = user?.name || mockCurrentUser.name;
  const firstName = displayName.split(' ')[0];
  const profile = mockCurrentUser;
  const topJobs = mockJobs.slice(0, 3);
  const activeApps = mockApplications.slice(0, 3);
  const upcomingInterview = mockInterviews[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Selamat datang, {firstName}! 👋</h1>
        <p className="text-slate-500 text-sm mt-1">Pantau perkembangan kariermu hari ini.</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Kelengkapan Profil', value: `${profile.profileCompletion}%`, icon: TrendingUp, color: 'indigo', link: '/candidate/profile' },
          { label: 'Skor Kesiapan Kerja', value: `${profile.readinessScore}%`, icon: Star, color: 'amber', link: '/candidate/gap-analysis' },
          { label: 'Lamaran Aktif', value: mockApplications.length, icon: Briefcase, color: 'blue', link: '/candidate/applications' },
          { label: 'Tes Belum Dikerjakan', value: '1', icon: ClipboardList, color: 'rose', link: '/candidate/tests' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} to={s.link}
              className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all group">
              <div className={`w-9 h-9 rounded-xl bg-${s.color}-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                <Icon size={17} className={`text-${s.color}-600`} />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{s.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completion Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 flex flex-col items-center text-center">
          <div className="relative mb-3">
            <ScoreRing score={profile.profileCompletion} size={88} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-extrabold text-indigo-700">{profile.profileCompletion}%</span>
            </div>
          </div>
          <p className="font-semibold text-slate-900 text-sm">Kelengkapan Profil</p>
          <p className="text-slate-500 text-xs mt-1 mb-4">Lengkapi profil untuk meningkatkan peluang</p>
          <div className="w-full space-y-1.5">
            {[
              { label: 'Data Diri', done: true },
              { label: 'Pendidikan', done: true },
              { label: 'Pengalaman', done: true },
              { label: 'Skill', done: true },
              { label: 'Foto Profil', done: false },
              { label: 'Preferensi Kerja', done: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-left">
                {item.done
                  ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                  : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 flex-shrink-0" />}
                <span className={`text-xs ${item.done ? 'text-slate-600' : 'text-slate-400'}`}>{item.label}</span>
              </div>
            ))}
          </div>
          <Link to="/candidate/profile" className="mt-4 w-full text-center text-xs font-semibold text-indigo-600 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors">
            Lengkapi Profil
          </Link>
        </div>

        {/* Recommended Jobs */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Rekomendasi Untukmu</h2>
            <Link to="/candidate/jobs" className="text-xs text-indigo-600 font-medium flex items-center gap-1 hover:underline">
              Lihat semua <ChevronRight size={13} />
            </Link>
          </div>
          <div className="space-y-3">
            {topJobs.map((job) => (
              <Link key={job.id} to={`/candidate/jobs/${job.id}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center flex-shrink-0 font-bold text-indigo-600 text-sm">
                  {job.company.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{job.title}</p>
                  <p className="text-xs text-slate-500 truncate">{job.company} · {job.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${job.matchScore >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {job.matchScore}%
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">cocok</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Applications */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Status Lamaran</h2>
            <Link to="/candidate/applications" className="text-xs text-indigo-600 font-medium flex items-center gap-1 hover:underline">
              Semua <ChevronRight size={13} />
            </Link>
          </div>
          <div className="space-y-2.5">
            {activeApps.map((app) => {
              const cfg = statusConfig[app.status] || { color: 'bg-slate-50 text-slate-600 border-slate-200' };
              return (
                <div key={app.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{app.jobTitle}</p>
                    <p className="text-xs text-slate-500 truncate">{app.company}</p>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${cfg.color} flex-shrink-0`}>
                    {app.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Interview */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Wawancara Mendatang</h2>
            <Link to="/candidate/interviews" className="text-xs text-indigo-600 font-medium flex items-center gap-1 hover:underline">
              Semua <ChevronRight size={13} />
            </Link>
          </div>
          {upcomingInterview ? (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Video size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{upcomingInterview.jobTitle}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{upcomingInterview.company}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Clock size={13} className="text-blue-500" />
                    <span className="text-xs font-medium text-blue-700">
                      {upcomingInterview.date}, {upcomingInterview.time}
                    </span>
                  </div>
                  {upcomingInterview.notes && (
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{upcomingInterview.notes}</p>
                  )}
                </div>
              </div>
              <a href={upcomingInterview.meetLink} target="_blank" rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-1.5 bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                Masuk Interview <ArrowRight size={13} />
              </a>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Video size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Belum ada wawancara terjadwal</p>
            </div>
          )}
        </div>
      </div>

      {/* Gap Skill Teaser */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-2xl p-5 text-white flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={16} className="text-indigo-300" />
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">Gap Skill Report</span>
          </div>
          <p className="font-bold text-lg">Skor Kesiapan Kerjamu: {profile.readinessScore}%</p>
          <p className="text-indigo-200 text-sm mt-1">Ada {mockGapSkillReport.gapSkills.length} skill yang perlu ditingkatkan untuk {mockGapSkillReport.targetRole}.</p>
        </div>
        <Link to="/candidate/gap-analysis"
          className="flex-shrink-0 bg-white text-indigo-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-1.5">
          Lihat Detail <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default DashboardCandidate;
