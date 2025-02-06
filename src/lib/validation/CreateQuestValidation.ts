import { z } from "zod";

export const CreateQuestFormShema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characyets"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Descrition must be at most 1000 characters"),
  location: z.string(),
  timeLimit: z
    .string()
    .refine((val) => Number(val) > 9, {
      message: "Time limit must be at least 10 minutes",
    })
    .refine((val) => Number(val) < 60 * 24, {
      message: "Time limit must be at most 1440 minutes",
    }),
  difficulty: z.string(),
});

export type TCreateQuestFormData = z.infer<typeof CreateQuestFormShema>;
