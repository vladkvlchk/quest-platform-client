"use client";

import {
  CardDescription,
  CardHeader,
  CardTitle,
  QuestTimer,
} from "@/components";
import LoadingPage from "@/components/atoms/LoadingPage";
import { Quest } from "@/components/widgets/Quest";
import { useProgressStore, useQuest } from "@/hooks";
import { useParams } from "next/navigation";
import { useLayoutEffect } from "react";

export default function QuestPage() {
  const { questId } = useParams();

  const { data, isPending, error } = useQuest(questId as string);
  const quest = data?.quest;

  const { setProgress } = useProgressStore();

  useLayoutEffect(() => {
    setProgress(null);
  }, [questId]);

  if (isPending) return <LoadingPage />;
  if (error) return <>error</>;
  return (
    <>
      <div className="flex justify-between">
        <CardHeader>
          <CardTitle>{quest?.title}</CardTitle>
          <CardDescription>id: {questId}</CardDescription>
        </CardHeader>
        <CardHeader className="w-max flex-1 flex justify-end items-end">
          <QuestTimer />
        </CardHeader>
      </div>
      <div className="space-y-4 p-4">
        <Quest questId={questId as string} />
      </div>
    </>
  );
}
