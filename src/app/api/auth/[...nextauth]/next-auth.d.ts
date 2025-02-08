import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken?: string;
      avatar?: string | null;
      created_quests?: any[];
      quest_history?: any[];
    } & DefaultSession["user"];
  }

  interface User {
    accessToken?: string;
    avatar?: string | null;
    created_quests?: any[];
    quest_history?: any[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
    avatar?: string | null;
    created_quests?: any[];
    quest_history?: any[];
  }
}
