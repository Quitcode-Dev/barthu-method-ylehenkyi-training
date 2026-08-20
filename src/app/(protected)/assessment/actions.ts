'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { assignPathway } from '@/lib/assessment/pathway-logic'
import type { AssessmentResponseMap } from '@/lib/assessment/types'

export async function submitAssessment(responses: AssessmentResponseMap) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Store assessment responses with version tracking
  const { error: assessmentError } = await supabase.from('assessments').insert({
    user_id: user.id,
    version: 1,
    responses: JSON.stringify(responses),
    completed_at: new Date().toISOString(),
  })

  if (assessmentError) {
    throw new Error('Failed to save assessment')
  }

  // Determine pathway assignment based on responses
  const pathwayId = assignPathway(responses)

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

  // Redirect with cleared=1 so the client component can clear localStorage
  redirect('/dashboard?cleared=1')
}
