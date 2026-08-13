'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function register(formData: {
  email: string
  password: string
  first_name: string
  last_name: string
}): Promise<{ error: string }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        first_name: formData.first_name,
        last_name: formData.last_name,
      },
    },
  })

  if (error) {
    if (
      error.message.toLowerCase().includes('already registered') ||
      error.message.toLowerCase().includes('already been registered') ||
      error.message.toLowerCase().includes('user already registered')
    ) {
      return { error: 'User already registered' }
    }
    return { error: error.message }
  }

  redirect('/assessment')
}
