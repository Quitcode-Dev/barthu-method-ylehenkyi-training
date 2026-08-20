'use client'

import { logout } from '@/app/(auth)/logout/actions'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button variant="ghost" type="submit">
        Log out
      </Button>
    </form>
  )
}
