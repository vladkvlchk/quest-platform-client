import { IInputLevel } from "../InputLevel";
import { IQuizLevel } from "../QuizLevel";

export type TDifficulty = "easy" | "normal" | "hard";

export interface IQuizLevelResponse {
  id: string;
  type: "quiz";
  name: string;
  question: string;
  picture_urls: string[];
  options: { id: string; text: string }[];
  correct_option_id: string;
}

export interface IInputLevelResponse {
  id: string;
  type: "input";
  name: string;
  question: string;
  picture_urls: string[];
  correct_answer: string;
  try_limit: number;
}

export interface IQuestItemResponse {
  _id: string;
  name: string;
  title: string;
  description: string;
  time_limit: number;
  difficulty: TDifficulty;
  main_picture: string;
  created_by: string;
  location: string;
  levels: (IQuizLevelResponse | IInputLevelResponse)[];
  avg_rating: number;
  ratings: {
    user_id: string;
    review: string;
    rating: number;
  }[]
}

export type TQuestsResponse = IQuestItemResponse[];
