"use client";

import { FC, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  CardContent,
  CardFooter,
  Card,
  CardTitle,
  CardHeader,
} from "../ui";
import {
  AboutQuestFormShema,
  TAboutQuestFormData,
} from "@/lib/validation/AboutQuestValidation";
import { ControlledInput, ControlledSelect, ControlledTextarea } from "../controlled";

const defaultValues = {
  name: "",
  description: "",
  location: "online",
  timeLimit: "0",
  difficalty: "normal",
};

type Props = {
  levelName: string;
};

export const InputLevelForm: FC<Props> = () => {
  const { handleSubmit, control } = useForm<TAboutQuestFormData>({
    defaultValues,
    resolver: zodResolver(AboutQuestFormShema),
  });
  const [isLoading, setIsLoading] = useState(false);
  //   const router = useRouter();

  const onSubmit: SubmitHandler<TAboutQuestFormData> = async (data) => {
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
    <Card className="col-span-3 h-min">
      <CardHeader>
        <CardTitle>About Quest</CardTitle>
      </CardHeader>
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
    </Card>
  );
};
