import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, Star, Heart, BarChart3, BookOpen, Shield, Clock, CheckCircle2, Play, User, LogOut, ChevronDown } from 'lucide-react';
import growellLogo from '../assets/Growell (1).png';
import { isAuthenticated, getUserData, clearAuth } from '../utils/auth';

export default function GrowellLanding() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  
  const sectionRefs = useRef({});

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      if (isAuthenticated()) {
        setIsLoggedIn(true);
        setUserData(getUserData());
      }
    };
    checkAuth();

    // Handle page load
    const handleLoad = () => {
      // Minimum loading time untuk UX yang lebih baik
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

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
    setIsLoggedIn(false);
    setUserData(null);
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const handleProfile = () => {
    setProfileDropdownOpen(false);
    navigate('/profile');
  };

  const handleDashboard = () => {
    setProfileDropdownOpen(false);
    navigate('/kader');
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section-id');
        if (!sectionId) return;
        
        setVisibleSections((prev) => {
          const newSet = new Set(prev);
          if (entry.isIntersecting) {
            newSet.add(sectionId);
          } else {
            // Hapus dari set saat keluar viewport agar animasi bisa muncul lagi
            newSet.delete(sectionId);
          }
          return newSet;
        });
      });
    }, observerOptions);

    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-all duration-1000 ease-out ${
        isLoading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center">
          <img
            src={growellLogo}
            alt="Growell Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Growell
          </h2>
        </div>
      </div>

      <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full bg-white/10 backdrop-blur-sm border-b border-white/20 shadow-lg z-50 transition-all duration-700 ease-out ${
        !isLoading 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img
                src={growellLogo}
                alt="Growell Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Growell
              </span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-cyan-600 transition font-medium">Layanan</a>
              <a href="#how" className="text-gray-600 hover:text-cyan-600 transition font-medium">Tentang</a>
              <a href="#testimonials" className="text-gray-600 hover:text-cyan-600 transition font-medium">Testimoni</a>
              <a href="#faq" className="text-gray-600 hover:text-cyan-600 transition font-medium">Bantuan</a>
              {isLoggedIn ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition flex items-center gap-2 font-semibold"
                  >
                    <User size={18} />
                    <span>{userData?.name || 'Profile'}</span>
                    <ChevronDown
                      className={`transition-transform duration-200 ${profileDropdownOpen ? 'transform rotate-180' : ''}`}
                      size={16}
                    />
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={handleDashboard}
                        className="w-full px-4 py-3 text-left transition-all hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                      >
                        <BarChart3 size={18} className="text-cyan-600" />
                        <span className="font-medium">Dashboard</span>
                      </button>
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
              ) : (
                <Link to="/register" className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition font-semibold">
                  Coba Gratis
                </Link>
              )}
            </div>

            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/10 backdrop-blur-xl border-t border-white/20">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-cyan-600 font-medium">Layanan</a>
              <a href="#how" className="block text-gray-600 hover:text-cyan-600 font-medium">Tentang</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-cyan-600 font-medium">Testimoni</a>
              <a href="#faq" className="block text-gray-600 hover:text-cyan-600 font-medium">Bantuan</a>
              {isLoggedIn ? (
                <>
                  <Link to="/kader" className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-center block">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="w-full px-6 py-3 border-2 border-cyan-500 text-cyan-600 rounded-xl font-semibold text-center block">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 bg-red-500 text-white rounded-xl font-semibold text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/register" className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-center block">
                  Coba Gratis
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        className={`pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all duration-1000 ease-out ${
          !isLoading 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
        style={{
          transitionDelay: !isLoading ? '300ms' : '0ms'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full">
                <span className="text-2xl">✨</span>
                <span className="text-sm sm:text-base font-semibold text-cyan-700">Platform Parenting Digital Indonesia</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Temani Setiap <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">Momen Tumbuh</span> Si Kecil
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Pantau milestone dan dapatkan panduan personal untuk mendukung perkembangan optimal buah hati Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center">
                  Mulai Perjalanan
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:border-cyan-500 hover:text-cyan-600 transition-all flex items-center justify-center gap-2">
                  <Play size={20} />
                  Lihat Demo
                </button>
              </div>
              <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">25K+</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Keluarga Bahagia</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">150+</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Expert Pediatrik</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start">
                    <Star className="text-yellow-400 fill-current" size={24} />
                    <span className="ml-1 text-3xl sm:text-4xl font-bold text-gray-900">4.9</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">Rating Pengguna</div>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-300 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
                <div className="aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=600&fit=crop" 
                    alt="Happy Family"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" size={24} />
                    <span className="font-semibold text-gray-900">Terverifikasi</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 hidden sm:block">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-600">Aman & Terpercaya</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        data-section-id="features"
        ref={(el) => (sectionRefs.current['features'] = el)}
        className={`py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 transition-all duration-1000 ease-out ${
          visibleSections.has('features') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
              Kenapa Memilih Growell?
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Layanan Unggulan Kami
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Solusi komprehensif untuk mendampingi perjalanan tumbuh kembang anak dengan teknologi terkini
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <BarChart3 className="text-cyan-600" size={36} />,
                title: "Growth Tracking",
                desc: "Monitor tinggi, berat, dan lingkar kepala anak dengan grafik interaktif WHO"
              },
              {
                icon: <Heart className="text-rose-600" size={36} />,
                title: "Personalized Recommendation",
                desc: "Dapatkan rekomendasi personal untuk mendukung perkembangan optimal anak Anda"
              },
              {
                icon: <BookOpen className="text-indigo-600" size={36} />,
                title: "Smart Learning",
                desc: "Rekomendasi aktivitas edukatif berdasarkan tahap perkembangan anak"
              },
              {
                icon: <Shield className="text-emerald-600" size={36} />,
                title: "Vaccination Alert",
                desc: "Pengingat jadwal imunisasi dan riwayat kesehatan lengkap"
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className={`group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 border border-gray-100 transition-all duration-700 ease-out ${
                  visibleSections.has('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: visibleSections.has('features') ? `${idx * 100}ms` : '0ms'
                }}
              >
                <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section 
        id="how" 
        data-section-id="how"
        ref={(el) => (sectionRefs.current['how'] = el)}
        className={`py-16 sm:py-20 lg:py-24 transition-all duration-1000 ease-out ${
          visibleSections.has('how') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Cara Kerja Platform
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Mudah Digunakan, Hasil Maksimal
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Hanya dengan tiga langkah sederhana untuk memulai perjalanan parenting yang lebih terorganisir
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {[
              { 
                num: "1", 
                title: "Registrasi Profil", 
                desc: "Daftarkan akun dan lengkapi informasi dasar tentang anak Anda dalam 2 menit",
                color: "from-cyan-500 to-blue-500"
              },
              { 
                num: "2", 
                title: "Input Milestone", 
                desc: "Catat perkembangan harian dan upload foto kenangan berharga si kecil",
                color: "from-blue-500 to-indigo-500"
              },
              { 
                num: "3", 
                title: "Terima Insight", 
                desc: "Dapatkan analisis AI dan saran personal dari para ahli kesehatan anak",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`relative text-center transition-all duration-700 ease-out ${
                  visibleSections.has('how')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: visibleSections.has('how') ? `${idx * 150}ms` : '0ms'
                }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white text-2xl sm:text-3xl font-bold mb-6 shadow-lg`}>
                  {step.num}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{step.desc}</p>
                {idx < 2 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-8 lg:-right-12 text-gray-300" size={32} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        id="testimonials" 
        data-section-id="testimonials"
        ref={(el) => (sectionRefs.current['testimonials'] = el)}
        className={`py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white transition-all duration-1000 ease-out ${
          visibleSections.has('testimonials') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Cerita Pengguna
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Dipercaya Ribuan Keluarga
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Dengarkan pengalaman nyata dari para orang tua yang telah merasakan manfaat Growell
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                name: "Sarah Aminah", 
                role: "Ibu dari Zahra (2 tahun)",
                text: "Growell benar-benar mengubah cara saya memantau perkembangan Zahra. Fitur grafik pertumbuhan sangat membantu dan konsultasi dengan dokter sangat responsif. Recommended banget!",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              },
              { 
                name: "Budi Santoso", 
                role: "Ayah dari Arkan (4 tahun)",
                text: "Sebagai ayah yang sibuk, Growell memudahkan saya tetap terlibat dalam tumbuh kembang Arkan. Notifikasi imunisasi dan milestone tracker sangat berguna. Worth it!",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              },
              { 
                name: "Dewi Lestari", 
                role: "Ibu dari kembar Adit & Adis (1 tahun)",
                text: "Mengurus anak kembar jadi lebih terorganisir dengan Growell. Bisa tracking keduanya sekaligus, plus dapat tips nutrisi yang sesuai usia mereka. Amazing platform!",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
              }
            ].map((testimonial, idx) => (
              <div 
                key={idx} 
                className={`bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 ease-out ${
                  visibleSections.has('testimonials')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: visibleSections.has('testimonials') ? `${idx * 100}ms` : '0ms'
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={18} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section 
        id="faq" 
        data-section-id="faq"
        ref={(el) => (sectionRefs.current['faq'] = el)}
        className={`py-16 sm:py-20 lg:py-24 transition-all duration-1000 ease-out ${
          visibleSections.has('faq') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Temukan jawaban untuk pertanyaan umum seputar Growell
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              { 
                q: "Bagaimana cara menggunakan Growell?", 
                a: "Cara menggunakan Growell sangat mudah! Daftarkan akun Anda, lengkapi profil anak, lalu mulai catat milestone dan perkembangan si kecil. Platform akan memberikan rekomendasi personal berdasarkan data yang Anda input."
              },
              { 
                q: "Apakah data anak saya aman dan privasi terjaga?", 
                a: "Ya, keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi end-to-end dan mematuhi standar keamanan internasional. Data Anda tersimpan di server tersertifikasi dan tidak akan dibagikan kepada pihak ketiga tanpa izin eksplisit."
              },
              { 
                q: "Fitur apa saja yang tersedia di Growell?", 
                a: "Growell menyediakan berbagai fitur seperti Growth Tracking untuk memantau tinggi, berat, dan lingkar kepala anak, Personalized Recommendation untuk saran perkembangan, Smart Learning untuk aktivitas edukatif, dan Vaccination Alert untuk pengingat imunisasi."
              },
              { 
                q: "Apakah Growell gratis untuk digunakan?", 
                a: "Saat ini Growell masih dalam tahap pengembangan dan dapat digunakan secara gratis. Kami fokus untuk memberikan pengalaman terbaik dalam memantau tumbuh kembang anak Anda."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-gradient-to-r from-gray-50 to-blue-50 p-6 sm:p-8 rounded-2xl hover:shadow-lg transition-all duration-700 ease-out border border-gray-100 ${
                  visibleSections.has('faq')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: visibleSections.has('faq') ? `${idx * 100}ms` : '0ms'
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        data-section-id="cta"
        ref={(el) => (sectionRefs.current['cta'] = el)}
        className={`py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 relative overflow-hidden transition-all duration-1000 ease-out ${
          visibleSections.has('cta') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDMwaC02VjM2aDZ2MjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Siap Memulai Perjalanan Bersama Growell?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan 25.000+ keluarga yang telah mempercayakan tumbuh kembang anak mereka pada Growell
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="group px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center">
              Daftar Gratis Sekarang
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2">
              <Clock size={20} />
              Jadwalkan Demo
            </button>
          </div>
          <p className="mt-6 text-white/80 text-sm">
            ✓ Gratis 14 hari trial • ✓ Tidak perlu kartu kredit • ✓ Batal kapan saja
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl"></div>
                <span className="text-xl font-bold">Growell</span>
              </div>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">
                Platform parenting digital terpercaya untuk mendampingi setiap momen tumbuh kembang anak Anda
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition">
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-cyan-400 transition">Fitur Unggulan</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Paket Harga</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Download App</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Artikel Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-cyan-400 transition">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Tim Expert</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Karir</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Press Kit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Dukungan</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-cyan-400 transition">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Hubungi Kami</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Syarat & Ketentuan</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2025 Growell Indonesia. All rights reserved.</p>
            <p>Made with ❤️ for Indonesian Families</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

