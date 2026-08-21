import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { isAdmin } from '@/lib/auth/roles'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdmin(user)) {
    redirect('/dashboard')
  }

  const email = user.email ?? ''

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-slate-900 text-white px-6 py-3 flex items-center gap-6">
        <Link href="/admin/exercises" className="text-sm font-medium hover:underline">
          Exercises
        </Link>
        <Link href="/admin/users" className="text-sm font-medium hover:underline">
          Users
        </Link>
        <Link href="/dashboard" className="text-sm font-medium hover:underline">
          Dashboard
        </Link>
        <span className="ml-auto text-sm text-slate-300">{email}</span>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-8 w-full">{children}</main>
    </div>
  )
}
