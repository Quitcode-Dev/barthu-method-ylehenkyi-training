'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { completeSession } from '@/app/(protected)/session/actions'
import { FeedbackModal } from '@/components/session/feedback-modal'

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

  function handleFeedbackClose() {
    setShowFeedback(false)
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
      <Button
        variant="default"
        className="w-full mt-6 py-6 text-lg"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? 'Completing…' : 'Mark as Complete'}
      </Button>

      {showFeedback && sessionLogId && (
        <FeedbackModal
          isOpen={showFeedback}
          onClose={handleFeedbackClose}
          exerciseId={exerciseId}
          sessionLogId={sessionLogId}
        />
      )}
    </>
  )
}
