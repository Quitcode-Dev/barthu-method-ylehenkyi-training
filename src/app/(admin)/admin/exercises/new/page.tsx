import ExerciseForm from '@/components/admin/exercise-form'
import { createExercise } from '../actions'

export default function AdminExerciseFormPage() {
  return <ExerciseForm action={createExercise} />
}
