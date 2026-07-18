import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/apiError";
import mongoose from "mongoose";

export const validateCreateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { title, project } = req.body;

    if ( !title || !project ) {
        throw new ApiError(400, "Title and project required");
    }

    if (!mongoose.Types.ObjectId.isValid(project)) {
        throw new ApiError(400, "Invalid Project ID");
    }

    next();
}