"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  ControlledSelect,
  ControlledTextarea,
  CardContent,
  CardFooter,
  ControlledQuizOptions,
} from "@/components";
import {
  QuizLevelFormShema,
  TQuizLevelFormData,
} from "@/lib/validation/QuizLevelValidation";

const defaultValues = {
  question: "",
  options: [{ id: String(Date.now()), text: "" }],
  correctOptionId: "",
};

export const QuizLevelForm = () => {
  const { handleSubmit, control, watch } = useForm<TQuizLevelFormData>({
    defaultValues,
    resolver: zodResolver(QuizLevelFormShema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const optionsWatcher = watch("options");

  const onSubmit: SubmitHandler<TQuizLevelFormData> = async (data) => {
    console.log("submit");
    setIsLoading(true);
    try {
      console.log("Quest data:", data);
      // API call
    } catch (error) {
      console.error("Error creating quest:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onlyFilledOptions = optionsWatcher.filter((option) =>
    Boolean(option.text.trim())
  );

  const selectCorrectAnswerItems = Array.isArray(onlyFilledOptions)
    ? [...onlyFilledOptions].map((option) => ({
        value: option.text,
        name: option.id,
      }))
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
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
          name="correctOptionId"
          control={control}
          label="Correct Answer"
          placeholder="Select correct answer"
          items={selectCorrectAnswerItems}
        />
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Quest..." : "Submit"}
        </Button>
      </CardFooter>
    </form>
  );
};
