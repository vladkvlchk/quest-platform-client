"use client";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IQuestsHistoryResponse } from "@/lib/types/responses/IQuestsHistoryResponse";

export const useQuestsHistory = (userId: string) => {
  return useQuery<IQuestsHistoryResponse | null>({
    queryKey: ["quests_history"],
    queryFn: async () => {
      const session = await getSession();
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/quest_history`,
        {
          headers:{
            Authorization: `Bearer ${session?.user.accessToken}`,
          }
        }
      );
      return data;
    }
  });
}
