'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { mapToPathway } from '@/lib/assessment/pathway-mapper'
import type { AssessmentResponse } from '@/lib/assessment/types'

/**
 * Server action that receives assessment responses, stores them in the
 * `assessments` table, determines the pathway assignment, inserts the
 * assignment into `user_programs`, and redirects to `/dashboard`.
 */
export async function submitAssessment(responses: AssessmentResponse[]) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Unauthenticated')
  }

  // Store assessment responses with version tracking
  const { error: assessmentError } = await supabase.from('assessments').insert({
    user_id: user.id,
    responses: responses as unknown as Record<string, unknown>,
    version: '1.0',
    completed_at: new Date().toISOString(),
  })

  if (assessmentError) {
    throw new Error('Failed to save assessment')
  }

  // Determine pathway assignment based on responses
  const pathwayId = mapToPathway(responses)

  // Create user program linking user to their assigned pathway
  const { error: programError } = await supabase.from('user_programs').insert({
    user_id: user.id,
    pathway_id: pathwayId,
    status: 'active',
    assigned_at: new Date().toISOString(),
  })

  if (programError) {
    throw new Error('Failed to assign pathway')
  }

  redirect('/dashboard')
}
