import { NewOdgjReportForm } from '@/components/forms/new-odgj-report-form'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function LaporPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#FAFAFA]">
      <SiteHeader />
      <main className="flex-1">
        <NewOdgjReportForm />
      </main>
      <SiteFooter />
    </div>
  )
}
