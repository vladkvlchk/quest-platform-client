import {TDifficulty} from "@/lib/types";
import {ISODateString} from "next-auth";

export interface IQuestsHistoryResponse {
  quest_history: IQuestHistory[];
}

export interface IQuestHistory {
  quest_title: string;
  quest_id: string;
  quest_difficulty: TDifficulty;
  quest_total_levels: number;
  quest_main_picture: string;
  result: number;
  time_spent: number;
  rating: number;
  attempted_at: ISODateString;
  completed: boolean;
}
