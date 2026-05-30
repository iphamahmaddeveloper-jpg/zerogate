import React, { useState } from 'react';
import { mockInterviews } from '../../data/mockData';
import { Video, Calendar, Clock, ExternalLink, CheckCircle2, Loader, AlertCircle, MessageSquare } from 'lucide-react';

const statusConfig = {
  'Menunggu': { bg: 'bg-slate-50 text-slate-600 border-slate-200', icon: Loader, label: 'Menunggu' },
  'Terjadwal': { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Calendar, label: 'Terjadwal' },
  'Berlangsung': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Video, label: 'Berlangsung' },
  'Selesai': { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: CheckCircle2, label: 'Selesai' },
};

const Interviews = () => {
  const [noteOpen, setNoteOpen] = useState(null);
  const [notes, setNotes] = useState({});

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Jadwal Wawancara</h1>
        <p className="text-slate-500 text-sm mt-1">Kelola semua jadwal wawancara online kamu di sini.</p>
      </div>

      {mockInterviews.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <Video size={40} className="mx-auto mb-3 opacity-30" />
          <p>Belum ada jadwal wawancara.</p>
        </div>
      )}

      <div className="space-y-5">
        {mockInterviews.map((iv) => {
          const cfg = statusConfig[iv.status] || statusConfig['Terjadwal'];
          const Icon = cfg.icon;
          const isUpcoming = iv.status === 'Terjadwal' || iv.status === 'Menunggu';
          return (
            <div key={iv.id} className={`bg-white rounded-2xl border p-5 transition-all ${isUpcoming ? 'border-blue-200 shadow-sm shadow-blue-50' : 'border-slate-100'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isUpcoming ? 'bg-blue-100' : 'bg-slate-100'}`}>
                  <Video size={22} className={isUpcoming ? 'text-blue-600' : 'text-slate-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900">{iv.jobTitle}</h3>
                      <p className="text-sm text-slate-500">{iv.company}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${cfg.bg}`}>
                      <Icon size={11} /> {iv.status}
                    </span>
                  </div>

                  {/* Interview details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Tanggal</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{iv.date}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Waktu</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{iv.time}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Durasi</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{iv.duration}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Tipe</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{iv.type}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Platform</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{iv.platform}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wide">Pewawancara</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5 truncate">{iv.interviewerName}</p>
                    </div>
                  </div>

                  {iv.notes && (
                    <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                      <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">{iv.notes}</p>
                    </div>
                  )}

                  {/* Notes input */}
                  {noteOpen === iv.id && (
                    <div className="mt-3">
                      <textarea
                        rows={3}
                        value={notes[iv.id] || ''}
                        onChange={(e) => setNotes({ ...notes, [iv.id]: e.target.value })}
                        placeholder="Tulis catatan wawancara kamu..."
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm resize-none focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                      <button onClick={() => setNoteOpen(null)}
                        className="mt-2 text-xs font-semibold text-indigo-600 hover:underline">Simpan Catatan</button>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {isUpcoming && (
                      <a href={iv.meetLink} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                        <ExternalLink size={13} /> Masuk Interview
                      </a>
                    )}
                    <button onClick={() => setNoteOpen(noteOpen === iv.id ? null : iv.id)}
                      className="flex items-center gap-1.5 border border-slate-200 text-slate-600 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <MessageSquare size={13} /> {noteOpen === iv.id ? 'Tutup' : 'Catatan'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Interviews;
