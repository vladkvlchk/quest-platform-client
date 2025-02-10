"use client";

import { FC } from "react";
import { Controller } from "react-hook-form";
import { Input, Label } from "../ui";

interface Props {
  name: string;
  control: any;
  label: string;
  type?: "password" | "number" | "text";
  disabled?: boolean;
  placeholder?: string;
}

export const ControlledInput: FC<Props> = ({
  name,
  control,
  label,
  type,
  ...others
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type={type}
              onChange={(e) => {
                const newValue = e.target.value;
                if (type === "number") {
                  onChange(newValue === "" ? "" : Number(newValue));
                } else {
                  onChange(newValue);
                }
              }}
              {...others}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};
