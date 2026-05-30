import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';
import {
  FileText, Cpu, Star, ClipboardList, Video, BarChart3,
  ArrowRight, ChevronRight, CheckCircle2, Users, Briefcase,
  TrendingUp, Shield, Zap, Target
} from 'lucide-react';

const features = [
  { icon: FileText, title: 'CV Terstruktur & Cerdas', desc: 'Buat CV profesional dengan panduan AI. Sistem secara otomatis menyusun profil kamu agar mudah dibaca perekrut.', color: 'indigo' },
  { icon: Cpu, title: 'AI Matching Otomatis', desc: 'Algoritma cerdas mencocokkan profil dengan ribuan lowongan berdasarkan skill, pengalaman, dan preferensi.', color: 'violet' },
  { icon: Star, title: 'Skor Kecocokan', desc: 'Lihat berapa persen profil kamu cocok dengan setiap lowongan — transparan dan mudah dipahami.', color: 'amber' },
  { icon: ClipboardList, title: 'Tes Seleksi Online', desc: 'Ikuti tes langsung di platform. Hasil langsung dikirim ke perekrut tanpa perlu WhatsApp manual.', color: 'emerald' },
  { icon: Video, title: 'Wawancara Online', desc: 'Jadwalkan dan masuk wawancara langsung dari platform. Tidak perlu berpindah aplikasi.', color: 'blue' },
  { icon: BarChart3, title: 'Gap Skill Report', desc: 'Ketahui skill apa yang perlu ditingkatkan dan dapatkan rekomendasi pelatihan yang tepat sasaran.', color: 'rose' },
];

const steps = [
  { num: '01', title: 'Buat Profil Lengkap', desc: 'Isi data diri, pendidikan, pengalaman, dan skill kamu. Sistem akan membantu menyusun CV otomatis.', icon: FileText },
  { num: '02', title: 'Dapat Pencocokan AI', desc: 'AI kami mencocokkan profilmu dengan ribuan lowongan dan menampilkan skor kecocokan yang akurat.', icon: Cpu },
  { num: '03', title: 'Lanjutkan Seleksi', desc: 'Ikuti tes online, jadwalkan wawancara, dan pantau perkembangan lamaran — semua dalam satu platform.', icon: Target },
];

const stats = [
  { label: 'Pencari Kerja Aktif', value: '50K+', icon: Users },
  { label: 'Lowongan Tersedia', value: '12K+', icon: Briefcase },
  { label: 'Tingkat Keberhasilan', value: '74%', icon: TrendingUp },
  { label: 'Perusahaan Mitra', value: '800+', icon: Shield },
];

const colorMap = {
  indigo: 'bg-indigo-50 text-indigo-600',
  violet: 'bg-violet-50 text-violet-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  rose: 'bg-rose-50 text-rose-600',
};

const LandingPage = () => {
  return (
    <PublicLayout>
      {/* ── HERO ── */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8 backdrop-blur-sm">
              <Zap size={14} className="text-amber-400" />
              Platform Rekrutmen Bertenaga AI
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Rekrutmen Cerdas,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                Satu Platform
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Platform rekrutmen end-to-end yang mencocokkan kandidat dengan lowongan secara akurat, menjalankan seleksi online, dan membantu kamu memahami gap kompetensi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/auth?mode=register&role=candidate"
                className="flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-indigo-50 transition-all shadow-lg shadow-black/20 text-base"
              >
                Mulai sebagai Pencari Kerja <ArrowRight size={18} />
              </Link>
              <Link
                to="/auth?mode=register&role=company"
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm text-base"
              >
                Mulai sebagai Perekrut <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center backdrop-blur-sm">
                  <Icon size={22} className="text-indigo-300 mx-auto mb-2" />
                  <p className="text-2xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Cara Kerja</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Tiga Langkah Menuju Karier Impian</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Proses yang sederhana, transparan, dan didukung AI untuk membantumu berhasil.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative text-center group">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full border-t-2 border-dashed border-indigo-100 z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:border-indigo-300 transition-colors">
                      <Icon size={28} className="text-indigo-600" />
                    </div>
                    <span className="inline-block text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-3">{step.num}</span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Fitur Lengkap</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Semua yang Kamu Butuhkan</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Dari profil hingga diterima kerja — semua ada di Zero Gate.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorMap[f.color]} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOR RECRUITERS ── */}
      <section id="for-recruiters" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-3">Untuk Perekrut</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5">Temukan Kandidat Terbaik Lebih Cepat</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                AI kami secara otomatis meranking kandidat berdasarkan kecocokan dengan lowongan Anda. Hemat waktu screening dan fokus pada wawancara yang bermakna.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Posting lowongan dalam hitungan menit',
                  'Ranking kandidat otomatis dengan skor AI',
                  'Kirim tes online langsung dari platform',
                  'Jadwalkan wawancara dengan satu klik',
                  'Analisis gap skill setiap kandidat',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth?mode=register&role=company"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Mulai Rekrut Sekarang <ArrowRight size={17} />
              </Link>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Ranking Kandidat — Frontend Developer</p>
              <div className="space-y-3">
                {[
                  { name: 'Clarissa W.', score: 95, status: 'Shortlist', color: 'indigo' },
                  { name: 'Rizky A.', score: 91, status: 'Interview', color: 'blue' },
                  { name: 'Anindita S.', score: 87, status: 'Tes', color: 'amber' },
                  { name: 'M. Farhan', score: 79, status: 'Review', color: 'slate' },
                ].map((c, i) => (
                  <div key={c.name} className="bg-white rounded-xl p-4 flex items-center gap-3 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-indigo-500 h-1.5 rounded-full"
                          style={{ width: `${c.score}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-indigo-600">{c.score}%</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full bg-${c.color}-50 text-${c.color}-600`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Siap Memulai Perjalanan Kariermu?</h2>
          <p className="text-indigo-200 text-lg mb-10">Daftar gratis sekarang dan dapatkan pencocokan AI pertamamu dalam hitungan menit.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/auth?mode=register&role=candidate"
              className="flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all text-base shadow-lg"
            >
              Daftar Sebagai Pencari Kerja <ArrowRight size={18} />
            </Link>
            <Link
              to="/auth?mode=register&role=company"
              className="flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-base"
            >
              Daftar Sebagai Perekrut
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
