/**
 * Pathway mapper — provides mapping from assessment responses to pathway IDs.
 *
 * Exports:
 *  - `mapToPathway(responses)` — spec-defined mapper (US-002) that accepts
 *    an array of `AssessmentResponse` and returns a pathway ID string.
 *  - `assignPathway(responseMap)` — legacy mapper that accepts a flat
 *    `AssessmentResponseMap` (retained for backward-compatibility).
 */

import type { AssessmentResponse, AssessmentResponseMap } from './types';
import { PATHWAYS } from './pathways';
import type { PathwayId } from './pathways';

// Re-export legacy mapper for existing consumers
export { assignPathway } from './pathway-logic';

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

/**
 * Converts an array of `AssessmentResponse` objects into a flat lookup map
 * keyed by `questionId`. This allows O(1) access to individual answers.
 */
function toResponseMap(responses: AssessmentResponse[]): AssessmentResponseMap {
  const map: AssessmentResponseMap = {};
  for (const r of responses) {
    map[r.questionId] = r.value;
  }
  return map;
}

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
 *
 * @param responses - Array of `{ questionId, value }` assessment answers.
 * @returns A pathway ID string (one of the `PATHWAYS` constant values).
 */
export function mapToPathway(responses: AssessmentResponse[]): PathwayId {
  const responseMap = toResponseMap(responses);

  const primaryGoal = responseMap.primary_goal;

  // --- Rule 1: pain_relief → location-specific pathway ---
  if (primaryGoal === 'pain_relief') {
    const painLocation = responseMap.pain_location;
    if (painLocation === 'neck') {
      return PATHWAYS.NECK_PAIN_RELIEF;
    }
    if (painLocation === 'back') {
      return PATHWAYS.BACK_PAIN_RELIEF;
    }
    // Any other pain location (shoulder, hip, knee, none, or missing)
    return PATHWAYS.GENERAL_WELLNESS;
  }

  // --- Rule 2: stress_reduction ---
  if (primaryGoal === 'stress_reduction') {
    return PATHWAYS.STRESS_REDUCTION;
  }

  // --- Rule 3: sleep_improvement ---
  if (primaryGoal === 'sleep_improvement') {
    return PATHWAYS.SLEEP_IMPROVEMENT;
  }

  // --- Rule 4: mobility ---
  if (primaryGoal === 'mobility') {
    return PATHWAYS.MOBILITY_RESTORATION;
  }

  // --- Rule 5: fallback (covers 'general_wellness' and any unrecognised / missing value) ---
  return PATHWAYS.GENERAL_WELLNESS;
}
