import type { AssessmentResponse } from './types';

// ---------------------------------------------------------------------------
// Pathway ID constants
// ---------------------------------------------------------------------------
export const PATHWAY_PAIN_RELIEF_UPPER = 'pathway_pain_relief_upper';
export const PATHWAY_PAIN_RELIEF_LOWER = 'pathway_pain_relief_lower';
export const PATHWAY_STRESS_REDUCTION = 'pathway_stress_reduction';
export const PATHWAY_SLEEP_IMPROVEMENT = 'pathway_sleep_improvement';
export const PATHWAY_MOBILITY_RESTORATION = 'pathway_mobility_restoration';
export const PATHWAY_GENERAL_WELLNESS = 'pathway_general_wellness';

// ---------------------------------------------------------------------------
// Internal look-up sets for pain-location discrimination
// ---------------------------------------------------------------------------
const UPPER_BODY_LOCATIONS = new Set(['neck', 'shoulder', 'back']);
const LOWER_BODY_LOCATIONS = new Set(['hip', 'knee']);

// ---------------------------------------------------------------------------
// assignPathway
// ---------------------------------------------------------------------------
/**
 * Pure function that maps assessment responses to a predefined program pathway.
 *
 * Decision rules (evaluated in order):
 *  1. primary_goal === 'pain_relief'
 *       – pain_location in {neck, shoulder, back} → UPPER
 *       – pain_location in {hip, knee}            → LOWER
 *       – otherwise (e.g. 'none' / missing)       → UPPER (safe default)
 *  2. primary_goal === 'stress_reduction'  → STRESS_REDUCTION
 *  3. primary_goal === 'sleep_improvement' → SLEEP_IMPROVEMENT
 *  4. primary_goal === 'mobility'          → MOBILITY_RESTORATION
 *  5. Default (including 'general_wellness' and any unknown value) → GENERAL_WELLNESS
 */
export function assignPathway(responses: AssessmentResponse): string {
  const primaryGoal = responses.primary_goal;

  if (primaryGoal === 'pain_relief') {
    const painLocation = responses.pain_location;
    if (painLocation && LOWER_BODY_LOCATIONS.has(painLocation)) {
      return PATHWAY_PAIN_RELIEF_LOWER;
    }
    // Upper-body locations or unspecified/none default to upper
    return PATHWAY_PAIN_RELIEF_UPPER;
  }

  if (primaryGoal === 'stress_reduction') {
    return PATHWAY_STRESS_REDUCTION;
  }

  if (primaryGoal === 'sleep_improvement') {
    return PATHWAY_SLEEP_IMPROVEMENT;
  }

  if (primaryGoal === 'mobility') {
    return PATHWAY_MOBILITY_RESTORATION;
  }

  // Covers 'general_wellness' and any unrecognised / missing value
  return PATHWAY_GENERAL_WELLNESS;
}
