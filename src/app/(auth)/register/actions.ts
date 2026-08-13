'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface RegisterState {
  error?: string
}

export async function register(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
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
