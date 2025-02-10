"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AboutQuestFormShema,
  TAboutQuestFormData,
} from "@/lib/validation/AboutQuestValidation";
import { Button, CardContent, CardFooter } from "../ui";
import {
  ControlledInput,
  ControlledSelect,
  ControlledTextarea,
} from "../controlled";
import { UploadImageForm } from "./UploadImageForm";
import { useLayoutEffect, useState } from "react";
import { AddLevelButton } from "../atoms/AddLevelButton";
import { useLevelsStore } from "@/hooks";

export const AboutQuestForm = () => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<File | undefined>();
  const { handleSubmit, control } = useForm<TAboutQuestFormData>({
    defaultValues: {
      title: "",
      description: "",
      time_limit: 0,
      difficulty: "normal",
      location: "online",
    },
    resolver: zodResolver(AboutQuestFormShema),
  });
  const { updateLevel, currentLevel, levels, addLevel } = useLevelsStore();

  const onSubmit: SubmitHandler<TAboutQuestFormData> = async (data) => {
    if (!currentLevel?.id) return null;
    updateLevel.mutate({
      levelId: currentLevel?.id,
      fields: {
        ...data,
        difficulty: data.difficulty as "easy" | "normal" | "hard",
        main_picture: uploadedImage,
      },
    });
    setIsSaved(true);
  };

  useLayoutEffect(() => {}, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <UploadImageForm
          onImagesChange={function (files: File[]): void {
            setUploadedImage(files[0]);
          }}
          maxImages={1}
        />

        <ControlledInput
          name="title"
          control={control}
          label="Quest Title"
          placeholder="Title of the quest"
        />

        <ControlledTextarea
          name={"description"}
          control={control}
          label={"Description"}
          placeholder={"Describe the quest"}
        />

        <ControlledInput
          name="time_limit"
          control={control}
          label="Time Limit (minutes)"
          type="number"
        />

        <ControlledSelect
          name={"difficulty"}
          control={control}
          label={"Difficulty"}
          placeholder={"Select difficalty"}
          items={[
            { value: "easy", name: "Easy" },
            { value: "normal", name: "Normal" },
            { value: "hard", name: "Hard" },
          ]}
        />
      </CardContent>
      <CardFooter>
        {isSaved ? (
          <AddLevelButton />
        ) : (
          <Button type="submit" className="w-full">
            Save
          </Button>
        )}
      </CardFooter>
    </form>
  );
};
