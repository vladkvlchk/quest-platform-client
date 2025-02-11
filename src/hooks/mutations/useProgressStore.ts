import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface IAnswer {
  question_id: string;
  type: "quiz" | "input";
  tries: string[];
  is_correct: boolean;
  tries_left: number;
}

export interface IProgress {
  quest_id: string;
  started_at: number;
  ends_at: number;
  level_amount: number;
  current_level_index: number;
  answers: IAnswer[];
}

export const useProgressStore = () => {
  const queryClient = useQueryClient();

  const { data: progress } = useQuery<IProgress | null>({
    queryKey: ["progress"],
    queryFn: () => {
      return (queryClient.getQueryData(["progress"]) ||
        null) as IProgress | null;
    },
  });

  const setProgress = (progress: IProgress | null) => {
    queryClient.setQueryData(["progress"], progress);
  };

  return { progress, setProgress };
};
