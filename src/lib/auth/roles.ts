import type { User } from '@supabase/supabase-js'

/**
 * Check whether the given Supabase user has the admin role.
 * Currently inspects `user_metadata.role`; can be extended to
 * query a `user_roles` or `profiles` table if needed.
 */
export function isAdmin(user: User): boolean {
  return user.user_metadata?.role === 'admin'
}
