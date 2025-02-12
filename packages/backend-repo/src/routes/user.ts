import express, { type Router } from "express";
import { z } from "zod";

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createApiResponse } from "../api-docs/openAPIResponseBuilders";

import { UserResponseSchema } from "@repo/shared";
import * as userController from "../controller/user";
import { authMiddleware } from "../middleware/authMiddleware";

// ----------------------------------------------------------------

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserResponseSchema);

userRegistry.registerComponent("securitySchemes", "firebaseAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "Firebase Authentication Token",
});

userRegistry.registerPath({
  method: "patch",
  path: "/update-user-data/{id}",
  tags: ["User"],
  description: "Update user data by ID",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: createApiResponse(UserResponseSchema, "Success"),
  security: [{ firebaseAuth: [] }],
});
userRouter.patch(
  "/update-user-data/:id",
  authMiddleware,
  userController.updateUser
);

userRegistry.registerPath({
  method: "get",
  path: "/fetch-user-data?page={page}&limit={limit}",
  tags: ["User"],
  description:
    "Fetch user data with pagination. If no page and limit are provided, it will return the first 12 users by default.",
  request: {
    query: z.object({
      page: z.number().optional(),
      limit: z.number().optional(),
    }),
  },
  responses: createApiResponse(UserResponseSchema, "Success"),
  security: [{ firebaseAuth: [] }],
});
userRouter.get("/fetch-user-data", authMiddleware, userController.fetchUser);

// ----------------------------------------------------------------

// bulk insert
userRegistry.registerPath({
  method: "post",
  path: "/bulk-insert-user",
  tags: ["User"],
  description: "Helper endpoint to bulk insert users",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            users: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  totalAverageWeightRatings: { type: "number" },
                  numberOfRents: { type: "number" },
                  recentlyActive: { type: "number" },
                },
                required: ["name", "email"],
              },
            },
          },
          required: ["users"],
        },
      },
    },
  },
  responses: createApiResponse(UserResponseSchema, "Success"),
  security: [{ firebaseAuth: [] }],
});

userRouter.post("/bulk-insert-user", authMiddleware, userController.bulkInsert);
