'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { completeSession } from '@/app/(protected)/session/actions'
import { FeedbackForm } from '@/components/feedback/feedback-form'

interface CompleteButtonProps {
  exerciseId: string
  isCompleted: boolean
}

export function CompleteButton({ exerciseId, isCompleted }: CompleteButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showFeedback, setShowFeedback] = useState(false)
  const [sessionLogId, setSessionLogId] = useState<string | null>(null)
  const router = useRouter()

  function handleClick() {
    startTransition(async () => {
      const result = await completeSession(exerciseId)
      setSessionLogId(result.sessionLogId)
      setShowFeedback(true)
    })
  }

  function handleFeedbackComplete() {
    router.push('/dashboard')
  }

  function handleFeedbackSkip() {
    router.push('/dashboard')
  }

  if (isCompleted) {
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
      {!showFeedback && (
        <Button
          variant="default"
          className="w-full mt-6 py-6 text-lg"
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? 'Completing…' : 'Mark as Complete'}
        </Button>
      )}

      {showFeedback && sessionLogId && (
        <div className="mt-6">
          <FeedbackForm
            sessionId={sessionLogId}
            exerciseId={exerciseId}
            onComplete={handleFeedbackComplete}
            onSkip={handleFeedbackSkip}
          />
        </div>
      )}
    </>
  )
}
