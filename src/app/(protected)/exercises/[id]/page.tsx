import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { CompleteExerciseButton } from '@/components/dashboard/complete-exercise-button'

interface ExercisePageProps {
  params: Promise<{ id: string }>
}

export default async function ExercisePage({ params }: ExercisePageProps) {
  const { id: exerciseId } = await params

  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Fetch exercise by ID
  const { data: exercise, error: exerciseError } = await supabase
    .from('exercises')
    .select(
      'id, name, description, video_url, duration_minutes, intensity, progression_level'
    )
    .eq('id', exerciseId)
    .maybeSingle()

  if (exerciseError) {
    throw new Error(`Failed to fetch exercise: ${exerciseError.message}`)
  }

  if (!exercise) {
    notFound()
  }

  // Check if already completed
  const { data: sessionLog } = await supabase
    .from('session_logs')
    .select('id')
    .eq('user_id', user.id)
    .eq('exercise_id', exerciseId)
    .limit(1)
    .maybeSingle()

  const isCompleted = !!sessionLog

  // Check if feedback already exists for this exercise and user
  const { data: existingFeedback } = await supabase
    .from('session_feedback')
    .select('id')
    .eq('user_id', user.id)
    .eq('exercise_id', exerciseId)
    .limit(1)
    .maybeSingle()

  const hasFeedback = !!existingFeedback

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mt-4">{exercise.name}</h1>
      <p className="text-muted-foreground mt-2">{exercise.description}</p>

      {/* Video player */}
      <div className="bg-black rounded-lg overflow-hidden mt-6">
        <iframe
          src={exercise.video_url}
          className="w-full aspect-video rounded-lg"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>

      {/* Exercise metadata */}
      <div className="flex gap-4 mt-4">
        <Badge variant="secondary">{exercise.duration_minutes} min</Badge>
        <Badge variant="outline">{exercise.intensity}</Badge>
        <Badge variant="default">{exercise.progression_level}</Badge>
      </div>

      {/* Complete button with integrated feedback */}
      <CompleteExerciseButton
        exerciseId={exercise.id}
        isCompleted={isCompleted}
        hasFeedback={hasFeedback}
      />
    </div>
  )
}
