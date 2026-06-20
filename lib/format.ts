const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// All dates in the app must be displayed as "MMM DD, YYYY" (e.g. "Jun 10, 2026").
export function formatDate(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(d.getTime())) return '-'
  const month = MONTHS[d.getMonth()]
  const day = String(d.getDate()).padStart(2, '0')
  return `${month} ${day}, ${d.getFullYear()}`
}

export function formatDateTime(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input
  if (Number.isNaN(d.getTime())) return '-'
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${formatDate(d)} • ${hours}:${minutes}`
}
