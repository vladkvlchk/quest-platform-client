import { IInputLevel } from "../InputLevel";
import { IQuizLevel } from "../QuizLevel";

export type TDifficulty = "easy" | "normal" | "hard";

export interface IQuestItemResponse {
  _id: string;
  name: string;
  title: string;
  description: string;
  time_limit: number;
  difficulty: TDifficulty;
  main_picture: string;
  created_by: string;
  levels: (IQuizLevel | IInputLevel)[];
}

export type TQuestsResponse = IQuestItemResponse[];
