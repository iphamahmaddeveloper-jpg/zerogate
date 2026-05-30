import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCandidates } from '../../data/mockData';
import {
  ArrowLeft, MapPin, Briefcase, BookOpen, Star, CheckCircle2,
  AlertCircle, ClipboardList, Video, Save, UserCheck, UserX,
  Bookmark, MessageSquare
} from 'lucide-react';

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidate = mockCandidates.find(c => c.id === parseInt(id));
  const [status, setStatus] = useState(candidate?.status || 'Review');
  const [note, setNote] = useState(candidate?.interviewNote || '');
  const [noteSaved, setNoteSaved] = useState(false);

  const saveNote = () => { setNoteSaved(true); setTimeout(() => setNoteSaved(false), 2000); };

  if (!candidate) return (
    <div className="text-center py-20 text-slate-400">
      <p>Kandidat tidak ditemukan.</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 text-sm hover:underline">← Kembali</button>
    </div>
  );

  const scoreColor = candidate.matchScore >= 90 ? 'from-emerald-500 to-teal-500'
    : candidate.matchScore >= 75 ? 'from-amber-500 to-orange-500'
    : 'from-slate-400 to-slate-500';

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors">
        <ArrowLeft size={16} /> Kembali ke Daftar Kandidat
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0">
                {candidate.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-extrabold text-slate-900">{candidate.name}</h1>
                <p className="text-slate-500 text-sm mt-0.5">{candidate.email}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={12} />{candidate.location}</span>
                  <span className="flex items-center gap-1"><Briefcase size={12} />{candidate.experience} pengalaman</span>
                </div>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{candidate.summary}</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-indigo-600" /> Pengalaman Kerja
            </h2>
            <div className="space-y-4">
              {candidate.experience_history?.map((exp, i) => (
                <div key={i} className="border-l-2 border-indigo-100 pl-4">
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

          {/* Education */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-indigo-600" /> Pendidikan
            </h2>
            {candidate.education_history?.map((edu, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{edu.degree}</p>
                  <p className="text-xs text-slate-500">{edu.school}</p>
                </div>
                <span className="text-xs text-slate-400">{edu.year}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Star size={16} className="text-indigo-600" /> Skill
            </h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills?.map(sk => (
                <span key={sk} className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full">{sk}</span>
              ))}
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
              <ClipboardList size={16} className="text-indigo-600" /> Hasil Tes Online
            </h2>
            {candidate.testStatus === 'Selesai' ? (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-extrabold text-emerald-600">{candidate.testScore}</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Skor: {candidate.testScore}/100</p>
                  <p className="text-sm text-emerald-600 font-semibold">Selesai</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />
                <p className="text-sm font-semibold text-amber-800">Tes {candidate.testStatus}</p>
              </div>
            )}
          </div>

          {/* Interview Notes */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
              <MessageSquare size={16} className="text-indigo-600" /> Catatan Wawancara
            </h2>
            <textarea rows={4} value={note} onChange={e => setNote(e.target.value)}
              placeholder="Tambahkan catatan dari sesi wawancara..."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition mb-3" />
            <button onClick={saveNote}
              className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${noteSaved ? 'bg-emerald-500 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {noteSaved ? <><CheckCircle2 size={14} /> Tersimpan</> : <><Save size={14} /> Simpan</>}
            </button>
          </div>
        </div>

        {/* RIGHT: Score + Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 text-center">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Skor Kecocokan AI</p>
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${scoreColor} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
              <span className="text-2xl font-extrabold text-white">{candidate.matchScore}</span>
            </div>
            <p className="font-bold text-slate-900">
              {candidate.matchScore >= 90 ? 'Sangat Cocok' : candidate.matchScore >= 75 ? 'Cukup Cocok' : 'Kurang Cocok'}
            </p>
            <div className="mt-4 space-y-1.5 text-left">
              <p className="text-[11px] font-semibold text-emerald-600 uppercase">Skill Cocok</p>
              {candidate.matchedSkills.map(sk => (
                <div key={sk} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" /> {sk}
                </div>
              ))}
              {candidate.gapSkills.length > 0 && (
                <>
                  <p className="text-[11px] font-semibold text-amber-600 uppercase pt-1">Gap Skill</p>
                  {candidate.gapSkills.map(sk => (
                    <div key={sk} className="flex items-center gap-2 text-xs text-slate-600">
                      <AlertCircle size={12} className="text-amber-500 flex-shrink-0" /> {sk}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <p className="text-sm font-bold text-slate-900 mb-2">Status Kandidat</p>
            <select value={status} onChange={e => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              {['Review', 'Shortlist', 'Tes', 'Interview', 'Diterima', 'Ditolak'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-2.5">
            <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
              <UserCheck size={16} /> Shortlist
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-amber-200 bg-amber-50 text-amber-700 font-semibold py-3 rounded-xl hover:bg-amber-100 transition-colors text-sm">
              <ClipboardList size={16} /> Kirim Tes
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-blue-200 bg-blue-50 text-blue-700 font-semibold py-3 rounded-xl hover:bg-blue-100 transition-colors text-sm">
              <Video size={16} /> Jadwalkan Interview
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
              <Bookmark size={16} /> Simpan
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-red-200 bg-red-50 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-100 transition-colors text-sm">
              <UserX size={16} /> Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
