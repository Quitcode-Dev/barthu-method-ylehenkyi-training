'use client'

import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { submitFeedback, skipFeedback } from '@/app/(protected)/session/feedback-actions'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  exerciseId: string
  sessionLogId: string
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
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={
              value === num
                ? 'h-9 w-9 rounded-md text-sm font-medium bg-primary text-primary-foreground'
                : 'h-9 w-9 rounded-md text-sm font-medium bg-muted hover:bg-accent'
            }
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

export function FeedbackModal({
  isOpen,
  onClose,
  exerciseId,
  sessionLogId,
}: FeedbackModalProps) {
  const [painRating, setPainRating] = useState<number | null>(null)
  const [energyRating, setEnergyRating] = useState<number | null>(null)
  const [stressRating, setStressRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit() {
    if (!painRating || !energyRating || !stressRating) return

    startTransition(async () => {
      await submitFeedback({
        sessionLogId,
        exerciseId,
        painRating,
        energyRating,
        stressRating,
        comment,
      })

      setShowConfirmation(true)
      setTimeout(() => {
        setShowConfirmation(false)
        onClose()
      }, 1500)
    })
  }

  function handleSkip() {
    startTransition(async () => {
      await skipFeedback(sessionLogId)
      onClose()
    })
  }

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-lg font-medium">Thank you for your feedback!</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How are you feeling?</DialogTitle>
          <DialogDescription>
            Rate your current levels after completing the session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <RatingSelector
            label="Pain Level"
            value={painRating}
            onChange={setPainRating}
          />
          <RatingSelector
            label="Energy Level"
            value={energyRating}
            onChange={setEnergyRating}
          />
          <RatingSelector
            label="Stress Level"
            value={stressRating}
            onChange={setStressRating}
          />

          <textarea
            placeholder="Any additional notes..."
            className="w-full border rounded-md p-3 min-h-[80px] mt-4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
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
            variant="default"
            onClick={handleSubmit}
            disabled={isPending || !painRating || !energyRating || !stressRating}
          >
            {isPending ? 'Submitting…' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
