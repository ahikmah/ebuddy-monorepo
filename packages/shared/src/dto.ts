import { z } from "zod";

export type PaginationResponse<T> = {
  items: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  limit: number;
};

export type ServiceResponseObj<T> = {
  success: boolean;
  message: string;
  responseObject?: T;
  statusCode: number;
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
  });
