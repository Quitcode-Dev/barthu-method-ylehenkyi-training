/**
 * Pathway mapper — provides mapping from assessment responses to pathway IDs.
 *
 * Exports:
 *  - `mapToPathway(responses)` — spec-defined mapper (US-002) that accepts
 *    an array of `AssessmentResponse` and returns a pathway ID string.
 *  - `assignPathway(responseMap)` — legacy mapper that accepts a flat
 *    `AssessmentResponseMap` (retained for backward-compatibility).
 */

import type { AssessmentResponse } from './types';
import { PATHWAYS } from './pathways';

// Re-export legacy mapper for existing consumers
export { assignPathway } from './pathway-logic';

// ---------------------------------------------------------------------------
// mapToPathway  (US-002)
// ---------------------------------------------------------------------------
/**
 * Maps Phase 1 assessment responses to a predefined program pathway.
 *
 * Decision rules (evaluated in order):
 *  1. primary_goal === 'pain_relief'
 *       – pain_location === 'neck'  → NECK_PAIN_RELIEF
 *       – pain_location === 'back'  → BACK_PAIN_RELIEF
 *       – otherwise                 → GENERAL_WELLNESS
 *  2. primary_goal === 'stress_reduction'  → STRESS_REDUCTION
 *  3. primary_goal === 'sleep_improvement' → SLEEP_IMPROVEMENT
 *  4. primary_goal === 'mobility'          → MOBILITY_RESTORATION
 *  5. Default                              → GENERAL_WELLNESS
 *
 * Every valid combination of responses maps to exactly one pathway.
 * The function always returns a non-null, non-undefined pathway ID.
 */
export function mapToPathway(responses: AssessmentResponse[]): string {
  // Build a lookup map from questionId → value for easy access
  const responseMap: Record<string, string> = {};
  for (const r of responses) {
    responseMap[r.questionId] = r.value;
  }

  const primaryGoal = responseMap.primary_goal;

  if (primaryGoal === 'pain_relief') {
    const painLocation = responseMap.pain_location;
    if (painLocation === 'neck') {
      return PATHWAYS.NECK_PAIN_RELIEF;
    }
    if (painLocation === 'back') {
      return PATHWAYS.BACK_PAIN_RELIEF;
    }
    // Any other pain location (shoulder, hip, knee, none, missing)
    return PATHWAYS.GENERAL_WELLNESS;
  }

  if (primaryGoal === 'stress_reduction') {
    return PATHWAYS.STRESS_REDUCTION;
  }

  if (primaryGoal === 'sleep_improvement') {
    return PATHWAYS.SLEEP_IMPROVEMENT;
  }

  if (primaryGoal === 'mobility') {
    return PATHWAYS.MOBILITY_RESTORATION;
  }

  // Covers 'general_wellness' and any unrecognised / missing value
  return PATHWAYS.GENERAL_WELLNESS;
}
