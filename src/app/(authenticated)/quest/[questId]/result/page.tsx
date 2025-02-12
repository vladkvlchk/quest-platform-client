"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FeedbackForm,
} from "@/components";
import LoadingPage from "@/components/atoms/LoadingPage";
import { useProgressStore, useQuest } from "@/hooks";
import { useParams } from "next/navigation";

export default function QuestResultPage() {
  const { questId } = useParams();

  const { data, isPending, error } = useQuest(questId as string);
  const quest = data?.quest;

  const { progress } = useProgressStore();

  if (isPending) return <LoadingPage />;
  if (error || !progress) return <>error</>;

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
        <Card className="text-center w-1/2 mx-auto">
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
                (Date.now() - progress?.started_at) / 60000
              )} minutes`}
            </p>
          </CardContent>
        </Card>
        <FeedbackForm />
      </CardContent>
    </>
  );
}
