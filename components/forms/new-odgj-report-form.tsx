'use client'

import { type ChangeEvent, type MouseEvent, useEffect, useMemo, useState } from 'react'
import { AlertTriangle, MapPin, UploadCloud } from 'lucide-react'
import { format, isValid, parseISO } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

type UploadState = {
  file: File | null
  preview: string | null
}

type MapPoint = {
  x: number
  y: number
  lat: number
  lng: number
}

type FormData = {
  reporterNik: string
  reporterName: string
  reporterPhone: string
  reporterRelation: string
  odgjName: string
  gender: string
  ageRange: string
  hasBpjs: string
  economyCondition: string
  livingStatus: string
  foundDate: string
  city: string
  district: string
  village: string
  fullAddress: string
  behavior: string[]
  selfHarmRisk: string
  othersHarmRisk: string
  emergencyNeed: string
  detail: string
}

const STEPS = ['Data Pelaporan', 'Data ODGJ', 'Kondisi ODGJ', 'Ringkasan']

const RELATION_OPTIONS = [
  'Keluarga Inti',
  'Tetangga',
  'Perangkat Desa/Kelurahan',
  'Petugas Kesehatan',
  'Masyarakat Umum',
]

const AGE_OPTIONS = ['< 18 tahun', '18 - 30 tahun', '31 - 45 tahun', '46 - 60 tahun', '> 60 tahun']
const YES_NO_OPTIONS = ['Ya', 'Tidak']
const ECONOMY_OPTIONS = ['Sangat Rentan', 'Rentan', 'Menengah', 'Mampu']
const LIVING_OPTIONS = ['Tinggal dengan keluarga', 'Hidup di jalanan', 'Tidak tetap', 'Lainnya']
const CITY_OPTIONS = ['Kota Bandung', 'Kota Cimahi', 'Kab. Bandung', 'Kab. Bandung Barat', 'Kab. Sumedang']
const DISTRICT_OPTIONS = ['Coblong', 'Sukasari', 'Cicendo', 'Cidadap', 'Batujajar', 'Lembang']
const VILLAGE_OPTIONS = ['Dago', 'Lebak Siliwangi', 'Pasteur', 'Sukajadi', 'Cigugur Girang', 'Cihideung']
const BEHAVIOR_OPTIONS = ['Tenang', 'Gelisah', 'Agresif/Mengancam', 'Halusinasi', 'Mengamuk', 'Lainnya']

const initialForm: FormData = {
  reporterNik: '',
  reporterName: '',
  reporterPhone: '',
  reporterRelation: '',
  odgjName: '',
  gender: '',
  ageRange: '',
  hasBpjs: '',
  economyCondition: '',
  livingStatus: '',
  foundDate: '',
  city: '',
  district: '',
  village: '',
  fullAddress: '',
  behavior: [],
  selfHarmRisk: '',
  othersHarmRisk: '',
  emergencyNeed: '',
  detail: '',
}

const initialMapPoint: MapPoint = {
  x: 58,
  y: 42,
  lat: -6.9175,
  lng: 107.6191,
}

function formatDateLabel(value: string | Date | null | undefined) {
  if (!value) return '-'

  const parsed = typeof value === 'string' ? parseISO(value) : value
  if (!isValid(parsed)) return '-'

  return format(parsed, 'MMM dd, yyyy')
}

function StepBadge({ current, index, label }: { current: number; index: number; label: string }) {
  const done = current > index
  const active = current === index

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
      <div
        className={[
          'flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
          done || active
            ? 'border-[#1565C0] bg-[#1565C0] text-white'
            : 'border-[#BDBDBD] bg-white text-[#616161]',
        ].join(' ')}
      >
        {index + 1}
      </div>
      <p
        className={[
          'line-clamp-1 text-center text-[11px] leading-tight sm:text-xs',
          active ? 'font-semibold text-[#1565C0]' : 'text-[#616161]',
        ].join(' ')}
      >
        {label}
      </p>
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={(nextValue) => onChange(nextValue ?? '')}>
        <SelectTrigger className="h-10 w-full border-[#BDBDBD] bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function SegmentedYesNo({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-2">
        {YES_NO_OPTIONS.map((option) => {
          const active = value === option
          return (
            <label
              key={option}
              className={[
                'flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
                active
                  ? 'border-[#1565C0] bg-[#1565C0] text-white'
                  : 'border-[#BDBDBD] bg-white text-[#616161] hover:bg-[#FAFAFA]',
              ].join(' ')}
            >
              <RadioGroupItem value={option} className="sr-only" />
              <span>{option}</span>
            </label>
          )
        })}
      </RadioGroup>
    </div>
  )
}

function ReadOnlyGrid({ rows }: { rows: Array<{ key: string; value: string }> }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.key} className="rounded-lg border border-[#E0E0E0] bg-white p-3">
          <p className="text-xs text-[#616161]">{row.key}</p>
          <p className="mt-0.5 text-sm font-medium text-[#212121]">{row.value || '-'}</p>
        </div>
      ))}
    </div>
  )
}

export function NewOdgjReportForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [odgjPhoto, setOdgjPhoto] = useState<UploadState>({ file: null, preview: null })
  const [selfiePhoto, setSelfiePhoto] = useState<UploadState>({ file: null, preview: null })
  const [mapPoint, setMapPoint] = useState<MapPoint>(initialMapPoint)
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null)

  useEffect(() => {
    return () => {
      if (odgjPhoto.preview) URL.revokeObjectURL(odgjPhoto.preview)
      if (selfiePhoto.preview) URL.revokeObjectURL(selfiePhoto.preview)
    }
  }, [odgjPhoto.preview, selfiePhoto.preview])

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step])

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleBehavior = (option: string, checked: boolean | 'indeterminate') => {
    setForm((prev) => ({
      ...prev,
      behavior:
        checked === true
          ? Array.from(new Set([...prev.behavior, option]))
          : prev.behavior.filter((item) => item !== option),
    }))
  }

  const updateUpload = (event: ChangeEvent<HTMLInputElement>, type: 'odgj' | 'selfie') => {
    const file = event.target.files?.[0]
    if (!file) return

    const preview = URL.createObjectURL(file)
    if (type === 'odgj') {
      if (odgjPhoto.preview) URL.revokeObjectURL(odgjPhoto.preview)
      setOdgjPhoto({ file, preview })
    } else {
      if (selfiePhoto.preview) URL.revokeObjectURL(selfiePhoto.preview)
      setSelfiePhoto({ file, preview })
    }
  }

  const handleMapClick = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100))
    const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100))

    const lat = -6.55 - (y / 100) * 0.9
    const lng = 107.35 + (x / 100) * 0.7

    setMapPoint({
      x,
      y,
      lat: Number(lat.toFixed(6)),
      lng: Number(lng.toFixed(6)),
    })
  }

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1)
      return
    }
    setSubmittedAt(new Date())
  }

  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1)
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 text-sm sm:px-6">
      <Card className="overflow-visible border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
        <CardHeader className="space-y-5 border-b border-[#E0E0E0]">
          <div>
            <p className="text-xs tracking-wide text-[#616161] uppercase">Form Pelaporan ODGJ Baru</p>
            <CardTitle className="mt-1 text-xl text-[#212121]">Pelaporan Publik Tanpa Autentikasi</CardTitle>
          </div>

          <div className="space-y-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white ring-1 ring-[#E0E0E0]">
              <div
                className="h-full rounded-full bg-[#1565C0] transition-all"
                style={{ width: `${progress}%` }}
                aria-label="Progress langkah"
              />
            </div>
            <div className="flex items-start gap-2">
              {STEPS.map((label, index) => (
                <StepBadge key={label} current={step} index={index} label={label} />
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {step === 0 && (
            <section className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#212121]">Langkah 1: Data Pelaporan</h2>
                <p className="text-sm text-[#616161]">Informasi identitas Anda sebagai pelapor.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="reporter-nik">NIK Pelapor</Label>
                  <Input
                    id="reporter-nik"
                    value={form.reporterNik}
                    onChange={(event) => updateField('reporterNik', event.target.value.replace(/\D/g, '').slice(0, 16))}
                    placeholder="16 digit Nomor Induk Kependudukan"
                    className="h-10 border-[#BDBDBD] bg-white"
                    inputMode="numeric"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="reporter-name">Nama Pelapor</Label>
                  <Input
                    id="reporter-name"
                    value={form.reporterName}
                    onChange={(event) => updateField('reporterName', event.target.value)}
                    placeholder="Nama sesuai KTP"
                    className="h-10 border-[#BDBDBD] bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="reporter-phone">No. Handphone / Whatsapp</Label>
                  <div className="flex items-center overflow-hidden rounded-lg border border-[#BDBDBD] bg-white focus-within:ring-3 focus-within:ring-[#1565C0]/20">
                    <span className="border-r border-[#E0E0E0] px-3 py-2 text-sm text-[#616161]">+62</span>
                    <Input
                      id="reporter-phone"
                      className="h-10 border-0 bg-transparent focus-visible:ring-0"
                      value={form.reporterPhone}
                      onChange={(event) =>
                        updateField('reporterPhone', event.target.value.replace(/\D/g, '').slice(0, 13))
                      }
                      placeholder="812xxxxxxx"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <SelectField
                  label="Hubungan Pelapor dengan ODGJ"
                  value={form.reporterRelation}
                  onChange={(value) => updateField('reporterRelation', value)}
                  options={RELATION_OPTIONS}
                  placeholder="Pilih hubungan"
                />
              </div>
            </section>
          )}

          {step === 1 && (
            <section className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#212121]">Langkah 2: Data ODGJ</h2>
                <p className="text-sm text-[#616161]">Informasi orang yang akan dilaporkan.</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="odgj-name">Nama Asli & Nama Alias</Label>
                <Input
                  id="odgj-name"
                  value={form.odgjName}
                  onChange={(event) => updateField('odgjName', event.target.value)}
                  placeholder="Contoh: Budi / Budi Gondrong"
                  className="h-10 border-[#BDBDBD] bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Jenis Kelamin</Label>
                <RadioGroup
                  value={form.gender}
                  onValueChange={(value) => updateField('gender', value)}
                  className="grid grid-cols-2 gap-2 sm:max-w-sm"
                >
                  {['Laki-laki', 'Perempuan'].map((option) => (
                    <label
                      key={option}
                      className={[
                        'flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm transition-colors',
                        form.gender === option
                          ? 'border-[#1565C0] bg-[#1565C0] text-white'
                          : 'border-[#BDBDBD] bg-white text-[#616161] hover:bg-[#FAFAFA]',
                      ].join(' ')}
                    >
                      <RadioGroupItem value={option} className="sr-only" />
                      {option}
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Kisaran Usia"
                  value={form.ageRange}
                  onChange={(value) => updateField('ageRange', value)}
                  options={AGE_OPTIONS}
                  placeholder="Pilih kisaran usia"
                />
                <SelectField
                  label="Mempunyai BPJS"
                  value={form.hasBpjs}
                  onChange={(value) => updateField('hasBpjs', value)}
                  options={YES_NO_OPTIONS}
                  placeholder="Pilih jawaban"
                />
                <SelectField
                  label="Kondisi Ekonomi"
                  value={form.economyCondition}
                  onChange={(value) => updateField('economyCondition', value)}
                  options={ECONOMY_OPTIONS}
                  placeholder="Pilih kondisi ekonomi"
                />
                <SelectField
                  label="Status Tinggal ODGJ"
                  value={form.livingStatus}
                  onChange={(value) => updateField('livingStatus', value)}
                  options={LIVING_OPTIONS}
                  placeholder="Pilih status tinggal"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="found-date">Tanggal Ditemukan</Label>
                <Input
                  id="found-date"
                  type="date"
                  value={form.foundDate}
                  onChange={(event) => updateField('foundDate', event.target.value)}
                  className="h-10 border-[#BDBDBD] bg-white"
                />
                <p className="text-xs text-[#616161]">
                  Format tanggal: <span className="font-medium text-[#212121]">{formatDateLabel(form.foundDate)}</span>
                </p>
              </div>

              <div className="space-y-3 rounded-xl border border-[#E0E0E0] bg-white p-4">
                <h3 className="text-sm font-semibold text-[#212121]">Lokasi Ditemukan</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <SelectField
                    label="Kabupaten/Kota"
                    value={form.city}
                    onChange={(value) => updateField('city', value)}
                    options={CITY_OPTIONS}
                    placeholder="Pilih wilayah"
                  />
                  <SelectField
                    label="Kecamatan"
                    value={form.district}
                    onChange={(value) => updateField('district', value)}
                    options={DISTRICT_OPTIONS}
                    placeholder="Pilih kecamatan"
                  />
                  <SelectField
                    label="Kelurahan/Desa"
                    value={form.village}
                    onChange={(value) => updateField('village', value)}
                    options={VILLAGE_OPTIONS}
                    placeholder="Pilih kelurahan"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="full-address">Alamat Lengkap</Label>
                  <Textarea
                    id="full-address"
                    value={form.fullAddress}
                    onChange={(event) => updateField('fullAddress', event.target.value)}
                    placeholder="Masukkan alamat lengkap sesuai titik lokasi"
                    className="min-h-24 border-[#BDBDBD] bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Peta Interaktif (Mockup)</Label>
                  <div
                    onClick={handleMapClick}
                    className="relative h-52 cursor-crosshair overflow-hidden rounded-lg border border-[#BDBDBD] bg-[linear-gradient(135deg,#E3F2FD_0%,#FAFAFA_35%,#E8F5E9_100%)]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(21,101,192,0.12),transparent_42%),radial-gradient(circle_at_75%_65%,rgba(97,97,97,0.12),transparent_38%)]" />
                    <div
                      className="absolute z-10 -translate-x-1/2 -translate-y-full text-[#C62828]"
                      style={{ left: `${mapPoint.x}%`, top: `${mapPoint.y}%` }}
                    >
                      <MapPin className="size-7 fill-current" />
                    </div>
                  </div>
                  <p className="text-xs text-[#616161]">
                    Koordinat pin: <span className="font-medium text-[#212121]">{mapPoint.lat}, {mapPoint.lng}</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="odgj-photo">Foto ODGJ</Label>
                  <label
                    htmlFor="odgj-photo"
                    className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#BDBDBD] bg-white p-4 text-center"
                  >
                    <UploadCloud className="size-5 text-[#616161]" />
                    <p className="text-sm font-medium text-[#212121]">Unggah Foto ODGJ</p>
                    <p className="text-xs text-[#616161]">
                      {odgjPhoto.file ? odgjPhoto.file.name : 'Klik untuk memilih file'}
                    </p>
                  </label>
                  <input
                    id="odgj-photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => updateUpload(event, 'odgj')}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="selfie-photo">Foto Selfie Bersama ODGJ</Label>
                  <label
                    htmlFor="selfie-photo"
                    className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#BDBDBD] bg-white p-4 text-center"
                  >
                    <UploadCloud className="size-5 text-[#616161]" />
                    <p className="text-sm font-medium text-[#212121]">Unggah Foto Selfie</p>
                    <p className="text-xs text-[#616161]">
                      {selfiePhoto.file ? selfiePhoto.file.name : 'Klik untuk memilih file'}
                    </p>
                  </label>
                  <input
                    id="selfie-photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => updateUpload(event, 'selfie')}
                  />
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#212121]">Langkah 3: Kondisi ODGJ</h2>
                <p className="text-sm text-[#616161]">Deskripsi perilaku dan tingkat risiko.</p>
              </div>

              <div className="space-y-2">
                <Label>Perilaku ODGJ</Label>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {BEHAVIOR_OPTIONS.map((option) => {
                    const checked = form.behavior.includes(option)
                    return (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#BDBDBD] bg-white px-3 py-2"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(value) => toggleBehavior(option, value)}
                          className="border-[#BDBDBD] data-checked:border-[#1565C0] data-checked:bg-[#1565C0]"
                        />
                        <span className="text-sm text-[#212121]">{option}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SegmentedYesNo
                  label="Membahayakan diri sendiri?"
                  value={form.selfHarmRisk}
                  onChange={(value) => updateField('selfHarmRisk', value)}
                />
                <SegmentedYesNo
                  label="Membahayakan orang lain?"
                  value={form.othersHarmRisk}
                  onChange={(value) => updateField('othersHarmRisk', value)}
                />
              </div>

              <div className="space-y-2 rounded-xl border border-[#EF9A9A] bg-[#FDECEC] p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-4 text-[#C62828]" />
                  <p className="text-sm font-semibold text-[#C62828]">Perlu penanganan darurat?</p>
                </div>
                <SegmentedYesNo
                  label="Pilih kondisi darurat"
                  value={form.emergencyNeed}
                  onChange={(value) => updateField('emergencyNeed', value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="detail">Detail</Label>
                <Textarea
                  id="detail"
                  value={form.detail}
                  onChange={(event) => updateField('detail', event.target.value)}
                  placeholder="Jelaskan detail kondisi ODGJ"
                  className="min-h-28 border-[#BDBDBD] bg-white"
                />
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-[#212121]">Langkah 4: Ringkasan Laporan</h2>
                <p className="text-sm text-[#616161]">Periksa kembali data sebelum dikirim.</p>
              </div>

              <div className="rounded-xl border border-[#90CAF9] bg-[#E3F2FD] p-4 text-sm text-[#0D47A1]">
                Data akan diproses oleh Dinas Sosial. Koordinat GPS dari titik peta diambil otomatis saat laporan dikirim.
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <Card className="border border-[#E0E0E0] bg-[#FAFAFA]">
                    <CardHeader>
                      <CardTitle className="text-base text-[#212121]">Data Pelaporan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ReadOnlyGrid
                        rows={[
                          { key: 'NIK Pelapor', value: form.reporterNik },
                          { key: 'Nama Pelapor', value: form.reporterName },
                          { key: 'No. HP/WA', value: form.reporterPhone ? `+62 ${form.reporterPhone}` : '-' },
                          { key: 'Hubungan dengan ODGJ', value: form.reporterRelation },
                        ]}
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <Card className="border border-[#E0E0E0] bg-[#FAFAFA]">
                    <CardHeader>
                      <CardTitle className="text-base text-[#212121]">Data ODGJ & Lokasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ReadOnlyGrid
                        rows={[
                          { key: 'Nama Asli & Alias', value: form.odgjName },
                          { key: 'Jenis Kelamin', value: form.gender },
                          { key: 'Kisaran Usia', value: form.ageRange },
                          { key: 'Mempunyai BPJS', value: form.hasBpjs },
                          { key: 'Kondisi Ekonomi', value: form.economyCondition },
                          { key: 'Status Tinggal ODGJ', value: form.livingStatus },
                          { key: 'Tanggal Ditemukan', value: formatDateLabel(form.foundDate) },
                          {
                            key: 'Lokasi Ditemukan',
                            value: [form.city, form.district, form.village].filter(Boolean).join(', '),
                          },
                          { key: 'Alamat Lengkap', value: form.fullAddress },
                          { key: 'Koordinat GPS', value: `${mapPoint.lat}, ${mapPoint.lng}` },
                        ]}
                      />
                    </CardContent>
                  </Card>

                  <Card className="border border-[#E0E0E0] bg-[#FAFAFA]">
                    <CardHeader>
                      <CardTitle className="text-base text-[#212121]">Kondisi ODGJ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ReadOnlyGrid
                        rows={[
                          {
                            key: 'Perilaku ODGJ',
                            value: form.behavior.length > 0 ? form.behavior.join(', ') : '-',
                          },
                          { key: 'Membahayakan diri sendiri', value: form.selfHarmRisk },
                          { key: 'Membahayakan orang lain', value: form.othersHarmRisk },
                          { key: 'Perlu penanganan darurat', value: form.emergencyNeed },
                          { key: 'Detail kondisi', value: form.detail },
                        ]}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-[#212121]">Thumbnail Foto ODGJ</p>
                  <div className="overflow-hidden rounded-xl border border-[#BDBDBD] bg-white">
                    {odgjPhoto.preview ? (
                      <img src={odgjPhoto.preview} alt="Thumbnail Foto ODGJ" className="h-40 w-full object-cover" />
                    ) : (
                      <div className="grid h-40 place-content-center text-xs text-[#616161]">Belum ada foto</div>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-[#212121]">Thumbnail Selfie Bersama ODGJ</p>
                  <div className="overflow-hidden rounded-xl border border-[#BDBDBD] bg-white">
                    {selfiePhoto.preview ? (
                      <img src={selfiePhoto.preview} alt="Thumbnail Selfie Bersama ODGJ" className="h-40 w-full object-cover" />
                    ) : (
                      <div className="grid h-40 place-content-center text-xs text-[#616161]">Belum ada foto</div>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-[#212121]">Preview Peta Lokasi</p>
                  <div className="relative h-40 overflow-hidden rounded-xl border border-[#BDBDBD] bg-[linear-gradient(135deg,#E3F2FD_0%,#FAFAFA_35%,#E8F5E9_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(21,101,192,0.16),transparent_44%),radial-gradient(circle_at_75%_65%,rgba(97,97,97,0.16),transparent_42%)]" />
                    <div
                      className="absolute z-10 -translate-x-1/2 -translate-y-full text-[#C62828]"
                      style={{ left: `${mapPoint.x}%`, top: `${mapPoint.y}%` }}
                    >
                      <MapPin className="size-6 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E0E0E0] pt-5">
            {step > 0 ? (
              <Button
                onClick={prevStep}
                className="h-10 border-[#BDBDBD] bg-transparent px-5 text-[#616161] hover:bg-[#FAFAFA]"
                variant="outline"
              >
                Kembali
              </Button>
            ) : (
              <span />
            )}

            <Button
              onClick={nextStep}
              className="h-10 bg-[#1565C0] px-5 text-white hover:bg-[#0D47A1]"
            >
              {step === STEPS.length - 1 ? 'Kirim Laporan' : 'Selanjutnya'}
            </Button>
          </div>

          {submittedAt && (
            <div className="rounded-xl border border-[#A5D6A7] bg-[#E8F5E9] px-4 py-3 text-sm text-[#1B5E20]">
              Laporan berhasil dikirim pada {formatDateLabel(submittedAt)}. Tim Dinas Sosial akan menindaklanjuti data Anda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
