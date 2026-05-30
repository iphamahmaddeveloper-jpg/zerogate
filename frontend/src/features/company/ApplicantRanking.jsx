import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { 
  X, Star, UserCircle, CheckCircle2, ChevronRight, 
  FileText, Award, Briefcase, GraduationCap, ArrowLeft, 
  Sparkles, Mail, Phone, Download
} from 'lucide-react';

const ApplicantRanking = ({ job, onClose }) => {
  const { token } = useContext(AuthContext);
  
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    if (job) {
      fetchCandidates();
    }
  }, [job]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/jobs/${job.id}/candidates`, axiosConfig);
      
      // Mencegah duplikasi ID pelamar dan mengurutkan berdasarkan skor tertinggi
      const uniqueCandidates = Array.from(new Set(res.data.map(a => a.id)))
        .map(id => {
          return res.data.find(a => a.id === id)
        })
        .sort((a, b) => b.score - a.score);

      setCandidates(uniqueCandidates);
    } catch (err) {
      console.error("Failed to fetch candidates", err);
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  // Komponen untuk me-render CV digital di dalam layar split (sebelah kanan)
  const CVPreview = ({ candidate }) => {
    if (!candidate) return null;

    // Parsing sederhana untuk mengekstrak bagian pendidikan & pengalaman 
    // dari field 'skills' dan 'experience' yang tersimpan di database MVP kita
    const educationStr = candidate.skills.includes('Pendidikan:') 
      ? candidate.skills.split('Pendidikan:')[1] 
      : 'S1 Teknik Informatika (Default Extracted Data)';
      
    const hardSkills = candidate.skills.split('|')[0] || candidate.skills;

    return (
      <div className="bg-slate-50 h-full border-l border-slate-200 overflow-y-auto w-full lg:w-[450px] shrink-0 animate-in slide-in-from-right duration-300">
        
        {/* Header CV Preview */}
        <div className="bg-white px-6 py-5 border-b border-slate-200 sticky top-0 z-10 flex justify-between items-center shadow-sm">
          <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" /> Lembar CV Pelamar
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Berhasil diekstraksi otomatis oleh LLM
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Unduh PDF Asli">
              <Download className="w-5 h-5" />
            </button>
            <button onClick={() => setSelectedCandidate(null)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Isi CV */}
        <div className="p-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center border border-slate-300">
                <UserCircle className="w-10 h-10 text-slate-400" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">{candidate.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {candidate.name.toLowerCase().split(' ')[0]}@email.com</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +62 812...</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl w-full mb-2">
              <div className="bg-indigo-600 text-white px-2 py-0.5 rounded text-xs font-bold tracking-wider">MATCH</div>
              <span className="font-bold text-indigo-900">{candidate.score}% Cocok dengan Posisi Ini</span>
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Riwayat Pendidikan
              </h4>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl"></div>
                <p className="font-bold text-slate-800 text-sm">{educationStr}</p>
                <p className="text-xs text-slate-500 mt-1">Lulus dengan IPK baik berdasarkan ringkasan naratif dokumen.</p>
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" /> Hard Skills Ekstraksi AI
              </h4>
              <div className="flex flex-wrap gap-2">
                {hardSkills.split(',').map((skill, i) => (
                  <span key={i} className="bg-slate-200/50 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-200">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Pengalaman Relevan (Skill Gap)
              </h4>
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                {candidate.gap === "Tidak ada" ? (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Kandidat menguasai semua kualifikasi posisi ini.
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-bold text-rose-600 mb-2">Peringatan dari AI: Kurang Jam Terbang di Bidang Berikut:</p>
                    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                      {candidate.gap.split(',').map((g, i) => (
                        <li key={i}>{g.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          </div>
          
          <div className="mt-8 flex gap-3">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition shadow-md shadow-emerald-200">
              Loloskan Kandidat
            </button>
            <button className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 py-3 rounded-xl font-bold transition">
              Tolak Pelamar
            </button>
          </div>
          
        </div>
      </div>
    );
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full h-full max-w-[1400px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:m-6">
        
        {/* Header Lowongan */}
        <div className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center shrink-0">
          <div>
            <button onClick={onClose} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium mb-1 transition">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
            </button>
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              Ranking Kandidat: {job.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Layout Split Screen (Tabel & Preview) */}
        <div className="flex-1 flex overflow-hidden bg-white">
          
          {/* Main Table Area */}
          <div className="flex-1 overflow-y-auto p-8 relative">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Daftar Pelamar ({candidates.length})</h3>
                <p className="text-sm text-slate-500 mt-1">Diurutkan secara otomatis dari kecocokan skor AI tertinggi.</p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <th className="p-5 pl-6 w-20 text-center">Peringkat</th>
                    <th className="p-5">Nama Pelamar</th>
                    <th className="p-5">Pendidikan Terakhir</th>
                    <th className="p-5 text-center">AI Score</th>
                    <th className="p-5 text-center">Aksi (Lembar CV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-16 text-center">
                        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-500 font-medium">BERT dan LLM sedang menganalisis kecocokan pelamar...</p>
                      </td>
                    </tr>
                  ) : candidates.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-16 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <UserCircle className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-lg font-bold text-slate-800">Belum Ada Pelamar</p>
                        <p className="text-sm text-slate-500 mt-1">Belum ada kandidat yang masuk atau sesuai dengan kriteria lowongan ini.</p>
                      </td>
                    </tr>
                  ) : (
                    candidates.map((cand, idx) => {
                      const isSelected = selectedCandidate?.id === cand.id;
                      // Memotong string Pendidikan jika ada dari text 'skills' (Untuk Hackathon Data Mock)
                      const educationShort = cand.skills.includes('S1') ? 'Sarjana (S1)' : cand.skills.includes('D3') ? 'Diploma (D3)' : 'Tidak Tersedia';
                      
                      return (
                        <tr 
                          key={cand.id} 
                          className={`transition ${isSelected ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                        >
                          <td className="p-5 pl-6 text-center">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-sm shadow-sm ${
                              idx === 0 ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                              idx === 1 ? 'bg-slate-200 text-slate-700 border border-slate-300' :
                              idx === 2 ? 'bg-orange-100 text-orange-800 border border-orange-200' : 'bg-slate-50 text-slate-500 border border-slate-200'
                            }`}>
                              #{idx + 1}
                            </span>
                          </td>
                          <td className="p-5">
                            <div className="font-bold text-slate-900">{cand.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]">{cand.skills}</div>
                          </td>
                          <td className="p-5">
                            <span className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                              {educationShort}
                            </span>
                          </td>
                          <td className="p-5 text-center">
                            <div className="flex flex-col items-center">
                              <span className={`text-xl font-black ${
                                cand.score >= 80 ? 'text-emerald-600' : 
                                cand.score >= 60 ? 'text-amber-600' : 'text-rose-600'
                              }`}>
                                {cand.score}%
                              </span>
                              <span className="text-[10px] uppercase font-bold text-slate-400">Match</span>
                            </div>
                          </td>
                          <td className="p-5 text-center">
                            <button 
                              onClick={() => setSelectedCandidate(cand)}
                              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 mx-auto shadow-sm ${
                                isSelected 
                                  ? 'bg-indigo-600 text-white' 
                                  : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600'
                              }`}
                            >
                              <FileText className="w-4 h-4" /> 
                              {isSelected ? 'Meninjau CV...' : 'Review CV Konversi'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Split Screen: CV Preview */}
          {selectedCandidate && <CVPreview candidate={selectedCandidate} />}

        </div>
      </div>
    </div>
  );
};

export default ApplicantRanking;
