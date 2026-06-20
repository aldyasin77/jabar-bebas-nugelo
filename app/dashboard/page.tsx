import Link from 'next/link'
import { ArrowRight, Building2, Hospital, Landmark, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const DASHBOARDS = [
  {
    href: '/dashboard/provinsi',
    title: 'Dashboard Dinsos Provinsi',
    desc: 'Monitoring laporan baru dan disposisi cepat ke Kab/Kota tujuan.',
    icon: Landmark,
  },
  {
    href: '/dashboard/kab-kota',
    title: 'Dashboard Dinsos Kab/Kota',
    desc: 'Manajemen aksi lapangan, penjemputan, dan penyelesaian kasus.',
    icon: Building2,
  },
  {
    href: '/dashboard/rsj',
    title: 'Dashboard RSJ Cisarua',
    desc: 'Pelacakan durasi perawatan, timeline kondisi, dan evaluasi akhir.',
    icon: Hospital,
  },
]

export default function DashboardIndexPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#616161]">
          Dashboard Admin
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#212121]">
          Pilih Role Dashboard
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#616161]">
          Akses cepat ke dashboard Provinsi, Kab/Kota, dan RSJ Cisarua dengan desain Material Design 3.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {DASHBOARDS.map((item) => (
          <Card key={item.href} className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#E3F2FD] text-[#1565C0]">
                <item.icon className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#212121]">{item.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-[#616161]">{item.desc}</p>
              </div>
              <Button render={<Link href={item.href} />} className="h-10 bg-[#1565C0] text-white hover:bg-[#0D47A1]">
                Buka Dashboard
                <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
