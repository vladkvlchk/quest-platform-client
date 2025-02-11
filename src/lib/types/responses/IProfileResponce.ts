export interface IProfileResponce {
  user: {
    _id: string;
    name: string;
    email: string | null;
    about_me: string;
    profile_picture: string | null;
    created_quests: any[];
    quest_history: any[];
  }
}
