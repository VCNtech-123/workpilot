import { Request, Response, NextFunction } from 'express';
import { ApiError }from '../../utils/apiError'

export const validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction 
) => {
    const { email, name, password } = req.body;

    if ( !name || !email || !password ) {
        throw new ApiError(400, "All fields are required");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    next();
}
    
