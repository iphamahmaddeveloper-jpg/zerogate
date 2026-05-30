import React from 'react';
import { X, Sparkles, AlertCircle, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

const MatchModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  // Render progress bar color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500 bg-emerald-500';
    if (score >= 60) return 'text-amber-500 bg-amber-500';
    return 'text-rose-500 bg-rose-500';
  };

  const scoreTextColor = getScoreColor(job.score).split(' ')[0];
  const scoreBgColor = getScoreColor(job.score).split(' ')[1];

  // Dummy logic for Skill Gap Analysis (for Hackathon visual)
  // In a real app, this data would come structured from the backend.
  const missingSkillsArray = job.gap !== "Tidak ada" ? job.gap.split(',').map(s => s.trim()) : [];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Analisis Kecocokan AI</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Overview & Gauge */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
            {/* Circular Gauge / Progress indicator */}
            <div className="relative flex shrink-0 items-center justify-center w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" stroke="currentColor" strokeWidth="8" 
                  className="text-slate-100" 
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" stroke="currentColor" strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 45}`} 
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - job.score / 100)}`}
                  className={`${scoreTextColor} transition-all duration-1000 ease-out`} 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className={`text-4xl font-black ${scoreTextColor}`}>{job.score}%</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Match</span>
              </div>
            </div>

            {/* Job Summary */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">{job.title}</h3>
              <p className="text-slate-500 font-medium mb-4">Perusahaan #{job.company_id} • Full-time</p>
              
              <div className={`inline-flex px-4 py-2 rounded-xl text-sm font-semibold border ${
                job.score >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                job.score >= 60 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {job.score >= 80 ? 'Kandidat Sangat Direkomendasikan 🔥' :
                 job.score >= 60 ? 'Memenuhi Syarat Minimum 👍' : 
                 'Butuh Peningkatan Skill 📚'}
              </div>
            </div>
          </div>

          {/* Section 2: Skill Gap Analysis Table */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-500" /> Komparasi Keahlian
            </h4>
            
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Keahlian Dibutuhkan</th>
                    <th className="px-6 py-4 font-bold text-center">Status Anda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Contoh baris terpenuhi */}
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-700">Keahlian Relevan Terdeteksi</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100/50 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ada
                      </span>
                    </td>
                  </tr>
                  {/* Looping missing skills */}
                  {missingSkillsArray.length > 0 ? (
                    missingSkillsArray.map((skill, idx) => (
                      <tr key={idx} className="bg-rose-50/20">
                        <td className="px-6 py-4 font-medium text-slate-700">{skill}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100/50 text-rose-700">
                            <XCircle className="w-3.5 h-3.5" /> Kurang
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-center text-slate-500 italic">Semua kebutuhan dasar tampaknya terpenuhi!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: LLM AI Tips Box */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 relative overflow-hidden">
            {/* Background decoration */}
            <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-600/5 rotate-12" />
            
            <div className="relative z-10">
              <h4 className="text-sm font-black text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Pesan LLM Advisor
              </h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                Berdasarkan analisis semantik terhadap profil Anda, Anda memiliki peluang yang baik. Namun, untuk posisi <strong>{job.title}</strong>, kandidat dengan keahlian <em>{missingSkillsArray.length > 0 ? missingSkillsArray[0] : 'tambahan sesuai deskripsi'}</em> sering kali lebih diutamakan. 
                <br/><br/>
                <strong>Tips:</strong> Tonjolkan proyek-proyek masa lalu Anda yang membuktikan kemampuan Anda beradaptasi cepat dengan teknologi baru pada sesi wawancara.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Tutup
          </button>
          <button 
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-md flex items-center gap-2 transition-colors"
            onClick={() => alert("Mengirimkan lamaran...")}
          >
            Lamar Posisi Ini <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
