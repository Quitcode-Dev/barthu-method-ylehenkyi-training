'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { completeSession } from '@/app/(protected)/session/actions'

interface CompleteButtonProps {
  exerciseId: string
  isCompleted: boolean
}

export function CompleteButton({ exerciseId, isCompleted }: CompleteButtonProps) {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await completeSession(exerciseId)
    })
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
    <Button
      variant="default"
      className="w-full mt-6 py-6 text-lg"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? 'Completing…' : 'Mark as Complete'}
    </Button>
  )
}
