'use client';

import React, { useState } from 'react';
import { StatusTimeline, StatusLaporan } from '@/components/ui/timeline';
import { SiteHeader } from '@/components/site-header';
import { Search, Eye, AlertTriangle, FileSearch } from 'lucide-react';

export default function LacakLaporanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Mock Data untuk simulasi hasil pencarian
  const reportData = {
    nomorTiket: 'JBN-2023-0892',
    tanggalLaporan: '12 Okt 2023, 14:30 WIB',
    lokasi: 'Jl. Asia Afrika No. 65, Bandung',
    tingkatDarurat: 'Sedang',
    status: 'Penjemputan' as StatusLaporan,
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Header Navigasi */}
      <SiteHeader />

      {/* Konten Utama */}
      <main className="flex-grow bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Judul Halaman */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-normal text-gray-900 tracking-tight">Lacak Laporan Anda</h1>
            <p className="text-gray-500">Masukkan Nomor Tiket atau NIK Pelapor untuk melihat status terkini laporan Anda.</p>
          </div>

          {/* Form Pencarian (Diperbaiki) */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Masukkan Nomor Tiket atau NIK..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-none rounded-lg focus:outline-none focus:ring-0 text-gray-900 bg-transparent text-base"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#0A54A8] hover:bg-blue-800 text-white font-medium px-8 py-3.5 rounded-lg transition-colors flex items-center justify-center whitespace-nowrap shadow-sm"
              >
                Cari Laporan
              </button>
            </form>
          </div>

          {/* Kondisional Rendering: Empty State vs Hasil Pencarian */}
          {!hasSearched ? (
            
            /* --- EMPTY STATE (Sebelum Pencarian) --- */
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in duration-700">
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                <FileSearch className="w-16 h-16 text-[#0A54A8] opacity-80" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Belum Ada Data Laporan</h3>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Silakan lakukan pencarian menggunakan <span className="font-semibold text-gray-700">NIK</span> atau <span className="font-semibold text-gray-700">Nomor Tiket</span> pada kolom di atas untuk melacak status laporan Anda.
              </p>
            </div>

          ) : (

            /* --- HASIL PENCARIAN (Setelah Klik Cari) --- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Kiri: Card Detail Tiket */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-gray-500">Nomor Tiket</p>
                      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {reportData.status}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{reportData.nomorTiket}</h2>
                  </div>
                  
                  <hr className="border-gray-100 mb-6" />

                  <div className="space-y-5 flex-grow">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tanggal Laporan</p>
                      <p className="text-sm font-medium text-gray-900">{reportData.tanggalLaporan}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Lokasi Temuan</p>
                      <p className="text-sm font-medium text-gray-900">{reportData.lokasi}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tingkat Darurat</p>
                      <div className="flex items-center gap-1.5 text-yellow-500">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-medium">{reportData.tingkatDarurat}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-8 py-2.5 px-4 border border-[#0A54A8] text-[#0A54A8] bg-transparent hover:bg-blue-50 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    Lihat Detail
                  </button>
                </div>
              </div>

              {/* Kanan: Card Status Riwayat (Timeline) */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Riwayat Laporan</h3>
                  <StatusTimeline currentStatus={reportData.status} />
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}