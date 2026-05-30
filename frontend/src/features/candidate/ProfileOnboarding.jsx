import React, { useState } from 'react';
import { mockCandidateProfile } from '../../data/mockData';
import { CheckCircle2, User, BookOpen, Briefcase, Star, MapPin, ChevronRight, ChevronLeft, Save } from 'lucide-react';

const steps = [
  { id: 1, label: 'Data Diri', icon: User },
  { id: 2, label: 'Pendidikan', icon: BookOpen },
  { id: 3, label: 'Pengalaman', icon: Briefcase },
  { id: 4, label: 'Skill', icon: Star },
  { id: 5, label: 'Preferensi', icon: MapPin },
];

const ProfileOnboarding = () => {
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState(mockCandidateProfile);

  const completion = Math.round((step / steps.length) * 100);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Profil Saya</h1>
        <p className="text-slate-500 text-sm mt-1">Lengkapi profilmu agar perekrut dapat menemukanmu lebih mudah.</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-slate-700">Kelengkapan Profil</p>
          <span className="text-sm font-bold text-indigo-600">{completion}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
          <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${completion}%` }} />
        </div>
        {/* Step indicators */}
        <div className="flex items-center justify-between">
          {steps.map((s) => {
            const Icon = s.icon;
            const done = s.id < step;
            const active = s.id === step;
            return (
              <button key={s.id} onClick={() => setStep(s.id)}
                className={`flex flex-col items-center gap-1.5 group transition-all`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${done ? 'bg-emerald-500' : active ? 'bg-indigo-600' : 'bg-slate-100'}`}>
                  {done ? <CheckCircle2 size={17} className="text-white" /> : <Icon size={17} className={active ? 'text-white' : 'text-slate-400'} />}
                </div>
                <span className={`text-[11px] font-medium hidden sm:block ${active ? 'text-indigo-700' : done ? 'text-emerald-600' : 'text-slate-400'}`}>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        {step === 1 && (
          <div>
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><User size={18} className="text-indigo-600" /> Data Diri</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Nama Lengkap', key: 'name', type: 'text', span: 2 },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'No. Telepon', key: 'phone', type: 'text' },
                { label: 'Kota / Domisili', key: 'location', type: 'text' },
                { label: 'LinkedIn', key: 'linkedin', type: 'text' },
                { label: 'Portfolio / Website', key: 'portfolio', type: 'text' },
              ].map((f) => (
                <div key={f.key} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{f.label}</label>
                  <input type={f.type} value={profile[f.key] || ''}
                    onChange={(e) => setProfile({ ...profile, [f.key]: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ringkasan Profil</label>
                <textarea rows={4} value={profile.summary || ''}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><BookOpen size={18} className="text-indigo-600" /> Riwayat Pendidikan</h2>
            {profile.education.map((edu, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 mb-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Gelar / Program Studi', key: 'degree' },
                    { label: 'Institusi', key: 'school' },
                    { label: 'Tahun', key: 'year' },
                    { label: 'IPK', key: 'gpa' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-medium text-slate-600 mb-1">{f.label}</label>
                      <input value={edu[f.key] || ''}
                        onChange={(e) => {
                          const upd = [...profile.education];
                          upd[i] = { ...upd[i], [f.key]: e.target.value };
                          setProfile({ ...profile, education: upd });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setProfile({ ...profile, education: [...profile.education, { degree: '', school: '', year: '', gpa: '' }] })}
              className="text-sm text-indigo-600 font-semibold hover:underline">+ Tambah Pendidikan</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Briefcase size={18} className="text-indigo-600" /> Pengalaman Kerja</h2>
            {profile.experience.map((exp, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4 mb-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Posisi / Jabatan', key: 'role' },
                    { label: 'Perusahaan', key: 'company' },
                    { label: 'Periode', key: 'period', span: 2 },
                  ].map((f) => (
                    <div key={f.key} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-medium text-slate-600 mb-1">{f.label}</label>
                      <input value={exp[f.key] || ''}
                        onChange={(e) => {
                          const upd = [...profile.experience];
                          upd[i] = { ...upd[i], [f.key]: e.target.value };
                          setProfile({ ...profile, experience: upd });
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Deskripsi</label>
                    <textarea rows={3} value={exp.desc || ''}
                      onChange={(e) => {
                        const upd = [...profile.experience];
                        upd[i] = { ...upd[i], desc: e.target.value };
                        setProfile({ ...profile, experience: upd });
                      }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => setProfile({ ...profile, experience: [...profile.experience, { role: '', company: '', period: '', desc: '' }] })}
              className="text-sm text-indigo-600 font-semibold hover:underline">+ Tambah Pengalaman</button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Star size={18} className="text-indigo-600" /> Skill & Kompetensi</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((sk, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full">
                  {sk}
                  <button onClick={() => setProfile({ ...profile, skills: profile.skills.filter((_, j) => j !== i) })}
                    className="text-indigo-400 hover:text-indigo-700 font-bold ml-0.5">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input id="skill-input" placeholder="Tambah skill baru..." onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  setProfile({ ...profile, skills: [...profile.skills, e.target.value.trim()] });
                  e.target.value = '';
                }
              }} className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">Tambah</button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Tekan Enter untuk menambah skill</p>

            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700 mb-3">Sertifikasi</label>
              <div className="space-y-2">
                {profile.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700 flex-1">{cert}</span>
                    <button onClick={() => setProfile({ ...profile, certifications: profile.certifications.filter((_, j) => j !== i) })}
                      className="text-slate-300 hover:text-red-500 text-lg leading-none">×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><MapPin size={18} className="text-indigo-600" /> Preferensi Kerja</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tipe Pekerjaan</label>
                <select value={profile.workPreference.type}
                  onChange={(e) => setProfile({ ...profile, workPreference: { ...profile.workPreference, type: e.target.value } })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  {['Full-time', 'Part-time', 'Freelance', 'Internship'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mode Kerja</label>
                <select value={profile.workPreference.remote}
                  onChange={(e) => setProfile({ ...profile, workPreference: { ...profile.workPreference, remote: e.target.value } })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  {['Onsite', 'Remote (WFH)', 'Hybrid (WFH 3x seminggu)', 'Fleksibel'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferensi Lokasi</label>
                <input value={profile.workPreference.location}
                  onChange={(e) => setProfile({ ...profile, workPreference: { ...profile.workPreference, location: e.target.value } })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ekspektasi Gaji (Rp/bulan)</label>
                <input type="number" value={profile.workPreference.salaryMin}
                  onChange={(e) => setProfile({ ...profile, workPreference: { ...profile.workPreference, salaryMin: Number(e.target.value) } })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
          className="flex items-center gap-1.5 px-5 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 disabled:opacity-40 transition-colors">
          <ChevronLeft size={16} /> Sebelumnya
        </button>

        <button onClick={handleSave}
          className={`flex items-center gap-1.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${saved ? 'bg-emerald-500 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
          {saved ? <><CheckCircle2 size={15} /> Tersimpan!</> : <><Save size={15} /> Simpan</>}
        </button>

        {step < steps.length ? (
          <button onClick={() => setStep(s => Math.min(steps.length, s + 1))}
            className="flex items-center gap-1.5 px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Selanjutnya <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors">
            <CheckCircle2 size={15} /> Selesai & Simpan
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileOnboarding;
