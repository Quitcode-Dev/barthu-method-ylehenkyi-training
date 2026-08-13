import Link from 'next/link'
import { ReactNode } from 'react'

import { logout } from './account/actions'

import { Button } from '@/components/ui/button'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <nav className='bg-card border-b px-6 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link href='/dashboard' className='text-sm font-medium hover:underline'>
            Dashboard
          </Link>
          <Link href='/account' className='text-sm font-medium hover:underline'>
            Account
          </Link>
        </div>
        <form action={logout}>
          <Button variant='outline' size='sm' type='submit'>
            Logout
          </Button>
        </form>
      </nav>
      <main className='max-w-4xl mx-auto px-4 py-8 w-full'>
        {children}
      </main>
    </div>
  )
}
