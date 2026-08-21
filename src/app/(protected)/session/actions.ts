'use server'

import { markExerciseComplete } from '@/app/(protected)/exercises/actions'

// Re-export markExerciseComplete as completeSession for backward compatibility
export async function completeSession(exerciseId: string): Promise<{ sessionLogId: string }> {
  return markExerciseComplete(exerciseId)
}
