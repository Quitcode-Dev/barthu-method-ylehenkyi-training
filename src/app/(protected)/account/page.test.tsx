import { describe, it, expect, vi } from 'vitest'

const mockGetUser = vi.fn()
const mockRedirect = vi.fn()

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: mockGetUser,
    },
  }),
}))

vi.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args)
    throw new Error('NEXT_REDIRECT')
  },
}))

import AccountPage from './page'

describe('AccountPage', () => {
  it('redirects to /login when user is not authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: new Error('Not authenticated') })

    try {
      await AccountPage()
    } catch {
      // redirect throws NEXT_REDIRECT
    }

    expect(mockRedirect).toHaveBeenCalledWith('/login')
  })

  it('renders user profile information when authenticated', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-15T10:30:00Z',
      user_metadata: {
        first_name: 'John',
        last_name: 'Doe',
      },
    }
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null })

    const result = await AccountPage()

    expect(result).toBeDefined()
  })

  it('displays first name from user_metadata', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-15T10:30:00Z',
      user_metadata: {
        first_name: 'Jane',
        last_name: 'Smith',
      },
    }
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null })

    const result = await AccountPage()

    // Verify the JSX tree contains the user's first name
    const rendered = JSON.stringify(result)
    expect(rendered).toContain('Jane')
  })

  it('displays last name from user_metadata', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-15T10:30:00Z',
      user_metadata: {
        first_name: 'Jane',
        last_name: 'Smith',
      },
    }
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null })

    const result = await AccountPage()

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('Smith')
  })

  it('displays user email', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-15T10:30:00Z',
      user_metadata: {
        first_name: 'Jane',
        last_name: 'Smith',
      },
    }
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null })

    const result = await AccountPage()

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('test@example.com')
  })

  it('displays formatted registration date', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-15T10:30:00Z',
      user_metadata: {
        first_name: 'Jane',
        last_name: 'Smith',
      },
    }
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null })

    const result = await AccountPage()

    // The date should be formatted via toLocaleDateString
    const expectedDate = new Date('2024-01-15T10:30:00Z').toLocaleDateString()
    const rendered = JSON.stringify(result)
    expect(rendered).toContain(expectedDate)
  })

  it('displays membership status as Free', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-15T10:30:00Z',
      user_metadata: {
        first_name: 'Jane',
        last_name: 'Smith',
      },
    }
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null })

    const result = await AccountPage()

    const rendered = JSON.stringify(result)
    expect(rendered).toContain('Free')
  })

  it('handles missing user_metadata gracefully', async () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-15T10:30:00Z',
      user_metadata: {},
    }
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null })

    const result = await AccountPage()

    expect(result).toBeDefined()
  })
})
