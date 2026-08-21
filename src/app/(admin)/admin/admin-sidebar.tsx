'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Exercises', href: '/admin/exercises' },
  { label: 'Users', href: '/admin/users' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r p-4">
      <h2 className="text-lg font-semibold mb-6 px-3">Admin</h2>
      <nav className="flex flex-col gap-1">
        {navLinks.map(({ label, href }) => {
          const isActive =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
              )}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
