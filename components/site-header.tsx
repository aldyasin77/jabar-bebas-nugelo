'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
//import { Shield } from 'lucide-react'; // Gunakan icon yang paling mirip untuk logo

export function SiteHeader() {
  const pathname = usePathname();

  // Daftar menu navigasi
  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Buat Laporan', href: '/lapor' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Cek Laporan', href: '/lacak' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          
          {/* Logo Asli yang sudah diperbesar */}
          <Image 
            src="/logo.png" 
            alt="Logo Jabar Bebas NuGelo" 
            width={64} // <<-- (Opsional) Sesuaikan nilai width target agar sinkron
            height={64} // <<-- (Opsional) Sesuaikan nilai height target agar sinkron
            className="w-18 h-18 object-contain" // <<-- KELAS UKURAN BARU
            priority 
          />

          <div className="flex flex-col">
            {/* ... teks teks ... */}
          </div>
        </Link>
          {/* Navigation Menu (Desktop) */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0A54A8]' // Style saat aktif
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' // Style normal
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="flex items-center">
            <Link
              href="/login"
              className="hidden md:inline-flex bg-[#0A54A8] hover:bg-blue-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Masuk Dashboard
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}