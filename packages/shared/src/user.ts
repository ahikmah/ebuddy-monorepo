import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  totalAverageWeightRatings: z.number().optional(),
  numberOfRents: z.number().optional(),
  recentlyActive: z.number().optional(),
  normalizedRecentlyActive: z.number().optional(),
  score: z.number().optional(),
});

export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  totalAverageWeightRatings: z.number().optional(),
  numberOfRents: z.number().optional(),
  recentlyActive: z.number().optional(),
});
