"use client";

import { useForm } from "react-hook-form";

import { Button } from "../ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui";
import {
  LoginFormShema,
  TLoginFormData,
} from "@/lib/validation/LoginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks";
import { ControlledInput } from "../controlled";

const defaultValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const { handleSubmit, control } = useForm<TLoginFormData>({
    resolver: zodResolver(LoginFormShema),
    defaultValues,
  });

  const { isPending, mutateAsync } = useLogin();

  const onSubmit = async (data: TLoginFormData) => {
    try {
      await mutateAsync({
        email: data.email,
        password: data.password,
      });
    } catch (error: any) {
      console.error("Something was wrong!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
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
            placeholder="******"
            type="password"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
