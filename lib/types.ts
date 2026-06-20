export type ReportStatusKey =
  | 'diterima'
  | 'diteruskan'
  | 'penjemputan'
  | 'perawatan'
  | 'selesai'

export const STATUS_FLOW: {
  key: ReportStatusKey
  label: string
  description: string
}[] = [
  {
    key: 'diterima',
    label: 'Laporan Diterima',
    description: 'Laporan diterima dan diverifikasi oleh Dinsos Provinsi.',
  },
  {
    key: 'diteruskan',
    label: 'Diteruskan ke Kab/Kota',
    description: 'Laporan diteruskan ke Dinsos Kabupaten/Kota terkait.',
  },
  {
    key: 'penjemputan',
    label: 'Proses Penjemputan',
    description: 'Tim lapangan melakukan penjemputan ODGJ.',
  },
  {
    key: 'perawatan',
    label: 'Perawatan RSJ',
    description: 'ODGJ menjalani perawatan di RSJ Cisarua.',
  },
  {
    key: 'selesai',
    label: 'Diserahkan ke Keluarga',
    description: 'Kasus selesai, ODGJ diserahkan ke keluarga atau panti.',
  },
]

export type EmergencyLevel = 'darurat' | 'sedang' | 'rendah'

export interface TimelineEntry {
  status: ReportStatusKey
  date: string // ISO
  note?: string
  done: boolean
}

export interface Report {
  ticket: string
  reporterNik: string
  reporterName: string
  reporterPhone: string
  odgjName?: string
  odgjAlias?: string
  gender: 'Laki-laki' | 'Perempuan'
  ageRange: string
  foundDate: string // ISO
  city: string
  district: string
  village: string
  address: string
  coordinates?: string
  livingStatus: string
  behaviors: string[]
  dangerToSelf: boolean
  dangerToOthers: boolean
  needsEmergency: boolean
  economy: string
  emergency: EmergencyLevel
  currentStatus: ReportStatusKey
  createdAt: string // ISO
  timeline: TimelineEntry[]
}
