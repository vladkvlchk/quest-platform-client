import { z } from "zod";

export const LoginFormShema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email('Invalid email address (ex. johndoe@gmail.com)'),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),
});

export type TLoginFormData = z.infer<typeof LoginFormShema>;
