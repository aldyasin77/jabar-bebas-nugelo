import Link from 'next/link'
import { HeartHandshake } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-container">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HeartHandshake className="size-4" />
            </span>
            <span className="text-sm font-bold">Jabar Bebas NuGelo</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Platform pelaporan dan penanganan ODGJ terpadu untuk Provinsi Jawa
            Barat. Setiap laporan Anda berarti.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Layanan</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/lapor" className="hover:text-foreground">
                Buat Laporan ODGJ
              </Link>
            </li>
            <li>
              <Link href="/lacak" className="hover:text-foreground">
                Cek Riwayat Laporan
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Kontak Darurat</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Dinas Sosial Provinsi Jawa Barat</li>
            <li>Call Center: 119</li>
            <li>RSJ Cisarua, Bandung Barat</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
          © 2026 Jabar Bebas NuGelo — Dinas Sosial Provinsi Jawa Barat.
        </div>
      </div>
    </footer>
  )
}
