import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { User } from "../modules/user/user.model";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized");
  }

  try {
    const decoded = jwt.verify(token, env.jwt as string) as {
      id: string;
    };

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new ApiError(401, "User no longer exists");
    }

    req.user = currentUser;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};