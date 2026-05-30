import React, { useState } from 'react';
import { mockCandidates, mockInterviews } from '../../data/mockData';
import {
  ClipboardList, Video, Plus, Send, Calendar, Clock,
  CheckCircle2, AlertCircle, Users, X, ChevronDown
} from 'lucide-react';

const tabs = ['Manajemen Tes', 'Jadwal Wawancara'];

const testTemplates = [
  { id: 1, title: 'Tes Kompetensi Frontend', questions: 30, duration: 60, level: 'Menengah' },
  { id: 2, title: 'Tes Logika & Analitik', questions: 25, duration: 45, level: 'Dasar' },
  { id: 3, title: 'Tes Kepribadian & Soft Skill', questions: 40, duration: 30, level: 'Semua Level' },
];

const AssessmentManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sendingTo, setSendingTo] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [sentTests, setSentTests] = useState([]);
  const [scheduleForm, setScheduleForm] = useState({ candidate: '', date: '', time: '', platform: 'Google Meet', duration: '60' });
  const [scheduledInterviews, setScheduledInterviews] = useState(mockInterviews);

  const handleSendTest = () => {
    if (!sendingTo || !selectedTemplate) return;
    setSentTests(prev => [...prev, { candidateId: sendingTo, template: selectedTemplate, sentAt: new Date().toLocaleDateString('id-ID') }]);
    setSendingTo(null);
    setSelectedTemplate('');
  };

  const handleScheduleInterview = () => {
    if (!scheduleForm.candidate || !scheduleForm.date || !scheduleForm.time) return;
    const candidate = mockCandidates.find(c => c.id === parseInt(scheduleForm.candidate));
    setScheduledInterviews(prev => [...prev, {
      id: prev.length + 10,
      jobTitle: candidate?.jobTitle || 'Posisi',
      company: 'PT TechCorp Indonesia',
      interviewerName: 'Sarah Kusuma',
      interviewerRole: 'HR Manager',
      date: scheduleForm.date,
      time: scheduleForm.time + ' WIB',
      duration: scheduleForm.duration + ' menit',
      platform: scheduleForm.platform,
      meetLink: '#',
      status: 'Terjadwal',
      type: 'HR Interview',
      notes: '',
      candidateName: candidate?.name || '',
    }]);
    setScheduleForm({ candidate: '', date: '', time: '', platform: 'Google Meet', duration: '60' });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Tes & Interview</h1>
        <p className="text-slate-500 text-sm mt-1">Kelola pengiriman tes dan penjadwalan wawancara kandidat.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6 w-fit">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === i ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            {i === 0 ? <ClipboardList size={15} /> : <Video size={15} />}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Manajemen Tes */}
      {activeTab === 0 && (
        <div className="space-y-5">
          {/* Test Templates */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ClipboardList size={17} className="text-indigo-600" /> Template Tes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {testTemplates.map(t => (
                <div key={t.id} className="border border-slate-100 rounded-xl p-4 hover:border-indigo-200 transition-all">
                  <p className="font-semibold text-slate-900 text-sm">{t.title}</p>
                  <div className="flex gap-3 mt-2 text-xs text-slate-500">
                    <span>{t.questions} soal</span>
                    <span>{t.duration} menit</span>
                  </div>
                  <span className="inline-block mt-2 text-[11px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{t.level}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 border border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors">
              <Plus size={15} /> Buat Template Baru
            </button>
          </div>

          {/* Send Test */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Send size={17} className="text-indigo-600" /> Kirim Tes ke Kandidat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Pilih Kandidat</label>
                <select value={sendingTo || ''} onChange={e => setSendingTo(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="">-- Pilih kandidat --</option>
                  {mockCandidates.map(c => <option key={c.id} value={c.id}>{c.name} — {c.jobTitle}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Pilih Template Tes</label>
                <select value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="">-- Pilih template --</option>
                  {testTemplates.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}
                </select>
              </div>
            </div>
            <button onClick={handleSendTest} disabled={!sendingTo || !selectedTemplate}
              className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors">
              <Send size={15} /> Kirim Tes
            </button>
          </div>

          {/* Sent Tests */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users size={17} className="text-indigo-600" /> Status Tes Kandidat
            </h2>
            <div className="space-y-2.5">
              {mockCandidates.map(c => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-100 transition-all">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{c.name}</p>
                    <p className="text-xs text-slate-500 truncate">{c.jobTitle}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      c.testStatus === 'Selesai' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : c.testStatus === 'Menunggu' ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {c.testStatus}
                    </span>
                    {c.testScore && <p className="text-xs font-bold text-emerald-600 mt-0.5">Skor: {c.testScore}</p>}
                  </div>
                </div>
              ))}
              {sentTests.map((st, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-emerald-100 bg-emerald-50">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {mockCandidates.find(c => c.id === st.candidateId)?.name}
                    </p>
                    <p className="text-xs text-slate-500">{st.template}</p>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold flex-shrink-0">Terkirim {st.sentAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Jadwal Wawancara */}
      {activeTab === 1 && (
        <div className="space-y-5">
          {/* Schedule Form */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={17} className="text-indigo-600" /> Jadwalkan Wawancara
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kandidat</label>
                <select value={scheduleForm.candidate} onChange={e => setScheduleForm({ ...scheduleForm, candidate: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="">-- Pilih kandidat --</option>
                  {mockCandidates.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform</label>
                <select value={scheduleForm.platform} onChange={e => setScheduleForm({ ...scheduleForm, platform: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  {['Google Meet', 'Zoom', 'Microsoft Teams', 'Platform Lain'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tanggal</label>
                <input type="date" value={scheduleForm.date} onChange={e => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Jam</label>
                <input type="time" value={scheduleForm.time} onChange={e => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Durasi (menit)</label>
                <select value={scheduleForm.duration} onChange={e => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  {['30', '45', '60', '90', '120'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <button onClick={handleScheduleInterview}
              disabled={!scheduleForm.candidate || !scheduleForm.date || !scheduleForm.time}
              className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors">
              <Video size={15} /> Jadwalkan Interview
            </button>
          </div>

          {/* Scheduled Interviews List */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Video size={17} className="text-indigo-600" /> Jadwal Interview Aktif
            </h2>
            <div className="space-y-3">
              {scheduledInterviews.map((iv) => (
                <div key={iv.id} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Video size={18} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">
                      {iv.candidateName || 'Kandidat'} — {iv.jobTitle}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {iv.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {iv.time}</span>
                      <span>{iv.platform}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${
                    iv.status === 'Terjadwal' ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : iv.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>{iv.status}</span>
                </div>
              ))}
              {scheduledInterviews.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                  <Video size={30} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Belum ada jadwal wawancara.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentManagement;
