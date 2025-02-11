import { IQuestHistory } from "@/lib/types/responses/IQuestsHistoryResponse";

export interface IProfileResponce {
  user: {
    name: string;
    email: string;
    about_me: string;
    profile_picture: string | null;
    created_quests: any[];
    quest_history: IQuestHistory[];
  }
}
