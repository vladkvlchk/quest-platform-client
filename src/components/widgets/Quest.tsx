"use client";

import { useState } from "react";

import {
  AboutQuest,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  QuizLevel,
  Separator,
  InputLevel,
} from "@/components";
import { IAboutLevel, TLevel } from "@/lib/types";

const mockQuest = {
  name: "Development Knowledge Quest",
  description:
    "Participation page. Don't forget that the quest have time limit. Good luck!",
  levels: [
    {
      type: "about",
      id: "1111",
      imageUrls: [],
      name: "About Quest",
      description: "Super-puper quest",
    },
    {
      type: "quiz",
      name: "Level 1",
      question: "Who is Ronaldo?",
      options: [
        {
          id: "0",
          text: "Football player",
        },
        {
          id: "1",
          text: "My friend",
        },
        {
          id: "2",
          text: "Artist",
        },
        {
          id: "3",
          text: "Nobody",
        },
      ],
      correctOptionId: "0",
    },
    {
      type: "quiz",
      name: "Level 2",
      question: "Who is Messi?",
      options: [
        {
          id: "0",
          text: "Football player",
        },
        {
          id: "1",
          text: "Your friend",
        },
        {
          id: "2",
          text: "Book character",
        },
        {
          id: "3",
          text: "Somebody else",
        },
      ],
      correctOptionId: "0",
    },
  ],
};

const levels = {
  quiz: { subtitle: "Select one option", component: QuizLevel },
  about: {
    subtitle: "About the quest. Click on the start button to participate",
    component: AboutQuest,
  },
  input: {
    subtitle:
      "Try to find the correct answer. You have limited amount of tries",
    component: InputLevel,
  },
};

export const Quest = ({ questId }: { questId: string }) => {
  const quest = mockQuest;
  const [currentLevel, setCurrentLevel] = useState<TLevel>(
    quest.levels[0] as IAboutLevel
  );

  return (
    <>
      <div className="flex justify-between">
        <CardHeader>
          <CardTitle>
            {quest.name}
            {`[${questId}]`}
          </CardTitle>
          <CardDescription>{quest.description}</CardDescription>
        </CardHeader>
        <CardHeader className="w-max flex-1 flex justify-end items-end">
          <b className="text-lg">15:46</b>
        </CardHeader>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
        <Card className="col-span-3 h-min">
          <CardHeader className="flex">
            <CardTitle className="w-max">{currentLevel.name}</CardTitle>
            <CardDescription>
              {levels[currentLevel.type].subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentLevel.type === "about" && <AboutQuest {...currentLevel} />}
            {currentLevel.type === "quiz" && <QuizLevel {...currentLevel} />}
            {currentLevel.type === "input" && <InputLevel {...currentLevel} />}
          </CardContent>
        </Card>
        <Card className="h-max">
          <CardHeader>
            <CardDescription>Levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {quest.levels.map((level) => (
                <Button
                  key={level.name}
                  variant={
                    currentLevel.name === level.name ? "default" : "secondary"
                  }
                  className="w-full justify-start"
                  onClick={() => setCurrentLevel(level as TLevel)}
                >
                  {level.name}
                </Button>
              ))}
            </ul>
          </CardContent>
          <Separator />
          <CardFooter className="mt-4">
            <Button className="w-full">Submit All Answers</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
