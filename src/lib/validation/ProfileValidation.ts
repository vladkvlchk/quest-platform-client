import { z } from "zod";

export const ProfileFormShema = z.object({
  name: z
      .string()
      .trim()
      .transform(val => val === "" ? undefined : val)
      .optional(),
  about_me: z
      .string()
      .trim()
      .transform(val => val === "" ? undefined : val)
      .optional(),
});

export type TProfileFormData = z.infer<typeof ProfileFormShema>;
