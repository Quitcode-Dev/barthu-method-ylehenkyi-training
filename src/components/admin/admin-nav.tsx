'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Exercises', href: '/admin/exercises' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Reports', href: '/admin/reports' },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {navLinks.map(({ label, href }) => {
        const isActive = pathname.startsWith(href)

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'block py-2 px-3 rounded-md hover:bg-muted text-sm',
              isActive && 'bg-muted font-medium',
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
