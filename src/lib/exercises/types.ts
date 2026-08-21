export type ExerciseIntensity = 'low' | 'medium' | 'high';

export type ProgressionLevel = 'beginner' | 'intermediate' | 'advanced';

export type BodyArea =
  | 'neck'
  | 'back'
  | 'shoulder'
  | 'hip'
  | 'knee'
  | 'full_body';

export type ExerciseTag = {
  body_area: BodyArea[];
  pain_relief: boolean;
  stress_reduction: boolean;
  sleep_optimization: boolean;
  digestion: boolean;
  mindset: boolean;
  mobility: boolean;
  contraindications: string[];
};

export type Exercise = {
  id: string;
  name: string;
  description: string;
  video_url: string;
  duration_minutes: number;
  intensity: ExerciseIntensity;
  progression_level: ProgressionLevel;
  is_active: boolean;
  tags: ExerciseTag;
  pathway_ids: string[];
  created_at: string;
  updated_at: string;
};
