'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function updatePassword(data: { password: string }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: data.password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/login?message=Password updated successfully')
}
