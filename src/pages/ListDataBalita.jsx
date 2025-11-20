import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, Eye, Calendar, Users, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import growellLogo from '../assets/Growell (1).png';
import Breadcrumb from '../components/common/Breadcrumb';
import CustomDropdown from '../components/forms/CustomDropdown';

export default function ListDataBalita() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Dummy data - lebih lengkap dari recentData
  const [dataBalita] = useState([
    { id: 1, nama: 'Ahmad Fauzi', usia: '24 bulan', status: 'Normal', tanggal: '2025-01-15', nik: '32010115012023001', berat: '12.5 kg', tinggi: '85 cm' },
    { id: 2, nama: 'Siti Nurhaliza', usia: '18 bulan', status: 'Risiko Stunting', tanggal: '2025-01-14', nik: '32010114062023002', berat: '9.2 kg', tinggi: '72 cm' },
    { id: 3, nama: 'Budi Santoso', usia: '36 bulan', status: 'Normal', tanggal: '2025-01-13', nik: '32010113012021003', berat: '15.8 kg', tinggi: '95 cm' },
    { id: 4, nama: 'Dewi Lestari', usia: '30 bulan', status: 'Normal', tanggal: '2025-01-12', nik: '32010112072022004', berat: '13.2 kg', tinggi: '88 cm' },
    { id: 5, nama: 'Rizki Pratama', usia: '12 bulan', status: 'Risiko Stunting', tanggal: '2025-01-11', nik: '32010111012024005', berat: '7.8 kg', tinggi: '68 cm' },
    { id: 6, nama: 'Putri Ayu', usia: '42 bulan', status: 'Normal', tanggal: '2025-01-10', nik: '32010110032021006', berat: '16.5 kg', tinggi: '98 cm' },
    { id: 7, nama: 'Fajar Nugroho', usia: '20 bulan', status: 'Normal', tanggal: '2025-01-09', nik: '32010109092023007', berat: '11.2 kg', tinggi: '80 cm' },
    { id: 8, nama: 'Indah Sari', usia: '28 bulan', status: 'Risiko Stunting', tanggal: '2025-01-08', nik: '32010108082022008', berat: '10.5 kg', tinggi: '82 cm' },
    { id: 9, nama: 'Rizky Ramadhan', usia: '15 bulan', status: 'Normal', tanggal: '2025-01-07', nik: '32010107012024009', berat: '9.8 kg', tinggi: '75 cm' },
    { id: 10, nama: 'Sinta Dewi', usia: '33 bulan', status: 'Normal', tanggal: '2025-01-06', nik: '32010106032022010', berat: '14.2 kg', tinggi: '92 cm' },
    { id: 11, nama: 'Ahmad Rizki', usia: '22 bulan', status: 'Risiko Stunting', tanggal: '2025-01-05', nik: '32010105022023011', berat: '10.8 kg', tinggi: '78 cm' },
    { id: 12, nama: 'Nurul Hikmah', usia: '26 bulan', status: 'Normal', tanggal: '2025-01-04', nik: '32010104062023012', berat: '12.1 kg', tinggi: '84 cm' },
    { id: 13, nama: 'Muhammad Fauzan', usia: '19 bulan', status: 'Normal', tanggal: '2025-01-03', nik: '32010103092023013', berat: '10.5 kg', tinggi: '77 cm' },
    { id: 14, nama: 'Aisyah Putri', usia: '31 bulan', status: 'Risiko Stunting', tanggal: '2025-01-02', nik: '32010102032022014', berat: '11.8 kg', tinggi: '86 cm' },
    { id: 15, nama: 'Daffa Pratama', usia: '17 bulan', status: 'Normal', tanggal: '2025-01-01', nik: '32010101012024015', berat: '9.5 kg', tinggi: '73 cm' }
  ]);

  const filteredData = dataBalita.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nik.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'normal' && item.status === 'Normal') ||
                         (filterStatus === 'risiko' && item.status === 'Risiko Stunting');
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: dataBalita.length,
    normal: dataBalita.filter(d => d.status === 'Normal').length,
    risiko: dataBalita.filter(d => d.status === 'Risiko Stunting').length,
    bulanIni: dataBalita.filter(d => {
      const date = new Date(d.tanggal);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length
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
              <Link to="/" className="flex items-center space-x-3 sm:space-x-4 hover:opacity-80 transition-opacity">
                <img
                  src={growellLogo}
                  alt="Growell Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    Data Balita
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Daftar Lengkap Data Balita</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Data Balita', path: '/data-balita' }]} />
      </div>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { icon: <Users className="text-cyan-600" size={24} />, label: 'Total Anak', value: stats.total, bg: 'from-cyan-50 to-cyan-100' },
            { icon: <CheckCircle2 className="text-green-600" size={24} />, label: 'Status Normal', value: stats.normal, bg: 'from-green-50 to-green-100' },
            { icon: <AlertCircle className="text-orange-600" size={24} />, label: 'Risiko Stunting', value: stats.risiko, bg: 'from-orange-50 to-orange-100' },
            { icon: <TrendingUp className="text-blue-600" size={24} />, label: 'Pemeriksaan Bulan Ini', value: stats.bulanIni, bg: 'from-blue-50 to-blue-100' }
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
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari nama atau NIK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={20} />
              <div className="pl-10">
                <CustomDropdown
                  name="filterStatus"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  placeholder="Filter Status"
                  options={[
                    { value: 'all', label: 'Semua Status' },
                    { value: 'normal', label: 'Normal' },
                    { value: 'risiko', label: 'Risiko Stunting' }
                  ]}
                />
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2">
              <Download size={20} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">No</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Nama</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 hidden md:table-cell">NIK</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Usia</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 hidden lg:table-cell">Berat</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 hidden lg:table-cell">Tinggi</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 hidden sm:table-cell">Tanggal</th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-12 text-gray-500">
                      <Users size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-semibold">Tidak ada data ditemukan</p>
                      <p className="text-sm">Coba ubah kata kunci pencarian atau filter</p>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">{item.nama}</div>
                        <div className="text-xs text-gray-500 md:hidden mt-1">NIK: {item.nik}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 font-mono hidden md:table-cell">{item.nik}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{item.usia}</td>
                      <td className="py-4 px-4 text-sm text-gray-600 hidden lg:table-cell">{item.berat}</td>
                      <td className="py-4 px-4 text-sm text-gray-600 hidden lg:table-cell">{item.tinggi}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          item.status === 'Normal'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 hidden sm:table-cell">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-gray-400" />
                          {new Date(item.tanggal).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Menampilkan <span className="font-semibold">{filteredData.length}</span> dari <span className="font-semibold">{dataBalita.length}</span> data
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                  Sebelumnya
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-sm">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

