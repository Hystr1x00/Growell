import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Save, Camera, Edit2, Lock, Shield, Bell } from 'lucide-react';
import growellLogo from '../assets/Growell (1).png';
import Breadcrumb from '../components/common/Breadcrumb';

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: 'Kader Posyandu',
    email: 'kader@posyandu.com',
    phone: '+62 812-3456-7890',
    alamat: 'Jl. Posyandu No. 123, Jakarta Selatan',
    tanggalLahir: '1990-01-15',
    posyandu: 'Posyandu Melati',
    wilayah: 'Kelurahan Sukamaju',
    kodeKader: 'KDR-2024-001'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to backend
    console.log('Profile saved:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset form data
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => navigate('/kader')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img
                  src={growellLogo}
                  alt="Growell Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    Profile
                  </h1>
                </div>
              </Link>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 text-sm font-medium"
                >
                  <Save size={18} />
                  Simpan
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2 text-sm font-medium"
              >
                <Edit2 size={18} />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Profile', path: '/profile' }]} />
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {formData.nama.charAt(0).toUpperCase()}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition border-2 border-gray-200">
                  <Camera size={20} className="text-gray-700" />
                </button>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {formData.nama}
              </h2>
              <p className="text-gray-600 mb-4">{formData.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                  Kader Posyandu
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {formData.posyandu}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600 mt-1">Total Anak</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">142</div>
            <div className="text-sm text-gray-600 mt-1">Status Normal</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">14</div>
            <div className="text-sm text-gray-600 mt-1">Risiko Stunting</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">48</div>
            <div className="text-sm text-gray-600 mt-1">Bulan Ini</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <User className="text-cyan-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Informasi Pribadi</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.nama}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.email}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  Nomor Telepon
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.phone}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  Tanggal Lahir
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={formData.tanggalLahir}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                    {new Date(formData.tanggalLahir).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  Alamat
                </label>
                {isEditing ? (
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900 resize-none"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.alamat}</div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Informasi Profesional</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kode Kader</label>
                <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl text-gray-900 font-mono font-semibold border-2 border-cyan-200">
                  {formData.kodeKader}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Posyandu</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="posyandu"
                    value={formData.posyandu}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.posyandu}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Wilayah</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="wilayah"
                    value={formData.wilayah}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.wilayah}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Security & Settings */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Lock className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Keamanan & Pengaturan</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 sm:flex-initial px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition flex items-center justify-center gap-3">
              <Lock size={20} />
              Ubah Kata Sandi
            </button>
            <button className="flex-1 sm:flex-initial px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition flex items-center justify-center gap-3">
              <Bell size={20} />
              Pengaturan Notifikasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

