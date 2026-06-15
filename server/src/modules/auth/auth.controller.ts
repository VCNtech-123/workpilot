import { Request, Response } from "express";
import { registerUser, loginUser } from './auth.service';

export const register = async (req: Request, res: Response) => {

    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);

    res.status(201).json({
        status: "success",
        data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        },
    });
};

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const user = await loginUser(email, password);

     res.status(200).json({
        status: "success",
        data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        },
    });
}