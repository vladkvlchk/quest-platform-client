"use client";

import { ChangeEvent, FC } from "react";
import { Controller } from "react-hook-form";
import { PlusIcon } from "lucide-react";

import { Label, Input, Button } from "@/components";
import { IQuizOption } from "@/lib/types/QuizOption";

interface Props {
  name: string;
  control: any;
  label: string;
}

export const ControlledQuizOptions: FC<Props> = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const onChangeInput = (
          e: ChangeEvent<HTMLInputElement>,
          id: string
        ) => {
          onChange(
            value.map((option: IQuizOption) =>
              option.id === id ? { id, text: e.target.value } : option
            )
          );
        };

        const onClickAddOption = () => {
          onChange([...value, { id: String(Date.now()), text: "" }]);
        };

        const isAllOptionsNotEmpty = !value.find(
          (option: IQuizOption) => !option.text.trim()
        );

        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            {value.map((option: IQuizOption, index: number) => (
              <Input
                key={option.id}
                id={String(option.id)}
                value={option.text}
                onChange={(e) => onChangeInput(e, option.id)}
                placeholder={`Option ${index + 1}`}
              />
            ))}
            {error && <p className="text-sm text-red-500">{error.message}</p>}
            {isAllOptionsNotEmpty && (
              <Button
                onClick={onClickAddOption}
                variant="secondary"
                className="w-full"
              >
                <PlusIcon /> Add option
              </Button>
            )}
          </div>
        );
      }}
    />
  );
};
