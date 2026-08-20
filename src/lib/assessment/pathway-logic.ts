import type { AssessmentResponse } from './types'

/**
 * Determines the pathway assignment based on assessment responses.
 * Phase 1: Returns a fixed pathway_id for all users.
 * Future phases will implement dynamic pathway selection based on response analysis.
 */
export function assignPathway(_responses: AssessmentResponse): string {
  // Phase 1: Fixed pathway assignment
  return 'pathway_default'
}
