'use client'

import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { submitFeedback, skipFeedback } from '@/app/(protected)/session/feedback-actions'

interface FeedbackFormProps {
  sessionId: string
  exerciseId: string
  onComplete: () => void
  onSkip: () => void
}

function RatingSelector({
  label,
  value,
  onChange,
}: {
  label: string
  value: number | null
  onChange: (value: number) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground mr-1">Low</span>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              className={
                value === num
                  ? 'bg-primary text-primary-foreground rounded-full w-8 h-8 text-sm font-medium flex items-center justify-center'
                  : 'bg-muted hover:bg-accent rounded-full w-8 h-8 text-sm font-medium flex items-center justify-center'
              }
            >
              {num}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-1">High</span>
      </div>
    </div>
  )
}

export function FeedbackForm({
  sessionId,
  exerciseId,
  onComplete,
  onSkip,
}: FeedbackFormProps) {
  const [painRating, setPainRating] = useState<number | null>(null)
  const [energyRating, setEnergyRating] = useState<number | null>(null)
  const [stressRating, setStressRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isPending, startTransition] = useTransition()

  const allRatingsSelected =
    painRating !== null && energyRating !== null && stressRating !== null

  function handleSubmit() {
    if (!painRating || !energyRating || !stressRating) return

    startTransition(async () => {
      await submitFeedback({
        sessionLogId: sessionId,
        exerciseId,
        painRating,
        energyRating,
        stressRating,
        comment,
      })

      setShowConfirmation(true)
      setTimeout(() => {
        setShowConfirmation(false)
        onComplete()
      }, 2000)
    })
  }

  function handleSkip() {
    startTransition(async () => {
      await skipFeedback(sessionId)
      onSkip()
    })
  }

  if (showConfirmation) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-lg font-medium">Thanks for your feedback!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling?</CardTitle>
        <CardDescription>
          Rate your current levels after this exercise
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <RatingSelector
          label="Pain"
          value={painRating}
          onChange={setPainRating}
        />
        <RatingSelector
          label="Energy"
          value={energyRating}
          onChange={setEnergyRating}
        />
        <RatingSelector
          label="Stress"
          value={stressRating}
          onChange={setStressRating}
        />

        <textarea
          className="w-full border rounded-md p-3 min-h-[80px]"
          placeholder="Any additional comments (optional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          onClick={handleSkip}
          disabled={isPending}
        >
          Skip
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isPending || !allRatingsSelected}
        >
          {isPending ? 'Submitting…' : 'Submit Feedback'}
        </Button>
      </CardFooter>
    </Card>
  )
}
