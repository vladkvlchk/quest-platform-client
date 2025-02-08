"use client";

import { FC } from "react";
import { Controller } from "react-hook-form";

import {
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui";

interface Props {
  name: string;
  control: any;
  label: string;
  placeholder: string;
  items: { value: string | number; name: string }[];
}

export const ControlledSelect: FC<Props> = ({
  name,
  control,
  label,
  placeholder,
  items,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items.map((item, index) => (
                <SelectItem key={index} value={String(item.value)}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
};
