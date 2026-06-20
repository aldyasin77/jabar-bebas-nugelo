import Link from 'next/link'
import Image from 'next/image'
import {
  ClipboardList,
  Search,
  ShieldCheck,
  Truck,
  Building2,
  HeartHandshake,
  ArrowRight,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { STATUS_FLOW } from '@/lib/types'

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Buat Laporan',
    desc: 'Isi data pelapor, data ODGJ, dan kondisi yang ditemukan melalui form bertahap.',
  },
  {
    icon: ShieldCheck,
    title: 'Verifikasi Dinsos',
    desc: 'Dinas Sosial Provinsi memverifikasi dan meneruskan laporan ke Kab/Kota.',
  },
  {
    icon: Truck,
    title: 'Penjemputan',
    desc: 'Tim lapangan Dinsos Kab/Kota melakukan penjemputan ODGJ di lokasi.',
  },
  {
    icon: Building2,
    title: 'Perawatan & Pemulihan',
    desc: 'Perawatan di RSJ Cisarua hingga diserahkan kembali ke keluarga atau panti.',
  },
]

const STATS = [
  { value: '24/7', label: 'Pelaporan online' },
  { value: '27', label: 'Kabupaten/Kota' },
  { value: '5', label: 'Tahap penanganan' },
  { value: '14 hari', label: 'Evaluasi perawatan' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="border-primary/30 bg-accent text-accent-foreground"
              >
                Dinas Sosial Provinsi Jawa Barat
              </Badge>
              <h1 className="text-pretty text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Laporkan & bantu penanganan{' '}
                <span className="text-primary">ODGJ</span> di sekitar Anda
              </h1>
              <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                Jabar Bebas NuGelo menghubungkan masyarakat, Dinas Sosial, dan
                RSJ Cisarua dalam satu alur penanganan yang transparan dan dapat
                dilacak. Satu laporan Anda dapat menyelamatkan satu jiwa.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button render={<Link href="/lapor" />} size="lg">
                  Buat Laporan
                  <ArrowRight className="size-4" />
                </Button>
                <Button render={<Link href="/dashboard" />} variant="outline" size="lg">
                  Dashboard Admin
                  <ShieldCheck className="size-4" />
                </Button>
                <Button
                  render={<Link href="/lacak" />}
                  variant="outline"
                  size="lg"
                >
                  <Search className="size-4" />
                  Cek Status Laporan
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
                <Image
                  src="/hero-community.png"
                  alt="Petugas sosial dan relawan membantu ODGJ di Jawa Barat"
                  width={720}
                  height={560}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:flex">
                <span className="flex size-10 items-center justify-center rounded-xl bg-tertiary text-tertiary-foreground">
                  <HeartHandshake className="size-5" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">Penanganan Terpadu</p>
                  <p className="text-xs text-muted-foreground">
                    Provinsi · Kab/Kota · RSJ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-surface-container">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-2 py-6 text-center">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Bagaimana cara kerjanya?
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Empat langkah sederhana dari laporan masyarakat hingga ODGJ
              mendapat penanganan yang layak.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-border bg-card p-6"
              >
                <span className="absolute right-5 top-5 text-4xl font-bold text-muted/60">
                  {i + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <step.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Status flow */}
        <section className="bg-surface-container">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  Lacak setiap tahap penanganan
                </h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Gunakan Nomor Tiket Laporan atau NIK pelapor untuk memantau
                  perjalanan laporan Anda secara real-time melalui lima tahap
                  penanganan.
                </p>
                <Button render={<Link href="/lacak" />} variant="outline">
                  <Search className="size-4" />
                  Cek Laporan Saya
                </Button>
              </div>
              <ol className="relative space-y-5 border-l-2 border-border pl-6">
                {STATUS_FLOW.map((s, i) => (
                  <li key={s.key} className="relative">
                    <span className="absolute -left-[31px] flex size-5 items-center justify-center rounded-full border-2 border-primary bg-background text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold">{s.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {s.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              Menemukan ODGJ yang butuh bantuan?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-primary-foreground/85">
              Jangan ragu untuk melapor. Identitas pelapor dijaga dan setiap
              laporan ditindaklanjuti oleh petugas berwenang.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                render={<Link href="/lapor" />}
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Buat Laporan Sekarang
                <ArrowRight className="size-4" />
              </Button>
              <span className="flex items-center gap-2 text-sm text-primary-foreground/85">
                <Phone className="size-4" />
                Darurat: hubungi 119
              </span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
