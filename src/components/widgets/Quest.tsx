"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from "../ui";
import { QuizLevel } from "./QuizLevel";
import { InputLevel } from "./InputLevel";
import { useProgressStore, useQuest, useSocket } from "@/hooks";
import { Badge } from "../ui/badge";
import { ClipboardList, Clock, MapPin, Star, StarIcon } from "lucide-react";
import { FinishProcessButton } from "../atoms";
import { useEffect } from "react";

export const Quest = ({ questId }: { questId: string }) => {
  const { progress, setProgress, submitProgress } = useProgressStore();
  const { data, isPending, error } = useQuest(questId);
  const quest = data?.quest;
  const socket = useSocket();

  const onClickStartQuest = () => {
    if (typeof quest?._id !== "string") return;
    setProgress({
      quest_id: quest?._id,
      started_at: Date.now(),
      ends_at: Date.now() + quest?.time_limit * 60 * 1000,
      level_amount: quest.levels.length,
      current_level_index: 0,
      answers: [],
    });
  };

  useEffect(() => {
    if (socket && progress) {
      socket.emit("progressUpdate", progress);
    }

    if (progress && progress.current_level_index >= progress.level_amount) {
      submitProgress.mutateAsync();
    }
  }, [progress]);

  if (isPending) return <>loading...</>;
  if (error || !quest) return <>error: {JSON.stringify(error)}</>;

  const currentLevel = progress
    ? quest.levels[progress?.current_level_index]
    : null;

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
      {/* content card */}
      <Card className="col-span-3 h-min">
        {!progress && (
          <>
            <CardHeader>
              <CardTitle>About Quest</CardTitle>
            </CardHeader>
            <CardContent>
              <Card className="w-full h-80 flex items-center justify-center relative overflow-hidden bg-slate-100 dark:bg-gray-900">
                <Badge className="absolute top-2 left-2 z-10 ">
                  {quest.difficulty}
                </Badge>
                <Badge className="absolute top-2 right-2 z-10 gap-1 px-2">
                  {quest.avg_rating} <Star size={16} />
                </Badge>
                {quest.main_picture ? (
                  <Image
                    className="w-full h-auto object-cover"
                    src={quest.main_picture}
                    alt={quest.title}
                    fill
                    sizes="100vw"
                  />
                ) : (
                  <CardDescription>no image</CardDescription>
                )}
              </Card>
              <CardDescription className="my-4">
                {quest.description}
              </CardDescription>
              <div className="flex mt-3 gap-2">
                <MapPin />
                location:
                <b>{(quest.location as string) || " online"}</b>
              </div>
              <div className="flex mt-3 gap-2">
                <Clock />
                time limit:
                <b>{quest.time_limit + " min" || "[no-limit]"}</b>
              </div>
              <div className="flex mt-3 gap-2">
                <ClipboardList />
                amout of levels:
                <b>{quest.levels ? quest.levels?.length + " levels" : ""}</b>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={onClickStartQuest}>
                Start Now
              </Button>
            </CardFooter>
          </>
        )}
        {progress && currentLevel && (
          <>
            {currentLevel.type === "quiz" && (
              <QuizLevel
                key={progress?.current_level_index}
                {...currentLevel}
              />
            )}
            {currentLevel.type === "input" && (
              <InputLevel
                key={progress?.current_level_index}
                {...currentLevel}
              />
            )}
          </>
        )}
      </Card>

      {/* navigation */}
      <Card className="h-max">
        <CardHeader>
          <CardDescription>Levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {quest.levels.map((level) => {
              const foundInProgress = progress?.answers.find(
                (answer) => answer.question_id === level.id
              );
              return (
                <Button
                  key={level.name}
                  variant={
                    currentLevel?.name === level.name ? "default" : "secondary"
                  }
                  disabled={Boolean(foundInProgress)}
                  className={
                    "w-full justify-start " +
                    (foundInProgress
                      ? foundInProgress?.is_correct
                        ? "bg-green-500"
                        : "bg-red-500"
                      : "")
                  }
                >
                  {level.name}
                </Button>
              );
            })}
          </div>
        </CardContent>
        {progress !== null && (
          <>
            <Separator />
            <CardFooter className="mt-4">
              <FinishProcessButton />
            </CardFooter>
          </>
        )}
      </Card>

      {/* reviews */}
      <Card className="col-span-3 border-0">
        {!progress && quest.ratings && (
          <CardHeader>
            <CardDescription>reviews</CardDescription>
            {quest.ratings.map((review, i) => (
              <Card key={review.user_id + review.review + i} className="mb-2">
                <CardHeader className="flex">
                  <div className="flex items-center gap-4">
                    <Link href={"/profile/" + review.user_id}>
                      <b className="hover:underline">user</b>
                    </Link>
                    <div className="flex gap-1">
                      {new Array(review.rating).fill(0).map((_, i) => (
                        <StarIcon key={i} fill="currentColor" size={8} />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <p>&quot;{review.review}&quot;</p>
                </CardFooter>
              </Card>
            ))}
          </CardHeader>
        )}
      </Card>
    </div>
  );
};
