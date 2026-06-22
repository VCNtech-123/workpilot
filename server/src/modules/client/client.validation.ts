import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/apiError";

export const validateCreateClient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    throw new ApiError(400, "Name and email are required");
  }

  next();
};