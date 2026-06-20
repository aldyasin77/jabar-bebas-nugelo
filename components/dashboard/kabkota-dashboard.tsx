'use client'

import { useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { Download, MapPin, Send, Stethoscope, Truck, UserRoundCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type TaskStatus = 'menunggu' | 'penjemputan' | 'perawatan' | 'selesai'
type FilterStatus = 'semua' | TaskStatus

type KabTask = {
  ticket: string
  location: string
  date: string
  emergency: 'darurat' | 'sedang' | 'rendah'
  status: TaskStatus
  letterReady: boolean
  patientName: string
  note: string
}

const FILTERS: Array<{ label: string; value: FilterStatus }> = [
  { label: 'Semua', value: 'semua' },
  { label: 'Menunggu', value: 'menunggu' },
  { label: 'Dalam Penjemputan', value: 'penjemputan' },
  { label: 'Proses Perawatan', value: 'perawatan' },
  { label: 'Selesai', value: 'selesai' },
]

const TASKS: KabTask[] = [
  {
    ticket: 'ODGJ-2026-010',
    location: 'Kab. Bandung',
    date: '2026-06-20',
    emergency: 'darurat',
    status: 'menunggu',
    letterReady: false,
    patientName: 'Budi Santoso',
    note: 'Laporan baru dari provinsi, menunggu petugas lapangan bergerak.',
  },
  {
    ticket: 'ODGJ-2026-011',
    location: 'Kota Cimahi',
    date: '2026-06-19',
    emergency: 'sedang',
    status: 'penjemputan',
    letterReady: false,
    patientName: 'Asep Hidayat',
    note: 'Tim sudah menuju lokasi untuk proses penjemputan.',
  },
  {
    ticket: 'ODGJ-2026-012',
    location: 'Kab. Bogor',
    date: '2026-06-18',
    emergency: 'rendah',
    status: 'perawatan',
    letterReady: true,
    patientName: 'Rudi Hartono',
    note: 'Pasien dalam evaluasi RSJ, surat rekomendasi telah terbit.',
  },
]

const STATUS_META: Record<TaskStatus, { label: string; className: string }> = {
  menunggu: { label: 'Menunggu', className: 'bg-[#E0E0E0] text-[#616161]' },
  penjemputan: { label: 'Dalam Penjemputan', className: 'bg-[#E3F2FD] text-[#1565C0]' },
  perawatan: { label: 'Proses Perawatan', className: 'bg-[#FFF4D7] text-[#7A4A00]' },
  selesai: { label: 'Selesai', className: 'bg-[#E8F5E9] text-[#1B5E20]' },
}

const EMERGENCY_META: Record<KabTask['emergency'], { label: string; className: string }> = {
  darurat: { label: 'Darurat', className: 'bg-[#C62828] text-white' },
  sedang: { label: 'Sedang', className: 'bg-[#FFF4E5] text-[#8A4B08]' },
  rendah: { label: 'Rendah', className: 'bg-white text-[#616161]' },
}

function formatDisplayDate(value: string) {
  const parsed = parseISO(value)
  if (Number.isNaN(parsed.getTime())) return '-'
  return format(parsed, 'MMM dd, yyyy')
}

function StatusChip({ status }: { status: TaskStatus }) {
  const meta = STATUS_META[status]
  return <Badge className={cn('border-transparent text-xs font-semibold', meta.className)}>{meta.label}</Badge>
}

function EmergencyChip({ emergency }: { emergency: KabTask['emergency'] }) {
  const meta = EMERGENCY_META[emergency]
  return <Badge className={cn('border text-xs font-semibold', meta.className, emergency !== 'darurat' && 'border-[#E0E0E0]')}>{meta.label}</Badge>
}

export function KabKotaDashboard() {
  const [tasks, setTasks] = useState<KabTask[]>(TASKS)
  const [filter, setFilter] = useState<FilterStatus>('semua')
  const [selectedTicket, setSelectedTicket] = useState(TASKS[0].ticket)
  const [handoverOpen, setHandoverOpen] = useState(false)
  const [handoverTarget, setHandoverTarget] = useState<'keluarga' | 'panti'>('keluarga')
  const [infoMessage, setInfoMessage] = useState('')

  const visibleTasks = useMemo(
    () => (filter === 'semua' ? tasks : tasks.filter((task) => task.status === filter)),
    [filter, tasks],
  )

  const selectedTask = tasks.find((task) => task.ticket === selectedTicket) ?? tasks[0]

  const updateTask = (ticket: string, next: Partial<KabTask>) => {
    setTasks((prev) => prev.map((task) => (task.ticket === ticket ? { ...task, ...next } : task)))
  }

  const openSelectedTask = (ticket: string) => {
    setSelectedTicket(ticket)
    setInfoMessage('')
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#616161]">
          Dashboard Dinsos Kab/Kota
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#212121]">
          Role Eksekutor Lapangan
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#616161]">
          Kelola laporan terusan dari provinsi, percepat penjemputan, dan selesaikan kasus secara terarah.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((chip) => {
          const active = filter === chip.value
          return (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilter(chip.value)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                active
                  ? 'border-[#1565C0] bg-[#E3F2FD] text-[#1565C0]'
                  : 'border-[#E0E0E0] bg-[#FAFAFA] text-[#616161] hover:bg-white',
              )}
            >
              {chip.label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
          <CardHeader className="border-b border-[#E0E0E0] pb-4">
            <CardTitle className="text-lg text-[#212121]">Daftar Tugas Laporan</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E0E0E0] text-left text-xs font-semibold uppercase tracking-wide text-[#616161]">
                    <th className="px-4 py-3">Tiket</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Lokasi</th>
                    <th className="px-4 py-3">Tingkat Darurat</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTasks.map((task) => (
                    <tr
                      key={task.ticket}
                      className={cn(
                        'cursor-pointer border-b border-[#E0E0E0] last:border-b-0 transition-colors hover:bg-white',
                        selectedTask.ticket === task.ticket && 'bg-white',
                      )}
                      onClick={() => openSelectedTask(task.ticket)}
                    >
                      <td className="px-4 py-4 text-sm font-bold text-[#212121]">{task.ticket}</td>
                      <td className="px-4 py-4 text-sm text-[#212121]">{formatDisplayDate(task.date)}</td>
                      <td className="px-4 py-4 text-sm text-[#212121]">{task.location}</td>
                      <td className="px-4 py-4">
                        <EmergencyChip emergency={task.emergency} />
                      </td>
                      <td className="px-4 py-4">
                        <StatusChip status={task.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
          <CardHeader className="border-b border-[#E0E0E0] pb-4">
            <CardTitle className="text-lg text-[#212121]">Detail Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="rounded-xl border border-[#E0E0E0] bg-white p-4">
              <p className="text-xs uppercase tracking-wide text-[#616161]">{selectedTask.ticket}</p>
              <p className="mt-1 text-lg font-semibold text-[#212121]">{selectedTask.patientName}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-[#616161]">
                <MapPin className="size-4" />
                {selectedTask.location}
              </p>
              <p className="mt-2 text-sm text-[#616161]">{selectedTask.note}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#E0E0E0] bg-white p-3">
                <p className="text-xs text-[#616161]">Tanggal Masuk</p>
                <p className="mt-1 text-sm font-medium text-[#212121]">{formatDisplayDate(selectedTask.date)}</p>
              </div>
              <div className="rounded-xl border border-[#E0E0E0] bg-white p-3">
                <p className="text-xs text-[#616161]">Status Saat Ini</p>
                <p className="mt-1"><StatusChip status={selectedTask.status} /></p>
              </div>
            </div>

            {selectedTask.status === 'menunggu' && (
              <Button
                className="h-10 w-full bg-[#1565C0] text-white hover:bg-[#0D47A1]"
                onClick={() => {
                  updateTask(selectedTask.ticket, { status: 'penjemputan' })
                  setInfoMessage('Penjemputan dimulai.')
                }}
              >
                Mulai Penjemputan
                <Truck className="size-4" />
              </Button>
            )}

            {selectedTask.status === 'penjemputan' && (
              <Button
                className="h-10 w-full bg-[#1565C0] text-white hover:bg-[#0D47A1]"
                onClick={() => {
                  updateTask(selectedTask.ticket, { status: 'perawatan' })
                  setInfoMessage('Pasien diserahkan ke RSJ untuk perawatan.')
                }}
              >
                Serahkan ke RSJ
                <Stethoscope className="size-4" />
              </Button>
            )}

            {selectedTask.status === 'perawatan' && !selectedTask.letterReady && (
              <div className="rounded-xl border border-[#FBC02D] bg-[#FFF8E1] px-4 py-3 text-sm text-[#7A4A00]">
                Menunggu Rekomendasi RSJ
              </div>
            )}

            {selectedTask.status === 'perawatan' && selectedTask.letterReady && (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  className="h-10 flex-1 border-[#BDBDBD] bg-white text-[#616161] hover:bg-[#FAFAFA]"
                  onClick={() => setInfoMessage('Surat rekomendasi siap diunduh.')}
                >
                  Unduh Surat
                  <Download className="size-4" />
                </Button>
                <Button
                  className="h-10 flex-1 bg-[#1565C0] text-white hover:bg-[#0D47A1]"
                  onClick={() => setHandoverOpen(true)}
                >
                  Selesaikan Kasus
                  <UserRoundCheck className="size-4" />
                </Button>
              </div>
            )}

            {selectedTask.status === 'selesai' && (
              <div className="rounded-xl border border-[#A5D6A7] bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
                Kasus sudah diselesaikan.
              </div>
            )}

            {infoMessage && (
              <div className="rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#616161]">
                {infoMessage}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={handoverOpen} onOpenChange={setHandoverOpen}>
        <DialogContent className="max-w-md border border-[#E0E0E0] bg-white p-0">
          <DialogHeader className="border-b border-[#E0E0E0] px-5 py-4">
            <DialogTitle className="text-lg text-[#212121]">Penyelesaian Kasus</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 px-5 py-4">
            <p className="text-sm text-[#616161]">Pilih opsi penyerahan setelah kasus dinyatakan selesai.</p>
            <RadioGroup
              value={handoverTarget}
              onValueChange={(value) => setHandoverTarget(value as 'keluarga' | 'panti')}
              className="space-y-2"
            >
              {[
                { value: 'keluarga', label: 'Keluarga' },
                { value: 'panti', label: 'Panti Tunas Bangsa' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm',
                    handoverTarget === option.value
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

          <DialogFooter className="border-t border-[#E0E0E0] bg-[#FAFAFA] px-5 py-4">
            <Button variant="tertiary" className="h-10 px-4" onClick={() => setHandoverOpen(false)}>
              Batal
            </Button>
            <Button
              className="h-10 bg-[#1565C0] px-4 text-white hover:bg-[#0D47A1]"
              onClick={() => {
                updateTask(selectedTask.ticket, { status: 'selesai' })
                setInfoMessage(
                  `Kasus diselesaikan dan diserahkan ke ${handoverTarget === 'keluarga' ? 'Keluarga' : 'Panti Tunas Bangsa'}.`,
                )
                setHandoverOpen(false)
              }}
            >
              Selesaikan Kasus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
