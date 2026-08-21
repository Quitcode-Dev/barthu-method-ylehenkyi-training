'use client'

import { useActionState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PATHWAYS, PATHWAY_DETAILS } from '@/lib/assessment/pathways'
import type { BodyArea, Exercise, ExerciseTag } from '@/lib/exercises/types'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BODY_AREAS: { value: BodyArea; label: string }[] = [
  { value: 'neck', label: 'Neck' },
  { value: 'back', label: 'Back' },
  { value: 'shoulder', label: 'Shoulder' },
  { value: 'hip', label: 'Hip' },
  { value: 'knee', label: 'Knee' },
  { value: 'full_body', label: 'Full Body' },
]

const TAG_BOOLEANS = [
  { key: 'pain_relief', label: 'Pain Relief' },
  { key: 'stress_reduction', label: 'Stress Reduction' },
  { key: 'sleep_optimization', label: 'Sleep Optimization' },
  { key: 'digestion', label: 'Digestion' },
  { key: 'mindset', label: 'Mindset' },
  { key: 'mobility', label: 'Mobility' },
] as const

const ALL_PATHWAYS = Object.values(PATHWAYS)

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ExerciseFormProps {
  exercise?: Exercise
  action: (
    prevState: { errors: string[] } | null,
    formData: FormData,
  ) => Promise<{ errors: string[] }>
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ExerciseForm({ exercise, action }: ExerciseFormProps) {
  const [state, formAction, isPending] = useActionState(action, null)

  const isEdit = !!exercise

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit Exercise' : 'New Exercise'}
        </h1>
        <Link href="/admin/exercises">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      {state?.errors && state.errors.length > 0 && (
        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <ul className="list-disc pl-4 space-y-1">
            {state.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form action={formAction} className="space-y-8">
        {/* ---- Basic Fields ---- */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Basic Information</legend>

          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={exercise?.name ?? ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              className="border rounded-md p-3 min-h-[100px] w-full text-sm"
              defaultValue={exercise?.description ?? ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_url">
              Video URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="video_url"
              name="video_url"
              required
              defaultValue={exercise?.video_url ?? ''}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">
                Duration (minutes) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="duration_minutes"
                name="duration_minutes"
                type="number"
                min={1}
                required
                defaultValue={exercise?.duration_minutes ?? ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intensity">Intensity</Label>
              <select
                id="intensity"
                name="intensity"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue={exercise?.intensity ?? 'low'}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="progression_level">Progression Level</Label>
              <select
                id="progression_level"
                name="progression_level"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue={exercise?.progression_level ?? 'beginner'}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              defaultChecked={exercise?.is_active ?? true}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>
        </fieldset>

        {/* ---- Tags ---- */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Tags</legend>

          {/* Body Area */}
          <div className="space-y-2">
            <Label>Body Area</Label>
            <div className="flex flex-wrap gap-4">
              {BODY_AREAS.map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name={`body_area_${value}`}
                    className="h-4 w-4 rounded border-gray-300"
                    defaultChecked={
                      exercise?.tags?.body_area?.includes(value) ?? false
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Boolean toggles */}
          <div className="space-y-2">
            <Label>Properties</Label>
            <div className="flex flex-wrap gap-4">
              {TAG_BOOLEANS.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name={`tag_${key}`}
                    className="h-4 w-4 rounded border-gray-300"
                    defaultChecked={
                      exercise?.tags?.[key as keyof ExerciseTag] === true
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Contraindications */}
          <div className="space-y-2">
            <Label htmlFor="contraindications">
              Contraindications (comma-separated)
            </Label>
            <Input
              id="contraindications"
              name="contraindications"
              placeholder="e.g. disc herniation, acute injury"
              defaultValue={
                exercise?.tags?.contraindications?.join(', ') ?? ''
              }
            />
          </div>
        </fieldset>

        {/* ---- Pathway Assignment ---- */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Pathway Assignment</legend>
          <div className="flex flex-wrap gap-4">
            {ALL_PATHWAYS.map((pathwayId) => (
              <label
                key={pathwayId}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  name="pathway_ids"
                  value={pathwayId}
                  className="h-4 w-4 rounded border-gray-300"
                  defaultChecked={
                    exercise?.pathway_ids?.includes(pathwayId) ?? false
                  }
                />
                {PATHWAY_DETAILS[pathwayId]?.name ?? pathwayId}
              </label>
            ))}
          </div>
        </fieldset>

        {/* ---- Submit ---- */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? 'Saving…'
              : isEdit
                ? 'Update Exercise'
                : 'Create Exercise'}
          </Button>
          <Link href="/admin/exercises">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
