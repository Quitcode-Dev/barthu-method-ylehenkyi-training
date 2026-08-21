'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

interface SubmitFeedbackData {
  exerciseId: string
  painRating: number
  energyRating: number
  stressRating: number
  comment?: string
}

export async function submitFeedback(data: SubmitFeedbackData) {
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
    exercise_id: data.exerciseId,
    pain_rating: data.painRating,
    energy_rating: data.energyRating,
    stress_rating: data.stressRating,
    comment: data.comment || null,
    created_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error(`Failed to submit feedback: ${error.message}`)
  }

  return { success: true }
}

export async function skipFeedback(exerciseId: string) {
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
    exercise_id: exerciseId,
    skipped: true,
    created_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error(`Failed to record skipped feedback: ${error.message}`)
  }

  return { success: true }
}
