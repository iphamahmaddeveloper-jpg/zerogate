import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Activity, Lock, Mail, User, Eye, EyeOff, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';

const LoginRegister = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login');
  const [selectedRole, setSelectedRole] = useState(searchParams.get('role') || 'candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      navigate(user.role === 'candidate' ? '/candidate/dashboard' : '/company/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Mock login/register — bypass backend for prototype demo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise((r) => setTimeout(r, 800));

      // Mock JWT token containing user info
      const mockPayload = {
        sub: email,
        name: name || (selectedRole === 'candidate' ? 'Rizky Aditya Pratama' : 'Sarah Kusuma'),
        role: selectedRole,
        id: 1,
        exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
      };

      // Create a simple base64 "token" for demo purposes
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(mockPayload))}.mock_signature`;

      login(mockToken);
      navigate(selectedRole === 'candidate' ? '/candidate/dashboard' : '/company/dashboard');
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to landing */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <ArrowLeft size={15} /> Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <Activity size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Zero Gate</h1>
            <p className="text-indigo-200 text-sm mt-1">Platform Rekrutmen Cerdas</p>
          </div>

          <div className="p-6">
            {/* Tab Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setMode('login')}
              >
                Masuk
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                onClick={() => setMode('register')}
              >
                Daftar
              </button>
            </div>

            {/* Role Selector — only on Register */}
            {mode === 'register' && (
              <div className="mb-5">
                <p className="text-sm font-medium text-slate-700 mb-2">Saya mendaftar sebagai:</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'candidate', label: 'Pencari Kerja', icon: User, desc: 'Cari & lamar pekerjaan' },
                    { value: 'company', label: 'Perekrut', icon: Shield, desc: 'Rekrut kandidat terbaik' },
                  ].map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setSelectedRole(r.value)}
                        className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                          selectedRole === r.value
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Icon size={18} className={selectedRole === r.value ? 'text-indigo-600' : 'text-slate-400'} />
                        <p className={`text-sm font-semibold mt-1.5 ${selectedRole === r.value ? 'text-indigo-700' : 'text-slate-700'}`}>
                          {r.label}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{r.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {error && (
              <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm mb-4 border border-rose-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
                  <div className="relative">
                    <User className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                      placeholder="Nama kamu"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm mt-2 shadow-sm shadow-indigo-200"
              >
                {loading ? 'Memproses...' : mode === 'login' ? 'Masuk ke Akun' : 'Buat Akun Gratis'}
              </button>
            </form>

            {/* Security note */}
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-400 justify-center">
              <Shield size={13} />
              <span>Data kamu dilindungi enkripsi 256-bit</span>
            </div>

            {/* Demo access */}
            <div className="mt-5 pt-5 border-t border-slate-100">
              <p className="text-xs text-center text-slate-500 mb-3 font-medium">Akses Demo Cepat</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setSelectedRole('candidate'); setEmail('demo@kandidat.com'); setPassword('demo123'); }}
                  className="text-xs py-2.5 px-3 border border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors font-medium"
                >
                  Demo Pencari Kerja
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('login'); setSelectedRole('company'); setEmail('demo@perekrut.com'); setPassword('demo123'); }}
                  className="text-xs py-2.5 px-3 border border-violet-200 text-violet-600 rounded-xl hover:bg-violet-50 transition-colors font-medium"
                >
                  Demo Perekrut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
