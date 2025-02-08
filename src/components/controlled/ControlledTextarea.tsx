"use client";

import { FC } from "react";
import { Controller } from "react-hook-form";

import { Label, Textarea } from "../ui";

interface Props {
  name: string;
  control: any;
  label: string;

  required?: boolean;
  disabled?: boolean;
  placeholder: string;
}

export const ControlledTextarea: FC<Props> = ({
  name,
  control,
  label,
  ...other
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <Textarea id={name} value={value} onChange={onChange} {...other} />
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
};
