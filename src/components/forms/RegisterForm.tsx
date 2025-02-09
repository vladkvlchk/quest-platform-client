"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SignUpFormShema,
  TSignUpFormData,
} from "@/lib/validation/SignUpValidation";
import { ControlledInput } from "../controlled";
import { useSignUp } from "@/hooks";

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

export function RegisterForm() {
  const { handleSubmit, reset, control } = useForm<TSignUpFormData>({
    resolver: zodResolver(SignUpFormShema),
    defaultValues,
  });

  const { mutateAsync, isPending } = useSignUp();

  const onSubmit = async (data: TSignUpFormData) => {
    try {
      await mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      reset();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create a new account to join Quest Platform
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <ControlledInput
            name="name"
            control={control}
            label="Name"
            placeholder="Morty"
          />

          <ControlledInput
            name="email"
            control={control}
            label="Email"
            placeholder="morty@mail.com"
          />

          <ControlledInput
            name="password"
            control={control}
            label="Password"
            placeholder="*******"
            type="password"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
