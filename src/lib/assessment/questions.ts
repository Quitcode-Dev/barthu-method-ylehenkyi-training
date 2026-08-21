import type { AssessmentQuestion } from './types';

export const ASSESSMENT_VERSION = '1.0';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'pain_location',
    order: 1,
    text: 'Where do you experience pain or discomfort?',
    type: 'single_choice',
    dimension: 'pain',
    options: [
      { value: 'neck', label: 'Neck' },
      { value: 'back', label: 'Back' },
      { value: 'shoulder', label: 'Shoulder' },
      { value: 'hip', label: 'Hip' },
      { value: 'knee', label: 'Knee' },
      { value: 'none', label: 'None' },
    ],
  },
  {
    id: 'pain_intensity',
    order: 2,
    text: 'How would you rate your pain intensity?',
    type: 'scale',
    dimension: 'pain',
    options: Array.from({ length: 10 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    })),
  },
  {
    id: 'stress_level',
    order: 3,
    text: 'How would you rate your current stress level?',
    type: 'scale',
    dimension: 'stress',
    options: Array.from({ length: 10 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    })),
  },
  {
    id: 'sleep_quality',
    order: 4,
    text: 'How would you rate your sleep quality?',
    type: 'single_choice',
    dimension: 'sleep',
    options: [
      { value: 'poor', label: 'Poor' },
      { value: 'fair', label: 'Fair' },
      { value: 'good', label: 'Good' },
      { value: 'excellent', label: 'Excellent' },
    ],
  },
  {
    id: 'available_time',
    order: 5,
    text: 'How much time do you have available for your session?',
    type: 'single_choice',
    dimension: 'time',
    options: [
      { value: '10min', label: '10 minutes' },
      { value: '15min', label: '15 minutes' },
      { value: '20min', label: '20 minutes' },
      { value: '30min', label: '30 minutes' },
    ],
  },
  {
    id: 'primary_goal',
    order: 6,
    text: 'What is your primary goal?',
    type: 'single_choice',
    dimension: 'goal',
    options: [
      { value: 'pain_relief', label: 'Pain Relief' },
      { value: 'stress_reduction', label: 'Stress Reduction' },
      { value: 'sleep_improvement', label: 'Sleep Improvement' },
      { value: 'mobility', label: 'Mobility' },
      { value: 'general_wellness', label: 'General Wellness' },
    ],
  },
  {
    id: 'activity_level',
    order: 7,
    text: 'How would you describe your current activity level?',
    type: 'single_choice',
    dimension: 'activity',
    options: [
      { value: 'sedentary', label: 'Sedentary' },
      { value: 'lightly_active', label: 'Lightly Active' },
      { value: 'moderately_active', label: 'Moderately Active' },
      { value: 'very_active', label: 'Very Active' },
    ],
  },
];
