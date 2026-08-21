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
import type { Exercise, ExerciseIntensity } from '@/lib/exercises/types'
import { createClient } from '@/lib/supabase/server'

interface AdminExerciseListPageProps {
  searchParams: Promise<{
    search?: string
    intensity?: string
    status?: string
  }>
}

export default async function AdminExerciseListPage({
  searchParams,
}: AdminExerciseListPageProps) {
  const params = await searchParams
  const search = params.search ?? ''
  const intensityFilter = params.intensity ?? ''
  const statusFilter = params.status ?? ''

  const supabase = await createClient()

  let query = supabase
    .from('exercises')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  if (intensityFilter && ['low', 'medium', 'high'].includes(intensityFilter)) {
    query = query.eq('intensity', intensityFilter as ExerciseIntensity)
  }

  if (statusFilter === 'active') {
    query = query.eq('is_active', true)
  } else if (statusFilter === 'inactive') {
    query = query.eq('is_active', false)
  }

  const { data: exercises } = await query

  const typedExercises = (exercises ?? []) as Exercise[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exercises</h1>
        <Link href="/admin/exercises/new">
          <Button variant="default">Add Exercise</Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <form className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            name="search"
            placeholder="Search exercises..."
            defaultValue={search}
          />
        </div>

        <select
          name="intensity"
          defaultValue={intensityFilter}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Intensities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="status"
          defaultValue={statusFilter}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <Button type="submit" variant="secondary">
          Filter
        </Button>
      </form>

      {/* Exercise Table or Empty State */}
      {typedExercises.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No exercises found. Add your first exercise.
          </p>
          <Link href="/admin/exercises/new">
            <Button variant="default">Add Exercise</Button>
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
            {typedExercises.map((exercise) => (
              <TableRow key={exercise.id}>
                <TableCell className="font-medium">{exercise.name}</TableCell>
                <TableCell>{exercise.duration_minutes} min</TableCell>
                <TableCell className="capitalize">{exercise.intensity}</TableCell>
                <TableCell className="capitalize">{exercise.progression_level}</TableCell>
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
