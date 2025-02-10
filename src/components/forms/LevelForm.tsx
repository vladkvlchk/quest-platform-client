"use client";

import { FC, useLayoutEffect } from "react";

import { AboutQuestForm } from "./AboutQuestForm";
import { QuizLevelForm } from "./QuizLevelForm";
import { InputLevelForm } from "./InputLevelForm";
import { Card, CardDescription, CardHeader, CardTitle, Separator } from "../ui";
import { useLevelsStore } from "@/hooks";
import { IAboutLevel } from "@/lib/types";

const descriptions = {
  about:
    "Upload 1 image as a cover. Fill the info form with appropriate information.",
  quiz: "Upload at most 4 images. Fill the question, options and choose which option is right. User will have only 1 try to find a correct answer",
  input:
    "Upload at most 4 images. Fill the question, provide a correct answer and set the maximum limit of the tries",
};

export const LevelForm: FC = () => {
  const { currentLevel, addLevel, setCurrentLevel } = useLevelsStore();

  useLayoutEffect(() => {
    const aboutLevel: IAboutLevel = {
      id: String(Math.floor(Math.random() * Date.now())),
      type: "about",
      name: "About Quest",
      main_picture: undefined,
      title: "",
      description: "",
      time_limit: 0,
      difficulty: "normal",
    };
    const addLvl = async () => await addLevel.mutateAsync(aboutLevel);
    addLvl();

    setTimeout(() => setCurrentLevel(aboutLevel), 0);
  }, []);

  if (!currentLevel) return <>...</>;
  return (
    <Card className="col-span-3 h-min">
      <CardHeader className="flex">
        <CardTitle className="w-max">{currentLevel.name}</CardTitle>
        <Separator orientation="vertical" />
        <CardDescription>{descriptions[currentLevel.type]}</CardDescription>
      </CardHeader>
      {currentLevel.type === "about" && <AboutQuestForm />}
      {currentLevel.type === "quiz" && <QuizLevelForm key={currentLevel.id} />}
      {currentLevel.type === "input" && (
        <InputLevelForm key={currentLevel.id} />
      )}
    </Card>
  );
};
