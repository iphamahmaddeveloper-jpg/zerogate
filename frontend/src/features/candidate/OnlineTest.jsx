import React, { useState, useEffect, useRef } from 'react';
import { mockTests } from '../../data/mockData';
import { ClipboardList, Clock, CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Send } from 'lucide-react';

const OnlineTest = () => {
  const [phase, setPhase] = useState('list'); // list | instruction | doing | done
  const [activeTest, setActiveTest] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase === 'doing' && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0; }
        return t - 1;
      }), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const startTest = (test) => {
    setActiveTest(test);
    setAnswers({});
    setCurrentQ(0);
    setPhase('instruction');
  };

  const beginTest = () => {
    setTimeLeft(activeTest.duration * 60);
    setPhase('doing');
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    setPhase('done');
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (phase === 'list') return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Tes Seleksi Online</h1>
        <p className="text-slate-500 text-sm mt-1">Kerjakan tes yang dikirimkan perekrut untukmu.</p>
      </div>
      <div className="space-y-4">
        {mockTests.map((test) => (
          <div key={test.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <ClipboardList size={22} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{test.title}</h3>
                    <p className="text-sm text-slate-500">{test.company}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${test.status === 'Belum Dikerjakan' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                    {test.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> {test.duration} menit</span>
                  <span className="flex items-center gap-1"><ClipboardList size={12} /> {test.totalQuestions} soal</span>
                  <span className="text-rose-500 font-medium">Deadline: {test.deadline}</span>
                </div>
              </div>
            </div>
            <button onClick={() => startTest(test)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
              Mulai Tes <ChevronRight size={15} />
            </button>
          </div>
        ))}
        {mockTests.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <ClipboardList size={36} className="mx-auto mb-3 opacity-30" />
            <p>Belum ada tes yang dikirimkan perekrut.</p>
          </div>
        )}
      </div>
    </div>
  );

  if (phase === 'instruction') return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <ClipboardList size={28} className="text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 text-center mb-2">{activeTest.title}</h2>
        <p className="text-slate-500 text-sm text-center mb-6">{activeTest.company}</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Durasi', value: `${activeTest.duration} menit` },
            { label: 'Jumlah Soal', value: `${activeTest.totalQuestions} soal` },
            { label: 'Deadline', value: activeTest.deadline },
            { label: 'Tipe', value: 'Pilihan Ganda' },
          ].map((i) => (
            <div key={i.label} className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500">{i.label}</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{i.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800 font-semibold mb-2 flex items-center gap-2"><AlertCircle size={15} /> Instruksi</p>
          <p className="text-sm text-amber-700 leading-relaxed">{activeTest.instructions}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPhase('list')} className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
            Kembali
          </button>
          <button onClick={beginTest} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Mulai Tes Sekarang
          </button>
        </div>
      </div>
    </div>
  );

  if (phase === 'doing') {
    const q = activeTest.questions[currentQ];
    const total = activeTest.questions.length;
    const progress = ((currentQ + 1) / total) * 100;
    const isLast = currentQ === total - 1;
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Timer Bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Soal {currentQ + 1} dari {total}</p>
            <div className="w-48 bg-slate-100 rounded-full h-1.5 mt-1.5">
              <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className={`flex items-center gap-1.5 font-mono font-bold text-lg px-4 py-2 rounded-xl ${timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-700'}`}>
            <Clock size={18} /> {fmt(timeLeft)}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-4">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-4">Pertanyaan {currentQ + 1}</p>
          <p className="text-slate-900 font-semibold text-base leading-relaxed mb-6">{q.question}</p>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => setAnswers({ ...answers, [currentQ]: i })}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm ${answers[currentQ] === i ? 'border-indigo-500 bg-indigo-50 text-indigo-900 font-medium' : 'border-slate-200 hover:border-indigo-300 text-slate-700'}`}>
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${answers[currentQ] === i ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button onClick={() => setCurrentQ(q => q - 1)} disabled={currentQ === 0}
            className="flex items-center gap-1.5 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 disabled:opacity-40 transition-colors">
            <ChevronLeft size={15} /> Sebelumnya
          </button>
          {!isLast ? (
            <button onClick={() => setCurrentQ(q => q + 1)} disabled={answers[currentQ] === undefined}
              className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors py-3">
              Selanjutnya <ChevronRight size={15} />
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors py-3">
              <Send size={15} /> Submit Jawaban
            </button>
          )}
        </div>

        {/* Answer progress */}
        <p className="text-center text-xs text-slate-400 mt-3">
          {Object.keys(answers).length} dari {total} soal terjawab
        </p>
      </div>
    );
  }

  if (phase === 'done') return (
    <div className="max-w-md mx-auto animate-fade-in text-center">
      <div className="bg-white rounded-2xl border border-slate-100 p-8">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Tes Selesai!</h2>
        <p className="text-slate-500 text-sm mb-6">
          Kamu berhasil menjawab <strong>{Object.keys(answers).length}</strong> dari <strong>{activeTest.questions.length}</strong> soal.
          Hasil akan dikirim ke perekrut secara otomatis.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Tes</span>
            <span className="font-semibold text-slate-900">{activeTest.title}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Soal Terjawab</span>
            <span className="font-semibold text-emerald-600">{Object.keys(answers).length}/{activeTest.questions.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span className="font-semibold text-emerald-600">Terkirim</span>
          </div>
        </div>
        <button onClick={() => { setPhase('list'); setActiveTest(null); }}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
          Kembali ke Daftar Tes
        </button>
      </div>
    </div>
  );
};

export default OnlineTest;
