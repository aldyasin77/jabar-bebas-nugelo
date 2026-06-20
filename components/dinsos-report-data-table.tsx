import { format, parseISO } from 'date-fns'
import { Button } from '@/components/ui/button'

export type DinsosEmergencyLevel = 'darurat' | 'sedang' | 'rendah'

export interface DinsosReportRow {
  id: string
  tanggalLapor: string
  lokasi: string
  tingkatDarurat: DinsosEmergencyLevel
}

const CHIP_STYLES: Record<DinsosEmergencyLevel, string> = {
  darurat: 'bg-[#C62828] text-white border-[#C62828]',
  sedang: 'bg-[#FFF4E5] text-[#8A4B08] border-[#F0C27B]',
  rendah: 'bg-[#E8F5E9] text-[#1B5E20] border-[#A5D6A7]',
}

const CHIP_LABELS: Record<DinsosEmergencyLevel, string> = {
  darurat: 'Darurat',
  sedang: 'Sedang',
  rendah: 'Rendah',
}

function formatReportDate(value: string) {
  const parsed = parseISO(value)
  if (Number.isNaN(parsed.getTime())) return '-'
  return format(parsed, 'MMM dd, yyyy')
}

export function DinsosReportDataTable({
  rows,
  onForward,
}: {
  rows: DinsosReportRow[]
  onForward?: (row: DinsosReportRow) => void
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E0E0E0] bg-[#FAFAFA]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-[#E0E0E0] bg-[#FAFAFA]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#616161] uppercase">No. Tiket</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#616161] uppercase">Tanggal Lapor</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#616161] uppercase">Lokasi</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#616161] uppercase">Tingkat Darurat</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#616161] uppercase">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[#E0E0E0] last:border-b-0">
                <td className="px-4 py-3 text-sm font-bold text-[#212121]">{row.id}</td>
                <td className="px-4 py-3 text-sm text-[#212121]">{formatReportDate(row.tanggalLapor)}</td>
                <td className="px-4 py-3 text-sm text-[#212121]">{row.lokasi}</td>
                <td className="px-4 py-3">
                  <span
                    className={[
                      'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
                      CHIP_STYLES[row.tingkatDarurat],
                    ].join(' ')}
                  >
                    {CHIP_LABELS[row.tingkatDarurat]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    className="h-8 bg-[#1565C0] px-3 text-xs text-white hover:bg-[#0D47A1]"
                    onClick={() => onForward?.(row)}
                  >
                    Teruskan
                  </Button>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-[#616161]">
                  Belum ada data laporan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
