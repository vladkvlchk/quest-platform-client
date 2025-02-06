"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  ControlledSelect,
  ControlledTextarea,
  ControlledInput,
  CardContent,
  CardFooter,
} from "@/components";
import {
  CreateQuestFormShema,
  TCreateQuestFormData,
} from "@/lib/validation/CreateQuestValidation";

const defaultValues = {
  name: "",
  description: "",
  location: "online",
  timeLimit: "0",
  difficalty: "normal",
};

export const CreateQuestForm = () => {
  const { handleSubmit, control } = useForm<TCreateQuestFormData>({
    defaultValues,
    resolver: zodResolver(CreateQuestFormShema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<TCreateQuestFormData> = async (data) => {
    console.log("submit");
    setIsLoading(true);
    try {
      console.log("Quest data:", data);
      // API call
      // router.push("/my-quests");
    } catch (error) {
      console.error("Error creating quest:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <ControlledInput
          name="name"
          control={control}
          label="Quest Name"
          placeholder="Name of the quest"
        />

        <ControlledTextarea
          name={"description"}
          control={control}
          label={"Description"}
          placeholder={"Describe the quest"}
        />

        <ControlledInput
          name="timeLimit"
          control={control}
          label="Time Limit (minutes)"
          type="number"
        />

        <ControlledSelect
          name={"difficalty"}
          control={control}
          label={"Difficalty"}
          placeholder={"Select difficalty"}
          items={[
            { value: "easy", name: "Easy" },
            { value: "normal", name: "Normal" },
            { value: "hard", name: "Hard" },
          ]}
        />
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Quest..." : "Create Quest"}
        </Button>
      </CardFooter>
    </form>
  );
};
