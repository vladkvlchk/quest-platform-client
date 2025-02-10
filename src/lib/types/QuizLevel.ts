export interface IQuizOption {
  text: string;
  id: string;
}

export interface IQuizLevel {
  type: "quiz";
  id: string;
  name: string;
  question: string;
  pictures: File[];
  options: IQuizOption[];
  correct_option_id: string;
}
