export type QuestionType = 'single_choice' | 'scale';

export type QuestionOption = {
  value: string;
  label: string;
  score?: number;
};

export type AssessmentQuestion = {
  id: string;
  order: number;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  dimension: string;
};

export type AssessmentResponse = {
  questionId: string;
  value: string;
};

export type AssessmentSubmission = {
  responses: AssessmentResponse[];
  completedAt: string;
};

/** A convenience alias used at runtime: maps question ID → selected value. */
export type AssessmentResponseMap = Record<string, string>;
