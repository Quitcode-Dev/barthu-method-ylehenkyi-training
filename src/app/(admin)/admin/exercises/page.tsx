import Link from 'next/link'

import ExerciseTable from '@/components/admin/exercise-table'
import { Button } from '@/components/ui/button'
import type { Exercise } from '@/lib/exercises/types'
import { createClient } from '@/lib/supabase/server'

export default async function AdminExercisesPage() {
  const supabase = await createClient()

  const { data: exercises } = await supabase
    .from('exercises')
    .select('*')
    .order('name', { ascending: true })

  const typedExercises = (exercises ?? []) as Exercise[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exercises</h1>
        <Link href="/admin/exercises/new">
          <Button variant="default">New Exercise</Button>
        </Link>
      </div>

      <ExerciseTable exercises={typedExercises} />
    </div>
  )
}
