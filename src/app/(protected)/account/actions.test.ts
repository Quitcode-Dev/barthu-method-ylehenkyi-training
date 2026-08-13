import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockSignOut = vi.fn().mockResolvedValue({})
const mockRedirect = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      signOut: mockSignOut,
    },
  }),
}))

vi.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args)
    throw new Error('NEXT_REDIRECT')
  },
}))

import { logout } from './actions'

describe('logout server action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls supabase.auth.signOut()', async () => {
    try {
      await logout()
    } catch {
      // redirect throws NEXT_REDIRECT
    }

    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })

  it('redirects to /login after signing out', async () => {
    try {
      await logout()
    } catch {
      // redirect throws NEXT_REDIRECT
    }

    expect(mockRedirect).toHaveBeenCalledWith('/login')
  })
})
