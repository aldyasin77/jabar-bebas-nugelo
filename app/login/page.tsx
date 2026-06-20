import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LoginForm } from '@/components/auth/login-form'
import { Button } from '@/components/ui/button'

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { redirect?: string; reason?: string }
}) {
  return (
    <main className="min-h-dvh bg-[#FAFAFA] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Button render={<Link href="/" />} variant="outline" className="border-[#BDBDBD] bg-white">
          <ArrowLeft className="size-4" />
          Kembali ke Beranda
        </Button>

        <LoginForm redirectPath={'/dashboard'} reason={searchParams?.reason} />
      </div>
    </main>
  )
}
