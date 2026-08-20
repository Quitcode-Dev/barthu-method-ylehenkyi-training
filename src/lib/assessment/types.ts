export type QuestionType = 'single-select' | 'scale';

export type QuestionOption = {
  value: string;
  label: string;
  score?: number;
};

export type AssessmentQuestion = {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  dimension: string;
};

export type AssessmentResponse = Record<string, string>;
