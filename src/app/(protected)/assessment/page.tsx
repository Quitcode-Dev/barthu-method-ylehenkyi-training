'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { ASSESSMENT_QUESTIONS } from '@/lib/assessment/questions'
import type { AssessmentResponse } from '@/lib/assessment/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { submitAssessment } from './actions'

const STORAGE_KEY = 'assessment_progress'

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<AssessmentResponse>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  const totalSteps = ASSESSMENT_QUESTIONS.length
  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep]
  const isLastStep = currentStep === totalSteps - 1
  const hasAnswer = currentQuestion ? currentQuestion.id in responses : false

  // Restore progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as AssessmentResponse
        setResponses(parsed)
      }
    } catch {
      // Ignore parse errors
    }
    setMounted(true)
  }, [])

  // Auto-save responses to localStorage on change
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(responses))
    } catch {
      // Ignore storage errors
    }
  }, [responses, mounted])

  const selectOption = useCallback(
    (value: string) => {
      setResponses((prev) => ({ ...prev, [currentQuestion.id]: value }))
    },
    [currentQuestion]
  )

  const handleNext = useCallback(() => {
    if (!hasAnswer) return
    if (isLastStep) return
    setCurrentStep((prev) => prev + 1)
  }, [hasAnswer, isLastStep])

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!hasAnswer || isSubmitting) return
    setIsSubmitting(true)
    try {
      await submitAssessment(responses)
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      setIsSubmitting(false)
    }
  }, [hasAnswer, isSubmitting, responses])

  if (!mounted) return null

  const progressPercent = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      {/* Progress indicator */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          Step {currentStep + 1} of {totalSteps}
        </p>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Options */}
          {currentQuestion.type === 'single-select' && (
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = responses[currentQuestion.id] === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => selectOption(option.value)}
                    className={`border rounded-lg p-4 cursor-pointer text-left hover:bg-accent transition ${
                      isSelected ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          )}

          {currentQuestion.type === 'scale' && (
            <div className="flex flex-row gap-2 flex-wrap justify-center">
              {currentQuestion.options.map((option) => {
                const isSelected = responses[currentQuestion.id] === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => selectOption(option.value)}
                    className={`border rounded-lg p-4 cursor-pointer hover:bg-accent transition min-w-[3rem] text-center ${
                      isSelected ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div />
            )}

            {isLastStep ? (
              <Button
                onClick={handleSubmit}
                disabled={!hasAnswer || isSubmitting}
                className={!hasAnswer ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {isSubmitting ? 'Submitting…' : 'Submit'}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!hasAnswer}
                className={!hasAnswer ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
