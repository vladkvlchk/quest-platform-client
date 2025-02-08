export interface IQuizOption {
  text: string;
  id: string;
}

export interface IQuizLevel {
  type: "quiz";
  name: string;
  question: string;
  options: IQuizOption[];
  correctOptionId: string;
}
