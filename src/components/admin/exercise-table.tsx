'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Exercise } from '@/lib/exercises/types'

interface ExerciseTableProps {
  exercises: Exercise[]
}

export default function ExerciseTable({ exercises }: ExerciseTableProps) {
  const [search, setSearch] = useState('')
  const [intensityFilter, setIntensityFilter] = useState('')
  const [bodyAreaFilter, setBodyAreaFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = exercises.filter((exercise) => {
    // Search by name
    if (search && !exercise.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }

    // Filter by intensity
    if (intensityFilter && exercise.intensity !== intensityFilter) {
      return false
    }

    // Filter by body area
    if (
      bodyAreaFilter &&
      (!exercise.tags?.body_area || !exercise.tags.body_area.includes(bodyAreaFilter as Exercise['tags']['body_area'][number]))
    ) {
      return false
    }

    // Filter by status
    if (statusFilter === 'active' && !exercise.is_active) {
      return false
    }
    if (statusFilter === 'inactive' && exercise.is_active) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={bodyAreaFilter}
          onChange={(e) => setBodyAreaFilter(e.target.value)}
          className="border rounded-md px-3 py-2 bg-background text-sm"
        >
          <option value="">All Body Areas</option>
          <option value="neck">Neck</option>
          <option value="back">Back</option>
          <option value="shoulder">Shoulder</option>
          <option value="hip">Hip</option>
          <option value="knee">Knee</option>
          <option value="full_body">Full Body</option>
        </select>

        <select
          value={intensityFilter}
          onChange={(e) => setIntensityFilter(e.target.value)}
          className="border rounded-md px-3 py-2 bg-background text-sm"
        >
          <option value="">All Intensities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-2 bg-background text-sm"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Exercise Table or Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No exercises found. Add your first exercise.
          </p>
          <Link href="/admin/exercises/new">
            <Button variant="default">New Exercise</Button>
          </Link>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Intensity</TableHead>
              <TableHead>Progression</TableHead>
              <TableHead>Body Areas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((exercise) => (
              <TableRow key={exercise.id}>
                <TableCell className="font-medium">{exercise.name}</TableCell>
                <TableCell>{exercise.duration_minutes} min</TableCell>
                <TableCell className="capitalize">{exercise.intensity}</TableCell>
                <TableCell className="capitalize">
                  {exercise.progression_level}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {exercise.tags?.body_area?.map((area) => (
                      <Badge key={area} variant="secondary" className="capitalize">
                        {area.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={exercise.is_active ? 'active' : 'inactive'}>
                    {exercise.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/exercises/${exercise.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm">
                      Deactivate
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
