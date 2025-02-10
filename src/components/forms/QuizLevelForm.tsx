"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, CardContent, CardFooter } from "../ui";
import {
  QuizLevelFormShema,
  TQuizLevelFormData,
} from "@/lib/validation/QuizLevelValidation";
import {
  ControlledQuizOptions,
  ControlledSelect,
  ControlledTextarea,
} from "../controlled";
import { useLevelsStore } from "@/hooks";
import { AddLevelButton } from "../atoms/AddLevelButton";
import { FinishButton } from "../atoms/FinishButton";
import { UploadImageForm } from "./UploadImageForm";

const defaultValues = {
  question: "",
  options: [{ id: String(Date.now()), text: "" }],
  correct_option_id: "",
};

export const QuizLevelForm = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { updateLevel, currentLevel } = useLevelsStore();
  const { handleSubmit, control, watch, reset } = useForm<TQuizLevelFormData>({
    defaultValues,
    resolver: zodResolver(QuizLevelFormShema),
  });
  const [isSaved, setIsSaved] = useState(false);

  const onSubmit: SubmitHandler<TQuizLevelFormData> = async (data) => {
    if(!currentLevel) return null;
    try {
      updateLevel.mutate({
        levelId: currentLevel?.id,
        fields: { ...data, pictures: uploadedImages || [] },
      });
      setIsSaved(true);
    } catch (error) {
      console.error("Error submit quiz level:", error);
    }
  };

  const onlyFilledOptions = watch("options")?.filter((option) =>
    Boolean(option.text.trim())
  );

  const selectCorrectAnswerItems = Array.isArray(onlyFilledOptions)
    ? [...onlyFilledOptions].map((option) => ({
        value: option.id,
        name: option.text,
      }))
    : [];

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
          name={"question"}
          control={control}
          label={"Question"}
          placeholder={"Describe the quest"}
        />

        <ControlledQuizOptions
          name="options"
          control={control}
          label="Options"
        />

        <ControlledSelect
          name="correct_option_id"
          control={control}
          label="Correct Answer"
          placeholder="Select correct answer"
          items={selectCorrectAnswerItems}
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
