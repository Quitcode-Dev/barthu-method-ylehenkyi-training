'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import type { AssessmentResponse } from '@/lib/assessment/types'

export async function submitAssessment(responses: AssessmentResponse) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const { error } = await supabase.from('assessments').insert({
    user_id: user.id,
    responses,
    completed_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error('Failed to save assessment')
  }

  redirect('/dashboard')
}
