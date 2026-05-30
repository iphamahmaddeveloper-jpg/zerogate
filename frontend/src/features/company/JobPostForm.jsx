import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus, X, ArrowLeft, Save, Send } from 'lucide-react';

const stages = ['Screening AI', 'Tes Online', 'Wawancara Online'];

const JobPostForm = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-time',
    experience: '1+ tahun',
    salary: '',
    requiredSkills: [],
    optionalSkills: [],
    stages: ['Screening AI'],
  });
  const [skillInput, setSkillInput] = useState('');
  const [optSkillInput, setOptSkillInput] = useState('');

  const addSkill = (type) => {
    const val = type === 'req' ? skillInput.trim() : optSkillInput.trim();
    if (!val) return;
    if (type === 'req') { setForm({ ...form, requiredSkills: [...form.requiredSkills, val] }); setSkillInput(''); }
    else { setForm({ ...form, optionalSkills: [...form.optionalSkills, val] }); setOptSkillInput(''); }
  };

  const removeSkill = (type, i) => {
    if (type === 'req') setForm({ ...form, requiredSkills: form.requiredSkills.filter((_, j) => j !== i) });
    else setForm({ ...form, optionalSkills: form.optionalSkills.filter((_, j) => j !== i) });
  };

  const toggleStage = (s) => {
    if (s === 'Screening AI') return; // always required
    const exists = form.stages.includes(s);
    setForm({ ...form, stages: exists ? form.stages.filter(x => x !== s) : [...form.stages, s] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="max-w-md mx-auto text-center animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-100 p-8">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Lowongan Berhasil Diposting!</h2>
        <p className="text-slate-500 text-sm mb-6">AI kami akan mulai mencocokkan kandidat dengan lowongan <strong>{form.title}</strong> secara otomatis.</p>
        <div className="space-y-2">
          <button onClick={() => navigate('/company/candidates')}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
            Lihat Kandidat
          </button>
          <button onClick={() => { setSubmitted(false); setForm({ title: '', description: '', location: '', type: 'Full-time', experience: '1+ tahun', salary: '', requiredSkills: [], optionalSkills: [], stages: ['Screening AI'] }); }}
            className="w-full border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
            Buat Lowongan Baru
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors">
        <ArrowLeft size={16} /> Kembali
      </button>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Posting Lowongan Baru</h1>
        <p className="text-slate-500 text-sm mt-1">Isi detail lowongan agar AI dapat mencocokkan kandidat terbaik untukmu.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-500">Informasi Dasar</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Posisi <span className="text-rose-500">*</span></label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="cth: Frontend Developer, Data Analyst"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Pekerjaan <span className="text-rose-500">*</span></label>
            <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Jelaskan tanggung jawab, lingkungan kerja, dan nilai yang ditawarkan perusahaan..."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Lokasi</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="cth: Jakarta Selatan / Remote"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tipe Pekerjaan</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition">
                {['Full-time', 'Part-time', 'Freelance', 'Internship'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Pengalaman Minimum</label>
              <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition">
                {['Fresh Graduate', '1+ tahun', '2+ tahun', '3+ tahun', '5+ tahun'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Rentang Gaji</label>
              <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })}
                placeholder="cth: Rp 8-14 juta/bulan"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-500">Skill yang Dibutuhkan</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Skill Wajib</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.requiredSkills.map((sk, i) => (
                <span key={i} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  {sk} <button type="button" onClick={() => removeSkill('req', i)} className="text-indigo-400 hover:text-indigo-700 font-bold"><X size={11} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill('req'); }}}
                placeholder="Tambah skill wajib (Enter)"
                className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              <button type="button" onClick={() => addSkill('req')}
                className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
                <Plus size={15} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Skill Tambahan (Opsional)</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {form.optionalSkills.map((sk, i) => (
                <span key={i} className="flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  {sk} <button type="button" onClick={() => removeSkill('opt', i)} className="text-slate-400 hover:text-slate-700"><X size={11} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={optSkillInput} onChange={(e) => setOptSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill('opt'); }}}
                placeholder="Tambah skill tambahan"
                className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              <button type="button" onClick={() => addSkill('opt')}
                className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors">
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Selection Stages */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <h2 className="font-bold text-slate-500 text-sm uppercase tracking-wider mb-4">Tahapan Seleksi</h2>
          <div className="space-y-2.5">
            {stages.map((s, i) => {
              const checked = form.stages.includes(s);
              const required = s === 'Screening AI';
              return (
                <button key={s} type="button" onClick={() => toggleStage(s)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${checked ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${checked ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'}`}>
                    {checked && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${checked ? 'text-indigo-900' : 'text-slate-700'}`}>{i + 1}. {s}</p>
                    {required && <p className="text-[11px] text-indigo-500">Wajib diaktifkan</p>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button"
            className="flex items-center gap-1.5 px-5 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
            <Save size={15} /> Simpan Draft
          </button>
          <button type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm shadow-sm shadow-indigo-200">
            <Send size={15} /> Posting Lowongan
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
