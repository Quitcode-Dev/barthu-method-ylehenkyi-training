import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ProgressCardProps {
  totalExercises: number
  completedExercises: number
  pathwayName: string
}

export function ProgressCard({
  totalExercises,
  completedExercises,
  pathwayName,
}: ProgressCardProps) {
  const percentage =
    totalExercises > 0
      ? Math.round((completedExercises / totalExercises) * 100)
      : 0

  const isComplete = percentage === 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pathwayName}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {completedExercises} of {totalExercises} exercises completed
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-2xl font-bold text-primary mt-3">{percentage}%</p>
        {isComplete && (
          <p className="text-green-600 font-semibold mt-2">
            🎉 Program Complete!
          </p>
        )}
      </CardContent>
    </Card>
  )
}
