'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface SubmitFeedbackInput {
  sessionLogId: string
  exerciseId: string
  painRating: number
  energyRating: number
  stressRating: number
  comment: string
}

export async function submitFeedback(input: SubmitFeedbackInput) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { error } = await supabase.from('session_feedback').insert({
    user_id: user.id,
    session_log_id: input.sessionLogId,
    exercise_id: input.exerciseId,
    pain_rating: input.painRating,
    energy_rating: input.energyRating,
    stress_rating: input.stressRating,
    comment: input.comment || null,
    created_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error(`Failed to submit feedback: ${error.message}`)
  }

  return { success: true }
}

export async function skipFeedback(sessionLogId: string) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('session_feedback')
    .insert({
      user_id: user.id,
      session_log_id: sessionLogId,
      skipped: true,
      created_at: new Date().toISOString(),
    })

  if (error) {
    throw new Error(`Failed to record skipped feedback: ${error.message}`)
  }

  return { success: true }
}
