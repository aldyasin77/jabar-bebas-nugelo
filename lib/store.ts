import type { Report, ReportStatusKey, TimelineEntry } from './types'
import { STATUS_FLOW } from './types'

function buildTimeline(
  current: ReportStatusKey,
  baseDate: Date,
  notes: Partial<Record<ReportStatusKey, string>> = {},
): TimelineEntry[] {
  const currentIndex = STATUS_FLOW.findIndex((s) => s.key === current)
  return STATUS_FLOW.map((s, i) => {
    const date = new Date(baseDate)
    date.setDate(date.getDate() + i * 3)
    return {
      status: s.key,
      date: date.toISOString(),
      note: notes[s.key],
      done: i < currentIndex,
    }
  }).filter((_, i) => i <= currentIndex)
}

// In-memory mock database (seeded). Persists for the browser session.
const seed: Report[] = [
  {
    ticket: 'JBN-2026-0001',
    reporterNik: '3273011203900001',
    reporterName: 'Budi Santoso',
    reporterPhone: '081234567890',
    odgjName: 'Tidak Diketahui',
    odgjAlias: 'Pak Kumis',
    gender: 'Laki-laki',
    ageRange: 'Dewasa (31-45)',
    foundDate: '2026-06-08T00:00:00.000Z',
    city: 'Kota Bandung',
    district: 'Coblong',
    village: 'Dago',
    address: 'Trotoar depan pasar, Jl. Ir. H. Juanda No. 110',
    coordinates: '-6.8915, 107.6107',
    livingStatus: 'Tuna Wisma',
    behaviors: ['Gelisah', 'Halusinasi'],
    dangerToSelf: true,
    dangerToOthers: false,
    needsEmergency: true,
    economy: 'Bawah',
    emergency: 'darurat',
    currentStatus: 'perawatan',
    createdAt: '2026-06-08T09:24:00.000Z',
    timeline: buildTimeline('perawatan', new Date('2026-06-08T09:24:00.000Z'), {
      diteruskan: 'Diteruskan ke Dinsos Kota Bandung.',
      penjemputan: 'Dijemput tim lapangan pukul 14:00.',
      perawatan: 'Masuk RSJ Cisarua untuk observasi 14 hari.',
    }),
  },
  {
    ticket: 'JBN-2026-0002',
    reporterNik: '3275042508920002',
    reporterName: 'Siti Aminah',
    reporterPhone: '085600011122',
    odgjName: 'Rahmat',
    odgjAlias: '',
    gender: 'Laki-laki',
    ageRange: 'Dewasa Muda (18-30)',
    foundDate: '2026-06-15T00:00:00.000Z',
    city: 'Kota Bekasi',
    district: 'Bekasi Selatan',
    village: 'Pekayon Jaya',
    address: 'Taman kota dekat halte, Jl. Ahmad Yani',
    coordinates: '-6.2615, 106.9756',
    livingStatus: 'Tidak Diketahui',
    behaviors: ['Tenang'],
    dangerToSelf: false,
    dangerToOthers: false,
    needsEmergency: false,
    economy: 'Menengah Kebawah',
    emergency: 'rendah',
    currentStatus: 'diteruskan',
    createdAt: '2026-06-15T16:05:00.000Z',
    timeline: buildTimeline(
      'diteruskan',
      new Date('2026-06-15T16:05:00.000Z'),
      { diteruskan: 'Diteruskan ke Dinsos Kota Bekasi untuk penjadwalan.' },
    ),
  },
  {
    ticket: 'JBN-2026-0003',
    reporterNik: '3204061710880003',
    reporterName: 'Dewi Lestari',
    reporterPhone: '081299988877',
    odgjName: 'Tidak Diketahui',
    odgjAlias: 'Bu Enok',
    gender: 'Perempuan',
    ageRange: 'Paruh Baya (46-60)',
    foundDate: '2026-05-20T00:00:00.000Z',
    city: 'Kabupaten Bandung',
    district: 'Baleendah',
    village: 'Andir',
    address: 'Kolong jembatan, Jl. Raya Banjaran',
    coordinates: '-7.0123, 107.6203',
    livingStatus: 'Tuna Wisma',
    behaviors: ['Tenang', 'Gelisah'],
    dangerToSelf: false,
    dangerToOthers: false,
    needsEmergency: false,
    economy: 'Bawah',
    emergency: 'sedang',
    currentStatus: 'selesai',
    createdAt: '2026-05-20T11:30:00.000Z',
    timeline: buildTimeline('selesai', new Date('2026-05-20T11:30:00.000Z'), {
      perawatan: 'Perawatan 14 hari di RSJ Cisarua.',
      selesai: 'Diserahkan kembali ke keluarga di Kab. Bandung.',
    }),
  },
]

const reports: Report[] = [...seed]
let counter = seed.length

export function getReports(): Report[] {
  return reports
}

export function findReports(query: string): Report[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return reports.filter(
    (r) =>
      r.ticket.toLowerCase() === q ||
      r.ticket.toLowerCase().includes(q) ||
      r.reporterNik === query.trim(),
  )
}

export function findReportByTicket(ticket: string): Report | undefined {
  return reports.find((r) => r.ticket.toLowerCase() === ticket.toLowerCase())
}

export type NewReportInput = Omit<
  Report,
  'ticket' | 'emergency' | 'currentStatus' | 'createdAt' | 'timeline'
>

export function createReport(input: NewReportInput): Report {
  counter += 1
  const ticket = `JBN-2026-${String(counter).padStart(4, '0')}`
  const emergency = input.needsEmergency
    ? 'darurat'
    : input.dangerToOthers || input.dangerToSelf
      ? 'sedang'
      : 'rendah'
  const now = new Date()
  const report: Report = {
    ...input,
    ticket,
    emergency,
    currentStatus: 'diterima',
    createdAt: now.toISOString(),
    timeline: [
      {
        status: 'diterima',
        date: now.toISOString(),
        note: 'Laporan berhasil dibuat dan menunggu verifikasi Dinsos Provinsi.',
        done: false,
      },
    ],
  }
  reports.unshift(report)
  return report
}
