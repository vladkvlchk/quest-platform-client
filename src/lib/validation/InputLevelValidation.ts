import { z } from "zod";

export const InputLevelFormShema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question is required")
    .min(10, "Question must be at least 10 characters")
    .max(1000, "Question must be at most 1000 characters"),
  correct_answer: z
    .string()
    .trim()
    .min(1, "Correct answer is required")
    .min(5, "Correct answer must be at least 5 characters")
    .max(100, "Correct answer must be at most 100 characters"),
  try_limit: z.number().min(1, "Try amount must be at least 1"),
});

export type TInputLevelFormData = z.infer<typeof InputLevelFormShema>;
