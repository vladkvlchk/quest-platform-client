"use client";

import axiosInstance from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "../use-toast";

export interface IAnswer {
  question_id: string;
  type: "quiz" | "input";
  tries: string[];
  is_correct: boolean;
  tries_left: number;
}

export interface IProgress {
  title: string;
  quest_id: string;
  started_at: number;
  ends_at: number;
  ended_at?: number;
  level_amount: number;
  current_level_index: number;
  answers: IAnswer[];
}

export const useProgressStore = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const router = useRouter();

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

  interface IQuestHistoryItemRequest {
    quest_id: string;
    result: number;
    completed: boolean;
    time_spent: number;
  }

  const getResults = (): IQuestHistoryItemRequest | null => {
    if (!progress) return null;

    return {
      quest_id: progress.quest_id,
      result: progress.answers.reduce(
        (res, answer) => (answer.is_correct ? res + 1 : res),
        0
      ),
      completed: true,
      time_spent: Math.floor((Date.now() - progress.started_at) / 60000),
    };
  };

  const patchQuestHistory = async () => {
    const { data } = await axiosInstance.patch(
      `/user/${session?.user.id}/quest_history`,
      getResults()
    );
    return data;
  };

  const submitProgress = useMutation({
    mutationKey: ["quest", progress?.quest_id],
    mutationFn: async () => patchQuestHistory(),
    onSuccess: () => {
      router.push(`./${progress?.quest_id}/result`);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your sign-up request. Try again.",
      });
    },
  });

  return { progress, setProgress, submitProgress };
};
