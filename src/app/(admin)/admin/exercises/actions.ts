'use server'

import { redirect } from 'next/navigation'

import { isAdmin } from '@/lib/auth/roles'
import type { BodyArea } from '@/lib/exercises/types'
import { createClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BODY_AREAS: BodyArea[] = [
  'neck',
  'back',
  'shoulder',
  'hip',
  'knee',
  'full_body',
]

const TAG_BOOLEANS = [
  'pain_relief',
  'stress_reduction',
  'sleep_optimization',
  'digestion',
  'mindset',
  'mobility',
] as const

function parseFormData(formData: FormData) {
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const description =
    (formData.get('description') as string | null)?.trim() ?? ''
  const video_url = (formData.get('video_url') as string | null)?.trim() ?? ''
  const duration_minutes = Number(formData.get('duration_minutes') ?? 0)
  const intensity =
    (formData.get('intensity') as string | null)?.trim() ?? 'low'
  const progression_level =
    (formData.get('progression_level') as string | null)?.trim() ?? 'beginner'
  const is_active = formData.get('is_active') === 'on'

  // Tags — body areas
  const body_area = BODY_AREAS.filter(
    (area) => formData.get(`body_area_${area}`) === 'on',
  )

  // Tags — boolean toggles
  const tagBooleans: Record<string, boolean> = {}
  for (const key of TAG_BOOLEANS) {
    tagBooleans[key] = formData.get(`tag_${key}`) === 'on'
  }

  // Contraindications
  const contraindications = (
    (formData.get('contraindications') as string | null) ?? ''
  )
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const tags = {
    body_area,
    ...tagBooleans,
    contraindications,
  }

  // Pathway IDs
  const pathway_ids = formData.getAll('pathway_ids') as string[]

  return {
    name,
    description,
    video_url,
    duration_minutes,
    intensity,
    progression_level,
    is_active,
    tags,
    pathway_ids,
  }
}

function validateRequired(data: ReturnType<typeof parseFormData>): string[] {
  const errors: string[] = []
  if (!data.name) errors.push('Name is required')
  if (!data.video_url) errors.push('Video URL is required')
  if (!data.duration_minutes || data.duration_minutes <= 0)
    errors.push('Duration must be greater than 0')
  return errors
}

async function getAdminUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdmin(user)) {
    throw new Error('Unauthorized')
  }

  return { supabase, user }
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export async function createExercise(
  _prevState: { errors: string[] } | null,
  formData: FormData,
): Promise<{ errors: string[] }> {
  const data = parseFormData(formData)
  const errors = validateRequired(data)

  if (errors.length > 0) {
    return { errors }
  }

  const { supabase, user } = await getAdminUser()

  const { data: inserted, error } = await supabase
    .from('exercises')
    .insert(data)
    .select('id')
    .single()

  if (error) {
    return { errors: [error.message] }
  }

  // Audit log
  await supabase.from('admin_audit_log').insert({
    admin_user_id: user.id,
    action_type: 'create',
    entity_type: 'exercise',
    entity_id: inserted.id,
    timestamp: new Date().toISOString(),
  })

  redirect('/admin/exercises')
}

export async function updateExercise(
  id: string,
  _prevState: { errors: string[] } | null,
  formData: FormData,
): Promise<{ errors: string[] }> {
  const data = parseFormData(formData)
  const errors = validateRequired(data)

  if (errors.length > 0) {
    return { errors }
  }

  const { supabase, user } = await getAdminUser()

  const { error } = await supabase.from('exercises').update(data).eq('id', id)

  if (error) {
    return { errors: [error.message] }
  }

  // Audit log
  await supabase.from('admin_audit_log').insert({
    admin_user_id: user.id,
    action_type: 'update',
    entity_type: 'exercise',
    entity_id: id,
    timestamp: new Date().toISOString(),
  })

  redirect('/admin/exercises')
}

export async function toggleExerciseStatus(
  id: string,
  isActive: boolean,
): Promise<{ errors: string[] } | null> {
  const { supabase, user } = await getAdminUser()

  const { error } = await supabase
    .from('exercises')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) {
    return { errors: [error.message] }
  }

  // Audit log
  await supabase.from('admin_audit_log').insert({
    admin_user_id: user.id,
    action_type: 'update',
    entity_type: 'exercise',
    entity_id: id,
    timestamp: new Date().toISOString(),
  })

  return null
}
