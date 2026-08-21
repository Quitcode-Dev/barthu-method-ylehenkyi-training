// ---------------------------------------------------------------------------
// Spec-defined pathway ID constants (US-002)
// ---------------------------------------------------------------------------
export const PATHWAYS = {
  NECK_PAIN_RELIEF: 'neck-pain-relief',
  BACK_PAIN_RELIEF: 'back-pain-relief',
  STRESS_REDUCTION: 'stress-reduction',
  SLEEP_IMPROVEMENT: 'sleep-improvement',
  MOBILITY_RESTORATION: 'mobility-restoration',
  GENERAL_WELLNESS: 'general-wellness',
} as const;

/** Union type of all valid pathway ID values. */
export type PathwayId = (typeof PATHWAYS)[keyof typeof PATHWAYS];

// ---------------------------------------------------------------------------
// Human-readable pathway details (US-002)
// ---------------------------------------------------------------------------
export const PATHWAY_DETAILS: Record<string, { name: string; description: string }> = {
  [PATHWAYS.NECK_PAIN_RELIEF]: {
    name: 'Neck Pain Relief',
    description: 'A targeted program for neck pain recovery and prevention.',
  },
  [PATHWAYS.BACK_PAIN_RELIEF]: {
    name: 'Back Pain Relief',
    description: 'A targeted program for back pain recovery and prevention.',
  },
  [PATHWAYS.STRESS_REDUCTION]: {
    name: 'Stress Reduction',
    description:
      'Breathing exercises and gentle movements designed to lower stress levels.',
  },
  [PATHWAYS.SLEEP_IMPROVEMENT]: {
    name: 'Sleep Improvement',
    description:
      'Relaxation techniques and routines to improve sleep quality.',
  },
  [PATHWAYS.MOBILITY_RESTORATION]: {
    name: 'Mobility Restoration',
    description:
      'Progressive stretching and movement sequences to restore range of motion.',
  },
  [PATHWAYS.GENERAL_WELLNESS]: {
    name: 'General Wellness',
    description:
      'A balanced program promoting overall physical and mental well-being.',
  },
};
