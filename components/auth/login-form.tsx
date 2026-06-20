'use client'

import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole, LogIn, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AUTH_SESSION_COOKIE,
  DASHBOARD_ACCOUNTS,
  DASHBOARD_ROLE_LABELS,
  buildSessionValue,
  getAccountByCredentials,
} from '@/lib/auth'

type LoginFormProps = {
  redirectPath?: string
  reason?: string
}

function setSessionCookie(value: string) {
  document.cookie = `${AUTH_SESSION_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=86400; samesite=lax`
}

export function LoginForm({ redirectPath = '/dashboard', reason }: LoginFormProps) {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const accountHints = useMemo(
    () =>
      DASHBOARD_ACCOUNTS.map((account) => ({
        ...account,
        passwordHint: account.password,
      })),
    [],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const account = getAccountByCredentials(username.trim(), password.trim())

    console.log(account);
    
    if (!account) {
      setError('Username atau password tidak valid.')
      setLoading(false)
      return
    }

    setSessionCookie(buildSessionValue(account))
    router.replace(redirectPath)
    router.refresh()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#E3F2FD] text-[#1565C0]">
              <LockKeyhole className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#212121]">Login Dashboard</h1>
              <p className="mt-1 text-sm text-[#616161]">
                Gunakan akun hardcode demo untuk mengakses dashboard sesuai role.
              </p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="dispatcher / kabkota / rsj"
                className="h-10 border-[#BDBDBD] bg-white"
                autoComplete="username"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan password"
                className="h-10 border-[#BDBDBD] bg-white"
                autoComplete="current-password"
              />
            </div>

            {reason === 'forbidden' && (
              <div className="rounded-xl border border-[#FBC02D] bg-[#FFF8E1] px-4 py-3 text-sm text-[#7A4A00]">
                Akun yang login tidak memiliki akses ke dashboard yang dituju.
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-[#C62828] bg-[#FDECEC] px-4 py-3 text-sm text-[#C62828]">
                <span className="inline-flex items-center gap-2">
                  <ShieldAlert className="size-4" />
                  {error}
                </span>
              </div>
            )}

            <Button
              type="submit"
              className="h-10 w-full bg-[#1565C0] text-white hover:bg-[#0D47A1]"
              disabled={loading}
            >
              Masuk Dashboard
              <LogIn className="size-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border border-[#E0E0E0] bg-[#FAFAFA] shadow-sm">
        <CardContent className="space-y-4 p-6">
          <div>
            <h2 className="text-lg font-semibold text-[#212121]">Akun Demo Hardcode</h2>
            <p className="mt-1 text-sm text-[#616161]">
              Pilih akun sesuai role yang ingin diakses.
            </p>
          </div>

          <div className="space-y-3">
            {accountHints.map((account) => (
              <div key={account.username} className="rounded-xl border border-[#E0E0E0] bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#212121]">{DASHBOARD_ROLE_LABELS[account.role]}</p>
                    <p className="text-sm text-[#616161]">Username: {account.username}</p>
                    <p className="text-sm text-[#616161]">Password: {account.passwordHint}</p>
                  </div>
                  <span className="rounded-full bg-[#E3F2FD] px-3 py-1 text-xs font-semibold text-[#1565C0]">
                    {account.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
