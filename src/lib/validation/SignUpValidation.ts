import { z } from "zod";

export const SignUpFormShema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address (ex. johndoe@gmail.com)"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),
});

export type TSignUpFormData = z.infer<typeof SignUpFormShema>;
