export interface ISignUpResponse {
  token: string;
  user_info: {
    _id: string;
    name: string;
    email: string;
    created_at: string;
    profile_picture: null | string;
    created_quests: [];
    quest_history: [];
  };
}
