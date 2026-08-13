'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

type RegisterInput = {
  first_name: string
  last_name: string
  email: string
  password: string
}

export async function registerUser(data: RegisterInput) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/assessment')
}
