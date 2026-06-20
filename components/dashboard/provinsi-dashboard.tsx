'use client'

import { useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { AlertCircle, ChevronRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type EmergencyLevel = 'darurat' | 'sedang' | 'rendah'

type ProvinceReport = {
  ticket: string
  date: string
  location: string
  emergency: EmergencyLevel
  districtTarget: string
}

const REPORTS: ProvinceReport[] = [
  {
    ticket: 'ODGJ-2026-001',
    date: '2026-06-20',
    location: 'Kota Bandung',
    emergency: 'darurat',
    districtTarget: 'Kab. Bandung Barat',
  },
  {
    ticket: 'ODGJ-2026-002',
    date: '2026-06-19',
    location: 'Kab. Bogor',
    emergency: 'sedang',
    districtTarget: 'Kab. Bogor',
  },
  {
    ticket: 'ODGJ-2026-003',
    date: '2026-06-18',
    location: 'Kota Cimahi',
    emergency: 'rendah',
    districtTarget: 'Kota Cimahi',
  },
]

const METRICS = [
  { label: 'Total Laporan Masuk', value: '128' },
  { label: 'Menunggu Diteruskan', value: '24' },
  { label: 'Selesai', value: '89' },
]

const EMERGENCY_STYLE: Record<EmergencyLevel, string> = {
  darurat: 'border-[#C62828] bg-[#C62828] text-white',
  sedang: 'border-[#FBC02D] bg-[#FFF4D7] text-[#7A4A00]',
  rendah: 'border-[#E0E0E0] bg-white text-[#616161]',
}

const DESTINATIONS = [
  'Kab. Bandung',
  'Kab. Bandung Barat',
  'Kab. Bogor',
  'Kab. Cianjur',
  'Kota Bandung',
  'Kota Cimahi',
]

function formatDisplayDate(value: string) {
  const parsed = parseISO(value)
  if (Number.isNaN(parsed.getTime())) return '-'
  return format(parsed, 'MMM dd, yyyy')
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-[#616161]">{label}</p>
        <p className="mt-2 text-3xl font-bold tracking-tight text-[#1565C0]">{value}</p>
      </CardContent>
    </Card>
  )
}

function EmergencyChip({ level }: { level: EmergencyLevel }) {
  const label = level === 'darurat' ? 'Darurat' : level === 'sedang' ? 'Sedang' : 'Rendah'
  return (
    <Badge className={cn('border text-xs font-semibold', EMERGENCY_STYLE[level])}>
      {label}
    </Badge>
  )
}

export function ProvinsiDashboard() {
  const [selectedReport, setSelectedReport] = useState<ProvinceReport | null>(null)
  const [open, setOpen] = useState(false)
  const [destination, setDestination] = useState('')
  const [note, setNote] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const openDisposition = (report: ProvinceReport) => {
    setSelectedReport(report)
    setDestination(report.districtTarget)
    setNote('')
    setSuccessMessage('')
    setOpen(true)
  }

  const metrics = useMemo(() => METRICS, [])

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#616161]">
          Dashboard Admin Dinsos Provinsi
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#212121]">
          Role Dispatcher
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#616161]">
          Fokus pada monitoring laporan baru dan disposisi cepat ke Dinsos Kab/Kota tujuan.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} />
        ))}
      </div>

      <Card className="mt-6 border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
        <CardHeader className="border-b border-[#E0E0E0] pb-4">
          <CardTitle className="text-lg text-[#212121]">Daftar Laporan Baru</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-[#FAFAFA] text-left text-xs font-semibold uppercase tracking-wide text-[#616161]">
                  <th className="px-4 py-3">Tiket</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Lokasi</th>
                  <th className="px-4 py-3">Tingkat Darurat</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {REPORTS.map((report) => (
                  <tr key={report.ticket} className="border-b border-[#E0E0E0] last:border-b-0">
                    <td className="px-4 py-4 text-sm font-bold text-[#212121]">{report.ticket}</td>
                    <td className="px-4 py-4 text-sm text-[#212121]">
                      {formatDisplayDate(report.date)}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#212121]">{report.location}</td>
                    <td className="px-4 py-4">
                      <EmergencyChip level={report.emergency} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button
                        size="sm"
                        className="h-8 bg-[#1565C0] px-3 text-xs text-white hover:bg-[#0D47A1]"
                        onClick={() => openDisposition(report)}
                      >
                        Teruskan Laporan
                        <ChevronRight className="size-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg border border-[#E0E0E0] bg-white p-0">
          <DialogHeader className="border-b border-[#E0E0E0] px-5 py-4">
            <DialogTitle className="text-lg text-[#212121]">Disposisi Laporan</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 px-5 py-4">
            <div className="rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] p-4 text-sm text-[#616161]">
              {selectedReport ? (
                <>
                  <p className="font-semibold text-[#212121]">{selectedReport.ticket}</p>
                  <p>{selectedReport.location} - {formatDisplayDate(selectedReport.date)}</p>
                </>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#212121]">
                Pilih Dinsos Kab/Kota Tujuan
              </label>
              <Select
                value={destination}
                onValueChange={(value) => setDestination(value ?? '')}
              >
                <SelectTrigger className="h-10 w-full border-[#BDBDBD] bg-white">
                  <SelectValue placeholder="Pilih tujuan disposisi" />
                </SelectTrigger>
                <SelectContent>
                  {DESTINATIONS.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#212121]">Catatan Disposisi</label>
              <Textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Tambahkan arahan singkat untuk petugas tujuan"
                className="min-h-28 border-[#BDBDBD] bg-white"
              />
            </div>
          </div>

          <DialogFooter className="border-t border-[#E0E0E0] bg-[#FAFAFA] px-5 py-4">
            <Button
              variant="tertiary"
              className="h-10 px-4 text-sm"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button
              className="h-10 bg-[#1565C0] px-4 text-sm text-white hover:bg-[#0D47A1]"
              onClick={() => {
                setSuccessMessage(
                  selectedReport
                    ? `Tugas untuk ${selectedReport.ticket} dikirim ke ${destination}`
                    : 'Tugas dikirim',
                )
                setOpen(false)
              }}
            >
              Kirim Tugas
              <Send className="size-3.5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {successMessage && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#A5D6A7] bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
          <AlertCircle className="size-4" />
          {successMessage}
        </div>
      )}
    </section>
  )
}
