import { z } from "zod";

export const AboutQuestFormShema = z.object({
  title: z
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
  time_limit: z
    .number()
    .min(5, "Time limit must be at least 5 minutes")
    .max(1440, "Time limit must be at most 1440 minutes"),
  difficulty: z.string(),
});

export type TAboutQuestFormData = z.infer<typeof AboutQuestFormShema>;
