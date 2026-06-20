'use client'

import { useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { AlertTriangle, CheckCircle2, Clock3, FileUp, MapPin, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type PatientStatus = 'perawatan' | 'siap_dijemput' | 'selesai'

type Patient = {
  ticket: string
  name: string
  city: string
  admittedAt: string
  status: PatientStatus
  daysElapsed: number
  logs: Array<{ date: string; note: string }>
}

const PATIENTS: Patient[] = [
  {
    ticket: 'RSJ-2026-021',
    name: 'Budi Santoso',
    city: 'Kota Bandung',
    admittedAt: '2026-06-07',
    status: 'perawatan',
    daysElapsed: 10,
    logs: [
      { date: '2026-06-20', note: 'Kondisi stabil, respons verbal lebih baik.' },
      { date: '2026-06-19', note: 'Pasien makan teratur dan kooperatif.' },
      { date: '2026-06-18', note: 'Masih menunjukkan gelisah ringan saat sore.' },
    ],
  },
  {
    ticket: 'RSJ-2026-022',
    name: 'Asep Hidayat',
    city: 'Kab. Bogor',
    admittedAt: '2026-06-09',
    status: 'siap_dijemput',
    daysElapsed: 14,
    logs: [
      { date: '2026-06-20', note: 'Surat rekomendasi penanganan telah terbit.' },
      { date: '2026-06-19', note: 'Evaluasi akhir menyatakan kondisi tenang.' },
    ],
  },
  {
    ticket: 'RSJ-2026-023',
    name: 'Rudi Hartono',
    city: 'Kota Cimahi',
    admittedAt: '2026-06-03',
    status: 'selesai',
    daysElapsed: 14,
    logs: [
      { date: '2026-06-18', note: 'Kasus selesai dan diserahkan ke keluarga.' },
      { date: '2026-06-17', note: 'Keluarga hadir untuk serah terima.' },
    ],
  },
]

const STATUS_LABEL: Record<PatientStatus, { label: string; className: string }> = {
  perawatan: { label: 'Perawatan', className: 'bg-[#FFF4D7] text-[#7A4A00]' },
  siap_dijemput: { label: 'Siap Dijemput', className: 'bg-[#E3F2FD] text-[#1565C0]' },
  selesai: { label: 'Selesai', className: 'bg-[#E8F5E9] text-[#1B5E20]' },
}

function formatDisplayDate(value: string) {
  const parsed = parseISO(value)
  if (Number.isNaN(parsed.getTime())) return '-'
  return format(parsed, 'MMM dd, yyyy')
}

function StatusChip({ status }: { status: PatientStatus }) {
  const meta = STATUS_LABEL[status]
  return <Badge className={cn('border-transparent text-xs font-semibold', meta.className)}>{meta.label}</Badge>
}

function CircularTimer({ daysElapsed }: { daysElapsed: number }) {
  const percentage = Math.min(100, (daysElapsed / 14) * 100)
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#E0E0E0] bg-white p-4">
      <div
        className="relative grid size-24 place-items-center rounded-full"
        style={{
          background: `conic-gradient(#1565C0 ${percentage}%, #E0E0E0 ${percentage}% 100%)`,
        }}
      >
        <div className="grid size-18 place-items-center rounded-full bg-white text-center">
          <div>
            <p className="text-xs text-[#616161]">Hari ke</p>
            <p className="text-2xl font-bold text-[#1565C0]">{daysElapsed}</p>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[#212121]">Timer Perawatan 14 Hari</p>
        <p className="text-sm text-[#616161]">
          Progres: {daysElapsed} / 14 hari
        </p>
        <div className="h-2 w-48 overflow-hidden rounded-full bg-[#E0E0E0]">
          <div className="h-full rounded-full bg-[#1565C0]" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  )
}

export function RsjDashboard() {
  const [patients, setPatients] = useState(PATIENTS)
  const [selectedTicket, setSelectedTicket] = useState(PATIENTS[0].ticket)
  const [evaluation, setEvaluation] = useState<'ya' | 'belum' | ''>('')
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const selectedPatient = patients.find((patient) => patient.ticket === selectedTicket) ?? patients[0]

  const readyCount = useMemo(
    () => patients.filter((patient) => patient.status === 'siap_dijemput').length,
    [patients],
  )

  const updatePatient = (ticket: string, next: Partial<Patient>) => {
    setPatients((prev) => prev.map((patient) => (patient.ticket === ticket ? { ...patient, ...next } : patient)))
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#616161]">
          Dashboard RSJ Cisarua
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#212121]">
          Role Fasilitas Medis
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#616161]">
          Pantau durasi perawatan, catatan harian, dan evaluasi akhir untuk menentukan kesiapan pasien kembali dijemput.
        </p>
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-[#616161]">Total Pasien Aktif</p>
            <p className="mt-2 text-3xl font-bold text-[#1565C0]">{patients.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-[#616161]">Siap Dijemput</p>
            <p className="mt-2 text-3xl font-bold text-[#1565C0]">{readyCount}</p>
          </CardContent>
        </Card>
        <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-[#616161]">Evaluasi Hari ke-14</p>
            <p className="mt-2 text-3xl font-bold text-[#1565C0]">1</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
          <CardHeader className="border-b border-[#E0E0E0] pb-4">
            <CardTitle className="text-lg text-[#212121]">Daftar Pasien</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4">
            {patients.map((patient) => (
              <button
                key={patient.ticket}
                type="button"
                onClick={() => {
                  setSelectedTicket(patient.ticket)
                  setSuccessMessage('')
                  setEvaluation('')
                  setUploadedFileName('')
                }}
                className={cn(
                  'w-full rounded-xl border p-4 text-left transition-colors',
                  selectedTicket === patient.ticket
                    ? 'border-[#1565C0] bg-white'
                    : 'border-[#E0E0E0] bg-white hover:bg-[#FAFAFA]',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#212121]">{patient.ticket}</p>
                    <p className="text-sm text-[#616161]">{patient.name}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#616161]">
                      <MapPin className="size-3.5" />
                      {patient.city}
                    </p>
                  </div>
                  <StatusChip status={patient.status} />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
            <CardHeader className="border-b border-[#E0E0E0] pb-4">
              <CardTitle className="text-lg text-[#212121]">Card Perawatan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="rounded-xl border border-[#E0E0E0] bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-[#616161]">{selectedPatient.ticket}</p>
                <p className="mt-1 text-xl font-semibold text-[#212121]">{selectedPatient.name}</p>
                <p className="mt-1 text-sm text-[#616161]">Masuk: {formatDisplayDate(selectedPatient.admittedAt)}</p>
                <p className="mt-2"><StatusChip status={selectedPatient.status} /></p>
              </div>

              <CircularTimer daysElapsed={selectedPatient.daysElapsed} />

              <div className="space-y-3 rounded-xl border border-[#E0E0E0] bg-white p-4">
                <p className="text-sm font-semibold text-[#212121]">Timeline Log Kondisi Harian</p>
                <div className="space-y-3 border-l-2 border-[#E0E0E0] pl-4">
                  {selectedPatient.logs.map((log) => (
                    <div key={log.date} className="relative">
                      <span className="absolute -left-[26px] top-1 flex size-4 items-center justify-center rounded-full bg-[#1565C0] text-white">
                        <Clock3 className="size-2.5" />
                      </span>
                      <p className="text-xs text-[#616161]">{formatDisplayDate(log.date)}</p>
                      <p className="text-sm text-[#212121]">{log.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
            <CardHeader className="border-b border-[#E0E0E0] pb-4">
              <CardTitle className="text-lg text-[#212121]">Evaluasi Kondisi (Hari ke-14)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#212121]">Apakah kondisi sudah tenang?</p>
                <RadioGroup
                  value={evaluation}
                  onValueChange={(value) => {
                    setEvaluation(value as 'ya' | 'belum')
                    setSuccessMessage('')
                  }}
                  className="grid grid-cols-2 gap-2 sm:max-w-sm"
                >
                  {[
                    { value: 'ya', label: 'Ya' },
                    { value: 'belum', label: 'Belum' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        'flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium',
                        evaluation === option.value
                          ? 'border-[#1565C0] bg-[#E3F2FD] text-[#1565C0]'
                          : 'border-[#BDBDBD] bg-white text-[#616161]',
                      )}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      {option.label}
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {evaluation === 'belum' && (
                <div className="rounded-xl border border-[#FBC02D] bg-[#FFF8E1] px-4 py-3 text-sm text-[#7A4A00]">
                  <span className="inline-flex items-center gap-2">
                    <AlertTriangle className="size-4" />
                    Siklus perawatan dilanjutkan hingga kondisi stabil.
                  </span>
                </div>
              )}

              {evaluation === 'ya' && (
                <div className="space-y-4">
                  <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#BDBDBD] bg-white p-4 text-center">
                    <FileUp className="size-5 text-[#616161]" />
                    <p className="text-sm font-medium text-[#212121]">
                      Surat Rekomendasi Penanganan (PDF/JPG)
                    </p>
                    <p className="text-xs text-[#616161]">
                      {uploadedFileName || 'Klik untuk unggah dokumen'}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(event) => setUploadedFileName(event.target.files?.[0]?.name ?? '')}
                    />
                  </label>
                  <Button
                    className="h-10 w-full bg-[#1565C0] text-white hover:bg-[#0D47A1]"
                    onClick={() => {
                      updatePatient(selectedPatient.ticket, { status: 'siap_dijemput' })
                      setSuccessMessage('Rekomendasi terkirim. Status pasien berubah menjadi Siap Dijemput.')
                    }}
                  >
                    Kirim Rekomendasi
                    <PlusCircle className="size-4" />
                  </Button>
                </div>
              )}

              {selectedPatient.status === 'siap_dijemput' && (
                <div className="flex items-center gap-2 rounded-xl border border-[#A5D6A7] bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
                  <CheckCircle2 className="size-4" />
                  Status pasien sudah Siap Dijemput.
                </div>
              )}

              {selectedPatient.status === 'selesai' && (
                <div className="flex items-center gap-2 rounded-xl border border-[#A5D6A7] bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
                  <CheckCircle2 className="size-4" />
                  Kasus telah selesai dan diserahkan.
                </div>
              )}

              {successMessage && (
                <div className="rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#616161]">
                  {successMessage}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
