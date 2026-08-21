'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { FeedbackDialog } from '@/components/dashboard/feedback-dialog'
import { markExerciseComplete } from '@/app/(protected)/exercises/actions'

interface CompleteExerciseButtonProps {
  exerciseId: string
  isCompleted: boolean
  hasFeedback: boolean
}

export function CompleteExerciseButton({
  exerciseId,
  isCompleted,
  hasFeedback,
}: CompleteExerciseButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState(isCompleted)
  const router = useRouter()

  function handleClick() {
    startTransition(async () => {
      await markExerciseComplete(exerciseId)
      setCompleted(true)

      if (hasFeedback) {
        // Feedback already exists for this exercise — skip dialog
        router.push('/dashboard')
      } else {
        setShowFeedback(true)
      }
    })
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setShowFeedback(false)
      router.push('/dashboard')
    }
  }

  if (completed && !showFeedback) {
    return (
      <Button
        disabled
        className="w-full mt-6 py-6 text-lg bg-green-600 hover:bg-green-600 text-white"
      >
        Completed ✓
      </Button>
    )
  }

  return (
    <>
      <Button
        variant="default"
        className="w-full mt-6 py-6 text-lg"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? 'Completing…' : 'Mark as Complete'}
      </Button>

      <FeedbackDialog
        sessionExerciseId={exerciseId}
        open={showFeedback}
        onOpenChange={handleOpenChange}
      />
    </>
  )
}
