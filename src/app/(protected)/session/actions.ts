'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function completeSession(exerciseId: string) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { error } = await supabase.from('session_logs').insert({
    user_id: user.id,
    exercise_id: exerciseId,
    completed_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error(`Failed to log session: ${error.message}`)
  }

  redirect('/dashboard')
}
