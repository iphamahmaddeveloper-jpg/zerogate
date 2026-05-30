import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCircle, Briefcase, ChevronRight, Search, Activity, Star } from 'lucide-react';

const DashboardRecruiter = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        // Memanggil API backend untuk job ID 1
        const response = await axios.get('http://localhost:8000/api/jobs/1/candidates');
        setCandidates(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Gagal mengambil data dari backend. Pastikan server FastAPI berjalan di port 8000.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-slate-800">
      {/* Header Minimalis */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-2xl tracking-tight">
            <Activity className="w-8 h-8" /> Zero Gate
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <button className="hover:text-indigo-600 transition">Dashboard</button>
            <button className="hover:text-indigo-600 transition">Lowongan</button>
            <button className="hover:text-indigo-600 transition">Kandidat</button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              HR
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Detail Lowongan */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2 font-semibold">
              <Briefcase className="w-5 h-5" /> <span>Lowongan Aktif</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Senior Frontend Developer</h1>
            <p className="text-slate-500">React, TypeScript, Tailwind CSS, REST API</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-indigo-50 px-6 py-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-indigo-700">{candidates.length}</p>
              <p className="text-sm font-medium text-indigo-600/80">Total Pelamar</p>
            </div>
            <div className="bg-emerald-50 px-6 py-4 rounded-xl text-center">
              <p className="text-2xl font-bold text-emerald-700">
                {candidates.filter(c => c.score >= 80).length}
              </p>
              <p className="text-sm font-medium text-emerald-600/80">Kandidat Kuat</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-400" fill="currentColor" /> AI Ranked Candidates
        </h2>

        {/* Tabel Kandidat */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari nama atau skill..." 
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition w-64 bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4 pl-6 w-20 text-center">Peringkat</th>
                  <th className="p-4">Kandidat</th>
                  <th className="p-4 w-1/3">Keahlian Utama</th>
                  <th className="p-4 text-center">AI Match Score</th>
                  <th className="p-4">Skill Gap Analysis</th>
                  <th className="p-4 pr-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="font-medium animate-pulse">AI sedang menganalisis kandidat...</p>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-red-500 bg-red-50">
                      {error}
                    </td>
                  </tr>
                ) : candidates.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">
                      Belum ada kandidat yang melamar.
                    </td>
                  </tr>
                ) : (
                  candidates.map((cand, index) => {
                    const isTopCandidate = index === 0;
                    return (
                      <tr key={cand.id} className="hover:bg-slate-50/80 transition group">
                        <td className="p-4 pl-6 text-center">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                            index === 0 ? 'bg-amber-100 text-amber-700' :
                            index === 1 ? 'bg-slate-100 text-slate-700' :
                            index === 2 ? 'bg-orange-100 text-orange-800' :
                            'bg-transparent text-slate-400'
                          }`}>
                            #{index + 1}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <UserCircle className="w-10 h-10 text-slate-300" />
                            <div>
                              <p className={`font-bold ${isTopCandidate ? 'text-indigo-700' : 'text-slate-900'}`}>{cand.name}</p>
                              <p className="text-xs text-slate-500">ID: CAND-{cand.id.toString().padStart(4, '0')}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {cand.skills.split(',').map((skill, i) => (
                              <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                              cand.score >= 80 ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                              cand.score >= 60 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                              'bg-rose-100 text-rose-700 border border-rose-200'
                            }`}>
                              {cand.score}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {cand.gap === "Tidak ada" ? (
                            <span className="text-emerald-600 font-medium text-sm flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Kualifikasi terpenuhi
                            </span>
                          ) : (
                            <div className="text-sm">
                              <span className="text-rose-500 font-medium text-xs uppercase tracking-wide block mb-1">Missing Skills:</span>
                              <span className="text-slate-600 bg-rose-50 px-2 py-1 rounded border border-rose-100 inline-block">
                                {cand.gap}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg">
                            Detail <ChevronRight className="w-4 h-4" />
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
      </main>
    </div>
  );
};

export default DashboardRecruiter;
