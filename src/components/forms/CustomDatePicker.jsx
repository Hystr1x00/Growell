import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CustomDatePicker({ value, onChange, name, placeholder = "Pilih Tanggal" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange({ target: { name, value: formattedDate } });
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    onChange({ target: { name, value: formattedDate } });
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange({ target: { name, value: '' } });
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];
  
  // Previous month days
  const prevMonthDays = getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }
  
  // Next month days
  const totalCells = 42; // 6 weeks * 7 days
  const remainingDays = totalCells - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }

  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const shortDayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  return (
    <div className="relative" ref={datePickerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 outline-none transition-all shadow-sm hover:border-gray-300 hover:shadow-md cursor-pointer flex items-center"
      >
        <CalendarIcon className="absolute left-4 text-gray-400 pointer-events-none" size={20} />
        <span className={selectedDate ? 'text-gray-900 font-medium' : 'text-gray-400'}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
      </div>

      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-[9998] sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed sm:absolute bottom-0 sm:bottom-auto left-0 sm:left-auto right-0 sm:right-auto sm:mt-2 sm:top-full z-[9999] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-gray-200 p-3 sm:p-4 w-full sm:w-[320px] animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-top-2 duration-200 max-h-[80vh] sm:max-h-none overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <div className="text-center">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
              </div>
              <button
                onClick={handleNextMonth}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronRight size={18} className="sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
              {shortDayNames.map((day, idx) => (
                <div key={idx} className="text-center text-[10px] sm:text-xs font-semibold text-gray-500 py-1 sm:py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {days.map(({ day, isCurrentMonth }, idx) => {
                const isSelected = selectedDate && 
                  isCurrentMonth &&
                  day === selectedDate.getDate() &&
                  currentMonth.getMonth() === selectedDate.getMonth() &&
                  currentMonth.getFullYear() === selectedDate.getFullYear();
                
                const isToday = isCurrentMonth &&
                  day === new Date().getDate() &&
                  currentMonth.getMonth() === new Date().getMonth() &&
                  currentMonth.getFullYear() === new Date().getFullYear();

                return (
                  <button
                    key={idx}
                    onClick={() => isCurrentMonth && handleDateSelect(day)}
                    disabled={!isCurrentMonth}
                    className={`
                      aspect-square flex items-center justify-center rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all
                      ${!isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-cyan-50'}
                      ${isSelected ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105 sm:scale-110' : ''}
                      ${isToday && !isSelected ? 'bg-cyan-100 text-cyan-700 font-bold' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Footer buttons */}
            <div className="flex gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <button
                onClick={handleToday}
                className="flex-1 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition text-xs sm:text-sm"
              >
                Hari Ini
              </button>
              <button
                onClick={handleClear}
                className="flex-1 px-3 sm:px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition text-xs sm:text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

