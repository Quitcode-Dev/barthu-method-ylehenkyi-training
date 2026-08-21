import type { SupabaseClient } from '@supabase/supabase-js'

// ---------------------------------------------------------------------------
// Types for query results
// ---------------------------------------------------------------------------

export type UserProgram = {
  id: string
  user_id: string
  pathway_id: string
  status: string
  assigned_at: string
}

export type ProgramExercise = {
  id: string
  name: string
  description: string
  video_url: string
  duration_minutes: number
  intensity: string
  progression_level: string
  is_active: boolean
  pathway_ids: string[]
  created_at: string
}

export type SessionLog = {
  id: string
  user_id: string
  exercise_id: string
  completed_at: string
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/**
 * Fetch the active user program for a given user.
 * Returns null if the user has no active program (i.e. hasn't completed
 * the assessment yet).
 */
export async function getUserProgram(
  supabase: SupabaseClient,
  userId: string
): Promise<UserProgram | null> {
  const { data, error } = await supabase
    .from('user_programs')
    .select('id, user_id, pathway_id, status, assigned_at')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('assigned_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch user program: ${error.message}`)
  }

  return data
}

/**
 * Fetch all active exercises for a given pathway, ordered by created_at.
 * Exercises are matched by checking if the pathway_id is contained
 * in the exercise's `pathway_ids` array column.
 */
export async function getProgramExercises(
  supabase: SupabaseClient,
  pathwayId: string
): Promise<ProgramExercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select(
      'id, name, description, video_url, duration_minutes, intensity, progression_level, is_active, pathway_ids, created_at'
    )
    .eq('is_active', true)
    .contains('pathway_ids', [pathwayId])
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch exercises: ${error.message}`)
  }

  return data ?? []
}

/**
 * Fetch completed session logs for a user, returning the set of
 * exercise IDs the user has completed.
 */
export async function getCompletedExerciseIds(
  supabase: SupabaseClient,
  userId: string
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from('session_logs')
    .select('exercise_id')
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to fetch session logs: ${error.message}`)
  }

  const ids = new Set<string>()
  if (data) {
    for (const row of data) {
      ids.add(row.exercise_id)
    }
  }
  return ids
}
