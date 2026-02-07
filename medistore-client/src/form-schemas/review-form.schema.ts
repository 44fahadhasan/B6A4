import { z } from "zod";

export const reviewFormSchema = z.object({
  rating: z.number().min(1, "Rating min 1 required"),
  comment: z.string(),
});

export type Treview = z.infer<typeof reviewFormSchema> & { orderId: string };
