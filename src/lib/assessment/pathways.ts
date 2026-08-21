import {
  PATHWAY_PAIN_RELIEF_UPPER,
  PATHWAY_PAIN_RELIEF_LOWER,
  PATHWAY_STRESS_REDUCTION as PATHWAY_STRESS_REDUCTION_INTERNAL,
  PATHWAY_SLEEP_IMPROVEMENT as PATHWAY_SLEEP_IMPROVEMENT_INTERNAL,
  PATHWAY_MOBILITY_RESTORATION as PATHWAY_MOBILITY_RESTORATION_INTERNAL,
  PATHWAY_GENERAL_WELLNESS as PATHWAY_GENERAL_WELLNESS_INTERNAL,
} from './pathway-logic';

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

// ---------------------------------------------------------------------------
// Legacy pathway metadata (retained for backward-compatibility)
// ---------------------------------------------------------------------------
export type PathwayMeta = {
  id: string;
  name: string;
  description: string;
};

export const PATHWAY_META: Record<string, PathwayMeta> = {
  [PATHWAY_PAIN_RELIEF_UPPER]: {
    id: PATHWAY_PAIN_RELIEF_UPPER,
    name: 'Upper Body Pain Relief',
    description:
      'A targeted program for neck, shoulder, and back pain recovery.',
  },
  [PATHWAY_PAIN_RELIEF_LOWER]: {
    id: PATHWAY_PAIN_RELIEF_LOWER,
    name: 'Lower Body Pain Relief',
    description:
      'A targeted program for hip and knee pain recovery.',
  },
  [PATHWAY_STRESS_REDUCTION_INTERNAL]: {
    id: PATHWAY_STRESS_REDUCTION_INTERNAL,
    name: 'Stress Reduction',
    description:
      'Breathing exercises and gentle movements designed to lower stress levels.',
  },
  [PATHWAY_SLEEP_IMPROVEMENT_INTERNAL]: {
    id: PATHWAY_SLEEP_IMPROVEMENT_INTERNAL,
    name: 'Sleep Improvement',
    description:
      'Relaxation techniques and routines to improve sleep quality.',
  },
  [PATHWAY_MOBILITY_RESTORATION_INTERNAL]: {
    id: PATHWAY_MOBILITY_RESTORATION_INTERNAL,
    name: 'Mobility Restoration',
    description:
      'Progressive stretching and movement sequences to restore range of motion.',
  },
  [PATHWAY_GENERAL_WELLNESS_INTERNAL]: {
    id: PATHWAY_GENERAL_WELLNESS_INTERNAL,
    name: 'General Wellness',
    description:
      'A balanced program promoting overall physical and mental well-being.',
  },
};
