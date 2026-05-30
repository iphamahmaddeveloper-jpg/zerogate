import React, { useState } from 'react';
import { mockCandidateProfile } from '../../data/mockData';
import { Download, FileText, Sparkles, Save, CheckCircle2, Wand2 } from 'lucide-react';

const CVPreview = ({ profile }) => (
  <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 text-sm font-sans leading-relaxed h-full overflow-y-auto">
    {/* CV Header */}
    <div className="border-b-2 border-indigo-600 pb-4 mb-4">
      <h1 className="text-2xl font-extrabold text-slate-900">{profile.name}</h1>
      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-slate-500">
        <span>{profile.email}</span>
        <span>·</span>
        <span>{profile.phone}</span>
        <span>·</span>
        <span>{profile.location}</span>
        {profile.portfolio && <><span>·</span><span className="text-indigo-600">{profile.portfolio}</span></>}
      </div>
    </div>

    {/* Summary */}
    {profile.summary && (
      <div className="mb-4">
        <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Ringkasan Profil</h2>
        <p className="text-slate-700 text-xs leading-relaxed">{profile.summary}</p>
      </div>
    )}

    {/* Experience */}
    {profile.experience?.length > 0 && (
      <div className="mb-4">
        <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Pengalaman Kerja</h2>
        <div className="space-y-3">
          {profile.experience.map((exp, i) => (
            <div key={i} className="border-l-2 border-indigo-100 pl-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{exp.role}</p>
                  <p className="text-indigo-600 text-xs font-medium">{exp.company}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{exp.period}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {profile.education?.length > 0 && (
      <div className="mb-4">
        <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Pendidikan</h2>
        {profile.education.map((edu, i) => (
          <div key={i} className="flex items-start justify-between">
            <div>
              <p className="font-bold text-slate-900 text-sm">{edu.degree}</p>
              <p className="text-xs text-slate-500">{edu.school}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-xs text-slate-400">{edu.year}</p>
              {edu.gpa && <p className="text-xs font-semibold text-indigo-600">IPK {edu.gpa}</p>}
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {profile.skills?.length > 0 && (
      <div className="mb-4">
        <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Skill</h2>
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((sk) => (
            <span key={sk} className="text-[11px] font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100">{sk}</span>
          ))}
        </div>
      </div>
    )}

    {/* Certifications */}
    {profile.certifications?.length > 0 && (
      <div>
        <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Sertifikasi</h2>
        <ul className="space-y-1">
          {profile.certifications.map((c) => (
            <li key={c} className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" /> {c}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const aiSuggestions = [
  { field: 'summary', original: 'Frontend developer berpengalaman...', suggestion: 'Tambahkan angka konkret seperti "meningkatkan performa 30%" untuk memperkuat profil.' },
  { field: 'experience', original: 'Membangun dashboard analytics...', suggestion: 'Gunakan kata kerja aktif: "Memimpin pengembangan dashboard yang diakses 10.000+ pengguna aktif."' },
];

const CVGenerator = () => {
  const [profile, setProfile] = useState(mockCandidateProfile);
  const [showAI, setShowAI] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">CV Generator</h1>
          <p className="text-slate-500 text-sm mt-1">Edit di sisi kiri, lihat preview di sisi kanan secara langsung.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setShowAI(!showAI)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-violet-50 border border-violet-200 text-violet-700 rounded-xl text-sm font-semibold hover:bg-violet-100 transition-colors">
            <Wand2 size={15} /> Saran AI
          </button>
          <button onClick={handleSave}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${saved ? 'bg-emerald-500 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {saved ? <><CheckCircle2 size={15} /> Tersimpan</> : <><Save size={15} /> Simpan</>}
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            <Download size={15} /> Unduh CV
          </button>
        </div>
      </div>

      {/* AI Suggestions Banner */}
      {showAI && (
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 mb-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-violet-600" />
            <p className="font-bold text-violet-900 text-sm">Saran Peningkatan CV dari AI</p>
          </div>
          <div className="space-y-3">
            {aiSuggestions.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-violet-100">
                <p className="text-xs font-semibold text-violet-700 mb-1 capitalize">{s.field}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{s.suggestion}</p>
                <button className="mt-2 text-xs font-semibold text-violet-600 hover:underline">Terapkan Saran</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Editor */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-5 overflow-y-auto max-h-screen">
          <div className="flex items-center gap-2 mb-1">
            <FileText size={16} className="text-indigo-600" />
            <h2 className="font-bold text-slate-900">Edit CV</h2>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ringkasan Profil</label>
            <textarea rows={4} value={profile.summary}
              onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition" />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Pengalaman Kerja</label>
            {profile.experience.map((exp, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 mb-3 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-500">Posisi</label>
                    <input value={exp.role} onChange={(e) => {
                      const u = [...profile.experience]; u[i] = { ...u[i], role: e.target.value };
                      setProfile({ ...profile, experience: u });
                    }} className="w-full mt-0.5 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Perusahaan</label>
                    <input value={exp.company} onChange={(e) => {
                      const u = [...profile.experience]; u[i] = { ...u[i], company: e.target.value };
                      setProfile({ ...profile, experience: u });
                    }} className="w-full mt-0.5 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Periode</label>
                  <input value={exp.period} onChange={(e) => {
                    const u = [...profile.experience]; u[i] = { ...u[i], period: e.target.value };
                    setProfile({ ...profile, experience: u });
                  }} className="w-full mt-0.5 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-500">Deskripsi</label>
                  <textarea rows={3} value={exp.desc} onChange={(e) => {
                    const u = [...profile.experience]; u[i] = { ...u[i], desc: e.target.value };
                    setProfile({ ...profile, experience: u });
                  }} className="w-full mt-0.5 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Skill</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.skills.map((sk, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  {sk}
                  <button onClick={() => setProfile({ ...profile, skills: profile.skills.filter((_, j) => j !== i) })}
                    className="text-indigo-400 hover:text-indigo-700 font-bold">×</button>
                </span>
              ))}
            </div>
            <input placeholder="Tambah skill (Enter)..." onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                setProfile({ ...profile, skills: [...profile.skills, e.target.value.trim()] });
                e.target.value = '';
              }
            }} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
          </div>
        </div>

        {/* CV Preview */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-slate-500" />
            <p className="text-sm font-semibold text-slate-600">Preview CV</p>
          </div>
          <CVPreview profile={profile} />
          <button className="mt-3 w-full flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors">
            <FileText size={15} /> Gunakan untuk Melamar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;
