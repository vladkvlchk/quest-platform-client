"use client";

import { useState } from "react";
import {
  InfoIcon,
  PlusIcon,
  SquareMenuIcon,
  TextCursorInputIcon,
} from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  LevelForm,
} from "@/components";

type TLevel = {
  name: string;
  type: "about" | "quiz" | "input";
};

const icons = {
  quiz: <SquareMenuIcon />,
  input: <TextCursorInputIcon />,
  about: <InfoIcon />,
};

export default function CreateQuest() {
  const [levels, setLevels] = useState<TLevel[]>([]);
  const [currentLevel, setCurrentLevel] = useState<TLevel>({
    name: "About Quest",
    type: "about",
  });

  const onClickAddLevel = () =>
    setLevels((prev) => [
      ...prev,
      { name: `Level ${prev.length + 1}`, type: "quiz" },
    ]);

  return (
    <div className="space-y-4 p-4">
      <CardHeader>
        <CardTitle>Create a New Quest</CardTitle>
        <CardDescription>
          Fill in the details to create your quest
        </CardDescription>
      </CardHeader>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-4">
        <LevelForm type={currentLevel.type} name={currentLevel.name} />
        <Card className="md:-order-1">
          <CardHeader>
            <CardDescription>Level Navigation</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button
              variant={
                currentLevel.name === "About Quest" ? "default" : "secondary"
              }
              className="w-full flex justify-start"
              onClick={() =>
                setCurrentLevel({ name: "About Quest", type: "about" })
              }
            >
              <InfoIcon /> About Quest
            </Button>
            {levels.map((level, index) => (
              <Button
                key={level.name + level.type + index}
                className="w-full flex justify-start"
                variant={
                  currentLevel.name === level.name ? "default" : "secondary"
                }
                onClick={() => setCurrentLevel(level)}
              >
                {icons[level.type]}
                {level.name}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full flex"
              onClick={onClickAddLevel}
            >
              <PlusIcon /> Add Level
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
