export type QuestionType = 'single_choice' | 'scale';

export type QuestionOption = {
  value: string;
  label: string;
};

export type AssessmentQuestion = {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  dimension: string;
};

export type AssessmentResponse = {
  questionId: string;
  value: string;
};
