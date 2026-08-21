/**
 * Pathway mapper — thin façade re-exporting the core pathway assignment
 * logic so that consumers (e.g. the assessment server action) can import
 * from a single, stable module path (`@/lib/assessment/pathway-mapper`).
 */
export { assignPathway } from './pathway-logic';
