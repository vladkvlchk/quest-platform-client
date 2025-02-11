import { z } from "zod";

export const QuizLevelFormShema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Descrition must be at most 1000 characters"),
  options: z.array(
    z.object({
      id: z.string(),
      text: z
        .string()
        .min(1, "Field must contain at least 1 char")
        .max(50, "Field must contain at most 50 chars"),
    })
  ),
  correct_option_id: z.string(),
});

export type TQuizLevelFormData = z.infer<typeof QuizLevelFormShema>;
