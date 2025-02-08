"use client";

import { IQuizOption } from "@/lib/types";
import { FC, useState } from "react";
import { Button, CardContent } from "@/components";

interface IQuizProps {
  question: string;
  options: IQuizOption[];
}

export const QuizLevel: FC<IQuizProps> = ({ question, options }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  return (
    <CardContent>
      <p className="text-lg mb-4">{question}</p>
      {options.map((option) => (
        <Button
          key={option.id}
          variant={selectedOptionId === option.id ? "default" : "outline"}
          onClick={() => setSelectedOptionId(option.id)}
          className="w-full my-2"
        >
          {option.text}
        </Button>
      ))}
    </CardContent>
  );
};
