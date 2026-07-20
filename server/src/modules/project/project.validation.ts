import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/ApiError';
import mongoose from 'mongoose';

export const validateCreateProject = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, client } = req.body || { };

    if (!name || !client ) {    
        throw new ApiError(400, 'Name and client are requred')
    } 

    if (!mongoose.Types.ObjectId.isValid(client)) {
        throw new ApiError(400, 'InvalidClientId');
    }

    next();
}