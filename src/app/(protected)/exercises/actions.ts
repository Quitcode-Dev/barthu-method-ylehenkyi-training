'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function markExerciseComplete(exerciseId: string): Promise<{ sessionLogId: string }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { data, error } = await supabase
    .from('session_logs')
    .insert({
      user_id: user.id,
      exercise_id: exerciseId,
      completed_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (error || !data) {
    throw new Error(`Failed to log session: ${error?.message ?? 'No data returned'}`)
  }

  return { sessionLogId: data.id }
}

interface SubmitFeedbackInput {
  exerciseId: string
  sessionLogId: string
  painRating: number
  energyRating: number
  stressRating: number
  comment?: string
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

  // Prevent duplicate feedback for the same session
  const { data: existing } = await supabase
    .from('post_session_feedback')
    .select('id')
    .eq('session_log_id', input.sessionLogId)
    .maybeSingle()

  if (existing) {
    return { success: true, duplicate: true }
  }

  const { error } = await supabase.from('post_session_feedback').insert({
    user_id: user.id,
    session_log_id: input.sessionLogId,
    exercise_id: input.exerciseId,
    pain_rating: input.painRating,
    energy_rating: input.energyRating,
    stress_rating: input.stressRating,
    comment: input.comment || null,
    submitted_at: new Date().toISOString(),
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

  // Prevent duplicate feedback for the same session
  const { data: existing } = await supabase
    .from('post_session_feedback')
    .select('id')
    .eq('session_log_id', sessionLogId)
    .maybeSingle()

  if (existing) {
    return { success: true, duplicate: true }
  }

  const { error } = await supabase.from('post_session_feedback').insert({
    user_id: user.id,
    session_log_id: sessionLogId,
    skipped: true,
    pain_rating: null,
    energy_rating: null,
    stress_rating: null,
    comment: null,
    submitted_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error(`Failed to record skipped feedback: ${error.message}`)
  }

  return { success: true }
}
