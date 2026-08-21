import { redirect } from 'next/navigation'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/server'
import { PATHWAY_DETAILS } from '@/lib/assessment/pathways'
import {
  getUserProgram,
  getProgramExercises,
  getCompletedExerciseIds,
} from '@/lib/programs/queries'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Fetch active program for the user
  const program = await getUserProgram(supabase, user.id)

  // No active program → redirect to assessment
  if (!program) {
    redirect('/assessment')
  }

  const pathwayId = program.pathway_id
  const pathwayInfo = PATHWAY_DETAILS[pathwayId] ?? {
    name: 'Your Program',
    description: 'A personalized program tailored for you.',
  }

  // Fetch exercises and completed status in parallel
  const [exercises, completedIds] = await Promise.all([
    getProgramExercises(supabase, pathwayId),
    getCompletedExerciseIds(supabase, user.id),
  ])

  const totalExercises = exercises.length
  const completedCount = exercises.filter((e) => completedIds.has(e.id)).length
  const allCompleted = totalExercises > 0 && completedCount === totalExercises
  const progressPercent =
    totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto">
      {/* Pathway overview card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{pathwayInfo.name}</CardTitle>
          <CardDescription>{pathwayInfo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{totalExercises} exercises completed
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* All completed congratulations */}
      {allCompleted && (
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">
              🎉 Congratulations!
            </CardTitle>
            <CardDescription className="text-green-700">
              You&apos;ve completed all exercises in your program. Great work!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/assessment">
              <Button variant="outline">Retake Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Exercise list */}
      <div className="space-y-4">
        {exercises.map((exercise) => {
          const isCompleted = completedIds.has(exercise.id)
          return (
            <Link
              key={exercise.id}
              href={`/session/${exercise.id}`}
              className="block"
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">
                        {exercise.name}
                      </h3>
                      {isCompleted && (
                        <span
                          className="text-green-600 flex-shrink-0"
                          aria-label="Completed"
                        >
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        {exercise.duration_minutes} min
                      </Badge>
                      <Badge variant="outline">{exercise.intensity}</Badge>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <Button variant="outline" size="sm" tabIndex={-1}>
                      ▶ Play
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {exercises.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No exercises are available for this program yet. Please check back
            later.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
