import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Activity, LayoutDashboard, Briefcase, Users,
  Video, User, LogOut, Bell, Menu, X, Settings, Shield
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/company/dashboard' },
  { label: 'Lowongan', icon: Briefcase, path: '/company/jobs' },
  { label: 'Kandidat', icon: Users, path: '/company/candidates' },
  { label: 'Tes & Interview', icon: Video, path: '/company/assessments' },
  { label: 'Pengaturan', icon: Settings, path: '/company/settings', hideOnMobile: true },
  { label: 'Profil', icon: User, path: '/company/profile' },
];

const mobileNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/company/dashboard' },
  { label: 'Lowongan', icon: Briefcase, path: '/company/jobs' },
  { label: 'Kandidat', icon: Users, path: '/company/candidates' },
  { label: 'Interview', icon: Video, path: '/company/assessments' },
  { label: 'Profil', icon: User, path: '/company/profile' },
];

const CompanyLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname.startsWith(path) && path !== '/company/dashboard'
    ? location.pathname.startsWith(path)
    : location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 fixed h-full z-30">
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-slate-100">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-sm">
            <Activity size={17} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base block leading-tight">Zero Gate</span>
            <span className="text-[10px] text-slate-500 font-medium">Dasbor Perekrut</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Navigasi</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 sidebar-active'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={17} className={active ? 'text-indigo-600' : 'text-slate-400'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Company badge */}
        <div className="mx-3 mb-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center gap-2">
          <Shield size={15} className="text-emerald-600 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-emerald-800">Perusahaan Terverifikasi</p>
            <p className="text-[10px] text-emerald-600">PT TechCorp Indonesia</p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'R'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || user?.email}</p>
              <p className="text-xs text-slate-500">HR Manager</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600 py-2 px-3 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <LogOut size={15} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-40 animate-fade-in" onClick={() => setSidebarOpen(false)} />
      )}
      {sidebarOpen && (
        <aside className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-xl animate-fade-in flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                <Activity size={15} className="text-white" />
              </div>
              <span className="font-bold text-slate-900">Zero Gate</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
              <X size={18} className="text-slate-500" />
            </button>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <Icon size={17} className={active ? 'text-indigo-600' : 'text-slate-400'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-slate-100">
            <button onClick={handleLogout} className="w-full flex items-center gap-2 text-sm text-rose-600 py-2 px-3 rounded-lg hover:bg-rose-50 transition-colors">
              <LogOut size={15} /> Keluar
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-20">
          <button className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'R'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-30 px-2 py-2">
        <div className="flex items-center justify-around">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${active ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-700'}`}>
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {active && <span className="w-1 h-1 rounded-full bg-indigo-600" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CompanyLayout;
