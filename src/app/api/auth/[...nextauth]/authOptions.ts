import { AxiosResponse } from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { ILogInResponse } from "@/lib/types";
import axiosInstance from "@/lib/axios";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { data }: AxiosResponse<ILogInResponse> =
            await axiosInstance.post("/auth/login/email", {
              email: credentials?.email,
              password: credentials?.password,
            });

          return {
            id: String(data.user_info?._id),
            name: data.user_info?.name,
            email: data.user_info?.email,
            accessToken: data.token,
            avatar: data.user_info?.profile_picture || null,
            created_quests: data.user_info?.created_quests || null,
            quest_history: data.user_info?.quest_history || null,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || "";
        token.email = user.email || "";
        token.accessToken = user.accessToken;
        token.avatar = token.avatar;
        token.created_quests = user.created_quests || [];
        token.quest_history = user.quest_history || [];
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken;
      session.user.avatar = token?.avatar;
      session.user.created_quests = token?.created_quests || [];
      session.user.quest_history = token.quest_history || [];
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    newUser: "/auth",
  },
};
