export interface IInputLevel {
  type: "input";
  id: string;
  name: string;
  question: string;
  pictures: File[];
  try_limit: number;
  correct_answer: string;
}
