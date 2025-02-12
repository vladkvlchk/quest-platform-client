"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FeedbackForm,
} from "@/components";
import { useProgressStore, useQuest } from "@/hooks";
import { useParams } from "next/navigation";

export default function QuestResultPage() {
  const { questId } = useParams();

  const { data, isPending, error } = useQuest(questId as string);
  const quest = data?.quest;

  const { progress } = useProgressStore();

  if (isPending) return <>loading...</>;
  if (error || !progress)
    return <>QuestResultPage error: {JSON.stringify(error)}</>;

  const correct_answers_amount = progress?.answers.reduce(
    (res, answer) => (answer.is_correct ? res + 1 : res),
    0
  );

  return (
    <>
      <CardHeader>
        <CardTitle>{quest?.title}</CardTitle>
        <CardDescription>id: {questId}</CardDescription>
      </CardHeader>

      <CardContent>
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Congratulations 🎉</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              your result:{" "}
              {`${correct_answers_amount}/${progress?.level_amount}`}
            </p>
            <p>
              time spent:
              {` ${Math.ceil(
                (Date.now() - progress?.started_at) / 6000
              )} minutes`}
            </p>
          </CardContent>
        </Card>
        <FeedbackForm />
      </CardContent>
    </>
  );
}
