import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { CompleteButton } from '@/components/session/complete-button'

interface SessionPageProps {
  params: Promise<{ exerciseId: string }>
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { exerciseId } = await params

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

      {/* Complete button */}
      <CompleteButton exerciseId={exercise.id} isCompleted={isCompleted} />
    </div>
  )
}
