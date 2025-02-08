import { FC } from "react";

import { AboutQuestForm } from "./AboutQuestForm";
import { QuizLevelForm } from "./QuizLevelForm";
import { InputLevelForm } from "./InputLevelForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  UploadImageForm,
} from "@/components";

type Props = {
  type: "about" | "quiz" | "input";
  name: string;
};

export const LevelForm: FC<Props> = ({ type, name }) => {
  return (
    <Card className="col-span-3 h-min">
      <CardHeader className="flex">
        <CardTitle className="w-max">{name}</CardTitle>
        <Separator orientation="vertical" />
        <CardDescription>{type}</CardDescription>
      </CardHeader>
      <CardContent>
        <UploadImageForm
          onImagesChange={function (files: File[]): void {
            console.log(files);
          }}
        />
      </CardContent>
      {type === "about" && <AboutQuestForm />}
      {type === "quiz" && <QuizLevelForm />}
      {type === "input" && <InputLevelForm levelName={name} />}
    </Card>
  );
};
