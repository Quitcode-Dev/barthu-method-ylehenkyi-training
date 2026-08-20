export type QuestionType = 'single_choice' | 'scale';

export type Dimension = 'pain' | 'stress' | 'sleep' | 'time' | 'goal' | 'experience';

export type QuestionOption = {
  value: string;
  label: string;
};

export type AssessmentQuestion = {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  dimension: Dimension;
};

export type AssessmentResponse = {
  questionId: string;
  value: string;
};

/** A convenience alias used at runtime: maps question ID → selected value. */
export type AssessmentResponseMap = Record<string, string>;
