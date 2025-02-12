import type { Request, Response } from "express";
import { ServiceResponse } from "../common/models/serviceResponse";
import { handleServiceResponse } from "../common/utils/httpHandlers";
import * as userModel from "../model/user";

// ----------------------------------------------------------------

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) return ServiceResponse.failure("User ID is required", null, 400);
  const user = await userModel.updateUserData(userId, req.body);
  return handleServiceResponse(user, res);
};

export const fetchUser = async (req: Request, res: Response) => {
  const page = req.query.page ? Number.parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 12;
  const user = await userModel.fetchUserData(page, limit);
  return handleServiceResponse(user, res);
};

export const bulkInsert = async (req: Request, res: Response) => {
  const { users } = req.body;
  const result = await userModel.bulkInsertUser(users);
  return handleServiceResponse(result, res);
};
