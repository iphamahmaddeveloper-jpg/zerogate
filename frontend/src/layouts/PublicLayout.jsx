import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity, Menu, X, ChevronRight } from 'lucide-react';

const PublicLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
                <Activity className="w-4.5 h-4.5 text-white" size={18} />
              </div>
              <span className="font-bold text-slate-900 text-lg tracking-tight">Zero Gate</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Fitur</a>
              <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Cara Kerja</a>
              <a href="#for-recruiters" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">Untuk Perekrut</a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <button
                  onClick={() => navigate(user.role === 'candidate' ? '/candidate/dashboard' : '/company/dashboard')}
                  className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Ke Dashboard <ChevronRight size={15} />
                </button>
              ) : (
                <>
                  <Link to="/auth" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors px-3 py-2">
                    Masuk
                  </Link>
                  <Link to="/auth?mode=register" className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Mulai Gratis <ChevronRight size={15} />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 animate-fade-in">
            <a href="#features" className="block text-sm text-slate-700 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Fitur</a>
            <a href="#how-it-works" className="block text-sm text-slate-700 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Cara Kerja</a>
            <a href="#for-recruiters" className="block text-sm text-slate-700 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Untuk Perekrut</a>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/auth" className="w-full text-center text-sm font-medium text-slate-700 border border-slate-200 py-2.5 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Masuk</Link>
              <Link to="/auth?mode=register" className="w-full text-center text-sm font-medium text-white bg-indigo-600 py-2.5 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Daftar Gratis</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
                  <Activity size={15} className="text-white" />
                </div>
                <span className="font-bold text-white">Zero Gate</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Platform rekrutmen cerdas yang mencocokkan kandidat dengan lowongan secara akurat menggunakan teknologi AI.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Untuk Pencari Kerja</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Untuk Perekrut</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tes Online</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wawancara Online</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Perusahaan</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
            © 2026 Zero Gate. Hak cipta dilindungi undang-undang.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
