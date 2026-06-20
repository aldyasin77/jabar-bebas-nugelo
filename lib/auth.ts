export type DashboardRole = 'dispatcher' | 'executor' | 'medic'

export type DashboardAccount = {
  username: string
  password: string
  role: DashboardRole
  label: string
  dashboardPath: string
}

export const AUTH_SESSION_COOKIE = 'jbn-dashboard-session'

export const DASHBOARD_ACCOUNTS: DashboardAccount[] = [
  {
    username: 'dispatcher',
    password: 'disp-1565',
    role: 'dispatcher',
    label: 'Dispatcher Provinsi',
    dashboardPath: '/dashboard/provinsi',
  },
  {
    username: 'kabkota',
    password: 'lapang-1565',
    role: 'executor',
    label: 'Eksekutor Kab/Kota',
    dashboardPath: '/dashboard/kab-kota',
  },
  {
    username: 'rsj',
    password: 'rsj-1565',
    role: 'medic',
    label: 'RSJ Cisarua',
    dashboardPath: '/dashboard/rsj',
  },
]

export const ROLE_DASHBOARD_PATHS: Record<DashboardRole, string> = {
  dispatcher: '/dashboard/provinsi',
  executor: '/dashboard/kab-kota',
  medic: '/dashboard/rsj',
}

export const DASHBOARD_ROLE_LABELS: Record<DashboardRole, string> = {
  dispatcher: 'Dispatcher Provinsi',
  executor: 'Eksekutor Kab/Kota',
  medic: 'RSJ Cisarua',
}

export function getAccountByCredentials(username: string, password: string) {
  return DASHBOARD_ACCOUNTS.find(
    (account) => account.username === username && account.password === password,
  )
}

export function buildSessionValue(account: DashboardAccount) {
  return `${account.role}:${account.username}`
}

export function parseSessionValue(value?: string | null) {
  if (!value) return null

  const [role, username] = value.split(':')
  if (!role || !username) return null

  const account = DASHBOARD_ACCOUNTS.find(
    (item) => item.role === role && item.username === username,
  )

  return account ?? null
}

export function getRequiredRoleForPath(pathname: string) {
  if (pathname.startsWith('/dashboard/provinsi')) return 'dispatcher'
  if (pathname.startsWith('/dashboard/kab-kota')) return 'executor'
  if (pathname.startsWith('/dashboard/rsj')) return 'medic'
  return null
}
