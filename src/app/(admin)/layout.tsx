import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { AdminNav } from '@/components/admin/admin-nav'
import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/dashboard')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-card border-r p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-6">Barthu Admin</h2>
        <AdminNav />
        <div className="mt-auto flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="block py-2 px-3 rounded-md hover:bg-muted text-sm"
          >
            Back to Dashboard
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
