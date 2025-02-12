"use client";

import { FC } from "react";
import { InfoIcon, SquareMenuIcon, TextCursorInputIcon } from "lucide-react";

import { Button, Card, CardContent, CardDescription, CardHeader } from "../ui";
import { useLevelsStore } from "@/hooks";
import LoadingPage from "../atoms/LoadingPage";

const icons = {
  quiz: <SquareMenuIcon />,
  input: <TextCursorInputIcon />,
  about: <InfoIcon />,
};

type Props = {
  mode?: "create";
};

export const LevelNavigation: FC<Props> = ({ mode = "create" }) => {
  const { levels, currentLevel } = useLevelsStore();

  if (!levels) return <LoadingPage />;
  return (
    <Card className="md:-order-1">
      <CardHeader>
        <CardDescription>Level Navigation</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {levels.map((level, index) => (
          <Button
            key={level.name + level.type + index}
            className="w-full flex justify-start"
            variant={
              currentLevel && currentLevel?.name === level.name
                ? "default"
                : "secondary"
            }
          >
            {icons[level.type]}
            {level.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
