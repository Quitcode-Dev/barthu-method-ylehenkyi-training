import { notFound } from 'next/navigation'

import ExerciseForm from '@/components/admin/exercise-form'
import type { Exercise } from '@/lib/exercises/types'
import { createClient } from '@/lib/supabase/server'
import { updateExercise } from '../../actions'

interface EditExercisePageProps {
  params: Promise<{ id: string }>
}

export default async function AdminExerciseEditPage({
  params,
}: EditExercisePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: exercise, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !exercise) {
    notFound()
  }

  const typedExercise = exercise as Exercise

  // Bind the exercise id to the updateExercise action
  const boundUpdate = updateExercise.bind(null, typedExercise.id)

  return <ExerciseForm exercise={typedExercise} action={boundUpdate} />
}
