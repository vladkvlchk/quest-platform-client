import axiosInstance from "@/lib/axios";
import { TQuestsResponse } from "@/lib/types/responses/TQuestsResponse";
import { useQuery } from "@tanstack/react-query";

const fetchQueries = async () => {
  const { data } = await axiosInstance.get("/quests");
  return data;
};

export const useQuests = () => {
  return useQuery<TQuestsResponse>({
    queryKey: ["quests"],
    queryFn: fetchQueries,
  });
};
