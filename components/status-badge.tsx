import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { EmergencyLevel, ReportStatusKey } from '@/lib/types'
import { STATUS_FLOW } from '@/lib/types'

const STATUS_STYLE: Record<ReportStatusKey, string> = {
  diterima: 'bg-surface-container-high text-foreground',
  diteruskan: 'bg-accent text-accent-foreground',
  penjemputan: 'bg-warning-container text-on-warning-container',
  perawatan: 'bg-primary text-primary-foreground',
  selesai: 'bg-tertiary-container text-on-tertiary-container',
}

export function StatusBadge({
  status,
  className,
}: {
  status: ReportStatusKey
  className?: string
}) {
  const label = STATUS_FLOW.find((s) => s.key === status)?.label ?? status
  return (
    <Badge className={cn('border-transparent', STATUS_STYLE[status], className)}>
      {label}
    </Badge>
  )
}

const EMERGENCY_STYLE: Record<EmergencyLevel, string> = {
  darurat: 'bg-destructive text-destructive-foreground',
  sedang: 'bg-warning-container text-on-warning-container',
  rendah: 'bg-secondary text-secondary-foreground',
}

const EMERGENCY_LABEL: Record<EmergencyLevel, string> = {
  darurat: 'Darurat',
  sedang: 'Perlu Perhatian',
  rendah: 'Rendah',
}

export function EmergencyBadge({
  level,
  className,
}: {
  level: EmergencyLevel
  className?: string
}) {
  return (
    <Badge
      className={cn('border-transparent', EMERGENCY_STYLE[level], className)}
    >
      {EMERGENCY_LABEL[level]}
    </Badge>
  )
}
