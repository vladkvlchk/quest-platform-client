"use client";

import { FC, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, CardContent, CardFooter } from "../ui";
import { ControlledInput, ControlledTextarea } from "../controlled";
import {
  InputLevelFormShema,
  TInputLevelFormData,
} from "@/lib/validation/InputLevelValidation";
import { useLevelsStore } from "@/hooks";
import { AddLevelButton, FinishButton } from "../atoms";
import { UploadImageForm } from "./UploadImageForm";

const defaultValues = {
  name: "",
  description: "",
  try_limit: 0,
};

export const InputLevelForm: FC = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { updateLevel, currentLevel } = useLevelsStore();
  const { handleSubmit, control } = useForm<TInputLevelFormData>({
    defaultValues,
    resolver: zodResolver(InputLevelFormShema),
  });
  const [isSaved, setIsSaved] = useState(false);

  const onSubmit: SubmitHandler<TInputLevelFormData> = async (data) => {
    if (!currentLevel) return null;
    try {
      updateLevel.mutate({
        levelId: currentLevel?.id,
        fields: { ...data, pictures: uploadedImages || [] },
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Error submit input level:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <UploadImageForm
          onImagesChange={function (files: File[]): void {
            setUploadedImages(files);
          }}
          maxImages={4}
        />

        <ControlledTextarea
          name="question"
          control={control}
          label="Question"
          placeholder="Who is the best football player?"
        />

        <ControlledInput
          name="correct_answer"
          control={control}
          label="Correct Answer"
          placeholder="Ronaldo"
        />

        <ControlledInput
          name="try_limit"
          control={control}
          label="Try Limit (1 time - 100 times)"
          type="number"
        />
      </CardContent>
      <CardFooter>
        {isSaved ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            <AddLevelButton />
            <FinishButton />
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Save
          </Button>
        )}
      </CardFooter>
    </form>
  );
};
