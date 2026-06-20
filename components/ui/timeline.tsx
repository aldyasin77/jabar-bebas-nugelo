import React from 'react';
import { Check, Truck, PlusSquare, Flag } from 'lucide-react';

export type StatusLaporan = 'Diterima' | 'Diteruskan' | 'Penjemputan' | 'Perawatan' | 'Selesai';

const TIMELINE_DATA = [
  { status: 'Diterima', title: 'Laporan Diterima', desc: 'Laporan Anda telah masuk ke dalam sistem dan menunggu verifikasi admin.', icon: Check },
  { status: 'Diteruskan', title: 'Diteruskan ke Tim Lapangan', desc: 'Laporan terverifikasi dan didisposisikan ke Tim Dinsos Kota Bandung.', icon: Check },
  { status: 'Penjemputan', title: 'Proses Penjemputan', desc: 'Tim lapangan sedang menuju lokasi untuk melakukan asesmen dan penjemputan.', icon: Truck },
  { status: 'Perawatan', title: 'Perawatan RSJ', desc: 'Menunggu proses penjemputan selesai.', icon: PlusSquare },
  { status: 'Selesai', title: 'Selesai', desc: 'Kasus ditutup.', icon: Flag },
];

interface TimelineProps {
  currentStatus: StatusLaporan;
}

export function StatusTimeline({ currentStatus }: TimelineProps) {
  const currentIndex = TIMELINE_DATA.findIndex(item => item.status === currentStatus);

  return (
    <div className="relative space-y-4">
      {/* Garis Vertikal Latar Belakang */}
      <div className="absolute left-[1.125rem] top-6 bottom-6 w-px bg-gray-200 z-0"></div>

      {TIMELINE_DATA.map((item, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;
        const Icon = item.icon;

        return (
          <div key={item.status} className="relative z-10 flex gap-4">
            {/* Ikon Status */}
            <div className="flex-shrink-0 mt-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm
                ${isCompleted || isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                <Icon size={16} strokeWidth={isCompleted || isCurrent ? 3 : 2} />
              </div>
            </div>

            {/* Konten Card Status */}
            <div className={`flex-1 p-4 rounded-lg
              ${isCompleted ? 'bg-gray-50' : ''}
              ${isCurrent ? 'bg-blue-50/50 border-l-4 border-blue-600 shadow-sm' : ''}
              ${isFuture ? 'bg-transparent border border-dashed border-gray-300' : ''}
            `}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                <h4 className={`font-semibold ${isCurrent ? 'text-blue-700' : isFuture ? 'text-gray-500' : 'text-gray-900'}`}>
                  {item.title}
                </h4>
                {/* Waktu (Mockup data statis untuk visualisasi) */}
                {!isFuture && (
                  <span className={`text-sm mt-1 sm:mt-0 ${isCurrent ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    {isCurrent ? 'Hari ini, 09:00' : index === 0 ? '12 Okt, 14:30' : '12 Okt, 15:10'}
                  </span>
                )}
              </div>
              <p className={`text-sm ${isFuture ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}