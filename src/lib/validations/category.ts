import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
