import axiosInstance from "@/lib/axios";
import { IQuestItemResponse } from "@/lib/types/responses/TQuestsResponse";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

const fetchQueries = async (
  id: string
): Promise<{ quest: IQuestItemResponse }> => {
  const { data } = await axiosInstance.get("/quest/" + id);
  return data;
};

export const useQuest = (id: string) => {
  return useQuery<{ quest: IQuestItemResponse }>({
    queryKey: ["quest", id],
    queryFn: ({ queryKey }: QueryFunctionContext) => {
      const [, questId] = queryKey;
      return fetchQueries(questId as string);
    },
  });
};
