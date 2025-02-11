"use client";

import { FC, useState } from "react";
import Image from "next/image";

import { Button, CardContent, CardTitle, CardHeader, Card } from "../ui";
import { useProgressStore } from "@/hooks";

interface IQuizProps {
  id: string;
  name: string;
  picture_urls?: string[];
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correct_option_id: string;
}

export const QuizLevel: FC<IQuizProps> = ({
  id,
  name,
  picture_urls = [],
  question,
  options,
  correct_option_id,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const { progress, setProgress } = useProgressStore();

  const onSelectOption = (_id: string) => {
    setSelectedOptionId(_id);
    if (!progress || !progress.answers) return null;
    setProgress({
      ...progress,
      answers: [
        ...progress?.answers,
        {
          question_id: id,
          type: "quiz",
          tries: [
            options.find((option) => option.id === selectedOptionId)
              ?.text as string,
          ],
          is_correct: correct_option_id === _id,
          tries_left: 0,
        },
      ],
      current_level_index: progress?.answers.length + 1,
    });
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
        {options.map((option) => (
          <Button
            key={option.id}
            disabled={Boolean(selectedOptionId)}
            variant={selectedOptionId === option.id ? "default" : "outline"}
            onClick={() => onSelectOption(option.id)}
            className={
              "w-full my-2 " +
              (selectedOptionId === option.id
                ? option.id === correct_option_id
                  ? "bg-green-500"
                  : "bg-red-500"
                : " ")
            }
          >
            {option.text}
          </Button>
        ))}
      </CardContent>
    </>
  );
};
