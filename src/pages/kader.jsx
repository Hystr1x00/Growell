import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Save, RefreshCw, AlertCircle, CheckCircle2, TrendingUp, Users, Calendar, Search, Plus, FileText, BarChart3, ChevronDown, LogOut } from 'lucide-react';
import growellLogo from '../assets/Growell (1).png';
import Breadcrumb from '../components/common/Breadcrumb';
import CustomDatePicker from '../components/forms/CustomDatePicker';
import CustomDropdown from '../components/forms/CustomDropdown';
import { clearAuth } from '../utils/auth';

export default function KaderDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('input');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const resultSectionRef = useRef(null);
  const [formData, setFormData] = useState({
    namaAnak: '',
    nik: '',
    tanggalLahir: '',
    jenisKelamin: '',
    beratBadan: '',
    tinggiBadan: '',
    lingkarKepala: '',
    usiaBulan: '',
    asiEkslusif: '',
    imunisasiLengkap: '',
    riwayatPenyakit: '',
    pendidikanIbu: '',
    pendapatanKeluarga: ''
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [recentData, setRecentData] = useState([
    { id: 1, nama: 'Ahmad Fauzi', usia: '24 bulan', status: 'Normal', tanggal: '2025-01-15' },
    { id: 2, nama: 'Siti Nurhaliza', usia: '18 bulan', status: 'Risiko Stunting', tanggal: '2025-01-14' },
    { id: 3, nama: 'Budi Santoso', usia: '36 bulan', status: 'Normal', tanggal: '2025-01-13' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Simulate prediction (backend will handle this)
    const mockPrediction = {
      status: Math.random() > 0.5 ? 'normal' : 'stunting',
      confidence: (Math.random() * 30 + 70).toFixed(1),
      zScore: (Math.random() * 2 - 3).toFixed(2),
      recommendations: []
    };

    if (mockPrediction.status === 'stunting') {
      mockPrediction.recommendations = [
        'Rujuk ke Puskesmas untuk pemeriksaan lebih lanjut',
        'Berikan makanan bergizi tinggi protein',
        'Konseling gizi untuk orang tua',
        'Pantau pertumbuhan setiap bulan',
        'Pastikan ASI/susu formula cukup'
      ];
    } else {
      mockPrediction.recommendations = [
        'Lanjutkan pola makan bergizi seimbang',
        'Pantau pertumbuhan rutin setiap 3 bulan',
        'Pastikan imunisasi sesuai jadwal',
        'Stimulasi tumbuh kembang secara optimal'
      ];
    }

    setPredictionResult(mockPrediction);
    setActiveTab('result');
    
    // Auto scroll to result section after a short delay to ensure DOM is updated
    setTimeout(() => {
      if (resultSectionRef.current) {
        const element = resultSectionRef.current;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset untuk header
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  const handleReset = () => {
    setFormData({
      namaAnak: '',
      nik: '',
      tanggalLahir: '',
      jenisKelamin: '',
      beratBadan: '',
      tinggiBadan: '',
      lingkarKepala: '',
      usiaBulan: '',
      asiEkslusif: '',
      imunisasiLengkap: '',
      riwayatPenyakit: '',
      pendidikanIbu: '',
      pendapatanKeluarga: ''
    });
    setPredictionResult(null);
  };

  // Handle click outside for profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleProfile = () => {
    setProfileDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center space-x-3 sm:space-x-4 hover:opacity-80 transition-opacity">
              <img
                src={growellLogo}
                alt="Growell Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Growell Kader
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Dashboard Pemantauan Stunting</p>
              </div>
            </Link>
            <div className="relative" ref={profileDropdownRef}>
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="px-4 py-2 text-gray-600 hover:text-cyan-600 transition flex items-center gap-2 text-sm sm:text-base hover:bg-gray-50 rounded-lg"
              >
                <User size={20} />
                <span className="hidden sm:inline">Profile</span>
                <ChevronDown 
                  className={`text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'transform rotate-180' : ''}`} 
                  size={16} 
                />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[9999]">
                  <button
                    onClick={handleProfile}
                    className="w-full px-4 py-3 text-left transition-all hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                  >
                    <User size={18} className="text-cyan-600" />
                    <span className="font-medium">Profile</span>
                  </button>
                  <div className="border-t border-gray-200"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left transition-all hover:bg-red-50 flex items-center gap-3 text-red-600"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
            </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Dashboard', path: '/kader' }]} />
      </div>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { icon: <Users className="text-cyan-600" size={24} />, label: 'Total Anak', value: '156', bg: 'from-cyan-50 to-cyan-100' },
            { icon: <CheckCircle2 className="text-green-600" size={24} />, label: 'Status Normal', value: '142', bg: 'from-green-50 to-green-100' },
            { icon: <AlertCircle className="text-orange-600" size={24} />, label: 'Risiko Stunting', value: '14', bg: 'from-orange-50 to-orange-100' },
            { icon: <TrendingUp className="text-blue-600" size={24} />, label: 'Pemeriksaan Bulan Ini', value: '48', bg: 'from-blue-50 to-blue-100' }
          ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.bg} p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm`}>
              <div className="flex items-center justify-between mb-2">
                {stat.icon}
                <span className="text-xl sm:text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              {/* Tabs */}
              <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b overflow-x-auto">
                <button
                  onClick={() => setActiveTab('input')}
                  className={`px-4 sm:px-6 py-3 font-semibold transition whitespace-nowrap text-sm sm:text-base ${
                    activeTab === 'input'
                      ? 'text-cyan-600 border-b-2 border-cyan-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Plus className="inline mr-2" size={18} />
                  Input Data
                </button>
                <button
                  onClick={() => setActiveTab('result')}
                  className={`px-4 sm:px-6 py-3 font-semibold transition whitespace-nowrap text-sm sm:text-base ${
                    activeTab === 'result'
                      ? 'text-cyan-600 border-b-2 border-cyan-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  disabled={!predictionResult}
                >
                  <FileText className="inline mr-2" size={18} />
                  Hasil Prediksi
                </button>
              </div>

              {/* Input Form */}
              {activeTab === 'input' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Data Identitas Anak</h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap Anak</label>
                        <input
                          type="text"
                          name="namaAnak"
                          value={formData.namaAnak}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all shadow-sm hover:border-gray-300 hover:shadow-md text-gray-900"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">NIK Anak</label>
                        <input
                          type="text"
                          name="nik"
                          value={formData.nik}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all shadow-sm hover:border-gray-300 hover:shadow-md text-gray-900"
                          placeholder="16 digit NIK"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Lahir</label>
                        <CustomDatePicker
                          name="tanggalLahir"
                          value={formData.tanggalLahir}
                          onChange={handleInputChange}
                          placeholder="Pilih Tanggal Lahir"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
                        <CustomDropdown
                          name="jenisKelamin"
                          value={formData.jenisKelamin}
                          onChange={handleInputChange}
                          placeholder="Pilih Jenis Kelamin"
                          options={[
                            { value: 'L', label: 'Laki-laki' },
                            { value: 'P', label: 'Perempuan' }
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Data Antropometri</h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Berat Badan (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          name="beratBadan"
                          value={formData.beratBadan}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all shadow-sm hover:border-gray-300 hover:shadow-md text-gray-900"
                          placeholder="Contoh: 12.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tinggi Badan (cm)</label>
                        <input
                          type="number"
                          step="0.1"
                          name="tinggiBadan"
                          value={formData.tinggiBadan}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all shadow-sm hover:border-gray-300 hover:shadow-md text-gray-900"
                          placeholder="Contoh: 85.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Lingkar Kepala (cm)</label>
                        <input
                          type="number"
                          step="0.1"
                          name="lingkarKepala"
                          value={formData.lingkarKepala}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all shadow-sm hover:border-gray-300 hover:shadow-md text-gray-900"
                          placeholder="Contoh: 46.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Usia (bulan)</label>
                        <input
                          type="number"
                          name="usiaBulan"
                          value={formData.usiaBulan}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all shadow-sm hover:border-gray-300 hover:shadow-md text-gray-900"
                          placeholder="Contoh: 24"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Riwayat Kesehatan & Sosial</h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ASI Eksklusif</label>
                        <CustomDropdown
                          name="asiEkslusif"
                          value={formData.asiEkslusif}
                          onChange={handleInputChange}
                          placeholder="Pilih Status"
                          options={[
                            { value: 'ya', label: 'Ya (0-6 bulan)' },
                            { value: 'tidak', label: 'Tidak' }
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Imunisasi Lengkap</label>
                        <CustomDropdown
                          name="imunisasiLengkap"
                          value={formData.imunisasiLengkap}
                          onChange={handleInputChange}
                          placeholder="Pilih Status"
                          options={[
                            { value: 'lengkap', label: 'Lengkap' },
                            { value: 'tidak_lengkap', label: 'Tidak Lengkap' }
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Riwayat Penyakit</label>
                        <CustomDropdown
                          name="riwayatPenyakit"
                          value={formData.riwayatPenyakit}
                          onChange={handleInputChange}
                          placeholder="Pilih Riwayat"
                          options={[
                            { value: 'tidak_ada', label: 'Tidak Ada' },
                            { value: 'diare', label: 'Diare Kronis' },
                            { value: 'ispa', label: 'ISPA Berulang' },
                            { value: 'lainnya', label: 'Lainnya' }
                          ]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pendidikan Ibu</label>
                        <CustomDropdown
                          name="pendidikanIbu"
                          value={formData.pendidikanIbu}
                          onChange={handleInputChange}
                          placeholder="Pilih Pendidikan"
                          options={[
                            { value: 'sd', label: 'SD/Sederajat' },
                            { value: 'smp', label: 'SMP/Sederajat' },
                            { value: 'sma', label: 'SMA/Sederajat' },
                            { value: 'diploma', label: 'Diploma/S1' }
                          ]}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pendapatan Keluarga per Bulan</label>
                        <CustomDropdown
                          name="pendapatanKeluarga"
                          value={formData.pendapatanKeluarga}
                          onChange={handleInputChange}
                          placeholder="Pilih Pendapatan"
                          options={[
                            { value: '<1jt', label: 'Kurang dari Rp 1.000.000' },
                            { value: '1-3jt', label: 'Rp 1.000.000 - Rp 3.000.000' },
                            { value: '3-5jt', label: 'Rp 3.000.000 - Rp 5.000.000' },
                            { value: '>5jt', label: 'Lebih dari Rp 5.000.000' }
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <BarChart3 size={20} />
                      Prediksi Status Stunting
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-cyan-500 hover:text-cyan-600 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <RefreshCw size={20} />
                      Reset Form
                    </button>
                  </div>
                </div>
              )}

              {/* Result Tab */}
              {activeTab === 'result' && predictionResult && (
                <div ref={resultSectionRef} className="space-y-6">
                  {/* Status Card */}
                  <div className={`p-6 sm:p-8 rounded-2xl ${
                    predictionResult.status === 'stunting'
                      ? 'bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200'
                      : 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      {predictionResult.status === 'stunting' ? (
                        <AlertCircle className="text-orange-600 flex-shrink-0" size={40} />
                      ) : (
                        <CheckCircle2 className="text-green-600 flex-shrink-0" size={40} />
                      )}
                      <div>
                        <h3 className="text-xl sm:text-3xl font-bold text-gray-900">
                          {predictionResult.status === 'stunting' ? 'Risiko Stunting Terdeteksi' : 'Status Gizi Normal'}
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">Tingkat kepercayaan: {predictionResult.confidence}%</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Z-Score (TB/U):</span>
                        <span className={`text-2xl font-bold ${
                          parseFloat(predictionResult.zScore) < -2 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {predictionResult.zScore}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="text-cyan-600" />
                      Rekomendasi Tindakan
                    </h4>
                    <ul className="space-y-3">
                      {predictionResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle2 className="text-cyan-600 flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-700 text-sm sm:text-base">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2">
                      <Save size={20} />
                      Simpan Data
                    </button>
                    <button
                      onClick={() => setActiveTab('input')}
                      className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-cyan-500 hover:text-cyan-600 transition flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      Input Data Baru
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Recent Data */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Data Terbaru</h3>
                <Calendar className="text-cyan-600" size={20} />
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Cari nama..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentData.map((data) => (
                  <div key={data.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{data.nama}</h4>
                        <p className="text-xs text-gray-500 mt-1">Usia: {data.usia}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        data.status === 'Normal'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {data.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{data.tanggal}</div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/data-balita')}
                className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition text-sm"
              >
                Lihat Semua Data
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}