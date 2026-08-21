export type Intensity = 'low' | 'medium' | 'high';

/** @deprecated Use `Intensity` instead */
export type ExerciseIntensity = Intensity;

export type ProgressionLevel = 'beginner' | 'intermediate' | 'advanced';

export type BodyArea =
  | 'neck'
  | 'back'
  | 'shoulder'
  | 'hip'
  | 'knee'
  | 'full_body'
  | 'other';

export type ExerciseTags = {
  body_area: BodyArea[];
  pain_relief: boolean;
  stress_reduction: boolean;
  sleep_optimization: boolean;
  digestion: boolean;
  mindset: boolean;
  mobility: boolean;
  contraindications: string[];
};

/** @deprecated Use `ExerciseTags` instead */
export type ExerciseTag = ExerciseTags;

export type Exercise = {
  id: string;
  name: string;
  description: string;
  video_url: string;
  duration_minutes: number;
  intensity: Intensity;
  progression_level: ProgressionLevel;
  is_active: boolean;
  tags: ExerciseTags;
  pathway_ids: string[];
  created_at: string;
  updated_at: string;
};

// ---------------------------------------------------------------------------
// Constants – useful for form selects and validation
// ---------------------------------------------------------------------------

export const BODY_AREAS = [
  'neck',
  'back',
  'shoulder',
  'hip',
  'knee',
  'full_body',
  'other',
] as const;

export const INTENSITIES = ['low', 'medium', 'high'] as const;

export const PROGRESSION_LEVELS = [
  'beginner',
  'intermediate',
  'advanced',
] as const;

export const TAG_CATEGORIES = [
  'pain_relief',
  'stress_reduction',
  'sleep_optimization',
  'digestion',
  'mindset',
  'mobility',
] as const;
