'use client'

import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  submitFeedback,
  skipFeedback,
} from '@/app/(protected)/exercises/feedback-actions'

interface FeedbackDialogProps {
  sessionExerciseId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

function RatingRow({
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
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            type="button"
            variant={value === num ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(num)}
            className="w-9"
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function FeedbackDialog({
  sessionExerciseId,
  open,
  onOpenChange,
}: FeedbackDialogProps) {
  const [painRating, setPainRating] = useState<number | null>(null)
  const [energyRating, setEnergyRating] = useState<number | null>(null)
  const [stressRating, setStressRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isPending, startTransition] = useTransition()

  const allRatingsSelected =
    painRating !== null && energyRating !== null && stressRating !== null

  function resetState() {
    setPainRating(null)
    setEnergyRating(null)
    setStressRating(null)
    setComment('')
    setShowConfirmation(false)
  }

  function handleSubmit() {
    if (!painRating || !energyRating || !stressRating) return

    startTransition(async () => {
      await submitFeedback({
        exerciseId: sessionExerciseId,
        painRating,
        energyRating,
        stressRating,
        comment: comment || undefined,
      })

      setShowConfirmation(true)
      setTimeout(() => {
        resetState()
        onOpenChange(false)
      }, 1500)
    })
  }

  function handleSkip() {
    startTransition(async () => {
      await skipFeedback(sessionExerciseId)
      resetState()
      onOpenChange(false)
    })
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetState()
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {showConfirmation ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium">✓ Thanks for your feedback!</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>How are you feeling?</DialogTitle>
              <DialogDescription>
                Rate your current levels after completing this exercise.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-4">
              <RatingRow
                label="Pain"
                value={painRating}
                onChange={setPainRating}
              />
              <RatingRow
                label="Energy"
                value={energyRating}
                onChange={setEnergyRating}
              />
              <RatingRow
                label="Stress"
                value={stressRating}
                onChange={setStressRating}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Comments</label>
                <textarea
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Any additional notes (optional)..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
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
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
