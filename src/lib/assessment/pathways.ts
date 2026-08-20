import {
  PATHWAY_PAIN_RELIEF_UPPER,
  PATHWAY_PAIN_RELIEF_LOWER,
  PATHWAY_STRESS_REDUCTION,
  PATHWAY_SLEEP_IMPROVEMENT,
  PATHWAY_MOBILITY_RESTORATION,
  PATHWAY_GENERAL_WELLNESS,
} from './pathway-logic';

// ---------------------------------------------------------------------------
// Pathway metadata for UI display and seeding
// ---------------------------------------------------------------------------
export type PathwayMeta = {
  id: string;
  name: string;
  description: string;
};

export const PATHWAYS: Record<string, PathwayMeta> = {
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
  [PATHWAY_STRESS_REDUCTION]: {
    id: PATHWAY_STRESS_REDUCTION,
    name: 'Stress Reduction',
    description:
      'Breathing exercises and gentle movements designed to lower stress levels.',
  },
  [PATHWAY_SLEEP_IMPROVEMENT]: {
    id: PATHWAY_SLEEP_IMPROVEMENT,
    name: 'Sleep Improvement',
    description:
      'Relaxation techniques and routines to improve sleep quality.',
  },
  [PATHWAY_MOBILITY_RESTORATION]: {
    id: PATHWAY_MOBILITY_RESTORATION,
    name: 'Mobility Restoration',
    description:
      'Progressive stretching and movement sequences to restore range of motion.',
  },
  [PATHWAY_GENERAL_WELLNESS]: {
    id: PATHWAY_GENERAL_WELLNESS,
    name: 'General Wellness',
    description:
      'A balanced program promoting overall physical and mental well-being.',
  },
};
