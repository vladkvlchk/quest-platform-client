"use client";

import { FC, useState } from "react";
import Image from "next/image";

import { IInputLevelResponse } from "@/lib/types";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "../ui";
import { useProgressStore, IAnswer } from "@/hooks";

export const InputLevel: FC<IInputLevelResponse> = ({
  id,
  picture_urls,
  name,
  question,
  try_limit,
  correct_answer,
}) => {
  const [answer, setAnswer] = useState<string>("");
  const { progress, setProgress } = useProgressStore();

  const progressedLevel = progress?.answers.find(
    (answer) => answer.question_id === id
  );
  const triesLeft = progressedLevel ? progressedLevel.tries_left : try_limit;

  const onClickCheck = () => {
    if (!progress || !Array.isArray(progress?.answers)) return null;
    if (answer.toLowerCase() === correct_answer.toLowerCase()) {
      const answers: IAnswer[] = progressedLevel
        ? progress?.answers.map((_answer) =>
            _answer.question_id === id
              ? {
                  ...progressedLevel,
                  tries_left: progressedLevel.tries_left,
                  tries: [...progressedLevel.tries, answer],
                  is_correct: true,
                }
              : _answer
          )
        : [
            ...progress.answers,
            {
              question_id: id,
              type: "input",
              tries_left: try_limit,
              tries: [answer],
              is_correct: true,
            },
          ];
      setProgress({
        ...progress,
        answers,
        current_level_index: progress.current_level_index + 1,
      });
    }
    if (answer.toLowerCase() !== correct_answer.toLowerCase()) {
      const answers: IAnswer[] = progressedLevel
        ? progress?.answers.map((_answer) =>
            _answer.question_id === id
              ? {
                  ..._answer,
                  tries_left: _answer.tries_left - 1,
                  tries: [..._answer.tries, answer],
                }
              : _answer
          )
        : [
            ...progress.answers,
            {
              question_id: id,
              type: "input",
              tries: [answer],
              is_correct: false,
              tries_left: try_limit - 1,
            },
          ];

      setProgress({
        ...progress,
        answers,
        current_level_index:
          triesLeft > 1
            ? progress.current_level_index
            : progress.current_level_index + 1,
      });
    }

    setAnswer("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClickCheck();
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {picture_urls.map((picture_url, i) => (
          <Card
            key={picture_url + i}
            className="w-full h-40 flex items-center justify-center relative overflow-hidden bg-slate-100 dark:bg-gray-900"
          >
            <Image
              className="w-full h-auto object-cover"
              src={picture_url}
              alt={"picture " + i}
              fill
              sizes="100vw"
            />
          </Card>
        ))}
      </CardContent>
      <CardContent>
        <p className="text-lg mb-4">{question}</p>
        <Input
          className="w-full"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          placeholder="Answer"
          onKeyDown={handleKeyDown}
        />
        <Button
          className="w-full mt-4"
          onClick={onClickCheck}
          disabled={!answer}
        >{`Try Answer (${triesLeft} tries left)`}</Button>
      </CardContent>
    </>
  );
};
