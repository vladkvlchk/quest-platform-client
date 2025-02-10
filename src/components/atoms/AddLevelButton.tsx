import { FC } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui";

import {
  InfoIcon,
  PlusIcon,
  SquareMenuIcon,
  TextCursorInputIcon,
} from "lucide-react";
import { useLevelsStore } from "@/hooks";
import { TLevel } from "@/lib/types";

const icons = {
  quiz: <SquareMenuIcon />,
  input: <TextCursorInputIcon />,
  about: <InfoIcon />,
};

export const AddLevelButton: FC = () => {
  const { levels, addLevel, setCurrentLevel } = useLevelsStore();

  const onClickAddLevel = (type: "quiz" | "input") => {
    let newLevel = {};

    const id = String(Math.floor(Math.random() + Date.now()));

    if (type === "quiz") {
      newLevel = {
        name: `Level ${levels?.length}`,
        type,
        id,
        question: "",
        pictures: [],
        options: [],
        correctOptionId: "",
      };
    }

    if (type === "input") {
      newLevel = {
        name: `Level ${levels?.length}`,
        type,
        id,
        question: "",
        pictures: [],
        tryLimit: 3,
      };
    }

    addLevel.mutate(newLevel as TLevel);
    setCurrentLevel(newLevel as TLevel);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full flex">
          <PlusIcon /> Add Level
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
        <DropdownMenuLabel>Level Type</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onClickAddLevel("quiz")}
        >
          {icons.quiz} Quiz
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onClickAddLevel("input")}
        >
          {icons.input} Input Text
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
