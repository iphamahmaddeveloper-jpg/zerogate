import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { UserCircle, GraduationCap, Briefcase, Code, Sparkles, Save, CheckCircle, X, Plus, Image as ImageIcon, MapPin, AlignLeft, Phone, Mail } from 'lucide-react';

// Sub-component for Tag Input
const TagInput = ({ tags, setTags, placeholder, icon: Icon }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex gap-2 mb-3 flex-wrap">
        {tags.map((tag, index) => (
          <div key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 border border-indigo-100 shadow-sm">
            {tag}
            <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:bg-indigo-200 p-0.5 rounded-full transition">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
            className={`w-full bg-slate-50 border border-slate-200 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
            placeholder={placeholder}
          />
        </div>
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl transition"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const CandidateProfile = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // UI State
  const [activeTab, setActiveTab] = useState('biodata');

  // Form State
  const [formData, setFormData] = useState({
    photo_url: '',
    full_name: '',
    title: '',
    summary: '',
    contact_email: '',
    contact_whatsapp: '',
    location: '',
    contract_preference: 'Full-time',
    work_scheme_preference: 'Remote',
    education: '',
    experience: '',
    hard_skills: [],
    soft_skills: []
  });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/profile', axiosConfig);
      const data = res.data;
      setFormData({
        photo_url: data.photo_url || '',
        full_name: data.full_name || '',
        title: data.title || '',
        summary: data.summary || '',
        contact_email: data.contact_email || '',
        contact_whatsapp: data.contact_whatsapp || '',
        location: data.location || '',
        contract_preference: data.contract_preference || 'Full-time',
        work_scheme_preference: data.work_scheme_preference || 'Remote',
        education: data.education || '',
        experience: data.experience || '',
        hard_skills: data.hard_skills || [],
        soft_skills: data.soft_skills || []
      });
    } catch (err) {
      console.error("Error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      await axios.put('http://localhost:8000/api/profile', formData, axiosConfig);
      setMessage('Profil berhasil disimpan & Vektor AI diperbarui!');
    } catch (err) {
      console.error(err);
      setMessage('Gagal menyimpan profil.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Memuat profil...</div>;
  }

  const tabs = [
    { id: 'biodata', label: 'Biodata & Kontak', icon: UserCircle },
    { id: 'preferensi', label: 'Preferensi Kerja', icon: MapPin },
    { id: 'riwayat', label: 'Riwayat Akademik', icon: GraduationCap },
    { id: 'keahlian', label: 'Spesifikasi Keahlian', icon: Code }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Manajemen Profil AI</h2>
        <p className="text-slate-500">Data Anda akan dianalisis oleh algoritma BERT untuk dicocokkan secara semantik dengan lowongan kerja terbaik.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 border-b border-slate-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab.id 
                ? 'bg-indigo-50/50 text-indigo-600 border-indigo-600' 
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-5 h-5" /> {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
        
        {/* TAB: BIODATA */}
        {activeTab === 'biodata' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="shrink-0 text-center">
                <div className="w-32 h-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden mb-3 relative group">
                  {formData.photo_url ? (
                    <img src={formData.photo_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-400" />
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold">Edit URL</span>
                  </div>
                </div>
              </div>
              
              <div className="grow space-y-4 w-full">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Foto URL</label>
                  <input type="url" name="photo_url" value={formData.photo_url} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="https://..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap *</label>
                    <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-800" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Judul Profesional</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Senior React Developer" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ringkasan Profil (AI Summary Data)</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <textarea name="summary" rows="4" value={formData.summary} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jelaskan secara singkat karir dan ambisi Anda..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Kontak</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="email@anda.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="tel" name="contact_whatsapp" value={formData.contact_whatsapp} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="+62 8..." />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PREFERENSI */}
        {activeTab === 'preferensi' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Domisili / Lokasi Saat Ini</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Jakarta Pusat, Indonesia" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tipe Kontrak yang Diharapkan</label>
                <select name="contract_preference" value={formData.contract_preference} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract / Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferensi Skema Kerja</label>
                <select name="work_scheme_preference" value={formData.work_scheme_preference} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium">
                  <option value="Remote">100% Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site (WFO)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB: RIWAYAT */}
        {activeTab === 'riwayat' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-500" /> Latar Belakang Pendidikan
              </label>
              <textarea 
                name="education" rows="3" value={formData.education} onChange={handleChange} 
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Deskripsikan pendidikan Anda (Universitas, Jurusan, Tahun, IPK)..." 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-500" /> Pengalaman Kerja Profesional
              </label>
              <textarea 
                name="experience" rows="5" value={formData.experience} onChange={handleChange} 
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Ceritakan sejarah karir, peran, dan pencapaian Anda..." 
              />
            </div>
          </div>
        )}

        {/* TAB: KEAHLIAN */}
        {activeTab === 'keahlian' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
              <label className="block text-base font-black text-indigo-900 mb-2">Hard Skills (Teknikal)</label>
              <p className="text-sm text-indigo-600/80 mb-4">Tambahkan alat, bahasa pemrograman, atau kerangka kerja spesifik.</p>
              <TagInput 
                tags={formData.hard_skills} 
                setTags={(newTags) => setFormData({...formData, hard_skills: newTags})} 
                placeholder="Ketik skill (misal: React, Python) lalu tekan Enter"
                icon={Code}
              />
            </div>
            
            <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
              <label className="block text-base font-black text-emerald-900 mb-2">Soft Skills (Interpersonal)</label>
              <p className="text-sm text-emerald-600/80 mb-4">Tambahkan keterampilan kepemimpinan atau manajemen diri.</p>
              <TagInput 
                tags={formData.soft_skills} 
                setTags={(newTags) => setFormData({...formData, soft_skills: newTags})} 
                placeholder="Ketik skill (misal: Leadership, Problem Solving) lalu tekan Enter"
              />
            </div>
          </div>
        )}

        {/* Submit Area */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end items-center gap-4">
          {message && (
            <div className="text-emerald-600 font-bold flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
              <CheckCircle className="w-5 h-5" /> {message}
            </div>
          )}
          <button 
            type="submit" 
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {saving ? 'Memproses Data...' : 'Simpan Perubahan'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CandidateProfile;
