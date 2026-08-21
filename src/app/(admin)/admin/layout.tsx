import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { isAdmin } from '@/lib/auth/roles'
import { createClient } from '@/lib/supabase/server'

import { AdminSidebar } from './admin-sidebar'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdmin(user)) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
